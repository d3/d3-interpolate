import {cubehelix} from "d3-color";
import deltaHue from "./deltaHue";

export default function(a, b, gamma) {
  if (arguments.length < 3) gamma = 1;
  a = cubehelix(a);
  b = cubehelix(b);
  var ah = isNaN(a.h) ? b.h : a.h,
      as = isNaN(a.s) ? b.s : a.s,
      al = a.l,
      bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
      bs = isNaN(b.s) ? 0 : b.s - as,
      bl = b.l - al;
  return function(t) {
    a.h = ah + bh * t;
    a.s = as + bs * t;
    a.l = al + bl * Math.pow(t, gamma);
    return a + "";
  };
};
