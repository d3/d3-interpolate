var tape = require("tape"),
    color = require("d3-color"),
    interpolate = require("../");

tape("interpolate(a, b) interpolates strings if b is a string and not a color", function(test) {
  test.strictEqual(interpolate.interpolate("foo", "bar")(0.5), "bar");
  test.end();
});

tape("interpolate(a, b) interpolates strings if b is a string and not a color, even if b is coercible to a number", function(test) {
  test.strictEqual(interpolate.interpolate("1", "2")(0.5), "1.5");
  test.strictEqual(interpolate.interpolate(" 1", " 2")(0.5), " 1.5");
  test.end();
});

tape("interpolate(a, b) interpolates RGB colors if b is a string and a color", function(test) {
  test.strictEqual(interpolate.interpolate("red", "blue")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("#ff0000", "#0000ff")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("#f00", "#00f")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("rgb(255, 0, 0)", "rgb(0, 0, 255)")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("rgba(255, 0, 0, 1.0)", "rgba(0, 0, 255, 1.0)")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("rgb(100%, 0%, 0%)", "rgb(0%, 0%, 100%)")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("rgba(100%, 0%, 0%, 1.0)", "rgba(0%, 0%, 100%, 1.0)")(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("rgba(100%, 0%, 0%, 0.5)", "rgba(0%, 0%, 100%, 0.7)")(0.5), "rgba(128, 0, 128, 0.6)");
  test.end();
});

tape("interpolate(a, b) interpolates RGB colors if b is a color", function(test) {
  test.strictEqual(interpolate.interpolate("red", color.rgb("blue"))(0.5), "rgb(128, 0, 128)");
  test.strictEqual(interpolate.interpolate("red", color.hsl("blue"))(0.5), "rgb(128, 0, 128)");
  test.end();
});

tape("interpolate(a, b) interpolates arrays if b is an array", function(test) {
  test.deepEqual(interpolate.interpolate(["red"], ["blue"])(0.5), ["rgb(128, 0, 128)"]);
  test.end();
});

tape("interpolate(a, b) interpolates arrays if b is an array, even if b is coercible to a number", function(test) {
  test.deepEqual(interpolate.interpolate([1], [2])(0.5), [1.5]);
  test.end();
});

tape("interpolate(a, b) interpolates numbers if b is a number", function(test) {
  test.strictEqual(interpolate.interpolate(1, 2)(0.5), 1.5);
  test.ok(isNaN(interpolate.interpolate(1, NaN)(0.5)));
  test.end();
});

tape("interpolate(a, b) interpolates numbers if b is an object and coercible to a number", function(test) {
  test.strictEqual(interpolate.interpolate(1, {valueOf: function() { return 2; }})(0.5), 1.5);
  test.strictEqual(interpolate.interpolate(false, true)(0.5), 0.5);
  test.end();
});

tape("interpolate(a, b) interpolates objects if b is an object and not coercible to a number", function(test) {
  test.deepEqual(interpolate.interpolate({color: "red"}, {color: "blue"})(0.5), {color: "rgb(128, 0, 128)"});
  test.end();
});

tape("interpolate(a, b) returns null if b is null", function(test) {
  test.strictEqual(interpolate.interpolate(0, null)(0.5), null);
  test.end();
});

tape("interpolate(a, b) returns undefined if b is undefined", function(test) {
  test.strictEqual(interpolate.interpolate(0, undefined)(0.5), undefined);
  test.end();
});
