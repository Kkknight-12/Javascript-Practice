# Proxy `receiver`

## What Problem Does It Solve?

Proxy traps often receive both `target` and `receiver`:

```js
get(target, property, receiver) {
  return Reflect.get(target, property, receiver);
}
```

At first, these can seem like two names for the same object.

They are not.

- `target` tells JavaScript which wrapped object the underlying property
  operation starts from.
- `receiver` tells JavaScript which object the operation was performed through.

The distinction matters when:

- a property is a getter or setter,
- another object inherits from a proxy,
- the accessor uses `this`,
- a write may belong on an inheriting object instead of the target.

Without the correct receiver, a getter or setter can use the wrong object as
`this` and produce the wrong result.

## Quick Definition

`receiver` is the object through which a property operation started.

For a `get` operation:

```text
receiver becomes this inside a getter
```

For a `set` operation:

```text
receiver becomes this inside a setter
and may receive the written property
```

That is why normal proxy forwarding includes the receiver:

```js
return Reflect.get(target, property, receiver);
```

```js
return Reflect.set(target, property, value, receiver);
```

## Mental Model

Think of `target` as the object where the underlying property operation begins
and `receiver` as the object currently using that operation.

For a direct proxy read:

```text
outside code reads proxy.name
  -> target is the wrapped object
  -> receiver is the proxy
```

For an inherited read:

```text
admin reads admin.name
  -> admin inherits from the proxy
  -> target is still the wrapped object
  -> receiver is admin
```

The target stays fixed for a particular proxy. The receiver can change based
on where the operation started.

## The Objects Involved

The words become easier to separate when each role is named explicitly.

| Role | Meaning |
|---|---|
| `target` | The original object wrapped by the proxy |
| `receiver` | The object through which the read or write started |
| handler | The object containing traps such as `get` and `set` |
| `this` inside a trap method | The handler object |
| `this` inside a getter or setter | The receiver when forwarded correctly |

Consider a direct read:

```js
const target = {
  topic: 'Proxy',
};

let proxy;

proxy = new Proxy(target, {
  get(targetArgument, property, receiver) {
    console.log(targetArgument === target);
    // true

    console.log(receiver === proxy);
    // true

    return Reflect.get(targetArgument, property, receiver);
  },
});

console.log(proxy.topic);
// Proxy
```

Even in this simple example:

```text
target !== receiver
```

`target` is the wrapped object. `receiver` is the proxy through which the read
was performed.

## Start With Normal Getter Inheritance

Before adding a proxy, consider normal object inheritance:

```js
const baseUser = {
  _name: 'Guest',

  get name() {
    return this._name;
  },
};

const admin = Object.create(baseUser);

Object.defineProperty(admin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(admin.name);
// Admin
```

`Object.create(baseUser)` creates a new object and sets `baseUser` itself as
that new object's prototype:

```text
admin -> baseUser -> Object.prototype -> null
```

`admin` does not have its own `name` getter, so JavaScript finds the getter on
`baseUser`.

The important part is that the original read was:

```js
admin.name;
```

Therefore, the inherited getter runs with:

```js
this === admin;
```

Inside the getter:

```js
return this._name;
```

becomes:

```js
return admin._name;
```

That is why the result is `'Admin'` rather than `'Guest'`.

## How Incorrect Proxy Forwarding Breaks It

Now place a proxy between `admin` and `baseUser`:

```js
const wrongProxy = new Proxy(baseUser, {
  get(target, property) {
    return target[property];
  },
});

const admin = Object.create(wrongProxy);

Object.defineProperty(admin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(admin.name);
// Guest
```

The relationship is:

```text
admin
  -> inherits from wrongProxy
       -> get trap reads from baseUser target
```

`admin` has `wrongProxy` as its direct prototype. The proxy internally handles
the property operation using `baseUser` as its target. The target is not added
as another prototype link.

For `admin.name`, the trap receives:

```text
target   = baseUser
property = 'name'
receiver = admin
```

However, the trap ignores `receiver`:

```js
return target[property];
```

That line means:

```js
return baseUser.name;
```

Because the getter is now read directly from `baseUser`, it runs with:

```js
this === baseUser;
```

The getter reads:

```js
baseUser._name;
```

and returns `'Guest'`.

The proxy accidentally changed normal getter inheritance behavior.

## Correct Forwarding With `Reflect.get()`

Pass the receiver to `Reflect.get()` to preserve the object that started the
read:

```js
const userProxy = new Proxy(baseUser, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
});

const admin = Object.create(userProxy);

Object.defineProperty(admin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(admin.name);
// Admin
```

For this read:

```js
admin.name;
```

the forwarding call becomes conceptually:

```js
Reflect.get(baseUser, 'name', admin);
```

`Reflect.get()` begins the property lookup at `baseUser`. It finds the `name`
getter there.

It then uses `admin` as the getter's `this` value:

```js
this === admin;
```

Therefore:

```js
this._name;
```

reads:

```js
admin._name;
```

and returns `'Admin'`.

## Wrong And Correct Flow Compared

### Direct Target Access

```js
return target[property];
```

```text
admin.name
  -> proxy get trap
  -> baseUser.name
  -> getter this is baseUser
  -> baseUser._name
  -> 'Guest'
```

### Reflect Forwarding

```js
return Reflect.get(target, property, receiver);
```

```text
admin.name
  -> proxy get trap
  -> Reflect.get(baseUser, 'name', admin)
  -> getter this is admin
  -> admin._name
  -> 'Admin'
```

After the proxy trap is reached, the delegated `Reflect.get()` lookup begins at
the target, but the accessor runs for the receiver.

## Direct Proxy Receiver Versus Inherited Receiver

The receiver depends on the object through which the read began.

```js
const trace = [];
let userProxy;

userProxy = new Proxy(baseUser, {
  get(target, property, receiver) {
    const receiverName = receiver === userProxy ? 'proxy' : 'admin';
    trace.push(`${String(property)}:${receiverName}`);

    return Reflect.get(target, property, receiver);
  },
});
```

### Read Through An Inheriting Object

```js
const admin = Object.create(userProxy);

Object.defineProperty(admin, '_name', {
  value: 'Admin',
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(admin.name);
// Admin

console.log(trace);
// [ 'name:admin' ]
```

`admin` has its own `_name` property, but it does not have its own `name`
property or getter.

The lookup reaches `get name()` in this order:

```text
admin.name
  -> JavaScript checks admin for an own name property
  -> admin does not have name
  -> JavaScript checks admin's prototype, userProxy
  -> userProxy's get trap runs for 'name'
  -> Reflect.get() begins the lookup on baseUser
  -> Reflect.get() finds get name() on baseUser
  -> the getter runs with admin as this
```

`Object.create(userProxy)` made `userProxy` the direct prototype of `admin`.
That is how a request for `admin.name` reaches the proxy even though `name`
does not exist directly on `admin`.

The read started from `admin`, so the trap receives `admin` as `receiver`.
`Reflect.get(target, property, receiver)` then uses that receiver as the
getter's `this` value.

The getter then reads `admin._name`, which is an own property. That second read
does not need to continue through the proxy.

### Read Directly Through The Proxy

```js
trace.length = 0;

console.log(userProxy.name);
// Guest

console.log(trace);
// [ 'name:proxy', '_name:proxy' ]
```

This read follows a different path because it starts directly from the proxy:

```text
userProxy.name
  -> get trap runs for 'name'
  -> Reflect.get() finds get name() on baseUser
  -> the getter runs with userProxy as this
  -> getter evaluates this._name
  -> this._name means userProxy._name
  -> get trap runs again for '_name'
  -> Reflect.get() returns baseUser._name
  -> getter returns 'Guest'
```

The first trap call intercepts the request for `name`. Its `Reflect.get()` call
finds and runs the getter:

```js
get name() {
  return this._name;
}
```

For this direct read, `userProxy` is the receiver, so the getter runs with
`this === userProxy`.

Inside the getter:

```js
this._name;
```

means:

```js
userProxy._name;
```

That is another property read through the proxy. It causes the second trap call
for `_name`, which explains the two entries in the trace:

```text
[ 'name:proxy', '_name:proxy' ]
```

## Using An Explicit Receiver With `Reflect.get()`

You can observe receiver behavior without a proxy by passing a third argument
directly to `Reflect.get()`.

```js
const priceTarget = {
  currency: 'USD',
  amount: 100,

  get label() {
    return `${this.currency} ${this.amount}`;
  },
};

const rupeeView = {
  currency: 'INR',
  amount: 250,
};
```

Without an explicit receiver, `Reflect.get()` uses the target as receiver:

```js
console.log(Reflect.get(priceTarget, 'label'));
// USD 100
```

This behaves like:

```js
Reflect.get(priceTarget, 'label', priceTarget);
```

With an explicit receiver:

```js
console.log(Reflect.get(priceTarget, 'label', rupeeView));
// INR 250
```

`Reflect.get()` still finds the `label` getter on `priceTarget`, but the getter
runs with:

```js
this === rupeeView;
```

That is why it reads `rupeeView.currency` and `rupeeView.amount`.

## Receiver Matters To Accessors

A receiver is especially visible when the target property is an accessor:

- a getter for `get`,
- a setter for `set`.

For a plain data property, `Reflect.get()` returns the value stored on the
target:

```js
console.log(Reflect.get(priceTarget, 'amount', rupeeView));
// 100
```

Even though `rupeeView.amount` is `250`, the `amount` property being read is the
plain data property on `priceTarget`, so the result is `100`.

The receiver does not replace the target. It supplies the accessor's `this`
when an accessor is involved.

## Trap `this` Is Not The Receiver

There are two different uses of `this` to keep separate.

Inside a normal trap method, `this` is the handler object:

```js
let trapThisWasHandler = false;

const handler = {
  get(target, property, receiver) {
    trapThisWasHandler = this === handler;

    return Reflect.get(target, property, receiver);
  },
};

const proxy = new Proxy({ value: 42 }, handler);

console.log(proxy.value);
// 42

console.log(trapThisWasHandler);
// true
```

Inside a getter found during `Reflect.get()`, `this` is the receiver:

```text
this inside get trap  -> handler
this inside getter    -> receiver
```

The receiver is passed as a trap argument. It does not become the trap
method's own `this` value.

## `receiver` With `Reflect.set()`

The same idea also applies to property writes.

```js
Reflect.set(target, property, value, receiver);
```

When target and receiver differ, `Reflect.set()` uses the target's property
descriptor to decide whether and how the write may happen. The receiver may be
the object that receives the resulting property.

### Plain Data Property

```js
const settingsTarget = {
  theme: 'light',
};

const teamSettings = {};

console.log(
  Reflect.set(settingsTarget, 'theme', 'dark', teamSettings),
);
// true

console.log(settingsTarget.theme);
// light

console.log(teamSettings.theme);
// dark
```

The target provides the writable `theme` property rule. Because a separate
receiver was supplied, the new own `theme` value is placed on `teamSettings`.

### Setter Property

For a setter, receiver becomes the setter's `this` value:

```js
const scoreTarget = {
  set score(value) {
    this.savedScore = value;
  },
};

const scoreReceiver = {};

console.log(
  Reflect.set(scoreTarget, 'score', 90, scoreReceiver),
);
// true

console.log(scoreReceiver.savedScore);
// 90

console.log(Object.hasOwn(scoreTarget, 'savedScore'));
// false
```

`Reflect.set()` finds the setter on `scoreTarget`, but calls it with:

```js
this === scoreReceiver;
```

Therefore, `this.savedScore = value` stores `savedScore` on `scoreReceiver`.

## When Is The Receiver Different?

Common cases include:

### Direct Proxy Operation

```text
target   = wrapped object
receiver = proxy
```

### Object Inheriting From A Proxy

```text
target   = wrapped object
receiver = inheriting object
```

### Explicit Reflect Call

```js
Reflect.get(target, property, customReceiver);
Reflect.set(target, property, value, customReceiver);
```

```text
target   = first argument
receiver = explicitly supplied final argument
```

If the receiver argument is omitted from `Reflect.get()` or `Reflect.set()`, it
defaults to the target.

