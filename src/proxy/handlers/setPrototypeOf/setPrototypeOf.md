# Proxy `setPrototypeOf` Trap

## What Problem Does It Solve?

`Object.setPrototypeOf()` and `Reflect.setPrototypeOf()` can change an existing
object's immediate prototype.

```js
const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

const profile = {
  name: 'Asha',
};

Object.setPrototypeOf(profile, sharedBehavior);

console.log(profile.describe());
// Asha can use shared behavior
```

When the object being changed is a Proxy, you may want to:

- log prototype-change requests,
- allow only approved prototypes,
- reject every prototype change,
- throw a custom error for forbidden changes,
- forward the normal change to the target.

The Proxy `setPrototypeOf` trap gives you control over those requests.

## Quick Definition

The `setPrototypeOf` trap intercepts the proxy's internal
`[[SetPrototypeOf]]` operation.

```js
const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});
```

The trap receives:

- the original `target`,
- the exact requested `prototype` object or `null`.

It returns a boolean-like status:

```text
truthy -> report that the request succeeded
falsy  -> report that the request failed
```

The return statement reports a status. It does not change the prototype by
itself.

## Mental Model

Normal forwarding has this flow:

```text
Object.setPrototypeOf(proxy, newPrototype)
  -> proxy receives [[SetPrototypeOf]]
  -> setPrototypeOf(target, newPrototype) trap runs
  -> Reflect.setPrototypeOf(target, newPrototype)
  -> target tries to change its immediate prototype
  -> Reflect returns true or false
  -> trap returns that status
  -> Proxy validates a successful report
  -> Object caller returns proxy or throws
```

Keep three jobs separate:

```text
intercept -> the trap runs because the request went through the proxy
perform   -> trap code actually asks the target to change
report    -> trap return value declares success or failure
```

The usual forwarding code handles the last two jobs together:

```js
return Reflect.setPrototypeOf(target, prototype);
```

## Before This Page

The ordinary Object lesson explains what changing a prototype does:

```text
src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.md
```

The previous Proxy lesson explains how a prototype is reported:

```text
src/proxy/handlers/getPrototypeOf/getPrototypeOf.md
```

This page focuses on changing a prototype through a Proxy.

## Syntax

```js
const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return trueOrFalse;
  },
});
```

Normal forwarding:

```js
const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});
```

## Parameters

The trap receives two parameters.

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `prototype` | The exact object or `null` requested as the new immediate prototype |

Example:

```js
const sharedBehavior = {};
const target = {};

const proxy = new Proxy(target, {
  setPrototypeOf(receivedTarget, receivedPrototype) {
    console.log(receivedTarget === target);
    console.log(receivedPrototype === sharedBehavior);

    return Reflect.setPrototypeOf(receivedTarget, receivedPrototype);
  },
});

Object.setPrototypeOf(proxy, sharedBehavior);
// true
// true
```

### `target`

`target` is the object originally passed as the first argument to `new Proxy()`:

```js
const proxy = new Proxy(target, handler);
```

The trap changes the target only when its code explicitly performs that work.

### `prototype`

`prototype` is exactly the value requested by the caller:

```js
Object.setPrototypeOf(proxy, sharedBehavior);
```

Inside the trap:

```text
prototype === sharedBehavior
```

JavaScript does not automatically use `sharedBehavior.prototype`.

For a constructor function, choose the exact object you mean:

```js
function Course() {}

Object.setPrototypeOf(proxy, Course.prototype);
// trap receives Course.prototype

Object.setPrototypeOf(proxy, Course);
// trap receives the Course function object itself
```

Those are two different prototype requests.

### Why There Is No `receiver`

The operation changes an internal prototype link. It is not reading a getter or
calling a setter that needs a separate `this` value.

Therefore, the trap receives no `receiver` parameter.

### Trap `this`

Inside method syntax, trap `this` refers to the handler object:

```js
const handler = {
  label: 'profile handler',

  setPrototypeOf(target, prototype) {
    console.log(this.label);

    return Reflect.setPrototypeOf(target, prototype);
  },
};
```

`this` is not the target or the proxy.

## Return Value

The trap result is converted to a boolean.

```js
setPrototypeOf() {
  return true;
}
```

This reports success.

```js
setPrototypeOf() {
  return false;
}
```

This reports failure.

Other values are coerced:

```js
return 'accepted'; // truthy -> true
return 0;          // falsy  -> false
```

