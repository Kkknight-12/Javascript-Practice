# Proxy `defineProperty` Trap

## What Problem Does It Solve?

`Object.defineProperty()` can create or change one own property with a property
descriptor:

```js
const profile = {};

Object.defineProperty(profile, 'name', {
  value: 'Asha',
  writable: true,
  enumerable: true,
  configurable: true,
});
```

Normally, JavaScript applies the descriptor directly to the object.

When code works through a proxy, you may want to observe or control that
request. For example, you may need to:

- log which properties are defined,
- reject protected property names,
- validate a requested descriptor,
- add or change descriptor flags,
- coordinate descriptor changes with the proxy's other behavior,
- preserve normal definition behavior while adding shared logic.

The Proxy `defineProperty` trap gives you that control.

## Quick Definition

The `defineProperty` trap intercepts requests to create or reconfigure an own
property through a proxy.

```js
const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});
```

It handles the proxy's internal `[[DefineOwnProperty]]` operation.

The trap receives:

```text
target     -> original wrapped object
property   -> string or symbol key being defined
descriptor -> requested property descriptor
```

It returns a truthy or falsy value as its declared success status.

## Mental Model

A normal forwarding definition follows this path:

```text
Object.defineProperty(proxy, 'name', descriptor)
  -> defineProperty(target, 'name', descriptor)
  -> custom validation, logging, or transformation
  -> Reflect.defineProperty(target, 'name', descriptor)
  -> target property is defined if normal rules allow it
  -> trap returns true or false
  -> JavaScript checks Proxy invariants
  -> caller receives success or failure behavior
```

Keep these three jobs separate:

```text
intercept the request  -> defineProperty trap runs
perform the definition -> Reflect.defineProperty() or custom logic
report the status      -> return a truthy or falsy value
```

The trap running does not define a property by itself. Its return value also
does not perform the definition.

## Before This Page

This page focuses on Proxy interception. For the full introduction to data
descriptors, accessor descriptors, descriptor defaults, and property flags,
see:

[Object.defineProperty()](../../../object/methods/static-methods/defineProperty/defineProperty.md)

## Syntax

```js
const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return trueOrFalse;
  },
});
```

Normal forwarding uses:

```js
const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});
```

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol key being defined or modified |
| `descriptor` | An object containing the requested descriptor fields |

Consider this operation:

```js
const profileTarget = {};

const profile = new Proxy(profileTarget, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(profile, 'name', {
  value: 'Asha',
  enumerable: true,
});
```

The trap receives:

| Parameter | Value |
|---|---|
| `target` | `profileTarget` |
| `property` | `'name'` |
| `descriptor` | `{ value: 'Asha', enumerable: true }` |

### `target`

`target` is the object passed as the first argument to `new Proxy()`:

```js
const target = {};
const proxy = new Proxy(target, handler);
```

A forwarding trap normally defines the property on this object:

```js
return Reflect.defineProperty(target, property, descriptor);
```

### `property`

The property key is always a string or symbol by the time the trap receives it:

```js
Reflect.defineProperty(proxy, 'name', descriptor);
// property is 'name'

Reflect.defineProperty(proxy, 0, descriptor);
// property is '0', a string

Reflect.defineProperty(proxy, secretKey, descriptor);
// property is secretKey, a symbol
```

Numeric property keys become strings. Symbol keys remain symbols.

### `descriptor`

`descriptor` describes the requested own property definition.

A data descriptor may contain:

```js
{
  value: 'Asha',
  writable: true,
  enumerable: true,
  configurable: true,
}
```

An accessor descriptor may contain:

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

The trap receives a new descriptor object containing only recognized fields
that were present in the request:

```text
value
writable
get
set
enumerable
configurable
```

Custom fields do not reach the trap.

### Trap `this`

Inside the trap method, `this` refers to the handler object:

```js
const handler = {
  label: 'profile handler',

  defineProperty(target, property, descriptor) {
    console.log(this.label);

    return Reflect.defineProperty(target, property, descriptor);
  },
};
```

`this` is not the target or proxy.

## Return Value

The trap's result is converted to a boolean:

```text
truthy result -> declare that the definition succeeded
falsy result  -> declare that the definition failed
```

Explicit booleans are easiest to understand:

```js
return true;
return false;
```

This boolean is a reported status. It is not an instruction that creates,
changes, restores, or removes a property.

When the trap returns a truthy value, JavaScript also checks that the reported
success does not violate the proxy's invariants.

