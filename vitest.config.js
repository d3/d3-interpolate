import {defineConfig, configDefaults} from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*-test.js"],
    exclude: [...configDefaults.exclude, "test/transformCss-test.js"] // commented out; see file
  }
});
