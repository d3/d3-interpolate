var tape = require("tape"),
    interpolate = require("../");

tape("interpolateHue(a, b) interpolate numbers", function(test) {
  var i = interpolate.interpolateHue("10", "20");
  test.strictEqual(i(0.0), 10);
  test.strictEqual(i(0.2), 12);
  test.strictEqual(i(0.4), 14);
  test.strictEqual(i(0.6), 16);
  test.strictEqual(i(0.8), 18);
  test.strictEqual(i(1.0), 20);
  test.end();
});

tape("interpolateHue(a, b) returns a if b is NaN", function(test) {
  var i = interpolate.interpolateHue(10, NaN);
  test.equal(i(0.0), 10);
  test.equal(i(0.5), 10);
  test.equal(i(1.0), 10);
  test.end();
});

tape("interpolateHue(a, b) returns b if a is NaN", function(test) {
  var i = interpolate.interpolateHue(NaN, 20);
  test.equal(i(0.0), 20);
  test.equal(i(0.5), 20);
  test.equal(i(1.0), 20);
  test.end();
});

tape("interpolateHue(a, b) returns NaN if both a and b are NaN", function(test) {
  var i = interpolate.interpolateHue(NaN, NaN);
  test.equal(isNaN(i(0.0)), true);
  test.equal(isNaN(i(0.5)), true);
  test.equal(isNaN(i(1.0)), true);
  test.end();
});

tape("interpolateHue(a, b) uses the shortest path", function(test) {
  var i = interpolate.interpolateHue(10, 350);
  test.equal(i(0.0), 10);
  test.equal(i(0.2), 6);
  test.equal(i(0.4), 2);
  test.equal(i(0.6), 358);
  test.equal(i(0.8), 354);
  test.equal(i(1.0), 350);
  test.end();
});
