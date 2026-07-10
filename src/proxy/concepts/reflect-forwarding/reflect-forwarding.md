# Reflect Forwarding

## What Problem Does It Solve?

A proxy trap lets us intercept an operation.

But after intercepting, we often still want JavaScript to finish the normal
operation.

Example:

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log('Reading:', property);

    return Reflect.get(target, property, receiver);
  },
});
```

Here we want both things:

1. Run our custom logging.
2. Still read the real property normally.

That second step is called forwarding.

## Quick Definition

Reflect forwarding means:

```text
Inside a proxy trap, call the matching Reflect method to continue with normal behavior.
```

The shape is:

```js
const proxy = new Proxy(target, {
  trapName(target, ...rest) {
    // custom work

    return Reflect.trapName(target, ...rest);
  },
});
```

Not every trap has exactly this rest-parameter shape in real code, but the
mental model is useful:

```text
trap -> custom behavior -> matching Reflect method -> normal behavior
```

## Mental Model

Think of a proxy trap like a checkpoint:

```text
operation
  -> proxy trap
  -> custom work
  -> Reflect method
  -> target object
```

Without the final `Reflect` call, your trap may accidentally stop the normal
operation.

## Why Reflect Fits Proxy

Many `Proxy` traps have matching `Reflect` methods.

| Proxy Trap | Reflect Forwarding Method |
|---|---|
| `get` | `Reflect.get()` |
| `set` | `Reflect.set()` |
| `has` | `Reflect.has()` |
| `deleteProperty` | `Reflect.deleteProperty()` |
| `ownKeys` | `Reflect.ownKeys()` |
| `getOwnPropertyDescriptor` | `Reflect.getOwnPropertyDescriptor()` |
| `defineProperty` | `Reflect.defineProperty()` |
| `getPrototypeOf` | `Reflect.getPrototypeOf()` |
| `setPrototypeOf` | `Reflect.setPrototypeOf()` |
| `isExtensible` | `Reflect.isExtensible()` |
| `preventExtensions` | `Reflect.preventExtensions()` |
| `apply` | `Reflect.apply()` |
| `construct` | `Reflect.construct()` |

This naming match is intentional.

It lets you write custom proxy logic without manually recreating JavaScript's
default object behavior.

## `get` Forwarding

The `get` trap runs when a property is read.

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

1. `proxy.name` triggered the `get` trap.
2. The trap logged the property name.
3. `Reflect.get()` continued the normal property read.
4. The final value was `'Asha'`.

If you forget to return the normal value, the trap returns `undefined`.

```js
const proxy = new Proxy(user, {
  get(target, property) {
    console.log(property);
  },
});

console.log(proxy.name);
// undefined
```

The trap ran, but it did not forward the read.

## `set` Forwarding

The `set` trap runs when a property is written.

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

progress.score = 25;
```

The custom part is the validation:

```js
if (property === 'score' && value < 0) {
  throw new RangeError('score cannot be negative');
}
```

The forwarding part is:

```js
return Reflect.set(target, property, value, receiver);
```

`Reflect.set()` performs the normal write and returns `true` or `false`.

That return value matters because the `set` trap is expected to report whether
the write succeeded.

## `has` Forwarding

The `has` trap runs when the `in` operator is used.

```js
const settings = new Proxy(
  {
    theme: 'dark',
  },
  {
    has(target, property) {
      console.log('Checking:', property);

      return Reflect.has(target, property);
    },
  },
);

console.log('theme' in settings);
// Checking: theme
// true
```

The trap adds logging, then `Reflect.has()` performs the normal property
existence check.

## `deleteProperty` Forwarding

The `deleteProperty` trap runs when the `delete` operator is used.

```js
const session = new Proxy(
  {
    id: 'session-1',
    token: 'secret',
  },
  {
    deleteProperty(target, property) {
      if (property === 'token') {
        return false;
      }

      return Reflect.deleteProperty(target, property);
    },
  },
);

console.log(delete session.id);
// true

console.log(delete session.token);
// false
```

The trap blocks deletion of `token`.

