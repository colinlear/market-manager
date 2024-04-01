import { Construct } from "constructs";
import { DataSources } from "../../DataSources";
import { FunctionRuntime, GraphqlApi, Resolver } from "aws-cdk-lib/aws-appsync";
import { SimpleResolverCode } from "../util";
import { resolve } from "path";

export class MarketBookingResolvers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    api: GraphqlApi,
    datasources: DataSources
  ) {
    super(scope, id);

    new Resolver(this, "MarketBooking_stall_Resolver", {
      api,
      typeName: "MarketBooking",
      fieldName: "stall",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketStall.createFunction({
          name: "MarketBooking_stall",
          code: resolve(__dirname, "code", "stall.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "SavedMarketBooking_stall_Resolver", {
      api,
      typeName: "SavedMarketBooking",
      fieldName: "stall",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketStall.createFunction({
          name: "MarketBooking_stall",
          code: resolve(__dirname, "code", "stall.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });
  }
}
