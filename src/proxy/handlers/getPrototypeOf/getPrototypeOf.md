# Proxy `getPrototypeOf` Trap

## What Problem Does It Solve?

Every object has one immediate prototype, which is either another object or
`null`.

Normally, JavaScript reports that prototype directly:

```js
const sharedProfile = {};
const profile = Object.create(sharedProfile);

console.log(Object.getPrototypeOf(profile) === sharedProfile);
// true
```

A Proxy may need to observe or customize prototype inspection. For example, it
may need to:

- log prototype checks,
- forward normal inspection behavior,
- report a virtual prototype,
- appear in a custom prototype chain,
- enforce a prototype-view policy.

The `getPrototypeOf` trap controls the immediate prototype reported for the
proxy.

## Quick Definition

The `getPrototypeOf` trap intercepts the proxy's internal
`[[GetPrototypeOf]]` operation.

```js
const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});
```

The trap must return:

- an object, representing the reported immediate prototype,
- or `null`, representing the end of the reported prototype chain.

It returns only one prototype link. It does not return the whole chain.

## Mental Model

With normal forwarding:

```text
Object.getPrototypeOf(proxy)
  -> proxy receives [[GetPrototypeOf]]
  -> getPrototypeOf(target) trap runs
  -> Reflect.getPrototypeOf(target)
  -> target's actual immediate prototype
  -> JavaScript validates the result
  -> caller receives that prototype
```

With a custom report:

```text
Object.getPrototypeOf(proxy)
  -> getPrototypeOf(target) trap runs
  -> trap returns virtualPrototype
  -> JavaScript validates the result
  -> caller receives virtualPrototype
```

Keep these two facts separate:

```text
reported prototype -> what prototype-inspection operations are told
actual prototype   -> the prototype stored on the target
```

For an extensible target, those objects are allowed to differ.

## Before This Page

The basic prototype lesson explains how to inspect normal objects:

```text
src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.md
```

The important foundation is:

```text
object -> immediate prototype -> next prototype -> ... -> null
```

This page focuses on what changes when the inspected object is a Proxy.

## Syntax

```js
const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return prototypeObjectOrNull;
  },
});
```

Normal forwarding:

```js
const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});
```

## Parameter

The trap receives one parameter.

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |

Example:

```js
const target = {};

const proxy = new Proxy(target, {
  getPrototypeOf(receivedTarget) {
    console.log(receivedTarget === target);

    return Reflect.getPrototypeOf(receivedTarget);
  },
});

Object.getPrototypeOf(proxy);
// true
```

There is no `property` parameter because this operation is not asking about one
property. It is asking for the object's immediate prototype.

There is no `receiver` parameter because the trap is reporting a prototype,
not evaluating a getter or setter with a particular `this` value.

### Trap `this`

Inside method syntax, trap `this` refers to the handler object:

```js
const handler = {
  label: 'profile handler',

  getPrototypeOf(target) {
    console.log(this.label);

    return Reflect.getPrototypeOf(target);
  },
};
```

`this` is not the target or the proxy.

## Return Value

The result must be an object or `null`:

```js
getPrototypeOf() {
  return someObject;
}
```

```js
getPrototypeOf() {
  return null;
}
```

A primitive result is invalid:

```js
const proxy = new Proxy({}, {
  getPrototypeOf() {
    return 'not an object';
  },
});

Object.getPrototypeOf(proxy);
// TypeError
```

Forgetting to return also fails because a function with no explicit return
produces `undefined`, which is a primitive:

```js
getPrototypeOf(target) {
  Reflect.getPrototypeOf(target);
  // No return, so the result is undefined.
}
```

Write:

```js
return Reflect.getPrototypeOf(target);
```

## Normal Forwarding With `Reflect.getPrototypeOf()`

`Reflect.getPrototypeOf(target)` performs normal prototype inspection on the
target.

```js
const sharedProfile = {
  describe() {
    return `${this.name} is learning Proxy`;
  },
};

const target = Object.create(sharedProfile);
target.name = 'Asha';

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy) === sharedProfile);
// true

console.log(proxy.describe());
// Asha is learning Proxy
```

The flow is:

1. `Object.getPrototypeOf(proxy)` requests the proxy's prototype.
2. The proxy runs `getPrototypeOf(target)`.
3. `Reflect.getPrototypeOf(target)` reads the target's real prototype.
4. The trap returns `sharedProfile`.
5. JavaScript validates and returns that object.

