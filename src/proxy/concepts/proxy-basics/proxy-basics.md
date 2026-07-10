# Proxy Basics

## What Problem Does It Solve?

Sometimes you do not want object operations to happen silently.

You may want to run code when someone:

- reads a property,
- writes a property,
- checks whether a property exists,
- deletes a property,
- asks for the object's keys.

`Proxy` lets you put a controlled layer in front of an object.

That layer can observe, validate, block, or customize object operations.

## Quick Definition

`Proxy` creates a proxy object for another object.

The proxy can be used in place of the original object, but it can intercept
fundamental operations before they reach the original object.

```js
const proxy = new Proxy(target, handler);
```

The two main words are:

| Word | Meaning |
|---|---|
| `target` | The original object being wrapped |
| `handler` | An object that contains trap methods |

## Mental Model

Think of a proxy like a controlled door in front of an object:

```text
outside code -> proxy -> target object
```

If the proxy has no special rule, the operation reaches the target normally.

If the proxy has a trap, the trap gets a chance to control that operation.

## Syntax

```js
const proxy = new Proxy(target, handler);
```

`Proxy` must be called with `new`.

```js
const proxy = new Proxy({}, {});

// Proxy({}, {}); // TypeError
```

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The object that the proxy wraps |
| `handler` | An object whose methods define which operations are intercepted |

Both `target` and `handler` must be objects.

## Return Value

`new Proxy(target, handler)` returns a new proxy object.

The proxy is not the same object as the target:

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {});

console.log(proxy === target);
// false
```

But operations through the proxy can still affect the target:

```js
proxy.name = 'Mina';

console.log(target.name);
// Mina
```

## Empty Handler

An empty handler means no custom traps are provided.

```js
const target = {
  message: 'hello',
};

const proxy = new Proxy(target, {});

console.log(proxy.message);
// hello
```

The proxy still exists, but it behaves like normal forwarding for ordinary
object operations.

## What Is A Trap?

A trap is a method inside the handler object.

It intercepts one kind of operation.

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

1. `proxy.name` tried to read the `name` property.
2. Because the handler has a `get` trap, JavaScript called that trap.
3. The trap logged the property name.
4. `Reflect.get()` performed the normal property read from the target.

## Why Reflect Is Used Inside Proxy

`Proxy` and `Reflect` are designed to fit together.

Many proxy traps have matching `Reflect` methods:

| Trap | Matching Reflect Method |
|---|---|
| `get` | `Reflect.get()` |
| `set` | `Reflect.set()` |
| `has` | `Reflect.has()` |
| `deleteProperty` | `Reflect.deleteProperty()` |
| `ownKeys` | `Reflect.ownKeys()` |
| `defineProperty` | `Reflect.defineProperty()` |
| `getPrototypeOf` | `Reflect.getPrototypeOf()` |
| `setPrototypeOf` | `Reflect.setPrototypeOf()` |

This is the clean pattern:

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log('Reading:', property);

    return Reflect.get(target, property, receiver);
  },
});
```

In plain English:

```text
Do my custom work first.
Then continue with the normal JavaScript behavior.
```

This is why the previous `Reflect` page said that `Reflect` becomes easier to
understand when studied with `Proxy`.

## `get` Trap

The `get` trap runs when a property is read through the proxy.

Its common parameter names are:

| Parameter | Meaning |
|---|---|
| `target` | The original object being wrapped |
| `property` | The property key being read, such as `'theme'` or a symbol key |
| `receiver` | The object that started the read; in simple proxy examples, this is usually the proxy |

Example:

```js
const settings = new Proxy(
  {
    theme: 'dark',
  },
  {
    get(target, property, receiver) {
      if (Reflect.has(target, property)) {
        return Reflect.get(target, property, receiver);
      }

      return 'not set';
    },
  },
);

console.log(settings.theme);
// dark

console.log(settings.language);
// not set
```

When this code runs:

```js
settings.theme;
```

The trap receives values like this:

| Parameter | Value |
|---|---|
| `target` | The original object `{ theme: 'dark' }` |
| `property` | `'theme'` |
| `receiver` | The proxy object stored in `settings` |

The trap gives the object custom read behavior.

Here, real properties are read normally. Missing properties return a default
value.

For most beginner examples, you do not need to manually use `receiver`.

You pass it to `Reflect.get(target, property, receiver)` so JavaScript can keep
the correct default behavior, especially when getters or prototype inheritance
are involved.

## `set` Trap

The `set` trap runs when a property is written through the proxy.

It is commonly used for validation.

Its common parameter names are:

| Parameter | Meaning |
|---|---|
| `target` | The original object being wrapped |
| `property` | The property key being written, such as `'score'` or a symbol key |
| `value` | The new value being assigned |
| `receiver` | The object that started the write; in simple proxy examples, this is usually the proxy |

