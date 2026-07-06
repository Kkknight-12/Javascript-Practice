# Object.isFrozen()

## What Problem Does It Solve?

`Object.isFrozen()` checks whether an object is frozen.

It is useful when you need to verify that an object has been locked at the
strongest normal object-integrity level:

```js
const settings = {
  theme: 'dark',
};

console.log(Object.isFrozen(settings)); // false

Object.freeze(settings);

console.log(Object.isFrozen(settings)); // true
```

`Object.isFrozen()` only checks.

It does not freeze the object by itself.

## Quick Definition

`Object.isFrozen(object)` returns `true` when `object` is frozen.

An object is frozen when:

- new properties cannot be added,
- existing own properties cannot be deleted,
- existing own properties cannot be reconfigured,
- existing own data-property values cannot be changed.

```js
const config = Object.freeze({
  mode: 'dark',
});

console.log(Object.isFrozen(config)); // true
```

## Mental Model

Think of frozen as:

```text
The object cannot grow.
Its own properties cannot be removed.
Its own property settings cannot be reconfigured.
Its own data-property values cannot be changed.
```

It checks the top-level object itself.

It does not automatically check every nested object.

## Syntax

```js
Object.isFrozen(object);
```

## Parameters

- `object`: The value to check.

If the value is an object, JavaScript checks its frozen state.

If the value is a primitive, modern JavaScript returns `true` because
primitives cannot be extended or changed like objects.

## Return Value

`Object.isFrozen()` returns a boolean:

- `true` means the value is frozen,
- `false` means it is not frozen.

```js
const user = {
  name: 'Asha',
};

console.log(Object.isFrozen(user)); // false

Object.freeze(user);

console.log(Object.isFrozen(user)); // true
```

## Basic Example

```js
const settings = {
  theme: 'dark',
};

Object.freeze(settings);

settings.theme = 'light';
settings.language = 'en';

console.log(settings.theme); // dark
console.log(settings.language); // undefined
console.log(Object.isFrozen(settings)); // true
```

What happened:

- `Object.freeze(settings)` froze the object.
- Changing `theme` failed.
- Adding `language` failed.
- `Object.isFrozen(settings)` confirmed the frozen state.

## It Only Checks

`Object.isFrozen()` does not freeze the object.

```js
const settings = {
  theme: 'dark',
};

console.log(Object.isFrozen(settings)); // false

settings.theme = 'light';

console.log(settings.theme); // light
```

Use `Object.freeze()` when you want to freeze the object:

```js
Object.freeze(settings);

console.log(Object.isFrozen(settings)); // true
```

## Frozen Means Non-Extensible And Sealed

A frozen object is also non-extensible and sealed.

```js
const settings = Object.freeze({
  theme: 'dark',
});

console.log(Object.isExtensible(settings)); // false
console.log(Object.isSealed(settings)); // true
console.log(Object.isFrozen(settings)); // true
```

What happened:

- New properties cannot be added.
- Existing own properties cannot be deleted.
- Existing own properties cannot be reconfigured.
- Existing own data-property values cannot be changed.

## Non-Extensible Is Not Enough

A non-extensible object is not automatically frozen.

```js
const profile = {
  name: 'Asha',
};

Object.preventExtensions(profile);

console.log(Object.isFrozen(profile)); // false
```

What happened:

- New properties cannot be added.
- But `name` is still writable and configurable.
- So the object is not frozen.

To become frozen without using `Object.freeze()`, the existing data property
must also be non-writable and non-configurable:

```js
Object.defineProperty(profile, 'name', {
  writable: false,
  configurable: false,
});

console.log(Object.isFrozen(profile)); // true
```

## Empty Non-Extensible Objects

An empty non-extensible object is frozen.

```js
const record = {};

Object.preventExtensions(record);

console.log(Object.isFrozen(record)); // true
```

This can feel surprising at first.

The reason is:

```text
There are no properties that could still be writable or configurable.
The object also cannot receive new properties.
So it is frozen.
```

This is sometimes called vacuously frozen.

## Sealed Is Not Always Frozen

A sealed object is not always frozen.

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

console.log(Object.isSealed(user)); // true
console.log(Object.isFrozen(user)); // false

user.name = 'Mina';

console.log(user.name); // Mina
```

What happened:

- The object was sealed.
- New properties cannot be added.
- Existing properties cannot be deleted or reconfigured.
- But the `name` data property was still writable.
- So the object was not frozen.

## Frozen Is Shallow

`Object.freeze()` freezes the object itself.

It does not automatically freeze nested objects.

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.freeze(layout);

layout.sidebar.width = 320;

console.log(Object.isFrozen(layout)); // true
console.log(Object.isFrozen(layout.sidebar)); // false
console.log(layout.sidebar.width); // 320
```

What happened:

- The top-level `layout` object was frozen.
- The nested `sidebar` object was a separate object.
- `sidebar` was not frozen.
- Its `width` property could still change.

Use a deep-freeze helper when nested objects must also be frozen.

