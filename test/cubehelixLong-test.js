import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateCubehelixLong(a, b) converts a and b to Cubehelix colors", () => {
  assert.strictEqual(d3.interpolateCubehelixLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateCubehelixLong("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateCubehelixLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateCubehelixLong(a, b) interpolates in Cubehelix and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateCubehelixLong("steelblue", "#f00")(0.2), "rgb(88, 100, 218)");
  assert.strictEqual(d3.interpolateCubehelixLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(88, 100, 218, 0.84)");
});

it("interpolateCubehelixLong.gamma(3)(a, b) returns the expected values", () => {
  assert.strictEqual(d3.interpolateCubehelixLong.gamma(3)("steelblue", "#f00")(0.2), "rgb(96, 107, 228)");
});

it("interpolateCubehelixLong.gamma(g) coerces the specified gamma to a number", () => {
  assert.strictEqual(d3.interpolateCubehelixLong.gamma({valueOf: function() { return 3; }})("steelblue", "#f00")(0.2), "rgb(96, 107, 228)");
});

it("interpolateCubehelixLong(a, b) is equivalent to interpolateCubehelixLong.gamma(1)(a, b)", () => {
  const i0 = d3.interpolateCubehelixLong.gamma(1)("purple", "orange"),
      i1 = d3.interpolateCubehelixLong("purple", "orange");
  assert.strictEqual(i1(0.0), i0(0.0));
  assert.strictEqual(i1(0.2), i0(0.2));
  assert.strictEqual(i1(0.4), i0(0.4));
  assert.strictEqual(i1(0.6), i0(0.6));
  assert.strictEqual(i1(0.8), i0(0.8));
  assert.strictEqual(i1(1.0), i0(1.0));
});
it("interpolateCubehelixLong(a, b) uses the longest path when interpolating hue difference greater than 180°", () => {
  const i = d3.interpolateCubehelixLong("purple", "orange");
  assert.strictEqual(i(0.0), "rgb(128, 0, 128)");
  assert.strictEqual(i(0.2), "rgb(63, 54, 234)");
  assert.strictEqual(i(0.4), "rgb(0, 151, 217)");
  assert.strictEqual(i(0.6), "rgb(0, 223, 83)");
  assert.strictEqual(i(0.8), "rgb(79, 219, 0)");
  assert.strictEqual(i(1.0), "rgb(255, 165, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong("#f60", color.hcl(NaN, NaN, 0))(0.5), "rgb(162, 41, 0)");
  assert.strictEqual(d3.interpolateCubehelixLong("#6f0", color.hcl(NaN, NaN, 0))(0.5), "rgb(3, 173, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(162, 41, 0)");
  assert.strictEqual(d3.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(3, 173, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong("#ccc", color.hcl(NaN, NaN, 0))(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(d3.interpolateCubehelixLong("#f00", color.hcl(NaN, NaN, 0))(0.5), "rgb(147, 0, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(102, 102, 102)");
  assert.strictEqual(d3.interpolateCubehelixLong(color.hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(147, 0, 0)");
});

it("interpolateCubehelixLong(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong(null, color.cubehelix(20, 1.5, 0.5))(0.5), "rgb(248, 93, 0)");
});

it("interpolateCubehelixLong(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateCubehelixLong(color.cubehelix(20, 1.5, 0.5), null)(0.5), "rgb(248, 93, 0)");
});
