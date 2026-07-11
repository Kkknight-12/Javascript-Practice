# Proxy `deleteProperty` Trap

## What Problem Does It Solve?

The `delete` operator removes an own property from an object:

```js
const profile = {
  name: 'Asha',
  topic: 'Proxy',
};

delete profile.topic;

console.log(profile);
// { name: 'Asha' }
```

Normally, JavaScript performs the deletion directly. Sometimes you want to run
custom logic whenever code requests a deletion.

For example, you may want to:

- record which keys are deleted,
- protect required properties,
- allow or reject deletion according to a rule,
- observe array-index deletion,
- forward the operation while preserving normal behavior.

The Proxy `deleteProperty` trap gives you that control.

## Quick Definition

The `deleteProperty` trap intercepts property-deletion operations performed
through a proxy.

```js
const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});
```

It runs for:

```js
delete proxy.name;
delete proxy['name'];
Reflect.deleteProperty(proxy, 'name');
```

A `deleteProperty` trap has two separate jobs:

1. decide whether and how the property should be deleted,
2. return a truthy or falsy value as the declared deletion status.

Returning `true` does not perform the deletion by itself. Returning `false`
also does not restore a property that the trap already deleted.

`Reflect.deleteProperty()` is the usual forwarding choice because it performs
the normal deletion and returns that operation's boolean result.

## Mental Model

A deletion through a forwarding proxy follows this path:

```text
delete proxy.topic
  -> deleteProperty(target, 'topic')
  -> custom validation or logging
  -> Reflect.deleteProperty(target, 'topic')
  -> property is deleted if normal rules allow it
  -> true or false
```

Keep these three steps separate:

```text
intercept the request -> deleteProperty trap runs
perform the deletion -> Reflect.deleteProperty() or custom deletion logic
declare the status   -> return a truthy or falsy value
```

The trap running does not automatically delete anything, and its returned
status is not itself the deletion operation.

## Syntax

```js
const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    return trueOrFalse;
  },
});
```

A transparent forwarding trap looks like this:

```js
const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});
```

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol key requested for deletion |

Consider this operation:

```js
const profileTarget = {
  name: 'Asha',
};

const profile = new Proxy(profileTarget, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

delete profile.name;
```

The trap receives:

| Parameter | Value |
|---|---|
| `target` | `profileTarget` |
| `property` | `'name'` |

### `target`

`target` is the object passed as the first argument to `new Proxy()`.

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, handler);
```

The trap may inspect the target before deciding whether to forward the
deletion.

### `property`

`property` identifies the requested key. It is either a string or a symbol.

```js
delete proxy.name;
// property is 'name'

delete proxy[0];
// property is '0', a string

delete proxy[secretKey];
// property is secretKey, a symbol
```

Numeric keys become strings before the trap receives them. Symbol keys remain
symbols.

### Trap `this`

Inside the trap method, `this` refers to the handler object:

```js
const handler = {
  label: 'profile handler',

  deleteProperty(target, property) {
    console.log(this.label);

    return Reflect.deleteProperty(target, property);
  },
};
```

`this` is not the target or the proxy.

## Return Value

The trap's result is converted to a boolean:

```text
truthy result -> declare that deletion succeeded
falsy result  -> declare that deletion failed
```

Explicit booleans are easier to understand:

```js
return true;
return false;
```

The result reports the status of the operation. It does not perform or undo
the deletion by itself.

## Normal Forwarding With `Reflect.deleteProperty()`

Use `Reflect.deleteProperty()` when the proxy should preserve normal deletion
behavior.

```js
const deletionLog = [];

const profileTarget = {
  name: 'Asha',
  topic: 'Proxy',
};

const profile = new Proxy(profileTarget, {
  deleteProperty(target, property) {
    deletionLog.push(property);

    return Reflect.deleteProperty(target, property);
  },
});

console.log(delete profile.topic);
// true

console.log(Object.hasOwn(profileTarget, 'topic'));
// false

console.log(deletionLog);
// [ 'topic' ]
```

The flow is:

```text
delete profile.topic
  -> deleteProperty(profileTarget, 'topic')
  -> log 'topic'
  -> Reflect.deleteProperty(profileTarget, 'topic')
  -> delete the configurable own property
  -> return true
