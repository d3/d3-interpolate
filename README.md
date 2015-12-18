# d3-interpolate

This module provides a variety of interpolation methods for blending between two values. Values may be numbers, colors, strings, arrays, or even deeply-nested objects. For example:

```js
var i = d3_interpolate.number(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

The returned function `i` is called an *interpolator*. Given a starting value *a* and an ending value *b*, it takes a parameter *t* in the domain [0, 1] and returns the corresponding interpolated value between *a* and *b*. An interpolator typically returns a value equivalent to *a* at *t* = 0 and a value equivalent to *b* at *t* = 1.

You can interpolate more than just numbers. To find the perceptual midpoint between steelblue and brown:

```js
d3_interpolate.lab("steelblue", "brown")(0.5); // "#8e5c6d"
```

Here’s a more elaborate example demonstrating type inference used by [value](#value):

```js
var i = d3_interpolate.value({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["#ff0000", "#0000ff"]}
i(0.5); // {colors: ["#ff8080", "#000080"]}
i(1.0); // {colors: ["#ffffff", "#000000"]}
```

Note that the generic value interpolator detects not only nested objects and arrays, but also color strings and numbers embedded in strings!

## Installing

If you use NPM, `npm install d3-interpolate`. Otherwise, download the [latest release](https://github.com/d3/d3-interpolate/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. Create a custom build using [Rollup](https://github.com/rollup/rollup) or your preferred bundler. You can also load directly from [d3js.org](https://d3js.org):

```html
<script src="https://d3js.org/d3-color.v0.3.min.js"></script>
<script src="https://d3js.org/d3-interpolate.v0.2.min.js"></script>
```

In a vanilla environment, a `d3_interpolate` global is exported. [Try d3-interpolate in your browser.](https://tonicdev.com/npm/d3-interpolate)

## API Reference

<a name="value" href="#value">#</a> d3_interpolate.<b>value</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two arbitrary values *a* and *b*. The interpolator implementation is based on the type of the end value *b*, using the following algorithm:

1. If *b* is a [color](https://github.com/d3/d3-color#color), [rgb](#rgb) is used.
2. If *b* is a string, [string](#string) is used.
3. If *b* is an array, [array](#array) is used.
4. If *b* is an object and not coercible to a number, [object](#object) is used.
5. Otherwise, [number](#number) is used.

Based on the chosen interpolator, *a* is coerced to a suitable corresponding type. The behavior of this method may be augmented to support additional types by pushing custom interpolator factories onto the [values](#values) array.

<a name="number" href="#number">#</a> d3_interpolate.<b>number</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two numbers *a* and *b*. The returned interpolator is equivalent to:

```js
function interpolate(t) {
  return a * (1 - t) + b * t;
}
```

Caution: avoid interpolating to or from the number zero when the interpolator is used to generate a string. When very small values are stringified, they may be converted to scientific notation, which is an invalid attribute or style property value. For example, the number `0.0000001` is converted to the string `"1e-7"`. This is particularly noticeable with interpolating opacity. To avoid scientific notation, start or end the transition at 1e-6: the smallest value that is not stringified in scientific notation.

<a name="round" href="#round">#</a> d3_interpolate.<b>round</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two numbers *a* and *b*; the interpolator is similar to [number](#number), except it will round the resulting value to the nearest integer.

<a name="string" href="#string">#</a> d3_interpolate.<b>string</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two strings *a* and *b*. The string interpolator finds numbers embedded in *a* and *b*, where each number is of the form understood by JavaScript. A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.

For each number embedded in *b*, the interpolator will attempt to find a corresponding number in *a*. If a corresponding number is found, a numeric interpolator is created using [number](#number). The remaining parts of the string *b* are used as a template: the static parts of the string *b* remain constant for the interpolation, with the interpolated numeric values embedded in the template.

For example, if *a* is `"300 12px sans-serif"`, and *b* is `"500 36px Comic-Sans"`, two embedded numbers are found. The remaining static parts of the string are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`). The result of the interpolator at *t* = .5 is `"400 24px Comic-Sans"`.

<a name="array" href="#array">#</a> d3_interpolate.<b>array</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two arrays *a* and *b*. Internally, an array template is created that is the same length in *b*. For each element in *b*, if there exists a corresponding element in *a*, a generic interpolator is created for the two elements using [value](#value). If there is no such element, the static value from *b* is used in the template. Then, for the given parameter *t*, the template’s embedded interpolators are evaluated. The updated array template is then returned.

For example, if *a* is the array `[0, 1]` and *b* is the array `[1, 10, 100]`, then the result of the interpolator for *t* = .5 is the array `[.5, 5.5, 100]`.

