# Array.prototype.filter()

## What Problem Does It Solve?

`filter()` creates a new array with only the elements that pass a test.

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.filter((number) => number > 10)
// [12, 130, 44]
```

It is useful when the question is:

```text
Which items should stay?
```

Examples:

```text
products that are in stock
users who are active
numbers greater than 10
search results that match a query
```

## Quick Definition

`filter()` is an Array instance method.

It returns a new array.

It does not mutate the original array.

The new array contains the original elements whose callback result was truthy.

## Mental Model

Think:

```text
Start with an empty result array.

Check each existing element.

If callback returns truthy:
  keep the original element.

If callback returns falsy:
  skip the element.

Return the result array.
```

Short version:

```text
filter() keeps or skips original elements.
```

## Basic Example

```javascript
const numbers = [5, 12, 8, 130, 44]

const largeNumbers = numbers.filter((number) => number > 10)

largeNumbers
// [12, 130, 44]
```

The original array stays the same:

```javascript
numbers
// [5, 12, 8, 130, 44]
```

## Syntax

```javascript
filter(callbackFn)
filter(callbackFn, thisArg)
```

## Parameters

### `callbackFn`

A function that runs for each existing element in the array.

```javascript
array.filter((value, index, array) => {
  return condition
})
```

Return a truthy value to keep the current element.

Return a falsy value to skip the current element.

The callback result decides keep or skip.

The callback result does not become the value in the new array.

The callback arguments are explained with examples below.

### `thisArg`

An optional value to use as `this` when `callbackFn` is called.

```javascript
array.filter(callbackFn, thisArg)
```

The `thisArg` behavior is explained with an example below.

## Return Value

`filter()` returns a new array.

```javascript
const values = [1, 2, 3]
const result = values.filter((value) => value > 1)

result
// [2, 3]

result === values
// false
```

The callback decides whether each element is kept.

The callback result itself is not placed into the new array.

```javascript
[1, 2, 3].filter((number) => {
  return number > 1 ? 'keep' : ''
})
// [2, 3]
```

Why?

```text
1 -> ''     -> falsy -> skip 1
2 -> 'keep' -> truthy -> keep 2
3 -> 'keep' -> truthy -> keep 3
```

`filter()` keeps the original values `2` and `3`.

It does not return `['keep', 'keep']`.

## When Nothing Passes

If no element passes the test, `filter()` returns an empty array.

```javascript
[5, 12, 8].filter((number) => number > 100)
// []
```

That empty array is still a new array.

## Filtering Objects

```javascript
const products = [
  { name: 'Apples', quantity: 10 },
  { name: 'Grapes', quantity: 0 },
  { name: 'Watermelon', quantity: 3 },
]

const inStockProducts = products.filter((product) => product.quantity > 0)

inStockProducts
// [{ name: 'Apples', quantity: 10 }, { name: 'Watermelon', quantity: 3 }]
```

The callback decides which product objects stay.

## Shallow Copy Behavior

The result array is new.

But the objects inside it are the same object references from the original
array.

```javascript
const products = [
  { name: 'Apples', price: 1.99 },
  { name: 'Grapes', price: 2.99 },
]

const result = products.filter((product) => product.name === 'Apples')

result[0] === products[0]
// true
```

So if you mutate the kept object, you mutate the same object that also exists in
the original array.

## Callback Arguments

The callback receives:

```javascript
filter((value, index, array) => {
  // return truthy to keep this value
})
```

Use `index` when position matters.

Use `array` when you need to compare with nearby values.

Example: keep peak readings.

```javascript
const readings = [3, 8, 6, 12, 9]

readings.filter((value, index, array) => {
  const previous = array[index - 1] ?? -Infinity
  const next = array[index + 1] ?? -Infinity

  return value > previous && value > next
})
// [8, 12]
```

Important:

The `array` argument is the original array that `filter()` was called on.

It is not the new result array being built.

## `thisArg`

`filter()` can receive a second argument called `thisArg`.

```javascript
array.filter(callbackFn, thisArg)
```

Use a normal function if you want `thisArg` to become `this`.

```javascript
const rule = {
  minimumQuantity: 1,
}

products.filter(function (product) {
  return product.quantity >= this.minimumQuantity
}, rule)
```

Do not use an arrow function for this pattern, because arrow functions do not
have their own `this`.

## Search Pattern

`filter()` is useful when more than one item may match a search.

```javascript
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange']

