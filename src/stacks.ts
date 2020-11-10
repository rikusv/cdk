import * as cdk from '@aws-cdk/core'

import { EnvConfig } from '../src/env-config'

export interface BaseStackProps extends cdk.StackProps {
  removalPolicy: cdk.RemovalPolicy
}

export interface StackProps extends BaseStackProps {
  envConfig: EnvConfig
}
