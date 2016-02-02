import {cubehelix as color} from "d3-color";
import deltaHue from "./deltaHue";

export default (function gamma(y) {
  y = +y;

  function cubehelix(a, b) {
    a = color(a);
    b = color(b);
    var ah = a.h,
        as = a.s,
        al = a.l,
        bh = b.h,
        bs = b.s,
        bl = b.l || 0;
    if (isNaN(ah)) ah = bh;
    if (isNaN(as)) as = bs;
    if (isNaN(al)) al = bl;
    bh = deltaHue(bh, ah) || 0;
    bs = (bs - as) || 0;
    bl -= al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * Math.pow(t, y);
      return a + "";
    };
  }

  cubehelix.gamma = gamma;

  return cubehelix;
})(1);