`Reflect.getPrototypeOf()` fits the trap well because both operations use the
same object-or-`null` result shape.

### An Omitted Trap Forwards Automatically

A Proxy does not require every trap:

```js
const target = Object.create(sharedProfile);
const proxy = new Proxy(target, {});

console.log(Object.getPrototypeOf(proxy) === sharedProfile);
// true
```

When `getPrototypeOf` is absent, the proxy automatically delegates the internal
operation to its target.

Use an explicit forwarding trap when you need to add behavior such as logging.
Use an empty handler when no customization is needed.

## It Reports One Immediate Prototype

The trap answers one step of the chain:

```js
const firstPrototype = {};
const secondPrototype = {};

Object.setPrototypeOf(firstPrototype, secondPrototype);

const target = Object.create(firstPrototype);
const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy) === firstPrototype); // true
console.log(Object.getPrototypeOf(firstPrototype) === secondPrototype); // true
```

The first call goes through the proxy and returns `firstPrototype`.

Inspecting `firstPrototype` is a separate operation. Because
`firstPrototype` is an ordinary object, that second inspection does not run the
proxy's trap.

## Which Operations Run The Trap?

Common callers include:

| Operation | Why it needs prototype information |
|---|---|
| `Object.getPrototypeOf(proxy)` | Directly asks for the immediate prototype |
| `Reflect.getPrototypeOf(proxy)` | Directly asks for the immediate prototype |
| `proxy.__proto__` | Its inherited getter asks the receiver for its prototype |
| `possiblePrototype.isPrototypeOf(proxy)` | Walks the proxy's reported prototype chain |
| `proxy instanceof Constructor` | Looks for `Constructor.prototype` in the reported chain |

They use different syntax, but each can reach the proxy's
`[[GetPrototypeOf]]` internal operation.

## Direct Prototype Inspection

Both direct inspection methods invoke the trap:

```js
const prototype = {};
let trapRuns = 0;

const proxy = new Proxy({}, {
  getPrototypeOf() {
    trapRuns += 1;

    return prototype;
  },
});

console.log(Object.getPrototypeOf(proxy) === prototype); // true
console.log(Reflect.getPrototypeOf(proxy) === prototype); // true
console.log(trapRuns); // 2
```

For an object argument, both callers receive the same trap result.

## Why `proxy.__proto__` Runs The Trap

`__proto__` is not a normal data property that stores the prototype. It is a
legacy accessor inherited from `Object.prototype`.

Conceptually, this read:

```js
proxy.__proto__;
```

does the following:

```text
1. Find the inherited __proto__ getter.
2. Run that getter with proxy as its receiver.
3. The getter asks proxy for [[GetPrototypeOf]].
4. proxy runs its getPrototypeOf trap.
```

Example:

```js
const reportedPrototype = {};

const proxy = new Proxy({}, {
  getPrototypeOf() {
    return reportedPrototype;
  },
});

console.log(proxy.__proto__ === reportedPrototype);
// true
```

Prefer `Object.getPrototypeOf()` or `Reflect.getPrototypeOf()` in new code.
They state the operation directly and avoid relying on the legacy accessor.

If the proxy also defines a `get` trap, reading the `__proto__` property can
first run `get`. If that read reaches the inherited `__proto__` getter, the
getter then requests `[[GetPrototypeOf]]` and runs `getPrototypeOf`.

## Why `isPrototypeOf()` Runs The Trap

`possiblePrototype.isPrototypeOf(value)` asks whether `possiblePrototype`
appears anywhere in `value`'s prototype chain.

```js
const reportedPrototype = {};

const proxy = new Proxy({}, {
  getPrototypeOf() {
    return reportedPrototype;
  },
});

console.log(reportedPrototype.isPrototypeOf(proxy));
// true
```

The check begins by asking `proxy` for its immediate prototype. That request
runs the trap, which returns `reportedPrototype`. Because the returned object
matches the object being searched for, the check returns `true`.

If the first returned object does not match, JavaScript continues upward from
that returned object until it finds the candidate or reaches `null`.

## Why `instanceof` Runs The Trap

A standard `instanceof` check asks whether the constructor's `.prototype`
object appears in the value's prototype chain.

```js
function VirtualRecord() {}

const reportedPrototype = VirtualRecord.prototype;

const proxy = new Proxy({}, {
  getPrototypeOf() {
    return reportedPrototype;
  },
});

console.log(proxy instanceof VirtualRecord);
// true
```

