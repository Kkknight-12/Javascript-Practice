# Proxy Protected Properties

## What Problem Does It Solve?

JavaScript code often uses an underscore prefix to mark an internal property:

```js
const user = {
  name: 'Asha',
  _password: 'secret',
};
```

The underscore communicates an intention:

```text
_password is meant for internal use
```

It does not enforce a rule:

```js
console.log(user._password); // secret

user._password = 'changed';
delete user._password;
```

All three operations are still allowed because `_password` is an ordinary
string-keyed property.

A Proxy can place an access-controlled facade in front of such an object. The
facade can reject direct access, hide selected keys from reflective views, and
prevent new protected keys from being defined through the proxy.

The important challenge is that one trap is not enough. Reading, writing,
checking existence, deleting, listing, inspecting descriptors, and defining
descriptors are different internal object operations.

## Quick Definition

A protected-property Proxy combines several traps around one shared key rule.

For this lesson, a protected key is any string beginning with `_`:

```js
function isProtectedProperty(property) {
  return typeof property === 'string' && property.startsWith('_');
}
```

The handler coordinates these traps:

```text
get                      -> reject direct reads
set                      -> reject assignment
has                      -> report absence to in and Reflect.has()
deleteProperty           -> reject deletion
ownKeys                  -> omit keys from listings
getOwnPropertyDescriptor -> report absence to own-property checks
defineProperty           -> reject descriptor definitions
```

Public keys use their matching `Reflect` operations so normal object behavior
continues.

## This Is A Facade, Not Native Privacy

This page uses the word **protected** deliberately.

An underscore key remains an ordinary property on the target. The proxy only
controls operations that pass through the proxy.

```text
operation through proxy -> traps can enforce the policy
operation on target      -> policy is bypassed
```

Native `#private` elements are different. JavaScript itself enforces their
privacy, and they are not ordinary string- or symbol-keyed properties.

Use this mental distinction:

```text
_password + Proxy -> custom access-controlled interface
#password         -> language-enforced private element
```

## Mental Model

The target stores all state:

```text
target
  name: 'Asha'
  _password: 'secret'
```

The proxy presents a selected public view:

```text
proxy
  name: readable, writable, listable
  _password: blocked or reported absent
```

Each operation reaches the trap that matches its internal method:

```text
proxy.name
  -> get
  -> public key
  -> Reflect.get()

proxy._password
  -> get
  -> protected key
  -> throw policy error

'_password' in proxy
  -> has
  -> protected key
  -> false

Reflect.ownKeys(proxy)
  -> ownKeys
  -> filter protected keys
  -> public key list
```

The policy is consistent only when every relevant operation has an intentional
answer.

## Before This Page

This lesson combines behavior from the earlier trap pages:

- [Proxy `get` Trap](../../handlers/get/get.md)
- [Proxy `set` Trap](../../handlers/set/set.md)
- [Proxy `has` Trap](../../handlers/has/has.md)
- [Proxy `deleteProperty` Trap](../../handlers/deleteProperty/deleteProperty.md)
- [Proxy `ownKeys` Trap](../../handlers/ownKeys/ownKeys.md)
- [Proxy `getOwnPropertyDescriptor` Trap](../../handlers/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)
- [Proxy `defineProperty` Trap](../../handlers/defineProperty/defineProperty.md)

The current page focuses on how these traps cooperate. Their individual syntax
and complete invariants remain in their dedicated notes.

## Why One Trap Is Not Enough

Suppose the handler filters underscore keys only in `ownKeys`:

```js
const user = new Proxy(
  {
    name: 'Asha',
    _password: 'secret',
  },
  {
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((property) => {
        return !(
          typeof property === 'string' && property.startsWith('_')
        );
      });
    },
  },
);
```

The listing looks protected:

```js
console.log(Object.keys(user));
// [ 'name' ]
```

But other operations use other internal methods:

```js
console.log(user._password); // secret
console.log('_password' in user); // true
console.log(Object.hasOwn(user, '_password')); // true
```

Why:

