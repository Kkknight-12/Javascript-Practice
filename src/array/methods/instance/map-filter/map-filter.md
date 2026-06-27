# `filter()` + `map()`

## What Problem Does It Solve?

`filter().map()` is useful when you want to:

```text
keep only some items
then transform the kept items
```

Example:

```javascript
const products = [
  { name: 'Apples', price: 1.99, quantity: 10 },
  { name: 'Grapes', price: 2.99, quantity: 0 },
]

products
  .filter((product) => product.quantity > 0)
  .map((product) => product.name)
// [ 'Apples' ]
```

Read it like:

```text
From all products,
keep only in-stock products,
then return the names.
```

## Quick Definition

`filter()` and `map()` are Array instance methods.

`filter()` keeps or skips original elements.

`map()` transforms each visited element into a new value.

Together:

```javascript
array.filter(keepCondition).map(transformRule)
```

## Mental Model

Think:

```text
original array
  -> filter(): keep matching items
  -> map(): reshape each kept item
  -> final array
```

Short version:

```text
filter() decides what stays.
map() decides what each kept item becomes.
```

## Syntax

```javascript
array
  .filter(filterCallback)
  .map(mapCallback)
```

With `thisArg`:

```javascript
array
  .filter(filterCallback, filterThisArg)
  .map(mapCallback, mapThisArg)
```

## Parameters

`filterCallback` decides whether the current element should stay.

```javascript
array.filter((value, index, array) => {
  return condition
})
```

Return truthy to keep the original element.

Return falsy to skip it.

`mapCallback` decides what each visited element becomes.

```javascript
array.map((value, index, array) => {
  return newValue
})
```

The callback return value becomes the value in the new mapped array.

## Return Value

The full chain returns a new array.

```javascript
const result = values.filter(condition).map(transform)
```

`result` is not the original array.

The original array is not mutated by `filter()` or `map()`.

## Basic Example

```javascript
const products = [
  { name: 'Apples', price: 1.99, quantity: 10 },
  { name: 'Oranges', price: 0.99, quantity: 5 },
  { name: 'Grapes', price: 2.99, quantity: 0 },
]

const cards = products
  .filter((product) => product.quantity > 0)
  .map((product) => ({
    name: product.name,
    price: product.price,
  }))
```

Result:

```javascript
[
  { name: 'Apples', price: 1.99 },
  { name: 'Oranges', price: 0.99 },
]
```

What happened?

```text
Grapes was removed by filter().
The remaining product objects were transformed by map().
```

## `filter()` Keeps Original Elements

`filter()` does not transform each item.

It keeps the original element when the callback returns truthy.

```javascript
const numbers = [1, 2, 3, 4]

numbers.filter((number) => number % 2 === 0)
// [2, 4]
```

The callback result only decides keep or skip.

It does not become the value in the result.

```javascript
numbers.filter((number) => {
  return number % 2 === 0 ? 'keep' : ''
})
// [2, 4]
```

`'keep'` is truthy, so `2` and `4` stay.

The result is not:

```javascript
['keep', 'keep']
```

## `map()` Transforms Values

`map()` stores the callback return value.

```javascript
const numbers = [1, 2, 3]

numbers.map((number) => number * 10)
// [10, 20, 30]
```

If the callback returns labels, the new array contains labels.

```javascript
numbers.map((number) => (number % 2 === 0 ? 'even' : 'odd'))
// [ 'odd', 'even', 'odd' ]
```

## Chain Order Matters

Use `filter().map()` when you want to keep first, then transform.

```javascript
const numbers = [1, 2, 3, 4, 5]

numbers
  .filter((number) => number % 2 === 0)
  .map((number) => number * 2)
// [4, 8]
```

This reads well:

```text
keep even numbers
then double them
```

Use `map().filter()` when you need to transform first, then remove some
transformed results.

```javascript
numbers
  .map((number) => (number % 2 === 0 ? number * 2 : null))
  .filter((number) => number !== null)
// [4, 8]
```

Both can produce the same output in some cases.

But they tell different stories.

Choose the order that matches the real question.

## Search, Filter, Then Map

A common pattern is search plus display shaping.

```javascript
const products = [
  { name: 'Apples', quantity: 10 },
  { name: 'Grapes', quantity: 0 },
  { name: 'Watermelon', quantity: 3 },
]

products
  .filter((product) => product.name.toLowerCase().includes('app'))
  .map((product) => product.name)
// [ 'Apples' ]
```

The filter callback answers:

```text
Should this product stay in the search result?
```

The map callback answers:

```text
What should each matching product become?
```

## Callback Arguments In A Chain

Both methods pass:

```text
value
index
array
```

Important detail:

In this chain:

```javascript
products
  .filter((product) => product.quantity > 0)
  .map((product, index, array) => {
    return `${index + 1}/${array.length}: ${product.name}`
  })
```

The third argument in `map()` is the filtered array.

It is not the original `products` array.

Why?

Because `map()` is called on the result returned by `filter()`.

## Non-Mutation And Shallow References

