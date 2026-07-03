# Object.defineProperty()

## What Problem Does It Solve?

`Object.defineProperty()` lets you define or change one property with precise
control over its descriptor.

Normal assignment is simple:

```js
const user = {};

user.name = 'Asha';
```

That creates an ordinary property.

`Object.defineProperty()` lets you decide details that assignment normally does
not show directly:

```js
const user = {};

Object.defineProperty(user, 'name', {
  value: 'Asha',
  enumerable: true,
  writable: true,
  configurable: true,
});
```

You can use it to create hidden properties, read-only properties, getter/setter
properties, and symbol properties.

## Quick Definition

`Object.defineProperty(object, propertyKey, descriptor)` defines or modifies one
own property on `object`.

It returns the same object.

```js
const profile = {};

const result = Object.defineProperty(profile, 'username', {
  value: 'learner',
  enumerable: true,
});

console.log(profile.username); // learner
console.log(result === profile); // true
```

## Mental Model

Use this sentence:

```text
Define this key on this object using this descriptor.
```

```js
Object.defineProperty(object, key, descriptor);
```

The descriptor answers:

```text
What value should the property have?
Can assignment change it?
Should it appear in enumeration?
Can it be deleted or reconfigured?
Should it use a getter or setter?
```

## Syntax

```js
Object.defineProperty(object, propertyKey, descriptor);
```

## Parameters

- `object`: The object on which the property will be defined or modified.
- `propertyKey`: The string or symbol key of the property.
- `descriptor`: An object that describes the property.

## Return Value

`Object.defineProperty()` returns the object passed as the first argument.

It modifies that object directly.

```js
const target = {};
const result = Object.defineProperty(target, 'ready', {
  value: true,
});

console.log(result === target); // true
```

## Basic Example

```js
const profile = {};

Object.defineProperty(profile, 'username', {
  value: 'learner',
  enumerable: true,
  writable: true,
  configurable: true,
});

console.log(profile.username); // learner
console.log(Object.keys(profile)); // [ 'username' ]
```

What happened:

- `username` was defined directly on `profile`.
- `value: 'learner'` stores the value.
- `enumerable: true` lets the property appear in `Object.keys(profile)`.
- `writable: true` allows assignment to change the value later.
- `configurable: true` allows the descriptor to be changed later.

## Descriptor Defaults

Descriptor flags default to `false`.

```js
const profile = {};

Object.defineProperty(profile, 'internalId', {
  value: 101,
});

const descriptor = Object.getOwnPropertyDescriptor(profile, 'internalId');

console.log(descriptor.value); // 101
console.log(descriptor.enumerable); // false
console.log(descriptor.writable); // false
console.log(descriptor.configurable); // false
```

That means this:

```js
Object.defineProperty(profile, 'internalId', {
  value: 101,
});
```

creates a property that is:

```text
not enumerable
not writable
not configurable
```

This is different from normal assignment, which usually creates writable,
enumerable, configurable properties.

## Data Descriptors

A data descriptor stores a value.

Common fields:

```text
value
writable
enumerable
configurable
```

Example:

```js
const score = {};

Object.defineProperty(score, 'points', {
  value: 42,
  writable: false,
  enumerable: true,
  configurable: true,
});

score.points = 100;

console.log(score.points); // 42
```

What happened:

- `points` stores the value `42`.
- `writable: false` means assignment cannot change the value.
- In non-strict mode, the assignment is ignored.
- In strict mode, trying to assign a new value throws a `TypeError`.

## `writable`

`writable` controls whether assignment can change a data property's value.

```js
const score = {};

Object.defineProperty(score, 'points', {
  value: 42,
  writable: false,
});

score.points = 100;

console.log(score.points); // 42
```

Use `writable: false` when the value should be read-only through normal
assignment.

## `enumerable`

`enumerable` controls whether a property appears in common enumeration tools.

```js
const settings = {};

Object.defineProperty(settings, 'theme', {
  value: 'dark',
  enumerable: true,
});

Object.defineProperty(settings, 'internalToken', {
  value: 'abc123',
  enumerable: false,
});

console.log(Object.keys(settings)); // [ 'theme' ]
console.log(settings.internalToken); // abc123
```

What happened:

- `theme` is enumerable, so `Object.keys(settings)` includes it.
- `internalToken` is not enumerable, so `Object.keys(settings)` skips it.
- Non-enumerable does not mean missing. The property still exists and can be
  read directly.

## `configurable`

`configurable` controls whether the property can be deleted or reconfigured.

```js
const settings = {};

Object.defineProperty(settings, 'version', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});

delete settings.version; // false in non-strict mode

console.log(settings.version); // 1
```

When `configurable` is `false`, you cannot freely change the descriptor later.

```js
Object.defineProperty(settings, 'version', {
  enumerable: false,
}); // TypeError
```

One important detail:

If a data property is non-configurable but still `writable: true`, its value can
still be changed and `writable` can later be changed from `true` to `false`.

After `writable` becomes `false`, it cannot be turned back to `true` unless the
property is configurable.

## Modifying Existing Properties

`Object.defineProperty()` can modify an existing own property when the current
descriptor allows the change.

```js
const profile = {};

Object.defineProperty(profile, 'username', {
  value: 'learner',
  writable: true,
  configurable: true,
});

Object.defineProperty(profile, 'username', {
  value: 'Asha',
  writable: false,
  configurable: true,
});

console.log(profile.username); // Asha
console.log(Object.getOwnPropertyDescriptor(profile, 'username').writable);
// false
```

What happened:

- `username` already existed.
- It was configurable, so the second call could update the descriptor.
- The value changed.
- The property became non-writable.

## Accessor Descriptors

An accessor descriptor defines a property with `get` and/or `set`.

