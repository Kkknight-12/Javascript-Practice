# Object.preventExtensions()

## What Problem Does It Solve?

`Object.preventExtensions()` stops an object from getting new own properties.

That is useful when you want an object's top-level property list to stop growing:

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

profile.email = 'asha@example.com';

console.log(Object.hasOwn(profile, 'email'));
// false
```

The existing object is changed.

No new object is created.

## Quick Definition

`Object.preventExtensions(object)` makes `object` non-extensible.

Non-extensible means:

```text
new own properties cannot be added
```

It does not mean:

```text
existing properties cannot change
existing properties cannot be deleted
the object is frozen
```

Example:

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);

console.log(Object.isExtensible(user));
// false
```

## Mental Model

Think of `Object.preventExtensions()` as locking only the object's ability to
grow.

```text
Can add new own properties?        no
Can change writable values?        yes
Can delete configurable properties? yes
Can add properties to prototype?   yes
```

It is the lightest object-integrity action.

## Syntax

```js
Object.preventExtensions(object);
```

## Parameters

- `object`: The object that should be made non-extensible.

In modern JavaScript, primitive values are returned as-is.

## Return Value

`Object.preventExtensions()` returns the same value that was passed in.

For objects, it returns the same object after making it non-extensible:

```js
const profile = {};
const result = Object.preventExtensions(profile);

console.log(result === profile);
// true
```

For primitive values, modern JavaScript returns the primitive value:

```js
console.log(Object.preventExtensions(42));
// 42
```

## Basic Example

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isExtensible(profile));
// true

Object.preventExtensions(profile);

console.log(Object.isExtensible(profile));
// false

profile.email = 'asha@example.com';

console.log(profile.email);
// undefined
```

What happened:

- `profile` started as extensible.
- `Object.preventExtensions(profile)` made it non-extensible.
- Adding `email` failed because `email` did not already exist.

## It Changes The Same Object

`Object.preventExtensions()` mutates the object.

It does not create a protected copy.

```js
const settings = {
  theme: 'dark',
};

const returnedSettings = Object.preventExtensions(settings);

console.log(returnedSettings === settings);
// true
```

What happened:

- `settings` itself became non-extensible.
- `returnedSettings` points to that same object.

## Existing Properties Can Still Change

Non-extensible does not mean read-only.

Existing writable properties can still be updated.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

profile.name = 'Mina';

console.log(profile.name);
// Mina
```

What happened:

- `name` already existed.
- The `name` property was writable.
- Updating it worked.

Use `Object.freeze()` when existing data-property values should also be locked.

## Existing Properties Can Still Be Deleted

Non-extensible does not mean sealed.

Existing configurable properties can still be deleted.

```js
const settings = {
  theme: 'dark',
};

Object.preventExtensions(settings);

delete settings.theme;

console.log(Object.hasOwn(settings, 'theme'));
// false
```

What happened:

- `theme` already existed.
- Object-literal properties are configurable by default.
- Deleting `theme` worked.

After deletion, adding the same property back is still adding a new property:

```js
settings.theme = 'light';

console.log(settings.theme);
// undefined
```

Use `Object.seal()` when existing properties should also be protected from
deletion or reconfiguration.

## `Object.defineProperty()` Cannot Add New Properties

When an object is non-extensible, `Object.defineProperty()` cannot add a new
property.

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

`Object.defineProperty()` can still update an existing property when normal
descriptor rules allow it:

```js
Object.defineProperty(profile, 'name', {
  value: 'Mina',
});

console.log(profile.name);
// Mina
```

## Prototype Cannot Be Reassigned

A non-extensible object's prototype cannot be changed to a different object.

```js
const base = {
  role: 'member',
};

const user = Object.create(base);

Object.preventExtensions(user);

Object.setPrototypeOf(user, {});
// TypeError
```

What happened:

- `user` was made non-extensible.
- Changing its prototype to a different object failed.
- Its prototype link stayed the same.

## Prototype Can Still Grow

`Object.preventExtensions()` blocks new own properties on the target object.

It does not freeze the target object's prototype.

```js
const defaults = {
  plan: 'free',
};

const account = Object.create(defaults);

Object.preventExtensions(account);

defaults.region = 'global';

console.log(account.region);
// global

console.log(Object.hasOwn(account, 'region'));
// false
```

What happened:

- `account` could not receive new own properties.
- `defaults` was still a separate extensible object.
- Adding `region` to `defaults` made it visible through inheritance.
- `region` is inherited, not own.

## Difference From `Object.seal()` And `Object.freeze()`

`Object.preventExtensions()` is the lightest integrity action.

```text
Action                    New props  Delete configurable props  Change writable values
Object.preventExtensions  no         yes                        yes
Object.seal               no         no                         yes
Object.freeze             no         no                         no
```

Example:

```js
const user = {
  role: 'admin',
};

Object.preventExtensions(user);

console.log(Object.isExtensible(user)); // false
console.log(Object.isSealed(user)); // false
console.log(Object.isFrozen(user)); // false
```

The object is non-extensible, but it is not automatically sealed or frozen.

## Becoming Sealed Later

A non-extensible object can become sealed if all of its own properties become
non-configurable.

```js
const user = {
  role: 'admin',
};

Object.preventExtensions(user);

console.log(Object.isSealed(user));
// false

Object.defineProperty(user, 'role', {
  configurable: false,
});

console.log(Object.isSealed(user));
// true
```

What happened:

