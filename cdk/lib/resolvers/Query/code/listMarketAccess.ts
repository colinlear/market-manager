import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { MarketAccessConnector, QueryListMarketsArgs } from "../../../gql";

export function request(ctx: Context<QueryListMarketsArgs>) {
  return query({
    query: {
      userId: { eq: (ctx.identity as AppSyncIdentityCognito).sub },
      nextToken: ctx.args.nextToken,
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketAccessConnector>
) {
  return ctx.result.items;
}
