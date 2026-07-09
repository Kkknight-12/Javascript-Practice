# Reflect

## What Problem Does It Solve?

`Reflect` gives JavaScript a single place for low-level object operations.

At first it can feel confusing because many `Reflect` methods look like things
we can already do with:

- normal syntax,
- `Object` static methods,
- function methods like `Function.prototype.apply()`.

That doubt is correct.

`Reflect` is not mostly about brand-new beginner features.

It is mainly about making important object operations available as clear,
consistent functions.

## Quick Definition

`Reflect` is a built-in namespace object that contains static methods.

You do not create a `Reflect` object.

```js
console.log(typeof Reflect);
// object

// Reflect is not a constructor.
// new Reflect(); // TypeError
```

Use it like this:

```js
Reflect.methodName(target, ...arguments);
```

Examples:

```js
Reflect.has(user, 'name');
Reflect.get(user, 'name');
Reflect.set(user, 'name', 'Asha');
Reflect.ownKeys(user);
```

## Mental Model

Think of `Reflect` as:

```text
Reflect = function-form toolkit for object operations
```

Instead of using special syntax:

```js
'name' in user;
delete user.name;
user.name = 'Asha';
```

Reflect gives function calls:

```js
Reflect.has(user, 'name');
Reflect.deleteProperty(user, 'name');
Reflect.set(user, 'name', 'Asha');
```

This becomes especially useful when code needs to pass operations around,
wrap them, log them, or forward them from a `Proxy` handler.

## Your Doubt Is Correct

You said:

```text
Reflect seems to do the same work as Object static methods.
```

That is partly true.

Some methods overlap:

```js
Object.getPrototypeOf(object);
Reflect.getPrototypeOf(object);

Object.getOwnPropertyDescriptor(object, key);
Reflect.getOwnPropertyDescriptor(object, key);
```

Some methods are similar but not exactly the same:

```js
Object.defineProperty(object, key, descriptor);
Reflect.defineProperty(object, key, descriptor);
```

Some methods do not have one exact `Object` method equivalent:

```js
Reflect.ownKeys(object);
```

`Reflect.ownKeys()` gives all own keys in one call. To get the same kind of
key coverage with `Object`, you usually combine `Object.getOwnPropertyNames()`
and `Object.getOwnPropertySymbols()`.

Some Reflect methods are function versions of operators:

```js
'name' in object;
Reflect.has(object, 'name');

delete object.name;
Reflect.deleteProperty(object, 'name');
```

So the right mental model is:

```text
Reflect does not replace Object for daily beginner code.
Reflect gives a more complete and consistent low-level API.
```

## Why Do We Need Reflect?

### 1. It Gives Special Syntax A Function Form

Some object operations normally use operators:

```js
'name' in user;
delete user.name;
user.name = 'Asha';
```

`Reflect` turns those operations into functions:

```js
Reflect.has(user, 'name');
Reflect.deleteProperty(user, 'name');
Reflect.set(user, 'name', 'Asha');
```

Function form is useful when you want the operation to be explicit and reusable.

### 2. Some Reflect Methods Return `true` Or `false`

Some `Object` methods throw or return the object itself.

Reflect versions often return a boolean that tells whether the operation
succeeded.

Example:

```js
const user = {};

const success = Reflect.defineProperty(user, 'id', {
  value: 101,
});

console.log(success);
// true
```

With `Reflect.defineProperty()`, the return value directly answers:

```text
Did the define operation work?
```

That style is useful in low-level utilities and proxy handlers.

### 3. Reflect Works Naturally With Proxy

This is the biggest reason `Reflect` matters.

`Proxy` lets you intercept object operations.

Inside a proxy handler, `Reflect` lets you forward the operation to the original
target using the normal default behavior.

Example:

```js
const user = {
  name: 'Asha',
};

const proxy = new Proxy(user, {
  get(target, property, receiver) {
    console.log('Reading:', property);

    return Reflect.get(target, property, receiver);
  },
});

console.log(proxy.name);
// Reading: name
// Asha
```

