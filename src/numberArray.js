export default function(a, b) {
  if (!b) b = [];
  var na = a ? Math.min(b.length, a.length) : 0,
    c = b.slice(),
    i;
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

export function isNumberArray(x) {
  if (ArrayBuffer.isView(x)) return !(x instanceof DataView);
  return Array.isArray(x) && x.every(i => typeof i == "number");
}
