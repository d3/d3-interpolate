import interpolators from "./interpolators";

export default function(a, b) {
  var i = interpolators.length, f;
  while (--i >= 0 && !(f = interpolators[i](a, b)));
  return f;
};
