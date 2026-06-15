# Array.fromAsync()

## What Problem Does It Solve?

Sometimes we need to collect values from something that produces data
asynchronously.

Examples:

- an async generator
- an async iterable
- a sync iterable that contains promises
- an array-like object that contains promises

`Array.fromAsync()` waits for those values and gives us one real array at the
end.

## Quick Definition

`Array.fromAsync()` is a static array method. It creates a new array from an
async iterable, iterable, or array-like object.

Important difference from `Array.from()`:

```text
Array.from()      -> returns an array
Array.fromAsync() -> returns a Promise that resolves to an array
```

Because it is static, call it on `Array` itself:

```javascript
Array.fromAsync(items)
```

Do not call it on an array instance:

```javascript
// items.fromAsync() // Wrong
```

## Mental Model

```text
Array.fromAsync(items)
= collect values one by one
= await async values when needed
= resolve with a real array
```

Simple rule:

```text
Use Array.fromAsync() when creating the array itself requires waiting.
```

## Syntax

```javascript
Array.fromAsync(items)
Array.fromAsync(items, mapFn)
Array.fromAsync(items, mapFn, thisArg)
```

## Parameters

- **items**: an async iterable, iterable, or array-like object to convert
- **mapFn**: optional function called for every item before it goes into the new
  array
- **thisArg**: optional value to use as `this` inside `mapFn`

## Return Value

A `Promise` whose resolved value is a new `Array` instance.

```javascript
const result = await Array.fromAsync(items)
```

## Input Type 1: Async Iterable

An async iterable gives values over time.

```javascript
async function* numbers() {
  yield 1
  yield 2
  yield 3
}

await Array.fromAsync(numbers()) // [1, 2, 3]
```

Explanation:

`Array.fromAsync()` waits for each value from the async generator, then collects
the values into one array.

## Input Type 2: Sync Iterable

`Array.fromAsync()` can also work with normal iterables like `Map` and `Set`.

```javascript
const scores = new Map([
  ['a', 10],
  ['b', 20],
])

await Array.fromAsync(scores) // [["a", 10], ["b", 20]]
```

Explanation:

The `Map` is not async, but `Array.fromAsync()` can still collect it. Since the
method always returns a Promise, we still use `await`.

## Input Type 3: Array-Like Object With Promises

```javascript
const arrayLikePromises = {
  0: Promise.resolve('first'),
  1: Promise.resolve('second'),
  length: 2,
}

await Array.fromAsync(arrayLikePromises) // ["first", "second"]
```

Explanation:

For sync iterable and array-like inputs, `Array.fromAsync()` awaits the values
before adding them to the final array.

## Using `mapFn`

`Array.fromAsync()` can convert and transform in one step.

```javascript
await Array.fromAsync([1, 2, 3], async (number) => number * 2)
// [2, 4, 6]
```

Explanation:

If `mapFn` returns a Promise, `Array.fromAsync()` waits for it before adding the
mapped value to the result array.

### Using `thisArg`

`thisArg` is the value used as `this` inside `mapFn`.

```javascript
const multiplier = { factor: 3 }

await Array.fromAsync(
  [1, 2, 3],
  async function (number) {
    return number * this.factor
  },
  multiplier,
)
// [3, 6, 9]
```

Use a normal `function` when you want `thisArg`. Arrow functions do not get
their own `this`.

## Difference From `Promise.all()`

Both can turn promises into an array:

```javascript
await Array.fromAsync([Promise.resolve(1), Promise.resolve(2)])
await Promise.all([Promise.resolve(1), Promise.resolve(2)])
```

But the behavior is not the same for every input.

Important difference:

- `Array.fromAsync()` consumes values sequentially.
- `Promise.all()` gets all values first and waits concurrently.

For a generator that creates promises lazily, this matters:

```javascript
function* delayedValues() {
  yield delay(20, 1)
  yield delay(20, 2)
  yield delay(20, 3)
}

await Array.fromAsync(delayedValues()) // waits one by one
await Promise.all(delayedValues()) // starts all promises quickly
```

## Important Notes

1. `Array.fromAsync()` is a static method.
2. It always returns a Promise.
3. It can read async iterables, sync iterables, and array-like objects.
4. For sync iterable and array-like inputs, values are awaited before they enter
   the result array.
5. If `mapFn` returns a Promise, the mapped result is awaited.
6. It is useful when the source produces values over time.

## When To Use It

### Collect Async Generator Results

```javascript
async function* fetchPages() {
  yield 'page-1'
  yield 'page-2'
}

await Array.fromAsync(fetchPages())
// ["page-1", "page-2"]
```

### Convert Promise Values Into A Real Array

```javascript
await Array.fromAsync([
  Promise.resolve('admin'),
  Promise.resolve('editor'),
])
// ["admin", "editor"]
```

### Transform While Collecting

```javascript
await Array.fromAsync([1, 2, 3], async (number) => number * 10)
// [10, 20, 30]
```

## Common Mistakes

### Mistake 1: Forgetting `await`

```javascript
const result = Array.fromAsync([Promise.resolve(1)])

console.log(result) // Promise, not the final array
```

Correct:

```javascript
const result = await Array.fromAsync([Promise.resolve(1)])
console.log(result) // [1]
```

### Mistake 2: Expecting It To Be Exactly Like `Array.from()`

```javascript
Array.from([1, 2, 3]) // [1, 2, 3]
Array.fromAsync([1, 2, 3]) // Promise
```

`Array.fromAsync()` is async even when the input is not async.

### Mistake 3: Using It When `Promise.all()` Is A Better Fit

If you already have an array of promises and want them to run concurrently,
`Promise.all()` may be the clearer choice.

```javascript
await Promise.all([promiseA, promiseB, promiseC])
```

Use `Array.fromAsync()` when you want to consume the source step by step, or
when the source is an async iterable.

## Runnable Practice File

Run the paired JavaScript file from the repo root:

```bash
node src/array/methods/static/Array.fromAsync/Array.fromAsync.js
```

That file contains commented examples, clear terminal labels, and expected
output comments.

## MDN Reference

[Array.fromAsync() - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync)
