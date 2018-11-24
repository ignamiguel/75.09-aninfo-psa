INSERT INTO timetracker.Hour (id, quantity, date, worker_id, task_id) VALUES (1, 8, '2018-11-15 12:45:19', 1, 1);
INSERT INTO timetracker.Hour (id, quantity, date, worker_id, task_id) VALUES (2, 8, '2018-11-16 02:00:00', 2, 2);

INSERT INTO timetracker.Task (id, name, description, type, status, begin_date, end_date, assigned_worker_id) VALUES (1, 'Implementación SAP', 'Debe implementarse SAP para cliente VISA', 'DEVELOPMENT', 'OPEN', '2018-11-15 03:00:23', null, 1);
INSERT INTO timetracker.Task (id, name, description, type, status, begin_date, end_date, assigned_worker_id) VALUES (2, 'Deployment', 'Deployment del servicio en HSBC', 'TEST', 'IN PROGRESS', null, null, 2);

INSERT INTO timetracker.Worker (id, name, last_name) VALUES (1, 'Gaston', 'Tulipani');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (2, 'Ignacio', 'Iglesias');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (3, 'Santiago', 'Monsech');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (4, 'Diego', 'Alfonso');