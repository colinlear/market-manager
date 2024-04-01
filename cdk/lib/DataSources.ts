import {
  AppsyncFunction,
  Code,
  DynamoDbDataSource,
  FunctionRuntime,
  GraphqlApi,
} from "aws-cdk-lib/aws-appsync";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { bundleAppSyncResolver } from "./resolvers/util";

export interface DataSourceProps {
  api: GraphqlApi;
  tableName: string;
  partitionKey: string;
  sortKey?: string;
}

export interface DataSourceFunctionProps {
  name: string;
  code: string;
  bundle?: boolean;
}

export class DataSource extends Construct {
  readonly table: Table;
  readonly datasource: DynamoDbDataSource;

  readonly functions: Record<string, AppsyncFunction> = {};

  constructor(
    scope: Construct,
    id: string,
    { api, tableName, partitionKey, sortKey }: DataSourceProps
  ) {
    super(scope, id);

    this.table = new Table(this, id + "Table", {
      tableName,
      partitionKey: {
        name: partitionKey,
        type: AttributeType.STRING,
      },
      sortKey: sortKey
        ? {
            name: sortKey,
            type: AttributeType.STRING,
          }
        : undefined,
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.datasource = new DynamoDbDataSource(this, id + "DataSource", {
      api,
      table: this.table,
    });
  }

  public createFunction({
    name,
    code,
    bundle = true,
  }: DataSourceFunctionProps) {
    if (this.functions[name]) {
      return this.functions[name];
    }
    return (this.functions[name] = this.datasource.createFunction(
      name + "_Function",
      {
        name,
        code: bundle ? bundleAppSyncResolver(code) : Code.fromAsset(code),
        runtime: FunctionRuntime.JS_1_0_0,
      }
    ));
  }
}

export class DataSources extends Construct {
  readonly access: DataSource;
  readonly savedMarket: DataSource;
  readonly marketDate: DataSource;
  readonly marketBooking: DataSource;
  readonly marketStall: DataSource;

  constructor(scope: Construct, id: string, prefix: string, api: GraphqlApi) {
    super(scope, id);

    this.access = new DataSource(this, "AccessDS", {
      api,
      tableName: prefix + "Access",
      partitionKey: "userId",
      sortKey: "marketId",
    });

    this.access.table.addGlobalSecondaryIndex({
      indexName: "MarketId-UserId-Index",
      partitionKey: { name: "marketId", type: AttributeType.STRING },
      sortKey: { name: "userId", type: AttributeType.STRING },
    });

    this.savedMarket = new DataSource(this, "SavedMarketDS", {
      api,
      tableName: prefix + "SavedMarket",
      partitionKey: "marketId",
      sortKey: "name",
    });

    this.marketDate = new DataSource(this, "MarketDateDS", {
      api,
      tableName: prefix + "MarketDate",
      partitionKey: "marketId",
      sortKey: "date",
    });

    this.marketBooking = new DataSource(this, "MarketBookingDS", {
      api,
      tableName: prefix + "MarketBooking",
      partitionKey: "marketIdDate",
      sortKey: "stallId",
    });

    this.marketStall = new DataSource(this, "MarketStallDS", {
      api,
      tableName: prefix + "MarketStall",
      partitionKey: "stallId",
    });

    this.marketStall.table.addGlobalSecondaryIndex({
      indexName: "UserId-Index",
      partitionKey: {
        name: "userId",
        type: AttributeType.STRING,
      },
    });
  }
}
