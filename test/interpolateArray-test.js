var tape = require("tape"),
    interpolate = require("../");

tape("interpolateArray(a, b) interpolates defined elements in a and b", function(test) {
  test.deepEqual(interpolate.interpolateArray([2, 12], [4, 24])(.5), [3, 18]);
  test.end();
});

tape("interpolateArray(a, b) interpolates nested objects and arrays", function(test) {
  test.deepEqual(interpolate.interpolateArray([[2, 12]], [[4, 24]])(.5), [[3, 18]]);
  test.deepEqual(interpolate.interpolateArray([{foo: [2, 12]}], [{foo: [4, 24]}])(.5), [{foo: [3, 18]}]);
  test.end();
});

tape("interpolateArray(a, b) merges non-shared elements", function(test) {
  test.deepEqual(interpolate.interpolateArray([2, 12], [4, 24, 12])(.5), [3, 18, 12]);
  test.deepEqual(interpolate.interpolateArray([2, 12, 12], [4, 24])(.5), [3, 18, 12]);
  test.end();
});

