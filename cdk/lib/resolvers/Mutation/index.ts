import { Construct } from "constructs";
import { DataSources } from "../../DataSources";
import { FunctionRuntime, GraphqlApi, Resolver } from "aws-cdk-lib/aws-appsync";
import { SimpleResolverCode } from "../util";
import { resolve } from "path";

export class MutationResolvers extends Construct {
  constructor(
    scope: Construct,
    id: string,
    api: GraphqlApi,
    datasources: DataSources
  ) {
    super(scope, id);

    new Resolver(this, "Mutation_createMarket_Resolver", {
      api,
      typeName: "Mutation",
      fieldName: "createMarket",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.access.createFunction({
          name: "createMarket",
          code: resolve(__dirname, "code", "createMarket.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    new Resolver(this, "Mutation_createStall_Resolver", {
      api,
      typeName: "Mutation",
      fieldName: "createStall",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.marketStall.createFunction({
          name: "createStall",
          code: resolve(__dirname, "code", "createStall.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    // new Resolver(this, "Mutation_updateStall_Resolver", {
    //   api,
    //   typeName: "Mutation",
    //   fieldName: "updateStall",
    //   code: SimpleResolverCode,
    //   pipelineConfig: [
    //     datasources.marketStall.createFunction({
    //       name: "updateStall",
    //       code: resolve(__dirname, "code", "updateStall.ts"),
    //     }),
    //   ],
    //   runtime: FunctionRuntime.JS_1_0_0,
    // });

    new Resolver(this, "Mutation_addMarketDate_Resolver", {
      api,
      typeName: "Mutation",
      fieldName: "addMarketDate",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.access.createFunction({
          name: "stashMarketAccess",
          code: resolve(__dirname, "code", "stashMarketAccess.ts"),
        }),
        datasources.marketDate.createFunction({
          name: "addMarketDate",
          code: resolve(__dirname, "code", "addMarketDate.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    // new Resolver(this, "Mutation_updateMarketDate_Resolver", {
    //   api,
    //   typeName: "Mutation",
    //   fieldName: "updateMarketDate",
    //   code: SimpleResolverCode,
    //   pipelineConfig: [
    //     datasources.access.createFunction({
    //       name: "stashMarketAccess",
    //       code: resolve(__dirname, "code", "stashMarketAccess.ts"),
    //     }),
    //     datasources.marketDate.createFunction({
    //       name: "updateMarketDate",
    //       code: resolve(__dirname, "code", "updateMarketDate.ts"),
    //     }),
    //   ],
    //   runtime: FunctionRuntime.JS_1_0_0,
    // });

    new Resolver(this, "Mutation_bookMarketSlot_Resolver", {
      api,
      typeName: "Mutation",
      fieldName: "bookMarketSlot",
      code: SimpleResolverCode,
      pipelineConfig: [
        datasources.access.createFunction({
          name: "stashMarketAccess",
          code: resolve(__dirname, "code", "stashMarketAccess.ts"),
        }),
        datasources.marketBooking.createFunction({
          name: "bookMarketSlot",
          code: resolve(__dirname, "code", "bookMarketSlot.ts"),
        }),
      ],
      runtime: FunctionRuntime.JS_1_0_0,
    });

    // new Resolver(this, "Mutation_updateMarketSlot_Resolver", {
    //   api,
    //   typeName: "Mutation",
    //   fieldName: "updateMarketSlot",
    //   code: SimpleResolverCode,
    //   pipelineConfig: [
    //     datasources.access.createFunction({
    //       name: "stashMarketAccess",
    //       code: resolve(__dirname, "code", "stashMarketAccess.ts"),
    //     }),
    //     datasources.marketStall.createFunction({
    //       name: "stashStallAccess",
    //       code: resolve(__dirname, "code", "stashStallAccess.ts"),
    //     }),
    //     datasources.marketBooking.createFunction({
    //       name: "updateMarketSlot",
    //       code: resolve(__dirname, "code", "updateMarketSlot.ts"),
    //     }),
    //   ],
    //   runtime: FunctionRuntime.JS_1_0_0,
    // });
  }
}
