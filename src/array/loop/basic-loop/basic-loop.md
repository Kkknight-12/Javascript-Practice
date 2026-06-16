# Basic Array Loops

## What Problem Does It Solve?

Arrays usually contain a list of values. A loop lets you visit each value one by
one and do some work.

Examples:

- print each value
- collect transformed values
- stop when a value is found
- skip some values
- use the index while reading the value

## Quick Definition

An array loop repeats code for array items.

Common options:

```javascript
for (let index = 0; index < array.length; index++) {}

for (const value of array) {}

array.forEach((value, index) => {})
```

## Mental Model

```text
Need index/control?   -> for
Need only values?     -> for...of
Need index + value?   -> for...of with entries()
Need simple side work?-> forEach()
Avoid for arrays?     -> for...in
```

## Classic `for` Loop

Use a classic `for` loop when you need the index or full loop control.

```javascript
const learners = ['Aman', 'Chaman', 'Baga']

for (let index = 0; index < learners.length; index++) {
  console.log(index, learners[index])
}
```

Explanation:

- `let index = 0` starts at the first array position.
- `index < learners.length` keeps the loop inside the array.
- `index++` moves to the next position.
- `learners[index]` reads the value at that index.

## `for...of`

Use `for...of` when you only need the value.

```javascript
for (const learner of learners) {
  console.log(learner)
}
```

Explanation:

This is easier to read when the index does not matter. The loop gives you one
array value at a time.

## `entries()` For Index And Value

Use `array.entries()` with `for...of` when you want both the index and the value.

```javascript
for (const [index, learner] of learners.entries()) {
  console.log(index, learner)
}
```

Explanation:

`entries()` creates pairs like `[0, 'Aman']`, `[1, 'Chaman']`, and so on.
Destructuring pulls the pair into `index` and `learner`.

## `forEach()`

Use `forEach()` for simple side effects.

```javascript
const upperCaseLearners = []

learners.forEach((learner) => {
  upperCaseLearners.push(learner.toUpperCase())
})
```

Explanation:

`forEach()` calls your callback once for each assigned array element. It returns
`undefined`, so use it when you want to do work, not when you want a new array
returned from the method.

If you want a new transformed array, `map()` is usually a better choice.

## `break` And `continue`

Use loop statements like `for` or `for...of` when you need `break` or
`continue`.

```javascript
for (const learner of learners) {
  if (learner === 'Chaman') continue
  if (learner === 'Dhoni') break

  console.log(learner)
}
```

Explanation:

- `continue` skips the current round and moves to the next item.
- `break` stops the loop.
- `forEach()` does not support normal `break` or `continue`.

## Avoid `for...in` For Arrays

`for...in` loops over property names, not array values.

```javascript
const topics = ['array', 'object']
topics.owner = 'javascript'

for (const key in topics) {
  console.log(key)
}
```

Output:

```text
0
1
owner
```

Explanation:

That is not usually what you want for arrays. Use `for`, `for...of`, or array
methods instead.

## Important Notes

1. Use `for` when you need the index or full control.
2. Use `for...of` when you only need values.
3. Use `entries()` when you need index and value together.
4. Use `forEach()` for simple side effects.
5. Do not use `forEach()` when you need `break`, `continue`, or async waiting.
6. Avoid `for...in` for arrays because it reads property names.

## When To Use It

### You Need The Index

```javascript
for (let index = 0; index < learners.length; index++) {
  console.log(index, learners[index])
}
```

### You Only Need The Value

```javascript
for (const learner of learners) {
  console.log(learner)
}
```

### You Need Index And Value

```javascript
for (const [index, learner] of learners.entries()) {
  console.log(index, learner)
}
```

### You Are Doing A Simple Side Effect

```javascript
learners.forEach((learner) => {
  console.log(learner)
})
```

## Common Mistakes

### Mistake 1: Using `for...in` For Array Values

```javascript
for (const value in learners) {
  console.log(value)
}
```

This prints keys/indexes, not values.

### Mistake 2: Using `forEach()` When You Need `break`

```javascript
learners.forEach((learner) => {
  if (learner === 'Baga') {
    // break is not allowed here
  }
})
```

Use `for` or `for...of` instead.

### Mistake 3: Using `forEach()` With Async Code

`forEach()` does not wait for promises. If each async step must finish before
the next step starts, use `for...of` with `await` inside an async function.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/loop/basic-loop/basic-loop.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## MDN References

- [Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)
- [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
