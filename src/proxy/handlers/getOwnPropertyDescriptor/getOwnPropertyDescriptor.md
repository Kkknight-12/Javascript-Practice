# Proxy `getOwnPropertyDescriptor` Trap

## What Problem Does It Solve?

A property descriptor describes one own property:

```js
const profile = {
  name: 'Asha',
};

console.log(Object.getOwnPropertyDescriptor(profile, 'name'));
// {
//   value: 'Asha',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

Normally, JavaScript obtains this information directly from the object.

Sometimes a proxy needs to customize what descriptor-sensitive operations see.
For example, it may need to:

- log descriptor inspections,
- report a configurable property as hidden,
- change the reported enumerability of a configurable property,
- report a virtual own property,
- coordinate virtual keys with `ownKeys` and `get`,
- preserve normal behavior while observing descriptor requests.

The Proxy `getOwnPropertyDescriptor` trap gives you that control.

## Quick Definition

The `getOwnPropertyDescriptor` trap reports whether a key is an own property of
the proxy and, when it is, how that property is configured.

```js
const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});
```

It intercepts the proxy's internal `[[GetOwnProperty]]` operation.

The trap must return either:

- a property descriptor object,
- or `undefined`.

```text
descriptor object -> report this key as an own property
undefined         -> report that this key is not an own property
```

The reported descriptor is metadata. It does not automatically create a stored
property or control an ordinary property read.

## Mental Model

With normal forwarding:

```text
Object.getOwnPropertyDescriptor(proxy, 'name')
  -> getOwnPropertyDescriptor(target, 'name')
  -> Reflect.getOwnPropertyDescriptor(target, 'name')
  -> target descriptor or undefined
  -> JavaScript validates the reported result
  -> caller receives a normalized descriptor or undefined
```

Keep three questions separate:

```text
Does the proxy report the key as its own property?
  -> getOwnPropertyDescriptor result

Which flags and metadata are reported?
  -> returned descriptor fields

What does proxy[key] return?
  -> get behavior
```

These answers can differ when the proxy intentionally customizes them.

## Before This Page

This page focuses on Proxy interception. For the full introduction to data and
accessor descriptors, see:

[Object.getOwnPropertyDescriptor()](../../../object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)

The essential descriptor shapes are reviewed below.

## Syntax

```js
const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return descriptorOrUndefined;
  },
});
```

Normal forwarding uses:

```js
const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});
```

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol property key being inspected |

Consider this operation:

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
```

The trap receives:

| Parameter | Value |
|---|---|
| `target` | The original `target` object |
| `property` | `'name'` |

### `property`

The key is always a string or symbol by the time the trap receives it:

```js
Object.getOwnPropertyDescriptor(proxy, 'name');
// property is 'name'

Object.getOwnPropertyDescriptor(proxy, 0);
// property is '0', a string

Object.getOwnPropertyDescriptor(proxy, secretKey);
// property is secretKey, a symbol
```

### Trap `this`

Inside the trap method, `this` refers to the handler object:

```js
const handler = {
  label: 'descriptor handler',

  getOwnPropertyDescriptor(target, property) {
    console.log(this.label);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
};
```

`this` is not the target or proxy.

## Return Value

The trap must return:

```text
an object  -> reported own property descriptor
undefined  -> reported absence of an own property
```

Returning another primitive is invalid:

```js
const proxy = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return 42;
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// TypeError
```

`null` is also invalid because it is not a descriptor object.

## Descriptor Shapes

### Data Descriptor

A data property stores a value:

```js
{
  value: 'Asha',
  writable: true,
  enumerable: true,
  configurable: true,
}
```

### Accessor Descriptor

An accessor property uses a getter and/or setter:

```js
{
  get() {
    return 42;
  },
  set: undefined,
  enumerable: true,
  configurable: true,
}
```

The shared fields are:

```text
enumerable
configurable
```

A descriptor cannot mix data fields (`value`, `writable`) with accessor fields
(`get`, `set`).

