import {rgb as color} from "d3-color";

function rgb(a, b) {
  a = color(a);
  b = color(b);
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

rgb.gamma = function gamma(y) {
  y = +y;

  function rgb(a, b) {
    a = color(a);
    b = color(b);
    var ar = Math.pow(a.r, y),
        ag = Math.pow(a.g, y),
        ab = Math.pow(a.b, y),
        br = Math.pow(b.r || 0, y),
        bg = Math.pow(b.g || 0, y),
        bb = Math.pow(b.b || 0, y);
    if (isNaN(ar)) ar = br;
    if (isNaN(ag)) ag = bg;
    if (isNaN(ab)) ab = bb;
    br -= ar;
    bg -= ag;
    bb -= ab;
    y = 1 / y;
    return function(t) {
      a.r = Math.pow(ar + br * t, y);
      a.g = Math.pow(ag + bg * t, y);
      a.b = Math.pow(ab + bb * t, y);
      return a + "";
    };
  }

  rgb.gamma = gamma;

  return rgb;
};

export default rgb;
