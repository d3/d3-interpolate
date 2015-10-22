# d3-interpolate

The d3-interpolate module provides a variety of interpolation methods for blending between two values. These values may be numbers, colors, strings, arrays, even deeply-nested objects. For example:

```js
var i = interpolateNumber(10, 20);
i(0.0); // 10
i(0.2); // 12
i(0.5); // 15
i(1.0); // 20
```

The returned function `i` is called an *interpolator*. Given the starting value *a* and the ending value *b*, it takes a parameter *t* in the domain [0,1] and returns an interpolated value between *a* and *b*. An interpolator typically returns a value equivalent to *a* at *t* = 0, and a value equivalent to *b* at *t* = 1.

Here’s a more elaborate example demonstrating type inference used by [interpolate](#interpolate):

```js
var i = interpolate({colors: ["red", "blue"]}, {colors: ["white", "black"]});
i(0.0); // {colors: ["#ff0000", "#0000ff"]}
i(0.5); // {colors: ["#ff8080", "#000080"]}
i(1.0); // {colors: ["#ffffff", "#000000"]}
```

Note that the generic interpolate method detects not only nested objects and arrays, but also color strings and numbers embedded in strings!

## Installing

If you use NPM, `npm install d3-interpolate`. Otherwise, download the [latest release](https://github.com/d3/d3-interpolate/releases/latest).

## API Reference

<a name="interpolate" href="#interpolate">#</a> <b>interpolate</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two values *a* and *b*. The type of interpolator is based on the type of the end value *b*, using the following algorithm:

1. If *b* is a [color](https://github.com/d3/d3-color#color), [interpolateRgb](https://github.com/d3/d3-color#interpolateRgb) is used.
2. If *b* is a string, [interpolateString](#interpolateString) is used.
3. If *b* is an array, [interpolateArray](#interpolateArray) is used.
4. If *b* is an object and not coercible to a number, [interpolateObject](#interpolateObject) is used.
5. Otherwise, [interpolateNumber](#interpolateNumber) is used.

Based on the chosen interpolator, *a* is coerced to a suitable corresponding type. The behavior of this method may be augmented to support additional types by pushing custom interpolator factories onto the [interpolators](#interpolators) array.

<a name="interpolateNumber" href="#interpolateNumber">#</a> <b>interpolateNumber</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two numbers *a* and *b*. The returned interpolator is equivalent to:

```js
function interpolate(t) {
  return a * (1 - t) + b * t;
}
```

Caution: avoid interpolating to or from the number zero when the interpolator is used to generate a string. When very small values are stringified, they may be converted to scientific notation, which is an invalid attribute or style property value. For example, the number `0.0000001` is converted to the string `"1e-7"`. This is particularly noticeable with interpolating opacity. To avoid scientific notation, start or end the transition at 1e-6: the smallest value that is not stringified in scientific notation.

<a name="interpolateRound" href="#interpolateRound">#</a> <b>interpolateRound</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two numbers *a* and *b*; the interpolator is similar to [interpolateNumber](#interpolateNumber), except it will round the resulting value to the nearest integer.

<a name="interpolateString" href="#interpolateString">#</a> <b>interpolateString</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two strings *a* and *b*. The string interpolator finds numbers embedded in *a* and *b*, where each number is of the form understood by JavaScript. A few examples of numbers that will be detected within a string: `-1`, `42`, `3.14159`, and `6.0221413e+23`.

For each number embedded in *b*, the interpolator will attempt to find a corresponding number in *a*. If a corresponding number is found, a numeric interpolator is created using [interpolateNumber](#interpolateNumber). The remaining parts of the string *b* are used as a template: the static parts of the string *b* remain constant for the interpolation, with the interpolated numeric values embedded in the template.

For example, if *a* is `"300 12px sans-serif"`, and *b* is `"500 36px Comic-Sans"`, two embedded numbers are found. The remaining static parts of the string are a space between the two numbers (`" "`), and the suffix (`"px Comic-Sans"`). The result of the interpolator at *t* = .5 is `"400 24px Comic-Sans"`.

<a name="interpolateArray" href="#interpolateArray">#</a> <b>interpolateArray</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two arrays *a* and *b*. Internally, an array template is created that is the same length in *b*. For each element in *b*, if there exists a corresponding element in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such element, the static value from *b* is used in the template. Then, for the given parameter *t*, the template’s embedded interpolators are evaluated. The updated array template is then returned.

For example, if *a* is the array `[0, 1]` and *b* is the array `[1, 10, 100]`, then the result of the interpolator for *t* = .5 is the array `[.5, 5.5, 100]`.

Note: **no defensive copy** of the template array is created; modifications of the returned array may adversely affect subsequent evaluation of the interpolator. No copy is made because interpolators should be fast, as they are part of the inner loop of animation.

<a name="interpolateObject" href="#interpolateObject">#</a> <b>interpolateObject</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two objects *a* and *b*. Internally, an object template is created that has the same properties as *b*. For each property in *b*, if there exists a corresponding property in *a*, a generic interpolator is created for the two elements using [interpolate](#interpolate). If there is no such property, the static value from *b* is used in the template. Then, for the given parameter *t*, the template's embedded interpolators are evaluated and the updated object template is then returned.

For example, if *a* is the object `{x: 0, y: 1}` and *b* is the object `{x: 1, y: 10, z: 100}`, the result of the interpolator for *t* = .5 is the object `{x: .5, y: 5.5, z: 100}`.

Object interpolation is particularly useful for *dataspace interpolation*, where data is interpolated rather than attribute values. For example, you can interpolate an object which describes an arc in a pie chart, and then use d3.svg.arc to compute the new SVG path data.

Note: **no defensive copy** of the template object is created; modifications of the returned object may adversely affect subsequent evaluation of the interpolator. No copy is made because interpolators should be fast, as they are part of the inner loop of animation.

<a name="interpolateTransform" href="#interpolateTransform">#</a> <b>interpolateTransform</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two 2D affine transforms represented by *a* and *b*. Each transform is decomposed to a standard representation of translate, rotate, *x*-skew and scale; these component transformations are then interpolated. This behavior is standardized by CSS: see [matrix decomposition for animation](http://www.w3.org/TR/css3-2d-transforms/#matrix-decomposition).

<a name="interpolateZoom" href="#interpolateZoom">#</a> <b>interpolateZoom</b>(<i>a</i>, <i>b</i>)

Returns an interpolator between the two views *a* and *b* of a two-dimensional plane, based on [“Smooth and efficient zooming and panning”](https://www.google.com/search?q=Smooth+and+efficient+zooming+and+panning) by Jarke J. van Wijk and Wim A.A. Nuij. Each view is defined as an array of three numbers: *cx*, *cy* and *width*. The first two coordinates *cx*, *cy* represent the center of the viewport; the last coordinate *width* represents the size of the viewport.

The returned interpolator exposes a *duration* property which encodes the recommended transition duration in milliseconds. This duration is based on the path length of the curved trajectory through *x,y* space. If you want to a slower or faster transition, multiply this by an arbitrary scale factor (<i>V</i> as described in the original paper).

<a name="interpolators" href="#interpolators">#</a> <b>interpolators</b>

The array of built-in interpolator factories, as used by [interpolate](#interpolate). Additional interpolator factories may be pushed onto the end of this array. Each factory should return an interpolator if it supports interpolating the two specified input values; otherwise, the factory should return a falsey value and other interpolators will be tried.

For example, to register a custom interpolator that formats dollars and cents, you might say:

```js
interpolators.push(function(a, b) {
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

Subsequently, `interpolate("$20", "$10")(1/3)` returns `$16.67`.
