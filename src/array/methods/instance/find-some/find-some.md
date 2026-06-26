# Array.prototype.find() Vs Array.prototype.some()

## What Problem Does It Solve?

`find()` and `some()` both search an array with a callback.

They answer different questions.

```text
find() -> Which matching value?
some() -> Does any matching value exist?
```

Example:

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.find((number) => number > 10)
// 12

numbers.some((number) => number > 10)
// true
```

## Quick Definition

Both are Array instance methods that search with a callback.

Use `find()` when you need the matching value.

Use `some()` when you only need a yes/no answer.

## Mental Model

```text
find()
  -> "Give me the first matching value."

some()
  -> "Tell me yes/no if any value matches."
```

Both methods stop early after the first match.

## Syntax

```javascript
find(callbackFn)
find(callbackFn, thisArg)

some(callbackFn)
some(callbackFn, thisArg)
```

## Parameters

### `callbackFn`

A function that runs while the method is searching.

```javascript
array.find((value, index, array) => {
  return condition
})

array.some((value, index, array) => {
  return condition
})
```

Return a truthy value when the current element matches.

Return a falsy value when the current element does not match.

The callback result is only used as a test. It is not directly returned by
`find()` or `some()`.

The callback arguments are explained with examples below.

### `thisArg`

An optional value to use as `this` when `callbackFn` is called.

```javascript
array.find(callbackFn, thisArg)
array.some(callbackFn, thisArg)
```

The `thisArg` behavior is explained with an example below.

## Return Value

`find()` returns the first matching element itself.

If nothing matches, `find()` returns `undefined`.

`some()` returns `true` when at least one element matches.

If nothing matches, `some()` returns `false`.

Short version:

```text
find() -> value or undefined
some() -> true or false
```

## `find()`

`find()` searches from left to right until the callback returns truthy.

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.find((number) => number > 10)
// 12
```

When nothing matches:

```javascript
numbers.find((number) => number > 200)
// undefined
```

Important:

```text
find() gives you the original matching element.
It does not give you true/false or the callback result.
```

## `some()`

`some()` searches from left to right until the callback returns truthy.

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.some((number) => number > 10)
// true
```

When nothing matches:

```javascript
numbers.some((number) => number > 200)
// false
```

Important:

```text
some() returns a boolean.
It does not give you the matching element or the callback result.
```

## Same Callback, Different Result

```javascript
const isEven = (number) => number % 2 === 0

[1, 3, 4, 6].find(isEven)
// 4

[1, 3, 4, 6].some(isEven)
// true
```

The callback is the same.

The method decides the final return value.

## Callback Result Is Not The Final Result

The callback result decides match or no match.

It is not returned directly.

```javascript
[5, 12].find((number) => {
  return number > 10 ? 'yes' : false
})
// 12
```

`find()` returned `12`, not `'yes'`.

```javascript
[5, 12].some((number) => {
  return number > 10 ? 'yes' : false
})
// true
```

`some()` returned `true`, not `'yes'`.

## Both Methods Stop Early

```javascript
const visited = []

const found = [1, 3, 4, 6, 8].find((number) => {
  visited.push(number)
  return number % 2 === 0
})

found
// 4

visited
// [1, 3, 4]
```

`find()` stopped at `4`.

`some()` also stops after the first truthy callback result:

```javascript
const visited = []

const hasEven = [1, 3, 4, 6, 8].some((number) => {
  visited.push(number)
  return number % 2 === 0
})

hasEven
// true

visited
// [1, 3, 4]
```

## Object Lookup

Use `find()` when you need the matching object.

```javascript
const users = [
  { id: 1, name: 'Asha', active: false },
  { id: 2, name: 'Mayank', active: true },
]

users.find((user) => user.id === 2)
// { id: 2, name: 'Mayank', active: true }
```

The returned object is the same reference from the original array.

```javascript
const foundUser = users.find((user) => user.id === 2)

foundUser === users[1]
// true
```

## Existence Check

Use `some()` when you only need a yes/no answer.

```javascript
const users = [
  { id: 1, active: false },
  { id: 2, active: true },
]

users.some((user) => user.active)
// true
```

This reads naturally:

```text
Does some user have active === true?
```

## Falsy Found Values

Be careful with `find()` when a valid found value can be falsy.

```javascript
const cells = [0, 1, 2]

const foundZero = cells.find((cell) => cell === 0)

foundZero
// 0
```

This check is wrong:

```javascript
if (foundZero) {
  console.log('found')
}
```

`0` is falsy, so the block will not run.

For this exact data, use:

```javascript
foundZero !== undefined
// true
```

Or use `some()` when the real question is existence:

```javascript
cells.some((cell) => cell === 0)
// true
```

## Empty Arrays

For an empty array:

```javascript
[].find(() => true)
// undefined

