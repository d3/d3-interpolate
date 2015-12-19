var tape = require("tape"),
    interpolate = require("../");

tape("bind(type) returns type", function(test) {
  test.equal(interpolate.bind(interpolate.cubehelix), interpolate.cubehelix);
  test.equal(interpolate.bind(interpolate.rgb), interpolate.rgb);
  test.end();
});

tape("bind(type, parameter) binds the specified parameter to the given type", function(test) {
  test.equal(interpolate.bind(interpolate.cubehelix, 3)("purple", "orange")(0.5), interpolate.cubehelix("purple", "orange", 3)(0.5));
  test.equal(interpolate.bind(interpolate.cubehelixLong, 3)("purple", "orange")(0.5), interpolate.cubehelixLong("purple", "orange", 3)(0.5));
  test.equal(interpolate.bind(interpolate.rgb, 3)("purple", "orange")(0.5), interpolate.rgb("purple", "orange", 3)(0.5)); // ignored
  test.end();
});
