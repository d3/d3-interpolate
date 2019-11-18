export default function(a, b) {
  if (!b) b = [];
  var na = a ? Math.min(b.length, a.length) : 0,
    c = b.slice();
  let i;
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = a[i] + (b[i] - a[i]) * t;
    return c;
  };
}

export function isTypedArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
