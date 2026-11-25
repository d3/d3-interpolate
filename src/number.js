export default function(a, b) {
  return a = +a, b = +b, function(t) {
    if (t === Infinity) return b > a ? Infinity : b < a ? -Infinity : a;
    if (t === -Infinity) return b > a ? -Infinity : b < a ? Infinity : a;
    return a * (1 - t) + b * t;
  };
}
