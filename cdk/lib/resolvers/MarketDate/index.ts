import { Construct } from "constructs";
import { DataSources } from "../../DataSources";
import { FunctionRuntime, GraphqlApi, Resolver } from "aws-cdk-lib/aws-appsync";
import { SimpleResolverCode } from "../util";
import { resolve } from "path";

export class MarketDateResolvers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    api: GraphqlApi,
    datasources: DataSources
  ) {
    super(scope, id);

    new Resolver(this, "MarketDate_marketDates_Resolver", {
      api,
      typeName: "MarketDate",
      fieldName: "bookings",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketBooking.createFunction({
          name: "MarketDate_bookings",
          code: resolve(__dirname, "code", "bookings.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });
  }
}
