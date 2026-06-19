# Array.prototype.every()

## What Problem Does It Solve?

`every()` checks whether all elements in an array pass a test.

```javascript
const scores = [82, 91, 76, 88]

scores.every((score) => score >= 40)
// true
```

It is useful when the question is:

```text
Do all items satisfy this condition?
```

Examples:

```text
Did all students pass?
Are all form fields filled?
Are all required permissions available?
Are all numbers positive?
```

## Quick Definition

`every()` is an Array instance method.

```javascript
array.every(callbackFn)
array.every(callbackFn, thisArg)
```

It returns a boolean:

```text
true  -> every checked element passed
false -> at least one checked element failed
```

It does not return the passing elements.

It does not return the failing element.

It does not return a new array.

## Mental Model

Think:

```text
Start with the assumption: everything passes.

Check each element.

If one element fails:
  return false immediately.

If no failing element is found:
  return true.
```

Short version:

```text
every() looks for the first failure.
```

## Basic Example

```javascript
const scores = [82, 91, 76, 88]

const allStudentsPassed = scores.every((score) => score >= 40)

allStudentsPassed
// true
```

All scores are at least `40`, so the result is `true`.

Now compare:

```javascript
scores.every((score) => score >= 90)
// false
```

`82` is already less than `90`, so not every score passes.

## Return Rule

The callback decides pass or fail.

The final `every()` result is still only `true` or `false`.

```javascript
[1, 2, 3].every((number) => {
  return number > 0 ? 'pass' : ''
})
// true
```

Why?

```text
'pass' is truthy
'' is falsy
```

All callback results were truthy, so `every()` returned `true`.

It did not return `'pass'`.

## Stops After The First Failure

`every()` stops as soon as the callback returns a falsy value.

```javascript
const visited = []

const result = [2, 4, 5, 6, 8].every((number) => {
  visited.push(number)
  return number % 2 === 0
})

result
// false

visited
// [2, 4, 5]
```

It stopped at `5` because `5` is not even.

`6` and `8` were never checked.

## Empty Arrays Return `true`

This is the most important gotcha.

```javascript
[].every(() => false)
// true
```

Why?

Because `every()` is looking for a failing element.

In an empty array, there is no element that can fail.

So the result is `true`.

The callback does not run:

```javascript
let count = 0

[].every(() => {
  count += 1
  return false
})

count
// 0
```

Practical note:

If your business rule says "there must be at least one item and all items must
pass", then check length too:

```javascript
items.length > 0 && items.every((item) => item.isValid)
```

## Sparse Arrays Skip Empty Slots

`every()` does not run the callback for empty slots.

```javascript
const values = [1, , 3]

values.every((value) => value !== undefined)
// true
```

That looks surprising at first.

The middle slot is empty, so the callback never sees it.

```javascript
const visits = []

[1, , 3].every((value, index) => {
  visits.push([index, value])
  return value !== undefined
})

visits
// [[0, 1], [2, 3]]
```

The empty slot at index `1` was skipped.

## Empty Slot Vs Real `undefined`

An empty slot is missing.

A real `undefined` value exists.

```javascript
const sparse = [1, , 3]
Object.hasOwn(sparse, 1)
// false
```

```javascript
const realUndefined = [1, undefined, 3]
Object.hasOwn(realUndefined, 1)
// true
```

`every()` visits real `undefined` values:

```javascript
[1, undefined, 3].every((value) => value !== undefined)
// false
```

## Callback Arguments

The callback receives:

```javascript
every((value, index, array) => {
  // return truthy when this element passes
})
```

Use `index` when position matters.

Use `array` when you need to compare with nearby values.

Example: check if numbers are strictly increasing.

```javascript
const numbers = [2, 4, 8, 16]

numbers.every((value, index, array) => {
  if (index === 0) {
    return true
  }

  return value > array[index - 1]
})
// true
```

## `thisArg`

`every()` can receive a second argument called `thisArg`.

