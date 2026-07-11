# Proxy `set` Trap

## What Problem Does It Solve?

A normal property assignment writes a value without giving your code a central
place to inspect the change.

```js
const progress = {
  score: 10,
};

progress.score = -1;

console.log(progress.score);
// -1
```

Sometimes you want to run custom logic whenever a property is written.

For example, you may want to:

- validate a proposed value,
- reject an invalid assignment,
- record which properties changed,
- normalize a value before storing it,
- control where an inherited write is placed,
- observe writes performed by array methods.

The Proxy `set` trap gives you that control.

## Quick Definition

The `set` trap intercepts property writes performed through a proxy.

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});
```

A `set` trap is responsible for two separate outcomes:

1. deciding whether and how the write should happen,
2. returning a truthy or falsy value as its declared success status.

JavaScript does not generally inspect the target afterward to verify that the
declared status matches the mutation. `Reflect.set()` is the normal forwarding
choice because it connects the two jobs: it performs the underlying operation
and returns that operation's result.

## Mental Model

A property assignment through a proxy follows this path:

```text
proxy.score = 42
  -> set(target, 'score', 42, receiver)
  -> custom validation or logging
  -> Reflect.set(target, 'score', 42, receiver)
  -> true or false
```

Keep three jobs separate:

```text
intercept the write -> set trap runs
perform the write   -> Reflect.set() or other write logic
declare the status  -> return a truthy or falsy value
```

Running the trap does not automatically store the value. Returning `true` also
does not automatically store it, and returning `false` does not undo a write
that the trap already performed.

## Syntax

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    // Return a truthy or falsy result.
  },
});
```

The parameter names are conventions. JavaScript passes the arguments by
position:

```js
const proxy = new Proxy(target, {
  set(t, key, nextValue, r) {
    return Reflect.set(t, key, nextValue, r);
  },
});
```

The full names make the roles easier to recognize while learning.

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol property key being written |
| `value` | The new value being assigned |
| `receiver` | The object through which the write started |

Consider this assignment:

```js
const progressTarget = {
  score: 10,
};

let progress;

progress = new Proxy(progressTarget, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

progress.score = 42;
```

The trap receives:

| Parameter | Value |
|---|---|
| `target` | `progressTarget` |
| `property` | `'score'` |
| `value` | `42` |
| `receiver` | `progress`, the proxy through which the write started |

### `target`

`target` is the object passed as the first argument to `new Proxy()`.

The underlying assignment begins with the target's property rules.

### `property`

`property` identifies the key being written.

It is either:

- a string,
- or a symbol.

```js
proxy.name = 'Mina';
// property is 'name'

proxy[0] = 'first';
// property is '0', a string

proxy[someSymbol] = 'hidden';
// property is someSymbol
```

### `value`

`value` is the proposed new value.

It can be any JavaScript value:

```js
proxy.count = 10;
proxy.ready = true;
proxy.settings = {};
proxy.items = [];
```

The trap can inspect or transform this value before deciding whether to
forward it.

### `receiver`

`receiver` is the object through which the write began.

For a direct assignment such as `proxy.score = 42`, receiver is usually the
proxy.

If another object inherits from the proxy, that inheriting object can be the
receiver:

```js
const child = Object.create(proxy);

child.score = 42;
```

Passing receiver to `Reflect.set()` preserves normal setter and inheritance
behavior.

## Return Value

The `set` trap must return a declared success status.

```text
truthy result -> declare success
falsy result  -> declare failure
```

This status is not an automatic record of whether stored data changed.
JavaScript normally trusts the trap's returned status unless a Proxy invariant
detects an impossible claim.

JavaScript coerces the trap's result to a boolean, but returning explicit
booleans is clearer:

```js
return true;
return false;
```

All four combinations are possible in custom trap code:

| Stored data changed? | Trap result | What JavaScript receives |
|---:|---:|---|
| No | `true` | A success claim without a mutation |
| No | `false` | A failure claim without a mutation |
| Yes | `true` | A success claim after a mutation |
| Yes | `false` | A failure claim after a mutation |

The trap author is responsible for keeping the operation and its declared
status consistent.

The common forwarding form is:

```js
return Reflect.set(target, property, value, receiver);
```

