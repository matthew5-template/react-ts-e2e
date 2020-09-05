require('babel-register')
const address = {
  port: 2000,
  host: '127.0.0.1'
}

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  address,
  src_folders: ['e2e-test/specs'],
  output_folder: 'e2e-test/reports',
  test_workers: true,

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: address.host,
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
      // 'webdriver.gecko.driver': require('geckodriver').path,
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: address.host,
      silent: true,
      globals: {
        devServerURL: `http://${address.host}:${address.port}`,

        // it does not work !!!
        // abortOnAssertionFailure: true,

        after(browser, cb) {
          process.exit(0)
          cb()
        },
        afterEach(browser, cb) {
          if (!browser.currentTest.results.failed) {
            process.exit(0)
          } else {
            process.exit(1)
          }
          cb()
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          w3c: false,
          args: ['headless']
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'moz:firefoxOptions': {
          args: ['--headless']
        }
      }
    }
  }
}
