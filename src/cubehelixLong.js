import {cubehelix} from "d3-color";

export default (function gamma(y) {
  y = +y;

  function interpolateCubehelixLong(a, b) {
    a = cubehelix(a);
    b = cubehelix(b);
    var ah = a.h,
        as = a.s,
        al = a.l,
        bh = b.h,
        bs = b.s,
        bl = b.l || 0;
    if (isNaN(ah)) ah = bh;
    if (isNaN(as)) as = bs;
    if (isNaN(al)) al = bl;
    bh = (bh - ah) || 0;
    bs = (bs - as) || 0;
    bl -= al;
    return function(t) {
      a.h = ah + bh * t;
      a.s = as + bs * t;
      a.l = al + bl * Math.pow(t, y);
      return a + "";
    };
  }

  interpolateCubehelixLong.gamma = gamma;

  return interpolateCubehelixLong;
})(1);
