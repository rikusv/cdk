import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as lambda  from '@aws-cdk/aws-lambda'
import * as cloudfront from '@aws-cdk/aws-cloudfront'
import * as origins from '@aws-cdk/aws-cloudfront-origins'

import { StackProps } from '../src/stacks'

export class OpengazettesStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StackProps) {
    super(scope, id, props)

    const bucketArn = props.envConfig.get('bucketArn')
    let bucket: s3.Bucket | s3.IBucket
    if (bucketArn === null) {
      bucket = new s3.Bucket(this, 'Bucket', {
        removalPolicy: props.removalPolicy
      })
    } else {
      bucket = s3.Bucket.fromBucketArn(this, 'Bucket', bucketArn)
    }

    const edgeFunction = new lambda.Function(this, 'EdgeFunction', {
      handler: 'viewer_response.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset('from-somewhere/opengazettes/edge-function')
    })

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        edgeLambdas: [
          {
            functionVersion: edgeFunction.currentVersion,
            eventType: cloudfront.LambdaEdgeEventType.VIEWER_RESPONSE
          }
        ]
      }
    })

    new cdk.CfnOutput(this, 'Url', {
      value: distribution.distributionDomainName
    })

  }
}
