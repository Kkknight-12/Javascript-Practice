# Array.prototype.slice()

## What Problem Does It Solve?

`slice()` copies part of an array into a new array.

```javascript
const letters = ['a', 'b', 'c', 'd', 'e']

letters.slice(1, 4)
// [ 'b', 'c', 'd' ]
```

It is useful when the question is:

```text
How do I take a portion of this array without changing the original?
```

Important:

```text
slice() does not mutate the original array.
```

## Quick Definition

`slice()` is an Array instance method.

It returns a shallow copy of a selected part of the array.

It does not change the original array.

## Mental Model

Think:

```text
start index -> copy values -> stop before end index -> return new array
```

Short version:

```text
slice() copies a window from an array.
```

## Syntax

```javascript
array.slice()
array.slice(start)
array.slice(start, end)
```

## Parameters

`start` is optional.

It is the index where copying begins.

If `start` is omitted, copying starts at index `0`.

```javascript
['a', 'b', 'c'].slice()
// [ 'a', 'b', 'c' ]
```

`end` is optional.

It is the index where copying stops.

The value at `end` is not included.

```javascript
['a', 'b', 'c', 'd'].slice(1, 3)
// [ 'b', 'c' ]
```

If `end` is omitted, copying continues to the end of the array.

```javascript
['a', 'b', 'c', 'd'].slice(2)
// [ 'c', 'd' ]
```

## Return Value

`slice()` returns a new array.

```javascript
const numbers = [10, 20, 30]
const result = numbers.slice(1)

result
// [20, 30]

numbers
// [10, 20, 30]

result === numbers
// false
```

The returned array is shallow.

That means nested objects and nested arrays are still shared by reference.

## Basic Example

```javascript
const letters = ['a', 'b', 'c', 'd', 'e']

const middleLetters = letters.slice(1, 4)
```

Result:

```javascript
middleLetters
// [ 'b', 'c', 'd' ]

letters
// [ 'a', 'b', 'c', 'd', 'e' ]
```

The original array stays unchanged.

## End Index Is Excluded

The second argument is a stop point.

It is not part of the result.

```javascript
const colors = ['red', 'green', 'blue', 'yellow']

colors.slice(0, 2)
// [ 'red', 'green' ]

colors[2]
// 'blue'
```

Index `2` is where copying stops, so `'blue'` is not copied.

## Start Only

When you pass only `start`, `slice()` copies from that index to the end.

```javascript
const numbers = [10, 20, 30, 40, 50]

numbers.slice(2)
// [30, 40, 50]
```

## No Arguments Means Shallow Copy

Calling `slice()` with no arguments copies the whole array.

```javascript
const scores = [80, 90, 100]
const copy = scores.slice()

copy
// [80, 90, 100]

copy === scores
// false
```

The outer array is new.

The values inside are copied shallowly.

## Negative Indexes

Negative indexes count from the end of the array.

```javascript
const fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']

fruits.slice(-1)
// [ 'Mango' ]

fruits.slice(-2)
// [ 'Apple', 'Mango' ]
```

You can also use a negative `end`.

```javascript
fruits.slice(1, -1)
// [ 'Orange', 'Lemon', 'Apple' ]
```

Here, `-1` means "stop before the last item."

## Removing Items Without Mutating

`slice()` does not remove values by itself.

But you can build a new array that skips one item by copying the parts around it.

```javascript
const menu = ['Tea', 'Coffee', 'Juice', 'Water']
const indexToSkip = 2

const menuWithoutJuice = menu
  .slice(0, indexToSkip)
  .concat(menu.slice(indexToSkip + 1))
```

Result:

```javascript
menuWithoutJuice
// [ 'Tea', 'Coffee', 'Water' ]

menu
// [ 'Tea', 'Coffee', 'Juice', 'Water' ]
```

Use this pattern when you want an immutable update.

If you want to mutate the original array, compare this with `splice()`.

## Shallow Copy Warning

`slice()` creates a new outer array.

It does not deep clone nested objects.