What happened:

- The proxy intercepted the property read.
- We logged the property name.
- `Reflect.get()` performed the normal property-read behavior.

Without `Reflect`, you may be tempted to write:

```js
return target[property];
```

That works for simple cases, but `Reflect.get(target, property, receiver)` is
the proper forwarding form because it preserves the receiver behavior used by
getters and proxy operations.

### 4. Reflect Matches Internal Object Operations

JavaScript objects have internal operations such as:

```text
Get a property.
Set a property.
Check if a property exists.
Define a property.
Delete a property.
Get own property keys.
```

`Reflect` exposes many of these operations as normal functions.

This is why it feels lower-level than most beginner APIs.

### 5. Some Reflect Methods Give Extra Control

Some Reflect methods can do things normal syntax cannot express as directly.

Example:

```js
Reflect.get(target, propertyKey, receiver);
```

The `receiver` controls what `this` means inside a getter.

Another example:

```js
Reflect.construct(Target, args, NewTarget);
```

This can construct with a specific `new.target` value.

You do not need these every day, but they matter when building advanced
abstractions.

## `Reflect` vs `Object`

| Need | Prefer |
|---|---|
| Normal application code for visible keys | `Object.keys()` |
| Normal object method pages | `Object.*` methods |
| All own keys including symbols and non-enumerable keys | `Reflect.ownKeys()` |
| Function form of `in` | `Reflect.has()` |
| Function form of `delete` | `Reflect.deleteProperty()` |
| Forwarding from a `Proxy` trap | matching `Reflect.*` method |
| Boolean success/failure for low-level changes | `Reflect.defineProperty()`, `Reflect.set()`, `Reflect.preventExtensions()` |

## Common Pairings

| Normal Syntax Or Object Method | Reflect Version |
|---|---|
| `'key' in object` | `Reflect.has(object, 'key')` |
| `delete object.key` | `Reflect.deleteProperty(object, 'key')` |
| `object.key` | `Reflect.get(object, 'key')` |
| `object.key = value` | `Reflect.set(object, 'key', value)` |
| `Object.defineProperty(...)` | `Reflect.defineProperty(...)` |
| `Object.getPrototypeOf(...)` | `Reflect.getPrototypeOf(...)` |
| `Object.setPrototypeOf(...)` | `Reflect.setPrototypeOf(...)` |
| `Object.getOwnPropertyDescriptor(...)` | `Reflect.getOwnPropertyDescriptor(...)` |
| `Object.preventExtensions(...)` | `Reflect.preventExtensions(...)` |
| `Object.getOwnPropertyNames()` + `Object.getOwnPropertySymbols()` | `Reflect.ownKeys()` |

## Important Notes

- `Reflect` is not a constructor.
- All `Reflect` methods are static.
- `Reflect` is useful for low-level object operations.
- Many `Reflect` methods overlap with existing syntax or `Object` methods.
- The overlap is normal and intentional.
- `Reflect` becomes much easier to understand when studied with `Proxy`.
- For beginner object loops, `Object.keys()` is still usually the better first
  tool.

## When To Use It

Use `Reflect` when:

- you are writing proxy handlers,
- you need default forwarding behavior inside a `Proxy`,
- you want a function form of an object operation,
- you need boolean success/failure from low-level object changes,
- you need all own keys with `Reflect.ownKeys()`,
- you are studying advanced object behavior.

Use normal `Object` methods or normal syntax when they are clearer for everyday
code.

## Related Pages

- `Reflect.ownKeys()`:
  [`src/reflect/methods/static/ownKeys/ownKeys.md`](methods/static/ownKeys/ownKeys.md)
- Object looping comparison:
  [`src/object/loop-through-object/for-loop.md`](../object/loop-through-object/for-loop.md)

## References

- MDN:
  [`Reflect`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- MDN:
  [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- ECMAScript specification:
  [`Reflect Object`](https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object)