fruits.filter((fruit) => fruit.includes('an'))
// ['banana', 'mango', 'orange']
```

If you only need the first match, use `find()`.

## Sparse Arrays Skip Empty Slots

`filter()` does not run the callback for empty slots.

```javascript
const values = [1, , undefined, 4]

values.filter((value) => true)
// [1, undefined, 4]
```

The empty slot was skipped.

The real `undefined` value was visited and kept.

You can prove the empty slot is missing:

```javascript
Object.hasOwn(values, 1)
// false
```

## `filter()` Vs `find()`

`filter()` returns all matching elements in a new array.

```javascript
[1, 2, 3, 4].filter((number) => number % 2 === 0)
// [2, 4]
```

`find()` returns the first matching element itself.

```javascript
[1, 2, 3, 4].find((number) => number % 2 === 0)
// 2
```

Use `filter()` when you need all matches.

Use `find()` when you need one match.

## `filter()` Vs `map()`

`filter()` keeps or skips original values.

```javascript
[1, 2, 3].filter((number) => number > 1)
// [2, 3]
```

`map()` transforms every value.

```javascript
[1, 2, 3].map((number) => number * 10)
// [10, 20, 30]
```

If you need both, the later `map-filter` page covers chaining.

## Generic Behavior

`filter()` is generic.

That means it can be called on array-like objects.

It needs:

```text
length
integer-like keys: 0, 1, 2...
```

Example:

```javascript
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  length: 3,
}

Array.prototype.filter.call(arrayLike, (value) => value !== 'b')
// ['a', 'c']
```

The value at key `3` is ignored because `length` is `3`.

## Async Callback Gotcha

`filter()` does not wait for promises.

This is wrong when you expect async filtering:

```javascript
[1, 2, 3].filter(async (number) => {
  return number > 10
})
// [1, 2, 3]
```

Why did it keep everything?

Because an async function returns a `Promise`.

A `Promise` object is truthy.

`filter()` sees truthy callback results and keeps every item.

For async filtering, use a different flow:

```javascript
const checks = await Promise.all(items.map(asyncCheck))

const filteredItems = items.filter((item, index) => checks[index])
```

## When To Use It

Use `filter()` when:

1. You need all elements that match a condition.
2. You want to remove unwanted items without changing the original array.
3. You want to keep original values, not transform them.
4. You expect zero, one, or many matches.

Use `find()` when you only need the first matching element.

Use `some()` when you only need a yes/no answer.

Use `map()` when you want to transform every element.

## Common Mistakes

### Mistake 1: Expecting `filter()` To Transform Values

```javascript
[1, 2, 3].filter((number) => number * 10)
// [1, 2, 3]
```

`number * 10` is truthy for these numbers, so all original values are kept.

Use `map()` when you want transformed values.

### Mistake 2: Thinking The Callback Result Goes Into The New Array

```javascript
[1, 2, 3].filter((number) => {
  return number > 1 ? 'keep' : ''
})
// [2, 3]
```

The callback result only decides keep or skip.

The original element is what goes into the new array.

### Mistake 3: Expecting The Original Array To Change

```javascript
const numbers = [1, 2, 3]

numbers.filter((number) => number > 1)
// [2, 3]

numbers
// [1, 2, 3]
```

`filter()` does not mutate the original array.

### Mistake 4: Forgetting Objects Are Shared

```javascript
const users = [{ name: 'Asha', active: true }]
const activeUsers = users.filter((user) => user.active)

activeUsers[0] === users[0]
// true
```

The result array is new, but the object reference is shared.

### Mistake 5: Expecting Empty Slots To Be Visited

```javascript
[1, , 3].filter((value) => true)
// [1, 3]
```

The empty slot is skipped.

## Important Notes

1. `filter()` is an Array instance method.
2. It returns a new array.
3. It does not mutate the original array.
4. The callback result decides whether to keep or skip each element.
5. `filter()` keeps the original element, not the callback result.
6. If nothing passes, it returns an empty array.
7. The result array is shallow.
8. Kept objects are shared by reference.
9. The callback receives `value`, `index`, and `array`.
10. `thisArg` works with normal functions, not arrow functions.
11. Empty slots in sparse arrays are skipped.
12. `filter()` is generic and can work on array-like objects.
13. `filter()` does not wait for async callbacks.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/filter/filter.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## References

- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [ECMAScript Specification: Array.prototype.filter](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.filter)
