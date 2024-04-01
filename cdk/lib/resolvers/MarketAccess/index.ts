import { Construct } from "constructs";
import { DataSources } from "../../DataSources";
import { FunctionRuntime, GraphqlApi, Resolver } from "aws-cdk-lib/aws-appsync";
import { SimpleResolverCode } from "../util";
import { resolve } from "path";

export class MarketAccessResolvers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    api: GraphqlApi,
    datasources: DataSources
  ) {
    super(scope, id);

    new Resolver(this, "MarketAccess_marketDates_Resolver", {
      api,
      typeName: "MarketAccess",
      fieldName: "marketDates",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketDate.createFunction({
          name: "MarketAccess_marketDates",
          code: resolve(__dirname, "code", "marketDates.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "MarketAccess_savedMarkets_Resolver", {
      api,
      typeName: "MarketAccess",
      fieldName: "savedMarkets",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.savedMarket.createFunction({
          name: "MarketAccess_savedMarkets",
          code: resolve(__dirname, "code", "savedMarkets.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });
  }
}
