import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateHsl(a, b) converts a and b to HSL colors", () => {
  assert.strictEqual(d3.interpolateHsl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateHsl("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateHsl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateHsl(a, b) interpolates in HSL and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateHsl("steelblue", "#f00")(0.2), "rgb(56, 61, 195)");
  assert.strictEqual(d3.interpolateHsl("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(56, 61, 195, 0.84)");
});

it("interpolateHsl(a, b) uses the shortest path when interpolating hue", () => {
  const i = d3.interpolateHsl("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  assert.strictEqual(i(0.0), "rgb(191, 85, 64)");
  assert.strictEqual(i(0.2), "rgb(191, 77, 64)");
  assert.strictEqual(i(0.4), "rgb(191, 68, 64)");
  assert.strictEqual(i(0.6), "rgb(191, 64, 68)");
  assert.strictEqual(i(0.8), "rgb(191, 64, 77)");
  assert.strictEqual(i(1.0), "rgb(191, 64, 85)");
});

it("interpolateHsl(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHsl("#f60", "#000")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(d3.interpolateHsl("#6f0", "#fff")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHsl(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHsl("#000", "#f60")(0.5), "rgb(128, 51, 0)");
  assert.strictEqual(d3.interpolateHsl("#fff", "#6f0")(0.5), "rgb(179, 255, 128)");
});

it("interpolateHsl(a, b) uses a’s saturation when b’s saturation is undefined", () => {
  assert.strictEqual(d3.interpolateHsl("#ccc", "#000")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(d3.interpolateHsl("#f00", "#000")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHsl(a, b) uses b’s saturation when a’s saturation is undefined", () => {
  assert.strictEqual(d3.interpolateHsl("#000", "#ccc")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(d3.interpolateHsl("#000", "#f00")(0.5), "rgb(128, 0, 0)");
});

it("interpolateHsl(a, b) uses b’s lightness when a’s lightness is undefined", () => {
  assert.strictEqual(d3.interpolateHsl(null, color.hsl(20, 1.0, 0.5))(0.5), "rgb(255, 85, 0)");
});

it("interpolateHsl(a, b) uses a’s lightness when b’s lightness is undefined", () => {
  assert.strictEqual(d3.interpolateHsl(color.hsl(20, 1.0, 0.5), null)(0.5), "rgb(255, 85, 0)");
});
