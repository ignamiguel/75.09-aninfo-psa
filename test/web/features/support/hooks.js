module.exports = function () {
    'use strict'
    var reporter = require('cucumber-html-reporter');

    this.Before(function (callback) {
      callback();
    });
};