The check is conceptually:

```text
prototype to find: VirtualRecord.prototype
value to inspect:  proxy

proxy.[[GetPrototypeOf]]()
  -> getPrototypeOf trap
  -> reportedPrototype

reportedPrototype === VirtualRecord.prototype
  -> true
```

This describes the standard `instanceof` behavior. A constructor may define a
custom `Symbol.hasInstance` method, in which case that custom method controls
the check.

## Reporting A Virtual Prototype

When the target is extensible, the trap may report a different prototype:

```js
const actualPrototype = {
  source: 'actual prototype',
};

const virtualPrototype = {
  source: 'reported prototype',
};

const target = Object.create(actualPrototype);

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return virtualPrototype;
  },
});

console.log(Object.getPrototypeOf(proxy) === virtualPrototype); // true
console.log(Object.getPrototypeOf(target) === actualPrototype); // true
```

The two inspections deliberately answer different questions:

```text
Object.getPrototypeOf(proxy)  -> prototype reported by the trap
Object.getPrototypeOf(target) -> target's actual stored prototype
```

The custom result is often called a virtual prototype because the proxy reports
it without storing it on the target.

## Reporting Does Not Change The Target

Returning a prototype is not a prototype mutation:

```js
getPrototypeOf() {
  return virtualPrototype;
}
```

That return statement does not perform this operation:

```js
Object.setPrototypeOf(target, virtualPrototype);
```

It only supplies the answer for the current prototype-inspection request.

The target keeps its actual prototype unless some separate operation changes
it.

## Reporting Does Not Redirect Property Lookup

This distinction is easy to miss.

```js
const actualPrototype = {
  source: 'actual prototype',
};

const virtualPrototype = {
  source: 'reported prototype',

  describe() {
    return 'virtual behavior';
  },
};

const target = Object.create(actualPrototype);

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return virtualPrototype;
  },
});

console.log(Object.getPrototypeOf(proxy) === virtualPrototype); // true
console.log(proxy.source); // actual prototype
console.log(proxy.describe); // undefined
```

Why are these results different?

```text
Object.getPrototypeOf(proxy)
  -> uses [[GetPrototypeOf]]
  -> runs getPrototypeOf
  -> receives virtualPrototype

proxy.source
  -> uses [[Get]]
  -> no get trap, so Proxy forwards to target
  -> target follows its actual prototype chain
  -> finds actualPrototype.source
```

The `getPrototypeOf` trap controls prototype reports. The `get` operation
controls ordinary property reads. One trap does not silently replace the other.

This can create a deliberately unusual view:

```text
prototype inspection says -> virtualPrototype
ordinary value lookup says -> actualPrototype
```

Use such behavior carefully because callers may reasonably expect prototype
inspection and inherited behavior to agree.

## Coordinating Virtual Reports With Property Reads

If the reported prototype should also provide values, the handler must define
that policy explicitly.

```js
const target = {
  name: 'Ravi',
};

const virtualPrototype = {
  describe() {
    return `${this.name} uses coordinated virtual behavior`;
  },
};

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return virtualPrototype;
  },

  get(target, property, receiver) {
    if (Reflect.has(target, property)) {
      return Reflect.get(target, property, receiver);
    }

    return Reflect.get(virtualPrototype, property, receiver);
  },
});

console.log(Object.getPrototypeOf(proxy) === virtualPrototype); // true
console.log(proxy.describe());
// Ravi uses coordinated virtual behavior
```

The `get` trap performs two steps:

1. If the target or its actual chain has the property, use the normal target
   value.
2. Otherwise, deliberately look on `virtualPrototype`.

When `proxy.describe()` runs:

```text
read proxy.describe
  -> get trap does not find describe on target
  -> get trap obtains describe from virtualPrototype

call the returned method with this === proxy
  -> method reads this.name
  -> get trap finds name on target
  -> result uses "Ravi"
```

This is custom handler logic, not automatic behavior supplied by
`getPrototypeOf`.

## Returning `null`

`null` is a valid result. It means there is no next object in the reported
prototype chain.

Normal forwarding can return `null` for a null-prototype target:

```js
const target = Object.create(null);

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy));
// null
```

An extensible ordinary target may also be given a virtual `null` report:

```js
const target = {};

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return null;
  },
});

console.log(Object.getPrototypeOf(proxy)); // null
console.log(Object.prototype.isPrototypeOf(proxy)); // false
console.log(typeof proxy.toString); // function
```