```

## `delete` Versus `Reflect.deleteProperty()`

Both operations invoke the proxy's deletion behavior:

```js
delete proxy.name;
Reflect.deleteProperty(proxy, 'name');
```

Their main difference is how they expose a failed deletion.

### `Reflect.deleteProperty()` Returns The Boolean

```js
const target = {};

Object.defineProperty(target, 'id', {
  value: 42,
  configurable: false,
});

console.log(Reflect.deleteProperty(target, 'id'));
// false
```

The method directly returns the deletion status.

### Strict-Mode `delete` Throws For `false`

If a proxy trap returns `false`, strict-mode `delete` converts that failed
status into a `TypeError`:

```js
const proxy = new Proxy(
  {
    id: 42,
  },
  {
    deleteProperty() {
      return false;
    },
  },
);

(function strictDeletion() {
  'use strict';

  delete proxy.id;
})();
// TypeError
```

The same request through `Reflect.deleteProperty()` returns `false` directly:

```js
console.log(Reflect.deleteProperty(proxy, 'id'));
// false
```

This makes `Reflect.deleteProperty()` convenient when code wants to inspect
failure without relying on strict-mode exception behavior.

## Performing And Reporting Are Separate Jobs

The boolean returned by the trap is a declaration. It is not the code that
removes the property.

### Returning `true` Without Deleting

```js
const target = {
  temporary: 'keep me',
};

const proxy = new Proxy(target, {
  deleteProperty() {
    return true;
  },
});

console.log(Reflect.deleteProperty(proxy, 'temporary'));
// true

console.log(target.temporary);
// keep me
```

The trap reports success but never calls `Reflect.deleteProperty()` or uses
other deletion logic. The configurable property therefore remains.

```text
request intercepted -> yes
property deleted    -> no
declared status     -> true
```

### Returning `false` After Deleting

```js
const target = {
  temporary: 'remove me',
};

const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    Reflect.deleteProperty(target, property);

    return false;
  },
});

console.log(Reflect.deleteProperty(proxy, 'temporary'));
// false

console.log(Object.hasOwn(target, 'temporary'));
// false
```

The trap performs the deletion and then declares failure. Returning `false`
does not undo the mutation that already happened.

```text
request intercepted -> yes
property deleted    -> yes
declared status     -> false
```

These examples are intentionally contradictory. They demonstrate why normal
forwarding is safer:

```js
return Reflect.deleteProperty(target, property);
```

This single line performs the normal deletion and returns the result produced
by that same operation.

## Protecting A Property

A trap can reject deletion according to an application rule:

```js
const accountTarget = {
  id: 101,
  nickname: 'coder',
};

const account = new Proxy(accountTarget, {
  deleteProperty(target, property) {
    if (property === 'id') {
      return false;
    }

    return Reflect.deleteProperty(target, property);
  },
});

console.log(Reflect.deleteProperty(account, 'id'));
// false

console.log(account.id);
// 101

console.log(Reflect.deleteProperty(account, 'nickname'));
// true
```

The custom branch rejects `id`. Other keys use normal deletion behavior.

This is an interface rule, not a security boundary. Code that holds the raw
target can bypass the proxy:

```js
delete accountTarget.id;
```

Keep the target private when all callers must follow the proxy's policy.

## Deleting A Missing Property

Normal deletion reports success when the requested own property is already
missing:

```js
const target = {};

console.log(Reflect.deleteProperty(target, 'missing'));
// true
```

This may initially seem surprising. The deletion request succeeded because the
requested final state is already true: the object has no such own property.

```text
before deletion -> property is absent
after deletion  -> property is absent
result          -> true
```

## Deletion Affects Own Properties Only

The normal deletion operation does not walk up the prototype chain and remove
an inherited property.

```js
const sharedProfile = {
  role: 'learner',
};

const learnerTarget = Object.create(sharedProfile);
learnerTarget.name = 'Mina';

