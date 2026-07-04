# Object.freeze()

## What Problem Does It Solve?

`Object.freeze()` locks an object so its top-level structure cannot be changed.

After an object is frozen:

- new properties cannot be added,
- existing own properties cannot be deleted,
- existing own data-property values cannot be changed,
- existing own properties cannot be reconfigured,
- the object's prototype cannot be changed.

This is useful when an object should behave like a stable configuration or a
constant record.

## Quick Definition

`Object.freeze(object)` freezes `object` and returns the same object.

```js
const settings = {
  theme: 'dark',
};

const result = Object.freeze(settings);

console.log(result === settings); // true
console.log(Object.isFrozen(settings)); // true
```

It does not create a frozen copy.

## Mental Model

Think of `Object.freeze()` as the highest object-locking level:

```text
Object.freeze(object)
  -> prevent new properties
  -> prevent deleting own properties
  -> prevent changing own data-property values
  -> prevent reconfiguring own properties
  -> prevent changing the prototype
```

It freezes the object itself.

It does not automatically freeze nested objects.

## Syntax

```js
Object.freeze(object);
```

## Parameters

- `object`: The object to freeze.

## Return Value

`Object.freeze()` returns the same value that was passed in.

For objects, it returns the same object after freezing it.

```js
const settings = {
  theme: 'dark',
};

const result = Object.freeze(settings);

console.log(result === settings); // true
```

For primitive values, it returns the primitive unchanged:

```js
console.log(Object.freeze(42)); // 42
console.log(Object.freeze(null)); // null
```

## Basic Example

```js
const settings = {
  theme: 'dark',
  notifications: true,
};

Object.freeze(settings);

settings.theme = 'light';
settings.language = 'en';
delete settings.notifications;

console.log(settings.theme); // dark
console.log(settings.language); // undefined
console.log(settings.notifications); // true
```

What happened:

- `settings` was frozen.
- Changing `theme` failed.
- Adding `language` failed.
- Deleting `notifications` failed.

In non-strict mode, many failed changes are ignored silently.

In strict mode, failed writes usually throw a `TypeError`.

## It Returns The Same Object

```js
const settings = {
  theme: 'dark',
};

const returnedSettings = Object.freeze(settings);

console.log(returnedSettings === settings); // true
```

`Object.freeze()` mutates the object by freezing it.

It does not clone the object.

## Frozen Means Not Extensible, Sealed, And Non-Writable

A frozen object is also:

```text
not extensible
sealed
frozen
```

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

console.log(Object.isExtensible(settings)); // false
console.log(Object.isSealed(settings)); // true
console.log(Object.isFrozen(settings)); // true
```

What happened:

- `Object.isExtensible(settings)` is `false` because new properties cannot be
  added.
- `Object.isSealed(settings)` is `true` because own properties cannot be
  added, deleted, or reconfigured.
- `Object.isFrozen(settings)` is `true` because own data-property values also
  cannot be changed.

## Property Descriptors After Freezing

For existing own data properties, `Object.freeze()` changes descriptor flags:

```text
writable     -> false
configurable -> false
```

Example:

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

const descriptor = Object.getOwnPropertyDescriptor(settings, 'theme');

console.log(descriptor.writable); // false
console.log(descriptor.configurable); // false
```

`enumerable` does not change just because the object is frozen.

## Strict Mode Errors

In non-strict mode, this usually fails silently:

```js
settings.theme = 'light';
```

In strict mode, the failed write throws a `TypeError`:

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

function updateSettings() {
  'use strict';
  settings.theme = 'light';
}

updateSettings(); // TypeError
```

## Cannot Redefine Properties

`Object.defineProperty()` cannot redefine a frozen data property.

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

Object.defineProperty(settings, 'theme', {
  value: 'system',
}); // TypeError
```

The property is non-configurable and non-writable after freezing.

## Cannot Change The Prototype

After freezing, the object's prototype cannot be changed.

```js
const settings = {};

Object.freeze(settings);

Object.setPrototypeOf(settings, {
  shared: true,
}); // TypeError
```

## Freeze Does Not Freeze The Prototype Object

`Object.freeze()` prevents changing the object's prototype link.

It does not freeze the separate object that is already being used as the
prototype.

```js
const sharedProfile = {
  role: 'learner',
};

const profile = Object.create(sharedProfile);
profile.name = 'Ava';

Object.freeze(profile);

sharedProfile.role = 'mentor';

console.log(profile.role); // mentor
console.log(Object.isFrozen(sharedProfile)); // false
```

What happened:

- `profile` is frozen.
- The link from `profile` to `sharedProfile` cannot be changed.
- But `sharedProfile` is still a separate object.
- Because `sharedProfile` was not frozen, its own `role` property could still
  change.

## Freeze Is Shallow

This is the most important gotcha.

`Object.freeze()` freezes only the object you pass to it.

Nested objects are still mutable unless you freeze them too.

```js
const layout = {
  sidebar: {
    collapsed: false,
  },
};

Object.freeze(layout);

layout.sidebar.collapsed = true;

console.log(layout.sidebar.collapsed); // true
console.log(Object.isFrozen(layout.sidebar)); // false
```

What happened:

