CREATE TABLE timetracker.Project
(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    begin_date datetime,
    end_date datetime,
    estimated_begin_date datetime,
    estimated_end_date datetime,
    estimated_cost int,
    status varchar(15) NOT NULL
);

CREATE TABLE timetracker.Worker
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL
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
    add-project-entity
    assigned_worker_id int(11) NOT NULL,
    project_id int(11) NOT NULL
);

CREATE TABLE timetracker.Hour
(
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    quantity int(11) NOT NULL,
    date datetime NOT NULL,
    worker_id int(11) NOT NULL,
    task_id int(11) NOT NULL
);
