# Flatten Nested Array

## Problem Samjho

Flattening means turning a nested array into one simple array.

Input:

```js
[1, [2, [3]], 4, [5]]
```

Output:

```js
[1, 2, 3, 4, 5]
```

The array can contain values at different depths. The solution should keep
normal values, but open inner arrays until no nested arrays are left.

## Examples

### Example 1

```js
const values = [1, [2, [3]], 4, [5]];

flatten(values);
// [1, 2, 3, 4, 5]
```

### Example 2

```js
const values = ['start', [null, [{ theme: 'dark' }]], [[undefined]], 'end'];

flatten(values);
// ['start', null, { theme: 'dark' }, undefined, 'end']
```

Flattening changes the array structure. It does not clone objects inside the
array.

### Example 3

```js
const values = [1, [], [2, []], 3];

flatten(values);
// [1, 2, 3]
```

Empty arrays disappear because they do not contain any values to keep.

## What We Need To Learn

The important check is:

```js
Array.isArray(value);
```

For every value, the solution asks:

```text
Is this value an array?
```

If yes, open it.

If no, keep it.

## Approach Files

```text
src/array/questions/flatten/
  brute-force.js
  optimal-recursive.js
  optimal-iterative.js
  notes/
    brute-force-notes.md
    optimal-recursive-notes.md
    optimal-iterative-notes.md
```

Start with `brute-force.js` to see why known-depth flattening is limited.

Then read:

- `optimal-recursive.js` for the recursive solution,
- `optimal-iterative.js` for the loop-based solution.

## Built-In JavaScript Method

JavaScript already has:

```js
array.flat(Infinity);
```

That is the built-in answer. The manual solutions are still useful because they
teach recursion, loops, `Array.isArray()`, and one-level flattening.
