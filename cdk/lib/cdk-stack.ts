import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AppStack } from "./AppStack";
import { GraphQLStack } from "./GraphQLStack";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new GraphQLStack(this, "AppApi", {
      stackName: "MarketManagerApiStack",
      tags: {
        application: "market-manager",
      },
    });

    new AppStack(this, "AppStack", {
      stackName: "MarketManagerAppStack",
      tags: {
        application: "market-manager",
      },
    });
  }
}
