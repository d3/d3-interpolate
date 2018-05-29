var tape = require("tape"),
    interpolate = require("../");

tape("interpolateDiscrete(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateDiscrete("abcde".split(""));
  test.strictEqual(i(-1), "a");
  test.strictEqual(i(0), "a");
  test.strictEqual(i(0.19), "a");
  test.strictEqual(i(0.21), "b");
  test.strictEqual(i(1), "e");
  test.end();
});

tape("interpolateDiscrete([0, 1]) is equivalent to similar to Math.round", function(test) {
  var i = interpolate.interpolateDiscrete([0, 1]);
  test.strictEqual(i(-1), 0);
  test.strictEqual(i(0), 0);
  test.strictEqual(i(0.49), 0);
  test.strictEqual(i(0.51), 1);
  test.strictEqual(i(1), 1);
  test.strictEqual(i(2), 1);
  test.end();
});

tape("interpolateDiscrete(…)(NaN) returned undefined", function(test) {
  var i = interpolate.interpolateDiscrete([0, 1]);
  test.strictEqual(i(NaN), undefined);
  test.end();
});
