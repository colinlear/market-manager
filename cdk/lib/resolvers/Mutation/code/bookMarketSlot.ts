import { Context } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";
import { MarketBooking, MutationBookMarketSlotArgs } from "../../../gql";

export function request(ctx: Context<MutationBookMarketSlotArgs>) {
  const marketIdDate = `${ctx.args.marketId}-${ctx.args.booking.date}`;
  return put({
    key: {
      marketIdDate,
      stallId: ctx.args.booking.stallId,
    },
    item: {
      marketIdDate,
      ...ctx.args.booking,
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketBooking>
) {
  return ctx.result;
}