| Operation | Internal request | Matching trap | Present? |
|---|---|---|---|
| `Object.keys(user)` | List own keys | `ownKeys` | Yes |
| `user._password` | Read value | `get` | No |
| `'_password' in user` | Check property existence | `has` | No |
| `Object.hasOwn(user, '_password')` | Read own descriptor | `getOwnPropertyDescriptor` | No |

Missing traps use normal target behavior. Therefore, `_password` remains
readable and discoverable.

This is the central lesson:

```text
Hiding a key from one operation does not hide it from every operation.
```

## Define The Policy First

Before writing traps, decide how the public interface should answer each
operation.

This lesson uses the following policy:

| Operation on protected key | Public result |
|---|---|
| Direct read | Throw an error |
| Assignment | Throw an error |
| `in` or `Reflect.has()` | Return `false` |
| Deletion | Throw an error |
| Key listing | Omit the key |
| Own-property or descriptor check | Report `undefined` / absence |
| Descriptor definition | Reject with `false` |

These choices are not the only possible design. Another API could throw for
existence and descriptor checks too. What matters is that the choices are
intentional, understandable, and legal under Proxy invariants.

## Shared Protected-Key Check

Keep the naming rule in one function:

```js
function isProtectedProperty(property) {
  return typeof property === 'string' && property.startsWith('_');
}
```

Why check the type first?

A Proxy trap may receive either:

```text
string key
symbol key
```

Calling `startsWith()` directly on a symbol throws a `TypeError`:

```js
property.startsWith('_');
```

The type guard makes the policy explicit:

```text
underscore-prefixed strings -> protected
symbols                     -> unaffected by this rule
```

Use a shared error helper for operations that should throw:

```js
function denyProtectedOperation(action, property) {
  throw new Error(
    `Cannot ${action} protected property "${String(property)}"`,
  );
}
```

## Complete Coordinated Handler

```js
function createProtectedHandler() {
  return {
    get(target, property, receiver) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('read', property);
      }

      return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('write', property);
      }

      return Reflect.set(target, property, value, receiver);
    },

    has(target, property) {
      if (isProtectedProperty(property)) {
        return false;
      }

      return Reflect.has(target, property);
    },

    deleteProperty(target, property) {
      if (isProtectedProperty(property)) {
        denyProtectedOperation('delete', property);
      }

      return Reflect.deleteProperty(target, property);
    },

    ownKeys(target) {
      return Reflect.ownKeys(target).filter((property) => {
        return !isProtectedProperty(property);
      });
    },

    getOwnPropertyDescriptor(target, property) {
      if (isProtectedProperty(property)) {
        return undefined;
      }

      return Reflect.getOwnPropertyDescriptor(target, property);
    },

    defineProperty(target, property, descriptor) {
      if (isProtectedProperty(property)) {
        return false;
      }

      return Reflect.defineProperty(target, property, descriptor);
    },
  };
}
```

The handler repeats one policy check across several traps because each trap
answers a genuinely different object operation.

## Read, Write, And Delete Traps

These operations reject direct interaction with a protected key:

```js
get(target, property, receiver) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('read', property);
  }

  return Reflect.get(target, property, receiver);
}
```

```js
set(target, property, value, receiver) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('write', property);
  }

  return Reflect.set(target, property, value, receiver);
}
```

```js
deleteProperty(target, property) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('delete', property);
  }

  return Reflect.deleteProperty(target, property);
}
```

Throwing provides the same clear failure in strict and non-strict calling code.

For public properties, the matching Reflect methods preserve ordinary reads,
receiver behavior, assignments, setters, and deletions.

## Existence Trap

The `has` trap controls the `in` operator and `Reflect.has()`:

```js
has(target, property) {
  if (isProtectedProperty(property)) {
    return false;
  }

  return Reflect.has(target, property);
}
```

Therefore:

```js
console.log('_password' in proxy); // false
console.log(Reflect.has(proxy, '_password')); // false
```

This does not remove `_password` from the target. It customizes the existence
answer presented by the proxy.

## Key-Listing Trap

The `ownKeys` trap supplies the candidate list of own string and symbol keys:

