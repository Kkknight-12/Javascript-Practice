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
  if (!Array.isArray(values)) {
    throw new TypeError('flattenRecursive expects an array');
  }

  const result = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      result.push(...flattenRecursive(value));
    } else {
      result.push(value);
    }
  }

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

```text
flattenRecursive([1, [2, [3]], 4, [5]])
|
|-- value 1 is normal
|   `-- result = [1]
|
|-- value [2, [3]] is array
|   `-- flattenRecursive([2, [3]])
|       |
|       |-- value 2 is normal
|       |   `-- inner result = [2]
|       |
|       `-- value [3] is array
|           `-- flattenRecursive([3])
|               `-- returns [3]
|
|-- spread returned [2, 3]
|   `-- result = [1, 2, 3]
|
|-- value 4 is normal
|   `-- result = [1, 2, 3, 4]
|
`-- value [5] is array
    `-- flattenRecursive([5]) returns [5]
        `-- final result = [1, 2, 3, 4, 5]
```

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
