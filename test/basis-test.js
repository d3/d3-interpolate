var tape = require("tape"),
    interpolate = require("../");

require("./inDelta");

tape("interpolateBasis(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateBasis([0, 0, 3]);
  test.equal(i(-1), 0);
  test.equal(i(0), 0);
  test.inDelta(i(0.19), 0.027436);
  test.inDelta(i(0.21), 0.037044);
  test.equal(i(1), 3);
  test.equal(i(1.19), 3);
  test.end();
});

tape("interpolateBasisClosed(values)(t) returns the expected values", function(test) {
  var i = interpolate.interpolateBasisClosed([0, 0, 3]);
  test.equal(i(-1), 0.5);
  test.equal(i(0), 0.5);
  test.inDelta(i(0.19), 0.132350);
  test.inDelta(i(0.21), 0.150350);
  test.equal(i(1), 0.5);
  test.inDelta(i(1.19), 0.132350);
  test.inDelta(i(0.19 - 3), 0.132350);
  test.end();
});