```js
ownKeys(target) {
  return Reflect.ownKeys(target).filter((property) => {
    return !isProtectedProperty(property);
  });
}
```

This affects operations such as:

```js
Object.keys(proxy);
Object.getOwnPropertyNames(proxy);
Object.getOwnPropertySymbols(proxy);
Reflect.ownKeys(proxy);
```

It also affects higher-level operations that begin by listing own keys, such
as object spread and `Object.assign()` when the proxy is the source.

The trap filters keys. It does not delete them from the target.

## Own-Descriptor Trap

`Object.hasOwn()` does not use `has`. It checks for an own-property descriptor.

Descriptor inspection also uses the proxy's `[[GetOwnProperty]]` operation:

```js
Object.getOwnPropertyDescriptor(proxy, '_password');
Reflect.getOwnPropertyDescriptor(proxy, '_password');
```

Therefore, the policy needs `getOwnPropertyDescriptor` too:

```js
getOwnPropertyDescriptor(target, property) {
  if (isProtectedProperty(property)) {
    return undefined;
  }

  return Reflect.getOwnPropertyDescriptor(target, property);
}
```

Returning `undefined` reports that the proxy has no own property with that key:

```js
console.log(Object.hasOwn(proxy, '_password')); // false

console.log(
  Object.getOwnPropertyDescriptor(proxy, '_password'),
); // undefined
```

Again, the target property still exists. The proxy reports a selected view.

## Definition Trap

Blocking assignment with `set` does not block descriptor-based definitions:

```js
Object.defineProperty(proxy, '_token', descriptor);
Reflect.defineProperty(proxy, '_token', descriptor);
```

Those operations use `defineProperty`, so the policy needs this trap:

```js
defineProperty(target, property, descriptor) {
  if (isProtectedProperty(property)) {
    return false;
  }

  return Reflect.defineProperty(target, property, descriptor);
}
```

The two caller APIs expose the false status differently:

```js
console.log(
  Reflect.defineProperty(proxy, '_token', {
    value: 'abc',
    configurable: true,
  }),
); // false
```

```js
Object.defineProperty(proxy, '_token', {
  value: 'abc',
  configurable: true,
});
// TypeError
```

`Reflect.defineProperty()` returns the boolean. `Object.defineProperty()`
throws when the proxy reports failure.

## Why Both `set` And `defineProperty` Are Present

These two traps protect different entry points:

```text
proxy._token = 'abc'
  -> starts with set

Object.defineProperty(proxy, '_token', descriptor)
  -> starts with defineProperty
```

There is another connection. A public assignment forwarded with
`Reflect.set(target, property, value, receiver)` may later request
`[[DefineOwnProperty]]` on the proxy receiver. The public key then passes
through `defineProperty` and is forwarded normally.

The policy therefore needs both traps to:

- reject both protected entry points,
- preserve normal public assignment behavior.

## Create A Protected Record

```js
function createProtectedRecord(initialState) {
  const target = {
    ...initialState,
  };

  return new Proxy(target, createProtectedHandler());
}
```

Usage:

```js
const account = createProtectedRecord({
  name: 'Asha',
  role: 'learner',
  _password: 'secret',
});
```

This factory creates a fresh target and returns only the proxy. Callers do not
receive the target reference from the factory.

The spread is suitable for the simple record used in this lesson. It copies
the initial object's own enumerable string and symbol properties as ordinary
properties. It is not a general-purpose clone for objects with prototypes,
non-enumerable properties, or specialized descriptors.

## Public Operations Still Work

```js
console.log(account.name); // Asha

account.role = 'admin';
console.log(account.role); // admin

console.log(delete account.role); // true
console.log('role' in account); // false
```

Public descriptor definition also works:

```js
const result = Reflect.defineProperty(account, 'topic', {
  value: 'Proxy',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(result); // true
console.log(account.topic); // Proxy
```

Every public operation reaches its trap, passes the shared key check, and uses
the matching Reflect method for normal behavior.

## Protected Direct Operations Are Rejected

