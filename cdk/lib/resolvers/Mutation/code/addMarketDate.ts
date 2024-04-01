import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";
import { MarketDate, MutationAddMarketDateArgs } from "../../../gql";
import { MarketAccessStash } from "./stashMarketAccess";

export interface MarketDateSaved extends Omit<MarketDate, "layout"> {
  layout?: string;
}

export function request(
  ctx: Context<MutationAddMarketDateArgs, MarketAccessStash>
) {
  if (
    ctx.stash.marketAccess?.access !== "manager" &&
    !(ctx.identity as AppSyncIdentityCognito).groups?.includes("admin")
  ) {
    util.error("Insufficient Access", "ACCESS_DENIED");
  }
  const { date, layout, ...marketProps } = ctx.args.market;
  return put({
    key: {
      marketId: ctx.args.marketId,
      date: date,
    },
    item: {
      marketId: ctx.args.marketId,
      date: date,
      layout: JSON.stringify(layout),
      ...marketProps,
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketDateSaved>
) {
  const { layout = "[]", ...market } = ctx.result;
  return { layout: JSON.parse(layout), ...market };
}
