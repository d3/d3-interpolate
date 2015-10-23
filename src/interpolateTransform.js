import interpolateNumber from "./interpolateNumber";

var rad2deg = 180 / Math.PI,
    identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0},
    g;

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function Transform(string) {
  if (!g) g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  if (string) g.setAttribute("transform", string), t = g.transform.baseVal.consolidate();

  var t,
      m = t ? t.matrix : identity,
      r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = normalize(r0),
      kz = dot(r0, r1),
      ky = normalize(combine(r1, r0, -kz)) || 0;

  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }

  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * rad2deg;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * rad2deg : 0;
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function normalize(a) {
  var k = Math.sqrt(dot(a, a));
  if (k) a[0] /= k, a[1] /= k;
  return k;
}

function combine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

function pop(s) {
  return s.length ? s.pop() + "," : "";
}

function interpolateTranslate(ta, tb, s, q) {
  if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
    var i = s.push("translate(", null, ",", null, ")");
    q.push({i: i - 4, x: interpolateNumber(ta[0], tb[0])}, {i: i - 2, x: interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  }
}

function interpolateRotate(ra, rb, s, q) {
  if (ra !== rb) {
    if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
    q.push({i: s.push(pop(s) + "rotate(", null, ")") - 2, x: interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(pop(s) + "rotate(" + rb + ")");
  }
}

function interpolateSkew(wa, wb, s, q) {
  if (wa !== wb) {
    q.push({i: s.push(pop(s) + "skewX(", null, ")") - 2, x: interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(pop(s) + "skewX(" + wb + ")");
  }
}

function interpolateScale(ka, kb, s, q) {
  if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
    var i = s.push(pop(s) + "scale(", null, ",", null, ")");
    q.push({i: i - 4, x: interpolateNumber(ka[0], kb[0])}, {i: i - 2, x: interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] !== 1 || kb[1] !== 1) {
    s.push(pop(s) + "scale(" + kb + ")");
  }
}

export default function(a, b) {
  var s = [], // string constants and placeholders
      q = []; // number interpolators
  a = new Transform(a), b = new Transform(b);
  interpolateTranslate(a.translate, b.translate, s, q);
  interpolateRotate(a.rotate, b.rotate, s, q);
  interpolateSkew(a.skew, b.skew, s, q);
  interpolateScale(a.scale, b.scale, s, q);
  a = b = null; // gc
  return function(t) {
    var i = -1, n = q.length, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};
