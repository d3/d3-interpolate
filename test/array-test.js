var tape = require("tape"),
    interpolate = require("../");

tape("array(a, b) interpolates defined elements in a and b", function(test) {
  test.deepEqual(interpolate.array([2, 12], [4, 24])(.5), [3, 18]);
  test.end();
});

tape("array(a, b) interpolates nested objects and arrays", function(test) {
  test.deepEqual(interpolate.array([[2, 12]], [[4, 24]])(.5), [[3, 18]]);
  test.deepEqual(interpolate.array([{foo: [2, 12]}], [{foo: [4, 24]}])(.5), [{foo: [3, 18]}]);
  test.end();
});

tape("array(a, b) merges non-shared elements", function(test) {
  test.deepEqual(interpolate.array([2, 12], [4, 24, 12])(.5), [3, 18, 12]);
  test.deepEqual(interpolate.array([2, 12, 12], [4, 24])(.5), [3, 18, 12]);
  test.end();
});

