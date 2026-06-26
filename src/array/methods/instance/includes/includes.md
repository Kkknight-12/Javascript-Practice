# Array.prototype.includes()

## What Problem Does It Solve?

`includes()` checks whether an array contains a value.

```javascript
const numbers = [1, 2, 3]

numbers.includes(2)
// true

numbers.includes(9)
// false
```

It is useful when the question is:

```text
Does this exact value exist?
```

Examples:

```text
allowed roles
selected ids
blocked words
available status values
known option names
```

## Quick Definition

`includes()` is an Array instance method.

It checks whether a searched value exists in the array.

It answers with `true` or `false`.

## Mental Model

Think:

```text
Start at fromIndex, or 0 if fromIndex is missing.
Read each array position from left to right.
Compare each value with searchElement.
If a match is found, return true.
If the search finishes without a match, return false.
```

Short version:

```text
includes() asks yes/no for an exact value.
```

## Syntax

```javascript
array.includes(searchElement)
array.includes(searchElement, fromIndex)
```

## Parameters

`searchElement` is the value you want to find.

```javascript
['admin', 'editor'].includes('admin')
// true
```

`fromIndex` is optional.

It tells `includes()` where to start searching.

```javascript
['a', 'b', 'c', 'a'].includes('a', 1)
// true
```

The search starts at index `1`, so the first `'a'` at index `0` is ignored.

## Return Value

`includes()` returns a boolean.

```text
true  -> the value exists
false -> the value does not exist
```

It does not return the found value.

It does not return the index.

It does not mutate the original array.

## Basic Example

```javascript
const pets = ['cat', 'dog', 'bat']

pets.includes('cat')
// true

pets.includes('horse')
// false
```

The result is only `true` or `false`.

`includes()` does not return the found value.

It does not return the index.

## Exact Value, Not Substring Search

Array `includes()` checks full array elements.

```javascript
const words = ['cat', 'dog', 'bat']

words.includes('cat')
// true

words.includes('at')
// false
```

`'at'` exists inside the string `'cat'`, but it is not a full array element.

String `includes()` is a different method:

```javascript
'cat'.includes('at')
// true
```

## No Type Coercion

`includes()` does not convert strings to numbers or numbers to strings.

```javascript
const values = ['1', '2', '3']

values.includes('3')
// true

values.includes(3)
// false
```

The string `'3'` and the number `3` are different values.

## `fromIndex`

`includes()` can receive a second argument called `fromIndex`.

```javascript
array.includes(searchElement, fromIndex)
```

It controls where the search starts.

```javascript
const letters = ['a', 'b', 'c', 'a', 'd']

letters.includes('a')
// true

letters.includes('a', 1)
// true

letters.includes('a', 4)
// false
```

In the last example, the search starts at index `4`.

The value at index `4` is `'d'`, and there is no `'a'` after that.

If `fromIndex` is greater than or equal to the array length, the array is not
searched.

```javascript
letters.includes('d', 5)
// false
```

## Negative `fromIndex`

A negative `fromIndex` counts back from the end first.

The search still moves left to right after that.

```javascript
const letters = ['a', 'b', 'c', 'a', 'd']

letters.includes('c', -3)
// true
```

The array length is `5`.

`-3` becomes index `2`.

The search starts at index `2`, so it can find `'c'`.

```javascript
letters.includes('b', -3)
// false
```

`'b'` is at index `1`, before the computed start index.

If the negative value goes before the beginning, the search starts from index
`0`.

```javascript
letters.includes('a', -100)
// true
```

## SameValueZero Comparison

`includes()` uses `SameValueZero` comparison.

For most values, this feels similar to `===`.

But there is one important difference:

```text
NaN matches NaN
```

Example:

```javascript
[1, 2, NaN].includes(NaN)
// true
```

This is different from `indexOf()`.

```javascript
[1, 2, NaN].indexOf(NaN)
// -1
```

`includes()` can find `NaN`.

`indexOf()` cannot.

`SameValueZero` also treats `0` and `-0` as equal.

```javascript
[-0].includes(0)
// true

[0].includes(-0)
// true
```

## Object Reference Behavior

Objects are compared by reference.

```javascript
const keyboard = { id: 2, name: 'Keyboard' }

const products = [
  { id: 1, name: 'Laptop' },
  keyboard,
]

products.includes(keyboard)
// true
```

That works because `keyboard` is the same object reference that exists in the
array.

A new object with the same data is not the same value.

```javascript
products.includes({ id: 2, name: 'Keyboard' })
// false
```

If you need to search objects by property, use `some()` or `find()`.

```javascript
products.some((product) => product.id === 2)
// true
```

## `includes()` Vs `some()`

Use `includes()` when you already have the exact value.

```javascript
const scores = [72, 81, 64, 90]

scores.includes(90)
// true
```

Do not pass a callback to `includes()` expecting it to run a condition.

