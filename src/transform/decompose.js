var rad2deg = 180 / Math.PI;

export default function(matrix) {
  var r0 = [matrix.a, matrix.b],
      r1 = [matrix.c, matrix.d],
      kx = normalize(r0),
      kz = dot(r0, r1),
      ky = normalize(combine(r1, r0, -kz)) || 0;

  if (r0[0] * r1[1] < r1[0] * r0[1]) r0[0] *= -1, r0[1] *= -1, kx *= -1, kz *= -1;

  return {
    rotate: (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * rad2deg,
    translate: [matrix.e, matrix.f],
    scale: [kx, ky],
    skew: ky ? Math.atan2(kz, ky) * rad2deg : 0
  };
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