For every other property, `Reflect.deleteProperty()` performs the normal delete
operation and returns whether it succeeded.

## Why Not Always Use Direct Syntax?

For simple cases, direct syntax can look similar:

```js
return target[property];
```

But `Reflect` is safer as the normal forwarding pattern because:

- it matches proxy trap names,
- it uses the same kind of arguments as the trap,
- it returns useful boolean success values for operations like `set` and
  `deleteProperty`,
- it preserves important behavior like `receiver` for getters and prototype
  cases,
- it avoids rewriting object operation rules by hand.

This does not mean direct syntax is always wrong.

It means `Reflect` is the cleaner default when your intention is:

```text
Do custom proxy work, then continue as JavaScript normally would.
```

## Forwarding With `...arguments`

Because trap parameters often match the matching `Reflect` method parameters,
you may see this shortcut:

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    return Reflect.get(...arguments);
  },
});
```

Inside that `get` trap, `arguments` contains:

```text
target, property, receiver
```

So this:

```js
Reflect.get(...arguments);
```

means:

```js
Reflect.get(target, property, receiver);
```

For first-time learning, writing the parameters explicitly is usually clearer.

Use `...arguments` only after you already understand what is being forwarded.

## Forward To The Target, Not The Proxy

Inside a trap, the normal forwarding call should use the `target` argument.

```js
return Reflect.get(target, property, receiver);
```

Do not forward to the same proxy from its own trap:

```js
return Reflect.get(proxy, property, receiver);
```

That can trigger the same trap again.

The flow becomes:

```text
proxy.name
  -> get trap
  -> Reflect.get(proxy, 'name', receiver)
  -> get trap again
  -> Reflect.get(proxy, 'name', receiver)
  -> ...
```

This can lead to infinite recursion.

## Important Notes

- Proxy traps intercept operations.
- Reflect methods perform the matching normal operation.
- Forwarding means calling the matching `Reflect` method from inside the trap.
- `Reflect.get()` is the normal forwarding choice for `get`.
- `Reflect.set()` is the normal forwarding choice for `set`.
- `Reflect.has()` is the normal forwarding choice for `has`.
- `Reflect.deleteProperty()` is the normal forwarding choice for
  `deleteProperty`.
- For beginner code, prefer explicit parameters before using
  `Reflect.get(...arguments)`.
- Forward to the trap's `target`, not to the same proxy.

## Common Mistakes

### Mistake 1: Doing Custom Work But Forgetting To Forward

```js
const proxy = new Proxy(target, {
  get(target, property) {
    console.log(property);
  },
});
```

This trap logs the property but returns `undefined`.

To keep the normal read:

```js
return Reflect.get(target, property, receiver);
```

### Mistake 2: Returning The Assigned Value From `set`

```js
set(target, property, value) {
  target[property] = value;

  return value;
}
```

The `set` trap should report success or failure.

Use `Reflect.set()` when you want the normal write result:

```js
return Reflect.set(target, property, value, receiver);
```

### Mistake 3: Forwarding To The Proxy Again

```js
return Reflect.get(proxy, property, receiver);
```

If this runs inside that same proxy's `get` trap, it can call the trap again and
again.

Forward to `target`:

```js
return Reflect.get(target, property, receiver);
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/proxy/concepts/reflect-forwarding/reflect-forwarding.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments for:

- forwarding with `Reflect.get()`,
- forwarding with `Reflect.set()`,
- forwarding with `Reflect.has()`,
- forwarding with `Reflect.deleteProperty()`,
- the `Reflect.get(...arguments)` shortcut,
- the recursion problem when forwarding to the proxy instead of the target.

## Related Pages

- Proxy basics:
  [`src/proxy/concepts/proxy-basics/proxy-basics.md`](../proxy-basics/proxy-basics.md)
- Reflect overview:
  [`src/reflect/notes.md`](../../../reflect/notes.md)
- Proxy and Reflect revision sequence:
  [`src/proxy/proxy-reflect-revision-sequence.md`](../../proxy-reflect-revision-sequence.md)

## References

- MDN:
  [`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- MDN:
  [`Reflect`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
