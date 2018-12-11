const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    print: () => {},
    showColors: true
  },
  onPrepare: () => {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
  capabilities: {
    browserName: 'chrome',
    maxInstances: 1
  },
  SELENIUM_PROMISE_MANAGER: false,
  specs: [
    '../test/e2e-ui/home.test.js',
    '../test/e2e-ui/hour.test.js'
  ],
  suites: {
    all: [
      '../test/e2e-ui/home.test.js',
      '../test/e2e-ui/hour.test.js'
    ] 
  }
}
