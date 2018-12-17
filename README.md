[![Build Status](https://travis-ci.org/ignamiguel/75.09-aninfo-psa.svg?branch=master)](https://travis-ci.org/ignamiguel/75.09-aninfo-psa)
# PSA - TimeTracker

The BE has been generated using [LoopBack](http://loopback.io).
The FE has been generated using [Create React App](https://github.com/facebook/create-react-app).

## Build and Deployment
### Build Backend
There is no build command necessary for the BE to build
### Build Frontend
The following command will rebuild only the Frontend and must be executed inside the `client_src` directory:
```
npm run-script build
```
This command will build the React Application and copy the `build` folder to the client folder from the higher level.
Alternately, the same command can be executed from the root path, and it will move to the `client_src` directory, run the same command and get back to the root path.

### Start MySQL
The Application uses MySQL as datasource. A database called `timetracker` must be created before running the application among with the following tables:
- Project
- Worker
- Task
- Hour

Two migration scripts are available under the `/resources` folder:
- `01_tables_creation.sql` creates the DB tables.
- `02_test_data.sql` creates some test data.

### Run Application
In order to run the application, the following command must be executed: 
```
node .
```
#### API
The Application is exposed in port **8080** and API endpoints are found under `api` path.
#### Swagger
The Application includes [Swagger](https://swagger.io/) documentation in `/explore` path

## Test
In order to test the E2E Flows using [Cucumber-JS](https://github.com/cucumber/cucumber-js), the following command must be executed:
```
npm test
```
A JSON report can be found under `test/report/cucumber_report.json`. The JSON report can be transformed to a HTML by executing the following command:
```
npm run-script report
```
In order to run the E2E UI tests with [Protractor](http://www.protractortest.org/#/) follow these steps:
```bash
# Run the app in background
node . &
# Then run
npm run test:e2eui
# To stop the app, search for node process running the app and kill it with
kill -9 <pid>
```