- `Object.preventExtensions(user)` blocked new properties.
- `role` was still configurable, so the object was not sealed yet.
- After `configurable: false`, the object became sealed.

## Shallow Behavior

`Object.preventExtensions()` affects only the object you pass in.

It does not automatically make nested objects non-extensible.

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.preventExtensions(layout);

layout.sidebar.collapsed = true;

console.log(Object.isExtensible(layout));
// false

console.log(Object.isExtensible(layout.sidebar));
// true

console.log(layout.sidebar.collapsed);
// true
```

What happened:

- The top-level `layout` object became non-extensible.
- `layout.sidebar` is a separate object.
- The nested `sidebar` object could still receive new properties.

## Null-Prototype Objects

Null-prototype objects can also be made non-extensible.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

Object.preventExtensions(dictionary);
dictionary.level = 'beginner';

console.log(Object.keys(dictionary));
// [ 'topic' ]

console.log(Object.isExtensible(dictionary));
// false
```

The null prototype does not change the rule.

The object cannot receive new own properties after extensions are prevented.

## Primitive Values

In modern JavaScript, primitive values are returned as-is.

```js
console.log(Object.preventExtensions(42));
// 42
```

Primitives are not objects, so they cannot be extensible objects.

```js
console.log(Object.isExtensible(Object.preventExtensions(42)));
// false
```

## Difference From `Object.isExtensible()`

`Object.preventExtensions()` changes the object.

`Object.isExtensible()` only checks the object.

```js
const profile = {};

console.log(Object.isExtensible(profile));
// true

Object.preventExtensions(profile);

console.log(Object.isExtensible(profile));
// false
```

Use the action method when you want to change the object.

Use the check method when you only want to ask about the current state.

## Difference From `Reflect.preventExtensions()`

Both methods try to prevent extensions.

The beginner-facing difference is the return value:

```js
const profile = {};

console.log(Object.preventExtensions(profile) === profile);
// true

console.log(Reflect.preventExtensions(profile));
// true
```

`Object.preventExtensions()` returns the object.

`Reflect.preventExtensions()` returns a boolean.

Another difference is primitive handling:

```js
Object.preventExtensions(42); // 42
Reflect.preventExtensions(42); // TypeError
```

`Reflect.preventExtensions()` expects an object.

## Strict Mode Errors

In non-strict mode, adding a new property to a non-extensible object often fails
silently.

In strict mode, it throws a `TypeError`.

```js
const profile = {};

Object.preventExtensions(profile);

function addEmail() {
  'use strict';
  profile.email = 'asha@example.com';
}

addEmail();
// TypeError
```

## Important Notes

- `Object.preventExtensions()` is a static method.
- It makes an object non-extensible.
- It returns the same object.
- A non-extensible object cannot receive new own properties.
- Existing writable data-property values can still change.
- Existing configurable properties can still be deleted.
- Deleted properties cannot be added back.
- `Object.defineProperty()` cannot add new properties to a non-extensible object.
- A non-extensible object's prototype cannot be changed to a different object.
- The object's prototype can still grow if that prototype object is extensible.
- `Object.preventExtensions()` is shallow.
- A non-extensible object cannot be made extensible again.
- Primitive values are returned as-is in modern JavaScript.

## When To Use It

Use `Object.preventExtensions()` when:

- you want to prevent an object from growing new own properties,
- you want the lightest object-integrity restriction,
- you are preparing to understand `Object.seal()` and `Object.freeze()`,
- you need to debug why adding new properties fails.

Use `Object.seal()`:

- when existing properties should also be protected from deletion and
  reconfiguration.

Use `Object.freeze()`:

- when existing data-property values should also be protected from changes.

## Common Mistakes

### Mistake 1: Thinking It Makes The Object Read-Only

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);

user.name = 'Mina';

console.log(user.name);
// Mina
```

Existing writable values can still change.

### Mistake 2: Thinking It Prevents Deletion

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);

delete user.name;

console.log(Object.hasOwn(user, 'name'));
// false
```

Existing configurable properties can still be deleted.

### Mistake 3: Thinking Deleted Properties Can Be Added Back

```js
const user = {
  name: 'Asha',
};

Object.preventExtensions(user);
delete user.name;

user.name = 'Mina';

console.log(user.name);
// undefined
```

After deletion, `name` would be a new property, and new properties are blocked.

### Mistake 4: Thinking It Is Deep

```js
const layout = {
  sidebar: {},
};

Object.preventExtensions(layout);

layout.sidebar.collapsed = true;

console.log(layout.sidebar.collapsed);
// true
```

The nested object was not made non-extensible.

### Mistake 5: Confusing The Action And The Check

```js
const user = {};

Object.isExtensible(user);

user.name = 'Asha';

console.log(user.name);
// Asha
```

`Object.isExtensible()` only checks.

Use `Object.preventExtensions()` to change the object.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/preventExtensions/preventExtensions.js
```

The runnable file shows:

- making an object non-extensible,
- same-object return value,
- failed new-property additions,
- updating existing writable properties,
- deleting existing configurable properties,
- `Object.defineProperty()` behavior,
- prototype reassignment behavior,
- inherited properties from a growing prototype,
- comparison with sealed and frozen objects,
- shallow behavior,
- null-prototype objects,
- primitive values,
- strict mode assignment errors.

## References

- MDN:
  [`Object.preventExtensions()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
- ECMAScript specification:
  [`Object.preventExtensions`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.preventextensions)