```js
account._password;
// Error: Cannot read protected property "_password"
```

```js
account._password = 'changed';
// Error: Cannot write protected property "_password"
```

```js
delete account._password;
// Error: Cannot delete protected property "_password"
```

The key still exists on the internal target, but the proxy refuses direct
interaction with it.

## Protected Reflective Views Report Absence

```js
console.log('_password' in account); // false
console.log(Object.hasOwn(account, '_password')); // false
console.log(Object.getOwnPropertyDescriptor(account, '_password'));
// undefined
```

Notice the different traps:

```text
'_password' in account
  -> has

Object.hasOwn(account, '_password')
  -> getOwnPropertyDescriptor

Object.getOwnPropertyDescriptor(account, '_password')
  -> getOwnPropertyDescriptor
```

The public results agree even though the operations reach different traps.

## Listings And Copies Omit Protected Keys

After the public `topic` property is created:

```js
console.log(Object.keys(account));
// [ 'name', 'topic' ]

console.log(Object.getOwnPropertyNames(account));
// [ 'name', 'topic' ]

console.log(Reflect.ownKeys(account));
// [ 'name', 'topic' ]
```

Object spread also omits `_password`:

```js
const copy = {
  ...account,
};

console.log(copy);
// { name: 'Asha', topic: 'Proxy' }
```

The spread pipeline is roughly:

```text
1. ownKeys supplies candidate keys.
2. getOwnPropertyDescriptor checks each candidate.
3. enumerable included values are read through get.
4. values are defined on the new object.
```

Because `_password` is removed at the first stage, later stages never copy it.

## Trap Coverage Map

| Public operation | Trap or traps involved | Protected result |
|---|---|---|
| `proxy._password` | `get` | Throw |
| `proxy._password = value` | `set` | Throw |
| `'_password' in proxy` | `has` | `false` |
| `Reflect.has(proxy, '_password')` | `has` | `false` |
| `delete proxy._password` | `deleteProperty` | Throw |
| `Reflect.ownKeys(proxy)` | `ownKeys` | Key omitted |
| `Object.keys(proxy)` | `ownKeys`, then descriptors | Key omitted |
| `Object.hasOwn(proxy, '_password')` | `getOwnPropertyDescriptor` | `false` |
| `Object.getOwnPropertyDescriptor(...)` | `getOwnPropertyDescriptor` | `undefined` |
| `Object.defineProperty(...)` | `defineProperty` | `TypeError` after false status |
| `Reflect.defineProperty(...)` | `defineProperty` | `false` |
| `{ ...proxy }` | Listing, descriptor, and read operations | Key not copied |

This table is why protected-property behavior is a multi-trap design.

## Symbols Are Not Private Automatically

A symbol avoids accidental string-name collisions:

```js
const internalSymbol = Symbol('internal');

const record = createProtectedRecord({
  name: 'Mina',
  [internalSymbol]: 'symbol value',
});
```

`Object.keys()` omits symbols by its own filtering rules:

```js
console.log(Object.keys(record));
// [ 'name' ]
```

That does not make the symbol private:

```js
console.log(record[internalSymbol]);
// symbol value

console.log(Reflect.ownKeys(record));
// [ 'name', Symbol(internal) ]
```

The current predicate protects underscore-prefixed string keys only. A symbol
would need its own explicit policy, and even then it would still be an ordinary
property key rather than a native private element.

## Methods And `this`

Consider a target method that needs the protected password:

```js
const user = createProtectedRecord({
  _password: 'secret',

  checkPassword(candidate) {
    return candidate === this._password;
  },
});
```

Calling the public method fails:

```js
user.checkPassword('secret');
// Error: Cannot read protected property "_password"
```

Follow the call:

```text
1. user.checkPassword reads a public key through get.
2. The get trap returns the method function.
3. Method-call syntax uses user as this.
4. user is the proxy.
5. this._password is therefore proxy._password.
6. The protected get trap runs and throws.
```

The method belongs to the target, but method-call syntax determines `this` from
the object before the dot at the call site.

## Binding Methods To The Target

