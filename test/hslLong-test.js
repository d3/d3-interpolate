var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("hslLong(a, b) converts a and b to HSL colors", function(test) {
  test.equal(interpolate.hslLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.hslLong("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.hslLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("hslLong(a, b) interpolates in HSL and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.hslLong("steelblue", "#f00")(.2), "#38c3a2");
  test.end();
});

tape("hslLong(a, b) does not use the shortest path when interpolating hue", function(test) {
  var i = interpolate.hslLong("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  test.equal(i(0.0), "#bf5540");
  test.equal(i(0.2), "#99bf40");
  test.equal(i(0.4), "#40bf77");
  test.equal(i(0.6), "#4077bf");
  test.equal(i(0.8), "#9940bf");
  test.equal(i(1.0), "#bf4055");
  test.end();
});

tape("hslLong(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.hslLong("#f60", "#000")(.5), "#803300");
  test.equal(interpolate.hslLong("#6f0", "#fff")(.5), "#b3ff80");
  test.end();
});

tape("hslLong(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.hslLong("#000", "#f60")(.5), "#803300");
  test.equal(interpolate.hslLong("#fff", "#6f0")(.5), "#b3ff80");
  test.end();
});

tape("hslLong(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
  test.equal(interpolate.hslLong("#ccc", "#000")(.5), "#666666");
  test.equal(interpolate.hslLong("#f00", "#000")(.5), "#800000");
  test.end();
});

tape("hslLong(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
  test.equal(interpolate.hslLong("#000", "#ccc")(.5), "#666666");
  test.equal(interpolate.hslLong("#000", "#f00")(.5), "#800000");
  test.end();
});
