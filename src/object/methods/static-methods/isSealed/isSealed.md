# Object.isSealed()

## What Problem Does It Solve?

`Object.isSealed()` checks whether an object is sealed.

It is useful when you need to know whether an object can no longer grow, lose
own properties, or reconfigure its own properties.

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isSealed(profile)); // false

Object.seal(profile);

console.log(Object.isSealed(profile)); // true
```

`Object.isSealed()` only checks.

It does not seal the object by itself.

## Quick Definition

`Object.isSealed(object)` returns `true` when `object` is sealed.

An object is sealed when:

- new properties cannot be added,
- existing own properties cannot be deleted,
- existing own properties cannot be reconfigured.

Important: if an existing data property has `writable: true`, its value can
still be updated.

```js
const user = Object.seal({
  name: 'Asha',
});

console.log(Object.isSealed(user)); // true
```

## Mental Model

Think of sealed as:

```text
The object's property list is locked.
The object's own property settings are locked.
But writable values may still change.
```

It answers:

```text
Is this object's top-level property structure sealed?
```

## Syntax

```js
Object.isSealed(object);
```

## Parameters

- `object`: The value to check.

If the value is an object, JavaScript checks its sealed state.

If the value is a primitive, modern JavaScript returns `true` because
primitives cannot be extended or reconfigured like objects.

## Return Value

`Object.isSealed()` returns a boolean:

- `true` means the value is sealed,
- `false` means it is not sealed.

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isSealed(profile)); // false

Object.seal(profile);

console.log(Object.isSealed(profile)); // true
```

## Basic Example

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

profile.name = 'Mina';
profile.email = 'mina@example.com';

delete profile.name;

console.log(profile.name); // Mina
console.log(profile.email); // undefined
console.log(Object.hasOwn(profile, 'name')); // true
```

What happened:

- `profile` was sealed.
- Updating the existing writable `name` property worked.
- Adding `email` failed.
- Deleting `name` failed.

## It Only Checks

`Object.isSealed()` does not seal an object.

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isSealed(profile)); // false

profile.email = 'asha@example.com';

console.log(profile.email); // asha@example.com
```

Use `Object.seal()` when you want to seal the object:

```js
Object.seal(profile);

console.log(Object.isSealed(profile)); // true
```

## Sealed Means Non-Extensible

A sealed object is always non-extensible.

```js
const profile = Object.seal({
  name: 'Asha',
});

console.log(Object.isSealed(profile)); // true
console.log(Object.isExtensible(profile)); // false
```

That means new properties cannot be added.

```js
profile.email = 'asha@example.com';

console.log(Object.hasOwn(profile, 'email')); // false
```

## Sealed Properties Are Non-Configurable

`Object.seal()` makes existing own properties non-configurable.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

const descriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log(descriptor.configurable); // false
console.log(descriptor.writable); // true
```

What happened:

- `configurable: false` means the property cannot be deleted or reconfigured.
- `writable: true` means the property value can still change.

## Existing Writable Values Can Still Change

Sealed does not mean read-only.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

profile.name = 'Mina';

console.log(profile.name); // Mina
console.log(Object.isSealed(profile)); // true
```

The object is still sealed after the value changes.

Use `Object.freeze()` when existing data-property values should also be locked.

## Properties Cannot Be Deleted

Sealed own properties cannot be deleted.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

const deleted = Reflect.deleteProperty(profile, 'name');

console.log(deleted); // false
console.log(Object.hasOwn(profile, 'name')); // true
```

`Reflect.deleteProperty()` returns `false` instead of throwing in this example.

In strict mode, deleting a non-configurable property throws a `TypeError`.

## Empty Non-Extensible Objects

An empty non-extensible object is sealed.

```js
const record = {};

Object.preventExtensions(record);

console.log(Object.isSealed(record)); // true
console.log(Object.isFrozen(record)); // true
```

This can feel surprising.

The reason is:

```text
The object has no own properties that could still be configurable.
The object also cannot receive new properties.
So it is sealed.
```

This is sometimes called vacuously sealed.

## Non-Empty Non-Extensible Objects

A non-empty non-extensible object is not sealed while its own properties are
still configurable.

```js
const account = {
  role: 'admin',
};

Object.preventExtensions(account);

console.log(Object.isSealed(account)); // false

Object.defineProperty(account, 'role', {
  configurable: false,
});

console.log(Object.isSealed(account)); // true
```

What happened:

- `Object.preventExtensions(account)` blocked new properties.
- The existing `role` property was still configurable.
- After `configurable: false`, the object became sealed.

## Difference From `Object.isFrozen()`

A frozen object is sealed.

A sealed object is not always frozen.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

console.log(Object.isSealed(profile)); // true
console.log(Object.isFrozen(profile)); // false

profile.name = 'Mina';

console.log(profile.name); // Mina
```

What happened:

- `profile` was sealed.
- The `name` property was still writable.
- The object was sealed, but not frozen.

After `Object.freeze(profile)`, the writable data property becomes
non-writable:

