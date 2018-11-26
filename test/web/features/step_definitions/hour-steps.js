'use strict';
var moment = require('moment');
var async = require('async');
var assert = require('chai').assert;

const { Given, When, Then } = require('cucumber')
const worker_id_me = 1;
const worker_id_someone_else = 2;

Given('no hay horas trabajadas en una tarea', function(done) {
	var self = this;
	self.request
		.post('/api/tasks')
		.send({ 
			name: 'Task without hours',
			description: 'Description from task without hours',
			type: 'TEST',
			status: 'NO HOURS',
			assigned_worker_id: worker_id_me
		})
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			if (err) {
				throw err;
			} else {
				self.addTask(res.body);
				self.addErrorMessage(res.errorMessage);
			}
			done();
		});
})

Given('una tarea', function(table, done) {
	var self = this;
	var taskList = table.hashes();
	async.each(taskList, function(task) {
		self.request
	      	.post('/api/tasks')
	      	.send({ 
				name: task.name,
				description: task.description,
				type: task.type,
				status: task.status,
				begin_date: moment(task.begin_date).format('YYYY-MM-DD'),
				assigned_worker_id: task.assigned_worker_id
	      	})
	      	.expect('Content-Type', /json/)
	      	.end(function(err, res) {
				if (err) {
					throw err;
				} else {
					self.addTask(res.body);
					self.addErrorMessage(res.statusCode);
				}
				done();
			});
	});
})

When('{string} cargo {int} horas el día de {string}', function(who, hours, when, done) {	
	var quantity = hours;
	var date = (when == 'hoy') ? moment() : (when == 'mañana' ? moment().add(1, 'days') : moment());
	var worker_id = (who === 'Yo') ? worker_id_me : worker_id_someone_else;

	var self = this;
	var task = self.getTask();

	self.request
	      	.post('/api/tasks/' + task.id + '/loadHours')
	      	.send({ 
				quantity: quantity, 
				date: date,
				worker_id: worker_id
	      	})
	      	.expect('Content-Type', /json/)
	      	.end(function(err, res) {  
				if (err) {
					throw err;
				} else {
					if (res.body.error !== undefined) {
						self.addErrorMessage(res.body.error.message);
					}
				}
				done();
	      	});
});

Then('recibo un error {string}', function(expectedErrorMessage, done) {
	var self = this;
	var errorMessage = self.getErrorMessage();
	assert.equal(expectedErrorMessage, errorMessage, 'Error message should be: ' + expectedErrorMessage + ' but found ' + errorMessage + ' instead.');
	done();
})

Then('hay exactamente {int} horas trabajadas en la tarea por {string}', function(quantity, who, done) {
	var expected_hours = quantity;
	var worker_id = (who === 'mi') ? worker_id_me : worker_id_someone_else;
	
	var self = this;
	var task = self.getTask();
	var taskFilter = '{"where":{"task_id":"' + task.id + '"}}';

	self.request
	      	.get('/api/hours?filter=' + taskFilter)
			.expect('Content-Type', /json/)
			.expect(200)
	      	.end(function(err, res) {  
				if (err) {
					throw err;
				} else {
					var hours_array = res.body;
					var total_hours = 0;
					hours_array.forEach(hour => {
						if (hour.worker_id === worker_id) {
							assert.isNumber(hour.quantity, 'Hours quantity should be a number');
							total_hours += hour.quantity;
						}
					});
					assert.equal(total_hours, expected_hours, 'Worked hours should be ' + expected_hours + ' but found ' + total_hours + ' instead.')
				}
				done();
	      	});
})

Then('hay exactamente {int} horas trabajadas en la tarea', function(expected_hours, done) {
	var self = this;
	var task = self.getTask();
	var taskFilter = '{"where":{"task_id":"' + task.id + '"}}';

	self.request
	      	.get('/api/hours?filter=' + taskFilter)
			.expect('Content-Type', /json/)
			.expect(200)
	      	.end(function(err, res) {  
	        	if (err) {
					throw err;
				} else {
					var hours_array = res.body;
					var total_hours = 0;
					hours_array.forEach(hour => {
						assert.isNumber(hour.quantity, 'Hours quantity should be a number');
						total_hours += hour.quantity;
					});
					assert.equal(total_hours, expected_hours, 'Worked hours should be ' + expected_hours + ' but found ' + total_hours + ' instead.')
				}
				done();
	      	});
})
