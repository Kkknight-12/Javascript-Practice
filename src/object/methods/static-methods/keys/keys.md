# Object.keys()

## What Problem Does It Solve?

`Object.keys()` gives you the visible own property names of an object.

That is useful when you want to loop over an object's keys:

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

for (const key of Object.keys(profile)) {
  console.log(key);
}
```

Plain objects are not directly iterable with `for...of`.

`Object.keys()` turns the object's own enumerable string keys into an array, so
you can use normal array tools.

## Quick Definition

`Object.keys(object)` returns an array of the object's own enumerable
string-keyed property names.

Example:

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.keys(profile));
// [ 'name', 'role' ]
```

The returned keys are strings.

## Mental Model

Think of `Object.keys()` as:

```text
Object.keys(object)
  -> look at this object's own visible string property names
  -> return those names in an array
```

It answers:

```text
Which own enumerable string keys does this object have?
```

It does not answer:

```text
Which inherited keys are available?
Which symbol keys exist?
Which hidden non-enumerable keys exist?
What are the values?
```

## Syntax

```js
Object.keys(object);
```

## Parameters

- `object`: The value whose own enumerable string-keyed property names should be
  returned.

In modern JavaScript, non-object values are converted to objects first.

`null` and `undefined` cannot be converted to objects, so they throw
`TypeError`.

## Return Value

`Object.keys()` returns an array of strings.

```js
const scores = [10, 20, 30];

console.log(Object.keys(scores));
// [ '0', '1', '2' ]

console.log(typeof Object.keys(scores)[0]);
// string
```

Array indexes are returned as string keys: `'0'`, `'1'`, and so on.

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.keys(profile));
// [ 'name', 'role' ]
```

What happened:

- `name` and `role` are own properties.
- They are enumerable.
- They are string-keyed properties.
- `Object.keys()` returned their names.

## Only Own Enumerable String Keys Are Included

`Object.keys()` includes only properties that are all three:

```text
own + enumerable + string-keyed
```

It skips:

- inherited properties,
- non-enumerable properties,
- symbol-keyed properties.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const privateId = Symbol('privateId');
const learner = Object.create(sharedFields);

learner.name = 'Mina';
learner.topic = 'objects';
learner[privateId] = 101;

Object.defineProperty(learner, 'internalId', {
  value: 500,
  enumerable: false,
});

console.log(Object.keys(learner));
// [ 'name', 'topic' ]
```

What happened:

- `name` and `topic` are own, enumerable, and string-keyed, so they were
  included.
- `inheritedRole` is inherited, so it was skipped.
- `internalId` is non-enumerable, so it was skipped.
- `privateId` is a symbol key, so it was skipped.

## Inherited Properties Are Not Included

`Object.keys()` does not walk up the prototype chain.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const learner = Object.create(sharedFields);
learner.name = 'Mina';

console.log(Object.keys(learner));
// [ 'name' ]

console.log('inheritedRole' in learner);
// true
```

What happened:

- `inheritedRole` exists through the prototype chain.
- It is not an own property of `learner`.
- `Object.keys(learner)` skipped it.

This is one major difference from `for...in`, because `for...in` can visit
inherited enumerable string keys.

## Non-Enumerable Properties Are Not Included

Non-enumerable properties are own properties, but they are hidden from
`Object.keys()`.

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(settings));
// []

console.log(Object.hasOwn(settings, 'internalId'));
// true
```

What happened:

- `internalId` exists directly on `settings`.
- `enumerable: false` makes it invisible to `Object.keys()`.
- `Object.hasOwn()` still returns `true` because ownership and enumerability are
  different questions.

## Symbol Keys Are Not Included

Even enumerable symbol keys are not returned by `Object.keys()`.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.keys(user));
// [ 'name' ]
```

Use `Object.getOwnPropertySymbols()` when you only need own symbol keys.

Use `Reflect.ownKeys()` when you need all own string and symbol keys.

## It Reads Names, Not Values

`Object.keys()` reads property names.

It does not read property values.

That means getters are not called.

```js
let getterRunCount = 0;

const report = {
  title: 'Weekly progress',
  get summary() {
    getterRunCount += 1;
    return `${this.title} ready`;
  },
};

console.log(Object.keys(report));
// [ 'title', 'summary' ]

console.log(getterRunCount);
// 0
```

What happened:

- `summary` is an enumerable accessor property.
- `Object.keys()` saw the property name.
- It did not read `report.summary`.
- The getter did not run.

This is different from `Object.values()` and `Object.entries()`, because those
methods read values.

## Arrays

Arrays are objects, so `Object.keys()` can read their enumerable indexes.

```js
const scores = [10, 20, 30];

console.log(Object.keys(scores));
// [ '0', '1', '2' ]
```

The index keys are strings.

Sparse array empty slots are skipped because empty slots are missing properties.

```js
const scores = [10, , 30];

console.log(Object.keys(scores));
// [ '0', '2' ]
```

## Key Order

`Object.keys()` follows the ordinary own property order for string keys.

For beginner use, remember this:

```text
numeric index keys -> ascending numeric order
other string keys  -> insertion order
symbol keys        -> not included
```

```js
const values = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
  7: 'seven',
};

