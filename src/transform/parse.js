import decompose from "./decompose";

var identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0},
    cssNode,
    cssRoot,
    cssView,
    svgNode;

export function parseCss(value) {
  if (value === "none") return decompose(identity);
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  cssRoot.appendChild(cssNode);
  value = cssView.getComputedStyle(cssNode, null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  var m = value.slice(7, -1).split(",");
  return decompose({a: +m[0], b: +m[1], c: +m[2], d: +m[3], e: +m[4], f: +m[5]});
};

export function parseSvg(value) {
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value == null ? "" : value);
  return decompose(svgNode.transform.baseVal.consolidate().matrix);
};
