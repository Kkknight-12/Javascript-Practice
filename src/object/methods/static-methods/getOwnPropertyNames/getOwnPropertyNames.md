# Object.getOwnPropertyNames()

## What Problem Does It Solve?

`Object.getOwnPropertyNames()` gives you the names of an object's own
string-keyed properties.

It includes both:

- enumerable string properties,
- non-enumerable string properties.

That makes it useful when you need to inspect property names that normal tools
like `Object.keys()` may hide.

## Quick Definition

`Object.getOwnPropertyNames(object)` returns an array of own string property
names.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.getOwnPropertyNames(profile));
// [ 'name', 'role' ]
```

It does not include symbol keys.

It does not include inherited properties.

## Mental Model

Think of `Object.getOwnPropertyNames()` as:

```text
Look directly on this object.
Collect own property keys that are strings.
Include enumerable and non-enumerable names.
Skip symbol keys.
Skip inherited properties.
```

It answers:

```text
Which own string property names exist on this object?
```

## Syntax

```js
Object.getOwnPropertyNames(object);
```

## Parameters

- `object`: The value whose own string property names should be returned.

Primitive values are converted to objects before the lookup.

`null` and `undefined` throw `TypeError`.

## Return Value

`Object.getOwnPropertyNames()` returns an array of strings.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const names = Object.getOwnPropertyNames(profile);

console.log(names);
// [ 'name', 'role' ]
```

If the object has no own string properties, the result is an empty array.

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(Object.getOwnPropertyNames(profile));
// [ 'name', 'role' ]
```

What happened:

- `name` and `role` are own properties.
- Both keys are strings.
- So both names were returned.

## Non-Enumerable Properties Are Included

`Object.keys()` returns only own enumerable string keys.

`Object.getOwnPropertyNames()` returns own enumerable and non-enumerable string
keys.

```js
const settings = {
  theme: 'dark',
};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
});

console.log(Object.keys(settings));
// [ 'theme' ]

console.log(Object.getOwnPropertyNames(settings));
// [ 'theme', 'internalId' ]
```

What happened:

- `theme` is enumerable, so both methods returned it.
- `internalId` is non-enumerable.
- `Object.keys()` skipped it.
- `Object.getOwnPropertyNames()` included it.

## Finding Non-Enumerable Names

You can combine `Object.keys()` with `Object.getOwnPropertyNames()` to find
only non-enumerable string names.

```js
const enumerableNames = new Set(Object.keys(settings));

const nonEnumerableNames = Object.getOwnPropertyNames(settings).filter(
  (name) => !enumerableNames.has(name),
);

console.log(nonEnumerableNames);
// [ 'internalId' ]
```

What happened:

- `Object.getOwnPropertyNames(settings)` returned all own string names.
- `Object.keys(settings)` returned only enumerable string names.
- Filtering removed the enumerable names.
- The remaining names were non-enumerable.

## Symbol Keys Are Skipped

`Object.getOwnPropertyNames()` returns string property names only.

It skips symbol-keyed properties.

```js
const secretKey = Symbol('secretKey');

const account = {
  username: 'learner',
  [secretKey]: 'token-123',
};

console.log(Object.getOwnPropertyNames(account));
// [ 'username' ]
```

Use `Object.getOwnPropertySymbols()` when you need own symbol keys:

```js
console.log(Object.getOwnPropertySymbols(account));
// [ Symbol(secretKey) ]
```

Use `Reflect.ownKeys()` when you need own string keys and own symbol keys
together:

```js
console.log(Reflect.ownKeys(account));
// [ 'username', Symbol(secretKey) ]
```

## Inherited Properties Are Skipped

Only own property names are returned.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const user = Object.create(sharedFields);
user.name = 'Mina';

console.log(Object.getOwnPropertyNames(user));
// [ 'name' ]

console.log('inheritedRole' in user);
// true
```

What happened:

- `name` is an own property on `user`.
- `inheritedRole` exists through the prototype chain.
- `Object.getOwnPropertyNames()` skipped the inherited property.

## Arrays

Arrays are objects, so array indexes are property names.

The `length` property is non-enumerable, but it is still an own string property.

```js
const scores = [10, 20, 30];

console.log(Object.getOwnPropertyNames(scores));
// [ '0', '1', '2', 'length' ]
```

Sparse array empty slots are missing properties, so they are skipped.

```js
const scores = [10, , 30];

console.log(Object.getOwnPropertyNames(scores));
// [ '0', '2', 'length' ]
```

What happened:

- Index `1` is an empty slot.
- Empty slots are not own properties.
- So `'1'` was not returned.
- `'length'` was returned because it is an own non-enumerable property.

## Property Order

For beginner use, remember this order:

```text
integer-like string keys -> ascending numeric order
other string keys        -> insertion order
symbol keys              -> not included
```

