# Proxy `has` Trap

## What Problem Does It Solve?

JavaScript can check whether a property exists with the `in` operator:

```js
const profile = {
  name: 'Asha',
};

console.log('name' in profile);
// true

console.log('role' in profile);
// false
```

Normally, JavaScript performs this check directly on the object and its
prototype chain.

Sometimes you want to control the answer. For example, you may want to:

- record which keys are checked,
- hide selected keys from existence checks,
- report virtual keys that are not physically stored,
- define a custom membership rule such as `5 in range`,
- forward the check while preserving normal JavaScript behavior.

The Proxy `has` trap gives you that control.

## Quick Definition

The `has` trap intercepts property-existence checks performed through a proxy.

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});
```

It runs for:

```js
'key' in proxy;
Reflect.has(proxy, 'key');
```

It does not run for an own-property check such as:

```js
Object.hasOwn(proxy, 'key');
```

These operations ask different questions.

| Operation | Question |
|---|---|
| `'key' in proxy` | Does the key exist on the object or anywhere in its prototype chain? |
| `Reflect.has(proxy, 'key')` | The function form of the same prototype-chain-aware check |
| `Object.hasOwn(proxy, 'key')` | Does the object itself own the key? |

## Mental Model

An existence check through a proxy follows this path:

```text
'name' in proxy
  -> has(target, 'name')
  -> custom filtering, logging, or membership logic
  -> true or false
```

With normal forwarding:

```text
'name' in proxy
  -> has(target, 'name')
  -> Reflect.has(target, 'name')
  -> check target
  -> if needed, continue through target's prototype chain
  -> true or false
```

Keep these jobs separate:

```text
check existence -> has trap
read a value    -> get trap
check ownership -> Object.hasOwn() and other internal operations
list keys       -> ownKeys trap
```

The `has` trap changes only the result of an existence check. It does not
automatically create, read, delete, or list a property.

## Syntax

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return trueOrFalse;
  },
});
```

A common transparent implementation forwards the operation:

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});
```

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol property key being checked |

Consider this check:

```js
const profileTarget = {
  name: 'Asha',
};

const profile = new Proxy(profileTarget, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});

console.log('name' in profile);
// true
```

The trap receives:

| Parameter | Value |
|---|---|
| `target` | `profileTarget` |
| `property` | `'name'` |

### `target`

`target` is the original object passed as the first argument to `new Proxy()`.

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, handler);
```

The normal existence check can be forwarded to this object with
`Reflect.has()`.

### `property`

`property` is the key being checked. It is either a string or a symbol.

```js
'name' in proxy;
// property is 'name'

0 in proxy;
// property is '0', a string

secretKey in proxy;
// property is secretKey, a symbol
```

Numeric keys become strings before the trap receives them. Symbol keys remain
symbols.

## Return Value

The `has` trap returns a truthy or falsy result:

```text
truthy result -> report that the property exists
falsy result  -> report that the property does not exist
```

JavaScript converts the result to a boolean:

```js
const proxy = new Proxy({}, {
  has() {
    return 'yes';
  },
});

console.log('anything' in proxy);
// true
```

Returning explicit booleans is clearer:

```js
return true;
return false;
```

The returned boolean is the trap's answer to the existence question. It does
not create or remove a property.

## Normal Forwarding With `Reflect.has()`

Use `Reflect.has()` when the proxy should preserve normal JavaScript behavior.

```js
const sharedProfile = {
  role: 'learner',
};

const profileTarget = Object.create(sharedProfile);
profileTarget.name = 'Asha';

const profile = new Proxy(profileTarget, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});

console.log('name' in profile);
// true

console.log('role' in profile);
// true

console.log('missing' in profile);
// false
```

The first check finds the own property `name` on `profileTarget`.

The second check does not find `role` directly on `profileTarget`, so the
normal lookup continues to `sharedProfile`, which is its prototype:

```text
profile proxy
  -> profileTarget
      -> sharedProfile
          -> Object.prototype
              -> null
```

`Reflect.has(target, property)` includes this prototype-chain search, just like
the `in` operator.

## `in`, `Reflect.has()`, And `Object.hasOwn()`

Both `in` and `Reflect.has()` trigger the `has` trap when their object is a
proxy:

```js
const checkedKeys = [];

const profile = new Proxy(
  {
    name: 'Asha',
  },
  {
    has(target, property) {
      checkedKeys.push(property);

      return Reflect.has(target, property);
    },
  },
);

console.log('name' in profile);
// true

console.log(Reflect.has(profile, 'topic'));
// false

console.log(checkedKeys);
// [ 'name', 'topic' ]
```

`Object.hasOwn()` does not trigger the `has` trap because it performs an
own-property check rather than the internal existence operation intercepted by
`has`.

