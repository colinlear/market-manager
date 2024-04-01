import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: ["./cdk/lib/Appsync.graphql", "./cdk/lib/AppsyncSchema.graphql"],
  // documents: "src/**/*.tsx",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        scalars: {
          ID: { input: "string", output: "string" },
          String: { input: "string", output: "string" },
          Boolean: { input: "boolean", output: "boolean" },
          Int: { input: "number", output: "number" },
          Float: { input: "number", output: "number" },
          AWSDate: { input: "string", output: "string" },
          AWSDateTime: { input: "string", output: "string" },
          AWSEmail: { input: "string", output: "string" },
          AWSIPAddress: { input: "string", output: "string" },
          AWSJSON: { input: "any", output: "any" },
          AWSPhone: { input: "string", output: "string" },
          AWSTime: { input: "string", output: "string" },
          AWSTimestamp: { input: "string", output: "string" },
          AWSURL: { input: "string", output: "string" },
        },
      },
    },
    "cdk/lib/gql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          ID: { input: "string", output: "string" },
          String: { input: "string", output: "string" },
          Boolean: { input: "boolean", output: "boolean" },
          Int: { input: "number", output: "number" },
          Float: { input: "number", output: "number" },
          AWSDate: { input: "string", output: "string" },
          AWSDateTime: { input: "string", output: "string" },
          AWSEmail: { input: "string", output: "string" },
          AWSIPAddress: { input: "string", output: "string" },
          AWSJSON: { input: "any", output: "any" },
          AWSPhone: { input: "string", output: "string" },
          AWSTime: { input: "string", output: "string" },
          AWSTimestamp: { input: "string", output: "string" },
          AWSURL: { input: "string", output: "string" },
        },
      },
    },
  },
};

export default config;
