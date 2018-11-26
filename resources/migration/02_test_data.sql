INSERT INTO timetracker.Project (id, title, description, begin_date, end_date, estimated_begin_date, estimated_end_date, estimated_cost, status) VALUES (1, 'Instr. CRM en Prisma S.A.', 'Se debe instrumentar CRM en Prisma S.A.', '2018-10-10 00:00:00', null, '2018-10-01 00:00:00', '2018-11-02 00:00:00', 700, 'En Peligro');
INSERT INTO timetracker.Project (id, title, description, begin_date, end_date, estimated_begin_date, estimated_end_date, estimated_cost, status) VALUES (2, 'Release 1.7', 'Implementar Release 1.7', '2018-11-25 20:58:45', null, '2018-11-25 20:58:50', '2019-09-20 20:58:54', 500, 'En Progreso');
INSERT INTO timetracker.Project (id, title, description, begin_date, end_date, estimated_begin_date, estimated_end_date, estimated_cost, status) VALUES (3, 'Modulo ML para BI', 'Crear un módulo de ML para BI', '2018-11-25 21:00:49', null, '2018-11-25 21:00:52', '2019-10-31 21:00:11', 4000, 'En Progreso');

INSERT INTO timetracker.Worker (id, name, last_name) VALUES (1, 'Gaston', 'Tulipani');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (2, 'Ignacio', 'Iglesias');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (3, 'Santiago', 'Monsech');
INSERT INTO timetracker.Worker (id, name, last_name) VALUES (4, 'Diego', 'Alfonso');

INSERT INTO timetracker.Task (id, name, description, type, status, begin_date, end_date, assigned_worker_id, project_id) VALUES (1, 'Crear esquema DB', 'Crear la DB junto con la estructura principal de tablas', 'Desarrollo', 'En Progreso', '2018-11-15 03:00:23', null, 1, 1);
INSERT INTO timetracker.Task (id, name, description, type, status, begin_date, end_date, assigned_worker_id, project_id) VALUES (2, 'Crear proyecto con template', 'Crear el template inicial del proyecto', 'Diseño', 'En Progreso', '2018-11-20 21:04:51', null, 2, 1);
INSERT INTO timetracker.Task (id, name, description, type, status, begin_date, end_date, assigned_worker_id, project_id) VALUES (3, 'Migrar a Redis', 'Realizar migración a Redis', 'Desarrollo', 'Pendiente', null, null, 1, 1);

INSERT INTO timetracker.Hour (id, quantity, date, worker_id, task_id) VALUES (1, 8, '2018-11-15 12:45:19', 1, 1);
INSERT INTO timetracker.Hour (id, quantity, date, worker_id, task_id) VALUES (2, 8, '2018-11-17 00:00:00', 2, 2);
