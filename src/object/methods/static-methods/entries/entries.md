# Object.entries()

## What Problem Does It Solve?

`Object.entries()` turns an object's properties into an array of key-value
pairs.

That is useful when you want to loop over both the key and the value:

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

for (const [key, value] of Object.entries(profile)) {
  console.log(key, value);
}
```

Without `Object.entries()`, plain objects are not directly iterable with
`for...of`.

## Quick Definition

`Object.entries(object)` returns an array of the object's own enumerable
string-keyed property pairs.

Each pair is a two-item array:

```text
[key, value]
```

Example:

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.entries(profile));
// [ [ 'name', 'Asha' ], [ 'role', 'developer' ] ]
```

## Mental Model

Think of `Object.entries()` as:

```text
Object.entries(object)
  -> give me the visible own string-keyed properties
  -> return them as [key, value] arrays
```

It answers:

```text
Which own enumerable string keys does this object have?
What value does each key currently hold?
```

## Syntax

```js
Object.entries(object);
```

## Parameters

- `object`: The value whose own enumerable string-keyed properties should be
  returned as pairs.

## Return Value

`Object.entries()` returns an array.

Each item in that array is a two-item array:

```js
[key, value]
```

The key is always a string.

```js
const scores = [10, 20];

console.log(Object.entries(scores));
// [ [ '0', 10 ], [ '1', 20 ] ]
```

Array indexes are returned as string keys: `'0'`, `'1'`, and so on.

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.entries(profile));
// [ [ 'name', 'Asha' ], [ 'role', 'developer' ] ]
```

What happened:

- `name` and `role` are own properties.
- They are enumerable.
- They are string-keyed properties.
- `Object.entries()` returned each property as `[key, value]`.

## Looping With `for...of`

The returned array is iterable, so it works well with `for...of`.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

for (const [key, value] of Object.entries(profile)) {
  console.log(`${key}: ${value}`);
}
```

What happened:

- `Object.entries(profile)` created an array of pairs.
- `for...of` looped over those pairs.
- `[key, value]` destructured each pair.

This is one of the cleanest ways to loop over object key-value pairs.

## Only Own Enumerable String Keys Are Included

`Object.entries()` includes only properties that are all three:

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
learner[privateId] = 101;

Object.defineProperty(learner, 'internalId', {
  value: 500,
  enumerable: false,
});

console.log(Object.entries(learner));
// [ [ 'name', 'Mina' ] ]
```

What happened:

- `name` is own, enumerable, and string-keyed, so it was included.
- `inheritedRole` is inherited, so it was skipped.
- `internalId` is non-enumerable, so it was skipped.
- `privateId` is a symbol key, so it was skipped.

## Symbol Keys Are Not Included

Even enumerable symbol keys are not returned by `Object.entries()`.

```js
const id = Symbol('id');
const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.entries(user));
// [ [ 'name', 'Asha' ] ]
```

Use `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()` when symbol keys are
part of the question.

## Arrays

Arrays are objects, so `Object.entries()` can read their enumerable indexes.

```js
const scores = [10, 20, 30];

console.log(Object.entries(scores));
// [ [ '0', 10 ], [ '1', 20 ], [ '2', 30 ] ]
```

The index keys are strings.

Sparse array empty slots are skipped because empty slots are missing
properties.

```js
const scores = [10, , 30];

console.log(Object.entries(scores));
// [ [ '0', 10 ], [ '2', 30 ] ]
```

## Key Order

`Object.entries()` follows the ordinary own property order for string keys.

For beginner use, remember this:

```text
integer-like keys -> ascending numeric order
other string keys -> insertion order
symbol keys       -> not included
```

```js
const values = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
  7: 'seven',
};

console.log(Object.entries(values));
// [
//   [ '2', 'two' ],
//   [ '7', 'seven' ],
//   [ '100', 'one hundred' ],
//   [ 'name', 'Asha' ]
// ]
```

What happened:

- `'2'`, `'7'`, and `'100'` are integer-like keys.
- They come first in numeric order.
- `name` is a regular string key, so it comes after them.

## Primitive Values

Non-object arguments are converted to objects.

Strings have enumerable index properties:

```js
console.log(Object.entries('abc'));
// [ [ '0', 'a' ], [ '1', 'b' ], [ '2', 'c' ] ]
```

Most other primitive values have no own enumerable properties:

```js
console.log(Object.entries(42)); // []
console.log(Object.entries(true)); // []
```

`null` and `undefined` cannot be converted to objects:

```js
Object.entries(null); // TypeError
Object.entries(undefined); // TypeError
```

## Getters Run

`Object.entries()` reads property values.

That means getters run while entries are being created.

```js
const report = {
  title: 'Weekly progress',
  get summary() {
    return `${this.title} ready`;
  },
};