## Normal Forwarding With `Reflect.getOwnPropertyDescriptor()`

```js
const target = {
  name: 'Asha',
};

Object.defineProperty(target, 'internalId', {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: true,
});

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, 'name'));
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

console.log(Reflect.getOwnPropertyDescriptor(proxy, 'internalId'));
// { value: 42, writable: false, enumerable: false, configurable: true }
```

The trap intercepts each request. `Reflect.getOwnPropertyDescriptor()` then
performs the target's normal own-descriptor lookup.

## Own Properties Only

Normal descriptor lookup does not search the prototype chain:

```js
const sharedProfile = {
  role: 'learner',
};

const target = Object.create(sharedProfile);
target.name = 'Mina';

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, 'role'));
// undefined

console.log('role' in proxy);
// true
```

`role` exists in the prototype chain, but it is not an own property of the
target.

## Reading A Descriptor Does Not Run A Getter

The trap reports accessor metadata. It does not call the getter simply by
reading its descriptor.

```js
let getterRuns = 0;

const target = {
  get total() {
    getterRuns += 1;

    return 100;
  },
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

const descriptor = Object.getOwnPropertyDescriptor(proxy, 'total');

console.log(typeof descriptor.get);
// function

console.log(getterRuns);
// 0

console.log(proxy.total);
// 100

console.log(getterRuns);
// 1
```

Reading `descriptor.get` obtains the getter function. Reading `proxy.total`
executes it.

## Which Operations Run The Trap?

Direct descriptor methods trigger it:

```js
Object.getOwnPropertyDescriptor(proxy, property);
Reflect.getOwnPropertyDescriptor(proxy, property);
```

Other operations also need own-property descriptors:

| Operation | Why it needs a descriptor |
|---|---|
| `Object.hasOwn(proxy, key)` | Checks whether an own descriptor exists |
| `propertyIsEnumerable.call(proxy, key)` | Checks existence and `enumerable` |
| `Object.keys(proxy)` | Filters candidate keys by existence and `enumerable` |
| `Object.values(proxy)` | Filters keys before reading values |
| `Object.entries(proxy)` | Filters keys before creating key-value pairs |
| `Object.getOwnPropertyDescriptors(proxy)` | Requests a descriptor for each own key |

`for...in`, object spread, and `Object.assign()` may also inspect descriptors as
part of their larger key-processing behavior.

## The `ownKeys` And Descriptor Pipeline

The previous lesson established that `Object.keys()` uses more than one
internal operation:

```text
Object.keys(proxy)
  -> ownKeys trap returns candidate keys
  -> getOwnPropertyDescriptor trap runs for each string candidate
  -> keep descriptors with enumerable: true
  -> final key array
```

Example:

```js
const operationLog = [];

const target = {
  visible: 'yes',
};

Object.defineProperty(target, 'hidden', {
  value: 'no',
  enumerable: false,
  configurable: true,
});

const proxy = new Proxy(target, {
  ownKeys(target) {
    operationLog.push('ownKeys');

    return Reflect.ownKeys(target);
  },

  getOwnPropertyDescriptor(target, property) {
    operationLog.push(`descriptor:${String(property)}`);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.keys(proxy));
// [ 'visible' ]

console.log(operationLog);
// [ 'ownKeys', 'descriptor:visible', 'descriptor:hidden' ]
```

`hidden` was a candidate key, but its descriptor reported
`enumerable: false`, so `Object.keys()` excluded it.

## Reporting Custom Metadata

For a configurable target property, the trap has broad freedom to report a
different configurable descriptor:

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    if (property === 'name') {
      return {
        value: 'reported value',
        writable: false,
        enumerable: false,
        configurable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, 'name'));
// {
//   value: 'reported value',
//   writable: false,
//   enumerable: false,
//   configurable: true
// }
```

This is reported metadata. It does not modify the target:

```js
console.log(proxy.name);
// Asha

console.log(Object.keys(proxy));
// []

