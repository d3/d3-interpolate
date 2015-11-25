var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("lab(a, b) converts a and b to Lab colors", function(test) {
  test.equal(interpolate.lab("steelblue", "brown")(0), color.rgb("steelblue") + "");
  test.equal(interpolate.lab("steelblue", color.hsl("brown"))(1), color.rgb("brown") + "");
  test.equal(interpolate.lab("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
  test.end();
});

tape("lab(a, b) interpolates in Lab and returns a hexadecimal string", function(test) {
  test.equal(interpolate.lab("steelblue", "#f00")(.2), "#8a7793");
  test.end();
});
