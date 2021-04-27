import assert from "assert";
import * as d3 from "../src/index.js";

it("interpolateDiscrete(values)(t) returns the expected values", () => {
  const i = d3.interpolateDiscrete("abcde".split(""));
  assert.strictEqual(i(-1), "a");
  assert.strictEqual(i(0), "a");
  assert.strictEqual(i(0.19), "a");
  assert.strictEqual(i(0.21), "b");
  assert.strictEqual(i(1), "e");
});

it("interpolateDiscrete([0, 1]) is equivalent to similar to Math.round", () => {
  const i = d3.interpolateDiscrete([0, 1]);
  assert.strictEqual(i(-1), 0);
  assert.strictEqual(i(0), 0);
  assert.strictEqual(i(0.49), 0);
  assert.strictEqual(i(0.51), 1);
  assert.strictEqual(i(1), 1);
  assert.strictEqual(i(2), 1);
});

it("interpolateDiscrete(…)(NaN) returned undefined", () => {
  const i = d3.interpolateDiscrete([0, 1]);
  assert.strictEqual(i(NaN), undefined);
});