console.log(Object.getOwnPropertyDescriptor(target, 'name'));
// { value: 'Asha', writable: true, enumerable: true, configurable: true }
```

Three observations differ:

```text
descriptor value reported by trap -> 'reported value'
ordinary value read               -> 'Asha'
actual target descriptor          -> unchanged
```

## Hiding A Configurable Property

Returning `undefined` reports that the proxy does not own the key:

```js
const target = {
  _token: 'secret',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    if (property === '_token') {
      return undefined;
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, '_token'));
// undefined

console.log(Object.hasOwn(proxy, '_token'));
// false
```

This is allowed because `_token` is configurable and the target is extensible.

The actual property and ordinary read remain:

```js
console.log(proxy._token);
// secret

console.log(Object.hasOwn(target, '_token'));
// true
```

The trap controls descriptor reporting. It does not delete the property or
block `get` behavior.

## Reporting A Virtual Own Property

An extensible target can support a virtual configurable descriptor:

```js
const target = {};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    if (property === 'virtual') {
      return {
        value: 'reported only',
        writable: true,
        enumerable: true,
        configurable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.hasOwn(proxy, 'virtual'));
// true

console.log(Object.getOwnPropertyDescriptor(proxy, 'virtual').value);
// reported only
```

The reported descriptor does not create storage or ordinary read behavior:

```js
console.log(proxy.virtual);
// undefined

console.log(Reflect.ownKeys(target));
// []
```

Think of the trap result as a report made for `[[GetOwnProperty]]`, not as a
property-definition operation.

## Why The Virtual Key Is Not Automatically Listed

`Object.keys()` starts with `ownKeys`. If `ownKeys` does not return the virtual
key, the descriptor trap is never asked about that key during listing.

```text
Object.hasOwn(proxy, 'virtual')
  -> asks directly for the virtual descriptor
  -> true

Object.keys(proxy)
  -> ownKeys does not include virtual
  -> descriptor is never requested for virtual
  -> []
```

To list the virtual key, combine the traps:

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return ['virtual'];
  },

  getOwnPropertyDescriptor(target, property) {
    if (property === 'virtual') {
      return {
        configurable: true,
        enumerable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

console.log(Object.keys(proxy));
// [ 'virtual' ]
```

## A Complete Virtual Enumerable Property

Add `get` when value-reading operations should also work:

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return ['virtual'];
  },

  getOwnPropertyDescriptor(target, property) {
    if (property === 'virtual') {
      return {
        configurable: true,
        enumerable: true,
      };
    }

    return Reflect.getOwnPropertyDescriptor(target, property);
  },

  get(target, property, receiver) {
    if (property === 'virtual') {
      return 'complete virtual value';
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log(Object.keys(proxy));
// [ 'virtual' ]

console.log(Object.values(proxy));
// [ 'complete virtual value' ]
```

Each trap contributes one part:

```text
ownKeys                  -> report the key in listings
getOwnPropertyDescriptor -> report it as enumerable and configurable
get                      -> provide the value when read
```

## Missing Fields Are Normalized

The trap may return a partial descriptor:

```js
const proxy = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

console.log(Object.getOwnPropertyDescriptor(proxy, 'anything'));
// {
//   value: undefined,
//   writable: false,
//   enumerable: true,
//   configurable: true
// }
```

Because no `get` or `set` field appears, JavaScript treats this as a data
descriptor. Missing data fields receive defaults:

```text
value    -> undefined
writable -> false
```

Missing `enumerable` and `configurable` fields also default to `false` when
they are omitted.

Be explicit when the flags matter. Accidentally omitting `configurable: true`
for a virtual property can violate an invariant.

## String, Numeric, And Symbol Keys

```js
const secretKey = Symbol('secret');
const keyLog = [];

const target = {
  0: 'zero',
  [secretKey]: 'hidden',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(proxy, 0);
Object.getOwnPropertyDescriptor(proxy, secretKey);

console.log(keyLog);
// [ '0:string', 'Symbol(secret):symbol' ]
```

Numeric keys become strings. Symbols remain symbols.

## Proxy Invariants

The trap cannot report arbitrary descriptors. Its result must remain compatible
with protected target facts.

The main rules are:

1. return an object or `undefined`,
2. do not hide a non-configurable own property,
3. do not hide any own property on a non-extensible target,
4. do not report a new own property on a non-extensible target,
5. do not report a property as non-configurable unless the target has a
   corresponding non-configurable own property,
6. do not report a property as both non-configurable and non-writable unless
   the target has the corresponding locked state,
7. keep the reported descriptor compatible with any protected target
   descriptor.

Violating a rule causes a `TypeError`.

## Result Type Invariant

```js
const proxy = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return 42;
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// TypeError
```

Only a descriptor object or `undefined` is valid.

## A Non-Configurable Own Property Cannot Be Hidden

```js
const target = {};

Object.defineProperty(target, 'id', {
  value: 42,
  configurable: false,
});

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor() {
    return undefined;
  },
});

Object.getOwnPropertyDescriptor(proxy, 'id');
// TypeError
```

The trap reports absence, but the target has a non-configurable own property.

## A Non-Extensible Target Cannot Hide An Own Property

```js
const target = {
  name: 'Asha',
};

Object.preventExtensions(target);

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor() {
    return undefined;
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// TypeError
```

`name` is configurable, but the non-extensible target still owns it. Returning
`undefined` contradicts that fixed own-key fact.

Compare this with the extensible case:

```text
configurable own property + extensible target
  -> may be reported as undefined

configurable own property + non-extensible target
  -> cannot be reported as undefined
```

## A Non-Extensible Target Cannot Gain A Virtual Descriptor

```js
const target = {};
Object.preventExtensions(target);

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor() {
    return {
      value: 'virtual',
      configurable: true,
    };
  },
});

