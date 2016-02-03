import {lab} from "d3-color";

export default function interpolateLab(a, b) {
  a = lab(a);
  b = lab(b);
  var al = a.l,
      aa = a.a,
      ab = a.b,
      bl = b.l || 0,
      ba = b.a || 0,
      bb = b.b || 0;
  if (isNaN(al)) al = bl;
  if (isNaN(aa)) aa = ba;
  if (isNaN(ab)) ab = bb;
  bl -= al;
  ba -= aa;
  bb -= ab;
  return function(t) {
    a.l = al + bl * t;
    a.a = aa + ba * t;
    a.b = ab + bb * t;
    return a + "";
  };
}
