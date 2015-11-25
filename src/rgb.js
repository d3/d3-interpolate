import {rgb} from "d3-color";

export default function(a, b) {
  a = rgb(a);
  b = rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    a.r = ar + br * t;
    a.g = ag + bg * t;
    a.b = ab + bb * t;
    return a + "";
  };
};
