# Honeycomb

Another hex grid library made in JavaScript, heavily inspired by [Red Blob Games'](http://www.redblobgames.com/grids/hexagons/) code samples.

All existing JS hex grid libraries I could find are coupled with some form of view. Most often a `<canvas>` element or the browser DOM. I want more separation of concerns...and a new hobby project to spend countless hours on.

## Installation

```bash
npm i honeycomb-grid
```

## Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Grid

Factory function for creating a grid (singular). It currently only supports a single grid, because it sets size, orientation and origin for **all** hexes. Several "shape" methods are exposed that return an array of hexes in a certain shape.

A grid is _viewless_, i.e.: it's an abstract grid with undefined dimensions. If you want to render a tangible grid, use a View factory (e.g. the [DOM view](#viewsdom)) by passing it a grid instance.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object containing a `hex` property
    -   `options.hex` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object that can contain a size, orientation and origin.
        This will be refactored 😬
-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$0.hex`  

**Examples**

```javascript
import { Grid, Point } from 'Honeycomb'

Grid({
    hex: {
        size: 10,                // passed to Hex#size
        orientation: 'pointy',   // passed to Hex#orientation
        origin: Point(0, 0)      // passed to Hex#origin
    }
})
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object with helper methods like: translating 2-dimensional points to hex coordinates and generating arrays of hexes in a certain shape.

### Grid#pointToHex

Translates a point to a hex coordinate.

**Parameters**

-   `point` **[Point](#point)** The point to translate from.

Returns **[Hex](#hex)** The hex to translate to.

### Grid#hexToPoint

Translates a hex coordinate to a point.

**Parameters**

-   `hex` **[Hex](#hex)** The hex to translate from.

Returns **[Point](#point)** The point to translate to.

### Grid#colSize

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The width of a (vertical) column of hexes in the grid.

### Grid#rowSize

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The height of a (horizontal) row of hexes in the grid.

### Grid#parallelogram

Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram).

**Parameters**

-   `widthOrOptions` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The width (in hexes) or an options object.
-   `height` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The height (in hexes).
-   `start` **[Hex](#hex)?** The origin hex.
-   `direction` **(`"SE"` \| `"SW"` \| `"N"`)?** The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. (optional, default `SE`)

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes that - when rendered - form a parallelogram shape.

### Grid#triangle

Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle).

**Parameters**

-   `sideOrOptions` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The side length (in hexes) or an options object.
-   `start` **[Hex](#hex)?** The origin hex.
-   `direction` **(`"down"` \| `"up"`)?** The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up/down (with pointy hexes) or right/left (with flat hexes). (optional, default `down`)

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes that - when rendered - form a triangle shape.

### Grid#hexagon

Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).

**Parameters**

-   `radiusOrOptions` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The radius (in hexes) or an options object.
-   `center` **[Hex](#hex)?** The center hex.

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes that - when rendered - form a hexagon shape (very meta 😎).

### Grid#rectangle

Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle).

**Parameters**

-   `widthOrOptions` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** The width (in hexes) or an options object.
-   `height` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The height (in hexes).
-   `start` **[Hex](#hex)?** The origin hex.
-   `direction` **(`"E"` \| `"NW"` \| `"SW"` \| `"SE"` \| `"NE"` \| `"W"`)?** The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes. The default direction for pointy hexes is 'E' and 'SE' for flat hexes. (optional, default `E/SE`)

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Array of hexes that - when rendered - form a rectengular shape.

### Hex

Factory function for creating hexes.

Coordinates not passed to the factory are inferred using the other coordinates:

-   When two coordinates are passed, the third coordinate is set to the result of [Hex.thirdCoordinate(firstCoordinate, secondCoordinate)](#hexthirdcoordinate).
-   When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of [Hex.thirdCoordinate(firstCoordinate, secondCoordinate)](#hexthirdcoordinate).
-   When nothing or a falsy value is passed, all coordinates are set to `0`.

**Parameters**

-   `coordinates` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))?** The x coordinate or an object containing any of the x, y and z coordinates. (optional, default `0`)
    -   `coordinates.x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The x coordinate. (optional, default `0`)
    -   `coordinates.y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate. (optional, default `0`)
    -   `coordinates.z` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The z coordinate. (optional, default `0`)
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate. (optional, default `0`)
-   `z` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The z coordinate. (optional, default `0`)

**Examples**

```javascript
Hex()            // returns hex( x: 0, y: 0, z: 0 )
Hex(1)           // returns hex( x: 1, y: 1, z: -2 )
Hex(1, 2)        // returns hex( x: 1, y: 2, z: -3 )
Hex(1, 2, -3)    // returns hex( x: 1, y: 2, z: -3 )
Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error

Hex({ x: 3 })    // returns hex( x: 3, y: 3, z: -3 )
Hex({ y: 3 })    // returns hex( x: 3, y: 3, z: -6 )
Hex({ z: 3 })    // returns hex( x: 3, y: -6, z: 3 )
```

Returns **[Hex](#hex)** A hex object. It always contains all three coordinates (`x`, `y` and `z`).

### Hex.thirdCoordinate

Calculates the third coordinate from the other two. The sum of all three coordinates should always be 0.

**Parameters**

-   `firstCoordinate` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The first other coordinate.
-   `secondCoordinate` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The second other coordinate.

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The third coordinate.

### Hex.isValidSize

Determines if the passed size is valid. Should be a positive `Number`.

**Parameters**

-   `size` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The size to validate.

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Wheter the size is valid.

### Hex#hexesBetween

Returns the hexes in a straight line between itself and the given hex, inclusive.

**Parameters**

-   `hex` **[Hex](#hex)** The hex to return the hexes in between to.

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** Hexes between the current and the passed hex.

### Hex#orientation

When passed no (or falsy) parameters, it returns the current hex's orientation.
When passed an orientation, it sets the orientation of all hexes to that value.

**Parameters**

-   `newOrientation` **(`"flat"` \| `"pointy"`)?** Sets the orientation to this value.

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The (new) current orientation.

### Hex#isPointy

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a pointy orientation.

### Hex#isFlat

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether hexes have a flat orientation.

### Hex#size

When passed no (or falsy) parameters, it returns the current hex's size.
When passed a size, it sets the size of all hexes to that value.
Logs a warning when the size is invalid.

**Parameters**

-   `newSize` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Sets the size to this value.

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (new) current size.

### Hex#oppositeCornerDistance

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite corners of a hex.

### Hex#oppositeSideDistance

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The distance between opposite sides of a hex.

### Hex#element

When passed no (or falsy) parameters, it returns the result of the element interpolator called with the current hex.
When passed a template string, it sets the element interpolator to a function that returns this string.
When passed an element interpolator, it sets the element interpolator to this value.

**Parameters**

-   `stringOrInterpolator` **([String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function))?** Sets the element interpolator to this value.

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** The interpolated element.

### Hex#width

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (horizontal) width of any hex.

### Hex#height

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The (vertical) height of any hex.

### Hex#center

Returns **[Point](#point)** The relative center of any hex.

### Hex#origin

When passed no (or falsy) parameters, it returns the current hex's origin.
When passed an origin, it sets the origin of all hexes to that value.

**Parameters**

-   `newOrigin` **[Point](#point)?** Sets the origin to this value.

Returns **[Point](#point)** The (new) current origin or the hex's center if not yet set.

### Hex#add

**Parameters**

-   `hex` **[Hex](#hex)** The hex to add to the current hex.

Returns **[Hex](#hex)** The sum of the passed hex's coordinates to the current hex's.

### Hex#subtract

**Parameters**

-   `hex` **[Hex](#hex)** The hex to subtract from the current hex.

Returns **[Hex](#hex)** The difference between the passed hex's coordinates and the current hex's.

### Hex#neighbor

Returns the neighboring hex in the given direction.

**Parameters**

-   `direction` **(`0` \| `1` \| `2` \| `3` \| `4` \| `5`)?** Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` is 60° clockwise, and so forth. (optional, default `0`)
-   `diagonal` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Whether to look for a neighbor perpendicular to the hex's corner instead of its side. (optional, default `false`)

Returns **[Hex](#hex)** The neighboring hex.

### Hex#distance

Returns the amount of hexes between the current and the given hex.

**Parameters**

-   `hex` **[Hex](#hex)** The hex to return the distance to.

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** The amount of hexes between the current and the one passed.

### Hex#round

Rounds floating point hex coordinates to their nearest integer hex coordinates.

Returns **[Hex](#hex)** A new hex with rounded coordinates.

### Hex#lerp

Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).

**Parameters**

-   `hex` **[Hex](#hex)** The other hex to calculate the interpolation with.
-   `t` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** A "parameter" between 0 and 1.

Returns **[Hex](#hex)** A new hex (with possibly fractional coordinates).

### Hex#nudge

Returns a hex with a tiny offset to the current hex. Useful for interpolating in a consistent direction.

Returns **[Hex](#hex)** A new hex with a minute offset.

### Hex#toPoint

Converts the current hex to an (absolute) 2-dimensional [point](#point). Uses the hex's origin.

Returns **[Point](#point)** The 2D point the hex corresponds to.

### Hex#fromPoint

Converts the passed 2-dimensional [point](#point) to a hex.

**Parameters**

-   `point` **[Point](#point)** The point to convert from.

Returns **[Hex](#hex)** The hex (with rounded coordinates) the passed 2D point corresponds to.

### Point

Factory function for creating 2-dimensional points.

**Parameters**

-   `coordinatesOrX` **([Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))?** The x coordinate or an array or object of x and/or y coordinates. (optional, default `0`)
    -   `coordinatesOrX.x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The x coordinate. (optional, default `0`)
    -   `coordinatesOrX.y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate. (optional, default `0`)
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** The y coordinate. (optional, default `0`)

Returns **[Point](#point)** A point object.

### Point#add

**Parameters**

-   `point` **[Point](#point)** The point to add to the current point.

Returns **[Point](#point)** The sum of the passed point's coordinates to the current point's.

### Point#subtract

**Parameters**

-   `point` **[Point](#point)** The point to subtract from the current point.

Returns **[Point](#point)** The difference between the passed point's coordinates and the current point's.

### Point#multiply

**Parameters**

-   `point` **[Point](#point)** The point to multiply with the current point.

Returns **[Point](#point)** The multiplication of the passed point's coordinates and the current point's.

### Point#divide

**Parameters**

-   `point` **[Point](#point)** The point where the current point is divided by.

Returns **[Point](#point)** The division of the current point's coordinates and the passed point's.

### Point#invert

Returns **[Point](#point)** The inversion of the current point.

### Views.DOM

Factory function for creating a DOM view object. This object can be used to render an array of hexes it's passed or a grid instance. If a grid instance is passed, its [colSize](#gridcolsize) and [rowSize](#gridrowsize) is used to calculate how many hexes are to be shown in a rectangular shape.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object.
    -   `options.container` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** A DOM node to render hexes in.
    -   `options.hex` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An options object containing a `hex` property with an `element` property that get's passed to [Hex#element](#hexelement).
    -   `options.origin` **[Point](#point)** A point where the first hex (i.e. `Hex(0, 0, 0)`) can be rendered.
-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `$0.container`  
    -   `$0.hex`  
    -   `$0.origin`   (optional, default `Point(0, 0)`)

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** An object with helper methods like to render a view for a hex grid using the DOM.

### Views.DOM#render

Renders the passed [grid](#grid) instance in the container. The container is completely covered with hexes.

**Parameters**

-   `grid` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** A grid instance (from the [Grid](#grid) factory).

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The DOM View object, for chaining.

### Views.DOM#renderHexes

Renders the passed hexes in the container.

**Parameters**

-   `hexes` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Hex](#hex)>** An array of hexes to render.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** The DOM View object, for chaining.

## Backlog

### Bugs

5.  Shape directions only make sense for pointy hexes. Flat hexes are rotated clockwise, rotating their directions clockwise as well. Might be fixed by refactoring #2?
6.  Remove tiny gaps between SVG's (at least when size is 50)

### Features

5.  Add a `Views.Canvas`.
6.  Add a `Views.SVG`.
7.  Add a `Views.react`.
8.  Add a `Views.D3`?
9.  Optimize DOM node rendering: when more than ~200 hexes are rendered it takes way too long.
10. Maybe add instance methods for `Grid` and `Views.DOM` to get/set options. Then it's optional to pass the options to the `Grid` and `Views.DOM` factories and makes it possible to get/set those options later.
11. Make it an option to filter overlapping hexes when multiple shapes are rendered.
12. Add possibility to [stretch hexes](http://www.redblobgames.com/grids/hexagons/implementation.html#layout-test-size-tall); they needn't be regularly shaped.
13. Shiny github.io pages 😎

### Refactorings

1.  Moar examples!
2.  Think some more about the best way to generate hexes and grids. It should be possible to have multiple grids, each with different hex sizes/origins/orientations.
3.  Put tests in same directory as the code they're testing.
4.  Maybe create a 'base hex' prototype/factory which can be mixed in a 'pointy hex' and 'flat hex' factory. A lot of calculations differ based on the hex orientation.