## Important Notes

- `target` and `receiver` are different roles.
- A proxy's target stays fixed, but the receiver can change per operation.
- A direct operation through a proxy usually has the proxy as receiver.
- An object inheriting from a proxy can become the receiver.
- `Object.create(proxy)` sets the proxy itself as the new object's prototype.
- `Reflect.get()` uses receiver as `this` for a getter.
- `Reflect.set()` uses receiver as `this` for a setter.
- A different `set` receiver may receive the resulting own property.
- Plain data reads still return the target property's stored value.
- Inside a trap method, `this` is the handler, not the receiver.
- Omitting the Reflect receiver makes it default to target.
- Passing receiver during forwarding preserves normal inheritance behavior.

## When To Use It

Pass receiver when a proxy trap is forwarding normal `get` or `set` behavior:

```js
const handler = {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },

  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
};
```

This is especially important when:

- the target has getters or setters,
- the proxy may be used as a prototype,
- methods or accessors rely on `this`,
- objects may inherit behavior through the proxy.

For a normal property read outside a proxy, you usually do not need to provide
an explicit receiver. `Reflect.get(target, property)` defaults it to the target.

## Common Mistakes

### Mistake 1: Assuming `target` And `receiver` Are The Same Object

For a direct proxy read:

```text
target   = wrapped object
receiver = proxy
```

They already have different identities before inheritance is involved.

### Mistake 2: Forwarding With `target[property]`

```js
get(target, property, receiver) {
  return target[property];
}
```

This can run an inherited getter with `target` as `this` and ignore the actual
receiver.

Use:

```js
return Reflect.get(target, property, receiver);
```

### Mistake 3: Passing `target` As The Receiver

```js
return Reflect.get(target, property, target);
```

This explicitly asks a getter to use target as `this`, recreating the same
problem as `target[property]`.

Forward the receiver supplied to the trap:

```js
return Reflect.get(target, property, receiver);
```

### Mistake 4: Assuming Receiver Is Always The Proxy

The proxy is the receiver for a direct read such as:

```js
proxy.name;
```

But another object can be the receiver:

```js
const child = Object.create(proxy);

child.name;
```

Here `child` is the receiver.

### Mistake 5: Confusing Trap `this` With Getter `this`

```text
trap method this -> handler
getter this      -> receiver
```

They belong to two different function calls.

### Mistake 6: Omitting Receiver During Proxy Forwarding

```js
return Reflect.get(target, property);
```

Because the third argument is omitted, `Reflect.get()` defaults receiver to
target. That can break getter inheritance.

Inside a `get` trap, forward all three values:

```js
return Reflect.get(target, property, receiver);
```

## Runnable Practice File

Run the paired file from the repository root:

```bash
node src/proxy/concepts/receiver/receiver.js
```

The runnable file contains learner-facing comments, terminal labels, and
expected output comments for:

- direct proxy target and receiver identities,
- normal getter inheritance,
- incorrect `target[property]` forwarding,
- correct `Reflect.get()` forwarding,
- direct-proxy and inherited receiver traces,
- explicit `Reflect.get()` receivers,
- trap `this` versus getter `this`,
- data-property and setter behavior with `Reflect.set()` receivers.

## Related Pages

- [Proxy Basics](../proxy-basics/proxy-basics.md)
- [Reflect Forwarding](../reflect-forwarding/reflect-forwarding.md)
- [Proxy `get` Trap](../../handlers/get/get.md)
- [Part 13: Getter Inheritance and `receiver`](../../organized-notes/13-getter-inheritance-and-receiver.md)
- [Proxy and Reflect Revision Sequence](../../proxy-reflect-revision-sequence.md)

## References

- [MDN: `handler.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
- [MDN: `Reflect.get()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get)
- [MDN: `handler.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
- [MDN: `Reflect.set()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set)
- [ECMAScript specification: Proxy `[[Get]]`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-object-internal-methods-and-internal-slots-get-p-receiver)
- [ECMAScript specification: Proxy `[[Set]]`](https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-object-internal-methods-and-internal-slots-set-p-v-receiver)
