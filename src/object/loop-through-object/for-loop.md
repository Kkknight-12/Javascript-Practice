# Loop Through An Object With A For Loop

## What Problem Does It Solve?

Objects do not have a normal numeric index or a `length` property like arrays.
If you want to use a classic `for` loop with an object, you first need a list of
keys.

`Object.keys(object)` gives you that list. Then the `for` loop can walk through
the key array and use each key to read the matching value from the object.

## Quick Definition

Use `Object.keys(object)` to get the object's own enumerable string keys.

Then use a normal `for` loop to move through that key array:

```js
const keys = Object.keys(object);

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  const value = object[key];
}
```

## Related Method Pages

This page compares several property-reading tools. The detailed method pages
belong in these places:

- `Object.keys()`:
  [`src/object/methods/static-methods/keys/keys.md`](../methods/static-methods/keys/keys.md)
- `Object.values()`: [`src/object/methods/static-methods/values.js`](../methods/static-methods/values.js)
- `Object.entries()`: [`src/object/methods/static-methods/entries/entries.md`](../methods/static-methods/entries/entries.md)
- `Object.getOwnPropertyNames()`:
  [`src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.md`](../methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.md)
- `Object.getOwnPropertySymbols()`:
  [`src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.md`](../methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.md)
- `Object.hasOwn()`:
  [`src/object/methods/static-methods/hasOwn/hasOwn.md`](../methods/static-methods/hasOwn/hasOwn.md)
- `Reflect.ownKeys()`:
  [MDN `Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)

## Mental Model

Think in two steps:

1. Make an array of the object's visible own string keys.
2. Use the `for` loop index to pick one key at a time.

The loop does not directly loop over the object. It loops over the key array.

## Syntax

```js
const keys = Object.keys(object);

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  const value = object[key];
}
```

## Parameters

For `Object.keys(object)`:

- `object`: The object whose keys you want.

For the `for` loop:

- `let index = 0`: Runs once before the loop starts.
- `index < keys.length`: Checked before each iteration.
- `index++`: Runs after each iteration.

## Return Value

`Object.keys(object)` returns an array of strings.

The `for` loop itself does not return a value. It repeats the code block until
the condition becomes false.

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
  active: true,
};

const keys = Object.keys(profile);

for (let index = 0; index < keys.length; index++) {
  const key = keys[index];
  const value = profile[key];

  console.log(key, value);
}
```

What happened:

- `Object.keys(profile)` created `['name', 'role', 'active']`.
- The `for` loop walked through that key array.
- `profile[key]` read the value for each current key.

## Why Bracket Notation Matters

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const key = 'role';

console.log(profile[key]); // developer
console.log(profile.key); // undefined
```

What happened:

- `profile[key]` uses the value inside the `key` variable.
- `profile.key` looks for a property literally named `key`.
- When keys come from `Object.keys()`, use bracket notation.

## Own Enumerable String Keys Only

```js
const sharedSettings = {
  plan: 'pro',
};

const settings = Object.create(sharedSettings);
settings.theme = 'dark';

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

const secretKey = Symbol('secretKey');
settings[secretKey] = 'hidden';

console.log(Object.keys(settings)); // [ 'theme' ]
console.log('plan' in settings); // true
console.log(Object.hasOwn(settings, 'internalId')); // true
```

What happened:

- `theme` is an own enumerable string key, so `Object.keys()` includes it.
- `plan` is inherited, so `Object.keys()` does not include it.
- `internalId` is own but non-enumerable, so `Object.keys()` does not include it.
- The symbol key is also not returned by `Object.keys()`.

## Property Coverage Cheat Sheet

Different tools see different groups of properties:

| Tool | Own | Inherited | Enumerable only | String keys | Symbol keys |
| --- | --- | --- | --- | --- | --- |
| `Object.keys()` | yes | no | yes | yes | no |
| `Object.values()` | yes | no | yes | string-keyed values | no |
| `Object.entries()` | yes | no | yes | string-keyed pairs | no |
| `for...in` | yes | yes | yes | yes | no |
| `Object.getOwnPropertyNames()` | yes | no | no | yes | no |
| `Object.getOwnPropertySymbols()` | yes | no | no | no | yes |
| `Reflect.ownKeys()` | yes | no | no | yes | yes |

Use this table before choosing a loop. The loop shape and the property-reading
tool are two separate decisions.

## Where `for...in` Fits

```js
const defaults = {
  plan: 'pro',
};

const settings = Object.create(defaults);
settings.theme = 'dark';

const keys = [];

for (const key in settings) {
  keys.push(key);
}

