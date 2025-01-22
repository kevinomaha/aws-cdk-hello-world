#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HelloWorldStack } from '../lib/hello_world-stack';
import { environments } from '../config/environment-config';

const app = new cdk.App();

// Create stacks for each environment
Object.entries(environments).forEach(([envName, envConfig]) => {
  new HelloWorldStack(app, `HelloWorldStack-${envName}`, {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION
    },
    envConfig: envConfig,
    tags: {
      environment: envConfig.environment
    }
  });
});