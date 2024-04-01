import { Stack, StackProps } from "aws-cdk-lib";
import {
  AuthorizationType,
  Definition,
  GraphqlApi,
} from "aws-cdk-lib/aws-appsync";
import { Construct } from "constructs";
import { resolve } from "path";
import { DataSources } from "./DataSources";
import { QueryResolvers } from "./resolvers/Query";
import {
  UserPool,
  VerificationEmailStyle,
  AccountRecovery,
  CfnUserPoolGroup,
} from "aws-cdk-lib/aws-cognito";
import { MutationResolvers } from "./resolvers/Mutation";
import { MarketDateResolvers } from "./resolvers/MarketDate";
import { MarketBookingResolvers } from "./resolvers/MarketBooking";
import { MarketAccessResolvers } from "./resolvers/MarketAccess";

export class GraphQLStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const prefix = "MarketApp-";

    const userPool = new UserPool(this, "UserPool", {
      userPoolName: "MarketManager",
      signInCaseSensitive: true,
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: "Verify your email for our awesome app!",
        emailBody:
          "Thanks for signing up to our awesome app! Your verification code is {####}",
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage:
          "Thanks for signing up to our awesome app! Your verification code is {####}",
      },
      signInAliases: { email: true },
      autoVerify: { email: true },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
    });

    userPool.addClient("web-app-client", {
      authFlows: {
        userSrp: true,
      },
    });

    new CfnUserPoolGroup(this, "AdminUsers", {
      userPoolId: userPool.userPoolId,
      description: "Market App managers",
      groupName: "admin",
    });

    const api = new GraphqlApi(this, "MarketAppsyncApi", {
      name: prefix + "Api",
      definition: Definition.fromFile(
        resolve(__dirname, "AppsyncSchema.graphql")
      ),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: AuthorizationType.IAM,
          },
        ],
      },
    });

    const datasources = new DataSources(
      this,
      "MarketAppDataSources",
      prefix,
      api
    );

    new QueryResolvers(this, "QueryResolvers", api, datasources);
    new MutationResolvers(this, "MutationResolvers", api, datasources);
    new MarketDateResolvers(this, "MarketDateResolvers", api, datasources);
    new MarketBookingResolvers(this, "MarketBookngResolvers", api, datasources);
    new MarketAccessResolvers(this, "MarketAccessResolvers", api, datasources);
  }
}
