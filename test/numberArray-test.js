var tape = require("tape"),
    interpolate = require("../");

tape("interpolateNumberArray(a, b) interpolates defined elements in a and b", function(test) {
  test.deepEqual(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Float64Array.from([4, 24]))(0.5), Float64Array.from([3, 18]));
  test.end();
});

tape("interpolateNumberArray(a, b) ignores elements in a that are not in b", function(test) {
  test.deepEqual(interpolate.interpolateNumberArray(Float64Array.from([2, 12, 12]), Float64Array.from([4, 24]))(0.5), Float64Array.from([3, 18]));
  test.end();
});

tape("interpolateNumberArray(a, b) uses constant elements in b that are not in a", function(test) {
  test.deepEqual(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Float64Array.from([4, 24, 12]))(0.5), Float64Array.from([3, 18, 12]));
  test.end();
});

tape("interpolateNumberArray(a, b) treats undefined as an empty array", function(test) {
  test.deepEqual(interpolate.interpolateNumberArray(undefined, [2, 12])(0.5), [2, 12]);
  test.deepEqual(interpolate.interpolateNumberArray([2, 12], undefined)(0.5), []);
  test.deepEqual(interpolate.interpolateNumberArray(undefined, undefined)(0.5), []);
  test.end();
});

tape("interpolateNumberArray(a, b) uses b’s array type", function(test) {
  test.ok(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Float64Array.from([4, 24, 12]))(0.5) instanceof Float64Array);
  test.ok(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Float32Array.from([4, 24, 12]))(0.5) instanceof Float32Array);
  test.ok(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Uint8Array.from([4, 24, 12]))(0.5) instanceof Uint8Array);
  test.ok(interpolate.interpolateNumberArray(Float64Array.from([2, 12]), Uint16Array.from([4, 24, 12]))(0.5) instanceof Uint16Array);
  test.end();
});

tape("interpolateNumberArray(a, b) works with unsigned data", function(test) {
  test.deepEqual(interpolate.interpolateNumberArray(Uint8Array.from([1, 12]), Uint8Array.from([255, 0]))(0.5), Uint8Array.from([128, 6]));
  test.end();
});