Return actual booleans when writing custom policy code. For normal forwarding,
return the boolean produced by `Reflect.setPrototypeOf()`.

## Intercepting, Performing, And Reporting

This is the central idea of the lesson.

### Intercepting

When a prototype-change request goes through the proxy, JavaScript invokes the
trap automatically:

```js
Object.setPrototypeOf(proxy, newPrototype);
```

The trap has now intercepted the request.

### Performing

The target changes only when the trap performs an operation that changes it:

```js
Reflect.setPrototypeOf(target, prototype);
```

### Reporting

The trap's return value reports whether the request was accepted:

```js
return true;
```

or:

```js
return false;
```

These jobs can be written independently, even when doing so creates misleading
behavior.

The clear forwarding pattern is:

```js
setPrototypeOf(target, prototype) {
  return Reflect.setPrototypeOf(target, prototype);
}
```

Here:

- `Reflect.setPrototypeOf()` performs the normal target operation,
- its boolean tells whether that operation succeeded,
- `return` reports the same truthful status to the proxy caller.

## Normal Forwarding With `Reflect.setPrototypeOf()`

```js
const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

const result = Object.setPrototypeOf(proxy, sharedBehavior);

console.log(result === proxy); // true
console.log(Object.getPrototypeOf(target) === sharedBehavior); // true
console.log(proxy.describe()); // Asha can use shared behavior
```

What happened:

1. `Object.setPrototypeOf(proxy, sharedBehavior)` requested a change through
   the proxy.
2. The proxy invoked `setPrototypeOf(target, sharedBehavior)`.
3. `Reflect.setPrototypeOf(target, sharedBehavior)` changed the target's actual
   immediate prototype.
4. `Reflect` returned `true`.
5. The trap returned that same status.
6. `Object.setPrototypeOf()` returned its first argument, which was `proxy`.
7. A later property lookup found `describe` through the target's changed
   prototype chain.

Notice the two different return values involved:

```text
trap / Reflect result      -> true
Object.setPrototypeOf result -> proxy
```

## An Omitted Trap Forwards Automatically

A Proxy does not require every trap:

```js
const target = {};
const sharedBehavior = {};
const proxy = new Proxy(target, {});

console.log(Reflect.setPrototypeOf(proxy, sharedBehavior)); // true
console.log(Object.getPrototypeOf(target) === sharedBehavior); // true
```

When `setPrototypeOf` is absent, the proxy automatically delegates
`[[SetPrototypeOf]]` to the target.

Add an explicit trap when you need logging, validation, rejection, or another
custom policy.

## Which Operations Run The Trap?

Common callers are:

| Operation | Result exposed to the caller |
|---|---|
| `Object.setPrototypeOf(proxy, prototype)` | Returns `proxy` on success; throws on failure |
| `Reflect.setPrototypeOf(proxy, prototype)` | Returns the boolean status |
| `proxy.__proto__ = prototype` | Legacy setter path; throws if the internal change reports failure |

Each operation can request the proxy's `[[SetPrototypeOf]]` internal method.

## `Object.setPrototypeOf()` Versus `Reflect.setPrototypeOf()`

Both operations can run the same trap. They expose a false trap status
differently.

```js
const proxy = new Proxy({}, {
  setPrototypeOf() {
    return false;
  },
});
```

With `Reflect`:

```js
console.log(Reflect.setPrototypeOf(proxy, {}));
// false
```

With `Object`:

```js
Object.setPrototypeOf(proxy, {});
// TypeError
```

The trap returned the same false status in both cases.

```text
Reflect caller -> exposes false directly
Object caller  -> converts false status into TypeError
```

On success, their return values also differ:

```js
const proxy = new Proxy({}, {});
const prototype = {};

console.log(Object.setPrototypeOf(proxy, prototype) === proxy); // true
console.log(Reflect.setPrototypeOf(proxy, prototype)); // true
```

## Why The Legacy `__proto__` Setter Runs The Trap

You may see this older syntax:

```js
proxy.__proto__ = newPrototype;
```

`__proto__` is a legacy accessor inherited from `Object.prototype`. Its setter
asks its receiver to change `[[Prototype]]`.

Conceptually:

```text
1. Assign to proxy.__proto__.
2. Find the inherited __proto__ setter.
3. Run the setter with proxy as its receiver.
4. The setter requests proxy.[[SetPrototypeOf]](newPrototype).
5. The proxy's setPrototypeOf trap runs.
```

