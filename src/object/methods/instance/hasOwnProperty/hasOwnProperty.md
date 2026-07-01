# Object.prototype.hasOwnProperty()

## What Problem Does It Solve?

`hasOwnProperty()` checks whether a property exists directly on an object.

That matters because objects can access properties from their prototype chain.
Sometimes you need to know whether the object itself owns the property, not
whether the property is merely inherited.

## Quick Definition

`object.hasOwnProperty(key)` returns `true` when `key` is an own property of
`object`.

It returns `false` when the key is inherited or missing.

Modern code usually prefers `Object.hasOwn(object, key)`, but
`hasOwnProperty()` is still common in older code and libraries.

## Related Detail Pages

- `Object.hasOwn()`:
  [`src/object/methods/static-methods/hasOwn/hasOwn.md`](../../static-methods/hasOwn/hasOwn.md)
- Key existence comparison:
  [`src/object/concepts/key-existence/key-existence.md`](../../../concepts/key-existence/key-existence.md)
- Object creation and null-prototype objects:
  [`src/object/concepts/create-object/create-object.md`](../../../concepts/create-object/create-object.md)

## Mental Model

Think of an object as one page, and its prototype as a page behind it.

- `object.hasOwnProperty(key)` checks only the current page.
- It does not walk up to the prototype page.
- It checks property existence, not the property's value.
- It can fail when the object does not inherit the method or shadows the method.

## Syntax

```js
object.hasOwnProperty(propertyKey);
Object.prototype.hasOwnProperty.call(object, propertyKey);
Object.hasOwn(object, propertyKey);
```

## Parameters

- `propertyKey`: The key to check. It can be a string or a symbol.

For the borrowed-call pattern:

- `object`: The object that should be used as `this`.
- `propertyKey`: The key to check on that object.

## Return Value

`hasOwnProperty()` returns a boolean:

- `true` when the property exists directly on the object.
- `false` when the property is inherited or missing.

## Basic Example

```js
const profile = {
  name: 'Asha',
};

console.log(profile.hasOwnProperty('name')); // true
console.log(profile.hasOwnProperty('role')); // false
console.log(profile.hasOwnProperty('toString')); // false
console.log('toString' in profile); // true
```

What happened:

- `name` is an own property.
- `role` is missing.
- `toString` is inherited from `Object.prototype`.
- The `in` operator includes inherited properties, but `hasOwnProperty()` does
  not.

## Falsy Values Still Count

```js
const settings = {
  theme: undefined,
  notifications: false,
  timezone: null,
};

console.log(settings.hasOwnProperty('theme')); // true
console.log(settings.hasOwnProperty('notifications')); // true
console.log(settings.hasOwnProperty('timezone')); // true
```

What happened:

- All three keys exist directly on `settings`.
- Their values are falsy.
- `hasOwnProperty()` checks whether the key exists as an own property, not
  whether the value is truthy.

## Non-Enumerable Properties Still Count

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(settings.hasOwnProperty('internalId')); // true
console.log(Object.keys(settings)); // []
```

What happened:

- `internalId` exists directly on `settings`.
- `enumerable: false` hides it from `Object.keys()`.
- `hasOwnProperty()` still returns `true` because it checks ownership, not
  enumerability.

## Symbol Keys

```js
const privateId = Symbol('privateId');

const account = {
  username: 'learner',
  [privateId]: 101,
};

console.log(account.hasOwnProperty(privateId)); // true
```

`hasOwnProperty()` can check symbol keys as well as string keys.

## Array Indexes

```js
const scores = [10, , 30];

console.log(scores.hasOwnProperty(0)); // true
console.log(scores.hasOwnProperty(1)); // false
```

Array indexes are object property keys.

In this example, index `1` is an empty slot. It is not an own property, so
`scores.hasOwnProperty(1)` returns `false`.

## Why Direct Calls Can Be Unsafe

```js
const report = {
  title: 'Weekly progress',
  hasOwnProperty() {
    return false;
  },
};

