var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolateHcl(a, b) converts a and b to HCL colors", function(test) {
  test.equal(interpolate.interpolateHcl("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.interpolateHcl("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.interpolateHcl("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateHcl(a, b) interpolates in HCL and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.interpolateHcl("steelblue", "#f00")(.2), "#6978c9");
  test.end();
});

tape("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 180°", function(test) {
  var i = interpolate.interpolateHcl(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  test.equal(i(0.0), "#c44f6a");
  test.equal(i(0.2), "#c44f70");
  test.equal(i(0.4), "#c34f76");
  test.equal(i(0.6), "#c14f7c");
  test.equal(i(0.8), "#bf5081");
  test.equal(i(1.0), "#bd5187");
  test.end();
});

tape("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 360°", function(test) {
  var i = interpolate.interpolateHcl(color.hcl(10, 50, 50), color.hcl(380, 50, 50));
  test.equal(i(0.0), "#c44f6a");
  test.equal(i(0.2), "#c44f68");
  test.equal(i(0.4), "#c55065");
  test.equal(i(0.6), "#c45062");
  test.equal(i(0.8), "#c4505f");
  test.equal(i(1.0), "#c4515c");
  test.end();
});

tape("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 540°", function(test) {
  var i = interpolate.interpolateHcl(color.hcl(10, 50, 50), color.hcl(710, 50, 50));
  test.equal(i(0.0), "#c44f6a");
  test.equal(i(0.2), "#c44f70");
  test.equal(i(0.4), "#c34f76");
  test.equal(i(0.6), "#c14f7c");
  test.equal(i(0.8), "#bf5081");
  test.equal(i(1.0), "#bd5187");
  test.end();
});

tape("interpolateHcl(a, b) uses the shortest path when interpolating hue difference greater than 720°", function(test) {
  var i = interpolate.interpolateHcl(color.hcl(10, 50, 50), color.hcl(740, 50, 50));
  test.equal(i(0.0), "#c44f6a");
  test.equal(i(0.2), "#c44f68");
  test.equal(i(0.4), "#c55065");
  test.equal(i(0.6), "#c45062");
  test.equal(i(0.8), "#c4505f");
  test.equal(i(1.0), "#c4515c");
  test.end();
});

tape("interpolateHcl(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHcl("#f60", color.hcl(NaN, NaN, 0))(.5), "#9b0000");
  test.equal(interpolate.interpolateHcl("#6f0", color.hcl(NaN, NaN, 0))(.5), "#008100");
  test.end();
});

tape("interpolateHcl(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateHcl(color.hcl(NaN, NaN, 0), "#f60")(.5), "#9b0000");
  test.equal(interpolate.interpolateHcl(color.hcl(NaN, NaN, 0), "#6f0")(.5), "#008100");
  test.end();
});

tape("interpolateHcl(a, b) uses a’s chroma when b’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateHcl("#ccc", color.hcl(NaN, NaN, 0))(.5), "#616161");
  test.equal(interpolate.interpolateHcl("#f00", color.hcl(NaN, NaN, 0))(.5), "#a60000");
  test.end();
});

tape("interpolateHcl(a, b) uses b’s chroma when a’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateHcl(color.hcl(NaN, NaN, 0), "#ccc")(.5), "#616161");
  test.equal(interpolate.interpolateHcl(color.hcl(NaN, NaN, 0), "#f00")(.5), "#a60000");
  test.end();
});

tape("interpolateHcl(a, b) uses b’s luminance when a’s luminance is undefined", function(test) {
  test.equal(interpolate.interpolateHcl(null, color.hcl(20, 80, 50))(0.5), "#ea134d");
  test.end();
});

tape("interpolateHcl(a, b) uses zero when b’s luminance is undefined", function(test) {
  test.equal(interpolate.interpolateHcl(color.hcl(20, 80, 50), null)(0.5), "#990019");
  test.end();
});
