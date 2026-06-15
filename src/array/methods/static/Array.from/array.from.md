# Array.from()

## What Problem Does It Solve?

Sometimes we receive a value that is not a real array yet, but we still want to
use array methods like `map`, `filter`, `reduce`, `slice`, or `forEach`.

Examples:

- a string
- a `Set`
- a `Map`
- the `arguments` object
- an object that has `length` and numeric indexes

`Array.from()` converts those values into a real array.

## Quick Definition

`Array.from()` is a static array method. It creates a new array from:

- an iterable value, such as a string, `Set`, or `Map`
- an array-like object, such as `arguments` or an object with `length`

Because it is static, call it on `Array` itself:

```javascript
Array.from(value)
```

Do not call it on an array instance:

```javascript
// value.from() // Wrong
```

## Mental Model

```text
Array.from(value)
= take something that is not a normal array yet
= return a real array
```

Simple rule:

```text
If the value can give items one by one,
or if it has length + numeric indexes,
Array.from() can usually turn it into an array.
```

## Syntax

```javascript
Array.from(items)
Array.from(items, mapFn)
Array.from(items, mapFn, thisArg)
```

## Parameters

- **items**: an iterable or array-like value to convert
- **mapFn**: optional function called for every item before it goes into the new
  array. It receives only `element` and `index`.
- **thisArg**: optional value to use as `this` inside `mapFn`

## Return Value

A new shallow-copied `Array` instance.

Important:

- the outer array is new
- nested objects are still shared by reference
- missing indexes become `undefined`
- `Array.from()` does not create sparse holes

## Input Type 1: Iterable Values

An iterable is a value that can give its items one by one.

Common examples:

- string
- `Set`
- `Map`
- browser `NodeList`

### String

```javascript
Array.from('foo') // ["f", "o", "o"]
```

Explanation:

The string gives one character at a time, so the new array gets each character.

### Set

```javascript
const roles = new Set(['admin', 'editor', 'admin'])

Array.from(roles) // ["admin", "editor"]
```

Explanation:

The duplicate `'admin'` is already removed by `Set`. `Array.from()` only
converts the final `Set` values into an array.

### Map

```javascript
const scores = new Map([
  ['a', 10],
  ['b', 20],
])

Array.from(scores) // [["a", 10], ["b", 20]]
```

Explanation:

A `Map` gives `[key, value]` pairs when it is converted directly.

## Input Type 2: Array-Like Values

An array-like object has a `length` property and numeric indexes.

```javascript
const arrayLike = {
  0: 'first',
  1: 'second',
  length: 2,
}

Array.from(arrayLike) // ["first", "second"]
```

Explanation:

`Array.from()` reads indexes from `0` to `length - 1`.

The `arguments` object is also array-like:

```javascript
function collect() {
  return Array.from(arguments)
}

collect('a', 'b', 'c') // ["a", "b", "c"]
```

Explanation:

`arguments` has values and `length`, but it is not a real array. `Array.from()`
makes it easier to use normal array methods on it.

## Missing Indexes Become `undefined`

```javascript
const onlyLength = { length: 3 }

Array.from(onlyLength) // [undefined, undefined, undefined]
```

Explanation:

The object says it has `3` positions, but it has no real values at index `0`,
`1`, or `2`. So the new array gets `undefined` at those positions.

## Using `mapFn`

`Array.from()` can convert and transform in one step.

```javascript
Array.from([1, 2, 3], (number) => number * 2) // [2, 4, 6]
```

This is similar to:

```javascript
Array.from([1, 2, 3]).map((number) => number * 2)
```

But there are two useful differences:

1. `Array.from(value, mapFn)` does not create an extra intermediate array.
2. `mapFn` receives only `element` and `index`, not the full array.

Example with index:

```javascript
Array.from(['a', 'b'], (letter, index) => `${index}:${letter}`)
// ["0:a", "1:b"]
```

### Using `thisArg`

`thisArg` is the value used as `this` inside `mapFn`.

```javascript
const multiplier = { factor: 3 }

Array.from(
  [1, 2, 3],
  function (number) {
    return number * this.factor
  },
  multiplier,
)
// [3, 6, 9]
```

Use a normal `function` when you want `thisArg`. Arrow functions do not get
their own `this`.

## Creating Sequences

`Array.from({ length: n })` is useful when you want to create a sequence.

```javascript
Array.from({ length: 5 }, (_, index) => index)
// [0, 1, 2, 3, 4]

Array.from({ length: 5 }, (_, index) => index + 1)
// [1, 2, 3, 4, 5]
```

In this pattern:

- `length` decides how many items to create
- `_` is `undefined` because the object has no real indexed values
- `index` is the current position

## Plain Object Gotcha

`Array.from()` does not convert normal object values automatically.

```javascript
const user = {
  name: 'Amit',
  role: 'admin',
}

Array.from(user) // []
```

Why?

The object is not iterable, and it does not have a useful `length`.

Use object methods instead:

```javascript
Object.keys(user) // ["name", "role"]
Object.values(user) // ["Amit", "admin"]
Object.entries(user) // [["name", "Amit"], ["role", "admin"]]
```

## Important Notes

1. `Array.from()` returns a new array.
2. It is a shallow copy. Nested objects are still shared by reference.
3. For array-like objects, `length` is the important property.
4. Missing numeric indexes become `undefined`.
5. Plain objects should usually use `Object.keys()`, `Object.values()`, or
   `Object.entries()`.
6. It is useful when you need real array methods like `map`, `filter`, or
   `reduce` on a value that is not a normal array yet.

## When To Use It

### Convert To A Real Array

```javascript
Array.from('hello')
Array.from(new Set(['a', 'b']))
```

### Generate A Range

```javascript
Array.from({ length: 4 }, (_, index) => index + 1)
// [1, 2, 3, 4]
```

### Clone A Simple Array

```javascript
const original = [1, 2, 3]
const clone = Array.from(original)

clone === original // false
```

## Common Mistakes

### Mistake 1: Calling It On An Instance

```javascript
const letters = ['a', 'b']

// letters.from() // Wrong
Array.from(letters) // Correct
```

`Array.from()` is static, so call it on `Array`.

### Mistake 2: Expecting Deep Copy

```javascript
const original = [{ name: 'Amit' }]
const clone = Array.from(original)

clone[0] === original[0] // true
```

Only the outer array is new. The nested object is still the same object.

### Mistake 3: Expecting Plain Object Values

```javascript
Array.from({ name: 'Amit' }) // []
Object.values({ name: 'Amit' }) // ["Amit"]
```

## Runnable Practice File

Run the paired JavaScript file from the repo root:

```bash
node src/array/methods/static/Array.from/array.from.js
```

That file contains commented examples, clear terminal labels, and expected
output comments.

## MDN Reference

[Array.from() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
