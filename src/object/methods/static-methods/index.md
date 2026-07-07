# Object Static Methods Overview

## What Problem Does This Page Solve?

JavaScript has many `Object` methods.

Some are called from `Object` itself:

```js
Object.keys(user);
Object.hasOwn(user, 'name');
Object.getPrototypeOf(user);
```

These are static methods.

This page gives you the big picture so the individual method pages feel easier
to place in your mind.

## Quick Definition

Object static methods are helper methods stored on the `Object` constructor.

They are usually called like this:

```js
Object.methodName(value, ...otherArguments);
```

Example:

```js
const user = {
  name: 'Asha',
  role: 'admin',
};

console.log(Object.keys(user));
// [ 'name', 'role' ]
```

The method is called from `Object`.

The object being inspected is passed as an argument.

## Mental Model

Think of `Object` static methods as tools on a workbench.

```text
Object.keys(user)
Object.freeze(settings)
Object.getPrototypeOf(learner)
```

The method belongs to `Object`.

The data you want to inspect or change is passed into the method.

That is different from an instance method:

```js
user.toString();
```

Here the method is looked up through the object itself.

## Static Method Versus Instance Method

Static method:

```js
Object.keys(user);
```

Instance method:

```js
user.toString();
```

With static methods, the receiver is `Object`.

With instance methods, the receiver is the object value itself.

That difference matters because not every object inherits from
`Object.prototype`.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.keys(dictionary)); // [ 'topic' ]
console.log(Object.hasOwn(dictionary, 'topic')); // true
console.log(typeof dictionary.hasOwnProperty); // undefined
```

What happened:

- `dictionary` has a null prototype.
- It does not inherit `Object.prototype.hasOwnProperty()`.
- Static methods like `Object.keys()` and `Object.hasOwn()` still work because
  they are called from `Object`.

## Property Reading Methods

Different methods read different kinds of properties.

| Method | Reads | Skips |
| --- | --- | --- |
| `Object.keys()` | own enumerable string keys | symbols, non-enumerable, inherited |
| `Object.values()` | own enumerable string-keyed values | symbols, non-enumerable, inherited |
| `Object.entries()` | own enumerable string-keyed pairs | symbols, non-enumerable, inherited |
| `Object.getOwnPropertyNames()` | own string keys | symbols, inherited |
| `Object.getOwnPropertySymbols()` | own symbol keys | string keys, inherited |
| `Object.getOwnPropertyDescriptors()` | all own string and symbol descriptors | inherited |

`Reflect.ownKeys()` is not an `Object` static method, but it is useful here
because it returns all own string and symbol keys.

```js
const secret = Symbol('secret');
const base = {
  inherited: true,
};

const user = Object.create(base);
user.name = 'Asha';
user[secret] = 101;

Object.defineProperty(user, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(user));
// [ 'name' ]

console.log(Object.getOwnPropertyNames(user));
// [ 'name', 'internalId' ]

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(secret) ]

console.log(Reflect.ownKeys(user));
// [ 'name', 'internalId', Symbol(secret) ]
```

What happened:

- `name` is own, enumerable, and string-keyed.
- `internalId` is own and string-keyed, but non-enumerable.
- `secret` is an own symbol key.
- `inherited` lives on the prototype, so these own-property methods skip it.

## Descriptor Methods

Descriptors describe property settings.

They answer questions like:

```text
Is this property writable?
Is it enumerable?
Is it configurable?
Is it a data property or accessor property?
```

Common descriptor methods:

- `Object.defineProperty()`
- `Object.defineProperties()`
- `Object.getOwnPropertyDescriptor()`
- `Object.getOwnPropertyDescriptors()`

Example:

```js
const settings = {};

Object.defineProperty(settings, 'mode', {
  value: 'dark',
  enumerable: true,
  writable: false,
  configurable: false,
});

const descriptor = Object.getOwnPropertyDescriptor(settings, 'mode');