console.log(keys); // [ 'theme', 'plan' ]
```

What happened:

- `theme` is an own enumerable string key.
- `plan` is an inherited enumerable string key.
- `for...in` includes both.

For most beginner object loops, `Object.keys()` is clearer because it starts
from the object's own enumerable string keys only. Use `for...in` when inherited
enumerable string properties should be part of the result, or filter it with
`Object.hasOwn()` when you only want own properties.

## Where `Reflect.ownKeys()` Fits

```js
const id = Symbol('id');
const user = {
  name: 'Asha',
  [id]: 101,
};

Object.defineProperty(user, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(user)); // [ 'name' ]
console.log(Object.getOwnPropertyNames(user)); // [ 'name', 'internalId' ]
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(id) ]
console.log(Reflect.ownKeys(user)); // [ 'name', 'internalId', Symbol(id) ]
```

What happened:

- `Object.keys()` returned only own enumerable string keys.
- `Object.getOwnPropertyNames()` returned own string keys, including the
  non-enumerable one.
- `Object.getOwnPropertySymbols()` returned own symbol keys.
- `Reflect.ownKeys()` returned all own keys in one call: string keys and symbol
  keys, enumerable and non-enumerable.

`Reflect.ownKeys()` belongs to `Reflect`, so it is called as
`Reflect.ownKeys(object)`, not `Object.ownKeys(object)`.

## Using `break` And `continue`

```js
const taskStatus = {
  setup: 'done',
  notes: 'pending',
  review: 'pending',
};

const keys = Object.keys(taskStatus);
let firstPendingTask = null;

for (let index = 0; index < keys.length; index++) {
  const task = keys[index];

  if (taskStatus[task] !== 'pending') {
    continue;
  }

  firstPendingTask = task;
  break;
}

console.log(firstPendingTask); // notes
```

What happened:

- `continue` skipped tasks that were not pending.
- `break` stopped the loop after the first pending task was found.
- A classic `for` loop is useful when you need this kind of control.

## Stored Keys Do Not Update Automatically

```js
const course = {
  title: 'Objects',
  level: 'beginner',
};

const keys = Object.keys(course);
course.status = 'draft';

console.log(keys); // [ 'title', 'level' ]
console.log(Object.keys(course)); // [ 'title', 'level', 'status' ]
```

What happened:

- `keys` is an array created before `status` was added.
- Adding a new property changes the object, not the already-created key array.
- Call `Object.keys(course)` again when you need a fresh key list.

## Numeric-Like Keys Come First

```js
const mixedKeys = {
  100: 'large id',
  2: 'small id',
  name: 'Objects',
};

console.log(Object.keys(mixedKeys)); // [ '2', '100', 'name' ]
```

What happened:

- Integer-like keys are ordered before other string keys.
- The numeric-like keys are returned in ascending numeric order.
- Other string keys keep their normal property order after that.

## Important Notes

- `Object.keys()` returns own enumerable string keys only.
- It does not return inherited keys.
- It does not return non-enumerable keys.
- It does not return symbol keys.
- Store `Object.keys(object)` before the loop instead of rebuilding the key
  array inside the loop condition.
- If you add a new property after storing the key array, the stored key array
  does not automatically include the new key.
- Integer-like keys are ordered before other string keys.

## When To Use It

Use `Object.keys()` with a normal `for` loop:

- When you need the index.
- When you need `break` or `continue`.
- When you want a very explicit beginner-friendly loop.
- When you already need the key array.

Use `Object.entries()` instead when you only want key-value pairs and do not
need the index.

Use `for...in` only when you understand that it can include inherited enumerable
properties too.

## Common Mistakes

### Mistake 1: Treating An Object Like An Array

```js
const user = {
  name: 'Asha',
  role: 'developer',
};

console.log(user.length); // undefined
```

Objects do not automatically have a `length` property. Use
`Object.keys(user).length` when you need the number of own enumerable string
keys.

### Mistake 2: Using Dot Notation With A Dynamic Key

```js
const user = {
  name: 'Asha',
};

const key = 'name';

console.log(user.key); // undefined
console.log(user[key]); // Asha
```

Use bracket notation when the key is stored in a variable.

### Mistake 3: Expecting Every Property To Appear

`Object.keys()` does not return inherited properties, non-enumerable properties,
or symbol properties.

If you need different property coverage, choose a different tool, such as
`for...in`, `Object.getOwnPropertyNames()`, or
`Object.getOwnPropertySymbols()`. If you need all own keys in one call, use
`Reflect.ownKeys()`.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/loop-through-object/for-loop.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- MDN:
  [`for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
- MDN:
  [`for...in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
- MDN:
  [`Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
