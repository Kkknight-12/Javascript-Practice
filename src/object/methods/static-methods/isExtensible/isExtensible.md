# Object.isExtensible()

## What Problem Does It Solve?

`Object.isExtensible()` checks whether new properties can still be added to an
object.

That is useful when you need to know whether an object is still open for new
top-level properties:

```js
const settings = {
  theme: 'dark',
};

console.log(Object.isExtensible(settings)); // true

Object.preventExtensions(settings);

console.log(Object.isExtensible(settings)); // false
```

It checks the object's extensibility state.

It does not freeze the object.

It does not seal the object.

It does not make any change by itself.

## Quick Definition

`Object.isExtensible(object)` returns `true` when new properties can be added to
`object`.

```js
const user = {
  name: 'Asha',
};

console.log(Object.isExtensible(user)); // true
```

New ordinary objects are extensible by default.

## Mental Model

Think of extensible as:

```text
Can this object grow new own properties?
```

If the answer is yes:

```js
object.newProperty = value;
```

can create a new property.

If the answer is no, new own properties cannot be added.

## Syntax

```js
Object.isExtensible(object);
```

## Parameters

- `object`: The value to check.

If the value is an object, JavaScript checks whether that object is extensible.

If the value is a primitive, modern JavaScript returns `false` because
primitives are not objects and cannot have own properties added to them.

## Return Value

`Object.isExtensible()` returns a boolean:

- `true` means new properties can be added,
- `false` means new properties cannot be added.

```js
const profile = {};

console.log(Object.isExtensible(profile)); // true

Object.preventExtensions(profile);

console.log(Object.isExtensible(profile)); // false
```

## Basic Example

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isExtensible(profile)); // true

profile.role = 'developer';

console.log(profile.role); // developer
```

What happened:

- `profile` was a normal object.
- Normal objects are extensible by default.
- Adding `role` worked because the object could still grow.

## Making An Object Non-Extensible

`Object.preventExtensions()` makes an object non-extensible.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

console.log(Object.isExtensible(profile)); // false

profile.email = 'asha@example.com';

console.log(Object.hasOwn(profile, 'email')); // false
```

What happened:

- `Object.preventExtensions(profile)` changed the object itself.
- `Object.isExtensible(profile)` returned `false`.
- Adding `email` did not create a new property.

## It Only Checks

`Object.isExtensible()` only checks the state.

It does not change the object.

```js
const profile = {};

const result = Object.isExtensible(profile);

console.log(result); // true
console.log(Object.isExtensible(profile)); // true
```

Use `Object.preventExtensions()` when you want to change the object:

```js
Object.preventExtensions(profile);

console.log(Object.isExtensible(profile)); // false
```

## Existing Properties Can Still Change

Non-extensible does not mean read-only.

It only means new properties cannot be added.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

profile.name = 'Mina';

console.log(profile.name); // Mina
```

What happened:

- `name` already existed.
- The property was still writable.
- Updating that existing property worked.

Use `Object.freeze()` when existing data-property values should also be locked.

## Existing Properties Can Still Be Deleted

Non-extensible does not mean sealed.

If an existing property is configurable, it can still be deleted.

```js
const settings = {
  theme: 'dark',
};

Object.preventExtensions(settings);

delete settings.theme;

console.log(Object.hasOwn(settings, 'theme')); // false

settings.theme = 'light';

console.log(settings.theme); // undefined
```

What happened:

- `theme` already existed and was configurable by default.
- Deleting it worked.
- Adding it back did not work because the object was non-extensible.

Use `Object.seal()` when existing properties should also be protected from
deletion or reconfiguration.

## `Object.defineProperty()` Cannot Add New Properties

When an object is non-extensible, even `Object.defineProperty()` cannot add a
new property.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

Object.defineProperty(profile, 'email', {
  value: 'asha@example.com',
});
// TypeError
```

What happened:

- `email` did not already exist.
- The object was non-extensible.
- Defining a new property failed.

## Seal And Freeze Also Make Objects Non-Extensible

`Object.seal()` and `Object.freeze()` both include the
`preventExtensions()` behavior.

```js
const sealed = Object.seal({});
const frozen = Object.freeze({});

console.log(Object.isExtensible(sealed)); // false
console.log(Object.isExtensible(frozen)); // false
```

Mental model:

```text
preventExtensions -> no new properties
seal              -> no new properties, no deleting/reconfiguring
freeze            -> no new properties, no deleting/reconfiguring,
                     no changing data-property values
```

## Prototype Changes

Extensible objects can usually have their prototype changed.

Non-extensible objects cannot be changed to a different prototype.

