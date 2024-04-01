import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { MarketAccess, SavedMarket } from "../../../gql";

export interface SavedMarketSavedConnector {
  nextToken?: string;
  items: SavedMarketSaved[];
}

export interface SavedMarketSaved
  extends Omit<SavedMarket, "layout" | "bookings"> {
  layout: string;
  bookings: string;
}

export function request(ctx: Context<never, never, never, MarketAccess>) {
  if (!ctx.source) {
    runtime.earlyReturn(null);
  }
  return query({
    query: {
      marketId: { eq: ctx.source.marketId },
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, SavedMarketSavedConnector>
) {
  return {
    nextToken: ctx.result.nextToken,
    items: ctx.result.items?.map(
      ({ layout = "[]", bookings = "[]", ...market }) => {
        return {
          layout: JSON.parse(layout),
          bookings: JSON.parse(bookings),
          ...market,
        };
      }
    ),
  };
}
