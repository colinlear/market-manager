import { AppSyncIdentityCognito, Context } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";
import { MarketStall, MutationCreateStallArgs } from "../../../gql";

export function request(ctx: Context<MutationCreateStallArgs>) {
  const userId = (ctx.identity as AppSyncIdentityCognito).sub;
  const stallId = util.autoUlid();
  return put({
    key: {
      stallId,
    },
    item: {
      stallId,
      userId,
      ...ctx.args.stall,
    },
  });
}

export function response(
  ctx: Context<never, never, never, never, MarketStall>
) {
  return ctx.result;
}
