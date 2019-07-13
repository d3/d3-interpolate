import {default as fromCurve} from "./fromCurve";
import {curveCatmullRom} from "d3-shape";

export default function(values) {
  return fromCurve(values, curveCatmullRom)
}
