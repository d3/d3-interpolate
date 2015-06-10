export default function(a, b) {
  return a = +a, b = +b, function(t) {
    return a + (b - a) * t;
  };
};
