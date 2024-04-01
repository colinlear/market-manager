import { Context } from "@aws-appsync/utils";
import { scan } from "@aws-appsync/utils/dynamodb";
import { MarketStallConnector, QueryListMarketStallsArgs } from "../../../gql";

export function request(ctx: Context<QueryListMarketStallsArgs>) {
  return scan({ nextToken: ctx.args.nextToken });
}

export function response(
  ctx: Context<never, never, never, never, MarketStallConnector>
) {
  return ctx.result;
}
