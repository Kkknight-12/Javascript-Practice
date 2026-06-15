# Array.isArray()

## What Problem Does It Solve?

Sometimes a value looks like an array, but it may actually be something else.

Examples:

- a real array: `[1, 2, 3]`
- a string that looks like an array: `'[]'`
- an object with numeric keys: `{ 0: 'a', length: 1 }`
- a typed array: `new Int16Array([15, 33])`
- an array created in another JavaScript realm

`Array.isArray()` gives us a reliable way to ask:

```text
Is this value really an Array?
```

## Quick Definition

`Array.isArray()` is a static array method. It checks whether a value is an
actual array.

Because it is static, call it on `Array` itself:

```javascript
Array.isArray(value)
```

Do not call it on an array instance:

```javascript
// value.isArray() // Wrong
```

## Mental Model

```text
Array.isArray(value)
= check the value's real Array brand
= return true or false
```

Simple rule:

```text
Use Array.isArray() when your code needs to know:
"Can I treat this value as a real array?"
```

## Syntax

```javascript
Array.isArray(value)
```

## Parameters

- **value**: the value you want to check

## Return Value

A boolean:

- `true` if the value is an actual array
- `false` if the value is not an array

## Basic Examples

### Real Arrays

```javascript
Array.isArray([1, 2, 3]) // true
Array.isArray([]) // true
Array.isArray(new Array(5)) // true
```

Explanation:

All three values are real arrays. Even `new Array(5)` is an array, although it
contains empty slots.

### Values That Are Not Arrays

```javascript
Array.isArray('[]') // false
Array.isArray({}) // false
Array.isArray(null) // false
Array.isArray(undefined) // false
Array.isArray(17) // false
```

Explanation:

These values are not real arrays. A string like `'[]'` may look like array text,
but it is still just a string.

## Array-Like Object Gotcha

An array-like object can have `length` and numeric keys, but it is still not an
array.

```javascript
const arrayLike = {
  0: 'first',
  1: 'second',
  length: 2,
}

Array.isArray(arrayLike) // false
```

Explanation:

This object can be converted with `Array.from(arrayLike)`, but it is not already
a real array.

## Typed Array Gotcha

Typed arrays are also not normal arrays.

```javascript
Array.isArray(new Int16Array([15, 33])) // false
```

Explanation:

`Int16Array`, `Uint8Array`, and other typed arrays are array-like data
structures, but they are not `Array` instances.

## Why Not Use `instanceof Array`?

For simple local arrays, `instanceof Array` often works:

```javascript
[1, 2, 3] instanceof Array // true
```

But `Array.isArray()` is safer because it checks whether the value is truly an
array, not only whether it matches the current `Array` constructor's prototype
chain.

This matters for arrays created in another JavaScript realm, such as an iframe
in the browser or a separate `vm` context in Node.

```javascript
Array.isArray(crossRealmArray) // true
crossRealmArray instanceof Array // false
```

## Tricky Edge Case

```javascript
Array.isArray(Array.prototype) // true
```

Explanation:

`Array.prototype` is itself an array object. This is uncommon in everyday code,
but it is useful to know when reading MDN or debugging edge cases.

## Important Notes

1. `Array.isArray()` is a static method.
2. It returns only `true` or `false`.
3. It is the preferred way to check whether a value is a real array.
4. It returns `false` for strings, plain objects, `null`, `undefined`, numbers,
   booleans, and typed arrays.
5. It is more reliable than `instanceof Array` across JavaScript realms.

## When To Use It

### Before Using Array Methods

```javascript
function firstItem(value) {
  if (!Array.isArray(value)) {
    return undefined
  }

  return value[0]
}
```

Explanation:

The function safely reads the first item only when the input is a real array.

### Before Normalizing Input

```javascript
function normalizeToArray(value) {
  return Array.isArray(value) ? value : [value]
}

normalizeToArray('admin') // ["admin"]
normalizeToArray(['admin', 'editor']) // ["admin", "editor"]
```

Explanation:

This pattern is useful when a function accepts either one value or many values.

## Common Mistakes

### Mistake 1: Calling It On An Array Instance

```javascript
const list = [1, 2, 3]

// list.isArray() // Wrong
Array.isArray(list) // Correct
```

`Array.isArray()` is static, so call it on `Array`.

### Mistake 2: Thinking Array-Like Means Array

```javascript
const arrayLike = {
  0: 'a',
  length: 1,
}

Array.isArray(arrayLike) // false
Array.from(arrayLike) // ["a"]
```

Array-like means it can behave like an array in some situations. It does not
mean it is already a real array.

### Mistake 3: Treating Typed Arrays As Normal Arrays

```javascript
const numbers = new Int16Array([15, 33])

Array.isArray(numbers) // false
```

Typed arrays have indexed values and `length`, but they are separate built-in
types.

## Runnable Practice File

Run the paired JavaScript file from the repo root:

```bash
node src/array/methods/static/Array.isArray/Array.isArray.js
```

That file contains commented examples, clear terminal labels, and expected
output comments.

## MDN Reference

[Array.isArray() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