The last two results reinforce the earlier distinction:

- prototype-chain inspection follows the trap's `null` report,
- ordinary property lookup still follows the target's actual chain and finds
  `Object.prototype.toString`.

## `Object.create(proxy)` Does Not Run The Trap

`Object.create(prototypeObject)` uses the exact object passed to it as the new
object's prototype.

```js
const parentProxy = new Proxy({}, {
  getPrototypeOf(target) {
    console.log('trap ran');

    return Reflect.getPrototypeOf(target);
  },
});

const child = Object.create(parentProxy);
```

This means:

```text
child -> parentProxy
```

It does not mean:

```text
child -> Object.getPrototypeOf(parentProxy)
```

JavaScript does not need to inspect `parentProxy` before storing it as the
child's prototype. Therefore, creating `child` does not run the parent's
`getPrototypeOf` trap.

These checks make the relationship clear:

```js
let trapRuns = 0;

const parentProxy = new Proxy({}, {
  getPrototypeOf(target) {
    trapRuns += 1;

    return Reflect.getPrototypeOf(target);
  },
});

const child = Object.create(parentProxy);

console.log(Object.getPrototypeOf(child) === parentProxy); // true
console.log(trapRuns); // 0

Object.getPrototypeOf(parentProxy);
console.log(trapRuns); // 1
```

`Object.getPrototypeOf(child)` inspects the ordinary `child` and returns its
stored prototype, `parentProxy`. It does not inspect the prototype of
`parentProxy`.

The trap runs only in the final line where `parentProxy` itself is inspected.

## The Non-Extensible Target Invariant

JavaScript allows a virtual prototype only while the target is extensible.

If the target is non-extensible, the trap must return the target's actual
prototype exactly.

```text
extensible target:
  trap may return the actual prototype, another object, or null

non-extensible target:
  trap must return the exact actual prototype
```

The comparison uses object identity. A different empty object is still a
different prototype.

### Invalid Mismatch

```js
const target = Object.preventExtensions({});
const differentPrototype = {};

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return differentPrototype;
  },
});

Object.getPrototypeOf(proxy);
// TypeError
```

The target's actual prototype is `Object.prototype`, but the trap reports
`differentPrototype`.

Because the target is non-extensible, JavaScript checks that fixed fact and
rejects the mismatch.

### Valid Exact Result

```js
const target = Object.preventExtensions({});

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy) === Object.prototype);
// true
```

`Reflect.getPrototypeOf(target)` obtains the exact prototype that the invariant
requires.

This is one reason it is the safest default forwarding operation.

## A Valid Report Can Later Become Invalid

Extensibility is checked when the proxy operation runs.

```js
const target = {};
const virtualPrototype = {};

const proxy = new Proxy(target, {
  getPrototypeOf() {
    return virtualPrototype;
  },
});

console.log(Object.getPrototypeOf(proxy) === virtualPrototype);
// true

Object.preventExtensions(target);

Object.getPrototypeOf(proxy);
// TypeError
```

Before `Object.preventExtensions(target)`:

- the target is extensible,
- a different virtual prototype is allowed.

Afterward:

- the target is non-extensible,
- the trap must report the target's actual prototype,
- returning the old virtual object now violates the invariant.

The trap code did not change. The target fact against which its result is
validated changed.

## Direct Target Inspection Bypasses The Trap

Only operations performed through the proxy are intercepted.

```js
let trapRuns = 0;
const target = {};

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    trapRuns += 1;

    return Reflect.getPrototypeOf(target);
  },
});

Object.getPrototypeOf(target);
console.log(trapRuns); // 0

Object.getPrototypeOf(proxy);
console.log(trapRuns); // 1
```

The proxy cannot observe code that directly inspects the raw target.

## What `getPrototypeOf` Does Not Intercept

The trap handles requests for the proxy's immediate prototype. It does not
handle every operation related to objects or inheritance.

| Operation | Relevant behavior |
|---|---|
| `Object.setPrototypeOf(proxy, prototype)` | Uses the `setPrototypeOf` trap |
| `proxy.name` | Uses the `get` trap or normal target forwarding |
| `proxy.name = value` | Uses the `set` trap |
| `Object.create(proxy)` | Stores the proxy itself as the new object's prototype |
| `Object.getPrototypeOf(target)` | Bypasses the proxy |

Reading `proxy.__proto__` is a special-looking case because the inherited
legacy getter eventually requests `[[GetPrototypeOf]]` from the proxy.

