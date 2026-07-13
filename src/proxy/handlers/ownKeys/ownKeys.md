# Proxy `ownKeys` Trap

## What Problem Does It Solve?

JavaScript provides several ways to list an object's own property keys:

```js
Object.keys(object);
Object.getOwnPropertyNames(object);
Object.getOwnPropertySymbols(object);
Reflect.ownKeys(object);
```

Normally, these operations receive the own-key list produced by the object.

Sometimes you want to control that list. For example, you may want to:

- log when code asks for keys,
- hide selected configurable keys from listings,
- return keys in a custom order,
- expose virtual keys,
- forward the normal key list while adding custom behavior.

The Proxy `ownKeys` trap gives you that control.

## Quick Definition

The `ownKeys` trap supplies the proxy's list of own property keys.

```js
const proxy = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});
```

It intercepts the proxy's internal `[[OwnPropertyKeys]]` operation.

The trap returns an object, normally an array, containing unique string or
symbol keys:

```js
ownKeys() {
  return ['name', 'internalId', Symbol.for('token')];
}
```

The trap supplies a candidate key list. The API that requested the list may
apply additional filtering afterward.

## Mental Model

With normal forwarding:

```text
Reflect.ownKeys(proxy)
  -> ownKeys(target)
  -> Reflect.ownKeys(target)
  -> all target own keys
  -> validate the trap result
  -> return the key array
```

With `Object.keys()`:

```text
Object.keys(proxy)
  -> ownKeys(target)
  -> candidate key list
  -> keep string keys
  -> request each key's property descriptor
  -> keep only existing enumerable properties
  -> final Object.keys() result
```

This distinction is central:

```text
ownKeys trap      -> supplies candidate own keys
calling API       -> decides which candidates belong in its final result
```

## Syntax

```js
const proxy = new Proxy(target, {
  ownKeys(target) {
    return keyList;
  },
});
```

The normal forwarding form is:

```js
const proxy = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});
```

## Parameters

The trap receives one parameter.

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |

Example:

```js
const accountTarget = {
  name: 'Asha',
};

const account = new Proxy(accountTarget, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

Reflect.ownKeys(account);
```

When the trap runs, `target` is `accountTarget`.

Unlike `get` and `set`, the `ownKeys` trap does not receive a current property
key. Its job is to produce the whole own-key list.

### Trap `this`

Inside the trap method, `this` refers to the handler object:

```js
const handler = {
  label: 'account handler',

  ownKeys(target) {
    console.log(this.label);

    return Reflect.ownKeys(target);
  },
};
```

`this` is not the target or proxy.

## Return Value

The trap must return an object that can be read like a list.

An array is the clearest and recommended result:

```js
ownKeys() {
  return ['name', 'topic'];
}
```

Every list item must be:

- a string,
- or a symbol.

Every item must also be unique.

```js
const token = Symbol('token');

ownKeys() {
  return ['name', token];
}
```

The specification also accepts an array-like object:

```js
ownKeys() {
  return {
    0: 'name',
    length: 1,
  };
}
```

For normal application code, return an array. It communicates the list shape
more clearly and avoids unnecessary complexity.

## Normal Forwarding With `Reflect.ownKeys()`

`Reflect.ownKeys(target)` returns every own key from the target:

- enumerable string keys,
- non-enumerable string keys,
- symbol keys, whether enumerable or non-enumerable.

It does not return inherited keys.

```js
const tokenKey = Symbol('token');

const accountTarget = {
  name: 'Asha',
  [tokenKey]: 'secret-token',
};

Object.defineProperty(accountTarget, 'internalId', {
  value: 42,
  enumerable: false,
});

const account = new Proxy(accountTarget, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

console.log(Reflect.ownKeys(account));
// [ 'name', 'internalId', Symbol(token) ]
```

The trap intercepts the operation, then `Reflect.ownKeys(target)` preserves the
target's normal key-listing behavior.

## Which Operations Run `ownKeys`?

Several operations request `[[OwnPropertyKeys]]` through the proxy.

Common examples include:

| Operation | What it ultimately keeps |
|---|---|
| `Reflect.ownKeys(proxy)` | All returned string and symbol keys |
| `Object.getOwnPropertyNames(proxy)` | Returned string keys |
| `Object.getOwnPropertySymbols(proxy)` | Returned symbol keys |
| `Object.keys(proxy)` | Existing own enumerable string keys |
| `Object.values(proxy)` | Values of existing own enumerable string keys |
| `Object.entries(proxy)` | Key-value pairs for existing own enumerable string keys |
| `for...in` | Enumerable string keys, including later prototype traversal |