Object.getOwnPropertyDescriptor(proxy, 'virtual');
// TypeError
```

The target cannot receive new own properties, so the trap cannot report a new
virtual own descriptor for it.

## A Virtual Descriptor Must Be Configurable

```js
const proxy = new Proxy({}, {
  getOwnPropertyDescriptor() {
    return {
      value: 'virtual',
      configurable: false,
    };
  },
});

Object.getOwnPropertyDescriptor(proxy, 'virtual');
// TypeError
```

The target has no matching non-configurable own property. The trap cannot
invent a permanent non-configurable property only in its report.

The same rule prevents a trap from reporting a configurable target property as
non-configurable.

## Protected Descriptors Must Remain Compatible

```js
const target = {};

Object.defineProperty(target, 'score', {
  value: 10,
  writable: false,
  enumerable: true,
  configurable: false,
});

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor() {
    return {
      value: 20,
      writable: false,
      enumerable: true,
      configurable: false,
    };
  },
});

Object.getOwnPropertyDescriptor(proxy, 'score');
// TypeError
```

The target's value is permanently locked at `10`. Reporting `20` contradicts
that protected descriptor.

For a non-configurable target property, protected compatibility includes:

- the same `configurable` state,
- the same `enumerable` state,
- the same data-versus-accessor kind,
- compatible getter and setter identities,
- compatible writable state,
- a compatible value according to the target's writability.

Normal forwarding is the safest default for protected descriptors:

```js
return Reflect.getOwnPropertyDescriptor(target, property);
```

## Descriptor Reports Are Copies

The descriptor object returned to the caller is metadata, not a live reference
to the target property.

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

const descriptor = Object.getOwnPropertyDescriptor(proxy, 'name');
descriptor.value = 'Mina';

console.log(target.name);
// Asha
```

Use `Object.defineProperty()` or `Reflect.defineProperty()` when the real
property should be changed.

## Operations That Do Not Run This Trap

An ordinary property read uses `get`:

```js
proxy.name;
```

An existence check through the prototype chain uses `has`:

```js
'name' in proxy;
```

A descriptor lookup asks the own-property metadata question:

```js
Object.getOwnPropertyDescriptor(proxy, 'name');
```

These are different internal operations even though they concern the same key.