[].some(() => true)
// false
```

The callback does not run in either case.

Think:

```text
find() did not find a matching element -> undefined
some() did not find any passing element -> false
```

## Sparse Array Difference

This is an important difference.

`find()` visits empty slots and treats them like `undefined`.

```javascript
const values = [1, , 3]
const visits = []

values.find((value, index) => {
  visits.push([index, value])
  return false
})

visits
// [[0, 1], [1, undefined], [2, 3]]
```

`some()` skips empty slots.

```javascript
const values = [1, , 3]
const visits = []

values.some((value, index) => {
  visits.push([index, value])
  return false
})

visits
// [[0, 1], [2, 3]]
```

The slot is still missing:

```javascript
Object.hasOwn(values, 1)
// false
```

## Callback Arguments

Both callbacks receive:

```javascript
method((value, index, array) => {
  // return truthy when this value passes
})
```

Use `index` when position matters.

Use `array` when you need to compare with nearby values.

Example with `find()`:

```javascript
const readings = [3, 8, 2, 12, 9]

readings.find((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})
// 8
```

Example with `some()`:

```javascript
readings.some((value, index, array) => {
  if (index === 0) {
    return false
  }

  return array[index - 1] - value > 4
})
// true
```

## `thisArg`

Both methods can receive a second argument called `thisArg`.

```javascript
array.find(callbackFn, thisArg)
array.some(callbackFn, thisArg)
```

Use a normal function if you want `thisArg` to become `this`.

```javascript
const rule = {
  minimumQuantity: 1,
}

inventory.find(function (item) {
  return item.quantity >= this.minimumQuantity
}, rule)

inventory.some(function (item) {
  return item.quantity >= this.minimumQuantity
}, rule)
```

Do not use an arrow function for this pattern, because arrow functions do not
have their own `this`.

## Generic Behavior

Both methods are generic.

That means they can be called on array-like objects.

They need:

```text
length
integer-like keys: 0, 1, 2...
```

Example:

```javascript
const arrayLike = {
  0: 'small',
  1: 'medium',
  2: 'large',
  length: 3,
}

Array.prototype.find.call(arrayLike, (value) => value.length > 5)
// 'medium'

Array.prototype.some.call(arrayLike, (value) => value.length > 5)
// true
```

## When To Use It

Use `find()` when:

1. You need the matching element itself.
2. You only care about the first match.
3. You want to read or reuse a matching object from the original array.

Use `some()` when:

1. You only need a yes/no answer.
2. The matching value could be falsy, such as `0`, `''`, or `false`.
3. You want the code to read like an existence check.

Use `filter()` when you need all matching elements.

## Common Mistakes

### Mistake 1: Using `find()` When You Only Need Yes/No

```javascript
const user = users.find((user) => user.active)
```

This gives the matching user object.

If you only need existence, use:

```javascript
const hasActiveUser = users.some((user) => user.active)
```

### Mistake 2: Expecting `some()` To Return The Matching Element

```javascript
[5, 12, 8].some((number) => number > 10)
// true
```

It returns `true`, not `12`.

Use `find()` when you need `12`.

### Mistake 3: Checking A `find()` Result With Truthy/Falsy Logic

```javascript
const found = [0, 1, 2].find((cell) => cell === 0)

if (found) {
  console.log('found')
}
```

`0` is a valid found value, but it is falsy.

For this exact data, use `found !== undefined`, or use `some()` if you only need
existence.

### Mistake 4: Forgetting The Sparse Array Difference

```javascript
[1, , 3].find((value) => value === undefined)
// undefined
```

That may mean it found an empty slot treated as `undefined`.

But:

```javascript
[1, , 3].some((value) => value === undefined)
// false
```

`some()` skipped the empty slot.

## Important Notes

1. `find()` returns the first matching element.
2. `find()` returns `undefined` when nothing matches.
3. `some()` returns `true` when at least one element passes.
4. `some()` returns `false` when nothing passes.
5. Both methods stop after the first truthy callback result.
6. The callback result decides match/no match.
7. `find()` does not return the callback result.
8. `some()` does not return the matching element.
9. Be careful with falsy found values like `0`, `''`, and `false`.
10. `find()` visits empty slots as `undefined`.
11. `some()` skips empty slots.
12. Both callbacks receive `value`, `index`, and `array`.
13. Both methods support `thisArg`.
14. Both methods are generic and can work on array-like objects.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/find-some/find-some.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## References

- [MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [MDN: Array.prototype.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
- [ECMAScript Specification: Array.prototype.find](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find)
- [ECMAScript Specification: Array.prototype.some](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.some)
