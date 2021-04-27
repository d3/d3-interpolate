import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateHclLong(a, b) converts a and b to HCL colors", () => {
  assert.strictEqual(d3.interpolateHclLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateHclLong("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateHclLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateHclLong(a, b) interpolates in HCL and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateHclLong("steelblue", "#f00")(0.2), "rgb(0, 144, 169)");
  assert.strictEqual(d3.interpolateHclLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(0, 144, 169, 0.84)");
});

it("interpolateHclLong(a, b) does not use the shortest path when interpolating hue", () => {
  const i = d3.interpolateHclLong(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(151, 111, 28)");
  assert.strictEqual(i(0.4), "rgb(35, 136, 68)");
  assert.strictEqual(i(0.6), "rgb(0, 138, 165)");
  assert.strictEqual(i(0.8), "rgb(91, 116, 203)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHclLong(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong("#f60", color.hcl(NaN, NaN, 0))(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(d3.interpolateHclLong("#6f0", color.hcl(NaN, NaN, 0))(0.5), "rgb(0, 129, 0)");
});

it("interpolateHclLong(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong(color.hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(d3.interpolateHclLong(color.hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(0, 129, 0)");
});

it("interpolateHclLong(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong("#ccc", color.hcl(NaN, NaN, 0))(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(d3.interpolateHclLong("#f00", color.hcl(NaN, NaN, 0))(0.5), "rgb(166, 0, 0)");
});

it("interpolateHclLong(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong(color.hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(d3.interpolateHclLong(color.hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(166, 0, 0)");
});

it("interpolateHclLong(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong(null, color.hcl(20, 80, 50))(0.5), "rgb(230, 13, 79)");
});

it("interpolateHclLong(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateHclLong(color.hcl(20, 80, 50), null)(0.5), "rgb(230, 13, 79)");
});
