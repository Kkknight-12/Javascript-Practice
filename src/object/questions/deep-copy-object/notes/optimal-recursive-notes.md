# Deep Copy Object - Recursive Plain Object Notes

## Problem First

Input:

```js
const original = {
  skills: ['JavaScript', { topic: 'objects', level: 'beginner' }],
  settings: {
    theme: 'dark',
  },
};
```

Expected behavior:

```js
const copy = deepClonePlain(original);

console.log(copy !== original);
// true

console.log(copy.skills !== original.skills);
// true

console.log(copy.skills[1] !== original.skills[1]);
// true
```

The copied object should not share nested arrays or nested objects with the
original.

## Key Insight

A deep copy handles each value by its type:

```text
primitive or null -> return it directly
array             -> clone each item
plain object      -> clone each property value
```

Nested arrays and nested objects are smaller versions of the same problem, so
recursion fits naturally.

## Code

```js
function deepClonePlain(value) {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClonePlain(item));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => {
      return [key, deepClonePlain(nestedValue)];
    }),
  );
}
```

## Line By Line

### Step 1: Return Primitives And `null`

```js
if (typeof value !== 'object' || value === null) {
  return value;
}
```

Strings, numbers, booleans, `undefined`, symbols, bigints, functions, and
`null` do not need nested copying in this helper.

`null` needs a separate check because:

```js
typeof null;
// 'object'
```

### Step 2: Copy Arrays As Arrays

```js
if (Array.isArray(value)) {
  return value.map((item) => deepClonePlain(item));
}
```

If the value is an array, the function creates a new array with `map()`.

Each item is passed back into `deepClonePlain()` because an array item can also
be an object or another array.

### Step 3: Copy Plain Objects As Objects

```js
return Object.fromEntries(
  Object.entries(value).map(([key, nestedValue]) => {
    return [key, deepClonePlain(nestedValue)];
  }),
);
```

`Object.entries(value)` creates key-value pairs.

Each `nestedValue` is cloned recursively.

`Object.fromEntries(...)` builds a new object from the cloned pairs.

## Variables / State Table

| name | meaning |
|---|---|
| `value` | current value being cloned |
| `item` | one item inside an array |
| `key` | one property name from an object |
| `nestedValue` | value stored at that property |
| `Object.entries(value)` | own enumerable string-keyed property pairs |
| `Object.fromEntries(...)` | rebuilds a new object from cloned pairs |

## Conditions

| condition | meaning | action |
|---|---|---|
| `typeof value !== 'object'` | primitive or function value | return as-is |
| `value === null` | `null` should not be treated like an object to walk through | return `null` |
| `Array.isArray(value)` | current value is an array | clone each item |
| otherwise | current value is treated as a plain object | clone each own enumerable string-keyed property |

## Adjustment Logic

| step | action | why |
|---:|---|---|
| `1` | check primitive or `null` | these values do not need deeper walking |
| `2` | if array, call `map()` | create a new array |
| `3` | recursively clone each array item | nested items may also need copying |
| `4` | if plain object, call `Object.entries(value)` | get property names and values |
| `5` | recursively clone each property value | nested objects should not stay shared |
| `6` | rebuild with `Object.fromEntries(...)` | create a new object with cloned values |

## Recursive Visual Tree

Input:

```js
{
  user: { role: 'admin' },
  tags: ['object']
}
```

Tree:

```text
deepClonePlain(original)
|
|-- value is plain object
|   `-- read entries: user, tags
|
|-- clone user
|   `-- deepClonePlain({ role: 'admin' })
|       |
|       `-- clone role
|           `-- deepClonePlain('admin') returns 'admin'
|
|-- clone tags
|   `-- deepClonePlain(['object'])
|       |
|       `-- clone item 'object'
|           `-- returns 'object'
|
`-- return {
      user: { role: 'admin' },
      tags: ['object']
    }
```

## Execution Table

| step | call | result returned |
|---:|---|---|
| `1` | `deepClonePlain(original)` | waits for nested values |
| `2` | `deepClonePlain({ role: 'admin' })` | waits for `role` |
| `3` | `deepClonePlain('admin')` | `'admin'` |
| `4` | finish user object | `{ role: 'admin' }` |
| `5` | `deepClonePlain(['object'])` | waits for array item |
| `6` | `deepClonePlain('object')` | `'object'` |
| `7` | finish tags array | `['object']` |
| `8` | finish root object | `{ user: { role: 'admin' }, tags: ['object'] }` |

## Important Limitation

This helper uses `Object.entries()`.

That means it copies:

```text
own + enumerable + string-keyed properties
```

It does not preserve:

- symbol-keyed properties,
- non-enumerable properties,
- property descriptors,
- prototypes,
- circular references,
- special objects like `Date`, `Map`, `Set`, `RegExp`, typed arrays, and more.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/questions/deep-copy-object/optimal-recursive.js
```