const learner = new Proxy(learnerTarget, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log(delete learner.role);
// true

console.log(learner.role);
// learner
```

`learnerTarget` never owned `role`. It inherited the property from
`sharedProfile`:

```text
learner proxy
  -> learnerTarget
      -> sharedProfile owns role
          -> Object.prototype
              -> null
```

`Reflect.deleteProperty(learnerTarget, 'role')` checks for an own `role`
property on `learnerTarget`. There is nothing to remove, so it returns `true`.
The prototype's property remains untouched and can still be read through the
prototype chain.

Compare the two questions:

```js
console.log(Object.hasOwn(learnerTarget, 'role'));
// false

console.log('role' in learner);
// true
```

The target does not own `role`, but `role` still exists in its prototype chain.

## Numeric And Symbol Keys

The `property` argument is always a string or symbol.

```js
const secretKey = Symbol('secret');
const keyLog = [];

const target = {
  0: 'zero',
  [secretKey]: 'hidden',
};

const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    keyLog.push(`${String(property)}:${typeof property}`);

    return Reflect.deleteProperty(target, property);
  },
});

delete proxy[0];
delete proxy[secretKey];

console.log(keyLog);
// [ '0:string', 'Symbol(secret):symbol' ]
```

The numeric key `0` reaches the trap as the string `'0'`. The symbol remains a
symbol.

Use `String(property)` when every key must be logged safely. Guard the type
before using string-only methods:

```js
if (typeof property === 'string' && property.startsWith('_')) {
  return false;
}
```

## Deleting An Array Index

Array indexes are properties, so deleting an index through a proxied array
runs the `deleteProperty` trap.

```js
const deletionLog = [];

const items = new Proxy(['first', 'second', 'third'], {
  deleteProperty(target, property) {
    deletionLog.push(property);

    return Reflect.deleteProperty(target, property);
  },
});

console.log(delete items[1]);
// true

console.log(items.length);
// 3

console.log(1 in items);
// false

console.log(deletionLog);
// [ '1' ]
```

Deleting index `1` removes that property, but it does not shift later elements
or reduce `length`:

```text
before: [ 'first', 'second', 'third' ]
                         delete index 1
after:  [ 'first', <empty>, 'third' ]
length: 3
```

Use an array method such as `splice()` when the goal is to remove an element,
shift later elements, and reduce the array length.

## Proxy Invariants

A proxy may customize deletion, but it cannot report results that contradict
certain protected facts about its target.

The `deleteProperty` trap cannot report successful deletion while:

1. the target still has the key as a non-configurable own property,
2. the target is non-extensible and still has the key as an own property.

Violating either rule causes a `TypeError`.

Notice the words **still has**. JavaScript checks the target after a truthy trap
result. That detail matters for configurable properties on non-extensible
targets.

### Non-Configurable Own Property

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

The trap returns `true` without deleting `id`. JavaScript then finds that `id`
is a non-configurable own property.

```text
trap returns true
  -> target still owns id
  -> id is non-configurable
  -> successful deletion claim is impossible
  -> TypeError
```

Normal forwarding does not make a false success claim:

```js
const proxy = new Proxy(target, {
  deleteProperty(target, property) {
    return Reflect.deleteProperty(target, property);
  },
});

