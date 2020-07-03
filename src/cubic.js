import {clamp, floor, frac, min} from "./math.js";

export default function cubic(values, type = "default") {
  let n = values.length - 1, k;
  values = values.slice();
  switch (type) {
    case "default":
      values.push(2 * values[n] - values[n - 1]);
      values.unshift(2 * values[0] - values[1]);
      return t => cubic(clamp(t, 0, 1));
    case "closed":
      values.unshift(values[n]);
      values.push(values[1]);
      values.push(values[2]);
      n += 2;
      k = 1 - 1 / n;
      return t => cubic(k * frac(t));
    case "open":
      throw new Error('open cubic spline not implemented yet');
  }

  function cubic(t) {
    const i = min(n - 1, floor(t * n)),
      v0 = values[i],
      v1 = values[i + 1],
      v2 = values[i + 2],
      v3 = values[i + 3],
      d = t * n - i,
      s20 = v2 - v0,
      s31 = v3 - v1,
      s21 = (v2 - v1) * 2;
    return (((s20 + s31 - 2 * s21) * d + (3 * s21 - 2 * s20 - s31)) * d + s20)
      * d / 2 + v1;
  }
}

export function closed (values) {
  return cubic(values, "closed");
}