Example:

```js
let trapRuns = 0;

const proxy = new Proxy({}, {
  setPrototypeOf(target, prototype) {
    trapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

proxy.__proto__ = {};

console.log(trapRuns);
// 1
```

Prefer `Object.setPrototypeOf()` or `Reflect.setPrototypeOf()` in new code.

### When A `set` Trap Also Exists

The legacy syntax looks like a property assignment, so it can cross two layers:

```js
const events = [];

const proxy = new Proxy({}, {
  set(target, property, value, receiver) {
    events.push(`set:${String(property)}`);

    return Reflect.set(target, property, value, receiver);
  },

  setPrototypeOf(target, prototype) {
    events.push('setPrototypeOf');

    return Reflect.setPrototypeOf(target, prototype);
  },
});

proxy.__proto__ = {};

console.log(events);
// [ 'set:__proto__', 'setPrototypeOf' ]
```

The initial assignment runs `set`. Normal `Reflect.set()` forwarding reaches
the inherited `__proto__` accessor, whose setter then requests
`[[SetPrototypeOf]]` and runs `setPrototypeOf`.

Direct `Object.setPrototypeOf(proxy, prototype)` avoids that property-assignment
layer and requests `[[SetPrototypeOf]]` directly.

## Returning `true` Does Not Perform The Change

```js
const target = {};
const requestedPrototype = {};

const proxy = new Proxy(target, {
  setPrototypeOf() {
    return true;
  },
});

console.log(Object.setPrototypeOf(proxy, requestedPrototype) === proxy);
// true

console.log(Object.getPrototypeOf(target) === Object.prototype);
// true

console.log(Object.getPrototypeOf(target) === requestedPrototype);
// false
```

The trap reported success, so `Object.setPrototypeOf()` returned normally.

However, the trap never called:

```js
Reflect.setPrototypeOf(target, requestedPrototype);
```

Therefore, the target stayed unchanged.

This misleading report is permitted here because the target is extensible. It
is still poor forwarding behavior because the report does not match the work.

## Returning `false` Does Not Undo Earlier Work

```js
const target = {};
const requestedPrototype = {};

const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    Reflect.setPrototypeOf(target, prototype);

    return false;
  },
});

console.log(Reflect.setPrototypeOf(proxy, requestedPrototype));
// false

console.log(Object.getPrototypeOf(target) === requestedPrototype);
// true
```

The steps were:

1. `Reflect.setPrototypeOf(target, prototype)` changed the target.
2. The trap then returned `false`.
3. The caller received failure.
4. That failure report did not reverse the earlier mutation.

This deliberately inconsistent trap is useful for understanding the two jobs,
but it is not a good application pattern.

## The Correct Forwarding Code

Use the result of the operation that actually performs the change:

```js
setPrototypeOf(target, prototype) {
  return Reflect.setPrototypeOf(target, prototype);
}
```

This keeps the work and status connected:

```text
target changed successfully -> Reflect returns true  -> trap reports true
target rejected the change  -> Reflect returns false -> trap reports false
```

Logging or validation can happen before forwarding:

```js
setPrototypeOf(target, prototype) {
  console.log('Requested prototype:', prototype);

  return Reflect.setPrototypeOf(target, prototype);
}
```

## Rejecting A Change With `false`

Return `false` when the request should be rejected using the caller's normal
failure behavior:

```js
const target = {};

const proxy = new Proxy(target, {
  setPrototypeOf() {
    return false;
  },
});
```

`Reflect` exposes the rejection:

```js
console.log(Reflect.setPrototypeOf(proxy, {}));
// false
```

`Object` throws for the same rejection:

```js
Object.setPrototypeOf(proxy, {});
// TypeError
```

Because the trap did not perform a change, the target keeps its old prototype.

## Rejecting A Change By Throwing

A trap can throw directly:

```js
const proxy = new Proxy({}, {
  setPrototypeOf() {
    throw new Error('Prototype changes are disabled');
  },
});
```

Both callers receive that error:

```js
Reflect.setPrototypeOf(proxy, {});
// Error: Prototype changes are disabled

Object.setPrototypeOf(proxy, {});
// Error: Prototype changes are disabled
```

Choose based on the intended API:

```text
return false -> Reflect receives false; Object throws TypeError
throw error   -> both callers receive the thrown error
```

Throwing is useful when failure must always be exceptional or when callers need
a specific explanation.