## Normal Forwarding With `Reflect.defineProperty()`

Use `Reflect.defineProperty()` when the proxy should preserve normal property
definition behavior.

```js
const definitionLog = [];
const profileTarget = {};

const profile = new Proxy(profileTarget, {
  defineProperty(target, property, descriptor) {
    definitionLog.push(property);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(profile, 'name', {
  value: 'Asha',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(profileTarget.name); // Asha
console.log(definitionLog); // [ 'name' ]
```

What happened:

1. The operation was requested through `profile`, so the trap ran.
2. The trap recorded the key.
3. `Reflect.defineProperty()` performed the normal definition on
   `profileTarget`.
4. `Reflect.defineProperty()` returned `true`.
5. The trap returned that same status.

The usual forwarding pattern is:

```js
defineProperty(target, property, descriptor) {
  // Run custom work first when needed.

  return Reflect.defineProperty(target, property, descriptor);
}
```

## Is `Reflect.defineProperty()` Required?

No. A trap may use custom logic and return its own status.

```js
const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    if (property === '_token') {
      return false;
    }

    return Reflect.defineProperty(target, property, descriptor);
  },
});
```

The trap can:

- reject a request,
- transform the descriptor,
- define a property somewhere intentionally chosen by the design,
- perform other custom work,
- return a status produced by that logic.

`Reflect.defineProperty()` is recommended for normal forwarding because it
performs the matching internal operation and returns the boolean the trap
needs. Custom behavior is still valid when it follows JavaScript's invariants.

## `Object.defineProperty()` Versus `Reflect.defineProperty()`

Both methods can trigger the trap. Their failure behavior differs.

Consider a trap that rejects every request:

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty() {
    return false;
  },
});
```

### `Reflect.defineProperty()` Exposes `false`

```js
const result = Reflect.defineProperty(proxy, 'role', {
  value: 'admin',
  configurable: true,
});

console.log(result); // false
console.log(Object.hasOwn(target, 'role')); // false
```

This is useful when the caller wants to branch on success:

```js
if (Reflect.defineProperty(proxy, 'role', descriptor)) {
  console.log('Property defined');
} else {
  console.log('Property rejected');
}
```

### `Object.defineProperty()` Throws For `false`

```js
Object.defineProperty(proxy, 'role', {
  value: 'admin',
  configurable: true,
});
// TypeError
```

`Object.defineProperty()` returns the object on success. If the internal
definition status is false, it throws a `TypeError` instead of returning
`false`.

Comparison:

| Operation | Successful result | Falsy trap status |
|---|---|---|
| `Object.defineProperty(proxy, key, descriptor)` | Returns `proxy` | Throws `TypeError` |
| `Reflect.defineProperty(proxy, key, descriptor)` | Returns `true` | Returns `false` |

## Performing And Reporting Are Separate Jobs

The trap controls code that runs before its `return`. The return value reports
the trap's declared status.

These are related jobs in well-designed code, but JavaScript does not make one
automatically perform the other.

### Returning `true` Without Defining

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty() {
    return true;
  },
});

Object.defineProperty(proxy, 'topic', {
  value: 'Proxy',
  configurable: true,
});

console.log(Object.hasOwn(target, 'topic')); // false
```

The flow was:

```text
trap ran
-> no definition operation was performed
-> trap returned true
-> caller accepted the declared success
-> target still had no topic property
```

The requested descriptor is configurable and the target is extensible, so this
particular lie does not contradict a protected target fact. That does not make
the behavior useful. It leaves callers believing work happened when it did not.

### Returning `false` After Defining

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    Reflect.defineProperty(target, property, descriptor);

    return false;
  },
});

const result = Reflect.defineProperty(proxy, 'level', {
  value: 2,
  configurable: true,
});

console.log(result); // false
console.log(target.level); // 2
```

The definition happened before `return false` ran. Returning `false` did not
undo it.

Use these examples to remember the mechanism, not as implementation patterns.
In ordinary code, perform the intended operation and report the status that
matches it:

```js
return Reflect.defineProperty(target, property, descriptor);
```

## The Descriptor Request Is Not Yet A Completed Property

Suppose the caller provides only `value`:

```js
Object.defineProperty(proxy, 'score', {
  value: 42,
});
```

The trap receives:

```js
{
  value: 42,
}
```

It does not receive this completed shape:

```js
{
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false,
}
```

The omitted flags remain absent while the trap examines the request.

If the trap forwards the descriptor and a new property is created, normal
property-definition rules give the omitted flags their default value of
`false`:

```js
const descriptor = Object.getOwnPropertyDescriptor(target, 'score');

