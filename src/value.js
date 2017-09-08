import {color} from "d3-color";
import rgb from "./rgb";
import array from "./array";
import date from "./date";
import number from "./number";
import object from "./object";
import string from "./string";
import constant from "./constant";

const defaultInterpolators = {
  rgb,
  array,
  date,
  number,
  object,
  string,
  constant
};

export function customInterpolate(interpolators) {
  var rgb = interpolators.rgb || defaultInterpolators.rgb;
  var array = interpolators.array || defaultInterpolators.array;
  var date = interpolators.date || defaultInterpolators.date;
  var number = interpolators.number || defaultInterpolators.number;
  var object = interpolators.object || defaultInterpolators.object;
  var string = interpolators.string || defaultInterpolators.string;
  var constant = interpolators.constant || defaultInterpolators.constant;

  return function interpolate(a, b) {
    var t = typeof b, c;
    return b == null || t === "boolean" ? constant(b)
        : (t === "number" ? number
        : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
        : b instanceof color ? rgb
        : b instanceof Date ? date
        : Array.isArray(b) ? array
        : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
        : number)(a, b, interpolate);
  }
}

export default customInterpolate({});
