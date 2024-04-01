import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { get } from "@aws-appsync/utils/dynamodb";
import {
  MarketStall,
  MutationBookMarketSlotArgs,
  MutationUpdateStallArgs,
} from "../../../gql";
import { MarketAccessStash } from "./stashMarketAccess";

export interface StallAccessStash {
  stallAccess?: "admin" | "manager" | "owner";
}

export function request(
  ctx: Context<MutationUpdateStallArgs, MarketAccessStash & StallAccessStash>
) {
  if ((ctx.identity as AppSyncIdentityCognito).groups?.includes("admin")) {
    ctx.stash.stallAccess = "admin";
  }
  if (ctx.stash.marketAccess?.access === "manager") {
    ctx.stash.stallAccess = "manager";
  }
  return get({
    key: {
      stallId: ctx.args.stallId,
    },
  });
}

export function response(
  ctx: Context<
    MutationBookMarketSlotArgs,
    StallAccessStash,
    never,
    never,
    MarketStall
  >
) {
  if (ctx.error) {
    util.appendError(ctx.error.message, ctx.error.type);
  }
  if (ctx.result == null) {
    util.error("Market Stall Not Found", "NOT_FOUND");
  } else if (
    ctx.result.userId === (ctx.identity as AppSyncIdentityCognito).sub
  ) {
    ctx.stash.stallAccess = "owner";
  }
  return ctx.result;
}
