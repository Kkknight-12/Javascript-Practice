# Object.seal()

## What Problem Does It Solve?

`Object.seal()` locks an object's top-level property structure.

That means:

```text
No new own properties.
No deleting existing own properties.
No reconfiguring existing own properties.
```

But existing writable data-property values can still change.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

profile.name = 'Mina';
profile.email = 'mina@example.com';

console.log(profile.name);
// Mina

console.log(profile.email);
// undefined
```

## Quick Definition

`Object.seal(object)` seals `object` and returns the same object.

Sealed means:

- the object is non-extensible,
- existing own properties are non-configurable,
- existing writable data-property values can still change.

Example:

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

console.log(Object.isSealed(user));
// true
```

## Mental Model

Think of `Object.seal()` as:

```text
The object's own property list is locked.
The object's own property settings are locked.
Writable values may still change.
```

It is stronger than `Object.preventExtensions()`.

It is weaker than `Object.freeze()`.

## Syntax

```js
Object.seal(object);
```

## Parameters

- `object`: The object that should be sealed.

In modern JavaScript, primitive values are returned as-is.

## Return Value

`Object.seal()` returns the same value that was passed in.

For objects, it returns the same object after sealing it:

```js
const settings = {};
const result = Object.seal(settings);

console.log(result === settings);
// true
```

For primitive values, modern JavaScript returns the primitive value:

```js
console.log(Object.seal(42));
// 42
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

console.log(profile.name);
// Mina

console.log(profile.email);
// undefined

console.log(Object.hasOwn(profile, 'name'));
// true
```

What happened:

- `profile` was sealed.
- Updating the existing writable `name` property worked.
- Adding `email` failed.
- Deleting `name` failed.

## It Changes The Same Object

`Object.seal()` mutates the object.

It does not create a sealed copy.

```js
const profile = {
  name: 'Asha',
};

const returnedProfile = Object.seal(profile);

console.log(returnedProfile === profile);
// true
```

What happened:

- `profile` itself became sealed.
- `returnedProfile` points to the same object.

## Sealed Means Non-Extensible

A sealed object cannot receive new own properties.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

console.log(Object.isExtensible(profile));
// false

profile.email = 'asha@example.com';

console.log(Object.hasOwn(profile, 'email'));
// false
```

This is the `Object.preventExtensions()` part of sealing.

## Sealed Means Non-Configurable Own Properties

`Object.seal()` makes existing own properties non-configurable.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

const descriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log(descriptor.configurable);
// false

console.log(descriptor.writable);
// true
```

What happened:

- `configurable: false` means the property cannot be deleted or reconfigured.
- `writable: true` means the data-property value can still change.

## Existing Writable Values Can Still Change

Sealed does not mean read-only.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

profile.name = 'Mina';

console.log(profile.name);
// Mina
```

The object is still sealed after the value changes:

```js
console.log(Object.isSealed(profile));
// true
```

Use `Object.freeze()` when existing data-property values should also be locked.

## Existing Properties Cannot Be Deleted

Sealed own properties cannot be deleted.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

const deleted = Reflect.deleteProperty(profile, 'name');

console.log(deleted);
// false

console.log(Object.hasOwn(profile, 'name'));
// true
```

`Reflect.deleteProperty()` returns `false` here.

In strict mode, deleting a sealed own property throws `TypeError`.

## Existing Properties Cannot Be Reconfigured

Sealed properties are non-configurable.

That means you cannot change descriptor settings like `enumerable` or
`configurable`, and you cannot convert a data property into an accessor property.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

Object.defineProperty(profile, 'name', {
  enumerable: false,
});
// TypeError
```

What happened:

- `Object.seal(profile)` made `name` non-configurable.
- Changing `enumerable` would reconfigure the property.
- Reconfiguration failed.

## Updating A Writable Sealed Value With `Object.defineProperty()`

Changing the value of an existing writable data property is still allowed.

```js
const profile = {
  name: 'Asha',
};

Object.seal(profile);

Object.defineProperty(profile, 'name', {
  value: 'Mina',
});

console.log(profile.name);
// Mina
```

You can also change a sealed data property from `writable: true` to
`writable: false`.

```js
Object.defineProperty(profile, 'name', {
  writable: false,
});
```

After a non-configurable property becomes non-writable, it cannot be made
writable again.

## Prototype Cannot Be Reassigned

A sealed object's prototype cannot be changed to a different object.

```js
const defaults = {
  role: 'member',
};

const account = Object.create(defaults);

Object.seal(account);

Object.setPrototypeOf(account, {});
// TypeError
```

What happened:

- `account` was sealed.
- A sealed object is non-extensible.
- Non-extensible objects cannot be changed to a different prototype.

## Prototype Can Still Grow

`Object.seal()` seals the target object.

It does not seal the target object's prototype object.

```js
const defaults = {
  role: 'member',
};

const account = Object.create(defaults);

Object.seal(account);

defaults.plan = 'free';

console.log(account.plan);
// free

console.log(Object.hasOwn(account, 'plan'));
// false
```

What happened:

- `account` could not receive new own properties.
- `defaults` was still a separate object.
- Adding `plan` to `defaults` made it visible through inheritance.
- `plan` is inherited, not own.

## Accessor Properties

Accessor properties use getters and setters.

They do not have a `writable` descriptor flag.

When an accessor property is sealed, it becomes non-configurable, but the setter
can still run.

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
  enumerable: true,
  configurable: true,
});

Object.seal(scoreboard);

scoreboard.score = 20;

console.log(scoreboard.score);
// 20
```

