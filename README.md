# AWS CDK Hello World API

This project demonstrates a multi-environment serverless API using AWS CDK, API Gateway, and Lambda. It provides a simple "Hello World" endpoint with environment-specific responses.

## Architecture

- **AWS API Gateway**: REST API with CORS support
- **AWS Lambda**: Python-based function that returns environment-specific greetings
- **AWS CDK**: Infrastructure as Code using TypeScript
- **Multi-environment Support**: Separate dev, test, and prod environments

## API Endpoints

The API provides a `/hello` endpoint that returns a greeting message specific to each environment:

- Dev: `https://i8atpde5g6.execute-api.us-east-1.amazonaws.com/dev/hello`
- Test: `https://23hl0walue.execute-api.us-east-1.amazonaws.com/test/hello`
- Prod: Available after deployment

## Project Structure

- `/lib`: CDK stack definition
- `/lambda`: Lambda function code
- `/config`: Environment configuration
- `/bin`: CDK app entry point

## Prerequisites

- Node.js and npm
- AWS CDK CLI
- AWS CLI configured with appropriate credentials
- Python 3.9 or later

## Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Bootstrap CDK (if not already done):
   ```bash
   npx cdk bootstrap aws://ACCOUNT-NUMBER/REGION
   ```

3. Deploy to specific environment:
   ```bash
   npx cdk deploy HelloWorldStack-dev  # For dev environment
   npx cdk deploy HelloWorldStack-test # For test environment
   npx cdk deploy HelloWorldStack-prod # For prod environment
   ```

## Useful Commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