console.log(descriptor);
// {
//   value: 42,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

This distinction matters when validating descriptors:

```text
descriptor.enumerable === undefined
```

inside the trap means the caller omitted the field. It does not mean the trap
received `enumerable: false` explicitly.

## Custom Descriptor Fields Are Ignored

Only standard descriptor fields survive conversion into the descriptor passed
to the trap:

```js
let receivedKeys;

const proxy = new Proxy({}, {
  defineProperty(target, property, descriptor) {
    receivedKeys = Object.keys(descriptor);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'score', {
  value: 42,
  note: 'custom metadata',
});

console.log(receivedKeys); // [ 'value' ]
```

`note` is not a standard descriptor field, so it is ignored before the trap
receives the descriptor.

Do not use extra descriptor fields to pass custom metadata into this trap. Use
another data structure, a closure, or an explicit API for that information.

## Data And Accessor Descriptors

The same descriptor categories used by `Object.defineProperty()` reach the
trap.

### Data Descriptor

```js
Reflect.defineProperty(proxy, 'score', {
  value: 42,
  writable: true,
  enumerable: true,
  configurable: true,
});
```

Data descriptor fields are:

```text
value
writable
enumerable
configurable
```

### Accessor Descriptor

```js
Object.defineProperty(proxy, 'total', {
  get() {
    return 100;
  },
  enumerable: true,
  configurable: true,
});
```

Accessor descriptor fields are:

```text
get
set
enumerable
configurable
```

A descriptor cannot mix `value` or `writable` with `get` or `set`.

## Defining An Accessor Does Not Run Its Getter

Defining an accessor stores the getter function. It does not read the property.

```js
let getterRuns = 0;
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'total', {
  get() {
    getterRuns += 1;

    return 100;
  },
  configurable: true,
});

console.log(getterRuns); // 0
console.log(proxy.total); // 100
console.log(getterRuns); // 1
```

The `defineProperty` trap handled the descriptor definition. Reading
`proxy.total` later caused the getter to run.

## Which Operations Run The Trap?

The trap runs when an operation requests the proxy's `[[DefineOwnProperty]]`
internal method.

### Direct Definition Operations

These operations directly request property definition:

```js
Object.defineProperty(proxy, 'name', descriptor);
Reflect.defineProperty(proxy, 'name', descriptor);
Object.defineProperties(proxy, descriptorMap);
```

`Object.defineProperties()` may run the trap multiple times because it defines
each property separately.

### `Object.defineProperties()` Runs Once Per Property

```js
const calls = [];
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    calls.push(property);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperties(proxy, {
  title: {
    value: 'JavaScript',
    enumerable: true,
    configurable: true,
  },
  level: {
    value: 'beginner',
    enumerable: true,
    configurable: true,
  },
});

console.log(calls); // [ 'title', 'level' ]
```

The descriptor map contains two enumerable keys, so the method requests two
definitions and the trap runs twice.

## Why Assignment Can Run Both `set` And `defineProperty`

Direct descriptor definition and ordinary assignment begin with different
internal operations:

```text
Object.defineProperty(proxy, key, descriptor)
  -> [[DefineOwnProperty]]
  -> defineProperty trap

proxy[key] = value
  -> [[Set]]
  -> set trap
```

However, normal set behavior may need to create or update an own property on
the assignment's receiver. If that receiver is the proxy, the receiver's
`[[DefineOwnProperty]]` operation can run the `defineProperty` trap too.

```js
const calls = [];
const target = {};

const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    calls.push(`set:${String(property)}`);

    return Reflect.set(target, property, value, receiver);
  },

  defineProperty(target, property, descriptor) {
    calls.push(`defineProperty:${String(property)}`);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

proxy.level = 2;

console.log(calls);
// [ 'set:level', 'defineProperty:level' ]
```

Follow the steps:

```text
1. proxy.level = 2 requests [[Set]].
2. The set trap runs.
3. Reflect.set(target, 'level', 2, receiver) performs normal set behavior.
4. receiver is the proxy.
5. Normal set behavior needs an own level property on receiver.
6. Defining that own property requests receiver.[[DefineOwnProperty]].
7. receiver is the proxy, so the defineProperty trap runs.
8. Reflect.defineProperty() defines level on the target.
```