```js
Object.freeze(profile);

console.log(Object.isFrozen(profile)); // true
```

## Accessor Properties

Accessor properties use getters and setters.

They do not have a `writable` descriptor flag.

For a sealed object, accessor properties must be non-configurable.

```js
let score = 10;
const scoreboard = {};

Object.defineProperty(scoreboard, 'score', {
  get() {
    return score;
  },
  set(nextScore) {
    score = nextScore;
  },
  configurable: false,
});

Object.preventExtensions(scoreboard);

console.log(Object.isSealed(scoreboard)); // true

scoreboard.score = 20;

console.log(scoreboard.score); // 20
```

What happened:

- `score` is an accessor property.
- The accessor property is non-configurable.
- The object is non-extensible.
- So `Object.isSealed(scoreboard)` is `true`.
- The setter can still run because sealing does not remove the setter.

## Seal Is Shallow

`Object.seal()` seals the object itself.

It does not automatically seal nested objects.

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.seal(layout);

layout.sidebar.collapsed = true;

console.log(Object.isSealed(layout)); // true
console.log(Object.isSealed(layout.sidebar)); // false
console.log(layout.sidebar.collapsed); // true
```

What happened:

- The top-level `layout` object was sealed.
- The nested `sidebar` object was a separate object.
- `sidebar` was not sealed.
- New properties could still be added to `sidebar`.

## Primitive Values

Primitive values are considered sealed in modern JavaScript.

```js
console.log(Object.isSealed(42)); // true
console.log(Object.isSealed('hello')); // true
console.log(Object.isSealed(null)); // true
console.log(Object.isSealed(undefined)); // true
```

The idea is:

```text
Primitives are not objects.
They cannot grow new own properties.
They cannot have object-style property descriptors reconfigured.
```

## Difference From Related Checks

Use `Object.isExtensible()`:

- to ask whether new properties can be added.

Use `Object.isSealed()`:

- to ask whether new properties cannot be added and existing own properties
  cannot be deleted or reconfigured.

Use `Object.isFrozen()`:

- to ask whether the object is sealed and existing own data-property values are
  also non-writable.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

console.log(Object.isExtensible(profile)); // false
console.log(Object.isSealed(profile)); // true
console.log(Object.isFrozen(profile)); // false
```

This object is sealed, but not frozen, because `name` can still be changed.

## Strict Mode Errors

In non-strict mode, some failed sealed-object changes are ignored silently.

In strict mode, they throw `TypeError`.

```js
const profile = Object.seal({
  name: 'Asha',
});

function addEmail() {
  'use strict';
  profile.email = 'asha@example.com';
}

addEmail();
// TypeError
```

Deleting a sealed own property also throws in strict mode:

```js
function deleteName() {
  'use strict';
  delete profile.name;
}

deleteName();
// TypeError
```

## Important Notes

- `Object.isSealed()` is a static method.
- It checks whether a value is sealed.
- It does not seal the object.
- Sealed objects are non-extensible.
- Existing own properties must be non-configurable.
- Existing writable data-property values can still change.
- Sealed objects are not always frozen.
- Frozen objects are sealed.
- Empty non-extensible objects are sealed.
- Sealing is shallow.
- Accessor setters can still run.
- Primitive values return `true` in modern JavaScript.

## When To Use It

Use `Object.isSealed()` when:

- you need to verify that `Object.seal()` ran,
- you are debugging object integrity behavior,
- you need to distinguish sealed objects from frozen or merely non-extensible
  objects,
- you want to protect an object's top-level property structure while still
  allowing writable values to change.

## Common Mistakes

### Mistake 1: Thinking It Seals The Object

```js
const user = {
  name: 'Asha',
};

Object.isSealed(user);

user.email = 'asha@example.com';

console.log(user.email); // asha@example.com
```

`Object.isSealed()` only checks.

Use `Object.seal()` to seal the object.

### Mistake 2: Thinking Sealed Means Read-Only

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

user.name = 'Mina';

console.log(user.name); // Mina
```

The existing `name` data property was still writable.

### Mistake 3: Thinking Sealed Means Frozen

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

console.log(Object.isSealed(user)); // true
console.log(Object.isFrozen(user)); // false
```

A sealed writable data property can still change.

### Mistake 4: Thinking Seal Is Deep

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.seal(layout);

layout.sidebar.collapsed = true;

console.log(Object.isSealed(layout)); // true
console.log(Object.isSealed(layout.sidebar)); // false
```

The nested object was not sealed.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/isSealed/isSealed.js
```

The runnable file shows:

- checking a normal object,
- `Object.seal()`,
- writable values inside sealed objects,
- failed deletion,
- non-configurable descriptors,
- failed reconfiguration,
- sealed versus frozen,
- empty non-extensible objects,
- accessor properties,
- shallow sealing,
- primitive values,
- strict mode errors.

## References

- MDN:
  [`Object.isSealed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
- ECMAScript specification:
  [`Object.isSealed`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.issealed)
