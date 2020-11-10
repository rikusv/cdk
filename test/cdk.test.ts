import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import { OpengazettesStack } from '../lib/opengazettes-stack'
import { EnvConfig } from '../src/env-config'

test('Empty Stack', () => {
    const app = new cdk.App()
    // WHEN
    const stack = new OpengazettesStack(app, 'MyTestStack', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      envConfig: new EnvConfig('opengazettes', 'tmp')
    });
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
})
