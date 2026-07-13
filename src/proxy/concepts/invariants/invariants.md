# Proxy Invariants

## What Problem Do They Solve?

A Proxy can replace fundamental object behavior with custom trap logic:

```js
const proxy = new Proxy(target, {
  get() {
    return 'custom value';
  },
});
```

If every trap result were accepted without limits, a proxy could contradict
facts that JavaScript has promised will remain stable.

For example, an object may contain an own property that is:

```text
non-configurable -> it cannot be deleted or freely reconfigured
non-writable     -> its stored value cannot be changed by assignment
```

A proxy should not be able to claim that this permanently locked property has
a different value, does not exist, or was successfully deleted.

JavaScript protects these facts with **Proxy invariants**.

## Quick Definition

A Proxy invariant is a rule that custom trap behavior must not violate.

The rule is checked against the proxy's target. If a trap result contradicts a
protected target fact, the proxy operation throws a `TypeError`.

```text
operation through proxy
  -> trap runs
  -> trap returns a result
  -> JavaScript compares the result with protected target facts
  -> valid result: operation continues
  -> contradictory result: TypeError
```

Different traps protect different facts. There is no single invariant that
applies identically to every trap.

## Mental Model

Think of a proxy as being allowed to customize an object inside boundaries:

```text
target facts
  |
  |-- ordinary or configurable facts -> proxy has broad freedom
  |
  `-- protected facts                -> trap must remain consistent
```

For example:

```text
configurable property
  -> get may usually return a custom value
  -> has may usually hide it
  -> deleteProperty may customize the result

non-configurable and non-writable property
  -> get must preserve its actual value
  -> set cannot claim a different value was assigned
  -> has cannot hide it
  -> deleteProperty cannot claim it was deleted
```

Invariants do not remove the purpose of a Proxy. They protect only specific
facts required for consistent object behavior.

## Custom Behavior Is Still Allowed

This virtual property is valid:

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
```

The target has no locked own `fullName` property whose value must be preserved.
The custom result therefore contradicts no `get` invariant.

This virtual existence result is also valid:

```js
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
```

The `has` trap may report a missing key as present. Its invariants mainly limit
when an existing target property may be reported as absent.

The important question is not:

```text
Is the trap custom?
```

The important question is:

```text
Does the custom result contradict a fact protected by this trap's invariants?
```

## Where Protected Facts Come From

Many invariants depend on:

- property descriptors,
- non-configurable properties,
- non-writable properties,
- whether the target is extensible.

### Property Descriptors

A property descriptor records rules for an own property:

```js
const target = {};

Object.defineProperty(target, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptor(target, 'version'));
```

Output:

```js
{
  value: '1.0',
  writable: false,
  enumerable: false,
  configurable: false,
}
```

Two attributes are especially important here:

```text
writable: false
  -> normal assignment cannot replace the stored value

configurable: false
  -> the property cannot be deleted or freely reconfigured
```

Together, these attributes make the data property's value a protected fact for
the `get` and `set` traps.

### Non-Extensible Targets

An extensible object can receive new own properties. A non-extensible object
cannot:

```js
const target = {
  name: 'Asha',
};

Object.preventExtensions(target);

console.log(Object.isExtensible(target));
// false
```

Non-extensibility makes the target's set of own properties more constrained.
This affects traps such as `has` and `deleteProperty`.

Non-extensible does not mean frozen:

```text
non-extensible -> cannot add new own properties
sealed         -> non-extensible and own properties are non-configurable
frozen         -> sealed and own data properties are non-writable
```

A configurable property can still be deleted from a merely non-extensible
object.

## Invariants Are Checked Against The Target

Consider this proxy:

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
```

The handler returns `false`, but JavaScript checks the target and finds the
non-configurable own `id` property:

```js
console.log('id' in proxy);
// TypeError
```

The relevant comparison is:

```text
trap result -> id does not exist
target fact -> id is a non-configurable own property
comparison  -> contradiction
result      -> TypeError
```

Changing the proxy object separately is not the issue. The target supplied to
`new Proxy(target, handler)` is the source of the protected facts.

## The Trap Runs Before The Invariant Error

The trap can run before JavaScript rejects its result:

```js
let trapRan = false;

const target = {};