Note: **no defensive copy** of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](https://github.com/d3/d3-transition).

<a name="object" href="#object">#</a> d3_interpolate.<b>object</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two objects *a* and *b*. Internally, an object template is created that has the same properties as *b*. For each property in *b*, if there exists a corresponding property in *a*, a generic interpolator is created for the two elements using [value](#value). If there is no such property, the static value from *b* is used in the template. Then, for the given parameter *t*, the template's embedded interpolators are evaluated and the updated object template is then returned.

For example, if *a* is the object `{x: 0, y: 1}` and *b* is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for *t* = .5 is the object `{x: .5, y: 5.5, z: 100}`.

Object interpolation is particularly useful for *dataspace interpolation*, where data is interpolated rather than attribute values. For example, you can interpolate an object which describes an arc in a pie chart, and then use d3.svg.arc to compute the new SVG path data.

Note: **no defensive copy** of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator. No copy is made for performance reasons; interpolators are often part of the inner loop of [animated transitions](https://github.com/d3/d3-transition).

<a name="transform" href="#transform">#</a> d3_interpolate.<b>transform</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two 2D affine transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated. This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

<a name="zoom" href="#zoom">#</a> d3_interpolate.<b>zoom</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two views *a* and *b* of a two-dimensional plane, based on [“Smooth and efficient zooming and panning”](https://www.google.com/search?q=Smooth+and+efficient+zooming+and+panning) by Jarke J. van Wijk and Wim A.A. Nuij. Each view is defined as an array of three numbers: *cx*, *cy* and *width*. The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.

The returned interpolator exposes a *duration* property which encodes the recommended transition duration in milliseconds. This duration is based on the path length of the curved trajectory through *x,y* space. If you want to a slower or faster transition, multiply this by an arbitrary scale factor (<i>V</i> as described in the original paper).

<a name="values" href="#values">#</a> d3_interpolate.<b>values</b>

The array of built-in interpolator factories, as used by [value](#value). Additional interpolator factories may be pushed onto the end of this array. Each factory should return an interpolator if it supports interpolating the two specified input values; otherwise, the factory should return a falsey value and other interpolators will be tried.

For example, to register a custom interpolator that formats dollars and cents, you might say:

```js
d3_interpolate.values.push(function(a, b) {
  var re = /^\$([0-9,.]+)$/, ma, mb, f = d3.format(",.02f");
  if ((ma = re.exec(a)) && (mb = re.exec(b))) {
    a = parseFloat(ma[1]);
    b = parseFloat(mb[1]) - a;
    return function(t) {
      return "$" + f(a + b * t);
    };
  }
});
```

Subsequently, `d3_interpolate.value("$20", "$10")(1/3)` returns `$16.67`.

<a name="rgb" href="#rgb">#</a> d3_interpolate.<b>rgb</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/rgb.png" width="100%" height="80" alt="rgb">

Returns an RGB color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in RGB; they will be converted to RGB using [color.rgb](https://github.com/d3/d3-color#rgb). The return value of the interpolator is a hexadecimal RGB string.

<a name="hsl" href="#hsl">#</a> d3_interpolate.<b>hsl</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/hsl.png" width="100%" height="80" alt="hsl">

Returns an HSL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HSL; they will be converted to HSL using [color.hsl](https://github.com/d3/d3-color#hsl). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="hslLong" href="#hslLong">#</a> d3_interpolate.<b>hslLong</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/hslLong.png" width="100%" height="80" alt="hslLong">

Like [hsl](#hsl), but does not use the shortest path between hues.

<a name="lab" href="#lab">#</a> d3_interpolate.<b>lab</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/lab.png" width="100%" height="80" alt="lab">

Returns a Lab color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in Lab; they will be converted to Lab using [color.lab](https://github.com/d3/d3-color#lab). The return value of the interpolator is a hexadecimal RGB string.

<a name="hcl" href="#hcl">#</a> d3_interpolate.<b>hcl</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/hcl.png" width="100%" height="80" alt="hcl">

Returns an HCL color space interpolator between the two colors *a* and *b*. The colors *a* and *b* need not be in HCL; they will be converted to HCL using [color.hcl](https://github.com/d3/d3-color#hcl). If either color’s hue or chroma is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="hclLong" href="#hclLong">#</a> d3_interpolate.<b>hclLong</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/hclLong.png" width="100%" height="80" alt="hclLong">

Like [hcl](#hcl), but does not use the shortest path between hues.

<a name="cubehelix" href="#cubehelix">#</a> d3_interpolate.<b>cubehelix</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/cubehelix.png" width="100%" height="80" alt="cubehelix">

Returns a Cubehelix color space interpolator between the two colors *a* and *b* using the default *gamma* of 1.0. The colors *a* and *b* need not be in Cubehelix; they will be converted to Cubehelix using [color.cubehelix](https://github.com/d3/d3-color#cubehelix). If either color’s hue or saturation is NaN, the opposing color’s channel value is used. The shortest path between hues is used. The return value of the interpolator is a hexadecimal RGB string.

<a name="cubehelixLong" href="#cubehelixLong">#</a> d3_interpolate.<b>cubehelixLong</b>(<i>a</i>, <i>b</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/cubehelixLong.png" width="100%" height="80" alt="cubehelixLong">

Like [cubehelix](#cubehelix), but does not use the shortest path between hues.

<a name="cubehelixGamma" href="#cubehelixGamma">#</a> d3_interpolate.<b>cubehelixGamma</b>(<i>gamma</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/cubehelixGamma.png" width="100%" height="80" alt="cubehelixGamma">

Returns a Cubehelix color space interpolator factory using the specified *gamma*. A gamma value less than one emphasizes low intensity values, while a gamma value greater than one emphasizes high intensity values. For example:

```js
var i = d3_interpolate.cubehelixGamma(3)("purple", "orange");
```

<a name="cubehelixGammaLong" href="#cubehelixGammaLong">#</a> d3_interpolate.<b>cubehelixGammaLong</b>(<i>gamma</i>)

<img src="https://raw.githubusercontent.com/d3/d3-interpolate/master/img/cubehelixGammaLong.png" width="100%" height="80" alt="cubehelixGammaLong">

Like [cubehelixGamma](#cubehelixGamma), but does not use the shortest path between hues.
