# Array.prototype.indexOf() Vs Array.prototype.findIndex()

## What Problem Does It Solve?

`indexOf()` and `findIndex()` both answer an index question.

```text
indexOf()   -> Where is this exact value?
findIndex() -> Where is the first value that passes this test?
```

Both return a number.

That number is either:

```text
0 or higher -> found index
-1          -> not found
```

Example:

```javascript
const scores = [72, 81, 64, 90, 81]

scores.indexOf(81)
// 1

scores.findIndex((score) => score >= 90)
// 3
```

## Quick Definition

Both are Array instance methods.

```javascript
array.indexOf(searchElement)
array.indexOf(searchElement, fromIndex)

array.findIndex(callbackFn)
array.findIndex(callbackFn, thisArg)
```

`indexOf()` searches for a known value.

`findIndex()` searches with a callback condition.

## Mental Model

Think of `indexOf()` like this:

```text
Walk from left to right.
Compare each value with the search value.
If the value is exactly equal, return its index.
If nothing matches, return -1.
```

Think of `findIndex()` like this:

```text
Walk from left to right.
Run the callback for each index.
If the callback returns truthy, return that index.
If nothing passes, return -1.
```

Short version:

```text
indexOf() finds an exact value index.
findIndex() finds a condition-based index.
```

## `indexOf()`

Use `indexOf()` when you already know the exact value you are searching for.

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'bison']

animals.indexOf('bison')
// 1

animals.indexOf('giraffe')
// -1
```

`indexOf()` returns the first matching index.

It does not return all matching indexes.

## `fromIndex`

`indexOf()` can receive a second argument called `fromIndex`.

```javascript
array.indexOf(searchElement, fromIndex)
```

It controls where the search starts.

```javascript
const animals = ['ant', 'bison', 'camel', 'duck', 'bison']

animals.indexOf('bison', 2)
// 4
```

The first `bison` is at index `1`, but the search starts at index `2`, so the
result is index `4`.

If `fromIndex` is greater than or equal to the array length, the array is not
searched.

```javascript
animals.indexOf('bison', 5)
// -1
```

Negative `fromIndex` counts back from the end first.

```javascript
animals.indexOf('bison', -2)
// 4
```

For an array with length `5`, `-2` becomes index `3`.

The search still moves left to right after that.

## `findIndex()`

Use `findIndex()` when you need a condition.

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.findIndex((number) => number > 13)
// 3
```

The first number greater than `13` is `130`.

`130` is at index `3`.

If no element passes the callback test, `findIndex()` returns `-1`.

```javascript
numbers.findIndex((number) => number > 200)
// -1
```

Important:

```text
findIndex() returns the index.
It does not return the matching element.
It does not return true/false.
It does not return the callback result.
```

If you need the matching element itself, use `find()`.

## Same Goal, Different Search

Both methods can help you find a position, but they need different information.

```javascript
const scores = [72, 81, 64, 90, 81]

scores.indexOf(81)
// 1

scores.findIndex((score) => score >= 90)
// 3
```

Use `indexOf()` for exact primitive values.

Use `findIndex()` when the rule is more flexible.

## The `-1` Rule

Both methods return `-1` when nothing is found.

```javascript
const names = ['Asha', 'Mayank', 'Nina']

names.indexOf('Admin')
// -1

names.findIndex((name) => name === 'Admin')
// -1
```

Do not use a simple truthy check for the result.

```javascript
const index = names.indexOf('Asha')

index
// 0

index ? 'found' : 'not found'
// 'not found'
```

Why is that wrong?

Because index `0` is a valid found result, but `0` is falsy.

Use this check:

```javascript
index !== -1
// true
```

## `indexOf()` Uses Strict Equality

`indexOf()` compares like `===`.

That works well for strings, numbers, booleans, and other primitive values.

```javascript
[10, 20, 30].indexOf(20)
// 1
```

For objects, the reference must be the same object.

```javascript
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Keyboard' },
]

const sameKeyboardReference = products[1]
const newKeyboardObject = { id: 2, name: 'Keyboard' }

products.indexOf(sameKeyboardReference)
// 1

products.indexOf(newKeyboardObject)
// -1
```

The second object has the same data, but it is not the same object reference.

## `NaN` Gotcha

`indexOf()` cannot find `NaN`.

```javascript
[NaN].indexOf(NaN)
// -1
```

This happens because `indexOf()` uses strict equality style comparison, and
`NaN === NaN` is `false`.

When the lesson is specifically about checking whether `NaN` exists, `includes()`
is usually the better method.

## `findIndex()` For Objects

Use `findIndex()` when you need to inspect object properties.

```javascript
const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Keyboard' },
]

products.findIndex((product) => product.id === 2)
// 1
```

This is a common real-world use case.

You usually do not have the exact object reference.

You usually have a rule:

```text
product id is 2
user email matches
task status is pending
```

