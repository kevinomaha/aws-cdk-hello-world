export interface EnvironmentConfig {
  readonly environment: string;
  readonly stageName: string;
}

export const environments: { [key: string]: EnvironmentConfig } = {
  dev: {
    environment: 'dev',
    stageName: 'dev'
  },
  test: {
    environment: 'test',
    stageName: 'test'
  },
  prod: {
    environment: 'prod',
    stageName: 'prod'
  }
};