One possible workaround is to return methods bound to the target:

```js
const boundMethodCache = new WeakMap();

get(target, property, receiver) {
  if (isProtectedProperty(property)) {
    denyProtectedOperation('read', property);
  }

  const value = Reflect.get(target, property, receiver);

  if (typeof value !== 'function') {
    return value;
  }

  if (!boundMethodCache.has(value)) {
    boundMethodCache.set(value, value.bind(target));
  }

  return boundMethodCache.get(value);
}
```

Now the method runs with:

```text
this === target
```

Its internal read bypasses the proxy and succeeds:

```js
console.log(user.checkPassword('secret')); // true
```

The `WeakMap` cache preserves method identity:

```js
console.log(user.checkPassword === user.checkPassword); // true
```

Without a cache, every `bind()` call creates a new function:

```js
value.bind(target) === value.bind(target); // false
```

## Binding Methods Has A Cost

Binding is not simply a privacy fix. It changes how every property operation
inside the method behaves.

Consider:

```js
rename(nextName) {
  this.name = nextName;
}
```

When `rename` is bound to the target:

```text
this.name = nextName
  -> target.name = nextName
  -> proxy set trap does not run
```

This means target-bound methods can bypass:

- protected-key checks,
- public write validation,
- logging,
- virtual behavior,
- other proxy layers.

Binding every function-valued property may also bind a function that was meant
to remain ordinary data.

Use target binding only when the design intentionally grants methods direct
target access. Alternatives include:

- public methods implemented with closures,
- a separate private state object,
- a `WeakMap` keyed by public objects,
- native private elements for class-based state,
- explicit privileged operations instead of binding every function.

## A Leaked Target Bypasses Every Trap

```js
const target = {
  name: 'Asha',
  _token: 'original',
};

const proxy = new Proxy(target, createProtectedHandler());

target._token = 'changed directly';

console.log(target._token); // changed directly
```

No trap runs because the operation uses `target`, not `proxy`.

The proxy still rejects its own view:

```js
proxy._token;
// Error: Cannot read protected property "_token"
```

If all callers must follow the policy:

- create the target inside a closure or factory,
- return only the proxy,
- avoid methods that return the target,
- avoid callbacks that receive the target,
- avoid mixing target and proxy references.

Keeping the target unreachable is necessary for the facade, but it still does
not turn underscore properties into native private elements.

## Invariant Requirements For Hiding Keys

The policy reports that a real target key is absent from several proxy views.
JavaScript permits that only while the target facts allow it.

For the complete hiding behavior used here, protected own properties must be:

```text
configurable: true
```

and the target must remain:

```text
extensible: true
```

An ordinary object literal initially provides both conditions:

```js
const target = {
  _token: 'secret',
};

console.log(
  Object.getOwnPropertyDescriptor(target, '_token').configurable,
); // true

console.log(Object.isExtensible(target)); // true
```

These conditions allow `ownKeys`, `has`, and `getOwnPropertyDescriptor` to hide
the configurable key without contradicting a protected target fact.

## Non-Configurable Keys Cannot Be Hidden

```js
const target = {};

Object.defineProperty(target, '_token', {
  value: 'locked',
  configurable: false,
});

const proxy = new Proxy(target, createProtectedHandler());
```

These operations throw `TypeError`:

```js
Reflect.ownKeys(proxy);
'_token' in proxy;
Object.getOwnPropertyDescriptor(proxy, '_token');
```

Why each result is invalid:

| Trap | Custom result | Protected target fact |
|---|---|---|
| `ownKeys` | Omits `_token` | Every non-configurable own key must be listed |
| `has` | Returns `false` | A non-configurable own key cannot be reported absent |
| `getOwnPropertyDescriptor` | Returns `undefined` | A non-configurable own key cannot be reported absent |

This is not a failure of `Reflect`. JavaScript rejects the proxy's custom
reports because they contradict the locked target property.

## Non-Extensible Targets Cannot Hide Existing Own Keys

```js
const target = {
  name: 'Asha',
  _token: 'secret',
};

Object.preventExtensions(target);

const proxy = new Proxy(target, createProtectedHandler());
```