Operations such as object spread, `Object.assign()`, and JSON object
serialization can also request own keys as part of their larger behavior.

These operations do not all return the same result because they process the
candidate list differently.

## How Listing APIs Filter The Same Trap Result

Consider a target with several kinds of own keys:

```js
const tokenKey = Symbol('token');

const target = {
  name: 'Asha',
  [tokenKey]: 'secret',
};

Object.defineProperty(target, 'internalId', {
  value: 42,
  enumerable: false,
});

const proxy = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});
```

The trap returns:

```js
['name', 'internalId', Symbol(token)]
```

Different APIs filter that list:

```js
console.log(Reflect.ownKeys(proxy));
// [ 'name', 'internalId', Symbol(token) ]

console.log(Object.keys(proxy));
// [ 'name' ]

console.log(Object.getOwnPropertyNames(proxy));
// [ 'name', 'internalId' ]

console.log(Object.getOwnPropertySymbols(proxy));
// [ Symbol(token) ]
```

The filtering can be summarized as:

```text
candidate list: name, internalId, Symbol(token)

Reflect.ownKeys()
  -> keep strings and symbols
  -> name, internalId, Symbol(token)

Object.getOwnPropertyNames()
  -> keep strings
  -> name, internalId

Object.getOwnPropertySymbols()
  -> keep symbols
  -> Symbol(token)

Object.keys()
  -> keep existing enumerable strings
  -> name
```

## Why `Object.keys()` May Return Less

`Object.keys()` does more than call `ownKeys`.

After receiving the candidate list, it requests the property descriptor for
each string key. It includes the key only when the descriptor exists and says:

```js
enumerable: true
```

This explains a result that may initially look surprising:

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return ['virtual'];
  },
});

console.log(Reflect.ownKeys(proxy));
// [ 'virtual' ]

console.log(Object.keys(proxy));
// []
```

The `ownKeys` trap successfully supplied `'virtual'`, so `Reflect.ownKeys()`
returns it.

However, the target has no `virtual` property descriptor. `Object.keys()` has
no evidence that the candidate is an existing enumerable property, so it
excludes it.

```text
ownKeys returns 'virtual'
  -> Reflect.ownKeys(): include it
  -> Object.keys(): request descriptor
  -> descriptor is undefined
  -> exclude it
```

## Creating A Virtual Enumerable Key

To make a virtual key appear in `Object.keys()`, the proxy also needs matching
descriptor behavior:

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

The two traps answer different questions:

```text
ownKeys
  -> Which candidate own keys should be reported?

getOwnPropertyDescriptor
  -> What property rules should be reported for this key?
```

The dedicated `getOwnPropertyDescriptor` lesson comes next. For now, remember:

```text
Returning a key from ownKeys is enough for Reflect.ownKeys().
Object.keys() also requires an existing enumerable descriptor.
```

## Supplying A Virtual Value

`Object.values()` and `Object.entries()` continue beyond the descriptor check.
They also read the included property value.

A complete virtual enumerable property can combine three traps:

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
      return 'created by proxy';
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log(Object.keys(proxy));
// [ 'virtual' ]

console.log(Object.values(proxy));
// [ 'created by proxy' ]
```

The pipeline for `Object.values()` is:

```text
ownKeys
  -> return candidate keys

getOwnPropertyDescriptor
  -> keep existing enumerable string keys

get
  -> read each included value
```

## Filtering Configurable Keys

An `ownKeys` trap can remove selected configurable keys from the candidate
list:

```js
const target = {
  name: 'Mina',
  _token: 'secret',
};

const proxy = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target).filter((property) => {
      return !(
        typeof property === 'string' &&
        property.startsWith('_')
      );
    });
  },
});

console.log(Object.keys(proxy));
// [ 'name' ]

console.log(Reflect.ownKeys(proxy));
// [ 'name' ]
```

The `typeof` check prevents calling `startsWith()` on a symbol.

### Filtering Does Not Protect The Value

The trap changes key listing, not property reading:

```js
console.log(proxy._token);
// secret
```

There is no `get` trap blocking the read.

Direct target listing also bypasses the proxy:

```js
console.log(Reflect.ownKeys(target));
// [ 'name', '_token' ]
```

Filtering is an interface customization, not a security boundary.

## Custom Key Order

The trap may return keys in a custom order when the invariants are respected:

```js
const target = {
  first: 1,
  second: 2,
  third: 3,
};

const proxy = new Proxy(target, {
  ownKeys() {
    return ['third', 'first', 'second'];
  },
});

console.log(Reflect.ownKeys(proxy));
// [ 'third', 'first', 'second' ]

console.log(Object.keys(proxy));
// [ 'third', 'first', 'second' ]
```

For an ordinary non-proxy object, own keys normally follow this order:

1. non-negative integer-index strings in ascending numeric order,
2. other strings in creation order,
3. symbols in creation order.

A custom proxy `ownKeys` result may use a different order. The calling API
processes candidates in the returned order after applying its filters.

## Listing Keys Does Not Read Values

`Reflect.ownKeys()` obtains keys. It does not read the corresponding values, so
it does not run getters.

```js
let getterRuns = 0;

const target = {
  get total() {
    getterRuns += 1;

    return 100;
  },
};

const proxy = new Proxy(target, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

console.log(Reflect.ownKeys(proxy));
// [ 'total' ]

console.log(getterRuns);
// 0
```

`Object.keys()` requests descriptors but still does not read values:

```js
console.log(Object.keys(proxy));
// [ 'total' ]

console.log(getterRuns);
// 0
```

`Object.values()` reads each included value, so the getter runs:

```js
console.log(Object.values(proxy));
// [ 100 ]

console.log(getterRuns);
// 1
```

Keep the stages separate:

```text
list keys          -> ownKeys
inspect attributes -> getOwnPropertyDescriptor
read values        -> get
```

## Arrays

Arrays are objects. Their own keys include:

- index keys as strings,
- the non-enumerable `length` property,
- any additional own string or symbol properties.

```js
const items = new Proxy(['first', 'second'], {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

console.log(Reflect.ownKeys(items));
// [ '0', '1', 'length' ]

console.log(Object.keys(items));
// [ '0', '1' ]
```

Both operations begin with the same candidate list. `Object.keys()` excludes
`length` because the array's `length` property is non-enumerable.

Array `length` is also non-configurable. An `ownKeys` trap cannot omit it:

```js
const items = new Proxy([], {
  ownKeys() {
    return [];
  },
});

Reflect.ownKeys(items);
// TypeError
```

The result violates the rule that every non-configurable own key must be
included.

## Proxy Invariants

The `ownKeys` trap has five main result requirements:

1. the result must be an object,
2. every item must be a string or symbol,
3. the list must not contain duplicates,
4. every non-configurable own key of the target must be included,
5. if the target is non-extensible, the result must contain exactly the
   target's own-key set: no missing and no extra keys.

Violating any of these rules causes a `TypeError`.

## Result Must Be An Object

An array is an object, so this is valid:

```js
ownKeys() {
  return ['name'];
}
```

A primitive result is invalid:

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return 'name';
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

Even though a string contains characters and a `length`, the trap itself must
return an object.

## Every Key Must Be A String Or Symbol

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return ['name', 1];
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

The number `1` is invalid. Unlike ordinary property-access syntax, this result
list does not automatically convert numbers into property-key strings.

Write the key as a string:

```js
return ['name', '1'];
```

## Keys Must Be Unique

```js
const proxy = new Proxy({}, {
  ownKeys() {
    return ['name', 'name'];
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

Each string or symbol may appear only once.

Two different symbols with the same description are still different keys:

```js
const first = Symbol('id');
const second = Symbol('id');

console.log(first === second);
// false
```

Returning both symbols does not create a duplicate because their identities
are different.

## Non-Configurable Own Keys Cannot Be Omitted

```js
const target = {};

Object.defineProperty(target, 'id', {
  value: 42,
  configurable: false,
});

