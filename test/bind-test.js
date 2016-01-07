var tape = require("tape"),
    interpolate = require("../");

tape("interpolateBind(type) returns type", function(test) {
  test.equal(interpolate.interpolateBind(interpolate.interpolateCubehelix), interpolate.interpolateCubehelix);
  test.equal(interpolate.interpolateBind(interpolate.interpolateRgb), interpolate.interpolateRgb);
  test.end();
});

tape("interpolateBind(type, parameter) binds the specified parameter to the given type", function(test) {
  test.equal(interpolate.interpolateBind(interpolate.interpolateCubehelix, 3)("purple", "orange")(0.5), interpolate.interpolateCubehelix("purple", "orange", 3)(0.5));
  test.equal(interpolate.interpolateBind(interpolate.interpolateCubehelixLong, 3)("purple", "orange")(0.5), interpolate.interpolateCubehelixLong("purple", "orange", 3)(0.5));
  test.equal(interpolate.interpolateBind(interpolate.interpolateRgb, 3)("purple", "orange")(0.5), interpolate.interpolateRgb("purple", "orange", 3)(0.5)); // ignored
  test.end();
});
