# Dummy AWS App

A simple full stack app

The app currently allows for reading and writing to the database.

## Client
A simple ReactJS application using Material UI written in TypeScript

## Server
An Express JS application deployed to AWS Lambda with an API Gateway + the Serverless Framework written in Typescript

URL: [https://6lnooio7f6.execute-api.us-east-1.amazonaws.com/prod/](https://6lnooio7f6.execute-api.us-east-1.amazonaws.com/prod/)


## Database
A MySQL Database deployed to AWS RDS created using MySQL Workbench

## Hooks
AWS Cognito Lambda functions.

### Post signup
A Lambda trigger written with Go to be called after a user is confirmed. The function is built with Docker running Amazon Linux