`filter()` and `map()` return new arrays.

They do not mutate the original array by themselves.

```javascript
const products = [
  { name: 'Apples', price: 1.99 },
  { name: 'Grapes', price: 2.99 },
]

const expensive = products.filter((product) => product.price > 2)
```

`expensive` is a new array.

But the object inside it is the same object reference from `products`.

```javascript
expensive[0] === products[1]
// true
```

If you want new objects, create them inside `map()`.

```javascript
const labels = expensive.map((product) => ({
  label: `${product.name} - $${product.price}`,
}))
```

Now each label object is newly created.

## Sparse Array Behavior

Both `filter()` and `map()` skip empty slots.

```javascript
const values = [1, , 3, 4]

values
  .filter((value) => value > 1)
  .map((value) => value * 10)
// [30, 40]
```

The empty slot was skipped by `filter()`.

The filtered result is compact, so `map()` reads:

```javascript
[3, 4]
```

Then it returns:

```javascript
[30, 40]
```

## Generic Behavior

Both methods are generic.

That means they can be borrowed for array-like objects.

```javascript
const arrayLikeScores = {
  0: 72,
  1: 91,
  2: 64,
  length: 3,
}

Array.prototype.filter
  .call(arrayLikeScores, (score) => score >= 70)
  .map((score) => `score: ${score}`)
// [ 'score: 72', 'score: 91' ]
```

The borrowed `filter()` returns a real array, so the next `.map()` can be called
directly.

For the shared explanation of borrowed methods, see:

```text
src/array/methods/instance/prototype/concept/array-prototype.md
```

## Boundary With `flatMap()`

Use `filter().map()` when the flow is:

```text
keep some items
turn each kept item into one output value
```

Use `flatMap()` when one input may become zero, one, or many output values.

```javascript
const sentences = ['learn arrays', '', 'practice daily']

sentences
  .filter((sentence) => sentence.length > 0)
  .flatMap((sentence) => sentence.split(' '))
// [ 'learn', 'arrays', 'practice', 'daily' ]
```

Here `flatMap()` is useful because each sentence becomes many words.

## Async Callback Gotchas

`filter()` does not wait for promises.

This is wrong if you expect async filtering:

```javascript
[1, 2, 3].filter(async (number) => number > 10)
// [1, 2, 3]
```

Why?

An async callback returns a `Promise`.

Promise objects are truthy, so every item is kept.

`map()` with an async callback returns promises.

```javascript
[1, 2].map(async (number) => number * 2)
// [Promise, Promise]
```

Use `Promise.all()` when you intentionally map to async work.

## Important Notes

1. `filter()` keeps or skips original values.
2. `map()` transforms values.
3. `filter().map()` means keep first, then transform.
4. The chain returns a new array.
5. The original array is not mutated by `filter()` or `map()`.
6. Objects inside filtered arrays are the same references unless you create new
   objects.
7. In a chain, each method receives the array it is called on.
8. Both methods skip empty slots.
9. Both methods are generic and can work with array-like objects.
10. Async callbacks are a gotcha for both methods.

## When To Use It

Use `filter().map()` when you need a clean two-step pipeline:

```text
select items
shape output
```

Good fits:

```text
in-stock products -> product cards
active users -> display names
matching search results -> result labels
valid form rows -> payload objects
passing scores -> score labels
```

Use a different method when the question is different:

```text
Only need selected items?          -> filter()
Only need transformed values?      -> map()
Need zero/one/many outputs?        -> flatMap()
Need one final value?              -> reduce()
Need the first matching value?     -> find()
Need a yes/no answer?              -> some() or every()
```

## Common Mistakes

### Mistake 1: Returning The New Value From `filter()`

```javascript
products.filter((product) => product.name)
```

This does not return product names.

It keeps products whose `name` is truthy.

Use `map()` for the transformation:

```javascript
products.map((product) => product.name)
```

### Mistake 2: Forgetting `return` In `map()`

```javascript
[1, 2, 3].map((number) => {
  number * 2
})
// [undefined, undefined, undefined]
```

Fix:

```javascript
[1, 2, 3].map((number) => {
  return number * 2
})
// [2, 4, 6]
```

Or:

```javascript
[1, 2, 3].map((number) => number * 2)
// [2, 4, 6]
```

### Mistake 3: Using Async Callback Directly With `filter()`

```javascript
items.filter(async (item) => {
  return await isValid(item)
})
```

This keeps the promise objects, not the awaited boolean results.

Use a separate async flow instead.

### Mistake 4: Forcing A Chain When One Method Is Enough

```javascript
numbers.filter((number) => number > 0).map((number) => number)
```

The `map()` does not change anything.

Use only:

```javascript
numbers.filter((number) => number > 0)
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/map-filter/map-filter.js
```

The runnable file contains labelled terminal examples, inline comments, and
expected output comments for the main cases.

## References

- MDN:
  [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- MDN:
  [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- ECMAScript spec:
  [`Array.prototype.filter`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.filter)
- ECMAScript spec:
  [`Array.prototype.map`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.map)