This does not mean every assignment must run both traps.

- A custom `set` trap may handle the request without forwarding.
- A setter may handle the assignment without creating a data property.
- Different receiver choices can change where the property is defined.
- Direct writes to the target bypass the proxy traps.

The safe rule is:

```text
Assignment begins with set.
Normal set behavior can later request defineProperty on the receiver.
```

By contrast, this direct operation runs `defineProperty` without first running
`set`:

```js
Object.defineProperty(proxy, 'level', {
  value: 2,
});
```

## Defining Is Different From Setting

Setting asks JavaScript to perform ordinary assignment behavior:

```js
proxy.status = 'ready';
```

That behavior can search the prototype chain and invoke an inherited setter.

Defining asks JavaScript to create or reconfigure one own property directly:

```js
Object.defineProperty(proxy, 'status', {
  value: 'ready',
});
```

It does not invoke an inherited setter merely because one has the same key.

The traps therefore answer different requests:

| Trap | Main request |
|---|---|
| `set` | Perform assignment behavior |
| `defineProperty` | Define or reconfigure an own property descriptor |

Assignment can connect the two operations internally, but that does not make
the traps interchangeable.

## Validating A Definition

A trap can reject definitions that violate an application rule:

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    if (typeof property === 'string' && property.startsWith('_')) {
      return false;
    }

    return Reflect.defineProperty(target, property, descriptor);
  },
});

console.log(
  Reflect.defineProperty(proxy, '_token', {
    value: 'abc',
    configurable: true,
  }),
); // false

console.log(Object.hasOwn(target, '_token')); // false
```

The trap checks the key before performing the operation. It returns `false`
for the protected name, so `Reflect.defineProperty()` exposes the rejection.

Remember that this policy only controls requests made through the proxy.
Someone with direct access to `target` can still define the property there.

## Transforming A Descriptor

A trap may create a new descriptor before forwarding:

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    const publicDescriptor = {
      ...descriptor,
      enumerable: true,
      configurable: true,
    };

    return Reflect.defineProperty(target, property, publicDescriptor);
  },
});

Reflect.defineProperty(proxy, 'topic', {
  value: 'Proxy',
  writable: true,
});

console.log(Object.getOwnPropertyDescriptor(target, 'topic'));
// {
//   value: 'Proxy',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

The caller omitted `enumerable` and `configurable`. The trap explicitly added
both before forwarding.

When transforming descriptors:

- keep data and accessor descriptor fields separate,
- preserve fields your policy does not intend to change,
- return the result of the actual definition,
- make sure the result remains compatible with protected target properties.

## String, Numeric, And Symbol Keys

The trap supports both property-key types used by JavaScript: strings and
symbols.

```js
const secretKey = Symbol('secret');
const keyLog = [];

