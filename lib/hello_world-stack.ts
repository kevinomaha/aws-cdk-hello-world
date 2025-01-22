import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { EnvironmentConfig } from '../config/environment-config';

export interface HelloWorldStackProps extends cdk.StackProps {
  readonly envConfig: EnvironmentConfig;
}

export class HelloWorldStack extends cdk.Stack {
  public readonly api: apigateway.RestApi;

  constructor(scope: Construct, id: string, props: HelloWorldStackProps) {
    super(scope, id, props);

    // Create Lambda function with environment-specific name
    const helloFunction = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'hello_world.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '..', 'lambda')),
      environment: {
        ENVIRONMENT: props.envConfig.environment
      },
      functionName: `hello-world-${props.envConfig.environment}`
    });

    // Create API Gateway with environment-specific name
    this.api = new apigateway.RestApi(this, 'HelloWorldApi', {
      restApiName: `Hello World API - ${props.envConfig.environment}`,
      description: `This is a simple API Gateway with Lambda integration for ${props.envConfig.environment} environment.`,
      deployOptions: {
        stageName: props.envConfig.stageName,
        variables: {
          environment: props.envConfig.environment
        }
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Add a root resource and method
    const hello = this.api.root.addResource('hello');
    hello.addMethod('GET', new apigateway.LambdaIntegration(helloFunction), {
      methodResponses: [{
        statusCode: '200',
        responseModels: {
          'application/json': apigateway.Model.EMPTY_MODEL,
        },
        responseParameters: {
          'method.response.header.Access-Control-Allow-Origin': true,
        },
      }],
    });

    // Add stack outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: this.api.url,
      description: `API Gateway endpoint URL for ${props.envConfig.environment} environment`,
      exportName: `ApiEndpoint-${props.envConfig.environment}`
    });
  }
}
