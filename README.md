# Quizlet

The application is a Deno application built with Oak framework for repeated practice of learned content. Registered users can create multiple choice questions for admin-set topics that can be answered by other users. The app also provides a basic API.

Skip to the end of the document for instructions on how to test and run the application.

## Structure

The app follows a three-tier architecture (client, server, database) and is built following a layered architecture with four layers (views, controllers, services and a Postgres database).

## Features of the application

The subheaders outline the built features of the application based on the project requirement specifications.

+ Listing topics

+ Creating and removing topics

+ Creating and listing questions for a topic

+ Viewing a question and adding answer options

+ Removing answer options and questions

+ Login functionality

+ Asking questions

+ Access control

+ Validation

+ Encryption


The application has three user roles: Admin, registered user, visitor. The table below outlines quickly what each user role can do with the application based on the features.

| Feature | Admin | User | Visitor |
|-------- | ----- | ---- | ------- |
| Viewing topics | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: | 
| Creating and removing topics | :heavy_check_mark: | :white_check_mark: | :white_check_mark: |
| Creating and listing questions | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| Adding and removing answer options | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| Auth (register/login) | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Quiz functionality | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| API | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |



### Styles

The app uses CDN for styling the rendered pages. The library used is [https://materializecss.com/].

### CI/CD Pipeline

As an extra feature, I set up a CI/CD pipeline using Github Actions to deploy the application to Heroku automatically if/when automated tests succeed to save myself some extra hassle/time when building the app incrementally and adding more features.

### Automated tests

The application has a set of automated tests built using superoak, a testing library for Deno/Oak. Instructions on how to run them can be found below. The app does not have perfect test coverage, but most of the tests are directed towards end-to-end testing rather than testing specific functions.


## Setup and running the application

The Oak app is created in `app.js` where the app is exported. The application can be launched locally using the file `run_locally.js`. To build the application, run the command `docker-compose up` (or `docker compose up` without the hyphen) from the directory where `docker-compose.yml` is housed. The default location of the running app is [http://localhost:7777].

The database is created automatically with a preset admin account and a single topic. To test the admin account, login using `admin@admin.com` with the password `123456`. 


## Deployed application url:

The project can be found and tested at [https://quizlet-bonanza.herokuapp.com/].
Note that the application start-up might take a moment if the service has been inactive for a while.
Also note that the application will be taken offline sometime late November due to Heroku
terms for PostgresSQL addon changing.

## Running tests

The project has quite a number of automated end-to-end tests and has a CI-CD pipeline
set up for automated Heroku deployment when the tests pass. To run the tests locally,
use the command `docker compose run --rm drill-and-practice test --allow-all`
while within the directory that contains the docker-compose.yml -file.

Depending on your installation (given that either Docker Compose or Docker Desktop is installed), the command might
be `docker-compose run --rm drill-and-practice test --allow-all`.

- The `--rm` flag runs a one-off command on a service that is discarded after use.
- `drill-and-practice` is the service/application's name
- the `--allow-all` flag can be substituted with `--allow-env --allow-net --allow-read` if you want to limit access