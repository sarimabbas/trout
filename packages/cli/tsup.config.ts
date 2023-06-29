import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/"],
  dts: true,
  clean: true,
  format: ["esm"],
});