`Reflect.set()` returns the boolean status produced by the target's internal
set operation. During normal forwarding, `true` means that operation completed
according to the target's property rules and `false` means it could not
complete. It still does not promise that an observable data property changed;
for example, a setter may intentionally store the value somewhere else or not
store it at all.

A proxy can customize that status. Therefore, a `true` result is only a
declared success signal, not independent proof that some trap actually changed
stored data. The later pretend-write example demonstrates this difference.

The same line can be expanded to show both jobs:

```js
const writeResult = Reflect.set(
  target,
  property,
  value,
  receiver,
);

return writeResult;
```

`Reflect.set()` performs the underlying operation. `return writeResult` passes
that operation's declared result back to JavaScript.

### Trap Result Versus Assignment Expression Result

The trap's boolean is used internally as its declared success or failure
status.

It is not the value produced by an assignment expression:

```js
const target = {};

const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

const assignmentResult = (proxy.score = 42);

console.log(assignmentResult);
// 42
```

The trap returns `true` internally, but the expression `proxy.score = 42`
evaluates to the assigned value, `42`.

### Failure And Strict Mode

`Reflect.set()` exposes the boolean result directly:

```js
const proxy = new Proxy({}, {
  set() {
    return false;
  },
});

console.log(Reflect.set(proxy, 'value', 10));
// false
```

A normal assignment in non-strict code may fail silently when the trap returns
false.

In strict mode, the failed assignment throws a `TypeError`:

```js
'use strict';

proxy.value = 10;
// TypeError
```

This is why forgetting the return value is dangerous. A trap with no return
statement returns `undefined`, which is falsy.

## Which Operations Trigger `set`?

The `set` trap handles operations that assign a property value through the
proxy.

| Operation | What reaches the trap |
|---|---|
| `proxy.name = 'Mina'` | `'name'`, `'Mina'` |
| `proxy[key] = value` | The value of `key`, then `value` |
| `proxy[0] = 10` | `'0'`, `10` |
| `proxy[symbol] = value` | The symbol key, then `value` |
| `Reflect.set(proxy, 'name', 'Mina')` | `'name'`, `'Mina'` |
| `Object.assign(proxy, source)` | One trap call for each assigned source property |
| `proxyArray.push(value)` | Index and `length` writes |

Array methods can trigger `set` because their work eventually uses normal
property assignments.

## Normal Forwarding With `Reflect.set()`

Use `Reflect.set()` when you want to add custom behavior and then perform the
normal assignment.

```js
const writeLog = [];

const profileTarget = {
  name: 'Asha',
};

const profile = new Proxy(profileTarget, {
  set(target, property, value, receiver) {
    writeLog.push(`${String(property)}=${String(value)}`);

    return Reflect.set(target, property, value, receiver);
  },
});

profile.name = 'Mina';
profile.topic = 'Proxy';

console.log(profileTarget);
// { name: 'Mina', topic: 'Proxy' }

console.log(writeLog);
// [ 'name=Mina', 'topic=Proxy' ]
```

The trap performs custom logging first:

```js
writeLog.push(`${String(property)}=${String(value)}`);
```

Then it forwards the assignment:

```js
return Reflect.set(target, property, value, receiver);
```

That call both performs the normal write and returns its success result.

## Validating A Property

Validation should happen before the write is forwarded.

```js
const progressTarget = {
  score: 10,
};

const progress = new Proxy(progressTarget, {
  set(target, property, value, receiver) {
    if (property === 'score') {
      const validScore = Number.isInteger(value) && value >= 0;

      if (!validScore) {
        throw new TypeError('score must be a non-negative integer');
      }
    }

    return Reflect.set(target, property, value, receiver);
  },
});
```

A valid assignment is forwarded:

```js
progress.score = 42;

console.log(progressTarget.score);
// 42
```

An invalid assignment throws before `Reflect.set()` runs:

```js
progress.score = -1;
// TypeError: score must be a non-negative integer
```

The target keeps its previous value because the write was never performed.

Throwing a clear validation error is often easier to diagnose than returning
`false`, especially when the caller needs to know why the value was rejected.

## Declaring Success Does Not Perform The Write

This trap declares success but does not store anything:

```js
const target = {
  count: 1,
};

const proxy = new Proxy(target, {
  set() {
    return true;
  },
});

console.log(Reflect.set(proxy, 'count', 2));
// true

console.log(target.count);
// 1
```

The steps were:

```text
Reflect.set(proxy, 'count', 2)
  -> set trap runs
  -> trap returns true
  -> JavaScript receives a success declaration
  -> no code performed the write
```

This example separates the two responsibilities:

```text
return true          -> only declares success
Reflect.set(...)     -> performs the normal write and produces its result
```

For a normal accepted write, use:

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});
```

Now the underlying write and the returned status come from the same operation.

## Returning `false`

A trap can intentionally reject a write by doing no mutation and returning
`false`:

```js
const target = {
  count: 1,
};

const proxy = new Proxy(target, {
  set() {
    return false;
  },
});

console.log(Reflect.set(proxy, 'count', 2));
// false

console.log(target.count);
// 1
```

The value stays unchanged because the trap did not perform or forward the
write. It did not stay unchanged merely because the trap returned `false`.

The trap can perform the write first and still return `false`:

```js
const target = {
  count: 1,
};

const proxy = new Proxy(target, {
  set(target, property, value) {
    target[property] = value;

    return false;
  },
});

console.log(Reflect.set(proxy, 'count', 2));
// false

console.log(target.count);
// 2
```

The mutation happened, but the trap declared failure. `Reflect.set()` returns
that declared status; it does not inspect `target.count` afterward and replace
the result with `true`.

In strict assignment syntax, the same falsy trap result becomes an error:

```js
try {
  (function strictAssignment() {
    'use strict';

    proxy.count = 3;
  })();
} catch (error) {
  console.log(error.name);
  // TypeError
}

console.log(target.count);
// 3
```

The trap changed `target.count` before returning `false`. Strict mode then
converted the declared failure into a `TypeError`; it did not roll back the
mutation.

A complete conditional trap keeps rejection and accepted forwarding clear:

```js
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    if (property === 'count' && value < 0) {
      return false;
    }

    return Reflect.set(target, property, value, receiver);
  },
});
```

Here an invalid value is rejected without a write. An accepted value is passed
to `Reflect.set()`, which performs the normal write and produces the returned
status.

## String, Numeric, And Symbol Keys

Like the `get` trap, `set` receives property keys as strings or symbols.

```js
const secretKey = Symbol('secret');
const keyLog = [];

const proxy = new Proxy({}, {
  set(target, property, value, receiver) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.set(target, property, value, receiver);
  },
});

proxy[0] = 'zero';
proxy[secretKey] = 'hidden';

console.log(keyLog);
// [ '0:string', 'Symbol(secret):symbol' ]
```

The numeric index `0` arrives as the string key `'0'`. The symbol remains a
symbol.

Use `String(property)` when a key must be converted into safe log text.

## Array Methods Can Trigger `set`

An array is an object, so its property writes can be intercepted.

```js
const writeLog = [];

const numbers = new Proxy([], {
  set(target, property, value, receiver) {
    writeLog.push(`${String(property)}=${String(value)}`);

    if (property !== 'length' && typeof value !== 'number') {
      throw new TypeError('Only numbers are allowed');
    }

    return Reflect.set(target, property, value, receiver);
  },
});

numbers.push(10);
numbers.push(20);

console.log(numbers);
// [ 10, 20 ]

console.log(writeLog);
// [ '0=10', 'length=1', '1=20', 'length=2' ]
```

For the first `push(10)`, the important writes are conceptually:

```text
numbers[0] = 10
numbers.length = 1
```

For `push(20)`:

```text
numbers[1] = 20
numbers.length = 2
```

The validation ignores `length` because array methods must update it with a
number as part of normal array behavior.

An invalid pushed value is rejected before the index write is forwarded:

```js
numbers.push('invalid');
// TypeError: Only numbers are allowed
```

## Inheriting Object As `receiver`

The receiver becomes visible when another object inherits from the proxy.

```js
const settingsTarget = {
  theme: 'light',
};

