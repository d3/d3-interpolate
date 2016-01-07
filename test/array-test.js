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

tape("array(a, b) treats undefined as an empty array", function(test) {
  test.deepEqual(interpolate.array(undefined, [2, 12])(.5), [2, 12]);
  test.deepEqual(interpolate.array([2, 12], undefined)(.5), [2, 12]);
  test.deepEqual(interpolate.array(undefined, undefined)(.5), []);
  test.end();
});

tape("array(a, b) interpolates array-like objects", function(test) {
  var array = new Float64Array(2),
      args = (function() { return arguments; })(2, 12);
  array[0] = 2;
  array[1] = 12;
  test.deepEqual(interpolate.array(array, [4, 24])(.5), [3, 18]);
  test.deepEqual(interpolate.array(args, [4, 24])(.5), [3, 18]);
  test.end();
});
