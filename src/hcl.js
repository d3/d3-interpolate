import {hcl} from "d3-color";
import deltaHue from "./deltaHue";

export default function(a, b) {
  a = hcl(a);
  b = hcl(b);
  var ah = isNaN(a.h) ? b.h : a.h,
      ac = isNaN(a.c) ? b.c : a.c,
      al = a.l,
      bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
      bc = isNaN(b.c) ? 0 : b.c - ac,
      bl = b.l - al;
  return function(t) {
    a.h = ah + bh * t;
    a.c = ac + bc * t;
    a.l = al + bl * t;
    return a + "";
  };
};