## `findIndex()` Stops Early

`findIndex()` stops as soon as the callback returns truthy.

```javascript
const visited = []

const firstEvenIndex = [1, 3, 4, 6, 8].findIndex((number, index) => {
  visited.push({ number, index })
  return number % 2 === 0
})

firstEvenIndex
// 2

visited
// [{ number: 1, index: 0 }, { number: 3, index: 1 }, { number: 4, index: 2 }]
```

It does not continue to `6` and `8` after finding `4`.

## Callback Result Is Not The Final Result

The callback result decides whether an element matched.

The callback result itself is not returned.

```javascript
[5, 12].findIndex((number) => {
  return number > 10 ? 'yes' : false
})
// 1
```

`'yes'` is truthy, so index `1` matches.

But the final return value is `1`, not `'yes'`.

## Callback Arguments

The `findIndex()` callback receives:

```javascript
findIndex((value, index, array) => {
  // return truthy when this index is the answer
})
```

Use `index` when position matters.

Use `array` when you need nearby values.

Example: find the first peak reading.

```javascript
const readings = [3, 8, 6, 12, 9]

readings.findIndex((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})
// 1
```

The first peak value is `8`, and it is at index `1`.

## `thisArg`

`findIndex()` can receive a second argument called `thisArg`.

```javascript
array.findIndex(callbackFn, thisArg)
```

Use a normal function if you want `thisArg` to become `this`.

```javascript
const stock = [
  { name: 'apples', quantity: 0 },
  { name: 'bananas', quantity: 3 },
  { name: 'oranges', quantity: 1 },
]

const rule = {
  minimumQuantity: 2,
}

stock.findIndex(function (item) {
  return item.quantity >= this.minimumQuantity
}, rule)
// 1
```

Arrow functions do not get their own `this`, so they are not useful for this
specific `thisArg` pattern.

## Sparse Array Difference

Sparse arrays have empty slots.

```javascript
const sparseValues = [1, , 3]
```

`findIndex()` visits empty slots and treats them like `undefined`.

```javascript
sparseValues.findIndex((value) => value === undefined)
// 1
```

`indexOf()` skips empty slots.

```javascript
sparseValues.indexOf(undefined)
// -1
```

This is different from an explicitly stored `undefined`.

```javascript
[1, undefined, 3].indexOf(undefined)
// 1
```

## Generic Behavior

Both methods are generic.

They do not require a real array.

They need:

```text
a length property
integer-keyed properties
```

Example:

```javascript
const arrayLike = {
  length: 3,
  0: 'small',
  1: 'medium',
  2: 'large',
}

Array.prototype.indexOf.call(arrayLike, 'medium')
// 1

Array.prototype.findIndex.call(arrayLike, (value) => value.length > 5)
// 1
```

## `indexOf()` Vs `findIndex()`

Use `indexOf()` when:

```text
You already know the exact value.
You are searching primitive values.
You want a simple exact-match lookup.
```

Use `findIndex()` when:

```text
You need a callback condition.
You are searching objects by property.
You need logic more complex than strict equality.
```

## Common Mistakes

### Mistake 1: Treating Index `0` As Not Found

```javascript
const names = ['Asha', 'Mayank']
const index = names.indexOf('Asha')

if (index) {
  console.log('found')
}
```

This does not run because `index` is `0`, and `0` is falsy.

Correct:

```javascript
if (index !== -1) {
  console.log('found')
}
```

### Mistake 2: Using `indexOf()` For Object Data

```javascript
const users = [{ id: 1 }, { id: 2 }]

users.indexOf({ id: 2 })
// -1
```

The object is new, so the reference does not match.

Correct:

```javascript
users.findIndex((user) => user.id === 2)
// 1
```

### Mistake 3: Expecting `findIndex()` To Return The Element

```javascript
const users = [{ id: 1 }, { id: 2 }]

users.findIndex((user) => user.id === 2)
// 1
```

`findIndex()` returns the index.

If you want the object, use `find()`.

```javascript
users.find((user) => user.id === 2)
// { id: 2 }
```

### Mistake 4: Expecting `indexOf()` To Find `NaN`

```javascript
[NaN].indexOf(NaN)
// -1
```

This is expected behavior.

Use `includes()` when you only need to know whether `NaN` is present.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/findIndex-indexOf/findIndex-indexOf.js
```

## Review Checklist

- [x] `indexOf()` returns the first exact-match index.
- [x] `findIndex()` returns the first condition-match index.
- [x] Both methods return `-1` when nothing is found.
- [x] Index `0` is a valid found result.
- [x] `indexOf()` uses strict equality and cannot find `NaN`.
- [x] `findIndex()` is better for object-property searches.
- [x] `findIndex()` stops early.
- [x] Sparse array behavior is different between the two methods.
- [x] The runnable file can be executed with Node.

## References

- [MDN: Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [MDN: Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
