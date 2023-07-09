import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/"],
  dts: true,
  clean: true,
  format: ["esm"],
  env: process.env as Record<string, string>,
  noExternal: ["@trout.run/shared"],
});