```javascript
const tasks = [
  { title: 'learn slice', done: false },
  { title: 'practice arrays', done: false },
]

const copiedTasks = tasks.slice()

copiedTasks[0].done = true
```

The copied array is new:

```javascript
copiedTasks === tasks
// false
```

But the object inside is shared:

```javascript
copiedTasks[0] === tasks[0]
// true

tasks[0].done
// true
```

## Out-Of-Range Indexes

If `start` is past the end, the result is empty.

```javascript
['a', 'b', 'c'].slice(10)
// []
```

If `end` comes before `start`, the result is empty.

```javascript
['a', 'b', 'c'].slice(2, 1)
// []
```

If a negative `start` goes before the beginning, copying starts at index `0`.

```javascript
['a', 'b', 'c'].slice(-10, 2)
// [ 'a', 'b' ]
```

## Fractional Indexes

Fractional indexes are converted to integers.

```javascript
const values = ['zero', 'one', 'two', 'three']

values.slice(1.9, 3.1)
// [ 'one', 'two' ]
```

In normal code, prefer whole-number indexes because they communicate intent more
clearly.

## Sparse Array Behavior

`slice()` preserves empty slots.

```javascript
const values = ['first', , 'third', 'fourth']

const copy = values.slice(0, 3)
// [ 'first', empty, 'third' ]
```

The empty slot did not become a real `undefined` value.

```javascript
Object.hasOwn(copy, 1)
// false
```

## Generic Behavior

`slice()` is generic.

That means it can be borrowed for array-like objects.

```javascript
const arrayLike = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  length: 4,
}

Array.prototype.slice.call(arrayLike, 1, 3)
// [ 'one', 'two' ]
```

This is why old code often used `slice.call(arguments)` to convert an
array-like value into a real array.

For modern iterable values, `Array.from(value)` or `[...value]` is usually
clearer.

## `slice()` Vs `splice()`

`slice()` copies a portion and leaves the original unchanged.

```javascript
const values = ['a', 'b', 'c', 'd']

values.slice(1, 3)
// [ 'b', 'c' ]

values
// [ 'a', 'b', 'c', 'd' ]
```

`splice()` removes, inserts, or replaces values in the original array.

```javascript
const values = ['a', 'b', 'c', 'd']

values.splice(1, 2)
// [ 'b', 'c' ]

values
// [ 'a', 'd' ]
```

Use `slice()` when you want a copied portion.

Use `splice()` when you intentionally want to mutate the original array.

## Important Notes

- `slice()` returns a new array.
- `slice()` does not mutate the original array.
- The `end` index is excluded.
- Negative indexes count from the end of the array.
- Calling `slice()` with no arguments makes a shallow copy.
- Nested objects and nested arrays are still shared by reference.
- Sparse array empty slots stay empty slots.
- `slice()` is generic and can be borrowed for array-like objects.

## When To Use It

Use `slice()` when:

- you need part of an array
- you want a shallow copy of an array
- you want to skip items without mutating the original
- you want the last one or last few items with negative indexes
- you are working with array-like objects in older code

## Common Mistakes

### Thinking `end` Is Included

```javascript
['a', 'b', 'c', 'd'].slice(1, 3)
// [ 'b', 'c' ]
```

Index `3` is not included.

### Expecting Mutation

```javascript
const letters = ['a', 'b', 'c']

letters.slice(1)

letters
// [ 'a', 'b', 'c' ]
```

`slice()` returns the copied portion.

It does not change `letters`.

### Confusing `slice()` With `splice()`

```javascript
array.slice(start, end)
array.splice(start, deleteCount)
```

`slice()` copies.

`splice()` mutates.

### Forgetting The Copy Is Shallow

```javascript
const users = [{ name: 'Asha' }]
const copy = users.slice()

copy[0].name = 'Asha updated'

users[0].name
// 'Asha updated'
```

The array is new, but the object inside is shared.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/slice/slice.js
```

The runnable file contains focused examples with terminal labels and expected
output comments.

## References

- MDN:
  [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- ECMAScript spec:
  [`Array.prototype.slice`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.slice)
