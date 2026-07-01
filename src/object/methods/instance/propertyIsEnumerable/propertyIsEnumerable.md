# Object.prototype.propertyIsEnumerable()

## What Problem Does It Solve?

`propertyIsEnumerable()` checks whether a property is both:

- directly owned by the object
- enumerable

That matters because a property can exist on an object but still be hidden from
common enumeration tools like `Object.keys()`.

## Quick Definition

`object.propertyIsEnumerable(key)` returns `true` when `key` is an own
enumerable property of `object`.

It returns `false` when the key is missing, inherited, or non-enumerable.

## Mental Model

Think of the method as two checks together:

```text
own property? + enumerable? -> true
anything else               -> false
```

`Object.hasOwn(object, key)` checks only ownership.

`propertyIsEnumerable()` checks ownership and enumerability.

It checks one property key at a time. It does not create a list of properties.
Use methods like `Object.keys()`, `Object.getOwnPropertySymbols()`, or
`Reflect.ownKeys()` when you need to collect keys first.

## Syntax

```js
object.propertyIsEnumerable(propertyKey);
Object.prototype.propertyIsEnumerable.call(object, propertyKey);
```

## Parameters

- `propertyKey`: The property key to test. It can be a string or a symbol.

For the borrowed-call pattern:

- `object`: The object to check.
- `propertyKey`: The property key to test on that object.

## Return Value

`propertyIsEnumerable()` returns a boolean:

- `true` when the property exists directly on the object and is enumerable.
- `false` when the property is missing.
- `false` when the property is inherited.
- `false` when the property exists but is non-enumerable.

## Basic Example

```js
const lesson = {
  title: 'Objects',
};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(lesson.propertyIsEnumerable('title')); // true
console.log(lesson.propertyIsEnumerable('internalId')); // false
console.log(lesson.propertyIsEnumerable('missing')); // false
```

What happened:

- `title` is an own enumerable property.
- `internalId` is an own property, but it is not enumerable.
- `missing` does not exist.

Only `title` returns `true`.

## Difference From `Object.hasOwn()`

```js
console.log(Object.hasOwn(lesson, 'internalId')); // true
console.log(lesson.propertyIsEnumerable('internalId')); // false
console.log(Object.keys(lesson)); // [ 'title' ]
```

What happened:

- `Object.hasOwn()` returns `true` because `internalId` exists directly on
  `lesson`.
- `propertyIsEnumerable()` returns `false` because `internalId` is
  non-enumerable.
- `Object.keys()` returns only own enumerable string keys.

Use `Object.hasOwn()` when the question is "does this own property exist?"

Use `propertyIsEnumerable()` when the question is "will this own property be
included by enumeration-style tools?"

## Inherited Properties Return `false`

```js
const parent = {
  category: 'javascript',
};

const child = Object.create(parent);
child.topic = 'objects';

console.log(child.propertyIsEnumerable('topic')); // true
console.log(child.propertyIsEnumerable('category')); // false
console.log('category' in child); // true
```

What happened:

- `topic` is an own enumerable property.
- `category` is inherited from `parent`.
- The `in` operator sees inherited properties.
- `propertyIsEnumerable()` only returns `true` for own enumerable properties.

## Symbol Keys

```js
const publicSymbol = Symbol('publicSymbol');
const privateSymbol = Symbol('privateSymbol');

const account = {
  username: 'learner',
  [publicSymbol]: 101,
};

Object.defineProperty(account, privateSymbol, {
  value: 'hidden',
  enumerable: false,
});

console.log(account.propertyIsEnumerable(publicSymbol)); // true
console.log(account.propertyIsEnumerable(privateSymbol)); // false
console.log(Object.keys(account)); // [ 'username' ]
```

What happened:

- `publicSymbol` is an own enumerable symbol property.
- `privateSymbol` is an own non-enumerable symbol property.
- `Object.keys()` does not return symbol keys.
- `propertyIsEnumerable()` can test a specific symbol key directly.

Symbol enumerability matters for tools like object spread and
`Object.assign()`, because they copy own enumerable string and symbol
properties.

## Arrays

```js
const scores = [10, 20, 30];

console.log(scores.propertyIsEnumerable(0)); // true
console.log(scores.propertyIsEnumerable('length')); // false
```

What happened:

- Array indexes are object property keys and are usually enumerable.
- The `length` property exists, but it is not enumerable.

## Null-Prototype Objects

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(typeof dictionary.propertyIsEnumerable); // undefined
console.log(
  Object.prototype.propertyIsEnumerable.call(dictionary, 'topic')
); // true
```

What happened:

- `dictionary` does not inherit from `Object.prototype`.
- `dictionary.propertyIsEnumerable` is not available on the object itself.
- Borrowing `Object.prototype.propertyIsEnumerable.call(...)` still works.

## Descriptor-Based Check

```js
const descriptor = Object.getOwnPropertyDescriptor(lesson, 'internalId');

console.log(descriptor.enumerable); // false
console.log(
  Object.getOwnPropertyDescriptor(lesson, 'missing')?.enumerable ?? false
); // false
```

`propertyIsEnumerable(key)` gives the same kind of answer as checking the
property descriptor's `enumerable` flag, while also returning `false` when the
property does not exist.

## Important Notes

- `propertyIsEnumerable()` returns `true` only for own enumerable properties.
- It tests one property key at a time; it does not loop or list keys by itself.
- Inherited properties return `false`, even when they are enumerable.
- Non-enumerable own properties return `false`.
- Missing properties return `false`.
- String keys and symbol keys can both be tested.
- Null-prototype objects need the borrowed-call pattern.
- `Object.keys()` lists own enumerable string keys.
- `Object.getOwnPropertySymbols()` lists own symbol keys, but it does not filter
  by enumerability.
- Object spread and `Object.assign()` copy own enumerable string and symbol
  properties.

## When To Use It

Use `propertyIsEnumerable()`:

- When you need to know whether one specific own property is enumerable.
- When comparing `Object.hasOwn()` with enumeration behavior.
- When checking whether a symbol property is enumerable.
- When learning or debugging property descriptors.

Use `Object.keys()`:

- When you want a list of own enumerable string keys.

Use `Object.getOwnPropertyDescriptor()`:

- When you need the full descriptor, not only the enumerable flag.

## Common Mistakes

### Mistake 1: Thinking Own Means Enumerable

```js
const lesson = {};

Object.defineProperty(lesson, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.hasOwn(lesson, 'internalId')); // true
console.log(lesson.propertyIsEnumerable('internalId')); // false
```

The property exists directly on the object, but it is not enumerable.

### Mistake 2: Expecting Inherited Enumerable Properties To Return `true`

```js
const parent = {
  category: 'javascript',
};

const child = Object.create(parent);

console.log('category' in child); // true
console.log(child.propertyIsEnumerable('category')); // false
```

The property is reachable through the prototype chain, but it is not owned by
`child`.

### Mistake 3: Calling The Method Directly On A Null-Prototype Object

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(typeof dictionary.propertyIsEnumerable); // undefined
```

Use the borrowed-call pattern:

```js
Object.prototype.propertyIsEnumerable.call(dictionary, 'topic'); // true
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.propertyIsEnumerable()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
- ECMAScript spec:
  [`Object.prototype.propertyIsEnumerable`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.propertyisenumerable)
