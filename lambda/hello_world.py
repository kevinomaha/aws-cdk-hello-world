import os

def handler(event, context):
    environment = os.environ.get('ENVIRONMENT', 'unknown')
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'  # Required for CORS support
        },
        'body': f'{{"message": "Hello from Lambda in {environment} environment!"}}'
    }
