import {color} from "d3-color";
import rgb from "./rgb.js";
import array from "./array.js";
import date from "./date.js";
import number from "./number.js";
import object from "./object.js";
import string from "./string.js";
import typedArray from "./typedArray.js";
import constant from "./constant.js";

export default function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : Array.isArray(b) ? array
      : isTypedArray(b) ? typedArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : number)(a, b);
}

function isTypedArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}
