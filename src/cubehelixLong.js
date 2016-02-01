import {cubehelix as color} from "d3-color";

export default (function gamma(y) {
  y = +y;

  function cubehelix(a, b) {
    a = color(a);
    b = color(b);
    var ah = isNaN(a.h) ? b.h : a.h,
        as = isNaN(a.s) ? b.s : a.s,
        al = a.l,
        bh = isNaN(b.h) ? 0 : b.h - ah,
        bs = isNaN(b.s) ? 0 : b.s - as,
        bl = b.l - al;
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
