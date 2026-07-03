# Object.assign()

## What Problem Does It Solve?

`Object.assign()` copies properties from one or more source objects into a
target object.

That is useful when you want to:

- add properties to an existing object,
- merge settings objects,
- make a shallow copy of an object,
- combine default values with user-provided values.

Example:

```js
const defaults = {
  theme: 'light',
  notifications: true,
};

const userSettings = {
  theme: 'dark',
};

const settings = Object.assign({}, defaults, userSettings);

console.log(settings); // { theme: 'dark', notifications: true }
```

## Quick Definition

`Object.assign(target, ...sources)` copies enumerable own properties from the
source objects into the target object.

It returns the same target object after modifying it.

```js
const target = {};
const source = {
  name: 'Asha',
};

const result = Object.assign(target, source);

console.log(target); // { name: 'Asha' }
console.log(result === target); // true
```

## Mental Model

Think of `Object.assign()` as copying properties from left to right:

```text
Object.assign(target, source1, source2, source3)

target receives source1 properties
target receives source2 properties
target receives source3 properties
return target
```

If two sources use the same key, the later source wins.

## Syntax

```js
Object.assign(target);
Object.assign(target, source1);
Object.assign(target, source1, source2);
Object.assign(target, source1, source2, sourceN);
```

## Parameters

- `target`: The object that receives the copied properties.
- `source1`, `source2`, `sourceN`: Objects that provide properties to copy.

`target` is required.

The source objects are optional.

## Return Value

`Object.assign()` returns the target object.

It does not return a new object automatically.

```js
const target = {
  a: 1,
};

const result = Object.assign(target, {
  b: 2,
});

console.log(result === target); // true
```

## Basic Example

```js
const target = {
  theme: 'light',
};

const source = {
  language: 'en',
};

const returnedTarget = Object.assign(target, source);

console.log(target); // { theme: 'light', language: 'en' }
console.log(returnedTarget === target); // true
```

What happened:

- `target` started with `theme`.
- `source` had `language`.
- `Object.assign()` copied `language` into `target`.
- The returned value is the same object as `target`.

## The Target Object Is Mutated

This is one of the most important points.

```js
const target = {
  a: 1,
};

Object.assign(target, {
  b: 2,
});

console.log(target); // { a: 1, b: 2 }
```

`Object.assign()` changes the target object.

If you do not want to change an existing object, use an empty object as the
target:

```js
const original = {
  a: 1,
};

const copy = Object.assign({}, original);

console.log(copy); // { a: 1 }
console.log(copy === original); // false
```

## Later Sources Overwrite Earlier Sources

```js
const defaults = {
  theme: 'light',
  notifications: true,
  layout: 'comfortable',
};

const userSettings = {
  theme: 'dark',
};

const runtimeSettings = {
  layout: 'compact',
};

const settings = Object.assign({}, defaults, userSettings, runtimeSettings);

console.log(settings);
// { theme: 'dark', notifications: true, layout: 'compact' }
```

What happened:

- `defaults.theme` started as `'light'`.
- `userSettings.theme` came later, so it replaced `'light'` with `'dark'`.
- `defaults.layout` started as `'comfortable'`.
- `runtimeSettings.layout` came later, so it replaced `'comfortable'` with
  `'compact'`.

## It Makes A Shallow Copy

`Object.assign()` copies property values.

If a value is a nested object, the nested object itself is not deeply copied.
The reference is copied.

```js
const original = {
  name: 'Asha',
  progress: {
    lessonsCompleted: 3,
  },
};

const copy = Object.assign({}, original);

copy.progress.lessonsCompleted = 4;

console.log(original.progress.lessonsCompleted); // 4
```

What happened:

- `copy` is a different top-level object.
- But `copy.progress` and `original.progress` still point to the same nested
  object.
- Changing the nested object through `copy` is visible through `original`.

Use `structuredClone()` when you need a deep clone and the values support
structured cloning.

## It Copies Own Enumerable Properties

`Object.assign()` copies properties only when they are:

```text
own + enumerable
```

It skips inherited properties.

It also skips non-enumerable properties.

```js
const sharedFields = {
  inheritedRole: 'member',
};

const learner = Object.create(sharedFields);
learner.name = 'Mina';

Object.defineProperty(learner, 'internalId', {
  value: 101,
  enumerable: false,
});

const copy = Object.assign({}, learner);

console.log(copy); // { name: 'Mina' }
console.log(copy.inheritedRole); // undefined
console.log(copy.internalId); // undefined
```

What happened:

- `name` is an own enumerable property, so it was copied.
- `inheritedRole` is inherited from the prototype, so it was skipped.
- `internalId` is own but non-enumerable, so it was skipped.

## Symbol Keys Can Be Copied

`Object.assign()` copies enumerable symbol keys too.

