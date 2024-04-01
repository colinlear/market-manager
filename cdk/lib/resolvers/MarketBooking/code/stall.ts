import { Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import { MarketBooking, MarketStall, SavedMarketBooking } from "../../../gql";

export function request(
  ctx: Context<never, never, never, MarketBooking | SavedMarketBooking>
) {
  if (!ctx.source) {
    runtime.earlyReturn(null);
  }
  return get({
    key: {
      stallId: { eq: ctx.source.stallId },
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketStall>
) {
  return ctx.result;
}