What happened:

- `score` became non-configurable.
- The setter still exists.
- Writing `scoreboard.score = 20` still ran the setter.

## Difference From `Object.preventExtensions()` And `Object.freeze()`

Use this comparison:

```text
Action                    New props  Delete configurable props  Reconfigure props  Change writable values
Object.preventExtensions  no         yes                        yes                yes
Object.seal               no         no                         no                 yes
Object.freeze             no         no                         no                 no
```

`Object.seal()` sits in the middle:

- stronger than `Object.preventExtensions()`,
- weaker than `Object.freeze()`.

## Sealed Is Not Always Frozen

A sealed object is not automatically frozen.

```js
const settings = {
  theme: 'dark',
};

Object.seal(settings);

console.log(Object.isSealed(settings));
// true

console.log(Object.isFrozen(settings));
// false

settings.theme = 'light';

console.log(settings.theme);
// light
```

The object is sealed, but not frozen, because `theme` is still writable.

## Frozen Objects Are Sealed

Frozen objects are sealed.

```js
const settings = Object.freeze({
  theme: 'dark',
});

console.log(Object.isFrozen(settings));
// true

console.log(Object.isSealed(settings));
// true
```

Frozen is stricter than sealed.

## Shallow Behavior

`Object.seal()` affects only the object you pass in.

It does not automatically seal nested objects.

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.seal(layout);

layout.sidebar.collapsed = true;

console.log(Object.isSealed(layout));
// true

console.log(Object.isSealed(layout.sidebar));
// false
```

What happened:

- The top-level `layout` object became sealed.
- `layout.sidebar` is a separate object.
- The nested `sidebar` object could still receive new properties.

## Arrays

Arrays can be sealed.

Existing elements can change, but new elements cannot be added and existing
elements cannot be deleted.

```js
const scores = [10, 20];

Object.seal(scores);

scores[0] = 99;
scores[2] = 30;

console.log(scores);
// [ 99, 20 ]

console.log(Object.hasOwn(scores, 2));
// false
```

What happened:

- Index `0` already existed, so changing it worked.
- Index `2` would be a new property, so adding it failed.
- Existing array index properties are non-configurable after sealing.

## Null-Prototype Objects

Null-prototype objects can be sealed.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

Object.seal(dictionary);
dictionary.level = 'beginner';

console.log(Object.keys(dictionary));
// [ 'topic' ]

console.log(Object.isSealed(dictionary));
// true
```

The null prototype does not change the seal rule.

## Primitive Values

In modern JavaScript, primitive values are returned as-is.

```js
console.log(Object.seal(42));
// 42

console.log(Object.seal(null));
// null
```

Primitives are not objects, so there are no object properties to seal.

```js
console.log(Object.isSealed(42));
// true
```

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

- `Object.seal()` is a static method.
- It seals the object passed to it and returns the same object.
- It does not create a clone.
- It prevents adding new own properties.
- It prevents deleting existing own properties.
- It prevents reconfiguring existing own properties.
- It makes existing own properties non-configurable.
- It prevents changing the object's prototype to a different object.
- Existing writable data-property values can still change.
- Accessor setters can still run.
- It is shallow.
- A sealed object cannot be unsealed or made extensible again.
- Arrays can be sealed.
- Null-prototype objects can be sealed.
- Primitive values are returned as-is in modern JavaScript.

## When To Use It

Use `Object.seal()`:

- when an object should keep the same top-level property list,
- when existing properties should not be removed,
- when property descriptor settings should not be reconfigured,
- when existing writable values may still change,
- when you want a middle level between `Object.preventExtensions()` and
  `Object.freeze()`.

Use `Object.preventExtensions()`:

- when you only want to block new properties.

Use `Object.freeze()`:

- when existing data-property values should also be locked.

## Common Mistakes

### Mistake 1: Thinking Seal Means Read-Only

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

user.name = 'Mina';

console.log(user.name);
// Mina
```

Existing writable values can still change.

### Mistake 2: Thinking Seal Is Deep

```js
const layout = {
  sidebar: {},
};

Object.seal(layout);

layout.sidebar.collapsed = true;

console.log(layout.sidebar.collapsed);
// true
```

The nested object was not sealed.

### Mistake 3: Thinking Sealed And Frozen Are The Same

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

console.log(Object.isFrozen(user));
// false
```

The object is sealed, but not frozen, because `name` can still change.

### Mistake 4: Expecting Deleted Properties To Disappear

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

delete user.name;

console.log(user.name);
// Asha
```

Sealed own properties cannot be deleted.

### Mistake 5: Thinking The Prototype Object Is Sealed Too

```js
const parent = {};
const child = Object.create(parent);

Object.seal(child);

parent.shared = true;

console.log(child.shared);
// true
```

`child` was sealed.

`parent` was a separate object and could still grow.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/seal/seal.js
```

The runnable file shows:

- sealing an object,
- same-object return value,
- failed new-property additions,
- updating existing writable properties,
- failed deletion,
- non-configurable descriptors,
- descriptor reconfiguration errors,
- prototype reassignment behavior,
- inherited properties from a growing prototype,
- accessor setter behavior,
- sealed versus frozen behavior,
- shallow behavior,
- arrays,
- null-prototype objects,
- primitive values,
- strict mode assignment and deletion errors.

## References

- MDN:
  [`Object.seal()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
- ECMAScript specification:
  [`Object.seal`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.seal)
