# `for await...of`

## What Problem Does It Solve?

Sometimes values do not arrive all at once.

Examples:

- chunks from a stream
- values from an async generator
- promises that should be handled one by one
- paginated data that arrives step by step

`for await...of` lets you loop over those values in a readable way.

## Quick Definition

`for await...of` loops over an async iterable. It waits for each next value
before running the loop body.

It can also loop over a normal sync iterable, but it still awaits each value.

## Mental Model

```text
for...of       -> give me the next value
for await...of -> wait for the next value, then give it to me
```

## Syntax

```javascript
for await (const value of iterable) {
  // use value
}
```

Important:

`for await...of` must run where `await` is allowed:

- inside an `async` function
- or at the top level of an ES module

## Async Generator Example

An async generator uses `async function*`.

```javascript
async function* lessonSteps() {
  yield 'read problem'
  yield 'write code'
  yield 'run tests'
}

async function printSteps() {
  for await (const step of lessonSteps()) {
    console.log(step)
  }
}

printSteps()
```

Explanation:

`lessonSteps()` returns an async iterable. `for await...of` asks for one value,
waits for it, runs the loop body, then asks for the next value.

## Sync Iterable With Promises

`for await...of` can consume a normal iterable too.

```javascript
const scores = [
  Promise.resolve(10),
  Promise.resolve(20),
  Promise.resolve(30),
]

async function printScores() {
  for await (const score of scores) {
    console.log(score)
  }
}
```

Output:

```text
10
20
30
```

Explanation:

The array is a sync iterable, but its values are promises. `for await...of`
waits for each promise and gives the resolved value to the loop body.

## Compare With `for...of`

Normal `for...of` does not automatically await promise values.

```javascript
for (const scorePromise of scores) {
  console.log(scorePromise)
}
```

This gives promise objects, not resolved numbers.

## Cleanup On `break`

If a `for await...of` loop exits early, the iterator gets a chance to clean up.

```javascript
async function* tasks() {
  try {
    yield 'task 1'
    yield 'task 2'
    yield 'task 3'
  } finally {
    console.log('cleanup')
  }
}

async function runTasks() {
  for await (const task of tasks()) {
    if (task === 'task 2') break
  }
}
```

Explanation:

When the loop hits `break`, JavaScript calls the iterator cleanup path. In an
async generator, the `finally` block runs.

## Important Notes

1. `for await...of` works with async iterables.
2. It can also work with sync iterables.
3. It awaits each `next()` result before running the loop body.
4. It can unwrap promise values from sync iterables.
5. It is slower than `for...of` for plain sync values because it still awaits
   each iteration.
6. Use `break` or `continue` normally inside the loop.
7. If the loop exits early, iterator cleanup can run.

## When To Use It

### Async Generator Values

```javascript
async function readItems() {
  for await (const item of asyncGenerator()) {
    console.log(item)
  }
}
```

### Stream-Like Data

```javascript
async function readStream(stream) {
  for await (const chunk of stream) {
    console.log(chunk)
  }
}
```

### Sequential Promise Values

```javascript
async function readPromises(promises) {
  for await (const result of promises) {
    console.log(result)
  }
}
```

Use this when you want to handle values in order and wait at each step.

## Common Mistakes

### Mistake 1: Using It Outside An Async Context

```javascript
for await (const value of values) {
  console.log(value)
}
```

This only works inside an async function or module top level.

### Mistake 2: Using It For Plain Arrays

```javascript
for await (const value of ['a', 'b', 'c']) {
  console.log(value)
}
```

This works, but `for...of` is simpler when the values are already available.

### Mistake 3: Expecting Parallel Work

`for await...of` handles values one by one. If you need many independent
promises to run together, `Promise.all()` may be the better tool.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/loop/for-await-of/for-await-of.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## MDN References

- [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
- [Symbol.asyncIterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)
- [AsyncGenerator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
