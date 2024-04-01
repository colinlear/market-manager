import { Construct } from "constructs";
import { DataSources } from "../../DataSources";
import { FunctionRuntime, GraphqlApi, Resolver } from "aws-cdk-lib/aws-appsync";
import { SimpleResolverCode } from "../util";
import { resolve } from "path";

export class QueryResolvers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    api: GraphqlApi,
    datasources: DataSources
  ) {
    super(scope, id);

    new Resolver(this, "Query_listMarkets_Resolver", {
      api,
      typeName: "Query",
      fieldName: "listMarkets",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.access.createFunction({
          name: "listMarketAccess",
          code: resolve(__dirname, "code", "listMarketAccess.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "Query_listUserStalls_Resolver", {
      api,
      typeName: "Query",
      fieldName: "listUserStalls",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketStall.createFunction({
          name: "listUserStalls",
          code: resolve(__dirname, "code", "listUserStalls.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "Query_listMarketStalls_Resolver", {
      api,
      typeName: "Query",
      fieldName: "listMarketStalls",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketStall.createFunction({
          name: "listMarketStalls",
          code: resolve(__dirname, "code", "listMarketStalls.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "Query_getMarketDate_Resolver", {
      api,
      typeName: "Query",
      fieldName: "getMarketDate",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketDate.createFunction({
          name: "getMarketDate",
          code: resolve(__dirname, "code", "getMarketDate.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });
  }
}
