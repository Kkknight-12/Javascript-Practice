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
  // Base case: primitives, functions, undefined, symbols, bigints, and null
  // do not have nested object structure for this helper to walk through.
  // `value === null` is needed because typeof null is 'object'.
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    // Array branch: keep the result as an array.
    // map() creates a new array, and every item goes through the same clone logic
    // because an item can also be an object or another array.
    return value.map((item) => deepClonePlain(item));
  }

  // Object branch: Object.entries() gives own enumerable string-keyed pairs.
  // We clone each nested value, then Object.fromEntries() builds a new object
  // from the cloned pairs.
  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => {
      // Keep the same key, but replace the old nested value with its cloned value.
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
const original = {
  user: { role: 'admin' },
  tags: ['object'],
};
```

Goal:

```text
Create a new root object.
Create a new user object.
Create a new tags array.
Keep primitive values as they are.
```

Think of each line as a small node.

Each node should show:

```text
call or action
kind of value
what it is waiting for
what it returns
```

Recursion tree:

```text
root  deepClonePlain(original) (kind=object, waiting for cloned keys)
│
├── key "user" -> value { role: 'admin' } -> recurse
│   │
│   └── deepClonePlain({ role: 'admin' }) (kind=object, waiting for "role")
│       │
│       ├── key "role" -> value 'admin' -> primitive base case
│       │   │
│       │   └── return 'admin'
│       │
│       └── rebuild user object with cloned "role"
│           │
│           └── return { role: 'admin' }
│
├── key "tags" -> value ['object'] -> recurse
│   │
│   └── deepClonePlain(['object']) (kind=array, waiting for index 0)
│       │
│       ├── index 0 -> value 'object' -> primitive base case
│       │   │
│       │   └── return 'object'
│       │
│       └── rebuild tags array with cloned index 0
│           │
│           └── return ['object']
│
└── rebuild root object with cloned properties
    │
    ├── "user" gets { role: 'admin' }
    ├── "tags" gets ['object']
    │
    └── return {
          user: { role: 'admin' },
          tags: ['object'],
        }
```

Important reference point:

```text
The root node returns a new root object.
The user node returns a new user object.
The tags node returns a new tags array.
The strings 'admin' and 'object' are primitives, so they are returned directly.
```

## Execution Table

| step | frame / action | waiting for | returned value |
|---:|---|---|---|
| `1` | `deepClonePlain(original)` sees a plain object | `user`, `tags` | not ready |
| `2` | `deepClonePlain({ role: 'admin' })` sees a plain object | `role` | not ready |
| `3` | `deepClonePlain('admin')` hits primitive base case | nothing | `'admin'` |
| `4` | call for `user` rebuilds from cloned `role` | nothing | `{ role: 'admin' }` |
| `5` | `deepClonePlain(['object'])` sees an array | item `0` | not ready |
| `6` | `deepClonePlain('object')` hits primitive base case | nothing | `'object'` |
| `7` | call for `tags` rebuilds from cloned item `0` | nothing | `['object']` |
| `8` | root call rebuilds from cloned `user` and `tags` | nothing | `{ user: { role: 'admin' }, tags: ['object'] }` |

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
