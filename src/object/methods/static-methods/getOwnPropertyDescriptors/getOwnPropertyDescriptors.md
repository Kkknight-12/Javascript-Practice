# Object.getOwnPropertyDescriptors()

## What Problem Does It Solve?

`Object.getOwnPropertyDescriptors()` lets you inspect the descriptor settings
for all own properties on an object.

This is useful when you need more than just property values.

Normal copying tools often copy values:

```js
const copy = Object.assign({}, source);
```

But descriptor-aware copying can preserve:

- non-enumerable properties,
- read-only properties,
- getter/setter properties,
- symbol-keyed properties.

`Object.getOwnPropertyDescriptors()` gives you a descriptor map that can be
passed to `Object.defineProperties()`.

## Quick Definition

`Object.getOwnPropertyDescriptors(object)` returns an object containing all own
property descriptors of `object`.

```js
const profile = {
  name: 'Asha',
};

const descriptors = Object.getOwnPropertyDescriptors(profile);

console.log(descriptors.name);
// { value: 'Asha', writable: true, enumerable: true, configurable: true }
```

## Mental Model

Think of `Object.getOwnPropertyDescriptors()` as:

```text
Look directly on this object.
Collect every own property key.
Return a descriptor object for each key.
```

The result is a descriptor map:

```js
{
  propertyName: propertyDescriptor,
}
```

That shape is important because `Object.defineProperties()` accepts the same
kind of descriptor map.

## Syntax

```js
Object.getOwnPropertyDescriptors(object);
```

## Parameters

- `object`: The value whose own property descriptors should be returned.

Primitive values are converted to objects before the lookup.

`null` and `undefined` throw `TypeError`.

## Return Value

`Object.getOwnPropertyDescriptors()` returns a new object.

Each own property key from the original object appears on the returned object.

Each value in the returned object is a descriptor object.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const descriptors = Object.getOwnPropertyDescriptors(profile);

console.log(Object.keys(descriptors));
// [ 'name', 'role' ]

console.log(descriptors.name.value);
// Asha
```

If the object has no own properties, the returned object is empty.

## Basic Example

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

const descriptors = Object.getOwnPropertyDescriptors(profile);

console.log(descriptors.name.value); // Asha
console.log(descriptors.name.writable); // true
console.log(descriptors.name.enumerable); // true
console.log(descriptors.name.configurable); // true
```

What happened:

- `profile` has two own properties: `name` and `role`.
- The method returned one descriptor object for each own property.
- Because these properties were created by object literal syntax, they are
  writable, enumerable, and configurable.

## Descriptor Map Shape

The returned object is a descriptor map.

```js
const descriptors = Object.getOwnPropertyDescriptors(profile);
```

It looks like this:

```js
{
  name: {
    value: 'Asha',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  role: {
    value: 'developer',
    writable: true,
    enumerable: true,
    configurable: true,
  },
}
```

The outer object is the map.

Each inner object is a descriptor.

That means this method pairs naturally with `Object.defineProperties()`.

## Non-Enumerable Properties Are Included

`Object.getOwnPropertyDescriptors()` includes own properties even when they are
non-enumerable.

```js
const settings = {
  theme: 'dark',
};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
  writable: false,
  configurable: false,
});

const descriptors = Object.getOwnPropertyDescriptors(settings);

console.log('internalId' in descriptors); // true
console.log(descriptors.internalId.enumerable); // false
```

What happened:

- `internalId` is an own property.
- It is non-enumerable.
- This method still included it because it reads all own property descriptors,
  not only enumerable ones.

## Symbol Keys Are Included

Symbol-keyed own properties are included too.

```js
const secretKey = Symbol('secretKey');

const account = {
  username: 'learner',
  [secretKey]: 'token-123',
};

const descriptors = Object.getOwnPropertyDescriptors(account);

console.log(Object.getOwnPropertySymbols(descriptors).length); // 1
console.log(descriptors[secretKey].value); // token-123
```

Use the same symbol value to read the symbol descriptor from the descriptor
map.

## Inherited Properties Are Not Included

Only own properties are included.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const user = Object.create(sharedFields);
user.name = 'Mina';

const descriptors = Object.getOwnPropertyDescriptors(user);

console.log(descriptors.name.value); // Mina
console.log(descriptors.inheritedRole); // undefined
```

What happened:

- `name` is an own property on `user`.
- `inheritedRole` exists through the prototype chain.
- Inherited properties are skipped.

## Accessor Descriptors

Accessor properties are returned as accessor descriptors.

```js
let readCount = 0;

const counter = {
  get value() {
    readCount += 1;
    return 42;
  },
};

const descriptors = Object.getOwnPropertyDescriptors(counter);

console.log(typeof descriptors.value.get); // function
console.log(descriptors.value.value); // undefined
console.log(readCount); // 0
```

What happened:

- `value` is an accessor property.
- The descriptor has a `get` field.
- It does not have a `value` field.
- `descriptors.value.get` gave us the getter function.
- Reading `descriptors.value.get` did not call the getter function.

The getter runs only when the property itself is read:

```js
console.log(counter.value); // 42
console.log(readCount); // 1
```

## The Returned Descriptor Map Is A Copy

The returned descriptor map is a new object.

The descriptor objects inside it are also separate objects.

Changing them does not change the original property.

```js
const profile = {
  name: 'Asha',
};

const descriptors = Object.getOwnPropertyDescriptors(profile);

descriptors.name.value = 'Mina';
descriptors.name.writable = false;

