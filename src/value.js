import {color} from "d3-color";
import rgb from "./rgb.js";
import {genericArray} from "./array.js";
import date from "./date.js";
import number from "./number.js";
import string from "./string.js";
import constant from "./constant.js";
import numberArray, {isNumberArray} from "./numberArray.js";

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? interpolateObject
      : number)(a, b);
}

function interpolateObject(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

// although it breaks code style, interpolateObject was 
// moved here to prevent require cycles
export default interpolate
export {interpolate, interpolateObject}