console.log(report.hasOwnProperty('title')); // false
console.log(Object.prototype.hasOwnProperty.call(report, 'title')); // true
console.log(Object.hasOwn(report, 'title')); // true
```

What happened:

- The object has its own `hasOwnProperty` method.
- Calling `report.hasOwnProperty()` runs that custom method.
- Borrowing `Object.prototype.hasOwnProperty` avoids the shadowed method.
- `Object.hasOwn(report, 'title')` is the modern clearer option.

## Null-Prototype Objects

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(typeof dictionary.hasOwnProperty); // undefined
console.log(Object.prototype.hasOwnProperty.call(dictionary, 'topic')); // true
console.log(Object.hasOwn(dictionary, 'topic')); // true
```

What happened:

- `dictionary` does not inherit from `Object.prototype`.
- `dictionary.hasOwnProperty` is not available on the object itself.
- `Object.prototype.hasOwnProperty.call(dictionary, 'topic')` borrows the method
  from `Object.prototype`.
- `Object.hasOwn(dictionary, 'topic')` avoids borrowing and is easier to read.

## Filtering `for...in` Results

```js
const defaults = {
  plan: 'pro',
};

const userSettings = Object.create(defaults);
userSettings.theme = 'dark';

for (const key in userSettings) {
  if (Object.prototype.hasOwnProperty.call(userSettings, key)) {
    console.log(key); // theme
  }
}
```

What happened:

- `for...in` sees own and inherited enumerable string keys.
- The borrowed `hasOwnProperty.call()` check keeps only own keys.
- In modern code, `Object.hasOwn(userSettings, key)` is usually clearer.

## Important Notes

- `hasOwnProperty()` checks own properties only.
- It does not check the prototype chain.
- It returns `true` for own properties whose values are `undefined`, `null`,
  `false`, `0`, or `''`.
- It returns `true` for own non-enumerable properties.
- It can check string keys and symbol keys.
- Direct `object.hasOwnProperty(key)` can be wrong when the method is shadowed.
- Direct `object.hasOwnProperty(key)` can fail on null-prototype objects.
- `Object.hasOwn(object, key)` is the modern preferred own-property check.

## When To Use It

Use `Object.hasOwn(object, key)`:

- In modern code.
- When you want the clearest own-property check.
- When the object may shadow `hasOwnProperty`.
- When the object may have a null prototype.

Use `Object.prototype.hasOwnProperty.call(object, key)`:

- When reading or maintaining older code.
- When supporting code where `Object.hasOwn()` is not available.
- When you need the safe legacy pattern.

Use direct `object.hasOwnProperty(key)`:

- Only when you know the object inherits the original method.
- Only when you know the object has not shadowed `hasOwnProperty`.

## Common Mistakes

### Mistake 1: Confusing Inherited Properties With Own Properties

```js
const profile = {};

console.log(profile.hasOwnProperty('toString')); // false
console.log('toString' in profile); // true
```

`toString` is inherited. It is available through the prototype chain, but it is
not owned by `profile`.

### Mistake 2: Calling A Shadowed Method

```js
const report = {
  title: 'Weekly progress',
  hasOwnProperty: false,
};

console.log(Object.prototype.hasOwnProperty.call(report, 'title')); // true
```

If `hasOwnProperty` is replaced by a non-function value, direct
`report.hasOwnProperty('title')` would fail.

### Mistake 3: Expecting Null-Prototype Objects To Have The Method

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(typeof dictionary.hasOwnProperty); // undefined
```

Use `Object.hasOwn(dictionary, 'topic')` or the borrowed-call pattern instead.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/hasOwnProperty/hasOwnProperty.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.hasOwnProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)
- MDN:
  [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- ECMAScript spec:
  [`Object.prototype.hasOwnProperty`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.hasownproperty)