console.log(Object.keys(values));
// [ '2', '7', '100', 'name' ]
```

What happened:

- `'2'`, `'7'`, and `'100'` are numeric index keys.
- They come first in numeric order.
- `name` is a regular string key, so it comes after them.

## Primitive Values

Non-object arguments are converted to objects.

Strings have enumerable index properties:

```js
console.log(Object.keys('abc'));
// [ '0', '1', '2' ]
```

Most other primitive values have no own enumerable properties:

```js
console.log(Object.keys(42)); // []
console.log(Object.keys(true)); // []
```

`null` and `undefined` cannot be converted to objects:

```js
Object.keys(null); // TypeError
Object.keys(undefined); // TypeError
```

## Null-Prototype Objects

`Object.keys()` works with null-prototype objects.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.keys(dictionary));
// [ 'topic' ]
```

This works because `Object.keys()` is called from `Object`.

It does not need the object being checked to inherit from `Object.prototype`.

## Difference From Related Methods

Use this sample object for the comparison:

```js
const id = Symbol('id');

const profile = {
  name: 'Asha',
  role: 'developer',
  [id]: 101,
};

Object.defineProperty(profile, 'internalId', {
  value: 42,
  enumerable: false,
});
```

Use `Object.keys()` when you only need own enumerable string keys:

```js
Object.keys(profile);
// [ 'name', 'role' ]
```

Use `Object.values()` when you only need the matching values:

```js
Object.values(profile);
// [ 'Asha', 'developer' ]
```

Use `Object.entries()` when you need both names and values:

```js
Object.entries(profile);
// [ [ 'name', 'Asha' ], [ 'role', 'developer' ] ]
```

Use `Object.getOwnPropertyNames()` when you need own string keys, including
non-enumerable string keys:

```js
Object.getOwnPropertyNames(profile);
// [ 'name', 'role', 'internalId' ]
```

Use `Object.getOwnPropertySymbols()` when you need own symbol keys:

```js
Object.getOwnPropertySymbols(profile);
// [ Symbol(id) ]
```

Use `Reflect.ownKeys()` when you need all own keys:

```js
Reflect.ownKeys(profile);
// [ 'name', 'role', 'internalId', Symbol(id) ]
```

## Difference From `for...in`

`Object.keys()` returns own enumerable string keys only.

`for...in` loops over enumerable string keys, including inherited enumerable keys.

```js
const parent = {
  inheritedRole: 'member',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.keys(user));
// [ 'name' ]

for (const key in user) {
  console.log(key);
}
// name
// inheritedRole
```

Use `Object.keys()` when you want only the object's own visible string keys.

## Important Notes

- `Object.keys()` is a static method on `Object`.
- It returns an array of strings.
- It includes own enumerable string-keyed properties.
- It skips inherited properties.
- It skips non-enumerable properties.
- It skips symbol-keyed properties.
- It reads names, not values, so getters do not run.
- Array indexes are returned as string keys.
- Sparse array empty slots are skipped.
- Strings return character index keys.
- `null` and `undefined` throw `TypeError`.

## When To Use It

Use `Object.keys()`:

- when you want to loop over an object's own visible string property names,
- when you only need property names, not values,
- when you want to count own enumerable string properties,
- when you want to combine object keys with array methods like `map()`,
  `filter()`, or `includes()`.

Use a different method when:

- inherited properties matter,
- non-enumerable properties matter,
- symbol properties matter,
- you need values or key-value pairs.

## Common Mistakes

### Mistake 1: Expecting Symbol Keys

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.keys(user));
// [ 'name' ]
```

Symbol keys are not included.

### Mistake 2: Expecting Inherited Properties

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.keys(user));
// [ 'name' ]
```

Inherited properties are not included.

### Mistake 3: Expecting Non-Enumerable Properties

```js
const user = {};

Object.defineProperty(user, 'internalId', {
  value: 101,
  enumerable: false,
});

console.log(Object.keys(user));
// []
```

Non-enumerable properties are not included.

### Mistake 4: Using `Object.keys().includes()` As A Full Existence Check

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(settings).includes('internalId'));
// false

console.log(Object.hasOwn(settings, 'internalId'));
// true
```

`Object.keys().includes()` only checks own enumerable string keys.

Use `Object.hasOwn()` when you want to check whether a property exists directly
on the object.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/keys/keys.js
```

The runnable file shows:

- basic own enumerable string keys,
- array index keys,
- inherited property skipping,
- non-enumerable property skipping,
- symbol key skipping,
- comparison with `Object.getOwnPropertyNames()`,
  `Object.getOwnPropertySymbols()`, and `Reflect.ownKeys()`,
- getter behavior,
- sparse arrays,
- key order,
- null-prototype objects,
- primitive values,
- `Object.keys().includes()` limitations.

## References

- MDN:
  [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- ECMAScript specification:
  [`Object.keys`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.keys)
