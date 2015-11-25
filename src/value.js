import values from "./values";

export default function(a, b) {
  var i = values.length, f;
  while (--i >= 0 && !(f = values[i](a, b)));
  return f;
};
