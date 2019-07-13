import {default as fromCurve} from "./fromCurve";
import {curveCardinal} from "d3-shape";

export default function(values) {
  return fromCurve(values, curveCardinal)
}