console.log(profile.name); // Asha
console.log(Object.getOwnPropertyDescriptor(profile, 'name').writable);
// true
```

What happened:

- The descriptor map was changed.
- The original property was not changed.
- To apply a descriptor map, use `Object.defineProperties()`.

## Copying With Full Descriptors

`Object.getOwnPropertyDescriptors()` is often used with
`Object.defineProperties()`.

```js
const copy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source),
);
```

That copies descriptors, not only values.

Example:

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
  writable: false,
  configurable: false,
});

const copy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(settings),
);

console.log(copy.internalId); // 101
console.log(Object.keys(copy)); // []
console.log(Object.getOwnPropertyDescriptor(copy, 'internalId').writable);
// false
```

What happened:

- `internalId` was copied.
- It stayed non-enumerable.
- It stayed non-writable.

## Difference From `Object.assign()`

`Object.assign()` copies enumerable own values.

It does not copy full descriptors.

It also reads getters.

```js
let readCount = 0;

const source = {
  get score() {
    readCount += 1;
    return 10;
  },
};

const assigned = Object.assign({}, source);

console.log(readCount); // 1
console.log(assigned.score); // 10
console.log(Object.getOwnPropertyDescriptor(assigned, 'score').get);
// undefined
```

What happened:

- `Object.assign()` read `source.score`.
- Reading `source.score` ran the getter.
- The copied property became a normal data property.
- The getter itself was not preserved.

Descriptor copying is different:

```js
readCount = 0;

const descriptorCopy = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source),
);

console.log(readCount); // 0
console.log(typeof Object.getOwnPropertyDescriptor(descriptorCopy, 'score').get);
// function
```

The getter was copied as a getter, and it did not run during the copy.

## Preserving The Prototype Too

If you want a shallow clone that keeps the same prototype and descriptors, use
`Object.create()` with `Object.getOwnPropertyDescriptors()`.

```js
const clone = Object.create(
  Object.getPrototypeOf(source),
  Object.getOwnPropertyDescriptors(source),
);
```

Example:

```js
const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Nina';
learner.topic = 'descriptors';

const clone = Object.create(
  Object.getPrototypeOf(learner),
  Object.getOwnPropertyDescriptors(learner),
);

console.log(clone.describe()); // Nina is learning descriptors
console.log(Object.getPrototypeOf(clone) === sharedBehavior); // true
```

What happened:

- `Object.getPrototypeOf(learner)` reused the prototype.
- `Object.getOwnPropertyDescriptors(learner)` copied own property descriptors.
- `Object.create()` created the clone with both pieces.

This is still a shallow copy. Nested objects are still shared by reference.

## Primitive Values

Primitive values are converted to objects before descriptors are collected.

Strings have own index properties and a `length` property:

```js
const descriptors = Object.getOwnPropertyDescriptors('ab');

console.log(Object.keys(descriptors));
// [ '0', '1', 'length' ]

console.log(descriptors.length);
// { value: 2, writable: false, enumerable: false, configurable: false }
```

Most other primitive values usually have no own properties:

```js
console.log(Object.getOwnPropertyDescriptors(42));
// {}
```

`null` and `undefined` cannot be converted to objects:

```js
Object.getOwnPropertyDescriptors(null); // TypeError
Object.getOwnPropertyDescriptors(undefined); // TypeError
```

## Difference From `Object.getOwnPropertyDescriptor()`

`Object.getOwnPropertyDescriptor()` reads one own property descriptor.

```js
Object.getOwnPropertyDescriptor(user, 'name');
```

`Object.getOwnPropertyDescriptors()` reads all own property descriptors.

```js
Object.getOwnPropertyDescriptors(user);
```

Use the singular method when you need one key.

Use the plural method when you need a descriptor map for the whole object.

## Important Notes

- `Object.getOwnPropertyDescriptors()` is a static method on `Object`.
- It returns a descriptor map for all own properties.
- It includes enumerable and non-enumerable own properties.
- It includes string-keyed and symbol-keyed own properties.
- It skips inherited properties.
- It can return data descriptors and accessor descriptors.
- Reading accessor descriptors does not call getters.
- The returned descriptor map is a copy.
- Mutating the returned descriptor map does not change the original object.
- The descriptor map can be passed to `Object.defineProperties()`.
- Primitive values are converted to objects.
- `null` and `undefined` throw `TypeError`.

## When To Use It

Use `Object.getOwnPropertyDescriptors()`:

- when you need all own property descriptors,
- when copying descriptors with `Object.defineProperties()`,
- when preserving non-enumerable properties,
- when preserving getter/setter properties,
- when preserving symbol-keyed properties,
- when building a descriptor-preserving shallow clone.

Use `Object.getOwnPropertyDescriptor()`:

- when you only need one property's descriptor.

Use `Object.assign()` or object spread:

- when you only want enumerable property values and do not need descriptor
  details.

## Common Mistakes

### Mistake 1: Expecting Inherited Properties

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);

const descriptors = Object.getOwnPropertyDescriptors(user);

console.log(descriptors.role); // undefined
```

Inherited properties are skipped.

### Mistake 2: Thinking It Only Includes Enumerable Properties

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
});

const descriptors = Object.getOwnPropertyDescriptors(settings);

console.log('internalId' in descriptors); // true
```

Non-enumerable own properties are included.

### Mistake 3: Thinking The Descriptor Map Is Live

```js
const user = {
  name: 'Asha',
};

const descriptors = Object.getOwnPropertyDescriptors(user);

descriptors.name.value = 'Mina';

console.log(user.name); // Asha
```

The descriptor map is a copy, not a live control panel.

### Mistake 4: Using `Object.assign()` When You Need Descriptors

```js
const assigned = Object.assign({}, source);
```

`Object.assign()` copies values. It does not preserve non-enumerable
properties, getter/setter descriptors, or descriptor flags.

Use descriptor copying when those details matter:

```js
const copied = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(source),
);
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.getOwnPropertyDescriptors()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors)
- ECMAScript spec:
  [`Object.getOwnPropertyDescriptors`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptors)
