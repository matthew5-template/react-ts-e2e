require('babel-register')
const address = {
  appUrl: 'http://localhost:2000',
  seleniumHost: '127.0.0.1',
  seleniumPort: 4444
}

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['e2e-test/specs'],
  output_folder: 'e2e-test/reports',
  test_workers: true,

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: address.seleniumHost,
    port: address.seleniumPort,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
      // 'webdriver.gecko.driver': require('geckodriver').path,
    }
  },

  test_settings: {
    default: {
      selenium_port: address.seleniumPort,
      selenium_host: address.seleniumHost,
      silent: true,
      globals: {
        devServerURL: address.appUrl,

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