const settingsProxy = new Proxy(settingsTarget, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

const teamSettings = Object.create(settingsProxy);

teamSettings.theme = 'dark';
```

The write begins from `teamSettings`, so the trap receives:

```text
target   = settingsTarget
property = 'theme'
value    = 'dark'
receiver = teamSettings
```

`Reflect.set()` uses the target's property descriptor to determine whether the
write is allowed. Because `theme` is writable and receiver differs from target,
the new own value is placed on `teamSettings`.

```js
console.log(settingsTarget.theme);
// light

console.log(teamSettings.theme);
// dark

console.log(Object.hasOwn(teamSettings, 'theme'));
// true
```

The receiver did not replace the target. The target supplied the property
rules, while the receiver received the resulting own property.

## Locked-Property Invariants

A `set` trap cannot report that certain incompatible writes succeeded.

### Locked Data Property

Consider an own property that is both non-writable and non-configurable:

```js
const target = {};

Object.defineProperty(target, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});
```

This proxy dishonestly declares success for a different value:

```js
const proxy = new Proxy(target, {
  set() {
    return true;
  },
});

Reflect.set(proxy, 'version', '2.0');
// TypeError
```

JavaScript compares the proposed value with the locked target descriptor. The
trap returned a truthy result for an impossible change, so JavaScript throws a `TypeError`.

### Locked Accessor Without A Setter

The same restriction applies to a non-configurable own accessor property that
has no setter:

```js
const target = {};

Object.defineProperty(target, 'id', {
  get() {
    return 42;
  },
  set: undefined,
  configurable: false,
});
```

This property can be read through its getter, but it cannot accept a new value
because it has no setter. It also cannot be reconfigured because
`configurable` is `false`.

If a trap returns `true`, it declares that the assignment succeeded:

```js
const dishonestProxy = new Proxy(target, {
  set() {
    return true;
  },
});

Reflect.set(dishonestProxy, 'id', 100);
// TypeError
```

The assignment reaches the `set` trap, and the trap returns `true`. JavaScript
then checks the target's locked accessor property. Because `id` has no setter,
the declared success is impossible, so JavaScript throws a `TypeError`.

```text
Reflect.set(dishonestProxy, 'id', 100)
  -> set trap runs
  -> trap returns true and declares success
  -> target.id is non-configurable and has no setter
  -> the success claim violates a Proxy invariant
  -> TypeError
```

The getter continues to return the original value:

```js
console.log(dishonestProxy.id);
// 42
```

A forwarding trap reports the failed write correctly:

```js
const forwardingProxy = new Proxy(target, {
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});

console.log(Reflect.set(forwardingProxy, 'id', 100));
// false

console.log(forwardingProxy.id);
// 42
```

Here the inner `Reflect.set()` attempts the normal write. It cannot assign the
value because `id` has no setter, so it returns `false`. The trap returns that
same result and correctly declares failure. No impossible success is reported,
so this `Reflect.set()` call returns `false` instead of violating the Proxy
invariant.

The important difference is:

```text
trap returns true  -> impossible success claim -> TypeError
trap returns false -> correct failure report   -> value remains 42
```

| Locked target property | Required behavior |
|---|---|
| Own data property with `configurable: false` and `writable: false` | Do not declare success for a different value |
| Own accessor property with `configurable: false` and no setter | Do not declare success for an assignment |

These invariants keep the proxy consistent with target properties JavaScript
has made impossible to change.

## Which Operations Run The `set` Trap?

The `set` trap intercepts operations that request the proxy's internal
`[[Set]]` operation.

### Operations That Run `set`

| Operation | Why `set` runs |
|---|---|
| `proxy.name = 'Mina'` | The assignment requests `[[Set]]` through the proxy |
| `Reflect.set(proxy, 'name', 'Mina')` | `Reflect.set()` explicitly requests `[[Set]]` through the proxy |

Both operations follow the same general path:

```text
property write through proxy
  -> proxy [[Set]]
  -> set trap
