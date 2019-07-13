import {default as fromCurve} from "./fromCurve";
import {curveMonotoneX} from "d3-shape";

export default function(values) {
  return fromCurve(values, curveMonotoneX)
}
