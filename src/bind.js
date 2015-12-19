var slice = Array.prototype.slice;

function bindN(type, args) {
  args = slice.call(args);
  args[0] = null;
  args.unshift(null);
  return function(a, b) {
    args[0] = a;
    args[1] = b;
    return type.apply(null, args);
  };
}

export default function(type) {
  return arguments.length === 1 ? type : bindN(type, arguments);
};
