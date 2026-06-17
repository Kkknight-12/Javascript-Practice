# Custom Map Practice

## What Are We Building?

This page builds a learning version of `Array.prototype.map()`.

We will call it:

```javascript
myMapPractice()
```

The goal is to understand how `map()` works internally, not to replace the real
built-in method.

## How The Real Method Behaves

`map()` transforms each existing array item and returns a new array.

```javascript
const numbers = [1, 2, 3]

numbers.map((number) => number * 2)
// [2, 4, 6]
```

Important behavior:

1. It calls the callback with `value`, `index`, and `array`.
2. It returns a new array.
3. It does not mutate the original array.
4. It skips empty slots in sparse arrays.

## Mental Model

```text
input:  [1, 2, 3]
rule:   number * 2
output: [2, 4, 6]
```

`map()` means:

```text
take every existing item
transform it
put the transformed value in the same index of a new array
```

## Custom Implementation

```javascript
Object.defineProperty(Array.prototype, 'myMapPractice', {
  value: function (callback) {
    const result = new Array(this.length)

    for (let index = 0; index < this.length; index++) {
      if (index in this) {
        result[index] = callback(this[index], index, this)
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})
```

Why `this`?

When we call:

```javascript
[1, 2, 3].myMapPractice(callback)
```

Inside the method:

```javascript
this
// [1, 2, 3]
```

## Step-By-Step Dry Run

```javascript
const numbers = [1, 2, 3]

numbers.myMapPractice((number) => number * 2)
```

Dry run:

```text
start result = [empty x 3]

index 0 -> callback(1, 0, numbers) -> 2
result[0] = 2

index 1 -> callback(2, 1, numbers) -> 4
result[1] = 4

index 2 -> callback(3, 2, numbers) -> 6
result[2] = 6

return [2, 4, 6]
```

## Common Mistakes

### Mistake 1: Forgetting To Return From Callback

```javascript
[1, 2, 3].map((number) => {
  number * 2
})
// [undefined, undefined, undefined]
```

Fix:

```javascript
[1, 2, 3].map((number) => number * 2)
// [2, 4, 6]
```

### Mistake 2: Using `map()` Only For Side Effects

If you do not use the returned array, `map()` is usually the wrong tool.

Use `forEach()` or `for...of` for side effects.

### Mistake 3: Expecting Empty Slots To Be Visited

```javascript
[1, , 3].map((number) => number * 10)
// [10, empty, 30]
```

`map()` skips empty slots.

## Important Notes

1. `map()` transforms values.
2. It returns a new array.
3. The original array stays unchanged.
4. The callback receives `value`, `index`, and `array`.
5. Empty slots are skipped.
6. This custom method is learning code, not production replacement code.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/prototype/practice/custom-map/custom-map.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Reference

- [MDN: Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

