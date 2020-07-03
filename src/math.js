export var abs = Math.abs;
export var floor = Math.floor;
export var max = Math.max;
export var min = Math.min;
export var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
export function frac(t) {
  return t - floor(t);
}
export function clamp(t, mi, ma) {
  return min(ma, max(mi, t));
}