## Important Notes

- The trap intercepts the proxy's `[[GetPrototypeOf]]` internal operation.
- It receives only the original `target`.
- Trap `this` refers to the handler object.
- It must return an object or `null`.
- It reports one immediate prototype, not the whole chain.
- `Reflect.getPrototypeOf(target)` is the normal forwarding operation.
- An omitted trap forwards automatically.
- Direct inspection methods, the legacy `__proto__` getter,
  `isPrototypeOf()`, and standard `instanceof` can run the trap.
- A virtual report does not mutate the target's prototype.
- A virtual report does not automatically redirect ordinary property lookup.
- A separate `get` policy can coordinate virtual inherited behavior.
- `Object.create(proxy)` uses the proxy itself as the child's prototype.
- A primitive trap result throws `TypeError`.
- A non-extensible target requires the exact actual prototype.
- Direct target inspection bypasses the trap.

## Common Mistakes

### Returning A Primitive

```js
getPrototypeOf() {
  return 'Object.prototype';
}
```

The name of a prototype is not a prototype object. Return the object itself:

```js
return Object.prototype;
```

### Forgetting `return`

```js
getPrototypeOf(target) {
  Reflect.getPrototypeOf(target);
}
```

This produces `undefined` and throws `TypeError`.

Write:

```js
return Reflect.getPrototypeOf(target);
```

### Expecting The Trap To Return The Whole Chain

```js
getPrototypeOf() {
  return [firstPrototype, secondPrototype];
}
```

The array is itself one object, so it would be reported as the immediate
prototype. The trap should return one prototype link.

### Assuming A Virtual Report Changes The Target

Returning `virtualPrototype` does not call `Object.setPrototypeOf()` and does
not alter the target.

### Assuming A Virtual Report Supplies Inherited Methods

Without coordinated `get` behavior, ordinary property lookup still uses the
target's actual lookup path.

### Thinking `Object.create(proxy)` Copies The Proxy's Prototype

It uses `proxy` itself as the newly created object's prototype. It does not
first call `Object.getPrototypeOf(proxy)`.

### Ignoring Target Extensibility

A custom result that works today can throw after the target becomes
non-extensible.

### Returning An Equivalent-Looking Object For A Locked Target

```js
getPrototypeOf() {
  return {};
}
```

Two empty objects are different identities. A non-extensible target requires
its exact actual prototype object.

### Forwarding To The Proxy Again

Inside the trap, forward to `target`:

```js
return Reflect.getPrototypeOf(target);
```

Calling `Reflect.getPrototypeOf(proxy)` from that same proxy's trap re-enters
the trap and can recurse indefinitely.

### Using `__proto__` As The Preferred API

The accessor is useful for understanding what can invoke the trap, but
`Object.getPrototypeOf()` or `Reflect.getPrototypeOf()` communicates the intent
more clearly.

## When To Use The Trap

Use `getPrototypeOf` when you need to:

- observe prototype inspection through a proxy,
- preserve normal inspection while adding logging,
- report a virtual prototype for an extensible target,
- customize prototype-based checks such as `isPrototypeOf()` or standard
  `instanceof`,
- coordinate a deliberate virtual object model across several traps.

Do not use it when you only need to:

- read ordinary properties; use `get`,
- change an object's prototype; use `setPrototypeOf`,
- inspect an ordinary object without customization; call
  `Object.getPrototypeOf()` or `Reflect.getPrototypeOf()` directly,
- create an object with a chosen prototype; use `Object.create()`.

## Runnable Practice File

Run all examples with:

```bash
node src/proxy/handlers/getPrototypeOf/getPrototypeOf.js
```

Practice file:

```text
src/proxy/handlers/getPrototypeOf/getPrototypeOf.js
```

## Related Notes

- [Object.getPrototypeOf()](../../../object/methods/static-methods/getPrototypeOf/getPrototypeOf.md)
- [Object.prototype.isPrototypeOf()](../../../object/methods/instance/isPrototypeOf/isPrototypeOf.md)
- [Proxy `get` Trap](../get/get.md)
- [Proxy Invariants](../../concepts/invariants/invariants.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Internal Methods And Proxy Traps](../../organized-notes/02-internal-methods-and-proxy-traps.md)
- [Proxy And Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf)
- [MDN: `Reflect.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf)
- [MDN: `Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- [ECMAScript: Proxy `[[GetPrototypeOf]]`](https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-getprototypeof)
