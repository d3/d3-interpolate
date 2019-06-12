export default function(a, b) {
  if (!b) b = [];
  var na = a ? Math.min(b.length, a.length) : 0,
    diff = Float64Array.from(b.slice(0, na)),
    c = b.slice();
  let i;

  for (i = 0; i < na; ++i) diff[i] = b[i] - a[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = a[i] + diff[i] * t;
    return c;
  };
}
