# Object.values()

## What Problem Does It Solve?

`Object.values()` gives you the visible own property values of an object.

That is useful when the property names do not matter and you only want the data:

```js
const cart = {
  apple: 2,
  banana: 3,
  orange: 4,
};

const total = Object.values(cart).reduce((sum, count) => sum + count, 0);

console.log(total);
// 9
```

Plain objects are not directly iterable with `for...of`.

`Object.values()` turns the object's own enumerable string-keyed values into an
array, so you can use normal array tools.

## Quick Definition

`Object.values(object)` returns an array of the object's own enumerable
string-keyed property values.

Example:

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.values(profile));
// [ 'Asha', 'developer' ]
```

## Mental Model

Think of `Object.values()` as:

```text
Object.values(object)
  -> look at this object's own visible string properties
  -> read their values
  -> return those values in an array
```

It answers:

```text
What values are stored in this object's own enumerable string-keyed properties?
```

It does not answer:

```text
Which property name did this value come from?
Which inherited values are available?
Which symbol-keyed values exist?
Which hidden non-enumerable values exist?
```

## Syntax

```js
Object.values(object);
```

## Parameters

- `object`: The value whose own enumerable string-keyed property values should be
  returned.

In modern JavaScript, non-object values are converted to objects first.

`null` and `undefined` cannot be converted to objects, so they throw
`TypeError`.

## Return Value

`Object.values()` returns an array.

The array contains values, not keys.

```js
const scores = [10, 20, 30];

console.log(Object.values(scores));
// [ 10, 20, 30 ]
```

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
  active: true,
};

console.log(Object.values(profile));
// [ 'Asha', 'developer', true ]
```

What happened:

- `name`, `role`, and `active` are own properties.
- They are enumerable.
- They are string-keyed properties.
- `Object.values()` returned their values.

## Only Own Enumerable String-Keyed Values Are Included

`Object.values()` includes only values from properties that are all three:

```text
own + enumerable + string-keyed
```

It skips values from:

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

console.log(Object.values(learner));
// [ 'Mina', 'objects' ]
```

What happened:

- `name` and `topic` are own, enumerable, and string-keyed, so their values were
  included.
- `inheritedRole` is inherited, so its value was skipped.
- `internalId` is non-enumerable, so its value was skipped.
- `privateId` is a symbol key, so its value was skipped.

## Inherited Properties Are Not Included

`Object.values()` does not walk up the prototype chain.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const learner = Object.create(sharedFields);
learner.name = 'Mina';

console.log(Object.values(learner));
// [ 'Mina' ]

console.log('inheritedRole' in learner);
// true
```

What happened:

- `inheritedRole` exists through the prototype chain.
- It is not an own property of `learner`.
- `Object.values(learner)` skipped it.

This is one major difference from `for...in`, because `for...in` can visit
inherited enumerable string keys.

## Non-Enumerable Properties Are Not Included

Non-enumerable properties are own properties, but they are hidden from
`Object.values()`.

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.values(settings));
// []

console.log(Object.hasOwn(settings, 'internalId'));
// true
```

What happened:

- `internalId` exists directly on `settings`.
- `enumerable: false` makes it invisible to `Object.values()`.
- `Object.hasOwn()` still returns `true` because ownership and enumerability are
  different questions.

## Symbol-Keyed Values Are Not Included

Even enumerable symbol-keyed values are not returned by `Object.values()`.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.values(user));
// [ 'Asha' ]
```

Use `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()` when symbol keys are
part of the question.

## It Reads Values, So Getters Run

`Object.values()` reads property values.

That means getters run.

```js
let getterRunCount = 0;

const report = {
  title: 'Weekly progress',
  get summary() {
    getterRunCount += 1;
    return `${this.title} ready`;
  },
};

console.log(Object.values(report));
// [ 'Weekly progress', 'Weekly progress ready' ]

console.log(getterRunCount);
// 1
```

What happened:

- `summary` is an enumerable getter.
- `Object.values()` needed the value of `summary`.
- Reading `summary` ran the getter.

This is different from `Object.keys()`, because `Object.keys()` reads names, not
values.

## Arrays

Arrays are objects, so `Object.values()` can read their enumerable index values.

```js
const scores = [10, 20, 30];

console.log(Object.values(scores));
// [ 10, 20, 30 ]
```