```js
const base = {
  role: 'member',
};

const user = {};

Object.setPrototypeOf(user, base);

console.log(user.role); // member

Object.preventExtensions(user);

Object.setPrototypeOf(user, {});
// TypeError
```

What happened:

- The first prototype change happened while the object was extensible.
- After `Object.preventExtensions(user)`, the object became non-extensible.
- Changing to a different prototype failed.

## Null-Prototype Objects

A null-prototype object is still extensible by default.

```js
const dictionary = Object.create(null);

console.log(Object.getPrototypeOf(dictionary)); // null
console.log(Object.isExtensible(dictionary)); // true

dictionary.topic = 'objects';

console.log(dictionary.topic); // objects
```

What happened:

- `dictionary` does not inherit from `Object.prototype`.
- That does not automatically make it non-extensible.
- New properties can still be added until you prevent extensions.

## Primitive Values

Primitive values are not extensible.

```js
console.log(Object.isExtensible(42)); // false
console.log(Object.isExtensible('hello')); // false
console.log(Object.isExtensible(null)); // false
console.log(Object.isExtensible(undefined)); // false
```

Modern JavaScript returns `false` for primitive values.

The important idea:

```text
Only objects can be extensible.
Primitives are not objects.
```

## Difference From `Reflect.isExtensible()`

`Object.isExtensible()` and `Reflect.isExtensible()` both check whether an
object is extensible.

The important beginner difference is primitive values:

```js
console.log(Object.isExtensible(42)); // false

Reflect.isExtensible(42);
// TypeError
```

`Reflect.isExtensible()` expects an object.

`Object.isExtensible()` returns `false` for primitives in modern JavaScript.

## Difference From Related Methods

Use `Object.isExtensible()`:

- to ask whether new properties can be added.

Use `Object.isSealed()`:

- to ask whether new properties cannot be added and existing own properties
  cannot be deleted or reconfigured.

Use `Object.isFrozen()`:

- to ask whether the object is sealed and existing own data-property values are
  also non-writable.

```js
const settings = {
  theme: 'dark',
};

Object.preventExtensions(settings);

console.log(Object.isExtensible(settings)); // false
console.log(Object.isSealed(settings)); // false
console.log(Object.isFrozen(settings)); // false
```

This object is non-extensible, but it is not automatically sealed or frozen.

## Strict Mode Errors

In non-strict mode, assigning a new property to a non-extensible object usually
fails silently.

In strict mode, it throws a `TypeError`.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

function addEmail() {
  'use strict';
  profile.email = 'asha@example.com';
}

addEmail();
// TypeError
```

## Important Notes

- `Object.isExtensible()` is a static method.
- It checks whether new properties can be added.
- New ordinary objects are extensible by default.
- `Object.preventExtensions()` makes an object non-extensible.
- `Object.seal()` and `Object.freeze()` also make objects non-extensible.
- Non-extensible does not mean read-only.
- Non-extensible does not mean sealed.
- Existing writable properties can still be changed.
- Existing configurable properties can still be deleted.
- A non-extensible object cannot be changed to a different prototype.
- Primitive values return `false` in modern JavaScript.

## When To Use It

Use `Object.isExtensible()` when:

- you need to check whether an object can still accept new properties,
- you are teaching or debugging object integrity methods,
- you need to verify that `Object.preventExtensions()`, `Object.seal()`, or
  `Object.freeze()` has made an object non-extensible.

## Common Mistakes

### Mistake 1: Thinking It Prevents Extensions

```js
const user = {};

Object.isExtensible(user);

user.name = 'Asha';

console.log(user.name); // Asha
```

`Object.isExtensible()` only checks.

Use `Object.preventExtensions()` to change the object.

### Mistake 2: Thinking Non-Extensible Means Read-Only

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);

user.name = 'Mina';

console.log(user.name); // Mina
```

The existing `name` property could still change because it was writable.

### Mistake 3: Thinking Non-Extensible Means Sealed

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);

delete user.name;

console.log(Object.hasOwn(user, 'name')); // false
```

The property was still configurable, so deleting it worked.

### Mistake 4: Expecting Primitives To Throw

```js
console.log(Object.isExtensible(42)); // false
```

Modern JavaScript returns `false` for primitives.

`Reflect.isExtensible(42)` throws `TypeError`.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/isExtensible/isExtensible.js
```

The runnable file shows:

- new objects being extensible by default,
- `Object.preventExtensions()`,
- failed new-property additions,
- changing existing writable properties,
- deleting configurable properties,
- `Object.seal()` and `Object.freeze()`,
- prototype-change behavior,
- null-prototype objects,
- primitive values,
- `Reflect.isExtensible()`,
- strict mode assignment errors.

## References

- MDN:
  [`Object.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
- ECMAScript specification:
  [`Object.isExtensible`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.isextensible)
