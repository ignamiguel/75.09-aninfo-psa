CREATE TABLE timetracker.Hour
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity int(11) NOT NULL,
    date datetime NOT NULL,
    worker_id int(11) NOT NULL,
    task_id int(11) NOT NULL
);

CREATE TABLE timetracker.Task
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text,
    type varchar(20) NOT NULL,
    status varchar(15) NOT NULL,
    begin_date datetime,
    end_date datetime,
    assigned_worker_id int(11) NOT NULL
);

CREATE TABLE timetracker.Worker
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL
);
