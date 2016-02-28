import {color} from "d3-color";
import rgb from "./rgb";
import array from "./array";
import number from "./number";
import object from "./object";
import string from "./string";
import constant from "./constant";

export default function(a, b) {
  var t, c;
  return b == null ? constant(b)
      : ((t = typeof b) === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : Array.isArray(b) ? array
      : isNaN(b) ? object
      : number)(a, b);
}
