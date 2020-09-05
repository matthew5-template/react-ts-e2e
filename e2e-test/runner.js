const spawn = require('cross-spawn')

let opts = process.argv.slice(2)
opts = opts.concat(['--config', 'e2e-test/nightwatch.conf.js'])
if (opts.indexOf('--env') === -1) {
  opts = opts.concat(['--env', 'chrome'])
}

const runner = spawn('./node_modules/.bin/nightwatch', opts, {
  stdio: 'inherit'
})

runner.on('exit', function (code) {
  process.exit(code)
})

runner.on('error', function (err) {
  throw err
})