The `_token` property is configurable, but the target is now non-extensible.
The proxy can no longer report a different own-key shape.

These operations throw `TypeError`:

```js
Reflect.ownKeys(proxy);
'_token' in proxy;
Object.getOwnPropertyDescriptor(proxy, '_token');
```

For a non-extensible target:

- `ownKeys` must report exactly the target's own key set,
- `has` cannot hide an existing own property,
- `getOwnPropertyDescriptor` cannot hide an existing own property.

## Freezing Or Sealing Changes The Design

`Object.freeze()`, `Object.seal()`, and `Object.preventExtensions()` make target
facts more rigid.

The simple handler in this lesson does not yet control extensibility requests.
Allowing one of these operations to reach the target can make comprehensive key
hiding impossible and may leave later reflective operations throwing
`TypeError`.

A design that must preserve hidden keys should make an explicit decision about
extensibility. The later `preventExtensions` and `isExtensible` trap lessons
cover those operations in detail.

Do not solve this by ignoring invariants. A proxy cannot legally hide locked
facts just because the application prefers them hidden.

## Why Throw For Some Operations But Report Absence For Others?

The current policy uses two kinds of response.

Direct interaction throws:

```text
read
write
delete
```

Reflective discovery reports absence:

```text
in
Object.hasOwn()
descriptor inspection
key listing
```

This produces a public interface where protected keys are not discoverable and
cannot be directly manipulated.

It is a policy choice, not a JavaScript requirement. A different API could
throw for all protected operations. The invariant rules still determine which
absence reports are legal.

## Native Private Elements

Modern classes can use `#` private elements:

```js
class SecureAccount {
  #password = 'secret';

  checkPassword(candidate) {
    return candidate === this.#password;
  }
}

const account = new SecureAccount();

console.log(account.checkPassword('secret')); // true
console.log(Reflect.ownKeys(account)); // []
```

`#password` is not an ordinary property with a string or symbol key.

Therefore:

- outside code cannot legally write `account.#password`,
- Object and Reflect methods cannot enumerate it,
- Proxy property traps do not intercept it as a normal property key,
- JavaScript itself enforces access from the declaring class body.

Wrapping class instances that use private elements introduces a separate
`this` and private-brand issue. That topic belongs to the dedicated private
class field Proxy lesson. The key point here is simply that native private
elements and underscore-key facades are different mechanisms.

## Choosing The Right Mechanism

Use an underscore convention alone when:

- the goal is communication among developers,
- accidental access is the main concern,
- enforcement is unnecessary.

Use a Proxy protected-property facade when:

- many dynamic property operations need one shared policy,
- you need to observe or customize reflective behavior,
- the target can remain controlled and extensible,
- the tradeoffs are acceptable.

Use closures, `WeakMap`, or native private elements when:

- data must not be an ordinary discoverable target property,
- direct target access cannot be trusted,
- language-enforced or structurally hidden state is the real goal.

## Important Notes

- An underscore prefix is a convention, not native privacy.
- A Proxy can create an access-controlled facade around ordinary properties.
- One trap does not cover every way to interact with a property.
- This policy combines seven property-related traps.
- Public operations forward through matching Reflect methods.
- `has` controls `in`; it does not control `Object.hasOwn()`.
- `getOwnPropertyDescriptor` controls own-property and descriptor reports.
- `ownKeys` controls candidate key listings but not direct access.
- `defineProperty` is needed because descriptor definitions do not begin with
  `set`.
- Symbols are not protected by an underscore-string predicate.
- Target-bound methods bypass proxy traps during their internal operations.
- Direct target references bypass the complete policy.
- Hidden target properties must remain compatible with Proxy invariants.
- Non-configurable properties cannot be hidden from required reflective views.
- Existing own properties cannot be hidden after the target becomes
  non-extensible.
- Native private elements are not ordinary properties and provide a different
  kind of privacy.

## Common Mistakes

### Treating `_name` As Native Privacy

```js
const object = {
  _name: 'Asha',
};

console.log(object._name); // Asha
```