- `layout` itself is frozen.
- The `sidebar` property cannot be replaced.
- But the object stored in `layout.sidebar` is a separate object.
- That nested object was not frozen.
- So `layout.sidebar.collapsed` could still change.

## Arrays

Arrays are objects, so they can be frozen.

```js
const scores = [10, 20];

Object.freeze(scores);

scores[0] = 99;

console.log(scores[0]); // 10
```

Adding or removing elements also fails.

```js
scores.push(30); // TypeError
```

What happened:

- Array indexes are object properties.
- The array's length cannot be extended by `push()`.
- Existing elements cannot be changed.

## Accessor Properties

Accessor properties use getters and setters.

When an object is frozen, an accessor property's descriptor becomes
non-configurable, but the getter and setter functions still exist.

```js
const hiddenState = {
  value: 1,
};

const counter = {
  get value() {
    return hiddenState.value;
  },
  set value(nextValue) {
    hiddenState.value = nextValue;
  },
};

Object.freeze(counter);

counter.value = 5;

console.log(counter.value); // 5
```

What happened:

- `counter` is frozen.
- The accessor property `value` still has its setter.
- Assigning to `counter.value` calls the setter.
- The setter changes `hiddenState`, which is a different object.

Freezing the accessor object does not freeze outside state used by the setter.

## Primitive Values

Primitive values are returned unchanged.

```js
console.log(Object.freeze(42)); // 42
console.log(Object.freeze('abc')); // abc
console.log(Object.freeze(null)); // null
console.log(Object.freeze(undefined)); // undefined
```

Primitive values are already not objects with mutable properties in the normal
sense.

## Typed Arrays

Typed arrays with elements cannot be frozen.

```js
Object.freeze(new Uint8Array(1)); // TypeError
```

Typed arrays with no elements can be frozen:

```js
Object.freeze(new Uint8Array(0)); // Uint8Array []
```

This is a special case for array-buffer views.

## Deep Freeze

If you want nested objects to be frozen too, you need to freeze them
recursively.

```js
function deepFreeze(value, seen = new WeakSet()) {
  if (
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  ) {
    return value;
  }

  if (seen.has(value)) {
    return value;
  }

  seen.add(value);

  for (const key of Reflect.ownKeys(value)) {
    deepFreeze(value[key], seen);
  }

  return Object.freeze(value);
}
```

Example:

```js
const appConfig = {
  theme: {
    mode: 'dark',
  },
};

deepFreeze(appConfig);

appConfig.theme.mode = 'light';

console.log(appConfig.theme.mode); // dark
console.log(Object.isFrozen(appConfig.theme)); // true
```

The `WeakSet` helps avoid infinite recursion when objects refer back to each
other.

## Difference From `Object.seal()` And `Object.preventExtensions()`

Use this simple comparison:

```text
Object.preventExtensions()
  -> cannot add new properties

Object.seal()
  -> cannot add properties
  -> cannot delete properties
  -> cannot reconfigure properties

Object.freeze()
  -> cannot add properties
  -> cannot delete properties
  -> cannot reconfigure properties
  -> cannot change own data-property values
```

`Object.freeze()` is the strongest of these three object-locking methods.

## Important Notes

- `Object.freeze()` is a static method on `Object`.
- It freezes the object passed to it and returns the same object.
- It does not create a clone.
- It prevents adding properties.
- It prevents deleting own properties.
- It prevents changing own data-property values.
- It prevents reconfiguring own properties.
- It prevents changing the prototype.
- It does not freeze the separate prototype object.
- It makes data properties non-writable and non-configurable.
- It makes accessor properties non-configurable, but getters and setters still
  exist.
- It is shallow.
- Arrays can be frozen.
- Primitive values are returned unchanged.
- Typed arrays with elements throw `TypeError`.

## When To Use It

Use `Object.freeze()`:

- when an object should not be changed after setup,
- when you want a stable config object,
- when you want to protect constants from accidental mutation,
- when you want a clear runtime signal that the top-level object is locked.

Use a recursive deep-freeze helper:

- when nested objects must also be frozen.

Use `Object.seal()`:

- when properties should not be added or removed, but existing writable values
  may still change.

Use `Object.preventExtensions()`:

- when you only want to prevent new properties.

## Common Mistakes

### Mistake 1: Thinking Freeze Is Deep

```js
const layout = {
  sidebar: {
    collapsed: false,
  },
};

Object.freeze(layout);

layout.sidebar.collapsed = true;

console.log(layout.sidebar.collapsed); // true
```

The nested `sidebar` object was not frozen.

### Mistake 2: Thinking It Creates A Copy

```js
const settings = {
  theme: 'dark',
};

const result = Object.freeze(settings);

console.log(result === settings); // true
```

`Object.freeze()` returns the same object.

### Mistake 3: Expecting Non-Strict Errors

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

settings.theme = 'light';

console.log(settings.theme); // dark
```

In non-strict mode, the failed write may be ignored silently.

### Mistake 4: Forgetting Accessors Can Still Run

```js
const state = {
  value: 1,
};

const counter = {
  set value(nextValue) {
    state.value = nextValue;
  },
};

Object.freeze(counter);

counter.value = 5;

console.log(state.value); // 5
```

The frozen object still has the setter. The setter changed another object.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/freeze/freeze.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- ECMAScript spec:
  [`Object.freeze`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.freeze)
