import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { MarketStallConnector, QueryListUserStallsArgs } from "../../../gql";

export function request(ctx: Context<QueryListUserStallsArgs>) {
  return query({
    index: "UserId-Index",
    query: { userId: { eq: (ctx.identity as AppSyncIdentityCognito).sub } },
    nextToken: ctx.args.nextToken,
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketStallConnector>
) {
  return ctx.result.items;
}