```

### Property Operations That Do Not Run `set`

Other property operations request different internal object operations, so
they use different Proxy traps:

| Operation | Matching trap |
|---|---|
| `Object.defineProperty(proxy, 'name', descriptor)` | `defineProperty` |
| `delete proxy.name` | `deleteProperty` |
| `proxy.name` | `get` |

These operations may define, delete, or read a property, but none of them asks
the proxy to perform `[[Set]]`. Therefore, they do not run the `set` trap.

### Direct Target Writes Do Not Run `set`

Writing directly to the target also bypasses the proxy:

```js
target.name = 'Direct write';
```

The assignment uses the target's own `[[Set]]` operation because the proxy is
not involved:

```text
proxy.name = value  -> proxy set trap runs
target.name = value -> proxy is bypassed
```

Only writes requested through the proxy can reach its `set` trap.

## Important Notes

- The `set` trap intercepts the `[[Set]]` internal object operation.
- It runs for property assignments through the proxy.
- `property` is always a string or symbol.
- Numeric indexes arrive as string keys.
- `value` is the proposed new value.
- `receiver` is the object through which the write began.
- The trap result is coerced to a boolean.
- Returning `true` declares success but does not itself perform or verify a
  write.
- Returning `false` declares failure but does not prevent or undo a write the
  trap already performed.
- JavaScript generally trusts the trap's declared status instead of checking
  afterward whether stored data changed.
- A falsy result causes strict-mode assignment to throw `TypeError`.
- `Reflect.set()` connects normal assignment behavior with its boolean result.
- Array methods may trigger multiple `set` calls.
- Direct target writes bypass the trap.
- Locked target properties limit which writes the trap may report as
  successful.
- Inside the trap method, `this` is the handler object.

## When To Use It

Use a `set` trap when writes across an object need shared behavior, such as:

- validation,
- change logging,
- normalization,
- write restrictions,
- reactive update notifications,
- receiver-aware forwarding through inheritance.

For one ordinary property with simple validation, a setter can be easier:

```js
const progress = {
  _score: 0,

  set score(value) {
    if (!Number.isInteger(value) || value < 0) {
      throw new TypeError('invalid score');
    }

    this._score = value;
  },
};
```

Use a proxy when the behavior must apply dynamically to many keys or unknown
keys.

## Common Mistakes

### Mistake 1: Forgetting To Return A Result

```js
set(target, property, value) {
  target[property] = value;
}
```

The trap returns `undefined`, which declares failure even though the code may
have changed the target.

Use normal forwarding:

```js
return Reflect.set(target, property, value, receiver);
```

### Mistake 2: Returning The Assigned Value

```js
set(target, property, value) {
  target[property] = value;

  return value;
}
```

The trap result is supposed to declare success, not return the stored value.
Some assigned values such as `0`, `''`, `false`, `null`, or `undefined` are
falsy and would incorrectly declare failure.

Return an explicit boolean or use `Reflect.set()`.

### Mistake 3: Returning `true` Without Performing The Write

```js
set() {
  return true;
}
```

This declares success but leaves the data unchanged.

Use normal forwarding when the write should actually happen:

```js
return Reflect.set(target, property, value, receiver);
```

### Mistake 4: Performing The Write And Returning `false`

```js
set(target, property, value) {
  target[property] = value;

  return false;
}
```

The data changes, but the trap declares failure. `Reflect.set()` returns
`false`, and strict assignment throws after the mutation has already happened.

### Mistake 5: Writing Directly To Target And Losing Receiver Behavior

```js
set(target, property, value) {
  target[property] = value;

  return true;
}
```

This can place inherited writes on the target or run setters with the wrong
`this` value.

Use:

```js
return Reflect.set(target, property, value, receiver);
```

### Mistake 6: Assuming Every Key Is A Normal String

Symbols are valid property keys.

Use `String(property)` when logging a key rather than assuming it is ordinary
text.

### Mistake 7: Blocking Array `length`

An array validation trap may see both index writes and `length` writes.

If the rule applies only to array elements, handle `length` separately:

```js
if (property !== 'length' && typeof value !== 'number') {
  throw new TypeError('Only numbers are allowed');
}
```

### Mistake 8: Expecting Target Writes To Be Intercepted

```js
proxy.count = -1;
// set trap runs

target.count = -1;
// set trap does not run
```

Code that depends on the proxy's behavior must write through the proxy.

## Runnable Practice File

Run the paired file from the repository root:

```bash
node src/proxy/handlers/set/set.js
```

The runnable file contains learner-facing comments, terminal labels, and
expected output comments for:

- normal `Reflect.set()` forwarding,
- validation,
- reporting success without writing,
- false results and strict-mode failure,
- numeric and symbol property keys,
- array index and `length` writes from `push()`,
- inherited receivers,
- locked-property invariants,
- direct target writes bypassing the proxy.

## Related Pages

- [Proxy Basics](../../concepts/proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Proxy `receiver`](../../concepts/receiver/receiver.md)
- [Proxy `get` Trap](../get/get.md)
- [Part 5: The `set` Trap](../../organized-notes/05-set-trap.md)
- [Proxy and Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
- [MDN: `Reflect.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)
- [ECMAScript specification: Proxy `[[Set]]`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver)