import number from "../number";
import {parseCss, parseSvg} from "./parse";

function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(ta, tb, s, q) {
    if (ta[0] !== tb[0] || ta[1] !== tb[1]) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: number(ta[0], tb[0])}, {i: i - 2, x: number(ta[1], tb[1])});
    } else if (tb[0] || tb[1]) {
      s.push("translate(" + tb[0] + pxComma + tb[1] + pxParen);
    }
  }

  function rotate(ra, rb, s, q) {
    if (ra !== rb) {
      if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number(ra, rb)});
    } else if (rb) {
      s.push(pop(s) + "rotate(" + rb + degParen);
    }
  }

  function skew(wa, wb, s, q) {
    if (wa !== wb) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number(wa, wb)});
    } else if (wb) {
      s.push(pop(s) + "skewX(" + wb + degParen);
    }
  }

  function scale(ka, kb, s, q) {
    if (ka[0] !== kb[0] || ka[1] !== kb[1]) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: number(ka[0], kb[0])}, {i: i - 2, x: number(ka[1], kb[1])});
    } else if (kb[0] !== 1 || kb[1] !== 1) {
      s.push(pop(s) + "scale(" + kb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translate, b.translate, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skew(a.skew, b.skew, s, q);
    scale(a.scale, b.scale, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

export var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
export var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