console.log(Object.entries(report));
// [ [ 'title', 'Weekly progress' ], [ 'summary', 'Weekly progress ready' ] ]
```

What happened:

- `summary` is an enumerable getter.
- `Object.entries()` read `report.summary`.
- Reading `report.summary` ran the getter.
- The returned value was placed in the entry.

## Transforming Objects

`Object.entries()` pairs naturally with `Object.fromEntries()`.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const upperCaseEntries = Object.entries(profile).map(([key, value]) => [
  key,
  value.toUpperCase(),
]);

const upperCaseProfile = Object.fromEntries(upperCaseEntries);

console.log(upperCaseProfile);
// { name: 'ASHA', role: 'DEVELOPER' }
```

What happened:

- `Object.entries(profile)` turned the object into pairs.
- `.map()` transformed the values.
- `Object.fromEntries()` turned the pairs back into an object.

## Converting An Object To A Map

`Map` accepts iterable key-value pairs.

That means `Object.entries()` can help convert a plain object to a `Map`.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const profileMap = new Map(Object.entries(profile));

console.log(profileMap.get('name')); // Asha
```

## Difference From `Object.keys()` And `Object.values()`

Use `Object.keys()` when you only need keys:

```js
Object.keys(profile);
// [ 'name', 'role' ]
```

Use `Object.values()` when you only need values:

```js
Object.values(profile);
// [ 'Asha', 'developer' ]
```

Use `Object.entries()` when you need both:

```js
Object.entries(profile);
// [ [ 'name', 'Asha' ], [ 'role', 'developer' ] ]
```

## Difference From Array `entries()`

Do not confuse `Object.entries(object)` with `array.entries()`.

```js
Object.entries(object);
array.entries();
```

`Object.entries(object)`:

- is a static method on `Object`,
- returns an array of key-value pairs from an object.

`array.entries()`:

- is an array instance method,
- returns an iterator over array index-value pairs.

## Important Notes

- `Object.entries()` is a static method on `Object`.
- It returns an array of `[key, value]` pairs.
- It includes own enumerable string-keyed properties.
- It skips inherited properties.
- It skips non-enumerable properties.
- It skips symbol-keyed properties.
- Array indexes are returned as string keys.
- Sparse array empty slots are skipped.
- Strings return character index entries.
- `null` and `undefined` throw `TypeError`.
- Getters run because values are read.

## When To Use It

Use `Object.entries()`:

- when you want to loop over object key-value pairs,
- when you want to transform an object through array methods,
- when you want to convert a plain object to a `Map`,
- when you want to pair it with `Object.fromEntries()`.

Use `Object.keys()`:

- when you only need property names.

Use `Object.values()`:

- when you only need property values.

Use `Reflect.ownKeys()`:

- when you need string keys and symbol keys.

## Common Mistakes

### Mistake 1: Expecting Symbol Keys

```js
const id = Symbol('id');
const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.entries(user));
// [ [ 'name', 'Asha' ] ]
```

Symbol keys are not included.

### Mistake 2: Expecting Inherited Properties

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.entries(user));
// [ [ 'name', 'Asha' ] ]
```

Inherited properties are not included.

### Mistake 3: Expecting Non-Enumerable Properties

```js
const user = {};

Object.defineProperty(user, 'internalId', {
  value: 101,
  enumerable: false,
});

console.log(Object.entries(user));
// []
```

Non-enumerable properties are not included.

### Mistake 4: Forgetting It Returns An Array

```js
const entries = Object.entries({
  name: 'Asha',
});

console.log(Array.isArray(entries)); // true
```

`Object.entries()` returns an array of pairs, not an iterator.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/entries/entries.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- ECMAScript spec:
  [`Object.entries`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.entries)
