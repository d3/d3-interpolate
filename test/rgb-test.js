import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateRgb(a, b) converts a and b to RGB colors", () => {
  assert.strictEqual(d3.interpolateRgb("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateRgb("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateRgb("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateRgb(a, b) interpolates in RGB and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateRgb("steelblue", "#f00")(0.2), "rgb(107, 104, 144)");
  assert.strictEqual(d3.interpolateRgb("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(107, 104, 144, 0.84)");
});

it("interpolateRgb(a, b) uses b’s channel value when a’s channel value is undefined", () => {
  assert.strictEqual(d3.interpolateRgb(null, color.rgb(20, 40, 60))(0.5), color.rgb(20, 40, 60) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(NaN, 20, 40), color.rgb(60, 80, 100))(0.5), color.rgb(60, 50, 70) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(20, NaN, 40), color.rgb(60, 80, 100))(0.5), color.rgb(40, 80, 70) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(20, 40, NaN), color.rgb(60, 80, 100))(0.5), color.rgb(40, 60, 100) + "");
});

it("interpolateRgb(a, b) uses a’s channel value when b’s channel value is undefined", () => {
  assert.strictEqual(d3.interpolateRgb(color.rgb(20, 40, 60), null)(0.5), color.rgb(20, 40, 60) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(60, 80, 100), color.rgb(NaN, 20, 40))(0.5), color.rgb(60, 50, 70) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(60, 80, 100), color.rgb(20, NaN, 40))(0.5), color.rgb(40, 80, 70) + "");
  assert.strictEqual(d3.interpolateRgb(color.rgb(60, 80, 100), color.rgb(20, 40, NaN))(0.5), color.rgb(40, 60, 100) + "");
});

it("interpolateRgb.gamma(3)(a, b) returns the expected values", () => {
  assert.strictEqual(d3.interpolateRgb.gamma(3)("steelblue", "#f00")(0.2), "rgb(153, 121, 167)");
});

it("interpolateRgb.gamma(3)(a, b) uses linear interpolation for opacity", () => {
  assert.strictEqual(d3.interpolateRgb.gamma(3)("transparent", "#f00")(0.2), "rgba(255, 0, 0, 0.2)");
});

it("interpolateRgb.gamma(g) coerces the specified gamma to a number", () => {
  assert.strictEqual(d3.interpolateRgb.gamma({valueOf: function() { return 3; }})("steelblue", "#f00")(0.2), "rgb(153, 121, 167)");
});

it("interpolateRgb(a, b) is equivalent to interpolateRgb.gamma(1)(a, b)", () => {
  const i0 = d3.interpolateRgb.gamma(1)("purple", "orange"),
      i1 = d3.interpolateRgb("purple", "orange");
  assert.strictEqual(i1(0.0), i0(0.0));
  assert.strictEqual(i1(0.2), i0(0.2));
  assert.strictEqual(i1(0.4), i0(0.4));
  assert.strictEqual(i1(0.6), i0(0.6));
  assert.strictEqual(i1(0.8), i0(0.8));
  assert.strictEqual(i1(1.0), i0(1.0));
});
