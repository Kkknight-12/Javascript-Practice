# Flatten Nested Array - Recursive Notes

## Problem First

Input:

```js
[1, [2, [3]], 4, [5]]
```

Expected output:

```js
[1, 2, 3, 4, 5]
```

The array can be nested to unknown depth, so a fixed number of manual
flattening passes is not enough.

## Key Insight

Every value asks the same question:

```text
Is this value an array?
```

If the answer is no:

```text
keep the value
```

If the answer is yes:

```text
flatten that inner array first
```

That is why recursion fits naturally. An inner array is just a smaller version
of the same problem.

## Code

```js
function flattenRecursive(values) {
  // Guard clause: this helper is written for real arrays only.
  // Throwing early gives a clear error instead of silently treating bad input as iterable data.
  if (!Array.isArray(values)) {
    throw new TypeError('flattenRecursive expects an array');
  }

  // Each function call owns its own result array.
  // Inner recursive calls build their own result and return it to the parent call.
  const result = [];

  // for...of reads the actual values.
  // Flattening cares about each value, not about numeric indexes.
  for (const value of values) {
    if (Array.isArray(value)) {
      // Array value means we found a smaller flatten problem.
      // The recursive call returns a flat array for this inner value.
      //
      // Spread (...) is important here:
      // result.push(...[2, 3]) adds 2 and 3 as separate values.
      // Without spread, result.push([2, 3]) would keep a nested array.
      result.push(...flattenRecursive(value));
    } else {
      // Non-array values are already flat.
      // Keep them exactly as they are.
      result.push(value);
    }
  }

  // Return the flat values collected by this call.
  // If this was an inner call, the parent will spread these values into its own result.
  return result;
}
```

## Line By Line

### Step 1: Check The Input

```js
if (!Array.isArray(values)) {
  throw new TypeError('flattenRecursive expects an array');
}
```

This function is made to flatten arrays. If someone passes a string, number, or
plain object, the function throws a clear error instead of doing something
confusing.

### Step 2: Create A Result Array

```js
const result = [];
```

`result` collects the final flat values for the current function call.

### Step 3: Read Every Value

```js
for (const value of values) {
  // ...
}
```

For this input:

```js
[1, [2, [3]], 4, [5]]
```

the loop reads:

```text
1
[2, [3]]
4
[5]
```

### Step 4: If The Value Is An Array, Flatten It First

```js
if (Array.isArray(value)) {
  result.push(...flattenRecursive(value));
}
```

If `value` is `[2, [3]]`, the function calls:

```js
flattenRecursive([2, [3]]);
```

That call returns:

```js
[2, 3]
```

Then spread syntax adds those returned values one by one:

```js
result.push(...[2, 3]);
```

This behaves like:

```js
result.push(2, 3);
```

So the nested array does not remain nested.

### Step 5: If The Value Is Not An Array, Keep It

```js
else {
  result.push(value);
}
```

If the current value is `1`, it is already flat. The function pushes it
directly.

### Step 6: Return The Result

```js
return result;
```

After the loop finishes, the current call returns its flattened values to the
caller.

## Variables / State Table

| name | meaning |
|---|---|
| `values` | the current array being flattened |
| `value` | one item from the current array |
| `result` | flat values collected by the current call |
| `Array.isArray(value)` | decides whether to open the value or keep it |
| `flattenRecursive(value)` | solves the same problem for an inner array |

## Conditions

| condition | meaning | action |
|---|---|---|
| `!Array.isArray(values)` | caller did not pass an array | throw `TypeError` |
| `Array.isArray(value)` | current item is another array | recursively flatten it |
| `!Array.isArray(value)` | current item is already a normal value | push it directly |

## Adjustment Logic

