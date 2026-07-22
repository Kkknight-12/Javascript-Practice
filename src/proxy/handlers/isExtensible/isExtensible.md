# Proxy `isExtensible` Trap

## What Problem Does It Solve?

An extensible object can accept new own properties:

```js
const profile = {
  name: 'Asha',
};

console.log(Object.isExtensible(profile)); // true

profile.role = 'developer';

console.log(profile.role); // developer
```

When the checked object is a Proxy, you may want to:

- log extensibility checks,
- observe integrity checks such as `Object.isSealed()`,
- preserve normal behavior while adding diagnostics,
- coordinate the check with a larger object-integrity policy.

The Proxy `isExtensible` trap intercepts requests that ask whether the proxy is
extensible.

Unlike some traps, it cannot invent a virtual answer. Its boolean result must
match the target's real extensibility state.

## Quick Definition

The `isExtensible` trap intercepts the proxy's internal `[[IsExtensible]]`
operation.

```js
const proxy = new Proxy(target, {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
});
```

The trap answers this question:

```text
Can new own properties still be added to this object?
```

It returns a boolean-like value, but the converted boolean must equal the
target's actual answer.

## What Does Extensible Mean?

An extensible object can grow new own properties.

```js
const settings = {};

console.log(Object.isExtensible(settings)); // true

settings.theme = 'dark';

console.log(settings.theme); // dark
```

`Object.preventExtensions()` changes that state:

```js
Object.preventExtensions(settings);

console.log(Object.isExtensible(settings)); // false
```

Non-extensible means:

```text
new own properties cannot be added
```

It does not automatically mean:

- existing properties are read-only,
- existing properties cannot be deleted,
- the object is sealed,
- the object is frozen.

The full distinction is covered in the ordinary `Object.isExtensible()`
lesson. This page focuses on Proxy interception.

## Mental Model

Normal forwarding follows this path:

```text
Object.isExtensible(proxy)
  -> proxy receives [[IsExtensible]]
  -> isExtensible(target) trap runs
  -> Reflect.isExtensible(target)
  -> target's actual boolean state
  -> trap returns that boolean
  -> JavaScript compares it with the target's actual state
  -> matching result is returned to the caller
```

A mismatched report follows this path:

```text
target is extensible
  -> trap returns false
  -> JavaScript converts result to false
  -> target's actual result is true
  -> false does not match true
  -> TypeError
```

This gives the trap two useful roles:

```text
observe the check
forward the truthful answer
```

It does not give the trap permission to replace the target's answer.

## Before This Page

The ordinary Object lesson explains extensibility in detail:

```text
src/object/methods/static-methods/isExtensible/isExtensible.md
```

The previous Proxy lesson showed why a non-extensible target restricts
prototype changes:

```text
src/proxy/handlers/setPrototypeOf/setPrototypeOf.md
```

This lesson now explains how a Proxy reports the extensibility fact itself.

## Syntax

```js
const proxy = new Proxy(target, {
  isExtensible(target) {
    return trueOrFalse;
  },
});
```

Normal forwarding:

```js
const proxy = new Proxy(target, {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
});
```

## Parameter

The trap receives one parameter.

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |

Example:

```js
const target = {};

const proxy = new Proxy(target, {
  isExtensible(receivedTarget) {
    console.log(receivedTarget === target);

    return Reflect.isExtensible(receivedTarget);
  },
});

Object.isExtensible(proxy);
// true
```

There is no property key because extensibility belongs to the whole object.

There is no `receiver` because the operation is not evaluating an accessor or
assigning a property.

### Trap `this`

Inside method syntax, trap `this` refers to the handler object:

```js
const handler = {
  label: 'profile handler',

  isExtensible(target) {
    console.log(this.label);

    return Reflect.isExtensible(target);
  },
};
```

`this` is not the target or the proxy.

## Return Value

The trap result is converted to a boolean:

```js
return true;
return false;
```

Truthy and falsy values are also converted:

```js
return 'yes'; // true
return 0;     // false
```

The caller receives the converted boolean, not the original string or number.

However, conversion is only the first requirement. The boolean must also match
the target's actual extensibility state.

```text
converted trap result === Reflect.isExtensible(target)
```

If they differ, JavaScript throws `TypeError`.

## Normal Forwarding With `Reflect.isExtensible()`

`Reflect.isExtensible(target)` reads the target's actual state and returns a
boolean.

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
});

console.log(Object.isExtensible(proxy)); // true
console.log(Reflect.isExtensible(proxy)); // true
```

What happened:

1. The caller asked about `proxy`.
2. The proxy invoked `isExtensible(target)`.
3. `Reflect.isExtensible(target)` read the target's real state.
4. The trap returned `true`.
5. JavaScript confirmed that `true` matched the target.
6. The caller received `true`.

After the target becomes non-extensible, the same forwarding code stays
correct:

```js
Object.preventExtensions(target);

