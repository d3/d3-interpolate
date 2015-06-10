import "../math/trigonometry";

var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
export default function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      d1 = Math.sqrt(d2),
      b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
      b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
      r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
      r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1),
      dr = r1 - r0,
      S = (dr || Math.log(w1 / w0)) / rho,
      i = dr ? interpolate : interpolateSpecial;

  // General case.
  function interpolate(t) {
    var s = t * S,
        coshr0 = cosh(r0),
        u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
    return [
      ux0 + u * dx,
      uy0 + u * dy,
      w0 * coshr0 / cosh(rho * s + r0)
    ];
  }

  // Special case for u0 ~= u1.
  function interpolateSpecial(t) {
    return [
      ux0 + t * dx,
      uy0 + t * dy,
      w0 * Math.exp(rho * t * S)
    ];
  }

  i.duration = S * 1000;

  return i;
};