Sparse array empty slots are skipped because empty slots are missing properties.

```js
const scores = [10, , 30];

console.log(Object.values(scores));
// [ 10, 30 ]
```

An existing property whose value is `undefined` is still included:

```js
const scores = [10, undefined, 30];

console.log(Object.values(scores));
// [ 10, undefined, 30 ]
```

An empty slot and an explicit `undefined` value are not the same thing.

## Value Order

`Object.values()` follows the ordinary own property order for string keys.

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

console.log(Object.values(values));
// [ 'two', 'seven', 'one hundred', 'Asha' ]
```

What happened:

- `'2'`, `'7'`, and `'100'` are numeric index keys.
- Their values come first in numeric key order.
- `name` is a regular string key, so its value comes after them.

## Primitive Values

Non-object arguments are converted to objects.

Strings have enumerable index properties:

```js
console.log(Object.values('abc'));
// [ 'a', 'b', 'c' ]
```

Most other primitive values have no own enumerable properties:

```js
console.log(Object.values(42)); // []
console.log(Object.values(true)); // []
console.log(Object.values(Symbol('id'))); // []
console.log(Object.values(10n)); // []
```

`null` and `undefined` cannot be converted to objects:

```js
Object.values(null); // TypeError
Object.values(undefined); // TypeError
```

## Null-Prototype Objects

`Object.values()` works with null-prototype objects.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';
dictionary.level = 'beginner';

console.log(Object.values(dictionary));
// [ 'objects', 'beginner' ]
```

This works because `Object.values()` is called from `Object`.

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

`Object.values()` returns values from own enumerable string-keyed properties only.

`for...in` loops over enumerable string keys, including inherited enumerable keys.

```js
const parent = {
  inheritedRole: 'member',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.values(user));
// [ 'Asha' ]

for (const key in user) {
  console.log(user[key]);
}
// Asha
// member
```

Use `Object.values()` when you want only the object's own visible string-keyed
values.

## Important Notes

- `Object.values()` is a static method on `Object`.
- It returns an array of values.
- It includes values from own enumerable string-keyed properties.
- It skips inherited properties.
- It skips non-enumerable properties.
- It skips symbol-keyed properties.
- It reads values, so getters run.
- Sparse array empty slots are skipped.
- Existing properties with the value `undefined` are included.
- Strings return character values.
- `null` and `undefined` throw `TypeError`.

## When To Use It

Use `Object.values()`:

- when you only need property values, not names,
- when you want to use array methods on an object's values,
- when you want to count, sum, filter, or map the visible own values of an
  object.

Use a different method when:

- property names matter,
- inherited properties matter,
- non-enumerable properties matter,
- symbol properties matter.

## Common Mistakes

### Mistake 1: Expecting Keys

```js
const user = {
  name: 'Asha',
};

console.log(Object.values(user));
// [ 'Asha' ]
```

`Object.values()` returns values, not property names.

Use `Object.keys()` when you need names.

### Mistake 2: Expecting Symbol-Keyed Values

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.values(user));
// [ 'Asha' ]
```

Symbol-keyed values are not included.

### Mistake 3: Expecting Inherited Values

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.values(user));
// [ 'Asha' ]
```

Inherited values are not included.

### Mistake 4: Expecting Non-Enumerable Values

```js
const user = {};

Object.defineProperty(user, 'internalId', {
  value: 101,
  enumerable: false,
});

console.log(Object.values(user));
// []
```

Non-enumerable values are not included.

### Mistake 5: Forgetting Getters Run

```js
const report = {
  get summary() {
    console.log('getter ran');
    return 'ready';
  },
};

console.log(Object.values(report));
// getter ran
// [ 'ready' ]
```

`Object.values()` reads values, so getters run.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/values/values.js
```

The runnable file shows:

- basic own enumerable string-keyed values,
- inherited property skipping,
- non-enumerable property skipping,
- symbol-keyed value skipping,
- getter behavior,
- arrays,
- sparse arrays,
- explicit `undefined` values,
- value order,
- null-prototype objects,
- primitive values,
- `Object.values()` with array methods,
- when `Object.entries()` is a better fit.

## References

- MDN:
  [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- ECMAScript specification:
  [`Object.values`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.values)
