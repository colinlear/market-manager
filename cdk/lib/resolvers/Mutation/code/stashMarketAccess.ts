import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { MarketAccess, MutationBookMarketSlotArgs } from "../../../gql";

export interface MarketAccessStash {
  marketAccess?: MarketAccess;
}

export function request(ctx: Context<MutationBookMarketSlotArgs>) {
  return get({
    key: {
      marketId: ctx.args.marketId,
      userId: (ctx.identity as AppSyncIdentityCognito).sub,
    },
  });
}

export function response(
  ctx: Context<
    MutationBookMarketSlotArgs,
    MarketAccessStash,
    never,
    never,
    MarketAccess
  >
) {
  ctx.stash.marketAccess = ctx.result;
  return ctx.result;
}
