var tape = require("tape"),
    hcl = require('../').interpolateHcl,
    color = require("d3-color"),
    customInterpolate = require("../").customInterpolate;

tape("customInterpolate(interpolators) uses a custom interpolator to ignore some object keys", function(test) {
  var ignore = {color: true};
  var ignoreKeyObjectInterpolator = function(a, b, value) {
    var i = {},
        c = {},
        k;

    if (a === null || typeof a !== "object") a = {};
    if (b === null || typeof b !== "object") b = {};

    for (k in b) {
      if (k in a && !(k in ignore)) {
        i[k] = value(a[k], b[k]);
      } else {
        c[k] = b[k];
      }
    }

    return function(t) {
      for (k in i) c[k] = i[k](t);
      return c;
    };
  }

  var interpolate = customInterpolate({object: ignoreKeyObjectInterpolator});
  var i = interpolate({color: "red", x: 1, y: 2}, {color: "red", x: 3, y: 2});
  test.deepEqual(i(0.5), {color: "red", x: 2, y: 2});

  test.end();
});

tape("customInterpolate(interpolators) swaps color interpolators", function(test) {
  var interpolate = customInterpolate({rgb: hcl});
  var i = interpolate(color.hcl(10, 50, 50), color.hcl(350, 50, 50));
  test.equal(i(0.0), "rgb(196, 79, 106)");
  test.equal(i(0.2), "rgb(196, 79, 112)");
  test.equal(i(0.4), "rgb(195, 79, 118)");
  test.equal(i(0.6), "rgb(193, 79, 124)");
  test.equal(i(0.8), "rgb(191, 80, 129)");
  test.equal(i(1.0), "rgb(189, 81, 135)");
  test.end();
});