## Setting The Prototype To `null`

`null` is a valid requested prototype:

```js
const target = {
  topic: 'Proxy',
};

const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

console.log(Reflect.setPrototypeOf(proxy, null)); // true
console.log(Object.getPrototypeOf(target)); // null
console.log(typeof proxy.toString); // undefined
```

What happened:

- the trap received `prototype === null`,
- `Reflect.setPrototypeOf(target, null)` removed the target's prototype link,
- the target no longer inherited `Object.prototype.toString`.

## Invalid Prototype Values Never Reach The Trap

The requested prototype must be an object or `null`.

Both calling APIs validate that requirement before invoking the internal
operation:

```js
let trapRuns = 0;

const proxy = new Proxy({}, {
  setPrototypeOf(target, prototype) {
    trapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

Object.setPrototypeOf(proxy, 'invalid');
// TypeError

console.log(trapRuns);
// 0
```

The same applies to `Reflect.setPrototypeOf()`:

```js
Reflect.setPrototypeOf(proxy, 42);
// TypeError

console.log(trapRuns);
// 0
```

The trap does not need to decide whether a primitive can be a prototype. The
calling operation rejects that request before `[[SetPrototypeOf]]` begins.

## Prototype Cycles Are Normal Failures

A prototype chain cannot contain a cycle.

```js
const target = {};
const descendant = Object.create(target);
```

The current relationship is:

```text
descendant -> target -> Object.prototype -> null
```

This request would create a loop:

```js
Object.setPrototypeOf(target, descendant);
```

```text
target -> descendant -> target -> descendant -> ...
```

Normal `Reflect.setPrototypeOf()` rejects it:

```js
const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

console.log(Reflect.setPrototypeOf(proxy, descendant));
// false
```

The trap forwards that honest `false` result.

With the Object caller:

```js
Object.setPrototypeOf(proxy, descendant);
// TypeError
```

This is normal target-operation failure forwarded through the trap. It is not
the same as a Proxy trap lying about an impossible successful change.

## The Non-Extensible Target Invariant

A non-extensible target cannot change to a different prototype.

The `setPrototypeOf` trap may reject such a request with `false`. It must not
report successful acceptance of that impossible different-prototype request.

The exact rule is:

```text
if trap result is truthy and target is non-extensible:
  requested prototype must be the target's exact current prototype
```

Object identity matters. Two objects with the same properties are still
different prototype objects.

### Honest Forwarding Returns `false`

```js
const currentPrototype = {
  plan: 'free',
};

const target = Object.create(currentPrototype);
Object.preventExtensions(target);

const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

const differentPrototype = {
  plan: 'pro',
};

console.log(Reflect.setPrototypeOf(proxy, differentPrototype));
// false

console.log(Object.getPrototypeOf(target) === currentPrototype);
// true
```

The target could not perform the change, so `Reflect.setPrototypeOf(target,
differentPrototype)` returned `false`. The trap truthfully returned that same
status.

No invariant error is needed because the trap did not claim success.

### A False Status Still Makes The Object Caller Throw

```js
Object.setPrototypeOf(proxy, differentPrototype);
// TypeError
```

This `TypeError` comes from `Object.setPrototypeOf()` converting a false status
into an exception. The trap did not violate an invariant.

### Lying About Success Throws

```js
const proxy = new Proxy(target, {
  setPrototypeOf() {
    return true;
  },
});

Reflect.setPrototypeOf(proxy, differentPrototype);
// TypeError
```

Here the target is non-extensible, the requested prototype differs from the
target's current prototype, and the trap reports success.

JavaScript checks those facts after the truthy result and rejects the
contradiction with `TypeError`. Even the Reflect caller receives the error;
there is no valid boolean status to expose for an invariant violation.

### Reporting Success For The Same Prototype Is Valid

```js
const proxy = new Proxy(target, {
  setPrototypeOf() {
    return true;
  },
});

console.log(Reflect.setPrototypeOf(proxy, currentPrototype));
// true
```

The target already has `currentPrototype`. No change is required, so a true
status does not contradict the non-extensible target.

### Invariant Summary

| Target state | Requested prototype | Trap result | Outcome |
|---|---|---|---|
| Extensible | Any object or `null` | Falsy | Report failure |
| Extensible | Any object or `null` | Truthy | Report success |
| Non-extensible | Exact current prototype | Truthy | Valid success |
| Non-extensible | Different prototype | Falsy | Valid rejection |
| Non-extensible | Different prototype | Truthy | `TypeError` |

