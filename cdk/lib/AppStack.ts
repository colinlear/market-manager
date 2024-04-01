import { Stack, StackProps, Stage, StageProps } from "aws-cdk-lib";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { resolve } from "path";
import { GraphQLStack } from "./GraphQLStack";

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
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

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const websiteBucket = new Bucket(this, "WebsiteBucket");

    const website = new Distribution(this, "Website", {
      defaultBehavior: {
        origin: new S3Origin(websiteBucket, {}),
      },
    });

    new BucketDeployment(this, "WebsiteDeployment", {
      sources: [Source.asset(resolve(__dirname, "..", "..", "dist"))],
      destinationBucket: websiteBucket,
      distribution: website,
    });
  }
}