```js
const sharedProfile = {
  role: 'learner',
};

const profileTarget = Object.create(sharedProfile);
profileTarget.name = 'Asha';

const profile = new Proxy(profileTarget, {
  has(target, property) {
    console.log('has trap:', property);

    return Reflect.has(target, property);
  },
});

console.log('role' in profile);
// has trap: role
// true

console.log(Object.hasOwn(profile, 'role'));
// false
```

`role` exists in the prototype chain, so `in` reports `true`. The proxy does
not own `role`, so `Object.hasOwn()` reports `false`.

## Filtering Existence Checks

A `has` trap can hide selected configurable properties from checks performed
through the proxy.

```js
const accountTarget = {
  name: 'Mina',
  _token: 'secret',
};

const account = new Proxy(accountTarget, {
  has(target, property) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return false;
    }

    return Reflect.has(target, property);
  },
});

console.log('name' in account);
// true

console.log('_token' in account);
// false
```

The custom condition handles underscore-prefixed string keys. Every other key
is forwarded to `Reflect.has()`.

The `typeof` guard matters because a symbol does not have a `startsWith()`
method.

### Filtering Does Not Block Reading

The `has` trap controls an existence check, not a property read:

```js
console.log('_token' in account);
// false

console.log(account._token);
// secret
```

Reading `account._token` uses the proxy's `get` behavior. Because this proxy
has no `get` trap, the normal read still reaches the target.

To control both operations, the proxy would need both traps:

```js
const account = new Proxy(accountTarget, {
  has(target, property) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return false;
    }

    return Reflect.has(target, property);
  },

  get(target, property, receiver) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return undefined;
    }

    return Reflect.get(target, property, receiver);
  },
});
```

This is still an interface rule, not a security boundary. Code that holds the
original target can bypass the proxy:

```js
console.log('_token' in accountTarget);
// true

console.log(accountTarget._token);
// secret
```

## Reporting Virtual Existence

The trap can report that a missing property exists:

```js
const connectionTarget = {};

const connection = new Proxy(connectionTarget, {
  has(target, property) {
    if (property === 'connected') {
      return true;
    }

    return Reflect.has(target, property);
  },
});

console.log('connected' in connection);
// true
```

This changes only the answer returned by the existence check.

```js
console.log(Object.hasOwn(connectionTarget, 'connected'));
// false

console.log(connection.connected);
// undefined
```

The target still has no `connected` property, and no `get` trap provides a
value for it.

Think of the result as a claim made for this operation:

```text
'connected' in connection -> true
stored property            -> none
property read              -> undefined
```

If a virtual key should also return a virtual value, add matching `get`
behavior.

## Numeric And Symbol Keys

Property keys received by the trap are strings or symbols.

```js
const secretKey = Symbol('secret');
const keyLog = [];

const keyedObject = new Proxy(
  {
    0: 'zero',
    [secretKey]: 'hidden',
  },
  {
    has(target, property) {
      keyLog.push(`${String(property)}:${typeof property}`);

      return Reflect.has(target, property);
    },
  },
);

console.log(0 in keyedObject);
// true

console.log(secretKey in keyedObject);
// true

console.log(keyLog);
// [ '0:string', 'Symbol(secret):symbol' ]
```

Even though the code uses the number `0`, the trap receives the string `'0'`.
The symbol remains a symbol.

Use `String(property)` when every key must be converted safely for logging.
Guard the type before applying string-only rules:

```js
if (typeof property === 'string' && property.startsWith('_')) {
  return false;
}
```

## Custom Membership: A Virtual Range

The `has` trap can define a membership rule instead of checking stored
properties.

```js
const rangeTarget = {
  start: 1,
  end: 10,
};

const range = new Proxy(rangeTarget, {
  has(target, property) {
    if (typeof property !== 'string') {
      return false;
    }

    const candidate = Number(property);

    return (
      Number.isFinite(candidate) &&
      candidate >= target.start &&
      candidate <= target.end
    );
  },
});

console.log(5 in range);
// true

console.log(50 in range);
// false
```

The left side of `in` is converted to a property key before the trap runs:

```text
5 in range
  -> has(rangeTarget, '5')
  -> Number('5')
  -> 5 >= 1 and 5 <= 10
  -> true
```

This custom trap does not forward ordinary property names:

```js
console.log('start' in range);
// false

console.log(Object.hasOwn(rangeTarget, 'start'));
// true
```

The target owns `start`, but the custom membership rule reports `false` for
that check. This is permitted here because the property is configurable and
the target is extensible.

## Proxy Invariants

A Proxy trap may customize behavior, but it cannot contradict certain facts
that JavaScript must protect.

The `has` trap cannot report `false` in either of these situations:

1. the target has that property as a non-configurable own property,
2. the target has that property as an own property and the target is
   non-extensible.

Violating either rule causes a `TypeError`.

### Non-Configurable Own Property

```js
const target = {};

Object.defineProperty(target, 'id', {
  value: 42,
  configurable: false,
});

const proxy = new Proxy(target, {
  has() {
    return false;
  },
});

console.log('id' in proxy);
// TypeError
```

