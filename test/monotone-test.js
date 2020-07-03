var tape = require("tape"),
    interpolate = require("../");

require("./inDelta");

tape("interpolateMonotone(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateCubic([3, 2.8, 2.5, 1, 0.95, 0.8, 0.5, 0.1, 0.05]);
  test.equal(i(-1), 3);
  test.inDelta(i(0), 3);
  test.inDelta(i(0.25), 2.5);
  test.inDelta(i(0.5), 0.95);
  test.inDelta(i(0.6), 0.8412);
  test.inDelta(i(0.75), 0.5);
  test.inDelta(i(1), 0.05);
  test.inDelta(i(2), 0.05);
  test.end();
});

tape("interpolateMonotoneClosed(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateMonotoneClosed([0, 0, 3, 4, 1]);
  test.equal(i(0), 0);
  test.inDelta(i(0.2), 0);
  test.inDelta(i(0.4), 3);
  test.inDelta(i(0.5), 3.75);
  test.inDelta(i(0.6), 4);
  test.inDelta(i(0.8), 1);
  test.inDelta(i(1), 0);
  test.inDelta(i(-1), 0);
  test.inDelta(i(2), 0);
  test.end();
});
