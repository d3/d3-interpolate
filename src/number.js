export default function(a, b) {
  const d = b - a;
  return a = +a, function(t) {
    return t === 1 ? +b : a + d * t;
  };
}