const proxy = new Proxy({}, {
  defineProperty(target, property, descriptor) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Reflect.defineProperty(proxy, 0, {
  value: 'first',
  configurable: true,
});

Reflect.defineProperty(proxy, secretKey, {
  value: 'hidden',
  configurable: true,
});

console.log(keyLog);
// [ '0:string', 'Symbol(secret):symbol' ]
```

Do not assume every key supports string-only operations such as
`property.startsWith('_')`. Check its type first.

## Proxy Invariants

The trap may customize behavior, but a truthy result cannot contradict certain
facts about the target.

The high-level order is:

```text
trap runs
-> trap result is converted to boolean
-> false ends with a failed status
-> true causes JavaScript to inspect the target
-> an impossible success claim throws TypeError
```

The target inspection happens after the trap runs. This detail matters because
a forwarding trap may legitimately change the target before returning `true`.

### A Missing Property Cannot Be Added To A Non-Extensible Target

```js
const target = {};
Object.preventExtensions(target);

const proxy = new Proxy(target, {
  defineProperty() {
    return true;
  },
});

Object.defineProperty(proxy, 'newKey', {
  value: 1,
  configurable: true,
});
// TypeError
```

Why:

```text
target is non-extensible
target does not own newKey
trap reports success
target still does not own newKey
-> impossible addition claim
-> TypeError
```

A correct forwarding trap returns the real result:

```js
defineProperty(target, property, descriptor) {
  return Reflect.defineProperty(target, property, descriptor);
}
```

For this non-extensible target, `Reflect.defineProperty()` returns `false`, so
the trap does not make an impossible truthy claim.

### A Trap Cannot Invent A Non-Configurable Property

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty() {
    return true;
  },
});

Object.defineProperty(proxy, 'id', {
  value: 42,
  configurable: false,
});
// TypeError
```

The request explicitly says the new property should be non-configurable, but
the trap did not define anything. The target therefore has no matching
non-configurable own property.

JavaScript does not allow a proxy to claim that a new permanent target fact
exists when it does not.

### Correct Forwarding Can Create A Non-Configurable Property

The previous rule does not mean a proxy can never define a non-configurable
property.

```js
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'id', {
  value: 42,
  configurable: false,
});

console.log(Object.getOwnPropertyDescriptor(target, 'id').configurable);
// false
```

Here the trap performs the definition first. When JavaScript checks the target
afterward, the target really has the matching non-configurable property.

Use this distinction:

```text
Invalid: trap only claims that the property became non-configurable.
Valid:   trap performs the change, then reports the real successful status.
```

The same idea applies when an existing configurable target property is
requested to become non-configurable. A truthy trap result is valid only if the
target really has the matching non-configurable state after the trap.

### Existing Protected Descriptors Must Remain Compatible

Suppose the target has a non-configurable, non-writable property:

```js
const target = {};

Object.defineProperty(target, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});
```

This trap cannot claim that an incompatible value change succeeded:

```js
const proxy = new Proxy(target, {
  defineProperty() {
    return true;
  },
});

Object.defineProperty(proxy, 'version', {
  value: '2.0',
});
// TypeError
```

For a non-configurable property, protected descriptor facts include:

- `configurable` cannot become `true`,
- `enumerable` cannot change,
- a data property cannot become an accessor property or vice versa,
- `get` and `set` cannot be replaced,
- `writable: false` cannot become `true`,
- the value of a non-writable data property cannot change to a different
  value.

If an ordinary definition on the target would be incompatible with its current
descriptor, the proxy cannot claim that the same descriptor request succeeded.

### A Writable-To-Read-Only Report Must Be Real

There is an additional Proxy check for a target data property that is:

```text
configurable: false
writable: true
```

An ordinary object allows `writable` to change from `true` to `false`. A proxy
trap may also allow that transition, but it cannot merely claim it happened.

```js
const target = {};

Object.defineProperty(target, 'score', {
  value: 10,
  writable: true,
  configurable: false,
});

const proxy = new Proxy(target, {
  defineProperty() {
    return true;
  },
});

Object.defineProperty(proxy, 'score', {
  writable: false,
});
// TypeError
```

The target still says `writable: true`, so the trap's truthy report is rejected.

Correct forwarding performs the transition:

```js
const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(proxy, 'score', {
  writable: false,
});

console.log(Object.getOwnPropertyDescriptor(target, 'score').writable);
// false
```

When JavaScript checks after the trap, the target is really non-writable, so
the success report is valid.

## Which Operations Do Not Directly Run This Trap?

These operations request different internal methods:

| Operation | Matching trap |
|---|---|
| `proxy.name` | `get` |
| `proxy.name = 'Asha'` | Starts with `set`; may later reach `defineProperty` |
| `'name' in proxy` | `has` |
| `delete proxy.name` | `deleteProperty` |
| `Reflect.ownKeys(proxy)` | `ownKeys` |
| `Object.getOwnPropertyDescriptor(proxy, 'name')` | `getOwnPropertyDescriptor` |

Reading a property, checking existence, deleting a property, listing keys, and
reading a descriptor do not directly request `[[DefineOwnProperty]]`.

Assignment is the special case discussed earlier: it starts with `set`, and
normal set behavior may later define an own property on the receiver.

## Direct Target Definitions Bypass The Trap

The proxy only observes operations performed through the proxy:

```js
const calls = [];
const target = {};

const proxy = new Proxy(target, {
  defineProperty(target, property, descriptor) {
    calls.push(property);

    return Reflect.defineProperty(target, property, descriptor);
  },
});

Object.defineProperty(target, 'direct', {
  value: true,
  configurable: true,
});

console.log(calls); // []

Reflect.defineProperty(proxy, 'throughProxy', {
  value: true,
  configurable: true,
});

console.log(calls); // [ 'throughProxy' ]
```

Code that retains direct access to `target` can bypass validation, logging, and
transformation implemented by the proxy.

## Important Notes

- `defineProperty` intercepts the proxy's `[[DefineOwnProperty]]` operation.
- The parameters are `target`, `property`, and `descriptor`.
- `property` is always a string or symbol.
- Only standard descriptor fields reach the trap.
- Omitted descriptor fields remain absent while the trap examines the request.
- Defining a new property later gives omitted flags their normal default of
  `false`.
- The trap result is converted to a boolean.
- Returning `true` does not perform a definition by itself.
- Returning `false` does not undo work already performed by the trap.
- `Reflect.defineProperty()` is the normal forwarding method.
- `Object.defineProperty()` throws for a false status, while
  `Reflect.defineProperty()` returns the boolean.
- `Object.defineProperties()` can run the trap once for each property.
- Assignment begins with `set` but can indirectly reach `defineProperty` on
  the receiver.
- A truthy result is checked against the target's extensibility and protected
  descriptors.
- Direct target operations bypass the proxy.

## Common Mistakes

### Returning `true` Without Performing The Definition

```js
defineProperty() {
  return true;
}
```

This reports success but usually leaves the target unchanged.

### Performing The Definition And Returning `false`

```js
defineProperty(target, property, descriptor) {
  Reflect.defineProperty(target, property, descriptor);

  return false;
}
```

The property may be changed even though the caller receives failure.

### Forgetting To Return A Result

```js
defineProperty(target, property, descriptor) {
  Reflect.defineProperty(target, property, descriptor);
}
```

The function implicitly returns `undefined`, which becomes `false`.

Write:

```js
return Reflect.defineProperty(target, property, descriptor);
```

### Forwarding To The Proxy Again

Inside the trap, forward to `target`:

```js
return Reflect.defineProperty(target, property, descriptor);
```

Calling `Reflect.defineProperty(proxy, ...)` from that same proxy's trap can
re-enter the trap repeatedly.

### Assuming Omitted Fields Already Equal `false`

Inside the trap, an omitted field is absent:

```js
Object.hasOwn(descriptor, 'enumerable'); // false
descriptor.enumerable; // undefined
```

Its `false` default is applied if normal definition creates a completed
property descriptor.

### Trying To Read Custom Descriptor Metadata

```js
Object.defineProperty(proxy, 'score', {
  value: 42,
  note: 'important',
});
```

`note` is ignored and does not reach the trap.

### Mixing Data And Accessor Fields During Transformation

This transformed descriptor is invalid:

```js
{
  value: 42,
  get() {
    return 42;
  },
}
```

Keep data fields and accessor fields separate.

### Assuming Every Assignment Runs Both Traps

Assignment starts with `set`. It reaches `defineProperty` only when the later
set behavior requests an own-property definition on the proxy receiver.

### Confusing The Trap Result With The Object Method Result

The trap returns a boolean-like status. `Object.defineProperty()` returns the
object on success, not the trap's literal boolean.

### Ignoring Symbol Keys

Check the key type before using string methods:

```js
if (typeof property === 'string' && property.startsWith('_')) {
  return false;
}
```

### Reporting Impossible Success

A truthy result may throw a `TypeError` if it contradicts the target's
extensibility or protected property descriptors.

## When To Use The Trap

Use `defineProperty` when you need to:

- observe property-definition requests,
- reject definitions according to a shared policy,
- validate descriptor changes,
- transform descriptor flags,
- coordinate own-property creation with other proxy traps,
- preserve normal descriptor behavior while adding logging or validation.

Do not use it when you only need to:

- intercept ordinary value reads; use `get`,
- intercept assignment requests; use `set`,
- inspect a descriptor; use `getOwnPropertyDescriptor`,
- list own keys; use `ownKeys`,
- define one property on an ordinary object without proxy behavior; call
  `Object.defineProperty()` or `Reflect.defineProperty()` directly.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/defineProperty/defineProperty.js
```

The practice file contains commented examples, readable terminal labels, and
expected output comments:

```text
src/proxy/handlers/defineProperty/defineProperty.js
```

## Related Notes

- [Object.defineProperty()](../../../object/methods/static-methods/defineProperty/defineProperty.md)
- [Proxy `getOwnPropertyDescriptor` Trap](../getOwnPropertyDescriptor/getOwnPropertyDescriptor.md)
- [Proxy `set` Trap](../set/set.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Internal Methods And Proxy Traps](../../organized-notes/02-internal-methods-and-proxy-traps.md)
- [Proxy And Reflect Together](../../organized-notes/12-proxy-and-reflect-together.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty)
- [MDN: `Reflect.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty)
- [ECMAScript: Proxy `[[DefineOwnProperty]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc)
