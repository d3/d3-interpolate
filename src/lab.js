import {lab} from "d3-color";

export default function(a, b) {
  a = lab(a);
  b = lab(b);
  var al = a.l,
      aa = a.a,
      ab = a.b,
      bl = b.l - al,
      ba = b.a - aa,
      bb = b.b - ab;
  return function(t) {
    a.l = al + bl * t;
    a.a = aa + ba * t;
    a.b = ab + bb * t;
    return a + "";
  };
};
