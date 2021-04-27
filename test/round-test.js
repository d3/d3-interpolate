import assert from "assert";
import * as d3 from "../src/index.js";

it("interpolateRound(a, b) interpolates between two numbers a and b, and then rounds", () => {
  const i = d3.interpolateRound(10, 42);
  assert.strictEqual(i(0.0), 10);
  assert.strictEqual(i(0.1), 13);
  assert.strictEqual(i(0.2), 16);
  assert.strictEqual(i(0.3), 20);
  assert.strictEqual(i(0.4), 23);
  assert.strictEqual(i(0.5), 26);
  assert.strictEqual(i(0.6), 29);
  assert.strictEqual(i(0.7), 32);
  assert.strictEqual(i(0.8), 36);
  assert.strictEqual(i(0.9), 39);
  assert.strictEqual(i(1.0), 42);
});

it("interpolateRound(a, b) does not pre-round a and b", () => {
  const i = d3.interpolateRound(2.6, 3.6);
  assert.strictEqual(i(0.6), 3);
});

it("interpolateRound(a, b) gives exact ends for t=0 and t=1", () => {
  const a = 2e+42, b = 335;
  assert.strictEqual(d3.interpolateRound(a, b)(1), b);
  assert.strictEqual(d3.interpolateRound(a, b)(0), a);
});
