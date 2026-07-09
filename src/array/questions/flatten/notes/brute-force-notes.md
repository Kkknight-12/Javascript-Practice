# Flatten Nested Array - Brute Force Notes

## Problem First

Input:

```js
[1, [2, [3]], 4, [5]]
```

Expected output:

```js
[1, 2, 3, 4, 5]
```

The simplest first idea is:

```text
Open the array one level.
If it is still nested, open it one more level.
```

## Known-Depth Idea

JavaScript `concat()` can open arrays one level when we spread the current
array into it:

```js
const values = [1, [2, [3]], 4, [5]];

const oneLevel = [].concat(...values);
// [1, 2, [3], 4, 5]

const twoLevels = [].concat(...oneLevel);
// [1, 2, 3, 4, 5]
```

This works only because we already know the input needs two passes.

## Why This Is Brute Force

The code is not discovering the depth.

It is manually saying:

```text
flatten once
flatten twice
stop
```

If the input changes to this:

```js
[1, [2, [3, [4]]]]
```

two passes are not enough:

```js
[1, 2, 3, [4]]
```

So the weakness is not `concat()`. The weakness is that the number of passes is
hard-coded.

## What This Teaches

The brute force idea gives us the next question:

```text
Can the code keep going until no nested arrays are left?
```

That leads to:

- recursion: open inner arrays by calling the same function again,
- iteration: keep running one-level flattening inside a loop.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/questions/flatten/brute-force.js
```
