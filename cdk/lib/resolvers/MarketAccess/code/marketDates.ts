import { Context } from "@aws-appsync/utils";
import { query } from "@aws-appsync/utils/dynamodb";
import { MarketAccess } from "../../../gql";
import { MarketDateSaved } from "../../Mutation/code/addMarketDate";

export interface MarketDateSavedConnector {
  nextToken?: string;
  items: MarketDateSaved[];
}

export function request(ctx: Context<never, never, never, MarketAccess>) {
  if (!ctx.source) {
    runtime.earlyReturn(null);
  }
  // const showHidden = ctx.source?.access !== "manager";
  return query({
    query: {
      marketId: { eq: ctx.source.marketId },
    },
    // filter: !showHidden
    //   ? {
    //       published: {
    //         and: [
    //           {
    //             contains: true,
    //           },
    //           {
    //             ne: null,
    //           },
    //         ],
    //       },
    //     }
    //   : undefined,
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketDateSavedConnector>
) {
  return {
    nextToken: ctx.result.nextToken,
    items: ctx.result.items?.map(({ layout = "[]", ...market }) => {
      return {
        layout: JSON.parse(layout),
        ...market,
      };
    }),
  };
}
