import {rgb} from "d3-color";

export default function(a, b) {
  a = rgb(a);
  b = rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r || 0,
      bg = b.g || 0,
      bb = b.b || 0;
  if (isNaN(ar)) ar = br;
  if (isNaN(ag)) ag = bg;
  if (isNaN(ab)) ab = bb;
  br -= ar;
  bg -= ag;
  bb -= ab;
  return function(t) {
    a.r = ar + br * t;
    a.g = ag + bg * t;
    a.b = ab + bb * t;
    return a + "";
  };
}
