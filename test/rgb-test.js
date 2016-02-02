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

tape("interpolateRgb(a, b) uses b’s channel value when a’s channel value is undefined", function(test) {
  test.equal(interpolate.interpolateRgb(null, color.rgb(20, 40, 60))(0.5), color.rgb(20, 40, 60) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(NaN, 20, 40), color.rgb(60, 80, 100))(0.5), color.rgb(60, 50, 70) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(20, NaN, 40), color.rgb(60, 80, 100))(0.5), color.rgb(40, 80, 70) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(20, 40, NaN), color.rgb(60, 80, 100))(0.5), color.rgb(40, 60, 100) + "");
  test.end();
});

tape("interpolateRgb(a, b) uses zero when b’s channel value is undefined", function(test) {
  test.equal(interpolate.interpolateRgb(color.rgb(20, 40, 60), null)(0.5), color.rgb(10, 20, 30) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(60, 80, 100), color.rgb(NaN, 20, 40))(0.5), color.rgb(30, 50, 70) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(60, 80, 100), color.rgb(20, NaN, 40))(0.5), color.rgb(40, 40, 70) + "");
  test.equal(interpolate.interpolateRgb(color.rgb(60, 80, 100), color.rgb(20, 40, NaN))(0.5), color.rgb(40, 60, 50) + "");
  test.end();
});
