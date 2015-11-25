var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("rgb(a, b) converts a and b to RGB colors", function(test) {
  test.equal(interpolate.rgb("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.rgb("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.rgb("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("rgb(a, b) interpolates in RGB and returns a hexadecimal string", function(test) {
  test.equal(interpolate.rgb("steelblue", "#f00")(.2), "#6b6890");
  test.end();
});
