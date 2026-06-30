# Checking Whether A Key Exists In An Object

## What Problem Does It Solve?

Sometimes you do not want the value of a property yet. You only want to know
whether a key exists.

That sounds small, but there are two different questions:

- Does this key exist on the object or anywhere in its prototype chain?
- Does this key exist directly on this object only?

JavaScript gives you different tools for those two questions.

## Quick Definition

Use the `in` operator when inherited properties should count.

Use `Object.hasOwn(object, key)` when only direct properties should count.

Use `Object.prototype.hasOwnProperty.call(object, key)` when you are reading or
supporting older code that does not use `Object.hasOwn()`.

This is a concept page for choosing the right key-existence check. The dedicated
method page for `Object.hasOwn()` lives at
[`src/object/methods/static-methods/hasOwn/hasOwn.md`](../../methods/static-methods/hasOwn/hasOwn.md).

## Mental Model

Think of an object like a page, and its prototype like an older page behind it.

- `key in object` checks the current page and the pages behind it.
- `Object.hasOwn(object, key)` checks only the current page.
- `Object.keys(object).includes(key)` checks only visible enumerable string keys
  from the current page.
- `object.key !== undefined` checks the value, not the existence of the key.

## Syntax

```js
propertyKey in object;
Object.hasOwn(object, propertyKey);
Object.prototype.hasOwnProperty.call(object, propertyKey);
Object.keys(object).includes(propertyKey);
```

## Parameters

For the `in` operator:

- `propertyKey`: The key to search for. It is usually a string, but it can also
  be a symbol.
- `object`: The object to check.

For `Object.hasOwn(object, propertyKey)`:

- `object`: The object whose direct properties should be checked.
- `propertyKey`: The key to search for.

## Return Value

All of these checks return a boolean:

- `true` means the key was found by that specific check.
- `false` means the key was not found by that specific check.

The important part is that each check has a different meaning.

## `in` Checks Own And Inherited Properties

```js
const sharedAccountFields = {
  plan: 'pro',
};

const account = Object.create(sharedAccountFields);
account.username = 'knight';

console.log('plan' in account); // true
console.log('username' in account); // true
```

What happened:

- `username` is directly on `account`.
- `plan` is inherited from `sharedAccountFields`.
- The `in` operator returns `true` for both.

Use this when inherited properties should count as available.

## `Object.hasOwn()` Checks Only Direct Properties

```js
const sharedAccountFields = {
  plan: 'pro',
};

const account = Object.create(sharedAccountFields);
account.username = 'knight';

console.log(Object.hasOwn(account, 'plan')); // false
console.log(Object.hasOwn(account, 'username')); // true
```

What happened:

- `plan` exists through the prototype chain, so `Object.hasOwn()` returns
  `false`.
- `username` exists directly on `account`, so `Object.hasOwn()` returns `true`.

This is usually the best modern choice when you want to know whether an object
itself owns a key.

## Why `object.key !== undefined` Is Not A Key Check

```js
const user = {
  email: undefined,
};

console.log('email' in user); // true
console.log(user.email !== undefined); // false
```

What happened:

- The key `email` exists.
- Its value is `undefined`.
- `user.email !== undefined` tells you about the value, not whether the key is
  present.

Use value checks when you care about the value. Use key checks when you care
about property existence.

## `Object.keys().includes()` Checks Own Enumerable String Keys

```js
const lesson = {
  title: 'Objects',
};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.hasOwn(lesson, 'internalId')); // true
console.log(Object.keys(lesson)); // [ 'title' ]
console.log(Object.keys(lesson).includes('internalId')); // false
```

What happened:

- `internalId` is a real own property.
- It is not enumerable.
- `Object.keys()` returns only own enumerable string keys, so it does not include
  `internalId`.

Use this pattern when you already need the key list. Do not treat it as the
strongest general-purpose property-existence check.

## Symbol Keys Need A Real Property Check

```js
const id = Symbol('id');

const lesson = {
  title: 'Objects',
  [id]: 101,
};

console.log(Object.hasOwn(lesson, id)); // true
console.log(id in lesson); // true
console.log(Object.keys(lesson)); // [ 'title' ]
```

What happened:

- The symbol key exists directly on `lesson`.
- `Object.hasOwn()` and `in` can check symbol keys.
- `Object.keys()` returns only string keys, so the symbol key is not listed.

## Safe Older Pattern

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.hasOwn(dictionary, 'topic')); // true
console.log(Object.prototype.hasOwnProperty.call(dictionary, 'topic')); // true
```

`Object.prototype.hasOwnProperty.call(object, key)` is the older safe pattern.
It works even when the object does not inherit from `Object.prototype`.

It is safer than calling `object.hasOwnProperty(key)` directly because an object
can replace `hasOwnProperty` with its own property or method.

```js
const report = {
  title: 'Progress',
  hasOwnProperty() {
    return false;
  },
};

console.log(report.hasOwnProperty('title')); // false
console.log(Object.prototype.hasOwnProperty.call(report, 'title')); // true
```

You will still see it in legacy code and libraries. In modern code,
`Object.hasOwn(object, key)` is clearer.

## When To Use Which?

Use `Object.hasOwn(object, key)`:

- When you want to know whether the object directly owns the key.
- When inherited properties should not count.
- In most modern code.

Use `'key' in object`:

- When inherited properties should count.
- When checking whether an object can access a property through its prototype
  chain.
- When you are intentionally checking object shape, including inherited
  behavior.

Use `Object.prototype.hasOwnProperty.call(object, key)`:

- When reading or maintaining older code.
- When supporting environments where `Object.hasOwn()` may not be available.
- When you need a safe own-property check for unusual objects.

Use `Object.keys(object).includes(key)`:

- When you already need the object's own enumerable string keys as an array.
- When you specifically care only about enumerable string keys.

Avoid `object.key !== undefined`:

- When the goal is to check whether a key exists.
- Because an existing key can have the value `undefined`.

## Common Mistakes

### Mistake 1: Thinking `in` Means Own Property Only

```js
const parent = { role: 'admin' };
const child = Object.create(parent);

console.log('role' in child); // true
console.log(Object.hasOwn(child, 'role')); // false
```

`role` is reachable through the prototype chain, but it is not directly on
`child`.

### Mistake 2: Checking The Value Instead Of The Key

```js
const settings = {
  theme: undefined,
};

console.log(settings.theme !== undefined); // false
console.log(Object.hasOwn(settings, 'theme')); // true
```

The value check says the value is not useful. The key check says the property is
present.

### Mistake 3: Using `Object.keys()` For Every Key Check

`Object.keys()` creates an array first. That can be fine for small examples, but
it is extra work when you only need a boolean. It also ignores non-enumerable
properties and symbol keys.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/concepts/key-existence/key-existence.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in)
- MDN:
  [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- MDN:
  [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