console.log(descriptor.writable); // false
console.log(descriptor.enumerable); // true
```

The value is a normal property value.

The descriptor controls how that property behaves.

## Creation And Conversion Methods

These methods create, copy, or rebuild objects.

| Method | Main job |
| --- | --- |
| `Object.create()` | create an object with a chosen prototype |
| `Object.assign()` | copy enumerable own properties into a target object |
| `Object.fromEntries()` | create an object from key-value pairs |
| `Object.groupBy()` | group iterable values into arrays |

Example:

```js
const sharedBehavior = {
  describe() {
    return `${this.name} studies ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Mina';
learner.topic = 'objects';

console.log(learner.describe());
// Mina studies objects
```

`Object.create(sharedBehavior)` creates a new object whose prototype is
`sharedBehavior`.

## Prototype Methods

Prototype methods inspect or change an object's prototype link.

```js
const base = {
  role: 'member',
};

const user = Object.create(base);

console.log(Object.getPrototypeOf(user) === base); // true
```

The main static prototype methods are:

- `Object.getPrototypeOf()`
- `Object.setPrototypeOf()`

Use `Object.getPrototypeOf()` when you want to inspect the immediate prototype.

Be careful with `Object.setPrototypeOf()` because changing prototypes after an
object is created can make code harder to reason about and can hurt
performance.

## Ownership And Comparison Methods

`Object.hasOwn()` checks whether a property exists directly on the object.

```js
const base = {
  inherited: true,
};

const user = Object.create(base);
user.name = 'Asha';

console.log(Object.hasOwn(user, 'name')); // true
console.log(Object.hasOwn(user, 'inherited')); // false
```

`Object.is()` compares values using SameValue comparison.

```js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false
```

That makes it different from `===` in a few edge cases.

## Integrity Methods

Integrity methods control whether an object can be extended or changed.

| Action method | Check method | Meaning |
| --- | --- | --- |
| `Object.preventExtensions()` | `Object.isExtensible()` | no new properties |
| `Object.seal()` | `Object.isSealed()` | no new or deleted properties |
| `Object.freeze()` | `Object.isFrozen()` | no new, deleted, or changed data properties |

Example:

```js
const config = Object.freeze({
  mode: 'dark',
});

config.mode = 'light';

console.log(Object.isFrozen(config)); // true
console.log(config.mode); // dark
```

In non-strict mode, the failed assignment is ignored.

In strict mode, it throws a `TypeError`.

## Method Map

Creation and copying:

- `Object.assign()`:
  [`assign/assign.md`](assign/assign.md)
- `Object.create()`:
  [`objectCreate/objectCreate.md`](objectCreate/objectCreate.md)
- `Object.fromEntries()`:
  [`fromEntries/fromEntries.md`](fromEntries/fromEntries.md)
- `Object.groupBy()`:
  [`groupBy/groupBy.md`](groupBy/groupBy.md)

Descriptors:

- `Object.defineProperty()`:
  [`defineProperty/defineProperty.md`](defineProperty/defineProperty.md)
- `Object.defineProperties()`:
  [`defineProperties/defineProperties.md`](defineProperties/defineProperties.md)
- `Object.getOwnPropertyDescriptor()`:
  [detail page](getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)
- `Object.getOwnPropertyDescriptors()`:
  [detail page](getOwnPropertyDescriptors/getOwnPropertyDescriptors.md)

Property reading:

- `Object.entries()`:
  [`entries/entries.md`](entries/entries.md)
- `Object.keys()`:
  [`keys/keys.md`](keys/keys.md)
- `Object.values()`:
  [`values.js`](values.js)
- `Object.getOwnPropertyNames()`:
  [`getOwnPropertyNames/getOwnPropertyNames.md`](getOwnPropertyNames/getOwnPropertyNames.md)
- `Object.getOwnPropertySymbols()`:
  [`getOwnPropertySymbols/getOwnPropertySymbols.md`](getOwnPropertySymbols/getOwnPropertySymbols.md)

Prototype:

- `Object.getPrototypeOf()`:
  [`getPrototypeOf/getPrototypeOf.md`](getPrototypeOf/getPrototypeOf.md)
- `Object.setPrototypeOf()`:
  [`setPrototypeOf/setPrototypeOf.md`](setPrototypeOf/setPrototypeOf.md)

Ownership, comparison, and integrity:

- `Object.hasOwn()`:
  [`hasOwn/hasOwn.md`](hasOwn/hasOwn.md)
- `Object.is()`:
  [`is/is.md`](is/is.md)
- `Object.preventExtensions()`:
  [`preventExtensions/preventExtensions.md`](preventExtensions/preventExtensions.md)
- `Object.seal()`:
  [`seal/seal.md`](seal/seal.md)
- `Object.freeze()`:
  [`freeze/freeze.md`](freeze/freeze.md)
- `Object.isExtensible()`:
  [`isExtensible/isExtensible.md`](isExtensible/isExtensible.md)
- `Object.isSealed()`:
  [`isSealed/isSealed.md`](isSealed/isSealed.md)
- `Object.isFrozen()`:
  [`isFrozen/isFrozen.md`](isFrozen/isFrozen.md)

## Important Notes

- Static methods are called from `Object`.
- The object being inspected is usually passed as an argument.
- Static methods are safer than borrowed instance methods for null-prototype
  objects.
- Most property-reading methods focus on own properties, not inherited
  properties.
- `Object.keys()`, `Object.values()`, and `Object.entries()` read only own
  enumerable string-keyed properties.
- Symbol keys require `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()`.
- Descriptor methods can see property settings that normal value-reading
  methods do not show.
- Integrity methods like `freeze()`, `seal()`, and `preventExtensions()` have
  matching check methods.

## When To Use This Page

Use this overview when:

- you know you need an `Object` method but do not know which one,
- you need to compare property-reading methods,
- you are deciding between static methods and instance methods,
- you want a quick map before reading the detailed method pages.

## Common Mistakes

### Mistake 1: Calling A Static Method From The Object

```js
const user = {
  name: 'Asha',
};

user.keys();
// TypeError
```

`keys()` is not an instance method.

Call it from `Object`:

```js
console.log(Object.keys(user));
// [ 'name' ]
```

### Mistake 2: Using `Object.keys()` For Every Key

```js
const id = Symbol('id');
const user = {
  name: 'Asha',
  [id]: 101,
};

Object.defineProperty(user, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(user));
// [ 'name' ]
```

`Object.keys()` skips symbol keys and non-enumerable keys.

Use a more specific method when those properties matter.

### Mistake 3: Expecting Static Methods To Read Inherited Properties

```js
const base = {
  role: 'member',
};

const user = Object.create(base);
user.name = 'Asha';

console.log(Object.keys(user));
// [ 'name' ]
```

Most `Object` static methods that read properties focus on own properties.

Inherited properties are usually a prototype-chain question, not an own-key
question.

### Mistake 4: Thinking `Object.assign()` Deep Copies

```js
const source = {
  settings: {
    theme: 'dark',
  },
};

const copy = Object.assign({}, source);

console.log(copy.settings === source.settings); // true
```

`Object.assign()` copies property values.

If a value is an object, the reference is copied.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/index.js
```

The runnable file shows:

- static method call style,
- null-prototype object safety,
- own string keys versus symbol keys,
- descriptor methods,
- object creation and conversion methods,
- `Object.groupBy()`,
- integrity methods,
- `Object.is()`.

## References

- MDN:
  [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- ECMAScript specification:
  [`Object` constructor and static methods](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object-constructor)
