import assert from "assert";
import * as d3 from "../src/index.js";
import * as color from "d3-color";

it("interpolateLab(a, b) converts a and b to Lab colors", () => {
  assert.strictEqual(d3.interpolateLab("steelblue", "brown")(0), color.rgb("steelblue") + "");
  assert.strictEqual(d3.interpolateLab("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  assert.strictEqual(d3.interpolateLab("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
});

it("interpolateLab(a, b) interpolates in Lab and returns an RGB string", () => {
  assert.strictEqual(d3.interpolateLab("steelblue", "#f00")(0.2), "rgb(134, 120, 146)");
  assert.strictEqual(d3.interpolateLab("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(134, 120, 146, 0.84)");
});

it("interpolateLab(a, b) uses b’s channel value when a’s channel value is undefined", () => {
  assert.strictEqual(d3.interpolateLab(null, color.lab(20, 40, 60))(0.5), color.lab(20, 40, 60) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(NaN, 20, 40), color.lab(60, 80, 100))(0.5), color.lab(60, 50, 70) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(20, NaN, 40), color.lab(60, 80, 100))(0.5), color.lab(40, 80, 70) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(20, 40, NaN), color.lab(60, 80, 100))(0.5), color.lab(40, 60, 100) + "");
});

it("interpolateLab(a, b) uses a’s channel value when b’s channel value is undefined", () => {
  assert.strictEqual(d3.interpolateLab(color.lab(20, 40, 60), null)(0.5), color.lab(20, 40, 60) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(60, 80, 100), color.lab(NaN, 20, 40))(0.5), color.lab(60, 50, 70) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(60, 80, 100), color.lab(20, NaN, 40))(0.5), color.lab(40, 80, 70) + "");
  assert.strictEqual(d3.interpolateLab(color.lab(60, 80, 100), color.lab(20, 40, NaN))(0.5), color.lab(40, 60, 100) + "");
});
