import assert from "assert";
import * as d3 from "../src/index.js";

it("interpolateNumberArray(a, b) interpolates defined elements in a and b", () => {
  assert.deepStrictEqual(d3.interpolateNumberArray(Float64Array.of(2, 12), Float64Array.of(4, 24))(0.5), Float64Array.of(3, 18));
});

it("interpolateNumberArray(a, b) ignores elements in a that are not in b", () => {
  assert.deepStrictEqual(d3.interpolateNumberArray(Float64Array.of(2, 12, 12), Float64Array.of(4, 24))(0.5), Float64Array.of(3, 18));
});

it("interpolateNumberArray(a, b) uses constant elements in b that are not in a", () => {
  assert.deepStrictEqual(d3.interpolateNumberArray(Float64Array.of(2, 12), Float64Array.of(4, 24, 12))(0.5), Float64Array.of(3, 18, 12));
});

it("interpolateNumberArray(a, b) treats undefined as an empty array", () => {
  assert.deepStrictEqual(d3.interpolateNumberArray(undefined, [2, 12])(0.5), [2, 12]);
  assert.deepStrictEqual(d3.interpolateNumberArray([2, 12], undefined)(0.5), []);
  assert.deepStrictEqual(d3.interpolateNumberArray(undefined, undefined)(0.5), []);
});

it("interpolateNumberArray(a, b) uses b’s array type", () => {
  assert(d3.interpolateNumberArray(Float64Array.of(2, 12), Float64Array.of(4, 24, 12))(0.5) instanceof Float64Array);
  assert(d3.interpolateNumberArray(Float64Array.of(2, 12), Float32Array.of(4, 24, 12))(0.5) instanceof Float32Array);
  assert(d3.interpolateNumberArray(Float64Array.of(2, 12), Uint8Array.of(4, 24, 12))(0.5) instanceof Uint8Array);
  assert(d3.interpolateNumberArray(Float64Array.of(2, 12), Uint16Array.of(4, 24, 12))(0.5) instanceof Uint16Array);
});

it("interpolateNumberArray(a, b) works with unsigned data", () => {
  assert.deepStrictEqual(d3.interpolateNumberArray(Uint8Array.of(1, 12), Uint8Array.of(255, 0))(0.5), Uint8Array.of(128, 6));
});

it("interpolateNumberArray(a, b) gives exact ends", () => {
  const i = d3.interpolateNumberArray(Float64Array.of(2e42), Float64Array.of(355));
  assert.deepStrictEqual(i(0), Float64Array.of(2e42));
  assert.deepStrictEqual(i(1), Float64Array.of(355));
});