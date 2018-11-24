'use strict';

const moment = require('moment');
const app = require('../../server/server');

module.exports = function(Task) {
    function buildDateFromTheFutureResponse() {
        return {
            "statusCode": 400,
            "name": "Error",
            "message": "No se pueden cargar horas con una fecha futura.",
            "status": 400
        }
    }
    
    function buildTaskNotFoundResponse(id) {
        return {
            "statusCode": 404,
            "name": "Error",
            "message": "Unknown \"Task\" id \"" + id + "\".",
            "status": 404,
            "code": "MODEL_NOT_FOUND"
        }
    }

    function buildNotMoreHoursCanBeUploadedResponse() {
        return {
            "statusCode": 400,
            "name": "Error",
            "message": "Sólo se puede cargar hasta 24 horas para una tarea por día.",
            "status": 400
        }
    }

    function buildHoursQuantityInvalidResponse() {
        return {
            "statusCode": 400,
            "name": "Error",
            "message": "Las horas cargadas debe ser mayor a 0 y menor o igual a 24.",
            "status": 400
        }
    }
 
    function buildTaskNotAssignedResponse() {
        return {
            "statusCode": 400,
            "name": "Error",
            "message": "Sólo se puede cargar horas a la tarea asignada.",
            "status": 400
        }
    }

    function isSameDay(originDate, destinyDate) {
        return (moment(originDate).add(3, 'hours').format('YYYY-MM-DD') == moment(destinyDate).add(3, 'hours').format('YYYY-MM-DD'));
    }
    
    Task.loadHours = function(id, request, callback) {
        var taskModel = app.models.Task;
        var hourModel = app.models.Hour;
        const newHour = {
            "quantity": request.quantity,
            "date": request.date,
            "worker_id": request.worker_id,
            "task_id": id
        };
        if (moment(newHour.date) > moment()) {
            callback(buildDateFromTheFutureResponse());
        } else {
            if ((newHour.quantity <= 0) || (newHour.quantity > 24)) {
                callback(buildHoursQuantityInvalidResponse())
            } else {
                taskModel.findById(id, function(err, instance) {
                    if (instance === null) {
                        callback(buildTaskNotFoundResponse(id));
                    } else {
                        if (newHour.worker_id !== instance.assigned_worker_id) {
                            callback(buildTaskNotAssignedResponse());
                        } else {            
                            hourModel.find({where: {task_id: id}}, function(err, response) {
                                if (err) {
                                    // Unexpected error
                                    callback(err);
                                } else {
                                    const hoursQuantity = response
                                        .filter(hour => isSameDay(newHour.date, hour.date))
                                        .reduce((accumulator, hour) => accumulator + hour.quantity, 0);
                                    if ((hoursQuantity + newHour.quantity) <= 24) {
                                        hourModel.create(newHour, function(err, cb) {
                                            if (err) {
                                                // Unexpected error
                                                callback(err);
                                            } else {
                                                callback(null, newHour);
                                            }
                                        });
                                    } else {
                                        callback(buildNotMoreHoursCanBeUploadedResponse());
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
      }
    
    Task.remoteMethod('loadHours', {
        accepts: [
            {arg: 'id', type: 'number', required: true},
            {arg: 'data', type: 'object', http: {source: 'body'}}
        ],
        returns: [
            {arg: 'quantity', type: 'number'},
            {arg: 'date', type: 'date'},
            {arg: 'worker_id', type: 'number'}
        ],
        http: {
            status: 201,
            path: '/:id/loadHours', verb: 'post'
        }
  });
};
