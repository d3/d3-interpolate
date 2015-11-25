var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("hsl(a, b) converts a and b to HSL colors", function(test) {
  test.equal(interpolate.hsl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.hsl("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.hsl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("hsl(a, b) interpolates in HSL and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.hsl("steelblue", "#f00")(.2), "#383dc3");
  test.end();
});

tape("hsl(a, b) uses the shortest path when interpolating hue", function(test) {
  var i = interpolate.hsl("hsl(10,50%,50%)", "hsl(350,50%,50%)");
  test.equal(i(0.0), "#bf5540");
  test.equal(i(0.2), "#bf4d40");
  test.equal(i(0.4), "#bf4440");
  test.equal(i(0.6), "#bf4044");
  test.equal(i(0.8), "#bf404d");
  test.equal(i(1.0), "#bf4055");
  test.end();
});

tape("hsl(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.hsl("#f60", "#000")(.5), "#803300");
  test.equal(interpolate.hsl("#6f0", "#fff")(.5), "#b3ff80");
  test.end();
});

tape("hsl(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.hsl("#000", "#f60")(.5), "#803300");
  test.equal(interpolate.hsl("#fff", "#6f0")(.5), "#b3ff80");
  test.end();
});

tape("hsl(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
  test.equal(interpolate.hsl("#ccc", "#000")(.5), "#666666");
  test.equal(interpolate.hsl("#f00", "#000")(.5), "#800000");
  test.end();
});

tape("hsl(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
  test.equal(interpolate.hsl("#000", "#ccc")(.5), "#666666");
  test.equal(interpolate.hsl("#000", "#f00")(.5), "#800000");
  test.end();
});
