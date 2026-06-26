# Array.prototype.fill()

## What Problem Does It Solve?

`fill()` writes the same value into a range of array indexes.

```javascript
const numbers = [1, 2, 3, 4]

numbers.fill(0)
// [0, 0, 0, 0]
```

It is useful when you want to initialize or overwrite many positions with one
static value.

## Quick Definition

`fill()` is an Array instance method.

It writes one value into selected indexes of the original array.

It does not create a new array.

It returns the same array after changing it.

It does not change the array length.

## Mental Model

Think:

```text
Take this value.
Walk through the selected indexes.
Write the same value into each selected slot.
Return the same array.
```

Short version:

```text
fill() mutates a range with one static value.
```

## Basic Example

```javascript
const numbers = [1, 2, 3, 4]

numbers.fill(0)
// [0, 0, 0, 0]
```

The original array changed:

```javascript
numbers
// [0, 0, 0, 0]
```

## Syntax

```javascript
fill(value)
fill(value, start)
fill(value, start, end)
```

## Parameters

### `value`

The value that should be written into the selected indexes.

```javascript
['a', 'b', 'c'].fill('x')
// ['x', 'x', 'x']
```

If the value is an object or array, each filled slot receives the same
reference.

### `start`

The first index to fill.

`start` is included.

```javascript
const scores = [10, 20, 30, 40, 50]

scores.fill(100, 2)
// [10, 20, 100, 100, 100]
```

If `start` is omitted, filling starts at index `0`.

If `start` is negative, it counts backward from the end of the array.

### `end`

The index where filling should stop.

`end` is excluded.

```javascript
const seats = ['open', 'open', 'open', 'open', 'open']

seats.fill('booked', 1, 4)
// ['open', 'booked', 'booked', 'booked', 'open']
```

Index `1`, `2`, and `3` changed.

Index `4` did not change because `end` is not included.

If `end` is omitted, filling continues to the end of the array.

If `end` is negative, it counts backward from the end of the array.

## Return Value

`fill()` returns the same array reference after changing it.

```javascript
const letters = ['a', 'b', 'c']
const result = letters.fill('x')

result
// ['x', 'x', 'x']

letters
// ['x', 'x', 'x']

result === letters
// true
```

This is different from non-mutating methods like `concat()` or `slice()`.

## Negative Indexes

Negative indexes count backward from the end of the array.

```javascript
const letters = ['a', 'b', 'c', 'd', 'e']

letters.fill('z', -3, -1)
// ['a', 'b', 'z', 'z', 'e']
```

Explanation:

```text
-3 points to index 2
-1 points to index 4
fill from index 2 up to, but not including, index 4
```

## No Change Cases

If `start` is at or beyond the array length, nothing changes.

```javascript
[1, 2, 3].fill(9, 5)
// [1, 2, 3]
```

If `end` is before or equal to `start`, nothing changes.

```javascript
[1, 2, 3].fill(9, 2, 2)
// [1, 2, 3]
```

There is no valid range to fill.

## Filling An Empty Array

`fill()` cannot create indexes when the array length is `0`.

```javascript
const values = []

values.fill('x')
// []
```

Why?

```text
The array has length 0.
There are no indexes to write into.
```

Create the length first:

```javascript
Array(4).fill('x')
// ['x', 'x', 'x', 'x']
```

## Sparse Arrays

`fill()` writes into empty slots too.

```javascript
const values = [1, , 3, , 5]

values.fill(0, 1, 4)
// [1, 0, 0, 0, 5]
```

Before `fill()`, index `1` and index `3` were empty slots.

After `fill()`, they contain real `0` values.

## Object Reference Gotcha

When `value` is an object, every filled slot receives the same object reference.

```javascript
const users = Array(3).fill({ active: false })

users[0].active = true

users
// [{ active: true }, { active: true }, { active: true }]
```

Why did all objects change?

Because there is only one object.

`fill()` copied the reference to that same object into every slot.

You can prove it:

```javascript
users[0] === users[1]
// true
```

## Safer Object Creation

Use `Array.from()` with a mapping function when each slot needs its own object.

```javascript
const users = Array.from({ length: 3 }, () => ({ active: false }))

users[0].active = true

users
// [{ active: true }, { active: false }, { active: false }]
```

Now each slot has a different object.

```javascript
users[0] === users[1]
// false
```

## Matrix Gotcha

This is a common mistake:

```javascript
const matrix = Array(3).fill(Array(2).fill(0))

matrix[0][0] = 1

matrix
// [[1, 0], [1, 0], [1, 0]]
```

All rows changed because every row points to the same inner array.

Create each row separately:

```javascript
const matrix = Array.from({ length: 3 }, () => Array(2).fill(0))

matrix[0][0] = 1

matrix
// [[1, 0], [0, 0], [0, 0]]
```

## Generic Behavior

`fill()` is generic.

That means it can be called on array-like objects.

It needs:

```text
length
integer-like keys: 0, 1, 2...
```

Example:

```javascript
const arrayLike = {
  length: 3,
}

Array.prototype.fill.call(arrayLike, 'item')
// { '0': 'item', '1': 'item', '2': 'item', length: 3 }
```

In everyday code, you will usually call `fill()` on arrays.

`fill()` is not a good fit for strings even though strings are array-like,
because strings are immutable.

## When To Use It

Use `fill()` when:

1. You already have an array with a known length.
2. You want to put the same primitive value into many positions.
3. You want to reset a range of indexes in an existing array.
4. You understand that object and array values will be shared by reference.

For separate objects, separate rows, or computed values, prefer `Array.from()`
with a mapping function.

## Common Mistakes

### Mistake 1: Expecting A New Array

```javascript
const numbers = [1, 2, 3]
const result = numbers.fill(0)

result === numbers
// true
```

`fill()` mutates and returns the same array.

### Mistake 2: Thinking `end` Is Included

```javascript
[1, 2, 3, 4].fill(9, 1, 3)
// [1, 9, 9, 4]
```

Index `3` did not change because `end` is excluded.

### Mistake 3: Filling An Empty Array

```javascript
[].fill('x')
// []
```

The array has no indexes. Use `Array(length).fill(value)` when you want a fixed
length.

### Mistake 4: Filling With Objects

```javascript
Array(3).fill({})
```

This creates one object and puts the same reference in every slot.

Use `Array.from({ length: 3 }, () => ({}))` when each slot needs a separate
object.

### Mistake 5: Building A Matrix With Shared Rows

```javascript
Array(3).fill(Array(2).fill(0))
```

Each row points to the same inner array.

Use:

```javascript
Array.from({ length: 3 }, () => Array(2).fill(0))
```

## Important Notes

1. `fill()` is an Array instance method.
2. It mutates the original array.
3. It returns the modified same array.
4. It does not change the array length.
5. `start` is included.
6. `end` is excluded.
7. Negative indexes count backward from the end.
8. If the selected range is empty, nothing changes.
9. `fill()` cannot add length to an empty array.
10. `fill()` fills empty slots in sparse arrays.
11. Object values are shared by reference.
12. Use `Array.from()` when each slot needs a fresh object or fresh row.
13. `fill()` is generic and can work on array-like objects.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/fill/fill.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## References

- [MDN: Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [ECMAScript Specification: Array.prototype.fill](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.fill)
