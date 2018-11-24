// features/support/world.js
var app = require('../../../../server/server')
var supertest = require('supertest');
var moment = require('moment');

const { setWorldConstructor } = require('cucumber')

class CustomWorld {
	constructor() {
		this.app = app;
		this.request = supertest(app);
		this.task = null;
		this.errorMessage = null;
  	}

	addTask(task) {
		this.task = task;
	}

	getTask() {
		return this.task;
	}

	removeTask(task) {
		this.task = null;
	}

	addErrorMessage(errorMessage) {
		this.errorMessage = errorMessage;
	}

	getErrorMessage() {
		return this.errorMessage;
	}
}

setWorldConstructor(CustomWorld)