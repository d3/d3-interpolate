var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolateRgb(a, b) converts a and b to RGB colors", function(test) {
  test.equal(interpolate.interpolateRgb("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.interpolateRgb("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.interpolateRgb("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateRgb(a, b) interpolates in RGB and returns a hexadecimal string", function(test) {
  test.equal(interpolate.interpolateRgb("steelblue", "#f00")(.2), "#6b6890");
  test.end();
});
