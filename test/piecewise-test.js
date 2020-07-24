var tape = require("tape"),
    interpolate = require("../");

tape("piecewise(interpolate, values)(t) returns the expected values", function(test) {
  var i = interpolate.piecewise(interpolate.interpolate, [0,2,10]);
  test.strictEqual(i(-1), -4);
  test.strictEqual(i(0), 0);
  test.strictEqual(i(0.19), 0.76);
  test.strictEqual(i(0.21), 0.84);
  test.strictEqual(i(0.5), 2);
  test.strictEqual(i(0.75), 6);
  test.strictEqual(i(1), 10);
  test.end();
});

tape("piecewise(values) uses the default interpolator", function(test) {
  var i = interpolate.piecewise([0,2,10]);
  test.strictEqual(i(-1), -4);
  test.strictEqual(i(0), 0);
  test.strictEqual(i(0.19), 0.76);
  test.strictEqual(i(0.21), 0.84);
  test.strictEqual(i(0.5), 2);
  test.strictEqual(i(0.75), 6);
  test.strictEqual(i(1), 10);
  test.end();
});

tape("piecewise(values) uses the default interpolator/2", function(test) {
  var i = interpolate.piecewise(["a0","a2","a10"]);
  test.strictEqual(i(-1), "a-4");
  test.strictEqual(i(0), "a0");
  test.strictEqual(i(0.19), "a0.76");
  test.strictEqual(i(0.21), "a0.84");
  test.strictEqual(i(0.5), "a2");
  test.strictEqual(i(0.75), "a6");
  test.strictEqual(i(1), "a10");
  test.end();
});
