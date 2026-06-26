# Array.prototype[Symbol.iterator]()

## What Problem Does It Solve?

Arrays work naturally with iteration tools:

```javascript
const letters = ['a', 'b', 'c']

for (const value of letters) {
  console.log(value)
}

[...letters]
// [ 'a', 'b', 'c' ]
```

`Array.prototype[Symbol.iterator]()` is the built-in method that makes this
possible for arrays.

It answers this question:

```text
How should JavaScript read this array one value at a time?
```

## Quick Definition

`Array.prototype[Symbol.iterator]()` is an Array instance method.

It returns an Array Iterator object.

That iterator reads array values from index `0` to the end.

## Mental Model

Think:

```text
array -> [Symbol.iterator]() -> iterator -> next() -> value
```

Short version:

```text
An array can hand out its values one by one.
```

## Syntax

```javascript
array[Symbol.iterator]()
```

You usually do not call it manually.

JavaScript calls it for you when you use iteration syntax:

```javascript
for (const value of array) {}
[...array]
const [first] = array
Array.from(array)
```

## Parameters

`Array.prototype[Symbol.iterator]()` does not take parameters.

```javascript
const iterator = ['a', 'b'][Symbol.iterator]()
```

## Return Value

It returns an Array Iterator object.

That object has a `next()` method.

Each `next()` call returns an object with:

```text
value -> current value
done  -> whether the iterator is finished
```

Example:

```javascript
const iterator = ['a', 'b'][Symbol.iterator]()

iterator.next()
// { value: 'a', done: false }

iterator.next()
// { value: 'b', done: false }

iterator.next()
// { value: undefined, done: true }
```

## Basic Example

```javascript
const letters = ['a', 'b', 'c']
const iterator = letters[Symbol.iterator]()

iterator.next()
// { value: 'a', done: false }

iterator.next()
// { value: 'b', done: false }
```

The iterator does not return the full array.

It returns one step at a time.

## Same Function As `values()`

For arrays, `Symbol.iterator` starts as the same function as `values()`.

```javascript
Array.prototype[Symbol.iterator] === Array.prototype.values
// true
```

That is why arrays produce values by default.

```javascript
const topics = ['array', 'object']

[...topics.values()]
// [ 'array', 'object' ]

[...topics[Symbol.iterator]()]
// [ 'array', 'object' ]
```

## How `for...of` Uses It

`for...of` asks the array for its iterator automatically.

```javascript
const letters = ['a', 'b', 'c']

for (const letter of letters) {
  console.log(letter)
}
```

Output:

```text
a
b
c
```

The loop is roughly doing this idea internally:

```text
Get the iterator.
Ask for next value.
Stop when done becomes true.
```

## Spread, Destructuring, And `Array.from()`

Many JavaScript tools use the iterable protocol.

```javascript
const colors = ['red', 'green', 'blue']

[...colors]
// [ 'red', 'green', 'blue' ]

const [firstColor, secondColor] = colors
// firstColor  -> 'red'
// secondColor -> 'green'

Array.from(colors)
// [ 'red', 'green', 'blue' ]
```

These tools work because arrays have `Symbol.iterator`.

## Iterators Are Stateful

An iterator remembers where it is.

```javascript
const names = ['Aman', 'Bina', 'Charu']
const iterator = names[Symbol.iterator]()

iterator.next().value
// 'Aman'

[...iterator]
// [ 'Bina', 'Charu' ]

[...iterator]
// []
```

The same iterator does not rewind.

Create a fresh iterator if you want to read from the start again:

```javascript
[...names[Symbol.iterator]()]
// [ 'Aman', 'Bina', 'Charu' ]
```

## Iterator Objects Are Also Iterable

Array iterator objects have their own `Symbol.iterator` method.

That method returns the iterator itself.

```javascript
const iterator = [10, 20, 30][Symbol.iterator]()

iterator[Symbol.iterator]() === iterator
// true
```

This lets `for...of` continue from the iterator's current position.