The trap claims that `id` does not exist, but the target has permanently fixed
that own property as non-configurable. JavaScript rejects the contradiction.

### Existing Property On A Non-Extensible Target

```js
const target = {
  name: 'Asha',
};

Object.preventExtensions(target);

const proxy = new Proxy(target, {
  has() {
    return false;
  },
});

console.log('name' in proxy);
// TypeError
```

`name` was originally configurable because it was created with object-literal
syntax. However, the target is now non-extensible, so the trap cannot hide any
existing own property.

### Why `Reflect.has()` Is The Safest Default

Transparent forwarding naturally preserves these protected facts:

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});
```

Only replace the result when the proxy intentionally needs custom behavior,
and keep the invariants in mind.

## Direct Access To The Target Bypasses The Trap

The handler intercepts operations performed through the proxy, not operations
performed directly on the original target.

```js
const target = {
  name: 'Asha',
};

const checkedKeys = [];

const proxy = new Proxy(target, {
  has(target, property) {
    checkedKeys.push(property);

    return Reflect.has(target, property);
  },
});

console.log('name' in proxy);
// true

console.log('name' in target);
// true

console.log(checkedKeys);
// [ 'name' ]
```

Only the first check goes through the proxy and runs the trap.

## Important Notes

### `has` Includes The Prototype Chain

Normal forwarding with `Reflect.has()` checks both own and inherited
properties.

```js
const parent = {
  role: 'learner',
};

const target = Object.create(parent);

console.log(Reflect.has(target, 'role'));
// true
```

Use `Object.hasOwn()` when the question is specifically about ownership.

### A Truthy Result Does Not Create A Property

```js
const target = {};

const proxy = new Proxy(target, {
  has() {
    return true;
  },
});

console.log('anything' in proxy);
// true

console.log(Object.hasOwn(target, 'anything'));
// false
```

The trap reports an existence result only.

### A Falsy Result Does Not Delete A Property

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  has() {
    return false;
  },
});

console.log('name' in proxy);
// false

console.log(target.name);
// Asha
```

The target still contains the configurable property.

### Legacy `with` Statements Also Use This Operation

The internal property-existence operation intercepted by `has` is also used by
legacy `with` statements. New code should avoid `with`; the useful modern
triggers are the `in` operator and `Reflect.has()`.

## Common Mistakes

### Confusing `has` With `get`

```js
const proxy = new Proxy(target, {
  has() {
    return false;
  },
});
```

This changes `'key' in proxy`. It does not automatically change `proxy.key`.

### Checking The Property Value Instead Of Existence

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return Boolean(target[property]);
  },
});
```

This is incorrect for existing properties whose values are falsy:

```js
const target = {
  count: 0,
  ready: false,
  result: undefined,
};
```

Use normal forwarding when you mean existence:

```js
return Reflect.has(target, property);
```

### Assuming The Check Is Own-Only

```js
return Reflect.has(target, property);
```

This includes the prototype chain. Use `Object.hasOwn(target, property)` only
when your custom rule intentionally requires own properties.

### Calling String Methods On A Symbol

```js
property.startsWith('_');
```

This throws when `property` is a symbol. Guard the type first:

```js
typeof property === 'string' && property.startsWith('_');
```

### Hiding Protected Target Properties

Returning `false` for a non-configurable own property, or for an existing own
property on a non-extensible target, violates a Proxy invariant and throws a
`TypeError`.

### Expecting The Proxy To Affect Direct Target Access

```js
'name' in proxy;
// has trap runs

'name' in target;
// has trap does not run
```

Operations must go through the proxy to be intercepted.

## When To Use The `has` Trap

Use it when you need to:

- observe `in` or `Reflect.has()` checks,
- expose virtual membership,
- hide selected configurable keys from existence checks,
- preserve normal behavior while adding logging,
- implement a domain-specific membership rule.

Do not use it when you only need to:

- read a property value; use `get`,
- validate a property write; use `set`,
- check whether an object owns a key; use `Object.hasOwn()`,
- control which own keys are listed; use `ownKeys`,
- delete a property; use `deleteProperty`.

## Runnable Practice File

Run the complete examples with:

```bash
node src/proxy/handlers/has/has.js
```

Practice file:

```text
src/proxy/handlers/has/has.js
```

## Related Notes

- [Proxy Basics](../../concepts/proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Doubt: Do We Have To Use `Reflect` Inside A Proxy Trap?](../../concepts/reflect-forwarding/doubt/doubt.md)
- [Proxy `get` Trap](../get/get.md)
- [Object Key Existence](../../../object/concepts/key-existence/key-existence.md)
- [Organized Note: `has` Trap](../../organized-notes/09-has-trap.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
- [MDN: `Reflect.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has)
- [ECMAScript: Proxy `[[HasProperty]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-hasproperty-p)
