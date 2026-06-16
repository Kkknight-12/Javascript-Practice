# Array Creation Shortcuts

## What Problem Does It Solve?

JavaScript gives us many ways to create arrays. They look similar, but they do
not always behave the same.

Examples:

- `[]`
- `Array()`
- `new Array()`
- `Array.of()`
- `[...value]`
- `Array.from()`
- `fill()`

This note explains which shortcut to use and what mistakes to avoid.

## Quick Definition

Array creation shortcuts are different patterns for creating a new array.

The most common options are:

```javascript
const knownValues = ['admin', 'editor']
const emptySlots = new Array(3)
const oneElement = Array.of(3)
const range = Array.from({ length: 3 }, (_, index) => index)
```

## Mental Model

```text
Known values?        -> use []
Need one value?      -> use Array.of(value)
Need indexes?        -> use Array.from({ length }, mapFn)
Need same primitive? -> use fill()
Need objects?        -> avoid fill(object); create a new object per index
```

## Array Literal `[]`

Use an array literal when you already know the values.

```javascript
const roles = ['admin', 'editor']
```

Explanation:

This is the clearest everyday way to create an array.

## `Array()` / `new Array()`

`Array()` can be called with or without `new`. Both create an array.

```javascript
Array(1, 2, 3) // [1, 2, 3]
new Array(1, 2, 3) // [1, 2, 3]
```

But one number argument has special behavior:

```javascript
new Array(3) // [ <3 empty items> ]
```

Explanation:

`new Array(3)` creates an array with length `3`, but those positions are empty
slots. They are not real `undefined` values.

```javascript
const emptySlots = new Array(3)

emptySlots.length // 3
Object.hasOwn(emptySlots, 0) // false
```

If the single argument is not a number, it becomes an element:

```javascript
new Array('3') // ["3"]
```

## `Array.of()`

`Array.of()` always treats arguments as elements.

```javascript
Array.of(3) // [3]
Array.of(1, 2, 3) // [1, 2, 3]
```

Explanation:

Use `Array.of()` when you want one number to become one array element. It avoids
the `Array(3)` empty-slot surprise.

## Spread Syntax

Spreading can copy iterable values into a new array.

```javascript
const copy = [...['a', 'b']]
// ["a", "b"]
```

Spreading an empty-slot array creates actual `undefined` values:

```javascript
const values = [...new Array(3)]

values // [undefined, undefined, undefined]
Object.hasOwn(values, 0) // true
```

Explanation:

`new Array(3)` has empty slots. `[...new Array(3)]` creates a new array where
those positions become real `undefined` values.

## `Array.from()`

`Array.from({ length: n }, mapFn)` is useful when you want to create values from
indexes.

```javascript
Array.from({ length: 5 }, (_, index) => index)
// [0, 1, 2, 3, 4]

Array.from({ length: 5 }, (_, index) => index + 1)
// [1, 2, 3, 4, 5]
```

Explanation:

Use this pattern when the index matters.

## `fill()` With Primitive Values

`fill()` is useful when every position should receive the same primitive value.

```javascript
const zeros = new Array(4).fill(0)
// [0, 0, 0, 0]
```

Changing one number does not change the others:

```javascript
zeros[0] = 9
// [9, 0, 0, 0]
```

## `fill()` With Objects Gotcha

Do not use `fill(object)` when every position needs a separate object.

```javascript
const items = new Array(3).fill({ status: 'new' })

items[0].status = 'changed'
```

Now every position sees the changed object:

```javascript
[
  { status: 'changed' },
  { status: 'changed' },
  { status: 'changed' },
]
```

Why?

`fill()` put the same object reference in every position.

Use `Array.from()` instead when you need separate objects:

```javascript
const items = Array.from({ length: 3 }, () => ({ status: 'new' }))
```

Each call to the function creates a fresh object.

## Important Notes

1. `[]` is best when you already know the values.
2. `new Array(number)` creates empty slots.
3. `Array.of(number)` creates an array containing that number.
4. Spread can turn empty slots into actual `undefined` values.
5. `Array.from({ length }, mapFn)` is useful for ranges and repeated
   calculated values.
6. `fill(primitive)` is fine for values like numbers, strings, booleans, `null`,
   or `undefined`.
7. `fill(object)` reuses the same object reference.

## When To Use It

### Known Values

```javascript
const colors = ['red', 'green', 'blue']
```

### Single Number As A Value

```javascript
const numbers = Array.of(5)
// [5]
```

### Range

```javascript
const range = Array.from({ length: 4 }, (_, index) => index + 1)
// [1, 2, 3, 4]
```

### Same Primitive Value

```javascript
const flags = new Array(3).fill(false)
// [false, false, false]
```

### Separate Objects

```javascript
const rows = Array.from({ length: 3 }, () => ({ selected: false }))
```

## Common Mistakes

### Mistake 1: Expecting `Array(3)` To Be `[3]`

```javascript
Array(3) // [ <3 empty items> ]
Array.of(3) // [3]
```

### Mistake 2: Confusing Empty Slots With `undefined`

```javascript
const emptySlots = new Array(3)

Object.hasOwn(emptySlots, 0) // false
```

The array has length, but index `0` does not really exist yet.

### Mistake 3: Using `fill({})` For Separate Objects

```javascript
const items = new Array(3).fill({})

items[0] === items[1] // true
```

All positions point to the same object.

## Runnable Practice File

Run the paired JavaScript file from the repo root:

```bash
node src/array/creation/create-array-shortcuts.js
```

That file contains commented examples, clear terminal labels, and expected
output comments.

## MDN References

- [Array() constructor - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
- [Array.of() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of)
- [Array.from() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
- [Array.prototype.fill() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [Spread syntax - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
