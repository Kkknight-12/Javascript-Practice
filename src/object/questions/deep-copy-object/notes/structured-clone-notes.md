# Deep Copy Object - `structuredClone()` Notes

## Problem First

Manual deep-copy helpers are useful for learning recursion, but JavaScript also
has a built-in deep clone API for structured-cloneable values:

```js
structuredClone(value);
```

## What It Does

`structuredClone()` creates a deep clone.

For supported values, nested objects and nested arrays become new references.

It also keeps some values that JSON cloning changes, such as `Date`.

```js
const source = {
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  tags: ['object', 'copy'],
};

const copy = structuredClone(source);

console.log(copy.createdAt instanceof Date);
// true

console.log(copy.tags !== source.tags);
// true
```

## Circular Reference Example

```js
const original = {
  name: 'cycle',
};

original.self = original;

const copy = structuredClone(original);

console.log(copy.self === copy);
// true
```

JSON cloning cannot handle this circular structure, but `structuredClone()` can.

## Important Limit

Not every JavaScript value is structured-cloneable.

For example, functions cannot be cloned:

```js
structuredClone({
  run() {
    return 'work';
  },
});
// DataCloneError
```

## When To Use It

Use `structuredClone()` when your value is structured-cloneable and your
environment supports it.

Use a custom recursive helper when the goal is to learn recursion or when you
need custom behavior that the built-in clone does not provide.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/questions/deep-copy-object/built-in-structured-clone.js
```