Accessor descriptor fields:

```text
get
set
enumerable
configurable
```

Example:

```js
const account = {
  firstName: 'Asha',
  lastName: 'Rao',
};

Object.defineProperty(account, 'fullName', {
  enumerable: true,
  configurable: true,
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  },
});

console.log(account.fullName); // Asha Rao

account.fullName = 'Mina Shah';

console.log(account.firstName); // Mina
console.log(account.lastName); // Shah
```

What happened:

- Reading `account.fullName` runs the getter.
- Assigning to `account.fullName` runs the setter.
- The setter updates `firstName` and `lastName`.

## Do Not Mix Data And Accessor Descriptor Fields

A descriptor cannot be both a data descriptor and an accessor descriptor.

This is invalid:

```js
Object.defineProperty({}, 'broken', {
  value: 1,
  get() {
    return 1;
  },
});
```

Why it is invalid:

- `value` belongs to a data descriptor.
- `get` belongs to an accessor descriptor.
- JavaScript cannot treat one descriptor as both.

It throws a `TypeError`.

## Descriptor Must Be An Object

The third argument must be a descriptor object.

```js
Object.defineProperty({}, 'name', 'Asha'); // TypeError
```

Write this instead:

```js
Object.defineProperty({}, 'name', {
  value: 'Asha',
});
```

## Symbol Keys

The property key can be a string or a symbol.

```js
const secretKey = Symbol('secretKey');
const vault = {};

Object.defineProperty(vault, secretKey, {
  value: 'hidden-value',
  enumerable: true,
});

console.log(vault[secretKey]); // hidden-value
```

## Defines An Own Property Directly

`Object.defineProperty()` defines an own property directly on the object.

It does not use normal assignment.

That means it does not call an inherited setter while defining the property.

```js
const parent = {
  set status(value) {
    this.setterWasCalled = true;
  },
};

const child = Object.create(parent);

Object.defineProperty(child, 'status', {
  value: 'ready',
  enumerable: true,
});

console.log(Object.hasOwn(child, 'status')); // true
console.log(child.setterWasCalled); // undefined
```

What happened:

- `parent` has a setter named `status`.
- `child` inherits that setter.
- `Object.defineProperty(child, 'status', ...)` created an own property on
  `child`.
- The inherited setter was not called.

## Empty Descriptors

An empty descriptor still defines a property.

```js
const target = {};

Object.defineProperty(target, 'empty', {});

const descriptor = Object.getOwnPropertyDescriptor(target, 'empty');

console.log(descriptor.value); // undefined
console.log(descriptor.enumerable); // false
console.log(descriptor.writable); // false
console.log(descriptor.configurable); // false
```

The property exists, but it has default descriptor values.

## `null` And `undefined`

`null` and `undefined` cannot be used as the target object:

```js
Object.defineProperty(null, 'name', {
  value: 'Asha',
}); // TypeError
```

The descriptor also must be an object:

```js
Object.defineProperty({}, 'name', null); // TypeError
Object.defineProperty({}, 'name', undefined); // TypeError
```

## Difference From `Object.defineProperties()`

Use `Object.defineProperty()` when you want to define or modify one property.

```js
Object.defineProperty(user, 'name', {
  value: 'Asha',
  enumerable: true,
});
```

Use `Object.defineProperties()` when you want to define or modify multiple
properties in one call.

```js
Object.defineProperties(user, {
  name: {
    value: 'Asha',
    enumerable: true,
  },
  role: {
    value: 'admin',
    enumerable: true,
  },
});
```

The descriptor rules are the same. The difference is one property versus many
properties.

## Important Notes

- `Object.defineProperty()` is a static method on `Object`.
- It defines or modifies one own property directly on an object.
- It returns the same target object.
- It uses a property descriptor.
- Descriptor flags such as `writable`, `enumerable`, and `configurable`
  default to `false`.
- Data descriptors use `value` and `writable`.
- Accessor descriptors use `get` and `set`.
- Do not mix data descriptor fields with accessor descriptor fields.
- The descriptor must be an object.
- String keys and symbol keys can be defined.
- `null` and `undefined` cannot be used as the target.
- It defines an own property directly and does not call inherited setters.

## When To Use It

Use `Object.defineProperty()`:

- when you need descriptor control for one property,
- when a property should be non-enumerable,
- when a property should be read-only,
- when a property should use a getter or setter,
- when you need to define a symbol property with descriptor control.

Use normal assignment:

- when you just need an ordinary writable, enumerable, configurable property.

Use `Object.defineProperties()`:

- when you need to define or modify several properties at once.

## Common Mistakes

### Mistake 1: Forgetting Descriptor Defaults

```js
const user = {};

Object.defineProperty(user, 'name', {
  value: 'Asha',
});

console.log(Object.keys(user)); // []
```

`name` exists, but it is not enumerable because `enumerable` defaults to
`false`.

### Mistake 2: Expecting Assignment To Change A Non-Writable Property

```js
const score = {};

Object.defineProperty(score, 'points', {
  value: 42,
  writable: false,
});

score.points = 100;

console.log(score.points); // 42
```

The assignment does not change the value.

### Mistake 3: Mixing `value` With `get`

```js
Object.defineProperty({}, 'score', {
  value: 100,
  get() {
    return 100;
  },
});
```

This throws a `TypeError`.

### Mistake 4: Thinking It Creates A New Object

```js
const target = {};
const result = Object.defineProperty(target, 'ready', {
  value: true,
});

console.log(result === target); // true
```

The method modifies and returns the target object. It does not create a new
object automatically.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/defineProperty/defineProperty.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.defineProperty()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
- ECMAScript spec:
  [`Object.defineProperty`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.defineproperty)
