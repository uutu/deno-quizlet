# Quizlet

The application is a Deno application built with Oak framework for repeated practice of learned content. Registered users can create multiple choice questions for admin-set topics that can be answered by other users. The app also provides a basic API.

Note that the specs on handling correctness/incorrectness of an answer option was ambiguous so it's good to keep in mind that a question can have multiple correct answers, a single correct answer or no correct answers at all. So, in short, the application trusts the users to act in "good faith" when adding questions&answers while using the application.

Skip to the end of the document for instructions on how to test and run the application.

## Structure

The app follows a three-tier architecture (client, server, database) and is built following a layered architecture with four layers (views, controllers, services and a Postgres database).

The views are eta-files rendered on the server, the app has a number of controllers with their separated conserns/responsibilities, a number of services responsible for SQL queries and a relational database where the data is stored and accessed from.

## Features of the application

The bullets outline a quick overview of the built features of the application based on the project requirement specifications.

+ Listing topics

+ Creating and removing topics

+ Creating and listing questions for a topic

+ Viewing a question and adding answer options

+ Removing answer options and questions

+ Authentication functionality (Login & Register)

+ Asking questions (Quiz feature)

+ Statistics

The main page has some rudimentary statistics about the data (topics, questions, answered questions). Removing tables from the database cascades to child-/foreign key tables as well.

+ Access control

The important paths of the application `/topics`, `/quiz` are restricted for admins and registered users and redirect to login if accessed without the proper access rights. An authentication middleware is used alongside sessions to limit as well as keep track of the user interacting with the app.

+ Validation

Basic functionality for validating entered form data server-side using the validasaur -library.

+ Encryption

Passwords are encrypted using the brypt -library and no passwords are stored in plaintext format.

+ API

The API provides means to retrieve random questions and answer them via JSON-objects.

### User roles

The application has three user roles: Admin, registered user, visitor. The table below outlines quickly what each user role can do with the application based on the features.

| Feature | Admin | User | Visitor |
|-------- | ----- | ---- | ------- |
| Viewing topics | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: | 
| Creating and removing topics | :heavy_check_mark: | :white_check_mark: | :white_check_mark: |
| Creating and listing questions | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| Removing questions | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| Adding and removing answer options | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| Auth (register/login) | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| Quiz functionality and features | :heavy_check_mark: | :heavy_check_mark: | :white_check_mark: |
| API | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |


### Styles

The app uses CDN for styling the rendered pages. The library used is Materialize https://materializecss.com/.

### CI/CD Pipeline

As an extra feature, I set up a CI/CD pipeline using Github Actions to deploy the application to Heroku automatically if/when automated tests succeed to save myself some extra hassle/time when building the app incrementally and adding more features.

### Automated tests

The application has a set of automated tests built using superoak, a testing library for Deno/Oak. Instructions on how to run them can be found below. The app does not have perfect test coverage, but most of the tests are directed towards end-to-end testing rather than testing specific functions.


## Setup and running the application

The Oak app is created in `app.js` where the app is exported. The application can be launched locally using the file `run_locally.js`. To build the application, run the command `docker-compose up` (or `docker compose up` without the hyphen) from the directory where `docker-compose.yml` is housed. The default location of the running app is http://localhost:7777. Docker takes care of the app's dependencies for a quick&easy setup.

The database is created automatically with a preset admin account and a single topic. To test the admin account, login using `admin@admin.com` with the password `123456`. 


## Deployed application url:

The project can be found and tested at https://quizlet-bonanza.herokuapp.com/.
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