```javascript
array.every(callbackFn, thisArg)
```

Use a normal function if you want `thisArg` to become `this`.

```javascript
const ageRule = {
  minimumAge: 18,
}

const ages = [22, 35, 19]

ages.every(function (age) {
  return age >= this.minimumAge
}, ageRule)
// true
```

Do not use an arrow function for this pattern, because arrow functions do not
have their own `this`.

## Common Pattern: Subset Check

You can use `every()` to check whether all required items exist inside another
array.

```javascript
const availablePermissions = ['read', 'write', 'delete']
const requiredPermissions = ['read', 'write']

requiredPermissions.every((permission) => {
  return availablePermissions.includes(permission)
})
// true
```

Read it like:

```text
Does every required permission exist in availablePermissions?
```

## `every()` Vs `some()`

`every()` asks:

```text
Do all items pass?
```

`some()` asks:

```text
Does at least one item pass?
```

Example:

```javascript
const inventoryCounts = [3, 0, 5]

inventoryCounts.every((count) => count > 0)
// false

inventoryCounts.some((count) => count > 0)
// true
```

Both methods short-circuit:

```text
every() stops when it finds the first failure.
some() stops when it finds the first success.
```

## Does `every()` Mutate The Array?

No.

`every()` itself does not change the original array.

```javascript
const numbers = [1, 2, 3]

numbers.every((number) => number > 0)
// true

numbers
// [1, 2, 3]
```

But the callback can still mutate things if you write side effects inside it.

Prefer keeping `every()` callbacks focused on checking a condition.

## Generic Behavior

`every()` is generic.

That means it can be called on array-like objects.

It needs:

```text
length
integer-like keys: 0, 1, 2...
```

Example:

```javascript
const formValues = {
  0: 'Mayank',
  1: 'JavaScript',
  length: 2,
}

Array.prototype.every.call(formValues, (value) => {
  return typeof value === 'string' && value.length > 0
})
// true
```

In everyday code, you will usually call `every()` on arrays.

## Async Callback Gotcha

`every()` does not wait for promises.

This is wrong when you expect async validation:

```javascript
[1, 2, 3].every(async (number) => {
  return number > 10
})
// true
```

Why did it return `true`?

Because an async function returns a `Promise`.

A `Promise` object is truthy.

`every()` sees truthy callback results and returns `true`.

For async checks, use a different flow, such as:

```javascript
const results = await Promise.all(items.map(asyncCheck))
const allPassed = results.every(Boolean)
```

## Common Mistakes

### Mistake 1: Expecting A Filtered Array

```javascript
const result = [1, 2, 3].every((number) => number > 1)

result
// false
```

`every()` returns a boolean.

Use `filter()` when you need the matching items.

### Mistake 2: Forgetting Empty Arrays Return `true`

```javascript
const cartItems = []

cartItems.every((item) => item.inStock)
// true
```

If an empty list should fail, add a length check.

```javascript
cartItems.length > 0 && cartItems.every((item) => item.inStock)
```

### Mistake 3: Forgetting Empty Slots Are Skipped

```javascript
[1, , 3].every((value) => value !== undefined)
// true
```

The empty slot was not checked.

### Mistake 4: Using Arrow Functions With `thisArg`

```javascript
ages.every((age) => age >= this.minimumAge, ageRule)
```

That does not use `ageRule` as `this`.

Use a normal function when you need `thisArg`.

## Important Notes

1. `every()` is an Array instance method.
2. It returns a boolean.
3. It returns `true` only when every checked element passes.
4. It returns `false` immediately when one checked element fails.
5. It stops after the first failure.
6. It returns `true` for empty arrays.
7. It skips empty slots in sparse arrays.
8. Real `undefined` values are still visited.
9. The callback receives `value`, `index`, and `array`.
10. `thisArg` works with normal functions, not arrow functions.
11. `every()` itself does not mutate the array.
12. `every()` does not wait for async callbacks.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/every/every.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## References

- [MDN: Array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
