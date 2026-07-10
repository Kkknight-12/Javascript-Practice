# Proxy `get` Trap

## What Problem Does It Solve?

A normal property read returns whatever JavaScript finds on the object or its
prototype chain.

```js
const user = {
  name: 'Asha',
};

console.log(user.name);
// Asha

console.log(user.language);
// undefined
```

Sometimes you want to run custom logic whenever a property is read.

For example, you may want to:

- record which properties are being used,
- return a fallback for a missing property,
- create a virtual property that is calculated when read,
- transform a value before returning it,
- control which value outside code receives.

The Proxy `get` trap gives you that control.

## Quick Definition

The `get` trap intercepts property reads performed through a proxy.

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});
```

The trap runs before the property value is returned.

Whatever the trap returns becomes the result of the property read.

## Mental Model

Without a `get` trap:

```text
proxy.name
  -> normal read from target
  -> property value
```

With a `get` trap:

```text
proxy.name
  -> get(target, 'name', receiver)
  -> custom logic
  -> returned value
```

A common forwarding pattern is:

```text
read through proxy
  -> get trap
  -> custom work
  -> Reflect.get(target, property, receiver)
  -> normal property value
```

## Syntax

```js
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    // Return the value for this property read.
  },
});
```

The parameter names are conventions. JavaScript passes the arguments by
position, so shorter names also work:

```js
const proxy = new Proxy(target, {
  get(t, key, r) {
    return Reflect.get(t, key, r);
  },
});
```

The longer names are usually easier to understand while learning.

## Parameters

| Parameter | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `property` | The string or symbol property key being read |
| `receiver` | The object through which the property read started |

Consider this example:

```js
const userTarget = {
  name: 'Asha',
};