## Arrays Can Be Frozen

Arrays are objects, so arrays can be frozen.

```js
const numbers = [1, 2, 3];

Object.freeze(numbers);

numbers[0] = 99;

console.log(numbers[0]); // 1
console.log(Object.isFrozen(numbers)); // true
```

A frozen array cannot receive new elements and its existing index data
properties cannot be changed.

Array methods that add or remove elements also fail because they need to change
the array object:

```js
const numbers = Object.freeze([1, 2, 3]);

numbers.push(4);
// TypeError
```

## Accessor Properties

Accessor properties use getters and setters.

They do not have a `writable` descriptor flag.

For a frozen object, accessor properties must be non-configurable.

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

console.log(Object.isFrozen(scoreboard)); // true

scoreboard.score = 20;

console.log(scoreboard.score); // 20
```

What happened:

- `score` is an accessor property.
- The accessor property is non-configurable.
- The object is non-extensible.
- So `Object.isFrozen(scoreboard)` is `true`.
- The setter can still run because freezing does not remove the setter.

This is an important detail:

```text
Frozen protects the object's own property structure.
It does not guarantee that getter/setter code cannot affect outside state.
```

## Primitive Values

Primitive values are considered frozen in modern JavaScript.

```js
console.log(Object.isFrozen(42)); // true
console.log(Object.isFrozen('hello')); // true
console.log(Object.isFrozen(null)); // true
console.log(Object.isFrozen(undefined)); // true
```

The idea is:

```text
Primitives are not objects.
They cannot grow new own properties.
They cannot have object-style property descriptors changed.
```

## Difference From `Object.freeze()`

Use `Object.freeze()` when you want to freeze an object.

Use `Object.isFrozen()` when you want to check whether it is already frozen.

```js
const settings = {
  theme: 'dark',
};

console.log(Object.isFrozen(settings)); // false

Object.freeze(settings);

console.log(Object.isFrozen(settings)); // true
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
const settings = {
  theme: 'dark',
};

Object.seal(settings);

console.log(Object.isExtensible(settings)); // false
console.log(Object.isSealed(settings)); // true
console.log(Object.isFrozen(settings)); // false
```

This object is sealed, but not frozen, because `theme` can still be changed.

## Strict Mode Errors

In non-strict mode, writes to frozen data properties usually fail silently.

In strict mode, they throw a `TypeError`.

```js
const settings = Object.freeze({
  theme: 'dark',
});

function updateTheme() {
  'use strict';
  settings.theme = 'light';
}

updateTheme();
// TypeError
```

## Important Notes

- `Object.isFrozen()` is a static method.
- It checks whether a value is frozen.
- It does not freeze the object.
- Frozen objects are non-extensible.
- Frozen objects are sealed.
- Existing own data properties must be non-writable.
- Existing own properties must be non-configurable.
- Empty non-extensible objects are frozen.
- Sealed objects are not always frozen.
- Freezing is shallow.
- Accessor properties are checked by configurability, not writability.
- Primitive values return `true` in modern JavaScript.

## When To Use It

Use `Object.isFrozen()` when:

- you need to verify that `Object.freeze()` ran,
- you are debugging object integrity behavior,
- you need to distinguish frozen objects from sealed or merely non-extensible
  objects,
- you want to guard code that expects a stable top-level object.

## Common Mistakes

### Mistake 1: Thinking It Freezes The Object

```js
const user = {
  name: 'Asha',
};

Object.isFrozen(user);

user.name = 'Mina';

console.log(user.name); // Mina
```

`Object.isFrozen()` only checks.

Use `Object.freeze()` to freeze the object.

### Mistake 2: Thinking Sealed Means Frozen

```js
const user = {
  name: 'Asha',
};

Object.seal(user);

user.name = 'Mina';

console.log(Object.isSealed(user)); // true
console.log(Object.isFrozen(user)); // false
```

The object is sealed, but the existing data property is still writable.

### Mistake 3: Thinking Freeze Is Deep

```js
const layout = {
  sidebar: {
    width: 280,
  },
};

Object.freeze(layout);

layout.sidebar.width = 320;

console.log(Object.isFrozen(layout)); // true
console.log(Object.isFrozen(layout.sidebar)); // false
```

The nested object was not frozen.

### Mistake 4: Expecting Primitives To Return `false`

```js
console.log(Object.isFrozen(42)); // true
```

Modern JavaScript treats primitives as frozen because they cannot be extended or
changed like objects.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/isFrozen/isFrozen.js
```

The runnable file shows:

- checking a normal object,
- `Object.freeze()`,
- failed changes to frozen data properties,
- non-extensible objects that are not frozen,
- empty non-extensible objects,
- sealed objects that are not frozen,
- shallow freezing,
- frozen arrays,
- accessor properties,
- primitive values,
- strict mode errors.

## References

- MDN:
  [`Object.isFrozen()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
- ECMAScript specification:
  [`Object.isFrozen`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.isfrozen)