console.log(Object.isExtensible(proxy)); // false
```

`Reflect.isExtensible(target)` now reads and returns `false`, so the trap follows
the current state instead of relying on a hardcoded answer.

## An Omitted Trap Forwards Automatically

A Proxy does not require every trap:

```js
const target = {};
const proxy = new Proxy(target, {});

console.log(Object.isExtensible(proxy)); // true

Object.preventExtensions(target);

console.log(Object.isExtensible(proxy)); // false
```

When `isExtensible` is absent, the proxy automatically delegates the internal
operation to its target.

Add an explicit trap only when custom observation or policy code is needed.

## Direct Callers

Both of these methods invoke `[[IsExtensible]]` on a Proxy:

```js
Object.isExtensible(proxy);
Reflect.isExtensible(proxy);
```

Example:

```js
let trapRuns = 0;

const proxy = new Proxy({}, {
  isExtensible(target) {
    trapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

Object.isExtensible(proxy);
Reflect.isExtensible(proxy);

console.log(trapRuns); // 2
```

For a Proxy, both methods receive the same validated boolean result.

## Integrity Checks Are Indirect Callers

`Object.isSealed()` and `Object.isFrozen()` need to know whether an object is
extensible.

Therefore, they can also invoke the proxy's `isExtensible` trap:

```js
let trapRuns = 0;

const proxy = new Proxy({}, {
  isExtensible(target) {
    trapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

console.log(Object.isSealed(proxy)); // false
console.log(Object.isFrozen(proxy)); // false
console.log(trapRuns); // 2
```

The proxy is extensible, so it cannot be sealed or frozen. Each integrity check
can answer `false` after learning that extensibility is `true`.

For a non-extensible proxy, those operations continue checking keys and
property descriptors. At that point, traps such as `ownKeys` and
`getOwnPropertyDescriptor` may also become involved.

This is another example of one public method using several internal object
operations to answer a larger question.

## Checking And Changing Are Different Operations

`isExtensible` only checks state:

```js
Object.isExtensible(proxy);
```

It does not change state.

`Object.preventExtensions()` changes state:

```js
Object.preventExtensions(proxy);
```

That operation uses `[[PreventExtensions]]`, which belongs to the
`preventExtensions` trap, not the `isExtensible` trap.

This trace makes the separation visible:

```js
let checkRuns = 0;
const target = {};

const proxy = new Proxy(target, {
  isExtensible(target) {
    checkRuns += 1;

    return Reflect.isExtensible(target);
  },
});

console.log(Object.isExtensible(proxy)); // true
console.log(checkRuns); // 1

Object.preventExtensions(proxy);

console.log(checkRuns); // 1

console.log(Object.isExtensible(proxy)); // false
console.log(checkRuns); // 2
```

What happened:

1. The first check ran `isExtensible`.
2. `Object.preventExtensions(proxy)` changed the target through the separate
   prevention operation.
3. That change did not run `isExtensible`.
4. The later check ran `isExtensible` again and observed the new `false` state.

`Object.seal()` and `Object.freeze()` also make an object non-extensible as part
of their larger integrity operations. They do not use the return value of
`isExtensible` to perform that change.

## The Trap Cannot Change Extensibility

Returning `false` does not make an object non-extensible:

```js
isExtensible() {
  return false;
}
```

If the target is still extensible, that code throws `TypeError` because the
report is false while the real state is true.

Returning `true` cannot make a non-extensible object extensible again:

```js
isExtensible() {
  return true;
}
```

If the target is non-extensible, that code also throws `TypeError`.

Extensibility is one-way:

```text
extensible -> non-extensible
```

After an object becomes non-extensible, JavaScript provides no operation that
makes that same object extensible again.

The trap can only report the current fact truthfully.

## What Non-Extensible Changes

Consider a target that has become non-extensible:

```js
const target = {
  name: 'Asha',
};

Object.preventExtensions(target);
```

### New Own Properties Cannot Be Added

```js
console.log(
  Reflect.defineProperty(target, 'role', {
    value: 'developer',
  }),
);
// false
```

### Existing Writable Properties Can Still Change

```js
target.name = 'Mina';

console.log(target.name);
// Mina
```

### A Different Prototype Cannot Be Installed

```js
console.log(Reflect.setPrototypeOf(target, {}));
// false
```

These are consequences of the actual target state. The `isExtensible` trap
only reports that state.

## The Exact-Result Invariant

The rule is unusually strict:

```text
ToBoolean(trap result) must equal Reflect.isExtensible(target)
```

There is no extensible-target exception and no virtual state.

Conceptually, JavaScript performs these steps:

```text
1. Run isExtensible(target).
2. Convert the trap result to true or false.
3. Ask the target for its actual extensibility.
4. Compare the two booleans.
5. Return the result if they match.
6. Throw TypeError if they differ.
```

This protects one consistent fact across traps. Extensibility affects whether
new own properties and different prototypes are allowed, so other object
operations must be able to rely on the same state.

## False Report For An Extensible Target

```js
const target = {};

const proxy = new Proxy(target, {
  isExtensible() {
    return false;
  },
});

Object.isExtensible(proxy);
// TypeError
```

The comparison is:

```text
trap report:   false
target result: true
match:         no
```

JavaScript does not return the false report to the caller. It throws because
the report contradicts the target.

## True Report For A Non-Extensible Target

```js
const target = Object.preventExtensions({});

const proxy = new Proxy(target, {
  isExtensible() {
    return true;
  },
});

Reflect.isExtensible(proxy);
// TypeError
```

The comparison is reversed:

```text
trap report:   true
target result: false
match:         no
```

Both mismatch directions violate the same invariant.

Even `Reflect.isExtensible()` throws here. Reflect exposes a valid boolean
result directly, but it cannot expose a boolean that violates Proxy rules.

## Matching Boolean-Coerced Results

JavaScript converts the trap result before comparing it.

This truthy result matches an extensible target:

```js
const proxy = new Proxy({}, {
  isExtensible() {
    return 'yes';
  },
});

console.log(Object.isExtensible(proxy));
// true
```

This falsy result matches a non-extensible target:

```js
const target = Object.preventExtensions({});

const proxy = new Proxy(target, {
  isExtensible() {
    return 0;
  },
});

console.log(Object.isExtensible(proxy));
// false
```

The caller receives `true` or `false`, not `'yes'` or `0`.

These examples are valid, but returning actual booleans communicates the trap's
contract more clearly.

## Why Hardcoded Answers Are Fragile

```js
const target = {};

const proxy = new Proxy(target, {
  isExtensible() {
    return true;
  },
});

console.log(Object.isExtensible(proxy)); // true
```

The hardcoded answer works only because the target currently happens to be
extensible.

After the state changes:

```js
Object.preventExtensions(target);

Object.isExtensible(proxy);
// TypeError
```

The handler code stayed the same, but its answer became stale.

Forward instead:

```js
return Reflect.isExtensible(target);
```

That expression reads the current state on every check.

## Forgetting `return`

This code calls the right Reflect method but discards its result:

```js
isExtensible(target) {
  Reflect.isExtensible(target);
}
```

A function without an explicit return produces `undefined`.

`undefined` is falsy, so JavaScript converts it to `false`.

For an extensible target:

```text
implicit trap result -> undefined -> false
actual target result -> true
outcome              -> TypeError
```

For a non-extensible target, the same mistake can accidentally appear to work:

```js
const target = Object.preventExtensions({});

const proxy = new Proxy(target, {
  isExtensible(target) {
    Reflect.isExtensible(target);
  },
});

console.log(Object.isExtensible(proxy));
// false
```

It works only because the accidental `false` matches the target at that moment.

Always write:

```js
return Reflect.isExtensible(target);
```

## Object And Reflect With Primitive Inputs

A Proxy is always an object. Therefore, both methods run the trap when their
argument is a Proxy.

Their difference appears when the argument itself is a primitive:

```js
console.log(Object.isExtensible(42));
// false

Reflect.isExtensible(42);
// TypeError
```

`Object.isExtensible()` returns `false` for primitive values.

`Reflect.isExtensible()` requires an object and throws for a primitive.

This input difference happens before any Proxy trap because a primitive is not
a Proxy.

## Throwing From The Trap

A trap may throw its own error:

```js
const proxy = new Proxy({}, {
  isExtensible() {
    throw new Error('Extensibility checks are unavailable');
  },
});
```

Both direct callers propagate that error:

```js
Object.isExtensible(proxy);
// Error: Extensibility checks are unavailable

Reflect.isExtensible(proxy);
// Error: Extensibility checks are unavailable
```

This is different from returning a mismatched boolean. A mismatch causes
JavaScript's invariant `TypeError`; a thrown custom error comes directly from
the handler.

## Direct Target Checks Bypass The Trap

Only checks made through the proxy are intercepted:

```js
let trapRuns = 0;
const target = {};

const proxy = new Proxy(target, {
  isExtensible(target) {
    trapRuns += 1;

    return Reflect.isExtensible(target);
  },
});

Object.isExtensible(target);
console.log(trapRuns); // 0

Object.isExtensible(proxy);
console.log(trapRuns); // 1
```

A Proxy cannot observe code that directly inspects the raw target.

## What `isExtensible` Does Not Intercept

The trap handles requests that ask for extensibility state.

| Operation | Relevant behavior |
|---|---|
| `Object.preventExtensions(proxy)` | Uses `preventExtensions` to change state |
| `Object.seal(proxy)` | Prevents extensions and changes property descriptors |
| `Object.freeze(proxy)` | Prevents extensions and locks property descriptors |
| Adding `proxy.newKey` | Uses `set` and possibly `defineProperty` |
| `Object.setPrototypeOf(proxy, prototype)` | Uses `setPrototypeOf` |
| `Object.isExtensible(target)` | Bypasses the proxy |

`Object.isSealed(proxy)` and `Object.isFrozen(proxy)` are different from their
mutating counterparts. The `is...` methods inspect state, so they can invoke
`isExtensible`.

## Important Notes

- The trap intercepts the proxy's `[[IsExtensible]]` internal operation.
- It receives only the original `target`.
- Trap `this` refers to the handler object.
- Its result is converted to a boolean.
- The converted result must exactly match the target's actual extensibility.
- `Reflect.isExtensible(target)` is the normal forwarding operation.
- An omitted trap forwards automatically.
- `Object.isExtensible()` and `Reflect.isExtensible()` directly run the trap.
- `Object.isSealed()` and `Object.isFrozen()` can run it indirectly.
- The trap checks state; it does not change state.
- The trap cannot virtualize extensibility.
- Either mismatch direction throws `TypeError`.
- Hardcoded answers can become stale after the target changes.
- Forgetting `return` produces a falsy `undefined` result.
- `preventExtensions`, `seal`, and `freeze` make objects non-extensible through
  mutating operations.
- Non-extensible does not automatically mean read-only, sealed, or frozen.
- Direct target checks bypass the trap.

## When To Use The Trap

Use `isExtensible` when you need to:

- log extensibility checks through a Proxy,
- preserve truthful checks while adding diagnostics,
- observe larger integrity checks,
- coordinate inspection with a `preventExtensions` policy,
- verify that a Proxy facade reports the target's actual state.

Do not use it when you only need to:

- make an object non-extensible; use `preventExtensions`,
- check an ordinary object without Proxy behavior; call
  `Object.isExtensible()` or `Reflect.isExtensible()` directly,
- prevent one property assignment; use `set` or `defineProperty`,
- prevent prototype changes; use `setPrototypeOf`.

## Common Mistakes

### Returning A Virtual Answer

```js
isExtensible() {
  return false;
}
```

This is invalid while the target is extensible. The trap cannot hide the real
state.

### Thinking `false` Prevents Extensions

The return value only reports state. Use `Object.preventExtensions()` or
`Reflect.preventExtensions()` to change state.

### Thinking `true` Restores Extensibility

A non-extensible object cannot be made extensible again. Returning true only
creates an invariant mismatch and throws.

### Hardcoding The Current State

The answer may become stale after `preventExtensions`, `seal`, or `freeze`.

### Calling Reflect Without Returning

```js
isExtensible(target) {
  Reflect.isExtensible(target);
}
```

Write:

```js
return Reflect.isExtensible(target);
```

### Assuming A Truthy Value Avoids Validation

JavaScript first converts the result and then compares it with the target.
Truthy and falsy values do not bypass the invariant.

### Confusing `isExtensible` With `preventExtensions`

One checks state; the other changes state. They correspond to different
internal methods and different Proxy traps.

### Expecting Non-Extensible To Mean Frozen

Existing writable properties may still change, and existing configurable
properties may still be deleted.

### Forwarding To The Proxy Again

Inside the trap, forward to `target`:

```js
return Reflect.isExtensible(target);
```

Calling `Reflect.isExtensible(proxy)` from that same proxy's trap re-enters the
trap and can recurse indefinitely.

### Forgetting Indirect Callers

`Object.isSealed()` and `Object.isFrozen()` can run the trap while answering
their larger integrity questions.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/isExtensible/isExtensible.js
```

The practice file contains commented examples, readable terminal labels, and
expected output comments:

```text
src/proxy/handlers/isExtensible/isExtensible.js
```

## Related Notes

- [Object.isExtensible()](../../../object/methods/static-methods/isExtensible/isExtensible.md)
- [Proxy `setPrototypeOf` Trap](../setPrototypeOf/setPrototypeOf.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Internal Methods And Proxy Traps](../../organized-notes/02-internal-methods-and-proxy-traps.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)
- [MDN: `Reflect.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible)
- [MDN: `Object.isExtensible()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
- [ECMAScript: Proxy `[[IsExtensible]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-isextensible)