console.log(Reflect.deleteProperty(proxy, 'id'));
// false
```

The property cannot be deleted, so the inner `Reflect.deleteProperty()`
returns `false`, and the trap reports that failure.

### Own Property On A Non-Extensible Target

```js
const target = {
  name: 'Asha',
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

The trap claims success but leaves `name` on the non-extensible target.
JavaScript rejects that contradiction.

### A Non-Extensible Target Can Lose A Configurable Property

`Object.preventExtensions()` prevents adding new properties. It does not make
existing configurable properties non-configurable.

Therefore, a forwarding trap may actually delete such a property:

```js
const target = {
  name: 'Mina',
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

This does not violate the invariant because `Reflect.deleteProperty()` removes
the configurable property before returning `true`. When JavaScript checks the
target, `name` no longer exists.

The two cases differ like this:

```text
return true without deleting
  -> own property remains on non-extensible target
  -> TypeError

Reflect.deleteProperty() deletes configurable property, then returns true
  -> own property no longer exists
  -> valid result
```

## Which Operations Run The `deleteProperty` Trap?

The trap intercepts operations that request the proxy's internal `[[Delete]]`
operation.

### Operations That Run `deleteProperty`

| Operation | Why the trap runs |
|---|---|
| `delete proxy.name` | Requests `[[Delete]]` through the proxy |
| `delete proxy['name']` | Requests the same operation with bracket syntax |
| `Reflect.deleteProperty(proxy, 'name')` | Explicitly requests `[[Delete]]` through the proxy |

### Property Operations That Do Not Run `deleteProperty`

| Operation | Matching trap |
|---|---|
| `proxy.name` | `get` |
| `proxy.name = 'Mina'` | `set` |
| `'name' in proxy` | `has` |
| `Object.defineProperty(proxy, 'name', descriptor)` | `defineProperty` |

These operations concern properties, but they request different internal
object operations.

### Direct Target Deletion Does Not Run The Trap

```js
delete proxy.name;
// deleteProperty trap runs

delete target.name;
// proxy is bypassed
```

Only operations requested through the proxy can reach its trap.

## Important Notes

- The trap intercepts the proxy's `[[Delete]]` internal operation.
- `target` is the original wrapped object.
- `property` is always a string or symbol.
- Numeric property keys arrive as strings.
- The trap's result is converted to a boolean.
- Returning `true` does not itself delete a property.
- Returning `false` does not undo a deletion already performed by trap code.
- `Reflect.deleteProperty()` performs normal deletion and returns its status.
- Strict-mode `delete` throws a `TypeError` when the deletion status is false.
- Deleting a missing own property normally returns `true`.
- Normal deletion does not remove inherited properties.
- Deleting an array index leaves an empty slot and does not reduce `length`.
- Direct deletion from the target bypasses the proxy.
- A truthy result must obey the `deleteProperty` invariants.

## Common Mistakes

### Returning `true` Without Performing The Deletion

```js
deleteProperty() {
  return true;
}
```

This reports success but does not remove a configurable property. Forward the
operation when normal deletion is intended:

```js
return Reflect.deleteProperty(target, property);
```

### Forgetting To Return A Result

```js
deleteProperty(target, property) {
  Reflect.deleteProperty(target, property);
}
```

The property may be deleted, but the function returns `undefined`, which is
converted to `false`. Strict-mode `delete` can then throw even though the
property was removed.

Return the result:

```js
return Reflect.deleteProperty(target, property);
```

### Using `delete target[property]` Without Returning Its Result

```js
deleteProperty(target, property) {
  delete target[property];
}
```

The deletion expression runs, but the trap still returns `undefined`. Return
the result or use `Reflect.deleteProperty()` explicitly.

### Assuming `false` Prevents Earlier Trap Code

```js
deleteProperty(target, property) {
  Reflect.deleteProperty(target, property);

  return false;
}
```

The property is already gone before the trap reports failure. Validate first,
then perform the operation only when it is allowed.

### Expecting Inherited Properties To Be Removed

Deleting a key from the child does not remove that key from its prototype.
Deletion affects only an own property on the target.

### Treating Array Deletion Like `splice()`

```js
delete array[1];
```

This leaves an empty slot. It does not shift elements or shorten the array.

### Ignoring Symbol Keys

Do not call string methods on `property` without checking its type. Symbols can
also be deleted through the proxy.

### Reporting Impossible Success

A truthy result causes a `TypeError` if a protected target property remains in
a state that makes the success claim impossible.

## When To Use The `deleteProperty` Trap

Use it when you need to:

- log deletion requests,
- protect required keys,
- validate deletions using a shared rule,
- observe deletion across dynamic property names,
- forward deletion while adding custom behavior.

Do not use it when you only need to:

- read a property; use `get`,
- assign a property; use `set`,
- check whether a property exists; use `has`,
- define or reconfigure a property descriptor; use `defineProperty`,
- remove one ordinary property without shared behavior; use normal `delete` or
  `Reflect.deleteProperty()` directly.

## Runnable Practice File

Run the complete examples with:

```bash
node src/proxy/handlers/deleteProperty/deleteProperty.js
```

Practice file:

```text
src/proxy/handlers/deleteProperty/deleteProperty.js
```

## Related Notes

- [Proxy Basics](../../concepts/proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Proxy `set` Trap](../set/set.md)
- [Proxy `has` Trap](../has/has.md)
- [Proxy Invariants](../../organized-notes/03-proxy-invariants.md)
- [Proxy And Reflect Together](../../organized-notes/12-proxy-and-reflect-together.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)
- [MDN: `Reflect.deleteProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty)
- [ECMAScript: Proxy `[[Delete]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-delete-p)
