import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { MarketBookingConnector, MarketDate } from "../../../gql";

export function request(ctx: Context<never, never, never, MarketDate>) {
  if (!ctx.source) {
    runtime.earlyReturn(null);
  }
  return query({
    query: {
      marketIdDate: { eq: `${ctx.source.marketId}-${ctx.source.date}` },
    },
    limit: 100,
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketBookingConnector>
) {
  return ctx.result;
}
