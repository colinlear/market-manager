import { Code } from "aws-cdk-lib/aws-appsync";
import { buildSync } from "esbuild";

export const SimpleResolverCode = Code.fromInline(`
// The before step
export function request(...args) {
  return {}
}

// The after step
export function response(ctx) {
  return ctx.result
}
`);

export const SubscriptionResolverCode = Code.fromInline(`
// The before step
export function request(...args) {
  return {}
}

// The after step
export function response(ctx) {
  return null
}
`);

export const bundleAppSyncResolver = (entryPoint: string): Code => {
  const result = buildSync({
    entryPoints: [entryPoint],
    external: ["@aws-appsync/utils"],
    bundle: true,
    write: false,
    platform: "node",
    target: "esnext",
    format: "esm",
    // sourcemap: "inline",
    sourcesContent: false,
  });

  const code = result.outputFiles[0].text;

  // console.debug("Code", code);

  return Code.fromInline(code);
};
