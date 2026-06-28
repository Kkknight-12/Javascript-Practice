# Array.prototype.reverse()

## What Problem Does It Solve?

`reverse()` flips the order of elements in an array.

```javascript
const words = ['one', 'two', 'three']

words.reverse()
// [ 'three', 'two', 'one' ]
```

It is useful when the question is:

```text
How do I read the same array from the opposite direction?
```

Important:

```text
reverse() mutates the original array.
```

## Quick Definition

`reverse()` is an Array instance method.

It reverses the array in place.

It returns the same array object after changing it.

It takes no parameters.

## Mental Model

Think:

```text
same array
swap first with last
swap second with second-last
continue toward the middle
return the same array
```

Short version:

```text
reverse() turns the same array around.
```

## Syntax

```javascript
array.reverse()
```

## Parameters

`reverse()` does not take parameters.

If you pass an argument, it is ignored.

```javascript
['a', 'b', 'c'].reverse('ignored')
// [ 'c', 'b', 'a' ]
```

## Return Value

`reverse()` returns the same array reference.

```javascript
const numbers = [1, 2, 3]
const result = numbers.reverse()

result
// [3, 2, 1]

numbers
// [3, 2, 1]

result === numbers
// true
```

This is different from copying methods like `concat()`, `slice()`, and
`toReversed()`.

## Basic Example

```javascript
const words = ['one', 'two', 'three']

const reversedWords = words.reverse()
```

Result:

```javascript
reversedWords
// [ 'three', 'two', 'one' ]

words
// [ 'three', 'two', 'one' ]
```

Both variables point to the same array.

## Same Reference Gotcha

Because `reverse()` returns the same array, mutating the returned value also
mutates the original.

```javascript
const numbers = [3, 2, 4, 1, 5]
const reversedNumbers = numbers.reverse()

reversedNumbers[0] = 99

numbers
// [99, 1, 4, 2, 3]
```

Why?

```text
reversedNumbers and numbers are the same array.
```

## Object References Are Not Cloned

`reverse()` only changes element positions.

It does not clone objects inside the array.

```javascript
const asha = { name: 'Asha' }
const ira = { name: 'Ira' }
const neel = { name: 'Neel' }
const users = [asha, ira, neel]

const reversedUsers = users.reverse()

reversedUsers[0]
// { name: 'Neel' }
```

The object is still the same object reference.

```javascript
reversedUsers[0] === neel
// true
```

If you mutate the object, the same object is changed.

```javascript
reversedUsers[0].name = 'Neel updated'

neel
// { name: 'Neel updated' }
```

## `toReversed()` For Copying

Use `toReversed()` when you want a reversed copy without mutating the original.

```javascript
const queue = ['first', 'second', 'third']

const reversedQueue = queue.toReversed()

reversedQueue
// [ 'third', 'second', 'first' ]

queue
// [ 'first', 'second', 'third' ]
```

`toReversed()` returns a new array.

```javascript
reversedQueue === queue
// false
```

## Copy-First Reverse Patterns

If `toReversed()` is not available in an older environment, copy first.

```javascript
const scores = [10, 20, 30]

const reversedWithSpread = [...scores].reverse()
const reversedWithArrayFrom = Array.from(scores).reverse()
```

Both results are:

```javascript
[30, 20, 10]
```

The original stays unchanged:

```javascript
scores
// [10, 20, 30]
```

## Shallow Copy Warning

`toReversed()`, `[...array].reverse()`, and `Array.from(array).reverse()` create
a new outer array.

They do not deep clone nested objects.

```javascript
const tasks = [
  { title: 'learn reverse', done: false },
  { title: 'practice methods', done: false },
]

const reversedTaskCopy = tasks.toReversed()

reversedTaskCopy[0].done = true
```

The outer array is new.

The task objects are shared references.

```javascript
tasks[1].done
// true
```

## Empty And Single-Item Arrays

Empty arrays stay empty.

```javascript
[].reverse()
// []
```

Single-item arrays still contain the same one item.

```javascript
['only'].reverse()
// [ 'only' ]
```

Both calls still return the same array object they were called on.

## Sparse Array Behavior

`reverse()` preserves empty slots.

```javascript
const values = ['first', , 'third', 'fourth']

values.reverse()
// [ 'fourth', 'third', empty, 'first' ]
```

The empty slot moved.

It did not become a real `undefined` value.

```javascript
Object.hasOwn(values, 2)
// false
```

## Generic Behavior

`reverse()` is generic.

That means it can be borrowed for array-like objects.

```javascript
const arrayLike = {
  0: 'zero',
  1: 'one',
  2: 'two',
  length: 3,
}

Array.prototype.reverse.call(arrayLike)
// { '0': 'two', '1': 'one', '2': 'zero', length: 3 }
```

The same object is mutated and returned.

For the shared explanation of borrowed Array methods, see:

```text
src/array/methods/instance/prototype/concept/array-prototype.md
```

## `reverse()` Vs `sort()`

`reverse()` flips the current order.

It does not sort values.

```javascript
const numbers = [3, 1, 2]

[...numbers].reverse()
// [2, 1, 3]
```

`sort()` arranges values according to a sorting rule.

```javascript
[...numbers].sort((a, b) => a - b)
// [1, 2, 3]
```

Use `reverse()` when the current order is already meaningful and you want the
opposite direction.

Use `sort()` when values need to be ordered by comparison.

## Important Notes

1. `reverse()` mutates the original array.
2. It returns the same array reference.
3. It takes no parameters.
4. Mutating the returned value mutates the original.
5. `reverse()` does not clone objects inside the array.
6. Use `toReversed()` when you want a reversed copy.
7. `[...array].reverse()` and `Array.from(array).reverse()` are copy-first
   alternatives.
8. Copying alternatives are shallow copies.
9. Sparse-array empty slots are preserved.
10. `reverse()` is generic and can work on array-like objects.

## When To Use It

Use `reverse()` when you intentionally want to change the original array.

Good fits:

```text
reverse an internal working list
process a stack-like array in opposite order
mutate a temporary array that nobody else needs
```

Use `toReversed()` or copy-first `reverse()` when the original order must stay
safe.

Good fits:

```text
render newest first without changing source data
show a reversed copy in UI
avoid mutating props, state, or shared arrays
```

Use another method when the question is different:

```text
Need sorted values?       -> sort() or toSorted()
Need copied reversed?     -> toReversed()
Need custom traversal?    -> for loop, for...of, or iterator logic
```

## Common Mistakes

### Mistake 1: Expecting A New Array

```javascript
const numbers = [1, 2, 3]
const reversed = numbers.reverse()

reversed === numbers
// true
```

`reverse()` returned the same array.

Use `toReversed()` when you need a new array.

### Mistake 2: Mutating Shared Data

```javascript
const newestFirst = posts.reverse()
```

This changes `posts`.

Safer:

```javascript
const newestFirst = posts.toReversed()
```

Or:

```javascript
const newestFirst = [...posts].reverse()
```

### Mistake 3: Thinking Copying Means Deep Copy

```javascript
const copy = users.toReversed()
```

The outer array is new.

The user objects are still shared references.

### Mistake 4: Using `reverse()` Instead Of `sort()`

```javascript
[3, 1, 2].reverse()
// [2, 1, 3]
```

That is not ascending or descending sort.

It only flips the current order.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/reverse/reverse.js
```

The runnable file contains labelled terminal examples, inline comments, and
expected output comments for the main cases.

## References

- MDN:
  [`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
- MDN:
  [`Array.prototype.toReversed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed)
- ECMAScript spec:
  [`Array.prototype.reverse`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reverse)