## Direct Target Inspection Bypasses The Trap

```js
let trapCalls = 0;

const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    trapCalls += 1;

    return Reflect.getOwnPropertyDescriptor(target, property);
  },
});

Object.getOwnPropertyDescriptor(proxy, 'name');
// trap runs

Object.getOwnPropertyDescriptor(target, 'name');
// trap does not run

console.log(trapCalls);
// 1
```

Only descriptor operations requested through the proxy are intercepted.

## Important Notes

- The trap intercepts `[[GetOwnProperty]]`.
- It receives `target` and a string or symbol `property` key.
- It returns a descriptor object or `undefined`.
- Returning a descriptor reports the key as an own property.
- Returning `undefined` reports that the key is not an own property.
- The trap does not search the prototype chain unless custom code does so.
- Reading a descriptor does not run its getter.
- Missing descriptor fields receive default values during normalization.
- A reported descriptor does not create storage or control ordinary reads.
- `Object.hasOwn()` and `propertyIsEnumerable()` can trigger the trap.
- `Object.keys()` combines `ownKeys` with descriptor checks.
- Virtual enumerable values may require `ownKeys`, descriptor, and `get` traps.
- Protected target descriptors limit custom results.
- Direct target inspection bypasses the proxy.

## Common Mistakes

### Returning `false` For A Missing Descriptor

```js
getOwnPropertyDescriptor() {
  return false;
}
```

This is invalid. Return `undefined` to report absence.

### Returning A Property Value Instead Of A Descriptor

```js
getOwnPropertyDescriptor(target, property) {
  return target[property];
}
```

The result must describe the property, not return its value. Use:

```js
return Reflect.getOwnPropertyDescriptor(target, property);
```

### Mixing Data And Accessor Fields

```js
return {
  value: 10,
  get() {
    return 10;
  },
};
```

A descriptor cannot be both a data descriptor and an accessor descriptor.

### Assuming A Reported Value Changes Property Reads

The descriptor's `value` field is metadata for descriptor-sensitive
operations. Ordinary `proxy[property]` reading uses `get` behavior.

### Assuming A Virtual Descriptor Creates A Property

The trap reports metadata. It does not store a property on the target.

### Expecting `Object.keys()` To Discover A Virtual Key Automatically

`Object.keys()` begins with the `ownKeys` result. Include the virtual key there
before its descriptor can be considered.

### Forgetting `configurable: true` For A Virtual Property

Omitted fields default to `false`. A missing target property cannot be reported
as non-configurable.

### Hiding A Protected Target Property

Returning `undefined` cannot hide a non-configurable own property or an own
property on a non-extensible target.

### Forwarding To The Proxy Again

Inside the trap, use the target:

```js
return Reflect.getOwnPropertyDescriptor(target, property);
```

Calling the Reflect method on the same proxy can re-enter the trap repeatedly.

## When To Use The Trap

Use `getOwnPropertyDescriptor` when you need to:

- observe descriptor inspections,
- customize reported enumerability for configurable properties,
- report or hide configurable own properties,
- support virtual own properties,
- coordinate descriptor behavior with `ownKeys`,
- preserve normal behavior while adding shared logic.

Do not use it when you only need to:

- read a property value; use `get`,
- check the whole prototype chain; use `has`,
- provide the candidate key list; use `ownKeys`,
- change a real descriptor; use `defineProperty`,
- inspect one ordinary target without customization; call
  `Object.getOwnPropertyDescriptor()` or
  `Reflect.getOwnPropertyDescriptor()` directly.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js
```

Practice file:

```text
src/proxy/handlers/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js
```

## Related Notes

- [Object.getOwnPropertyDescriptor()](../../../object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)
- [Proxy `ownKeys` Trap](../ownKeys/ownKeys.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Organized Note: `ownKeys` And Property Descriptors](../../organized-notes/07-ownkeys-and-property-descriptors.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor)
- [MDN: `Reflect.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor)
- [ECMAScript: Proxy `[[GetOwnProperty]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-getownproperty-p)
