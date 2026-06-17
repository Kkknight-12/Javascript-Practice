# Custom Sort Practice

## What Are We Building?

This page builds a learning version of array sorting.

We will call it:

```javascript
sortFromScratchPractice()
```

The goal is to understand compare functions and swap logic.

## How The Real Method Behaves

`sort()` sorts the original array in place and returns the same array reference.

```javascript
const numbers = [3, 2, 5, 1]

const sorted = numbers.sort((current, next) => current - next)

sorted
// [1, 2, 3, 5]

sorted === numbers
// true
```

Important behavior:

1. Built-in `sort()` mutates the original array.
2. It returns the same array reference.
3. Without a compare function, values are converted to strings.
4. `(a, b) => a - b` sorts numbers in ascending order.
5. Use `toSorted()` when you want a sorted copy with modern JavaScript.

## Mental Model

```text
compare(current, next)

positive -> current should move after next
negative -> current should stay before next
zero     -> keep their relative order
```

For numbers:

```javascript
(current, next) => current - next
```

means ascending order.

## Custom Implementation

```javascript
Object.defineProperty(Array.prototype, 'sortFromScratchPractice', {
  value: function (compareFn) {
    const result = [...this]

    for (let outerIndex = 0; outerIndex < result.length; outerIndex++) {
      for (let innerIndex = 0; innerIndex < result.length - 1; innerIndex++) {
        const current = result[innerIndex]
        const next = result[innerIndex + 1]

        if (compareFn(current, next) > 0) {
          result[innerIndex] = next
          result[innerIndex + 1] = current
        }
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})
```

This practice version returns a sorted copy. That makes the learning example
safer, but it is not exactly the same as built-in `sort()`.

## Step-By-Step Dry Run

```javascript
const numbers = [3, 2, 5, 1]
```

First pass:

```text
compare 3 and 2
3 - 2 = 1
positive -> swap
[2, 3, 5, 1]

compare 3 and 5
3 - 5 = -2
negative -> keep
[2, 3, 5, 1]

compare 5 and 1
5 - 1 = 4
positive -> swap
[2, 3, 1, 5]
```

More passes continue until the small values bubble toward the front.

Final result:

```javascript
[1, 2, 3, 5]
```

## Common Mistakes

### Mistake 1: Forgetting That Built-In `sort()` Mutates

```javascript
const numbers = [3, 1, 2]

numbers.sort((a, b) => a - b)

numbers
// [1, 2, 3]
```

### Mistake 2: Sorting Numbers Without A Compare Function

```javascript
[1, 30, 4, 21, 100000].sort()
// [1, 100000, 21, 30, 4]
```

That happens because default sort compares strings.

Fix:

```javascript
[1, 30, 4, 21, 100000].sort((a, b) => a - b)
// [1, 4, 21, 30, 100000]
```

### Mistake 3: Thinking This Practice Version Is Built-In `sort()`

Our `sortFromScratchPractice()` returns a sorted copy.

Built-in `sort()` mutates and returns the same array.

## Important Notes

1. `sort()` reorders values.
2. Built-in `sort()` mutates the original array.
3. Compare functions decide pair order.
4. Positive return means first value should move after second value.
5. Negative return means first value should stay before second value.
6. Default sort compares strings.
7. This custom method is learning code, not production replacement code.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/prototype/practice/custom-sort/custom-sort.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Reference

- [MDN: Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

