import {color, interpolateRgb} from "d3-color";
import interpolateArray from "./interpolateArray";
import interpolateNumber from "./interpolateNumber";
import interpolateObject from "./interpolateObject";
import interpolateString from "./interpolateString";

export default [
  function(a, b) {
    var t = typeof b, c;
    return (t === "string" ? ((c = color(b)) ? (b = c, interpolateRgb) : interpolateString)
        : b instanceof color ? interpolateRgb
        : Array.isArray(b) ? interpolateArray
        : t === "object" && isNaN(b) ? interpolateObject
        : interpolateNumber)(a, b);
  }
];
