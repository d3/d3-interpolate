var tape = require("tape"),
    interpolate = require("../");

tape("string(a, b) interpolates matching numbers in a and b", function(test) {
  test.equal(interpolate.string(" 10/20 30", "50/10 100 ")(.2), "18/18 44 ");
  test.equal(interpolate.string(" 10/20 30", "50/10 100 ")(.4), "26/16 58 ");
  test.end();
});

tape("string(a, b) coerces a and b to strings", function(test) {
  test.equal(interpolate.string({toString: function() { return "2px"; }}, {toString: function() { return "12px"; }})(.25), "4.5px");
  test.end();
});

tape("string(a, b) preserves non-numbers in string b", function(test) {
  test.equal(interpolate.string(" 10/20 30", "50/10 foo ")(.2), "18/18 foo ");
  test.equal(interpolate.string(" 10/20 30", "50/10 foo ")(.4), "26/16 foo ");
  test.end();
});

tape("string(a, b) preserves non-matching numbers in string b", function(test) {
  test.equal(interpolate.string(" 10/20 foo", "50/10 100 ")(.2), "18/18 100 ");
  test.equal(interpolate.string(" 10/20 bar", "50/10 100 ")(.4), "26/16 100 ");
  test.end();
});

tape("string(a, b) preserves equal-value numbers in both strings", function(test) {
  test.equal(interpolate.string(" 10/20 100 20", "50/10 100, 20 ")(.2), "18/18 100, 20 ");
  test.equal(interpolate.string(" 10/20 100 20", "50/10 100, 20 ")(.4), "26/16 100, 20 ");
  test.end();
});

tape("string(a, b) interpolates decimal notation correctly", function(test) {
  test.equal(interpolate.string("1.", "2.")(.5), "1.5");
  test.end();
});

tape("string(a, b) interpolates exponent notation correctly", function(test) {
  test.equal(interpolate.string("1e+3", "1e+4")(.5), "5500");
  test.equal(interpolate.string("1e-3", "1e-4")(.5), "0.00055");
  test.equal(interpolate.string("1.e-3", "1.e-4")(.5), "0.00055");
  test.equal(interpolate.string("-1.e-3", "-1.e-4")(.5), "-0.00055");
  test.equal(interpolate.string("+1.e-3", "+1.e-4")(.5), "0.00055");
  test.equal(interpolate.string(".1e-2", ".1e-3")(.5), "0.00055");
  test.end();
});

tape("string(a, b) with no numbers, returns the target string", function(test) {
  test.equal(interpolate.string("foo", "bar")(.5), "bar");
  test.equal(interpolate.string("foo", "")(.5), "");
  test.equal(interpolate.string("", "bar")(.5), "bar");
  test.equal(interpolate.string("", "")(.5), "");
  test.end();
});

tape("string(a, b) with two numerically-equivalent numbers, returns the default format", function(test) {
  test.equal(interpolate.string("top: 1000px;", "top: 1e3px;")(.5), "top: 1000px;");
  test.equal(interpolate.string("top: 1e3px;", "top: 1000px;")(.5), "top: 1000px;");
  test.end();
});

