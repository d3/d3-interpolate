import {hcl} from "d3-color";

export default function(a, b) {
  a = hcl(a);
  b = hcl(b);
  var ah = a.h,
      ac = a.c,
      al = a.l,
      bh = b.h,
      bc = b.c,
      bl = b.l || 0;
  if (isNaN(ah)) ah = bh;
  if (isNaN(ac)) ac = bc;
  if (isNaN(al)) al = bl;
  bh = (bh - ah) || 0;
  bc = (bc - ac) || 0;
  bl -= al;
  return function(t) {
    a.h = ah + bh * t;
    a.c = ac + bc * t;
    a.l = al + bl * t;
    return a + "";
  };
}
