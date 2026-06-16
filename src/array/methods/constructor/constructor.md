# Array Constructor

## What Problem Does It Solve?

The `Array()` constructor creates a new array.

You will see it in code like this:

```javascript
new Array(3)
Array(1, 2, 3)
```

But it has one confusing rule:

```javascript
new Array(3) // length 3 empty array
Array.of(3) // [3]
```

This note explains that rule clearly.

## Quick Definition

`Array()` creates an array object. It can be called with or without `new`.

```javascript
Array()
new Array()
```

Both create a new `Array` instance.

## Mental Model

```text
No arguments?             -> []
One number argument?      -> array length with empty slots
One non-number argument?  -> one element
Multiple arguments?       -> elements
```

## Syntax

```javascript
new Array()
new Array(arrayLength)
new Array(element1)
new Array(element1, element2)

Array()
Array(arrayLength)
Array(element1)
Array(element1, element2)
```

## Parameters

### `arrayLength`

If the only argument is an integer number from `0` to `2^32 - 1`, the
constructor creates an array with that length.

```javascript
new Array(3)
// [ <3 empty items> ]
```

### `element1, element2, ...`

If there is more than one argument, the arguments become array elements.

```javascript
new Array(1, 2, 3)
// [1, 2, 3]
```

If the only argument is not a number, it becomes one element.

```javascript
new Array('3')
// ['3']
```

## Return Value

The constructor returns a new `Array` instance.

```javascript
const values = Array(1, 2)

values instanceof Array
// true
```

## Empty Slots

The most important gotcha is empty slots.

```javascript
const items = new Array(3)

items.length
// 3

items[0]
// undefined

Object.hasOwn(items, 0)
// false
```

Explanation:

Reading `items[0]` gives `undefined`, but the slot does not really exist. It is
an empty slot.

That matters because some array methods skip empty slots.

```javascript
new Array(3).map(() => 'visited')
// [ <3 empty items> ]
```

## Single Number Vs Multiple Numbers

One number means length:

```javascript
new Array(3)
// [ <3 empty items> ]
```

Multiple numbers mean elements:

```javascript
new Array(1, 2, 3)
// [1, 2, 3]
```

Use `Array.of()` if you want one number to become one element:

```javascript
Array.of(3)
// [3]
```

## Invalid Length

The single numeric length must be a valid array length.

```javascript
new Array(3.5)
```

This throws a `RangeError`.

## Important Notes

1. `Array()` and `new Array()` both create arrays.
2. `new Array()` creates an empty array.
3. `new Array(3)` creates length `3` with empty slots.
4. Empty slots are not real `undefined` values.
5. `new Array('3')` creates `['3']`.
6. `new Array(1, 2, 3)` creates `[1, 2, 3]`.
7. Prefer array literals `[]` when you already know the values.
8. Prefer `Array.of(value)` when a single number should be an element.
9. Prefer `Array.from({ length }, mapFn)` when you need calculated values.

## When To Use It

### Rarely: Create Empty Slots By Length

```javascript
const slots = new Array(3)
```

Use this only when you intentionally want empty slots.

### Better: Known Values

```javascript
const values = [1, 2, 3]
```

### Better: One Number As One Element

```javascript
const values = Array.of(3)
```

### Better: Create Calculated Values

```javascript
const range = Array.from({ length: 3 }, (_, index) => index + 1)
// [1, 2, 3]
```

## Common Mistakes

### Mistake 1: Expecting `new Array(3)` To Be `[3]`

```javascript
new Array(3)
// [ <3 empty items> ]
```

Use `Array.of(3)` if you want `[3]`.

### Mistake 2: Thinking Empty Slots Are Normal `undefined`

```javascript
const items = new Array(3)

items[0]
// undefined

Object.hasOwn(items, 0)
// false
```

The value reads as `undefined`, but the index does not exist.

### Mistake 3: Mapping Empty Slots

```javascript
new Array(3).map(() => 'x')
// [ <3 empty items> ]
```

Use `Array.from()` if you want the callback to run for each index:

```javascript
Array.from({ length: 3 }, () => 'x')
// ['x', 'x', 'x']
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/constructor/constructor.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## MDN References

- [Array() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
