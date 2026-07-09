# Deep Copy Object - JSON Clone Notes

## Problem First

We want a copy where nested objects are not shared.

For simple JSON-safe data, this pattern can appear to work:

```js
const copy = JSON.parse(JSON.stringify(original));
```

## Why It Works For Simple Data

`JSON.stringify(original)` turns the object into JSON text.

`JSON.parse(...)` creates a new object from that text.

That means nested JSON-safe objects and arrays become new references.

Example:

```js
const original = {
  user: {
    role: 'admin',
  },
};

const copy = JSON.parse(JSON.stringify(original));

console.log(copy.user !== original.user);
// true
```

## Why It Is Only Better, Not Perfect

JSON supports JSON data, not every JavaScript value.

For example, a `Date` becomes a string:

```js
const source = {
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
};

const copy = JSON.parse(JSON.stringify(source));

console.log(typeof copy.createdAt);
// 'string'
```

And `BigInt` throws:

```js
JSON.stringify({ id: 10n });
// TypeError
```

## When To Use This Idea

Use it only when you are sure the data is JSON-safe.

That means avoiding values like:

- `Date`,
- `BigInt`,
- `undefined`,
- functions,
- symbols,
- circular references,
- custom prototypes,
- `Map`, `Set`, `RegExp`, and other special objects.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/questions/deep-copy-object/better-json-clone.js
```
