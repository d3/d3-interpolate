var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolateHslLong(a, b) converts a and b to HSL colors", function(test) {
  test.equal(interpolate.interpolateHslLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.interpolateHslLong("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.interpolateHslLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateHslLong(a, b) interpolates in HSL and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.interpolateHslLong("steelblue", "#f00")(.2), "#38c3a2");
  test.end();
});

tape("interpolateHslLong(a, b) does not use the shortest path when interpolating hue", function(test) {
  var i = interpolate.interpolateHslLong("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  test.equal(i(0.0), "#bf5540");
  test.equal(i(0.2), "#99bf40");
  test.equal(i(0.4), "#40bf77");
  test.equal(i(0.6), "#4077bf");
  test.equal(i(0.8), "#9940bf");
  test.equal(i(1.0), "#bf4055");
  test.end();
});

tape("interpolateHslLong(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHslLong("#f60", "#000")(.5), "#803300");
  test.equal(interpolate.interpolateHslLong("#6f0", "#fff")(.5), "#b3ff80");
  test.end();
});

tape("interpolateHslLong(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHslLong("#000", "#f60")(.5), "#803300");
  test.equal(interpolate.interpolateHslLong("#fff", "#6f0")(.5), "#b3ff80");
  test.end();
});

tape("interpolateHslLong(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
  test.equal(interpolate.interpolateHslLong("#ccc", "#000")(.5), "#666666");
  test.equal(interpolate.interpolateHslLong("#f00", "#000")(.5), "#800000");
  test.end();
});

tape("interpolateHslLong(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
  test.equal(interpolate.interpolateHslLong("#000", "#ccc")(.5), "#666666");
  test.equal(interpolate.interpolateHslLong("#000", "#f00")(.5), "#800000");
  test.end();
});