| step | action | why |
|---:|---|---|
| `1` | create `result = []` | collect flattened values for this call |
| `2` | read one `value` | decide what kind of value it is |
| `3` | if `value` is an array, call `flattenRecursive(value)` | solve the smaller nested problem |
| `4` | spread the returned values into `result.push(...)` | add inner values one by one |
| `5` | if `value` is not an array, push it directly | it is already flat |
| `6` | return `result` | give the flattened array back to the caller |

## Recursive Visual Tree

Input:

```js
[1, [2, [3]], 4, [5]]
```

Goal:

```text
Return [1, 2, 3, 4, 5]
```

Think of each line as a small node.

Each node should show:

```text
current call or action
current value being checked
whether the value is kept or opened
what the call returns
```

Recursion tree:

```text
root  flattenRecursive([1, [2, [3]], 4, [5]]) (result=[])
│
├── value 1 -> not array -> keep
│   │
│   └── result becomes [1]
│
├── value [2, [3]] -> array -> recurse
│   │
│   └── flattenRecursive([2, [3]]) (inner result=[])
│       │
│       ├── value 2 -> not array -> keep
│       │   │
│       │   └── inner result becomes [2]
│       │
│       ├── value [3] -> array -> recurse
│       │   │
│       │   └── flattenRecursive([3]) (inner result=[])
│       │       │
│       │       ├── value 3 -> not array -> keep
│       │       │   │
│       │       │   └── inner result becomes [3]
│       │       │
│       │       └── return [3]
│       │
│       ├── spread returned [3]
│       │   │
│       │   └── inner result becomes [2, 3]
│       │
│       └── return [2, 3]
│
├── spread returned [2, 3]
│   │
│   └── result becomes [1, 2, 3]
│
├── value 4 -> not array -> keep
│   │
│   └── result becomes [1, 2, 3, 4]
│
├── value [5] -> array -> recurse
│   │
│   └── flattenRecursive([5]) (inner result=[])
│       │
│       ├── value 5 -> not array -> keep
│       │   │
│       │   └── inner result becomes [5]
│       │
│       └── return [5]
│
├── spread returned [5]
│   │
│   └── result becomes [1, 2, 3, 4, 5]
│
└── return [1, 2, 3, 4, 5]
```

Execution table:

| step | call / action | current call result | returned value |
|---:|---|---|---|
| `1` | start `flattenRecursive([1, [2, [3]], 4, [5]])` | `[]` | not ready |
| `2` | keep `1` | `[1]` | not ready |
| `3` | recurse into `[2, [3]]` | `[1]` | waits for inner return |
| `4` | inside `[2, [3]]`, keep `2` | `[2]` | not ready |
| `5` | recurse into `[3]` | `[2]` | waits for inner return |
| `6` | inside `[3]`, keep `3` | `[3]` | `[3]` |
| `7` | spread returned `[3]` into `[2, [3]]` call | `[2, 3]` | `[2, 3]` |
| `8` | spread returned `[2, 3]` into root call | `[1, 2, 3]` | not ready |
| `9` | keep `4` | `[1, 2, 3, 4]` | not ready |
| `10` | recurse into `[5]` | `[1, 2, 3, 4]` | waits for inner return |
| `11` | inside `[5]`, keep `5` | `[5]` | `[5]` |
| `12` | spread returned `[5]` into root call | `[1, 2, 3, 4, 5]` | `[1, 2, 3, 4, 5]` |

## Common Mistakes

### Mistake 1: Pushing The Inner Array Directly

```js
result.push(flattenRecursive(value));
```

This would add the returned array as one item.

For `[2, [3]]`, it would push:

```js
[2, 3]
```

as a nested array.

Use spread:

```js
result.push(...flattenRecursive(value));
```

### Mistake 2: Forgetting The Array Check

Without `Array.isArray(value)`, the function cannot decide whether to open a
value or keep it.

### Mistake 3: Thinking Flattening Clones Objects

Flattening removes nested array structure.

It does not deep-copy object values inside the array.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/questions/flatten/optimal-recursive.js
```
