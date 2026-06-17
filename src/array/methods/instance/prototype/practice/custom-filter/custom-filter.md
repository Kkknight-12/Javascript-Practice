# Custom Filter Practice

## What Are We Building?

This page builds a learning version of `Array.prototype.filter()`.

We will call it:

```javascript
myFilterPractice()
```

The goal is to understand how `filter()` keeps or skips items.

## How The Real Method Behaves

`filter()` tests each existing array item and returns a new array with only the
items that pass.

```javascript
const numbers = [2, 3, 4, 5, 6]

numbers.filter((number) => number > 3)
// [4, 5, 6]
```

Important behavior:

1. It calls the callback with `value`, `index`, and `array`.
2. If the callback returns truthy, the original item is kept.
3. If the callback returns falsy, the item is skipped.
4. It returns a new shallow-copy array.
5. It does not mutate the original array.
6. It skips empty slots in sparse arrays.

## Mental Model

```text
input:     [2, 3, 4, 5, 6]
condition: number > 3
output:    [4, 5, 6]
```

`filter()` means:

```text
test every existing item
if test is truthy, keep the original item
if test is falsy, skip it
```

## Custom Implementation

```javascript
Object.defineProperty(Array.prototype, 'myFilterPractice', {
  value: function (callback) {
    const result = []

    for (let index = 0; index < this.length; index++) {
      if (index in this && callback(this[index], index, this)) {
        result.push(this[index])
      }
    }

    return result
  },
  configurable: true,
  writable: true,
})
```

Important line:

```javascript
result.push(this[index])
```

We push the original item, not the callback result.

## Step-By-Step Dry Run

```javascript
const numbers = [2, 3, 4, 5, 6]

numbers.myFilterPractice((number) => number > 3)
```

Dry run:

```text
start result = []

2 -> false -> skip
3 -> false -> skip
4 -> true  -> push 4
5 -> true  -> push 5
6 -> true  -> push 6

return [4, 5, 6]
```

## Common Mistakes

### Mistake 1: Pushing The Callback Result

Wrong:

```javascript
if (callback(this[index])) {
  result.push(callback(this[index]))
}
```

This gives:

```javascript
[true, true, true]
```

Correct:

```javascript
if (callback(this[index])) {
  result.push(this[index])
}
```

### Mistake 2: Expecting `filter()` To Transform Values

`filter()` keeps original values.

Use `map()` if you want to transform values.

### Mistake 3: Expecting Empty Slots To Be Visited

```javascript
[1, , 3].filter((number) => number >= 1)
// [1, 3]
```

The empty slot is skipped.

## Important Notes

1. `filter()` keeps or skips values.
2. It returns a new array.
3. The original array stays unchanged.
4. The callback result decides whether to keep the original item.
5. Empty slots are skipped.
6. This custom method is learning code, not production replacement code.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/prototype/practice/custom-filter/custom-filter.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Reference

- [MDN: Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

