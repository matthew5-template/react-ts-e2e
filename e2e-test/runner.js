const webpack = require('webpack')
const DevServer = require('webpack-dev-server')

const devConfig = require('../build/webpack.dev')
const { address } = require('./nightwatch.conf')

const compiler = webpack(devConfig)
const server = new DevServer(compiler, {
  host: address.host,
  port: address.port
})

console.log('server listen on:', address)
server.listen(address.port, address.host, () => {
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.js under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  let opts = process.argv.slice(2)
  opts = opts.concat(['--config', 'e2e-test/nightwatch.conf.js'])
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  const spawn = require('cross-spawn')
  const runner = spawn('./node_modules/.bin/nightwatch', opts, {
    stdio: 'inherit'
  })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
})
