'use strict';
var moment = require('moment');
var async = require('async');
var lodash = require('lodash');
var assert = require('chai').assert;
var logger = require('../../../../server/lib/utils/logger.js');

const { Given, When, Then } = require('cucumber')
const worker_id_me = 1;

Given('no hours worked on a task', function(done) {
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
				self.addStatusCode(res.statusCode);
				done();
			}
		});
})

Given('a task', function(table, done) {
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
					self.addStatusCode(res.statusCode);
					done();
				}
			});
	});
})

When('I register hours with the quantity {int} and date of today', function(quantity, done) {
	var self = this;
	var task = self.getTask();
	self.request
	      	.post('/api/tasks/' + task.id + '/hours')
	      	.send({ 
				quantity: quantity, 
				date: moment().format('YYYY-MM-DD'),
				worker_id: task.assigned_worker_id
	      	})
	      	.expect('Content-Type', /json/)
	      	.end(function(err, res) {  
	        	if (err) {
					throw err;
				} else {
					self.addStatusCode(res.statusCode);
					done();
				}
	      	});
});

Then('I get an error', function() {
	var self = this;
	var statusCode = self.getStatusCode();
	assert.equal(statusCode, 422, '');
})

Then('there are exactly {int} hours worked in the task by me', function(expected_hours, done) {
	var self = this;
	var task = self.getTask();
	self.request
	      	.get('/api/tasks/' + task.id + '/hours')
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
						assert.equal(hour.worker_id, task.assigned_worker_id, 'Hours should be related to the correct worker');
						total_hours += hour.quantity;
					});
					assert.equal(total_hours, expected_hours, 'Worked hours should be ' + expected_hours + ' but found ' + total_hours + ' instead.')
	        		done();
				}
	      	});
})
