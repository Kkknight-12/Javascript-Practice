# Custom Reduce Practice

## What Are We Building?

This page builds a learning version of `Array.prototype.reduce()`.

We will call it:

```javascript
reduceFromScratchPractice()
```

The goal is to understand the accumulator.

## How The Real Method Behaves

`reduce()` runs a callback over array values and returns one final value.

```javascript
const numbers = [1, 2, 3]

numbers.reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 6
```

Important behavior:

1. The callback receives `accumulator`, `currentValue`, `currentIndex`, and
   `array`.
2. The callback return value becomes the next accumulator.
3. The final accumulator becomes the return value of `reduce()`.
4. If an initial value is provided, iteration starts at index `0`.
5. If no initial value is provided, the first existing item becomes the
   accumulator.
6. Empty arrays without an initial value throw `TypeError`.

## Mental Model

```text
start accumulator = 0

take 1 -> 0 + 1 = 1
take 2 -> 1 + 2 = 3
take 3 -> 3 + 3 = 6

final result = 6
```

## Custom Implementation

```javascript
Object.defineProperty(Array.prototype, 'reduceFromScratchPractice', {
  value: function (callback, initialValue) {
    let index = 0
    let accumulator = initialValue

    if (arguments.length < 2) {
      while (index < this.length && !(index in this)) {
        index++
      }

      if (index >= this.length) {
        throw new TypeError('Reduce of empty array with no initial value')
      }

      accumulator = this[index]
      index++
    }

    for (; index < this.length; index++) {
      if (index in this) {
        accumulator = callback(accumulator, this[index], index, this)
      }
    }

    return accumulator
  },
  configurable: true,
  writable: true,
})
```

## Step-By-Step Dry Run

```javascript
const numbers = [1, 2, 3]

numbers.reduceFromScratchPractice((accumulator, number) => {
  return accumulator + number
}, 0)
```

Dry run:

```text
start accumulator = 0

index 0 -> callback(0, 1, 0, numbers) -> 1
accumulator = 1

index 1 -> callback(1, 2, 1, numbers) -> 3
accumulator = 3

index 2 -> callback(3, 3, 2, numbers) -> 6
accumulator = 6

return 6
```

## With And Without Initial Value

With initial value:

```javascript
[1, 2, 3].reduce((accumulator, number) => accumulator + number, 0)
```

Starts like this:

```text
accumulator = 0
currentValue = 1
```

Without initial value:

```javascript
[1, 2, 3].reduce((accumulator, number) => accumulator + number)
```

Starts like this:

```text
accumulator = 1
currentValue = 2
```

## Common Mistakes

### Mistake 1: Forgetting To Return The Accumulator

Wrong:

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  accumulator + number
}, 0)
```

Fix:

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
```

### Mistake 2: Reducing An Empty Array Without Initial Value

```javascript
[].reduce((accumulator, number) => accumulator + number)
// TypeError
```

Fix:

```javascript
[].reduce((accumulator, number) => accumulator + number, 0)
// 0
```

### Mistake 3: Making Simple Code Harder

`reduce()` is powerful, but not always the clearest tool.

For simple loops, a `for...of` loop can be easier to read.

## Important Notes

1. `reduce()` returns one final value.
2. The accumulator carries work from one item to the next.
3. The callback must return the next accumulator.
4. Initial value makes the first step easier to reason about.
5. Empty arrays need an initial value.
6. Empty slots are skipped.
7. This custom method is learning code, not production replacement code.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Reference

- [MDN: Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

