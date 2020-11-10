# AWS CDK provisioning

This is an example of provisioning infrastructure on AWS with AWS CDK.

Apart from the typical, the following has been added:

- `env-config.json` is used to provide configuration values per stack, per environment. Some long-running environments may already have some resources - these can be identified here by ARN. Default values across environments can be provides using value '*' for the environment.
- `src/env-config.ts` provides an `EnvConfig` class that can be used per stack for easy access to environment config from `env-config.json`.

## Setup

Install [AWS CLI 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

Install AWS CDK: `npm install -g aws-cdk`.

The rest is similar to any JavaScript/Node.js 'package.json' driven project.

## Deploying

Run `npm run build`, or keep a window open with `npm run watch` to generate JavaScript from TypeScript source.

```bash
cdk bootstrap --context env=any # Before first deploy into account/region to create CloudFormation resources
cdk deploy --context env=target # Deploy all stacks to environment 'target'
cdk deploy OpengazettesStack-target  --context env=target # Deploy only Opengazettes stack
cdk diff OpengazettesStack-target  --context env=target # Compare deployed Opengazettes stack with to be deployed state
```
