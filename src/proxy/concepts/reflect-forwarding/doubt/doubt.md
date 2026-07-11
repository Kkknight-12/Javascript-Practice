# Doubts: Reflect Forwarding In Proxy Traps

## Doubt 1: Do We Have To Use `Reflect` Inside A Proxy Trap?

No. Using a matching `Reflect` method inside a Proxy trap is recommended for
normal forwarding, but it is not mandatory.

A trap can choose one of three approaches:

```text
Return the Reflect result -> preserve normal JavaScript behavior
Return a custom result    -> replace normal behavior with a custom answer
Custom logic + Reflect    -> customize special cases and forward everything else
```

None of these approaches is automatically wrong. Custom behavior is the
purpose of a Proxy. However, every trap must still return the kind of result
that its operation expects and obey that trap's Proxy invariants.

## Why Examples Commonly Use `Reflect`

A Proxy trap intercepts an operation before JavaScript performs its normal
target behavior.

For example:

```js
const proxy = new Proxy(target, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});
```

The flow is:

```text
'name' in proxy
  -> has trap intercepts the check
  -> Reflect.has(target, 'name') performs the normal check
  -> result is returned
```

`Reflect.has()` is not required to make the trap valid. It is used because the
trap wants to preserve the normal behavior after intercepting the operation.

This pattern lets a trap add logging without changing the result:

```js
const proxy = new Proxy(target, {
  has(target, property) {
    console.log(`Checking ${String(property)}`);

    return Reflect.has(target, property);
  },
});
```

The trap adds logging, while `Reflect.has()` still handles own properties and
the prototype chain according to normal JavaScript rules.

## Choice 1: Preserve Normal Behavior With `Reflect`

```js
const sharedProfile = {
  role: 'learner',
};

const target = Object.create(sharedProfile);
target.name = 'Asha';

const proxy = new Proxy(target, {
  has(target, property) {
    return Reflect.has(target, property);
  },
});

console.log('name' in proxy);
// true

console.log('role' in proxy);
// true

console.log('missing' in proxy);
// false
```

`Reflect.has()` gives the same kind of prototype-chain-aware answer as the
normal `in` operator.

The trap changes nothing about the existence rule:

```text
intercept operation -> yes
custom result       -> no
normal behavior     -> preserved by Reflect.has()
```

## Choice 2: Replace Normal Behavior With Custom Logic

A trap may return its own answer without using `Reflect`:

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  has(target, property) {
    return property === 'connected';
  },
});

console.log('connected' in proxy);
// true

console.log('name' in proxy);
// false
```

The target does not contain `connected`, but the custom rule reports `true`.
The target does contain `name`, but the custom rule reports `false`.

This happens because the trap never asks for the target's normal answer:

```text
'connected' in proxy
  -> property === 'connected'
  -> true

'name' in proxy
  -> property === 'connected'
  -> false
```

The custom logic is not automatically wrong. It intentionally replaces normal
existence behavior. The developer is now responsible for the complete answer
and for obeying the `has` trap's invariants.

## Choice 3: Handle Special Cases And Forward The Rest

This is often the most useful pattern:

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  has(target, property) {
    if (property === 'connected') {
      return true;
    }

    return Reflect.has(target, property);
  },
});

console.log('connected' in proxy);
// true

console.log('name' in proxy);
// true

console.log('missing' in proxy);
// false
```

The trap divides keys into two groups:

```text
connected      -> custom virtual answer
all other keys -> normal Reflect.has() behavior
```

This keeps the customization focused. Normal properties, inherited properties,
and symbols continue to follow JavaScript's usual rules unless the trap
deliberately handles them differently.

## Does The Same Choice Apply To The `get` Trap?

Yes. A `get` trap can also forward, replace, or combine behavior.

Unlike `has`, a `get` trap returns the value that should be produced by the
property read. It does not generally return a success boolean.

### Forward Every Read

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});
```

This preserves normal property reading, including prototype lookup and the
correct `receiver` for getters.

### Replace Every Read

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  get() {
    return 'custom value';
  },
});

console.log(proxy.name);
// custom value

console.log(proxy.anything);
// custom value
```

