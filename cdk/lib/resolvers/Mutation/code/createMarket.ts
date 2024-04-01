import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";
import { MarketAccess, MutationCreateMarketArgs } from "../../../gql";

export function request(ctx: Context<MutationCreateMarketArgs>) {
  return put({
    key: {
      marketId: ctx.args.marketId,
      userId: (ctx.identity as AppSyncIdentityCognito).sub,
    },
    item: {
      marketId: ctx.args.marketId,
      userId: (ctx.identity as AppSyncIdentityCognito).sub,
      access: "manager",
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketAccess>
) {
  return ctx.result;
}
