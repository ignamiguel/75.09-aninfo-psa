module.exports = function () {
    'use strict'
    const reporter = require('cucumber-html-reporter');

    this.Before(function (callback) {
      callback();
    });

    this.AfterFeatures( function() {
      var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true
      };

      reporter.generate(options);
  });
};
