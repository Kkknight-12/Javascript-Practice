# Array.prototype.flatMap()

## What Problem Does It Solve?

`flatMap()` lets one input item become zero, one, or many output items.

It maps each element first, then flattens the mapped result by one level.

```javascript
const numbers = [1, 2, 3]

numbers.flatMap((number) => [number, number * 2])
// [1, 2, 2, 4, 3, 6]
```

It is useful when each item may produce a small list.

Examples:

```text
sentences -> words
products -> product tags
stations -> connected station pairs
numbers -> remove, keep, or expand values
```

## Quick Definition

`flatMap()` is an Array instance method.

```javascript
array.flatMap(callbackFn)
array.flatMap(callbackFn, thisArg)
```

It returns a new array.

It does not mutate the original array.

It is similar to:

```javascript
array.map(callbackFn).flat(1)
```

## Mental Model

Think:

```text
Start with an empty result array.

For each existing element:
  run the callback
  take the callback result
  flatten that result by one level
  add it to the result array

Return the new result array.
```

Short version:

```text
flatMap() = map each item, then flat(1)
```

## Basic Example

```javascript
const numbers = [1, 2, 3, 4]

numbers.flatMap((number) => [number * 2])
// [2, 4, 6, 8]
```

The callback returns a one-item array for each number.

`flatMap()` opens those one-item arrays by one level.

## `map()` Compared With `flatMap()`

`map()` keeps one result slot for each input item.

```javascript
const numbers = [1, 2, 3, 4]

numbers.map((number) => [number * 2])
// [[2], [4], [6], [8]]
```

The callback returned arrays, so `map()` returned an array of arrays.

`flatMap()` does the mapping and then flattens one level.

```javascript
numbers.flatMap((number) => [number * 2])
// [2, 4, 6, 8]
```

This gives the same result as:

```javascript
numbers.map((number) => [number * 2]).flat()
// [2, 4, 6, 8]
```

## Only One Level Is Flattened

`flatMap()` flattens by depth `1`.

It does not deeply flatten.

```javascript
const numbers = [1, 2, 3, 4]

numbers.flatMap((number) => [[number * 2]])
// [[2], [4], [6], [8]]
```

Why?

```text
callback returns [[2]]
flatMap() opens one level
result keeps [2]
```

If you need deeper flattening, use `map()` and then `flat()` with the depth you
actually want.

```javascript
numbers.map((number) => [[number * 2]]).flat(2)
// [2, 4, 6, 8]
```

## Zero, One, Or Many Outputs

This is the most important practical idea.

Inside `flatMap()`:

```text
return []         -> remove this item
return [value]    -> output one item
return [a, b]     -> output many items
return normalValue -> output that value directly
```

Example:

```javascript
const numbers = [3, 4, -1, 0, 5]

numbers.flatMap((number) => {
  if (number < 0) {
    return []
  }

  if (number % 2 === 0) {
    return [number]
  }

  return [number - 1, 1]
})
// [2, 1, 4, 0, 4, 1]
```

What happened?

```text
3  -> [2, 1]
4  -> [4]
-1 -> []
0  -> [0]
5  -> [4, 1]
```

Then the returned arrays were flattened by one level.

## Returning A Non-Array Value

The callback does not have to return an array.

If it returns a non-array value, that value is added directly.

```javascript
[1, 2, 3].flatMap((number) => number * 10)
// [10, 20, 30]
```

This behaves like `map()` for this simple case.

`flatMap()` becomes more useful when some callback results are arrays.

## Splitting Sentences Into Words

```javascript
const sentences = ['learn array methods', 'practice daily']

sentences.flatMap((sentence) => sentence.split(' '))
// ['learn', 'array', 'methods', 'practice', 'daily']
```

Each sentence becomes an array of words.

`flatMap()` combines those word arrays into one array.

## Callback Arguments

The callback receives:

```javascript
flatMap((value, index, array) => {
  // return an array or normal value
})
```

The third argument is the array that `flatMap()` is reading.

It is not the new result array being built.

Example: create station pairs.

```javascript
const stations = ['New Haven', 'West Haven', 'Milford (closed)', 'Stratford']

const routePairs = stations
  .filter((station) => !station.endsWith('(closed)'))
  .flatMap((station, index, array) => {
    if (index === array.length - 1) {
      return []
    }

    return [`${station} -> ${array[index + 1]}`]
  })

routePairs
// ['New Haven -> West Haven', 'West Haven -> Stratford']
```

The last station returns `[]` because there is no next station.

## `thisArg`

`flatMap()` can receive a second argument called `thisArg`.

```javascript
array.flatMap(callbackFn, thisArg)
```

Use a normal function if you want `thisArg` to become `this`.