This table describes Proxy validation. Good application code should still make
its reported status agree with the operation it actually performed.

## Changing The Proxy Versus Using It As A Prototype

The trap runs when the proxy itself is the object whose prototype is requested
to change:

```js
Object.setPrototypeOf(parentProxy, newPrototype);
// parentProxy's setPrototypeOf trap runs
```

Using the proxy as another object's prototype is a different operation.

### `Object.create(parentProxy)`

```js
const child = Object.create(parentProxy);
```

This creates:

```text
child -> parentProxy
```

It does not change `parentProxy`, so the parent's `setPrototypeOf` trap does not
run.

### `Object.setPrototypeOf(child, parentProxy)`

```js
Object.setPrototypeOf(child, parentProxy);
```

This changes `child`, not `parentProxy`.

If `child` is an ordinary object, no proxy `setPrototypeOf` trap runs. If
`child` is a Proxy, the trap belonging to `child` runs. The fact that the new
prototype value happens to be another Proxy does not run that parent's trap.

### Complete Comparison

```js
let parentTrapRuns = 0;

const parentProxy = new Proxy({}, {
  setPrototypeOf(target, prototype) {
    parentTrapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

const firstChild = Object.create(parentProxy);

const secondChild = {};
Object.setPrototypeOf(secondChild, parentProxy);

console.log(parentTrapRuns); // 0

Object.setPrototypeOf(parentProxy, {});

console.log(parentTrapRuns); // 1
```

Ask this question:

```text
Which object's internal prototype is being changed?
```

The trap belongs to that object when that object is a Proxy.

## Relationship With `getPrototypeOf`

The two traps control opposite operations:

```text
getPrototypeOf -> reports the proxy's immediate prototype
setPrototypeOf -> handles a request to change the proxy's immediate prototype
```

Normal forwarding keeps them aligned:

```js
const target = {};

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },

  setPrototypeOf(target, prototype) {
    return Reflect.setPrototypeOf(target, prototype);
  },
});

const sharedBehavior = {};

Reflect.setPrototypeOf(proxy, sharedBehavior);

console.log(Reflect.getPrototypeOf(proxy) === sharedBehavior);
// true
```

The set trap changes the target, and the get trap reports the target's new
prototype.

Custom handlers can make reports and changes behave differently while the
target is extensible, but that design is harder for callers to reason about.

## Direct Target Mutation Bypasses The Trap

Only requests made through the proxy are intercepted:

```js
let trapRuns = 0;
const target = {};

const proxy = new Proxy(target, {
  setPrototypeOf(target, prototype) {
    trapRuns += 1;

    return Reflect.setPrototypeOf(target, prototype);
  },
});

Object.setPrototypeOf(target, {});
console.log(trapRuns); // 0

Object.setPrototypeOf(proxy, {});
console.log(trapRuns); // 1
```

A proxy policy cannot observe code that directly mutates the raw target.

## What `setPrototypeOf` Does Not Intercept

The trap handles requests to change the proxy's own immediate prototype.

| Operation | Relevant behavior |
|---|---|
| `Object.getPrototypeOf(proxy)` | Uses `getPrototypeOf` |
| `proxy.name = value` | Uses `set` |
| `Object.create(proxy)` | Uses the proxy as a new object's prototype |
| `Object.setPrototypeOf(child, proxy)` | Changes `child`, not the parent proxy |
| `Object.setPrototypeOf(target, prototype)` | Bypasses the proxy |

The legacy `proxy.__proto__ = prototype` syntax is a special path: it begins as
a property assignment and can eventually request `[[SetPrototypeOf]]` through
the inherited accessor.

## Important Notes

- The trap intercepts the proxy's `[[SetPrototypeOf]]` internal operation.
- It receives `target` and the exact requested object-or-`null` `prototype`.
- It has no `receiver` parameter.
- Trap `this` refers to the handler object.
- Its result is converted to a boolean status.
- Returning `true` does not change the target by itself.
- Returning `false` does not undo work already performed.
- `Reflect.setPrototypeOf(target, prototype)` performs normal forwarding and
  returns the matching boolean.
- An omitted trap forwards automatically.
- `Object.setPrototypeOf()` returns the proxy on success and throws on failure.
- `Reflect.setPrototypeOf()` exposes a normal false status directly.
- A trap may reject by returning `false` or by throwing.
- `null` is a valid prototype request.
- Primitive prototype arguments fail before the trap runs.
- Prototype cycles make normal forwarding fail.
- A truthy report for a different prototype violates the invariant when the
  target is non-extensible.