## `values()`, `keys()`, And `entries()`

Use the iterator method that matches the data you need.

```javascript
const topics = ['array', 'object', 'string']

[...topics.values()]
// [ 'array', 'object', 'string' ]

[...topics.keys()]
// [ 0, 1, 2 ]

[...topics.entries()]
// [ [ 0, 'array' ], [ 1, 'object' ], [ 2, 'string' ] ]
```

`Symbol.iterator` behaves like `values()`.

So this:

```javascript
[...topics]
```

means:

```javascript
[...topics.values()]
```

## Sparse Array Behavior

Array iterators do not skip empty slots.

Empty slots are read as `undefined`.

```javascript
const values = ['first', , 'third']

[...values]
// [ 'first', undefined, 'third' ]

1 in values
// false
```

The slot at index `1` is still empty, but iteration reads it as `undefined`.

## Plain Object Gotcha

Plain objects are not iterable by default.

```javascript
const user = {
  name: 'Aman',
  role: 'admin',
}

user[Symbol.iterator]
// undefined
```

This is why direct `for...of` on a plain object throws a `TypeError`.

Use `Object.entries()` when you want key-value pairs:

```javascript
Object.entries(user)
// [ [ 'name', 'Aman' ], [ 'role', 'admin' ] ]
```

## Generic Array-Like Behavior

The array iterator method is generic.

It can be called on an array-like object that has `length` and integer keys.

```javascript
const arrayLike = {
  length: 3,
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'ignored',
}

const iterator = Array.prototype[Symbol.iterator].call(arrayLike)

[...iterator]
// [ 'zero', 'one', 'two' ]
```

Properties outside `length` are ignored.

Missing integer keys are read as `undefined`.

## Important Notes

1. `Symbol.iterator` is a symbol key, not the string `'Symbol.iterator'`.
2. Arrays are iterable because they have `Array.prototype[Symbol.iterator]`.
3. For arrays, `Symbol.iterator` is the same function as `values()`.
4. `next()` returns `{ value, done }`, not only the value.
5. Iterator objects are stateful and can be consumed.
6. A fresh iterator starts from the beginning.
7. Sparse array holes are read as `undefined`.
8. Plain objects are not iterable unless they implement `Symbol.iterator`.

## When To Use It

### Use Normal Iteration Most Of The Time

```javascript
for (const value of values) {
  console.log(value)
}
```

You usually do not need to call `[Symbol.iterator]()` manually.

### Use It When Learning The Protocol

```javascript
const iterator = values[Symbol.iterator]()
iterator.next()
```

This helps you understand what `for...of`, spread, destructuring, and
`Array.from()` are doing.

### Use `entries()` When You Need Index And Value

```javascript
for (const [index, value] of values.entries()) {
  console.log(index, value)
}
```

`Symbol.iterator` gives values only.

`entries()` gives index-value pairs.

## Common Mistakes

### Treating It Like A String Property

```javascript
const values = ['a', 'b']

values['Symbol.iterator']
// undefined
```

Use the symbol key:

```javascript
values[Symbol.iterator]
// function
```

### Expecting The Iterator To Rewind

```javascript
const iterator = ['a', 'b'][Symbol.iterator]()

[...iterator]
// [ 'a', 'b' ]

[...iterator]
// []
```

The iterator is already consumed.

Create a new iterator if you want to read again.

### Expecting Plain Objects To Work With `for...of`

```javascript
const user = { name: 'Aman' }

user[Symbol.iterator]
// undefined
```

Use `Object.keys()`, `Object.values()`, or `Object.entries()` for ordinary
object data.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/Symbol.iterator/Symbol.iterator.js
```

The runnable file contains labelled terminal examples, inline comments, and
expected output comments for the main cases.

## References

- MDN:
  [`Array.prototype[Symbol.iterator]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator)
- MDN:
  [`Array.prototype.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)
- MDN:
  [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- ECMAScript spec:
  [`Array.prototype [ %Symbol.iterator% ]`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype-%symbol.iterator%)
