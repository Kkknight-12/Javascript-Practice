# Deep Copy Object

## Problem Samjho

Create a copy of an object where nested objects and nested arrays are copied too.

This is called a deep copy.

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

Changing the nested object in `copy` should not change the nested object in
`original`.

## Examples

### Example 1

```js
const original = {
  user: {
    role: 'admin',
  },
};

const copy = deepClone(original);
copy.user.role = 'editor';

console.log(original.user.role);
// 'admin'
```

### Example 2

```js
const original = {
  skills: ['JavaScript', { topic: 'objects' }],
};

const copy = deepClone(original);

console.log(copy.skills !== original.skills);
// true

console.log(copy.skills[1] !== original.skills[1]);
// true
```

The outer array is new, and the object inside the array is also new.

## What We Need To Learn

A deep-copy solution must make a decision for each value:

```text
primitive or null -> return it directly
array             -> copy each item
plain object      -> copy each property value
```

This is why recursion is useful. A nested object or array is a smaller version
of the same copy problem.

## Approach Files

```text
src/object/questions/deep-copy-object/
  brute-force.js
  better-json-clone.js
  optimal-recursive.js
  built-in-structured-clone.js
  notes/
    brute-force-notes.md
    better-json-clone-notes.md
    optimal-recursive-notes.md
    structured-clone-notes.md
```

Read the files in this order:

1. `brute-force.js`
2. `better-json-clone.js`
3. `optimal-recursive.js`
4. `built-in-structured-clone.js`

The recursive file is the main learning solution. `structuredClone()` is the
important built-in comparison for real structured-cloneable values.