- A same-prototype success report is valid for a non-extensible target.
- Using a proxy as another object's prototype does not change the proxy.
- Direct target mutation bypasses the trap.

## When To Use The Trap

Use `setPrototypeOf` when you need to:

- observe prototype-change requests through a Proxy,
- allow only selected prototype objects,
- prevent callers from changing a proxy's prototype,
- throw a domain-specific error for forbidden changes,
- preserve normal behavior while adding logging or validation,
- coordinate prototype changes with a custom `getPrototypeOf` policy.

Do not use it when you only need to:

- read the immediate prototype; use `getPrototypeOf`,
- intercept ordinary property assignment; use `set`,
- create a new object with a known prototype; use `Object.create()`,
- change one ordinary object's prototype without Proxy behavior; call
  `Object.setPrototypeOf()` or `Reflect.setPrototypeOf()` directly.

Changing an object's prototype after creation can hurt performance and make
behavior harder to follow. Prefer choosing the prototype during creation when
that is possible.

## Common Mistakes

### Returning `true` Without Performing The Change

```js
setPrototypeOf() {
  return true;
}
```

This reports success but usually leaves the target unchanged.

### Calling `Reflect` Without Returning Its Status

```js
setPrototypeOf(target, prototype) {
  Reflect.setPrototypeOf(target, prototype);
}
```

The target may change, but the function implicitly returns `undefined`, which
becomes `false`.

Write:

```js
return Reflect.setPrototypeOf(target, prototype);
```

### Performing The Change And Then Returning `false`

```js
setPrototypeOf(target, prototype) {
  Reflect.setPrototypeOf(target, prototype);

  return false;
}
```

The caller receives failure even though the target may already have changed.

### Confusing The Trap Result With The Object Method Result

The trap returns a boolean-like status. On success,
`Object.setPrototypeOf(proxy, prototype)` returns `proxy`, not the trap's
literal `true` value.

### Using `prototype.prototype` Automatically

The trap receives exactly what the caller passed. A normal object may not even
have a `.prototype` property.

### Expecting Primitive Prototypes To Reach Validation Code

The calling API rejects them before the trap runs. Custom trap code cannot
convert a primitive prototype request into a valid one.

### Reporting Impossible Success For A Locked Target

A non-extensible target cannot adopt a different prototype. Returning true for
that request causes `TypeError`.

### Treating Every `TypeError` As An Invariant Violation

`Object.setPrototypeOf()` also turns an ordinary false status into `TypeError`.

Check whether:

- the trap honestly returned `false`, after which Object threw,
- or the trap returned truthy and JavaScript rejected an invariant violation.

### Forwarding To The Proxy Again

Inside the trap, forward to `target`:

```js
return Reflect.setPrototypeOf(target, prototype);
```

Calling `Reflect.setPrototypeOf(proxy, prototype)` from that same proxy's trap
re-enters the trap and can recurse indefinitely.

### Thinking A Parent Proxy's Trap Runs When A Child Uses It

`Object.create(parentProxy)` and `Object.setPrototypeOf(child, parentProxy)` do
not change `parentProxy` itself.

### Preferring `__proto__` In New Code

Use `Object.setPrototypeOf()` or `Reflect.setPrototypeOf()` when an existing
object truly needs a prototype change.

### Changing Prototypes When Creation-Time Choice Is Available

If you know the prototype before creating an object, this is clearer:

```js
const child = Object.create(parent);
```

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/setPrototypeOf/setPrototypeOf.js
```

The practice file contains commented examples, readable terminal labels, and
expected output comments:

```text
src/proxy/handlers/setPrototypeOf/setPrototypeOf.js
```

## Related Notes

- [Object.setPrototypeOf()](../../../object/methods/static-methods/setPrototypeOf/setPrototypeOf.md)
- [Proxy `getPrototypeOf` Trap](../getPrototypeOf/getPrototypeOf.md)
- [Proxy `set` Trap](../set/set.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Internal Methods And Proxy Traps](../../organized-notes/02-internal-methods-and-proxy-traps.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf)
- [MDN: `Reflect.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf)
- [MDN: `Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- [ECMAScript: Proxy `[[SetPrototypeOf]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-setprototypeof-v)
