import {line as shapeLine} from "d3-shape";
import {range as arrayRange} from "d3-array";

function curvePolator(points, curve, epsilon, samples) {
  const path = shapeLine().curve(curve)(points);

  return svgPathInterpolator(path, epsilon, samples);
}

function svgPathInterpolator(path, epsilon, samples) {
  // Create detached SVG path
  path = path || "M0,0L1,1";

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  area.innerHTML = `<path></path>`;
  const svgpath = area.querySelector('path');
  svgpath.setAttribute('d', path);

  // Calculate lengths and max points
  const totalLength = svgpath.getTotalLength();
  const minPoint = svgpath.getPointAtLength(0);
  const maxPoint = svgpath.getPointAtLength(totalLength);
  let reverse = maxPoint.x < minPoint.x;
  const range = reverse ? [maxPoint, minPoint] : [minPoint, maxPoint];
  reverse = reverse ? -1 : 1;

  // Return function
  return function(x) {
    const targetX = x === 0 ? 0 : x || minPoint.x; // Check for 0 and null/undefined
    if (targetX < range[0].x) return range[0];     // Clamp
    if (targetX > range[1].x) return range[1];

    function estimateLength(l, mn, mx) {
      let delta = svgpath.getPointAtLength(l).x - targetX;
      let nextDelta = 0;
      let iter = 0;

      while (Math.abs(delta) > epsilon && iter < samples) {
        iter++;

        if (reverse * delta < 0) {
          mn = l;
          l = (l + mx) / 2;
        } else {
          mx = l;
          l = (mn + l) / 2;
        }
        nextDelta = svgpath.getPointAtLength(l).x - targetX;
        if (Math.abs(Math.abs(delta) - Math.abs(nextDelta)) < epsilon) {
          break;
        }
        delta = nextDelta;
      }

      return l;
    }

    const estimatedLength = estimateLength(totalLength / 2, 0, totalLength);

    return svgpath.getPointAtLength(estimatedLength).y;
  }
}

export default function(values, curve, epsilon = 0.00001, samples = 100) {
  const length = values.length;
  const xrange = arrayRange(length).map(function(d, i) { return i * (1 / (length - 1)); });
  const points = values.map((v, i) => [xrange[i], v]);

  return curvePolator(points, curve, epsilon, samples);
}