The underscore alone changes no JavaScript behavior.

### Using Only `ownKeys`

Filtering a listing does not block:

```js
proxy._password;
'_password' in proxy;
Object.hasOwn(proxy, '_password');
```

Each operation needs the matching policy trap.

### Using `has` For `Object.hasOwn()`

`has` controls `in` and `Reflect.has()`.

`Object.hasOwn()` uses an own-descriptor check, so the relevant trap is
`getOwnPropertyDescriptor`.

### Blocking `set` But Forgetting `defineProperty`

```js
proxy._token = 'abc';
```

and:

```js
Object.defineProperty(proxy, '_token', {
  value: 'abc',
});
```

begin with different internal methods. Protect both entry points.

### Calling String Methods On Symbols

This is unsafe:

```js
property.startsWith('_');
```

Use:

```js
typeof property === 'string' && property.startsWith('_');
```

### Assuming Symbols Are Private

Symbols are omitted by `Object.keys()`, but they can be discovered through:

```js
Reflect.ownKeys(object);
Object.getOwnPropertySymbols(object);
```

### Binding Every Method Without Considering `this`

Binding to the target grants the method direct target access. Its reads and
writes bypass proxy traps.

### Returning A New Bound Function Every Time

```js
return value.bind(target);
```

This can make repeated reads return different function objects. Cache bound
methods when stable identity matters.

### Leaking The Target

Anyone holding the target can bypass every trap. Return only the proxy when the
facade must be followed.

### Hiding Non-Configurable Keys

Filtering or reporting absence for a non-configurable own key violates Proxy
invariants and throws `TypeError`.

### Making The Target Non-Extensible

Once the target is non-extensible, it cannot present a different existing
own-key set through the proxy.

### Calling The Proxy Policy Security

The facade can prevent accidental or ordinary API access when all operations
go through it. It is not equivalent to language-enforced private state.

## When To Use It

Use this pattern when you need:

- one dynamic policy across many property names,
- a public object view that omits internal configurable keys,
- controlled reads, writes, deletions, and descriptor changes,
- consistent behavior across direct and reflective property operations,
- a teaching or application-level facade whose target remains private.

Avoid this pattern when:

- an underscore naming convention is sufficient,
- native private fields or closures express the design more directly,
- the target must be frozen, sealed, or exposed,
- methods need normal receiver behavior that binding would disrupt,
- a simple class API or validation function would be clearer.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/concepts/protected-properties/protected-properties.js
```

The practice file contains the complete coordinated handler, commented
examples, readable terminal labels, and expected output comments:

```text
src/proxy/concepts/protected-properties/protected-properties.js
```

## Related Notes

- [Proxy Basics](../proxy-basics/proxy-basics.md)
- [Proxy Invariants](../invariants/invariants.md)
- [Reflect Forwarding](../reflect-forwarding/reflect-forwarding.md)
- [Proxy `get` Trap](../../handlers/get/get.md)
- [Proxy `set` Trap](../../handlers/set/set.md)
- [Proxy `has` Trap](../../handlers/has/has.md)
- [Proxy `deleteProperty` Trap](../../handlers/deleteProperty/deleteProperty.md)
- [Proxy `ownKeys` Trap](../../handlers/ownKeys/ownKeys.md)
- [Proxy `getOwnPropertyDescriptor` Trap](../../handlers/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)
- [Proxy `defineProperty` Trap](../../handlers/defineProperty/defineProperty.md)
- [Object.hasOwn()](../../../object/methods/static-methods/hasOwn/hasOwn.md)
- [Organized Note: Protected Properties](../../organized-notes/08-protected-properties.md)
- [Organized Note: Private Class Fields](../../organized-notes/15-private-class-fields.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN: `handler.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
- [MDN: `handler.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
- [MDN: `handler.has()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
- [MDN: `handler.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)
- [MDN: `handler.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys)
- [MDN: `handler.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor)
- [MDN: `handler.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty)
- [MDN: Private elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements)
- [ECMAScript: Proxy object internal methods](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots)