```javascript
const products = [
  { name: 'Apples', tags: ['fruit', 'fresh'] },
  { name: 'Notebook', tags: ['stationery'] },
]

const rule = {
  prefix: 'tag:',
}

products.flatMap(function (product) {
  return product.tags.map((tag) => `${this.prefix}${tag}`)
}, rule)
// ['tag:fruit', 'tag:fresh', 'tag:stationery']
```

Arrow functions do not get their own `this`, so they are not useful for this
specific `thisArg` pattern.

## Sparse Arrays

Sparse arrays have empty slots.

`flatMap()` does not call the callback for empty slots in the source array.

```javascript
const values = [1, , 3]
const visitedIndexes = []

const result = values.flatMap((number, index) => {
  visitedIndexes.push(index)
  return [number, number * 2]
})

visitedIndexes
// [0, 2]

result
// [1, 2, 3, 6]
```

The callback skipped index `1` because that slot was empty.

Empty slots inside arrays returned by the callback are also removed by the
flattening step.

```javascript
[1, 2, 3].flatMap((number) => [, number * 10])
// [10, 20, 30]
```

## Returned Array-Like Objects Are Not Flattened

The callback return value must be a real array if you want it flattened.

```javascript
[1, 2].flatMap((number) => ({
  0: number,
  length: 1,
}))
// [{ 0: 1, length: 1 }, { 0: 2, length: 1 }]
```

The returned objects are array-like, but they are not real arrays.

So `flatMap()` keeps each object as one value.

## Generic Behavior

`flatMap()` itself is generic.

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
  0: 1,
  1: 2,
  2: 3,
  3: 4,
}

Array.prototype.flatMap.call(arrayLike, (number) => [number, number * 2])
// [1, 2, 2, 4, 3, 6]
```

The property `3` is ignored because `length` is `3`.

Valid indexes are `0`, `1`, and `2`.

## Async Callback Gotcha

`flatMap()` does not wait for async callbacks.

```javascript
[1, 2].flatMap(async (number) => [number * 2])
// [Promise, Promise]
```

An async function always returns a Promise.

Those Promise objects are not arrays, so `flatMap()` does not flatten the arrays
inside them later.

Use `Promise.all()` and a separate flattening step when async work is involved.

## `flatMap()` Vs `flat()`

`flat()` only flattens existing nested arrays.

```javascript
[[1, 2], [3, 4]].flat()
// [1, 2, 3, 4]
```

`flatMap()` first transforms each item, then flattens one level.

```javascript
[1, 2, 3].flatMap((number) => [number, number * 2])
// [1, 2, 2, 4, 3, 6]
```

Use `flat()` when the nesting already exists.

Use `flatMap()` when the callback creates the small arrays.

## `flatMap()` Vs `filter().map()`

`filter().map()` is usually clearer when your logic has two separate steps:

```text
1. keep matching items
2. transform each kept item
```

`flatMap()` is useful when one callback naturally decides output count:

```text
remove this item
keep one transformed item
expand into multiple items
```

This repo has a separate `map-filter` page later, so this page keeps the
comparison short.

## Common Mistakes

### Mistake 1: Expecting Deep Flattening

```javascript
[1, 2].flatMap((number) => [[number * 2]])
// [[2], [4]]
```

`flatMap()` only flattens one level.

### Mistake 2: Forgetting `[]` Removes An Item

```javascript
[1, 2, 3].flatMap((number) => {
  if (number % 2 === 0) {
    return []
  }

  return [number]
})
// [1, 3]
```

Returning `[]` means "add nothing for this input item."

### Mistake 3: Returning Array-Like Objects And Expecting Flattening

```javascript
[1].flatMap((number) => ({ 0: number, length: 1 }))
// [{ 0: 1, length: 1 }]
```

Only real arrays are flattened.

### Mistake 4: Using An Async Callback

```javascript
[1, 2].flatMap(async (number) => [number * 2])
// [Promise, Promise]
```

`flatMap()` is synchronous.

It does not wait for the Promise result.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/flatMap/flatMap.js
```

The `.js` file includes commented examples and expected output comments beside
the terminal logs.

## Review Checklist

- [x] `flatMap()` returns a new array.
- [x] `flatMap()` is like `map()` followed by `flat(1)`.
- [x] It flattens only one level.
- [x] Returning `[]` removes an item from the output.
- [x] Returning a one-item array keeps or transforms one output item.
- [x] Returning a multi-item array expands one input into many outputs.
- [x] Returning a non-array value appends that value directly.
- [x] The callback receives `value`, `index`, and `array`.
- [x] Empty source slots are skipped.
- [x] Empty slots inside returned arrays are removed.
- [x] Returned array-like objects are not flattened.
- [x] The runnable file can be executed with Node.

## References

- [MDN: Array.prototype.flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)
