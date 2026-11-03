import {defineConfig, configDefaults} from "vitest/config";

export default defineConfig({
  resolve: {alias: {"d3-interpolate": "src/index.js"}},
  test: {
    include: ["test/**/*-test.js"],
    exclude: [...configDefaults.exclude, "test/transformCss-test.js"] // commented out; see file
  }
});
