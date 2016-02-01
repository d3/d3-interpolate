var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolateCubehelix(a, b) converts a and b to Cubehelix colors", function(test) {
  test.equal(interpolate.interpolateCubehelix("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.interpolateCubehelix("steelblue", color.hcl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.interpolateCubehelix("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("interpolateCubehelix(a, b) interpolates in Cubehelix and returns an RGB hexadecimal string", function(test) {
  test.equal(interpolate.interpolateCubehelix("steelblue", "#f00")(0.2), "#5864da");
  test.end();
});

tape("interpolateCubehelix.gamma(3)(a, b) returns the expected values", function(test) {
  test.equal(interpolate.interpolateCubehelix.gamma(3)("steelblue", "#f00")(0.2), "#606be4");
  test.end();
});

tape("interpolateCubehelix.gamma(g) coerces the specified gamma to a number", function(test) {
  test.equal(interpolate.interpolateCubehelix.gamma({valueOf: function() { return 3; }})("steelblue", "#f00")(0.2), "#606be4");
  test.end();
});

tape("interpolateCubehelix(a, b) is equivalent to interpolateCubehelix.gamma(1)(a, b)", function(test) {
  var i0 = interpolate.interpolateCubehelix.gamma(1)("purple", "orange"),
      i1 = interpolate.interpolateCubehelix("purple", "orange");
  test.equal(i1(0.0), i0(0.0));
  test.equal(i1(0.2), i0(0.2));
  test.equal(i1(0.4), i0(0.4));
  test.equal(i1(0.6), i0(0.6));
  test.equal(i1(0.8), i0(0.8));
  test.equal(i1(1.0), i0(1.0));
  test.end();
});

tape("interpolateCubehelix(a, b) uses the shortest path when interpolating hue difference greater than 180°", function(test) {
  var i = interpolate.interpolateCubehelix("purple", "orange");
  test.equal(i(0.0), "#800080");
  test.equal(i(0.2), "#d0017f");
  test.equal(i(0.4), "#ff115d");
  test.equal(i(0.6), "#ff342b");
  test.equal(i(0.8), "#ff6905");
  test.equal(i(1.0), "#ffa500");
  test.end();
});

tape("interpolateCubehelix(a, b) uses a’s hue when b’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateCubehelix("#f60", color.hcl(NaN, NaN, 0))(0.5), "#a22900");
  test.equal(interpolate.interpolateCubehelix("#6f0", color.hcl(NaN, NaN, 0))(0.5), "#03ad00");
  test.end();
});

tape("interpolateCubehelix(a, b) uses b’s hue when a’s hue is undefined", function(test) {
  test.equal(interpolate.interpolateCubehelix(color.hcl(NaN, NaN, 0), "#f60")(0.5), "#a22900");
  test.equal(interpolate.interpolateCubehelix(color.hcl(NaN, NaN, 0), "#6f0")(0.5), "#03ad00");
  test.end();
});

tape("interpolateCubehelix(a, b) uses a’s chroma when b’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateCubehelix("#ccc", color.hcl(NaN, NaN, 0))(0.5), "#666666");
  test.equal(interpolate.interpolateCubehelix("#f00", color.hcl(NaN, NaN, 0))(0.5), "#930000");
  test.end();
});

tape("interpolateCubehelix(a, b) uses b’s chroma when a’s chroma is undefined", function(test) {
  test.equal(interpolate.interpolateCubehelix(color.hcl(NaN, NaN, 0), "#ccc")(0.5), "#666666");
  test.equal(interpolate.interpolateCubehelix(color.hcl(NaN, NaN, 0), "#f00")(0.5), "#930000");
  test.end();
});
