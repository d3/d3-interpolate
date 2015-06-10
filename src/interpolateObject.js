import interpolate from "./interpolate";

export default function(a, b) {
  var i = {},
      c = {},
      k;

  for (k in a) {
    if (k in b) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }

  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
};
