# Flatten Nested Array - Iterative Notes

## Problem First

Input:

```js
[1, [2, [3]], 4, [5]]
```

Expected output:

```js
[1, 2, 3, 4, 5]
```

This solution avoids recursion. It uses a loop to keep flattening one level at a
time.

## Key Insight

One `concat()` pass can open one level.

So the loop idea is:

```text
while the array still contains an array,
open one more level
```

The loop stops only when every item is already a non-array value.

## Code

```js
function flattenIterative(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('flattenIterative expects an array');
  }

  let result = values.slice();

  while (result.some(Array.isArray)) {
    result = [].concat(...result);
  }

  return result;
}
```

## Why `slice()` Is Used

```js
let result = values.slice();
```

`slice()` without arguments creates a shallow copy of the outer array.

The loop will replace `result` again and again, so starting with a copy keeps
the original input variable untouched.

## Why `some(Array.isArray)` Is Used

```js
while (result.some(Array.isArray)) {
  // ...
}
```

`some()` checks whether at least one item passes the test.

Here the test is `Array.isArray`.

So this condition means:

```text
Does result still contain at least one nested array?
```

If yes, the loop runs again.

If no, the array is flat.

## Why `[].concat(...result)` Works

```js
result = [].concat(...result);
```

`concat()` has useful one-level behavior:

```text
normal value -> add it directly
array value  -> copy its elements one level into the result
```

Example:

```js
[].concat(1, [2, [3]], 4);
// [1, 2, [3], 4]
```

Notice that `[3]` is still nested. `concat()` opened only one level.

That is why the loop repeats.

## Variables / State Table

| name | meaning |
|---|---|
| `values` | original input array |
| `result` | current version of the array |
| `values.slice()` | creates the first shallow copy |
| `result.some(Array.isArray)` | checks whether more flattening is needed |
| `[].concat(...result)` | opens one nested level |

## Conditions

| condition | meaning | action |
|---|---|---|
| `!Array.isArray(values)` | caller did not pass an array | throw `TypeError` |
| `result.some(Array.isArray)` | at least one nested array still exists | flatten one more level |
| no item is an array | the array is fully flat | stop the loop |

## Adjustment Logic

| step | action | why |
|---:|---|---|
| `1` | copy `values` into `result` | start without replacing the original input variable |
| `2` | check `result.some(Array.isArray)` | decide whether more flattening is needed |
| `3` | run `[].concat(...result)` | open one nested level |
| `4` | assign the new array back to `result` | use the flatter array for the next check |
| `5` | repeat until no array remains | fully flatten unknown depth |

## Execution Table

For this input:

```js
[1, [2, [3]], 4, [5]]
```

| pass | `result` before pass | array still inside? | `result` after pass |
|---:|---|---|---|
| `0` | `[1, [2, [3]], 4, [5]]` | yes | not changed yet |
| `1` | `[1, [2, [3]], 4, [5]]` | yes | `[1, 2, [3], 4, 5]` |
| `2` | `[1, 2, [3], 4, 5]` | yes | `[1, 2, 3, 4, 5]` |
| stop | `[1, 2, 3, 4, 5]` | no | return result |

## Common Mistakes

### Mistake 1: Thinking `concat()` Flattens Everything

`concat()` opens arrays one level only.

For deep flattening, it must be repeated in a loop, or you can use
`flat(Infinity)`.

### Mistake 2: Forgetting To Reassign `result`

```js
[].concat(...result);
```

This creates a new array, but the function loses it.

Use:

```js
result = [].concat(...result);
```

### Mistake 3: Passing Array-Like Objects

This helper expects a real array.

An array-like object such as `{ 0: 1, length: 1 }` is not treated as an array.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/questions/flatten/optimal-iterative.js
```
