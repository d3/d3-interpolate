import {rgb} from "d3-color";

function interpolateRgb(a, b) {
  a = rgb(a);
  b = rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      ao = a.opacity,
      br = b.r,
      bg = b.g,
      bb = b.b,
      bo = b.opacity;
  if (isNaN(ar)) ar = br;
  if (isNaN(ag)) ag = bg;
  if (isNaN(ab)) ab = bb;
  if (isNaN(ao)) ao = bo;
  br = (br - ar) || 0;
  bg = (bg - ag) || 0;
  bb = (bb - ab) || 0;
  bo = (bo - ao) || 0;
  return function(t) {
    a.r = ar + br * t;
    a.g = ag + bg * t;
    a.b = ab + bb * t;
    a.opacity = ao + bo * t;
    return a + "";
  };
}

interpolateRgb.gamma = function gamma(y) {
  y = +y;

  function interpolateRgb(a, b) {
    a = rgb(a);
    b = rgb(b);
    var ar = Math.pow(a.r, y),
        ag = Math.pow(a.g, y),
        ab = Math.pow(a.b, y),
        ao = a.opacity,
        br = Math.pow(b.r, y),
        bg = Math.pow(b.g, y),
        bb = Math.pow(b.b, y),
        bo = b.opacity;
    if (isNaN(ar)) ar = br;
    if (isNaN(ag)) ag = bg;
    if (isNaN(ab)) ab = bb;
    if (isNaN(ao)) ao = bo;
    br = (br - ar) || 0;
    bg = (bg - ag) || 0;
    bb = (bb - ab) || 0;
    bo = (bo - ao) || 0;
    y = 1 / y;
    return function(t) {
      a.r = Math.pow(ar + br * t, y);
      a.g = Math.pow(ag + bg * t, y);
      a.b = Math.pow(ab + bb * t, y);
      a.opacity = ao + bo * t;
      return a + "";
    };
  }

  interpolateRgb.gamma = gamma;

  return interpolateRgb;
};

export default interpolateRgb;
