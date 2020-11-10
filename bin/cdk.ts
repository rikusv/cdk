#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import * as assert from 'assert'

import { OpengazettesStack } from '../lib/opengazettes-stack'

import { BaseStackProps } from '../src/stacks'
import { EnvConfig } from '../src/env-config'

const app = new cdk.App()

const env = app.node.tryGetContext('env')
assert(env, 'env must be specified e.g. cdk deploy --context env=stg')



const baseProps: BaseStackProps = {
  removalPolicy: env === 'prd' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY,
  terminationProtection: env === 'prd',
  env: {
    region: 'eu-west-1'
  },
  tags: {
    env
  }
}


new OpengazettesStack(app, `OpengazettesStack-${env}`, {
  ...baseProps,
  env: {
    region: 'us-east-1'
  },
  envConfig: new EnvConfig('opengazettes', env)
})