Every property read returns the custom value because no read is forwarded to
the target.

This includes reads that may not be obvious at first, such as method access or
symbol-key access. Fully replacing `get` behavior can therefore hide more
normal behavior than intended.

### Customize One Read And Forward The Rest

```js
const target = {
  firstName: 'Asha',
  lastName: 'Sharma',
};

const proxy = new Proxy(target, {
  get(target, property, receiver) {
    if (property === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log(proxy.fullName);
// Asha Sharma

console.log(proxy.firstName);
// Asha
```

`fullName` is a virtual property supplied by custom logic. Other reads are
forwarded normally.

## Why Not Always Write The Normal Operation Manually?

Sometimes a direct expression appears to work:

```js
get(target, property) {
  return target[property];
}
```

However, this is not always equivalent to:

```js
get(target, property, receiver) {
  return Reflect.get(target, property, receiver);
}
```

`Reflect.get()` preserves the `receiver` used as `this` when a getter runs.
Directly reading `target[property]` makes the getter use `target` as `this`,
which can produce the wrong result when another object inherits from the proxy.

The matching Reflect methods also make the intent clear:

```text
Reflect.get()            -> perform normal property reading
Reflect.set()            -> perform normal property writing
Reflect.has()            -> perform normal existence checking
Reflect.deleteProperty() -> perform normal property deletion
```

## What JavaScript Rules Must Custom Logic Follow?

Each trap has its own expected result and invariants. There is no single rule
that covers every trap.

### `has` Rules

The result is converted to a boolean.

A custom `has` trap may report a missing property as present:

```js
has(target, property) {
  return property === 'connected' || Reflect.has(target, property);
}
```

However, it cannot report `false` for:

- a non-configurable own property of the target,
- an existing own property when the target is non-extensible.

Violating either invariant causes a `TypeError`.

### `get` Rules

The trap may normally return any value, but it cannot contradict certain
locked own properties.

For an own data property that is both non-writable and non-configurable, the
trap must return that property's actual value.

For a non-configurable own accessor property whose getter is `undefined`, the
trap must return `undefined`.

Violating either invariant causes a `TypeError`.

### Other Traps Have Different Rules

For example:

- `set` returns a declared boolean status and has locked-property invariants,
- `deleteProperty` returns a declared boolean status and cannot claim certain
  protected properties were deleted,
- `ownKeys` must return a list of valid string or symbol keys and preserve
  required target keys.

Using `Reflect` helps preserve normal behavior, but custom trap code must still
be designed according to the particular trap being implemented.

## Is Custom Logic Wrong If It Changes The Answer?

No. Changing the answer is the main reason Proxy traps exist.

For example, this virtual property is intentional:

```js
get(target, property, receiver) {
  if (property === 'fullName') {
    return `${target.firstName} ${target.lastName}`;
  }

  return Reflect.get(target, property, receiver);
}
```

The important questions are:

1. Is the changed behavior intentional?
2. Does the trap return the correct type of result for its operation?
3. Does it preserve normal behavior for cases it does not intend to change?
4. Does it obey the trap's Proxy invariants?

If the answers are yes, custom behavior is valid.

## Final Mental Model

```text
Reflect method
  -> "Use JavaScript's normal behavior for this operation."

Custom return
  -> "Replace the normal behavior with my result."

Custom logic followed by Reflect
  -> "Handle my special cases, then preserve normal behavior for the rest."
```

`Reflect` is a forwarding tool, not a requirement. Use it when normal behavior
should continue. Skip or replace it when the trap intentionally defines custom
behavior, while still respecting the expected result and invariants of that
trap.

## Related Notes

- [Reflect Forwarding](../reflect-forwarding.md)
- [Proxy `get` Trap](../../../handlers/get/get.md)
- [Proxy `has` Trap](../../../handlers/has/has.md)
- [Proxy `set` Trap](../../../handlers/set/set.md)
- [Proxy `deleteProperty` Trap](../../../handlers/deleteProperty/deleteProperty.md)
- [Proxy Invariants](../../../organized-notes/03-proxy-invariants.md)

## References

- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN: Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [ECMAScript: Proxy Objects](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots)