Example:

```js
const progress = new Proxy(
  {
    score: 10,
  },
  {
    set(target, property, value, receiver) {
      if (property === 'score' && value < 0) {
        throw new RangeError('score cannot be negative');
      }

      return Reflect.set(target, property, value, receiver);
    },
  },
);

progress.score = 42;

console.log(progress.score);
// 42
```

When this code runs:

```js
progress.score = 42;
```

The trap receives values like this:

| Parameter | Value |
|---|---|
| `target` | The original object `{ score: 10 }` |
| `property` | `'score'` |
| `value` | `42` |
| `receiver` | The proxy object stored in `progress` |

The important part is:

```js
return Reflect.set(target, property, value, receiver);
```

`Reflect.set()` performs the normal assignment and returns `true` or `false` to
tell whether the write succeeded.

For most beginner examples, you mainly inspect `property` and `value`.

You still pass `receiver` to `Reflect.set()` so default assignment behavior
stays correct for setters and prototype-based cases.

## Proxy Is Not A Copy

A proxy does not clone the target.

The proxy and target are different objects, but the proxy usually forwards
operations to the same target object.

```js
const target = {
  count: 1,
};

const proxy = new Proxy(target, {});

proxy.count = 2;

console.log(target.count);
// 2
```

The target changed because the write went through the proxy and reached the
target.

## Use The Proxy Object

Proxy traps only run when the operation goes through the proxy.

```js
const target = {
  count: 5,
};

const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    if (property === 'count' && value < 0) {
      throw new RangeError('count cannot be negative');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

proxy.count = -1;
// RangeError
```

But direct access to the original target bypasses the proxy:

```js
target.count = -1;

console.log(proxy.count);
// -1
```

So if a proxy is meant to control access, outside code should use the proxy,
not the raw target object.

## Common Traps

| Trap | Runs When |
|---|---|
| `get` | A property is read |
| `set` | A property is written |
| `has` | The `in` operator checks a property |
| `deleteProperty` | The `delete` operator deletes a property |
| `ownKeys` | Own keys are requested |
| `defineProperty` | A property is defined with descriptor behavior |
| `getPrototypeOf` | The prototype is requested |
| `setPrototypeOf` | The prototype is changed |
| `apply` | A proxied function is called |
| `construct` | A proxied constructor is called with `new` |

This page focuses on the object basics. The later pages can study individual
traps in more detail.

## Important Notes

- `Proxy` creates a wrapper around a target object.
- The `handler` object contains traps.
- A trap intercepts a specific kind of operation.
- An empty handler forwards normal behavior to the target.
- `Reflect` is commonly used inside traps to continue the default behavior.
- A proxy is not a clone of the target.
- Direct access to the original target bypasses the proxy.
- Proxy traps must respect JavaScript's internal rules. If a trap breaks those
  rules, JavaScript can throw a `TypeError`.

## Common Mistakes

### Mistake 1: Thinking The Proxy Copies The Object

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {});

proxy.name = 'Mina';

console.log(target.name);
// Mina
```

The proxy did not create a separate copy. It forwarded the write to the target.

### Mistake 2: Using The Target Instead Of The Proxy

```js
target.name = 'Direct update';
```

That does not trigger proxy traps because the operation did not go through the
proxy.

### Mistake 3: Forgetting To Forward Default Behavior

```js
const proxy = new Proxy(target, {
  get(target, property) {
    console.log(property);
  },
});
```

This logs the property name, but it returns `undefined` for every property
because the trap never returns the normal value.

Use `Reflect.get()` when you want the normal read behavior:

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log(property);

    return Reflect.get(target, property, receiver);
  },
});
```

### Mistake 4: Returning The Wrong Thing From `set`

The `set` trap should return a boolean.

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});
```

For a `set` trap, the return value is part of the operation:

- returning `true` means the write was accepted,
- returning `false` means the write was rejected.

In strict mode, a rejected write can become a `TypeError`, so forwarding with
`Reflect.set()` is a clean way to return the correct boolean result.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/proxy/concepts/proxy-basics/proxy-basics.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments for:

- empty handler forwarding,
- `get` trap logging,
- default values for missing properties,
- `set` trap validation,
- `has` and `deleteProperty` traps,
- direct target access bypassing the proxy.

## Related Pages

- Reflect overview:
  [`src/reflect/notes.md`](../../../reflect/notes.md)
- `Reflect.ownKeys()`:
  [`src/reflect/methods/static/ownKeys/ownKeys.md`](../../../reflect/methods/static/ownKeys/ownKeys.md)

## References

- MDN:
  [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- ECMAScript specification:
  [`Proxy Objects`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects)