const user = new Proxy(userTarget, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

console.log(user.name);
```

For `user.name`, the trap receives:

| Parameter | Value |
|---|---|
| `target` | `userTarget` |
| `property` | `'name'` |
| `receiver` | `user`, the proxy through which the read started |

### `target`

`target` is always the original object passed as the first argument to
`new Proxy()`.

```js
const target = {
  name: 'Asha',
};

const proxy = new Proxy(target, {
  get(targetArgument, property, receiver) {
    console.log(targetArgument === target);
    // true

    return Reflect.get(targetArgument, property, receiver);
  },
});
```

### `property`

`property` identifies the key being read.

It is either:

- a string,
- or a symbol.

```js
proxy.name;
// property is 'name'

proxy['topic'];
// property is 'topic'

proxy[0];
// property is '0', a string

proxy[someSymbol];
// property is someSymbol
```

Even a numeric array index reaches the trap as a string property key.

### `receiver`

`receiver` is the object through which the read started.

For a direct read such as `proxy.name`, the receiver is usually the proxy.

It can be a different object when that object inherits from the proxy:

```js
const child = Object.create(proxy);

child.name;
```

Here the property may be found through `proxy`, but the read started from
`child`, so `receiver` is `child`.

This matters when the property is a getter because `receiver` becomes the
getter's `this` value when forwarded with `Reflect.get()`.

## Return Value

The `get` trap may return any JavaScript value.

```js
const proxy = new Proxy({}, {
  get() {
    return 10;
  },
});

console.log(proxy.anything);
// 10
```

The returned value does not need to exist on the target.

Returning a value also does not add that property to the target. It only
controls the result of that particular read.

If the trap does not return anything, it returns `undefined`:

```js
const proxy = new Proxy(
  {
    name: 'Asha',
  },
  {
    get(target, property) {
      console.log('Reading:', property);
    },
  },
);

console.log(proxy.name);
// Reading: name
// undefined
```

## Which Operations Trigger `get`?

The `get` trap handles operations that ask a proxy for a property value.

| Operation | Property received by the trap |
|---|---|
| `proxy.name` | `'name'` |
| `proxy['name']` | `'name'` |
| `proxy[key]` | The value stored in `key` |
| `proxy[0]` | `'0'` |
| `proxy.method` | `'method'` |
| `Reflect.get(proxy, 'name')` | `'name'` |

A method call begins with a property read:

```js
proxy.describe();
```

JavaScript must first read `proxy.describe` to obtain the function. That read
triggers the `get` trap.

If the method later reads other properties through `this`, those reads may
also trigger the trap:

```js
const readLog = [];

const profile = new Proxy(
  {
    name: 'Asha',

    describe() {
      return this.name;
    },
  },
  {
    get(target, property, receiver) {
      readLog.push(String(property));

      return Reflect.get(target, property, receiver);
    },
  },
);

console.log(profile.describe());
// Asha

console.log(readLog);
// [ 'describe', 'name' ]
```

The first read gets the `describe` method. The second read comes from
`this.name` inside that method.

## Normal Forwarding With `Reflect.get()`

Use `Reflect.get()` when you want to add custom work and then continue with the
normal property read.

```js
const readLog = [];

const user = new Proxy(
  {
    name: 'Asha',
  },
  {
    get(target, property, receiver) {
      readLog.push(String(property));

      return Reflect.get(target, property, receiver);
    },
  },
);

console.log(user.name);
// Asha

console.log(readLog);
// [ 'name' ]
```

The trap has two jobs:

```js
readLog.push(String(property));
```

This is the custom behavior.

```js
return Reflect.get(target, property, receiver);
```

This performs and returns the normal property read.

## String, Numeric, and Symbol Keys

The `property` argument should not be treated as though it is always an
ordinary string.

### Numeric Index

Object property keys are strings or symbols. A numeric index is converted to a
string key before the trap receives it.

```js
let observedKey;

const values = new Proxy(['first'], {
  get(target, property, receiver) {
    observedKey = property;

    return Reflect.get(target, property, receiver);
  },
});

console.log(values[0]);
// first

console.log(observedKey);
// 0

console.log(typeof observedKey);
// string
```

The console displays `0`, but its type is `string`, so the actual key is
`'0'`.

### Symbol Key

Symbols can also be property keys.

```js
const token = Symbol('token');

const session = new Proxy(
  {
    [token]: 'abc123',
  },
  {
    get(target, property, receiver) {
      console.log(String(property));

      return Reflect.get(target, property, receiver);
    },
  },
);

console.log(session[token]);
// Symbol(token)
// abc123
```

Use `String(property)` when converting a key for logging. It works for normal
string keys and symbol keys.

## Missing-Property Fallback

A `get` trap can return a useful fallback instead of `undefined`.

```js
const translations = new Proxy(
  {
    Hello: 'Hola',
    Bye: 'Adios',
  },
  {
    get(target, phrase, receiver) {
      if (Reflect.has(target, phrase)) {
        return Reflect.get(target, phrase, receiver);
      }

      return typeof phrase === 'string' ? phrase : undefined;
    },
  },
);

console.log(translations.Hello);
// Hola

console.log(translations.Welcome);
// Welcome
```

For `translations.Hello`:

1. `Reflect.has(target, 'Hello')` returns `true`.
2. `Reflect.get()` returns the stored translation.

For `translations.Welcome`:

1. `Reflect.has(target, 'Welcome')` returns `false`.
2. The trap returns the original phrase as the fallback.

`Reflect.has()` checks both own and inherited properties.

If the fallback should consider only own properties, use:

```js
if (Object.hasOwn(target, phrase)) {
  return Reflect.get(target, phrase, receiver);
}
```

Choose the check based on whether inherited properties should count as real
values for your use case.

## Virtual Properties

A virtual property is calculated by the trap even though the property is not
stored on the target.

```js
const learnerTarget = {
  firstName: 'Mina',
  lastName: 'Shah',
};

const learner = new Proxy(learnerTarget, {
  get(target, property, receiver) {
    if (property === 'fullName') {
      const firstName = Reflect.get(target, 'firstName', receiver);
      const lastName = Reflect.get(target, 'lastName', receiver);

      return `${firstName} ${lastName}`;
    }

    return Reflect.get(target, property, receiver);
  },
});

console.log(learner.fullName);
// Mina Shah

console.log(Object.hasOwn(learnerTarget, 'fullName'));
// false
```

The flow for `learner.fullName` is:

```text
read learner.fullName
  -> get trap receives 'fullName'
  -> trap reads firstName and lastName
  -> trap returns 'Mina Shah'
```

The target still contains only `firstName` and `lastName`.

## Why `receiver` Matters

The difference between `target` and `receiver` becomes visible with getters
and inheritance.

```js
const greetingTarget = {
  name: 'target',

  get greeting() {
    return `Hello, ${this.name}`;
  },
};

const greetingProxy = new Proxy(greetingTarget, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

const student = Object.create(greetingProxy);

Object.defineProperty(student, 'name', {
  value: 'Ravi',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(student.greeting);
// Hello, Ravi
```

The relationship is:

```text
student
  -> inherits from greetingProxy
       -> get trap forwards the read to greetingTarget
```

`student` has `greetingProxy` as its direct prototype. The proxy forwards the
property read internally to `greetingTarget`; the target is not added as
another prototype link.

When `student.greeting` runs:

1. The read starts from `student`.
2. JavaScript finds `greeting` through `greetingProxy`.
3. The `get` trap receives `student` as `receiver`.
4. `Reflect.get(target, 'greeting', student)` calls the getter with
   `this === student`.
5. The getter reads the own `name` property on `student`, which is `'Ravi'`.

This is why normal forwarding uses all three arguments:

```js
return Reflect.get(target, property, receiver);
```

Direct target access can change the getter's `this` value:

```js
return target[property];
```

In this example, direct access would run the getter with
`this === greetingTarget`, producing `'Hello, target'` instead of
`'Hello, Ravi'`.

## The Locked-Property Invariant

A `get` trap can customize many reads, but it cannot contradict certain locked
properties on the target.

Consider an own data property that is both:

- non-writable,
- and non-configurable.

```js
const target = {};

Object.defineProperty(target, 'version', {
  value: '1.0',
  writable: false,
  configurable: false,
});
```

The `get` trap must report the real value for that property.

```js
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

The trap returned `'2.0'`, but the locked target property stores `'1.0'`.
JavaScript detects the contradiction and throws a `TypeError`.

The `get` trap has two closely related safety rules:

| Locked target property | Required trap result |
|---|---|
| Own data property with `configurable: false` and `writable: false` | The exact stored value |
| Own accessor property with `configurable: false` and no getter | `undefined` |

These rules keep proxies consistent with target properties that JavaScript has
made impossible to redefine.

## What `get` Does Not Intercept

The `get` trap is only for property-value reads.

| Operation | Matching trap |
|---|---|
| `proxy.name` | `get` |
| `proxy.name = 'Mina'` | `set` |
| `'name' in proxy` | `has` |
| `delete proxy.name` | `deleteProperty` |
| `Reflect.ownKeys(proxy)` | `ownKeys` |

Reading directly from the target also bypasses the proxy:

```js
target.name;
```

Only operations performed through the proxy can reach its traps.

## Important Notes

- The `get` trap intercepts the `[[Get]]` internal object operation.
- It runs for property reads through the proxy.
- `property` is always a string or symbol.
- Numeric indexes such as `proxy[0]` arrive as string keys such as `'0'`.
- The trap may return any value.
- If the trap returns nothing, the property read produces `undefined`.
- Returning a virtual value does not add that property to the target.
- `Reflect.get(target, property, receiver)` is the normal forwarding pattern.
- `receiver` preserves the correct `this` value for getters.
- Direct target reads bypass the trap.
- Locked target properties place limits on what the trap may report.
- Inside the trap, `this` is the handler object, not the target or receiver.

## When To Use It

Use a `get` trap when property reads need behavior that applies across an
object, such as:

- logging or debugging property access,
- returning defaults for missing properties,
- providing computed or virtual properties,
- adapting values from another API,
- applying read-time validation or transformation,
- forwarding reads while preserving getter behavior.

For a single calculated property on a normal object, a regular getter is often
simpler:

```js
const user = {
  firstName: 'Asha',
  lastName: 'Shah',

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};
```

Use a proxy when interception needs to work dynamically across many keys or
when the key is not known in advance.

## Common Mistakes

### Mistake 1: Forgetting To Return A Value

```js
get(target, property) {
  console.log(property);
}
```

The read produces `undefined` because the trap returned nothing.

Forward the normal read when that is your intention:

```js
get(target, property, receiver) {
  console.log(property);

  return Reflect.get(target, property, receiver);
}
```

### Mistake 2: Forwarding To The Proxy

```js
get(target, property, receiver) {
  return Reflect.get(proxy, property, receiver);
}
```

Reading from the same proxy can trigger the same `get` trap again and lead to
recursion.

Forward to the `target` argument:

```js
return Reflect.get(target, property, receiver);
```

### Mistake 3: Assuming Every Key Is A Normal String

```js
get(target, property, receiver) {
  console.log(`Reading ${property}`);

  return Reflect.get(target, property, receiver);
}
```

Symbol keys need safe conversion.

```js
console.log(`Reading ${String(property)}`);
```

### Mistake 4: Losing The Getter Receiver

```js
return target[property];
```

This direct form can give a getter the wrong `this` value when inheritance is
involved.

Use:

```js
return Reflect.get(target, property, receiver);
```

### Mistake 5: Choosing The Wrong Existence Check

```js
Reflect.has(target, property);
```

This includes inherited properties.

Use `Object.hasOwn(target, property)` when the fallback logic should count only
the target's own properties.

### Mistake 6: Expecting Target Reads To Be Intercepted

```js
proxy.name;
// get trap runs

target.name;
// get trap does not run
```

Application code must read through the proxy when it depends on the proxy's
custom behavior.

## Runnable Practice File

Run the paired file from the repository root:

```bash
node src/proxy/handlers/get/get.js
```

The runnable file contains learner-facing comments, terminal labels, and
expected output comments for:

- normal forwarding,
- dot notation, bracket notation, and `Reflect.get(proxy, key)`,
- method-related property reads,
- numeric and symbol keys,
- missing-property fallbacks,
- virtual properties,
- inherited getters and `receiver`,
- the locked-property invariant,
- direct target access bypassing the proxy.

## Related Pages

- [Proxy Basics](../../concepts/proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../../concepts/reflect-forwarding/reflect-forwarding.md)
- [Part 4: The `get` Trap](../../organized-notes/04-get-trap.md)
- [Proxy and Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
- [MDN: `Reflect.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
- [ECMAScript specification: Proxy `[[Get]]`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver)
