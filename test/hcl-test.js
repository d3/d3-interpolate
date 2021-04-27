import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateHcl(a, b) converts a and b to HCL colors", () => {
  assert.strictEqual(d3.interpolateHcl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateHcl("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateHcl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateHcl(a, b) interpolates in HCL and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateHcl("steelblue", "#f00")(0.2), "rgb(106, 121, 206)");
  assert.strictEqual(d3.interpolateHcl("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(106, 121, 206, 0.84)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 180°", () => {
  const i = d3.interpolateHcl(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 113)");
  assert.strictEqual(i(0.4), "rgb(193, 78, 118)");
  assert.strictEqual(i(0.6), "rgb(192, 78, 124)");
  assert.strictEqual(i(0.8), "rgb(191, 78, 130)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 360°", () => {
  const i = d3.interpolateHcl(color.hcl(10, 50, 50), color.hcl(380, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 104)");
  assert.strictEqual(i(0.4), "rgb(194, 79, 101)");
  assert.strictEqual(i(0.6), "rgb(194, 79, 98)");
  assert.strictEqual(i(0.8), "rgb(194, 80, 96)");
  assert.strictEqual(i(1.0), "rgb(194, 80, 93)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 540°", () => {
  const i = d3.interpolateHcl(color.hcl(10, 50, 50), color.hcl(710, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 113)");
  assert.strictEqual(i(0.4), "rgb(193, 78, 118)");
  assert.strictEqual(i(0.6), "rgb(192, 78, 124)");
  assert.strictEqual(i(0.8), "rgb(191, 78, 130)");
  assert.strictEqual(i(1.0), "rgb(189, 79, 136)");
});

it("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 720°", () => {
  const i = d3.interpolateHcl(color.hcl(10, 50, 50), color.hcl(740, 50, 50));
  assert.strictEqual(i(0.0), "rgb(194, 78, 107)");
  assert.strictEqual(i(0.2), "rgb(194, 78, 104)");
  assert.strictEqual(i(0.4), "rgb(194, 79, 101)");
  assert.strictEqual(i(0.6), "rgb(194, 79, 98)");
  assert.strictEqual(i(0.8), "rgb(194, 80, 96)");
  assert.strictEqual(i(1.0), "rgb(194, 80, 93)");
});

it("interpolateHcl(a, b) uses a’s hue when b’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHcl("#f60", color.hcl(NaN, NaN, 0))(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(d3.interpolateHcl("#6f0", color.hcl(NaN, NaN, 0))(0.5), "rgb(0, 129, 0)");
});

it("interpolateHcl(a, b) uses b’s hue when a’s hue is undefined", () => {
  assert.strictEqual(d3.interpolateHcl(color.hcl(NaN, NaN, 0), "#f60")(0.5), "rgb(155, 0, 0)");
  assert.strictEqual(d3.interpolateHcl(color.hcl(NaN, NaN, 0), "#6f0")(0.5), "rgb(0, 129, 0)");
});

it("interpolateHcl(a, b) uses a’s chroma when b’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateHcl("#ccc", color.hcl(NaN, NaN, 0))(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(d3.interpolateHcl("#f00", color.hcl(NaN, NaN, 0))(0.5), "rgb(166, 0, 0)");
});

it("interpolateHcl(a, b) uses b’s chroma when a’s chroma is undefined", () => {
  assert.strictEqual(d3.interpolateHcl(color.hcl(NaN, NaN, 0), "#ccc")(0.5), "rgb(97, 97, 97)");
  assert.strictEqual(d3.interpolateHcl(color.hcl(NaN, NaN, 0), "#f00")(0.5), "rgb(166, 0, 0)");
});

it("interpolateHcl(a, b) uses b’s luminance when a’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateHcl(null, color.hcl(20, 80, 50))(0.5), "rgb(230, 13, 79)");
});

it("interpolateHcl(a, b) uses a’s luminance when b’s luminance is undefined", () => {
  assert.strictEqual(d3.interpolateHcl(color.hcl(20, 80, 50), null)(0.5), "rgb(230, 13, 79)");
});