Object.defineProperty(target, 'token', {
  value: 'abc',
  configurable: false,
});

const proxy = new Proxy(target, {
  has() {
    trapRan = true;

    return false;
  },
});

try {
  console.log('token' in proxy);
} catch (error) {
  console.log(error.name);
  // TypeError
}

console.log(trapRan);
// true
```

The flow is:

```text
'token' in proxy
  -> has trap runs
  -> trap changes trapRan to true
  -> trap returns false
  -> JavaScript checks target.token
  -> invariant violation is found
  -> TypeError
```

An invariant failure does not rewind unrelated side effects already performed
inside the trap.

## `get` Trap Invariants

The `get` trap can normally return any value. Two kinds of locked own
properties limit that freedom.

### Locked Data Property

If the target has an own data property that is both:

- non-writable,
- non-configurable,

the `get` trap must return its actual value.

```js
const target = {};

Object.defineProperty(target, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});

const proxy = new Proxy(target, {
  get(target, property, receiver) {
    if (property === 'version') {
      return '2.0';
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log(proxy.version);
// TypeError
```

The trap's result contradicts the locked target value:

```text
target value -> '1.0'
trap value   -> '2.0'
result       -> TypeError
```

Normal forwarding returns the required value:

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

console.log(proxy.version);
// 1.0
```

JavaScript compares these values using same-value semantics. The easiest safe
rule is to return the exact locked value through normal forwarding.

### Non-Configurable Accessor Without A Getter

An accessor property may have a setter but no getter:

```js
const target = {};

Object.defineProperty(target, 'secret', {
  get: undefined,
  set(value) {
    // Handle the write.
  },
  configurable: false,
});
```

Normal reading produces `undefined` because there is no getter:

```js
console.log(Reflect.get(target, 'secret'));
// undefined
```

Because the property is non-configurable, a `get` trap must also return
`undefined`:

```js
const proxy = new Proxy(target, {
  get() {
    return 'revealed';
  },
});

console.log(proxy.secret);
// TypeError
```

The trap cannot invent a readable value for this locked getter-less accessor.

## `set` Trap Invariants

The `set` trap returns a declared success status. Invariants prevent it from
declaring certain impossible writes successful.

### Locked Data Property

```js
const target = {};

Object.defineProperty(target, 'score', {
  value: 10,
  writable: false,
  configurable: false,
});

const proxy = new Proxy(target, {
  set() {
    return true;
  },
});

Reflect.set(proxy, 'score', 20);
// TypeError
```

The trap declares success for assigning `20`, but the target's permanently
locked value is `10`:

```text
proposed value       -> 20
protected value      -> 10
trap declares        -> true
possible target write -> no
result               -> TypeError
```

Normal forwarding reports the failed write honestly:

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

console.log(Reflect.set(proxy, 'score', 20));
// false
```

### Reporting Success For The Same Value

The locked-data-property invariant blocks a truthy result for a **different**
value. Reporting success for the same value does not contradict the protected
value:

```js
const proxy = new Proxy(target, {
  set() {
    return true;
  },
});

console.log(Reflect.set(proxy, 'score', 10));
// true

console.log(target.score);
// 10
```

No write occurred, but the target still has the required value `10`. Therefore,
the invariant does not reject this declared success.

This demonstrates an important limit:

```text
Proxy invariants enforce minimum consistency.
They do not prove that every reported operation physically happened.
```

### Non-Configurable Accessor Without A Setter

```js
const target = {};

Object.defineProperty(target, 'id', {
  get() {
    return 42;
  },
  set: undefined,
  configurable: false,
});

const proxy = new Proxy(target, {
  set() {
    return true;
  },
});

Reflect.set(proxy, 'id', 100);
// TypeError
```

The accessor has no setter, so it cannot accept an assignment. Because it is
also non-configurable, the trap cannot declare that any assignment to `id`
succeeded.

## `has` Trap Invariants

The `has` trap controls the answer produced by `in` and `Reflect.has()`.

It cannot report `false` for:

1. a non-configurable own property of the target,
2. any existing own property when the target is non-extensible.

### Hiding A Non-Configurable Own Property

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

The trap cannot hide an own property that the target has made
non-configurable.

### Hiding An Own Property On A Non-Extensible Target

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

`name` was created with object-literal syntax, so it is configurable. However,
the target is now non-extensible and still owns `name`. The trap cannot report
that this existing own property is absent.

### Reporting A Virtual Property As Present

The protected direction matters. A `has` trap may usually return `true` for a
missing property:

```js
const proxy = new Proxy({}, {
  has(target, property) {
    return property === 'connected';
  },
});

console.log('connected' in proxy);
// true
```

This virtual answer does not claim that a protected target property is absent.

## `deleteProperty` Trap Invariants

The `deleteProperty` trap cannot report successful deletion while:

1. a non-configurable own property still exists on the target,
2. an own property still exists on a non-extensible target.

### Claiming A Non-Configurable Property Was Deleted

```js
const target = {};

Object.defineProperty(target, 'id', {
  value: 42,
  configurable: false,
});

const proxy = new Proxy(target, {
  deleteProperty() {
    return true;
  },
});

Reflect.deleteProperty(proxy, 'id');
// TypeError
```

The trap reports success, but it did not delete `id`. JavaScript checks the
target, finds the protected property, and rejects the result.

### Leaving An Own Property On A Non-Extensible Target

```js
const target = {
  name: 'Mina',
};

Object.preventExtensions(target);

const proxy = new Proxy(target, {
  deleteProperty() {
    return true;
  },
});

Reflect.deleteProperty(proxy, 'name');
// TypeError
```

The configurable own property remains on the non-extensible target even though
the trap declared successful deletion.

### Actually Deleting A Configurable Property Is Valid

Non-extensibility prevents additions. It does not prevent deletion of a
configurable property.

```js
const target = {
  name: 'Ravi',
};

Object.preventExtensions(target);

const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log(Reflect.deleteProperty(proxy, 'name'));
// true

console.log(Object.hasOwn(target, 'name'));
// false
```

The operation is valid because `Reflect.deleteProperty()` actually removes the
configurable property before returning `true`:

```text
trap performs deletion
  -> name no longer exists on target
  -> trap returns true
  -> JavaScript finds no contradictory own property
  -> valid result
```

The invariant does not say:

```text
No property can be deleted from a non-extensible target.
```

It says that the trap cannot report successful deletion while the relevant own
property still remains there.

## Summary Of The Studied Trap Invariants

| Trap | Protected target fact | Contradictory result |
|---|---|---|
| `get` | Non-writable, non-configurable own data property has a fixed value | Return a different value |
| `get` | Non-configurable own accessor has no getter | Return anything except `undefined` |
| `set` | Non-writable, non-configurable own data property has a fixed value | Return truthy for assigning a different value |
| `set` | Non-configurable own accessor has no setter | Return truthy for an assignment |
| `has` | Target has a non-configurable own property | Return falsy for that key |
| `has` | Non-extensible target has an existing own property | Return falsy for that key |
| `deleteProperty` | Target still has a non-configurable own property | Return truthy for deleting that key |
| `deleteProperty` | Non-extensible target still has an own property | Return truthy for deleting that key |

Each rule is specific to the operation being intercepted.

## Why `Reflect` Is A Strong Default

Matching `Reflect` methods perform the target's normal operation and return its
normal result:

```js
get(target, property, receiver) {
  return Reflect.get(target, property, receiver);
}

set(target, property, value, receiver) {
  return Reflect.set(target, property, value, receiver);
}

has(target, property) {
  return Reflect.has(target, property);
}

deleteProperty(target, property) {
  return Reflect.deleteProperty(target, property);
}
```

Because these operations use the target's real rules, their results normally
remain consistent with the target's descriptors and extensibility.

`Reflect` is not mandatory. Custom logic is valid when it intentionally changes
behavior and still respects the corresponding invariants.

## Invariants Do Not Verify Everything

Invariants are minimum consistency requirements, not a complete audit of trap
honesty.

For example, this trap may report successful deletion without deleting a
configurable property on an extensible target:

```js
const target = {
  temporary: 'still here',
};

const proxy = new Proxy(target, {
  deleteProperty() {
    return true;
  },
});

console.log(Reflect.deleteProperty(proxy, 'temporary'));
// true

console.log(target.temporary);
// still here
```

No `deleteProperty` invariant rejects this particular claim because the
property is configurable and the target is extensible.

Similarly, a `set` trap can return `true` without performing an ordinary write
when no protected target fact makes the claim impossible.

Good proxy code should keep its reported result aligned with its real behavior
even when JavaScript does not enforce that alignment with an invariant.

## Later Traps Have Their Own Invariants

The traps studied next also have operation-specific rules. For example:

- `ownKeys` cannot return duplicate keys and must preserve required target keys,
- `getOwnPropertyDescriptor` cannot report impossible descriptors,
- `defineProperty` cannot claim impossible descriptor changes succeeded,
- prototype traps must remain consistent with non-extensible targets,
- extensibility traps must report the target's real extensibility state.

These rules will be explained with their respective trap lessons. The current
lesson's main principle remains the same:

```text
Custom behavior is allowed.
Contradicting a protected target fact is not.
```

## Debugging An Invariant `TypeError`

When a proxy operation unexpectedly throws `TypeError`, inspect it in this
order.

### 1. Identify The Trap

Determine which operation ran:

```text
property read      -> get
property write     -> set
existence check    -> has
property deletion -> deleteProperty
```

### 2. Inspect The Target Descriptor

```js
console.log(Object.getOwnPropertyDescriptor(target, property));
```

Look for:

```text
configurable: false
writable: false
get: undefined
set: undefined
```

### 3. Inspect Target Extensibility

```js
console.log(Object.isExtensible(target));
```

### 4. Compare The Trap Result With The Target Fact

Ask:

```text
What result did the trap return?
What fact exists on the target?
Does this trap's invariant allow those two facts together?
```

### 5. Try Transparent Forwarding

Temporarily replace custom behavior with the matching Reflect operation:

```js
return Reflect.has(target, property);
```

If forwarding works, the custom result was probably contradicting a target
rule.

## Common Mistakes

### Assuming A Trap Can Return Anything

Proxy traps are customizable, but each trap has a contract and invariants.

### Assuming Every Custom Result Violates An Invariant

Virtual values and virtual existence checks are often valid. Only protected
target facts restrict them.

### Treating `configurable: false` And `writable: false` As The Same Rule

They protect different abilities:

```text
configurable: false -> limits deletion and descriptor changes
writable: false     -> limits assignment to a data property's value
```

Some invariants require one attribute; others require both.

### Assuming Non-Extensible Means Frozen

A non-extensible object cannot receive new own properties, but its existing
configurable properties can still be deleted.

### Looking Only At The Proxy

Invariant checks use the target's descriptors and extensibility. Inspect the
target passed to `new Proxy()`.

### Assuming The Trap Never Ran Because The Operation Threw

The trap may have executed before JavaScript rejected its returned result.
Avoid unnecessary side effects before producing an invariant-sensitive result.

### Assuming `Reflect` Is Mandatory

`Reflect` is a safe forwarding default, not a requirement. Custom logic is
valid when it obeys the trap's rules.

### Assuming No Error Means The Trap Was Truthful

Invariants reject specific impossible contradictions. They do not verify every
mutation or every status claim.

## When This Knowledge Matters

Understanding invariants is important when you:

- wrap sealed or frozen objects,
- work with non-configurable properties,
- protect or hide object properties,
- return virtual values or virtual existence results,
- report success from boolean-returning traps,
- combine multiple traps into one proxy,
- debug an unexpected Proxy `TypeError`.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/concepts/invariants/invariants.js
```

Practice file:

```text
src/proxy/concepts/invariants/invariants.js
```

## Related Notes

- [Proxy Basics](../proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../reflect-forwarding/reflect-forwarding.md)
- [Doubt: Do We Have To Use `Reflect` Inside A Proxy Trap?](../reflect-forwarding/doubt/doubt.md)
- [Proxy `get` Trap](../../handlers/get/get.md)
- [Proxy `set` Trap](../../handlers/set/set.md)
- [Proxy `has` Trap](../../handlers/has/has.md)
- [Proxy `deleteProperty` Trap](../../handlers/deleteProperty/deleteProperty.md)
- [Organized Note: Proxy Invariants](../../organized-notes/03-proxy-invariants.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN: `handler.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
- [MDN: `handler.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
- [MDN: `handler.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
- [MDN: `handler.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)
- [ECMAScript: Proxy Object Internal Methods](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots)