```js
const values = {
  100: 'one hundred',
  2: 'two',
  name: 'Asha',
};

Object.defineProperty(values, 'hidden', {
  value: 'secret',
  enumerable: false,
});

values[7] = 'seven';

console.log(Object.getOwnPropertyNames(values));
// [ '2', '7', '100', 'name', 'hidden' ]
```

What happened:

- `'2'`, `'7'`, and `'100'` are integer-like string keys.
- They come first in ascending numeric order.
- `name` and `hidden` are other string keys.
- They keep their insertion order.

## Primitive Values

Primitive values are converted to objects before names are collected.

Strings have index properties and a `length` property:

```js
console.log(Object.getOwnPropertyNames('ab'));
// [ '0', '1', 'length' ]
```

Most other primitive values usually have no own string properties:

```js
console.log(Object.getOwnPropertyNames(42));
// []
```

`null` and `undefined` cannot be converted to objects:

```js
Object.getOwnPropertyNames(null); // TypeError
Object.getOwnPropertyNames(undefined); // TypeError
```

## Names Only, Not Descriptors

`Object.getOwnPropertyNames()` returns names only.

It does not tell you whether a property is writable, enumerable, or
configurable.

```js
const names = Object.getOwnPropertyNames(settings);

console.log(names);
// [ 'theme', 'internalId' ]
```

Use `Object.getOwnPropertyDescriptor()` when you need details for one property.

```js
const descriptor = Object.getOwnPropertyDescriptor(settings, 'internalId');

console.log(descriptor.enumerable); // false
```

Use `Object.getOwnPropertyDescriptors()` when you need descriptor details for
all own properties.

## Difference From `Object.keys()`

`Object.keys()` returns:

```text
own + enumerable + string-keyed
```

`Object.getOwnPropertyNames()` returns:

```text
own + string-keyed
```

So `Object.getOwnPropertyNames()` includes non-enumerable string names that
`Object.keys()` skips.

## Difference From `Object.getOwnPropertySymbols()`

`Object.getOwnPropertySymbols()` returns own symbol keys.

```js
Object.getOwnPropertySymbols(object);
```

`Object.getOwnPropertyNames()` returns own string names.

```js
Object.getOwnPropertyNames(object);
```

Use both when you need to inspect string keys and symbol keys separately.

## Difference From `Reflect.ownKeys()`

`Reflect.ownKeys()` returns all own keys:

```text
own string keys + own symbol keys
```

`Object.getOwnPropertyNames()` returns only own string keys.

```js
Reflect.ownKeys(account);
// [ 'username', Symbol(secretKey) ]

Object.getOwnPropertyNames(account);
// [ 'username' ]
```

Use `Reflect.ownKeys()` when symbol keys are part of the question.

## Important Notes

- `Object.getOwnPropertyNames()` is a static method on `Object`.
- It returns an array of strings.
- It includes own enumerable string properties.
- It includes own non-enumerable string properties.
- It skips inherited properties.
- It skips symbol-keyed properties.
- Arrays include index names and the non-enumerable `length` name.
- Sparse array empty slots are skipped.
- Strings return index names and `length`.
- Most other primitives usually return an empty array.
- `null` and `undefined` throw `TypeError`.

## When To Use It

Use `Object.getOwnPropertyNames()`:

- when you need all own string property names,
- when non-enumerable string properties matter,
- when comparing visible names from `Object.keys()` with hidden names,
- when inspecting arrays and you also care about `length`.

Use `Object.keys()`:

- when you only need own enumerable string keys.

Use `Object.getOwnPropertySymbols()`:

- when you need own symbol keys.

Use `Reflect.ownKeys()`:

- when you need own string keys and own symbol keys together.

## Common Mistakes

### Mistake 1: Expecting Symbol Keys

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.getOwnPropertyNames(user));
// [ 'name' ]
```

Symbol keys are skipped.

### Mistake 2: Expecting Inherited Properties

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);
user.name = 'Asha';

console.log(Object.getOwnPropertyNames(user));
// [ 'name' ]
```

Inherited properties are skipped.

### Mistake 3: Thinking It Is The Same As `Object.keys()`

```js
const settings = {};

Object.defineProperty(settings, 'hidden', {
  value: true,
  enumerable: false,
});

console.log(Object.keys(settings));
// []

console.log(Object.getOwnPropertyNames(settings));
// [ 'hidden' ]
```

`Object.getOwnPropertyNames()` includes non-enumerable string properties.

### Mistake 4: Expecting Descriptor Details

```js
const names = Object.getOwnPropertyNames(settings);

console.log(names[0]); // hidden
```

The result contains names, not descriptors.

Use `Object.getOwnPropertyDescriptor()` or
`Object.getOwnPropertyDescriptors()` when descriptor details matter.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.getOwnPropertyNames()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
- ECMAScript spec:
  [`Object.getOwnPropertyNames`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertynames)