const proxy = new Proxy(target, {
  ownKeys() {
    return [];
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

The trap tries to hide `id`, but the target has made that own key
non-configurable.

```text
trap list   -> []
target fact -> non-configurable own key 'id'
result      -> TypeError
```

An extensible target does not remove this rule. Non-configurable own keys must
always appear.

## A Non-Extensible Target Requires The Exact Key Set

When the target is non-extensible, the trap may not add virtual keys or omit
existing own keys.

```js
const target = {
  first: 1,
  second: 2,
};

Object.preventExtensions(target);
```

Adding a virtual key is invalid:

```js
const proxy = new Proxy(target, {
  ownKeys(target) {
    return [...Reflect.ownKeys(target), 'virtual'];
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

Omitting an existing key is also invalid:

```js
const proxy = new Proxy(target, {
  ownKeys() {
    return ['first'];
  },
});

Reflect.ownKeys(proxy);
// TypeError
```

The required relationship is:

```text
trap key set === non-extensible target own-key set
```

### Order May Still Change

The invariant compares which keys are present, not their order:

```js
const proxy = new Proxy(target, {
  ownKeys() {
    return ['second', 'first'];
  },
});

console.log(Reflect.ownKeys(proxy));
// [ 'second', 'first' ]
```

Both target keys are present, there are no extra keys, and the list contains no
duplicates. The reordered result is valid.

## Direct Target Listing Bypasses The Trap

```js
let trapCalls = 0;

const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  ownKeys(target) {
    trapCalls += 1;

    return Reflect.ownKeys(target);
  },
});

Reflect.ownKeys(proxy);
// trap runs

Reflect.ownKeys(target);
// trap does not run

console.log(trapCalls);
// 1
```

Only operations performed through the proxy are intercepted.

## Important Notes

- `ownKeys` intercepts the proxy's `[[OwnPropertyKeys]]` operation.
- It receives the original `target` as its only argument.
- It supplies candidate own keys, not inherited keys.
- Return an array unless an array-like result is specifically needed.
- Every returned item must be a unique string or symbol.
- `Reflect.ownKeys()` exposes the complete validated trap list.
- Other listing APIs apply their own filters afterward.
- `Object.keys()` also checks whether each string key exists and is enumerable.
- `Object.values()` and `Object.entries()` additionally read values.
- Listing keys alone does not run getters.
- Filtering a key does not block reading its value.
- Non-configurable target keys cannot be omitted.
- A non-extensible target requires the exact target own-key set.
- Direct target listing bypasses the proxy.

## Common Mistakes

### Assuming `Object.keys()` Returns The Trap List Directly

`Object.keys()` filters the candidate list using key type and property
descriptors. Use `Reflect.ownKeys()` when you want the complete trap result.

### Returning Values Instead Of Keys

```js
ownKeys(target) {
  return Object.values(target);
}
```

The trap must return property keys, not property values.

Use:

```js
return Reflect.ownKeys(target);
```

### Returning Numbers As Keys

```js
return [0, 1];
```

This is invalid. Return property-key strings:

```js
return ['0', '1'];
```

### Returning Duplicate Keys

Every key must appear only once. Duplicate strings or the same symbol repeated
cause a `TypeError`.

### Filtering Symbols With String Methods

```js
property.startsWith('_');
```

This throws for symbols. Check the key type first.

### Assuming Filtering Protects A Value

Removing a key from listings does not stop `proxy[key]` from reading it. That
requires matching `get` behavior, and raw target access can still bypass the
proxy.

### Omitting Non-Configurable Keys

Every non-configurable own key must remain in the returned list. Array `length`
is a common example.

### Adding Virtual Keys To A Non-Extensible Target

A non-extensible target requires the exact target own-key set. Extra virtual
keys and missing target keys both violate the invariant.

### Expecting A Virtual Key To Appear In `Object.keys()` Automatically

`Object.keys()` needs a suitable enumerable descriptor. Returning a key from
`ownKeys` alone is not enough.

### Forwarding To The Proxy Again

Inside the trap, use:

```js
return Reflect.ownKeys(target);
```

Calling `Reflect.ownKeys(proxy)` from the same proxy's trap re-enters that trap
and can cause infinite recursion.

## When To Use The `ownKeys` Trap

Use it when you need to:

- observe own-key listing operations,
- filter selected configurable keys,
- provide virtual keys,
- customize own-key order,
- preserve normal listing while adding shared behavior.

Do not use it when you only need to:

- read a property value; use `get`,
- check whether one property exists; use `has`,
- inspect a property's attributes; use `getOwnPropertyDescriptor`,
- obtain all keys from an ordinary object without customization; call
  `Reflect.ownKeys()` directly.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/ownKeys/ownKeys.js
```

Practice file:

```text
src/proxy/handlers/ownKeys/ownKeys.js
```

## Related Notes

- [Proxy Basics](../../concepts/proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect.ownKeys()](../../../reflect/methods/static/ownKeys/ownKeys.md)
- [Loop Through An Object](../../../object/loop-through-object/for-loop.md)
- [Organized Note: Property Listing](../../organized-notes/06-property-listing.md)
- [Organized Note: `ownKeys` And Property Descriptors](../../organized-notes/07-ownkeys-and-property-descriptors.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys)
- [MDN: `Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
- [ECMAScript: Proxy `[[OwnPropertyKeys]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys)
