# Quizlet

- Specs and documentation added later..

## Structure

## Features of the application, [adding as more are finished]


## Setup and running the application


## Deployed application url:


## Running tests

The project has quite a number of automated end-to-end tests and has a CI-CD pipeline
set up for automated Heroku deployment when the tests pass. To run the tests locally,
use the command docker compose run --rm drill-and-practice test --allow-all
while within the directory that contains the docker-compose.yml -file.

Depending on your installation (given that either Docker Compose or Docker Desktop is installed), the command might
be docker-compose run --rm drill-and-practice test --allow-all.

- The --rm flag runs a one-off command on a service that is discarded after use.
- drill-and-practice is the service/application's name
- the --allow-all flag can be substituted with --allow-env --allow-net --allow-read if you want to limit access