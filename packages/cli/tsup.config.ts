import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/"],
  dts: true,
  clean: true,
  format: ["esm"],
  // all required secrets should be added inside .github/workflows/release.yml
  env: process.env as Record<string, string>,
  noExternal: ["@trout.run/shared"],
});
