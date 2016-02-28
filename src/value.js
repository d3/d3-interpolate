import {color} from "d3-color";
import rgb from "./rgb";
import array from "./array";
import number from "./number";
import object from "./object";
import string from "./string";

export default function(a, b) {
  var t = typeof b, c;
  return (t === "number" ? number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : Array.isArray(b) ? array
      : isNaN(b) ? object
      : number)(a, b);
}
