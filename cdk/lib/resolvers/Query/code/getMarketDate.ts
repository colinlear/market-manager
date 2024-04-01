import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { QueryGetMarketDateArgs } from "../../../gql";
import { MarketDateSaved } from "../../Mutation/code/addMarketDate";

export function request(ctx: Context<QueryGetMarketDateArgs>) {
  return query({
    query: {
      marketId: {
        eq: ctx.args.marketId,
      },
      date: {
        eq: ctx.args.date,
      },
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketDateSaved>
) {
  const { layout = "[]", ...market } = ctx.result;
  return { layout: JSON.parse(layout), ...market };
}