```javascript
scores.includes((score) => score >= 90)
// false
```

That asks:

```text
Does this exact function object exist in the array?
```

It does not run the function.

Use `some()` for condition checks.

```javascript
scores.some((score) => score >= 90)
// true
```

## Empty Arrays

An empty array has no values to search.

```javascript
[].includes(undefined)
// false

[].includes('anything')
// false
```

There are no elements, so `includes()` returns `false`.

## Sparse Arrays

A sparse array has empty slots.

```javascript
const values = [1, , 3]
```

`includes()` treats empty slots as if they contain `undefined`.

```javascript
values.includes(undefined)
// true
```

But the slot is still actually missing.

```javascript
1 in values
// false
```

This differs from `indexOf()`.

```javascript
values.indexOf(undefined)
// -1
```

`indexOf()` skips empty slots.

`includes()` reads them as `undefined`.

## Generic Behavior

`includes()` is generic.

It can be called on an array-like object.

It needs:

```text
a length property
integer-keyed properties
```

Example:

```javascript
const arrayLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4,
  3: 1,
}

Array.prototype.includes.call(arrayLike, 2)
// true

Array.prototype.includes.call(arrayLike, 1)
// false
```

The property `3` is ignored because `length` is `3`.

Valid searched indexes are `0`, `1`, and `2`.

Missing integer-keyed properties are read as `undefined`.

```javascript
const arrayLike = {
  length: 3,
  1: 'mayank',
  2: 'b',
  3: 'ignored',
}

Array.prototype.includes.call(arrayLike, undefined)
// true
```

Index `0` is missing, so reading it gives `undefined`.

## `includes()` Vs `indexOf()`

Both methods can check whether a value exists.

```javascript
const values = ['a', 'b', 'c']

values.includes('b')
// true

values.indexOf('b')
// 1
```

Use `includes()` when you only need yes/no.

Use `indexOf()` when you need the index.

Important difference:

```javascript
[NaN].includes(NaN)
// true

[NaN].indexOf(NaN)
// -1
```

Another difference:

```javascript
[1, , 3].includes(undefined)
// true

[1, , 3].indexOf(undefined)
// -1
```

## Important Notes

`includes()` is for exact value membership.

Use it when the question is:

```text
Does this array contain this value?
```

Important behavior to remember:

```text
It returns only true or false.
It does not run callback conditions.
It uses SameValueZero comparison.
It can find NaN.
It compares objects by reference.
It treats sparse-array empty slots like undefined.
```

`fromIndex` only controls the start position.

It does not change the search direction.

The search still moves left to right.

## When To Use It

Use `includes()` for simple membership checks.

```javascript
const allowedRoles = ['admin', 'editor']

allowedRoles.includes('admin')
// true
```

Good fits:

```text
checking selected ids
checking allowed role names
checking a blocked-word list
checking whether a status value is allowed
checking whether NaN exists in a numeric array
```

Use a different method when the question is different:

```text
Need the index?          -> indexOf() or findIndex()
Need a condition?        -> some()
Need the matching value? -> find()
Need string substring?   -> String.prototype.includes()
```

## Common Mistakes

### Mistake 1: Expecting An Index

```javascript
const values = ['a', 'b', 'c']

values.includes('b')
// true
```

`includes()` returns a boolean.

If you need the index, use `indexOf()` or `findIndex()`.

### Mistake 2: Passing A Callback

```javascript
const values = [10, 20, 30]

values.includes((value) => value > 15)
// false
```

`includes()` does not run the callback.

Use `some()`:

```javascript
values.some((value) => value > 15)
// true
```

### Mistake 3: Searching Inside Strings With Array `includes()`

```javascript
const words = ['cat']

words.includes('at')
// false
```

The array element is `'cat'`.

The array does not contain a separate `'at'` element.

### Mistake 4: Expecting Object Data Matching

```javascript
const users = [{ id: 1 }, { id: 2 }]

users.includes({ id: 2 })
// false
```

That object is a new reference.

Use `some()` when checking object properties:

```javascript
users.some((user) => user.id === 2)
// true
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/includes/includes.js
```

The `.js` file includes commented examples and expected output comments beside
the terminal logs.

## Review Checklist

- [x] `includes()` returns a boolean.
- [x] `includes()` searches for an exact value, not a substring.
- [x] `includes()` does not run callback conditions.
- [x] `fromIndex` controls where the search starts.
- [x] Negative `fromIndex` counts from the end first.
- [x] `includes()` uses `SameValueZero`.
- [x] `includes()` can find `NaN`.
- [x] Objects are compared by reference.
- [x] Sparse-array empty slots are treated like `undefined`.
- [x] `includes()` is generic and works on array-like objects.
- [x] The runnable file can be executed with Node.

## References

- [MDN: Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
- [ECMAScript Specification: Array.prototype.includes](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes)
