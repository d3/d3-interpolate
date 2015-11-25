export default function(h1, h0) {
  var delta = h1 - h0;
  return delta > 180 || delta < -180
      ? delta - 360 * Math.round(delta / 360)
      : delta;
};