```js
const accountId = Symbol('accountId');

const account = {
  username: 'learner',
  [accountId]: 42,
};

const copy = Object.assign({}, account);

console.log(copy[accountId]); // 42
```

The symbol key is copied because it is an own enumerable property.

## It Uses Get On The Source And Set On The Target

`Object.assign()` does not copy full property descriptors.

It gets a value from the source and sets that value on the target.

That means getters run during the copy.

```js
const source = {
  get score() {
    return 95;
  },
};

const copy = Object.assign({}, source);
const descriptor = Object.getOwnPropertyDescriptor(copy, 'score');

console.log(copy.score); // 95
console.log(descriptor.get); // undefined
```

What happened:

- `source.score` is a getter.
- `Object.assign()` read the value from the getter.
- The copied property became a normal value property on `copy`.
- The getter function itself was not copied.

Use descriptor methods such as `Object.getOwnPropertyDescriptors()` and
`Object.defineProperties()` when you need to copy property descriptors.

## `null` And `undefined`

`null` and `undefined` sources are ignored:

```js
const result = Object.assign({ ready: false }, null, undefined, {
  ready: true,
});

console.log(result); // { ready: true }
```

But `null` and `undefined` cannot be targets:

```js
Object.assign(null, { name: 'Asha' }); // TypeError
Object.assign(undefined, { name: 'Asha' }); // TypeError
```

The target must be something JavaScript can convert to an object.

## Errors Can Leave Partial Changes

If one property cannot be assigned, `Object.assign()` throws a `TypeError` and
stops copying.

Properties copied before the error stay on the target.

```js
const target = {};

Object.defineProperty(target, 'blocked', {
  value: 1,
  writable: false,
  enumerable: true,
});

try {
  Object.assign(target, {
    copiedBeforeError: true,
    blocked: 2,
    copiedAfterError: true,
  });
} catch (error) {
  console.log(error.name); // TypeError
}

console.log(Object.hasOwn(target, 'copiedBeforeError')); // true
console.log(Object.hasOwn(target, 'copiedAfterError')); // false
```

What happened:

- `copiedBeforeError` was copied first.
- Assigning `blocked` failed because the target property is not writable.
- `Object.assign()` stopped at that error.
- `copiedAfterError` was not copied.

## Difference From Object Spread

Object spread is often used for shallow copies and merges:

```js
const copy = {
  ...source,
};
```

For many simple cases, object spread and `Object.assign({}, source)` look
similar.

The practical beginner difference is:

```text
Object.assign(target, source)
  -> modifies the target you pass

{ ...source }
  -> creates a new object literal
```

There are deeper differences with setters and property creation, but this
mutation difference is the most important one to remember first.

## Important Notes

- `Object.assign()` is a static method on `Object`.
- It copies from source objects into a target object.
- It returns the target object.
- It mutates the target object.
- Later sources overwrite earlier sources for the same property key.
- It makes a shallow copy, not a deep copy.
- It copies own enumerable string keys and symbol keys.
- It skips inherited properties.
- It skips non-enumerable properties.
- It ignores `null` and `undefined` sources.
- It throws a `TypeError` for `null` or `undefined` targets.
- It uses normal get and set behavior, so getters and setters can matter.
- If assignment fails in the middle, earlier changes can remain.

## When To Use It

Use `Object.assign()`:

- when you want to copy properties into an existing target object,
- when you want to merge several simple objects,
- when you want a shallow copy and understand nested values are shared,
- when you intentionally want target mutation.

Use object spread:

- when you want a concise new object for simple shallow copies or simple merges.

Use `structuredClone()`:

- when you need a deep clone and your values support structured cloning.

Use descriptor methods:

- when you need to copy getters, setters, writability, enumerability, or
  configurability exactly.

## Common Mistakes

### Mistake 1: Thinking It Always Creates A New Object

```js
const target = {};
const result = Object.assign(target, {
  name: 'Asha',
});

console.log(result === target); // true
```

`Object.assign()` returns the target. It does not create a new object unless you
provide a new object as the target.

### Mistake 2: Forgetting It Is Shallow

```js
const original = {
  nested: {
    count: 1,
  },
};

const copy = Object.assign({}, original);

copy.nested.count = 2;

console.log(original.nested.count); // 2
```

The top-level object was copied. The nested object was shared.

### Mistake 3: Expecting Non-Enumerable Properties To Copy

```js
const source = {};

Object.defineProperty(source, 'secret', {
  value: 42,
  enumerable: false,
});

const copy = Object.assign({}, source);

console.log(copy.secret); // undefined
```

`Object.assign()` copies enumerable own properties only.

### Mistake 4: Expecting Inherited Properties To Copy

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);
user.name = 'Asha';

const copy = Object.assign({}, user);

console.log(copy.name); // Asha
console.log(copy.role); // undefined
```

Inherited properties are not copied.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/assign/assign.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- ECMAScript spec:
  [`Object.assign`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign)
