var tape = require("tape"),
    interpolate = require("../");

require("./inDelta");

tape("interpolateCubic(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateCubic([0, 0, 3, 4, 1]);
  test.equal(i(-1), 0);
  test.equal(i(0), 0);
  test.equal(i(0.25), 0);
  test.equal(i(0.5), 3);
  test.equal(i(0.75), 4);
  test.equal(i(1), 1);
  test.inDelta(i(0.1), -0.144);
  test.inDelta(i(0.19), -0.207936);
  test.inDelta(i(0.21), -0.169344);
  test.equal(i(2), 1);
  test.end();
});

tape("interpolateCubicClosed(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateCubicClosed([0, 0, 3, 4, 1]);
  test.equal(i(0), 0);
  test.equal(i(0.2), 0);
  test.equal(i(0.4), 3);
  test.equal(i(0.6), 4);
  test.equal(i(0.8), 1);
  test.equal(i(1), 0);
  test.inDelta(i(0.1), -0.25);
  test.inDelta(i(0.19), -0.068875);
  test.inDelta(i(0.21), 0.0846875);
  test.inDelta(i(1.1), -0.25);
  test.inDelta(i(1.19), -0.068875);
  test.equal(i(-1), 0);
  test.equal(i(2), 0);
  test.end();
});
