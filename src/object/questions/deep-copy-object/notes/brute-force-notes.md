# Deep Copy Object - Brute Force Notes

## Problem First

Input:

```js
const original = {
  user: {
    role: 'admin',
  },
};
```

Goal:

```js
const copy = deepClone(original);

copy.user.role = 'editor';

console.log(original.user.role);
// 'admin'
```

The original nested object should not change.

## First Idea

A common first idea is object spread:

```js
const copy = { ...original };
```

This creates a new outer object.

But it does not create a new nested `user` object.

## Dry Run

```js
const original = {
  user: {
    role: 'admin',
  },
};

const copy = { ...original };
```

After the spread:

```text
copy is a new object
copy.user and original.user point to the same nested object
```

So this mutation:

```js
copy.user.role = 'editor';
```

also changes:

```js
original.user.role;
```

## What This Teaches

Spread is a shallow copy.

It copies the first level only.

For deep copy, nested objects and nested arrays also need to be copied.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/questions/deep-copy-object/brute-force.js
```
