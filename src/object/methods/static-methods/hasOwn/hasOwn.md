# Object.hasOwn()

## What Problem Does It Solve?

`Object.hasOwn()` answers one focused question:

Does this object directly own this property?

That matters because JavaScript objects can also access inherited properties
through the prototype chain. When you are checking user data, config objects,
dictionaries, parsed JSON, or object maps, inherited properties usually should
not count.

## Quick Definition

`Object.hasOwn(object, key)` returns `true` when `key` is an own property of
`object`.

It returns `false` when the key is inherited or missing.

## Related Concept

This page focuses on the `Object.hasOwn()` method itself. For a side-by-side
guide that compares `Object.hasOwn()`, the `in` operator,
`Object.prototype.hasOwnProperty.call()`, and `Object.keys().includes()`, see
[Checking Whether A Key Exists In An Object](../../../concepts/key-existence/key-existence.md).

## Mental Model

Imagine an object sitting on top of its prototype.

- `Object.hasOwn()` checks only the object itself.
- It does not walk up to the prototype.
- It does not care whether the value is truthy or falsy.
- It works even when `hasOwnProperty` is missing or shadowed.

## Syntax

```js
Object.hasOwn(object, propertyKey);
```

## Parameters

- `object`: The object to check.
- `propertyKey`: The property key to search for. It can be a string or a symbol.

## Return Value

`Object.hasOwn()` returns a boolean:

- `true` when the property exists directly on the object.
- `false` when the property is inherited or does not exist.

## Basic Example

```js
const profile = {
  name: 'Asha',
};

console.log(Object.hasOwn(profile, 'name')); // true
console.log(Object.hasOwn(profile, 'role')); // false
```

What happened:

- `name` exists directly on `profile`.
- `role` does not exist on `profile`.

## Falsy Values Still Count

```js
const settings = {
  theme: undefined,
  timezone: null,
  notifications: false,
};

console.log(Object.hasOwn(settings, 'theme')); // true
console.log(Object.hasOwn(settings, 'timezone')); // true
console.log(Object.hasOwn(settings, 'notifications')); // true
```

What happened:

- All three keys exist directly on `settings`.
- Their values are falsy, but `Object.hasOwn()` is not checking truthiness.
- It checks whether the property exists as an own property.

## Non-Enumerable Properties Still Count

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.hasOwn(settings, 'internalId')); // true
console.log(Object.keys(settings)); // []
```

What happened:

- `internalId` exists directly on `settings`.
- `enumerable: false` means the property is hidden from tools like
  `Object.keys()`.
- `Object.hasOwn()` still returns `true` because it checks ownership, not
  enumerability.

## Inherited Properties Do Not Count

```js
const sharedUserFields = {
  role: 'admin',
};

const user = Object.create(sharedUserFields);
user.name = 'Knight';

console.log(Object.hasOwn(user, 'name')); // true
console.log(Object.hasOwn(user, 'role')); // false
console.log('role' in user); // true
```

What happened:

- `name` is directly on `user`.
- `role` is inherited from `sharedUserFields`.
- `Object.hasOwn()` returns `false` for `role`.
- The `in` operator returns `true` because it includes inherited properties.

## Why It Is Safer Than `object.hasOwnProperty()`

```js
const report = {
  title: 'Weekly progress',
  hasOwnProperty() {
    return false;
  },
};

console.log(report.hasOwnProperty('title')); // false
console.log(Object.hasOwn(report, 'title')); // true
```

What happened:

- The object has its own `hasOwnProperty` method.
- Calling `report.hasOwnProperty()` runs that custom method.
- `Object.hasOwn(report, 'title')` still performs the real own-property check.

This is why `Object.hasOwn()` is the modern safer choice.

## Null-Prototype Objects

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.hasOwn(dictionary, 'topic')); // true
console.log(typeof dictionary.hasOwnProperty); // undefined
console.log(Object.prototype.hasOwnProperty.call(dictionary, 'topic')); // true
```

Objects created with `Object.create(null)` do not inherit from
`Object.prototype`. That means `dictionary.hasOwnProperty` is not available as
a method on `dictionary`.

But `Object.prototype.hasOwnProperty` still exists on `Object.prototype`
itself, so the older borrowed-call pattern can still use it with
`dictionary` as `this`.

`Object.hasOwn()` is simpler because it is called from `Object`, not from the
object being checked.

## Symbol Keys

```js
const privateId = Symbol('privateId');
const account = {
  username: 'learner',
  [privateId]: 101,
};

console.log(Object.hasOwn(account, privateId)); // true
```

`Object.hasOwn()` can check symbol keys as well as string keys.

## Array Indexes

```js
const scores = [10, , 30];

console.log(Object.hasOwn(scores, 0)); // true
console.log(Object.hasOwn(scores, 1)); // false
```

Array indexes are object property keys.

In this example, index `1` is an empty slot. It is not an own property, so
`Object.hasOwn(scores, 1)` returns `false`.

## Important Notes

- `Object.hasOwn()` is intended as the modern replacement for direct
  `object.hasOwnProperty()` calls.
- It does not check the prototype chain.
- It returns `true` for existing properties whose values are `undefined`,
  `null`, `false`, `0`, or `''`.
- It returns `true` for own non-enumerable properties.
- It throws a `TypeError` if the first argument is `null` or `undefined`.
- It can check string keys and symbol keys.

## When To Use It

Use `Object.hasOwn()`:

- When checking whether parsed data directly includes a property.
- When checking configuration objects.
- When filtering `for...in` results down to direct properties.
- When working with dictionary-like objects.
- When the object may have a custom `hasOwnProperty` property.
- When the object may have a null prototype.

Use the `in` operator instead when inherited properties should count.

## Common Mistakes

### Mistake 1: Confusing Missing Keys With Falsy Values

```js
const settings = {
  enabled: false,
};

console.log(Boolean(settings.enabled)); // false
console.log(Object.hasOwn(settings, 'enabled')); // true
```

The value is falsy, but the key exists.

### Mistake 2: Expecting Inherited Properties To Count

```js
const parent = { role: 'admin' };
const child = Object.create(parent);

console.log(Object.hasOwn(child, 'role')); // false
console.log('role' in child); // true
```

Use `in` if you intentionally want prototype-chain properties to count.

### Mistake 3: Calling `.hasOwnProperty()` Directly On Unknown Objects

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.hasOwn(dictionary, 'topic')); // true
console.log(Object.prototype.hasOwnProperty.call(dictionary, 'topic')); // true
```

Calling `dictionary.hasOwnProperty('topic')` would fail because the method does
not exist on the null-prototype object itself. The borrowed
`Object.prototype.hasOwnProperty.call(dictionary, 'topic')` pattern still works.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/hasOwn/hasOwn.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- ECMAScript spec:
  [`Object.hasOwn`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.hasown)
