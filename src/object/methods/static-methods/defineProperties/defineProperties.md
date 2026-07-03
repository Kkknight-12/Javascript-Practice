# Object.defineProperties()

## What Problem Does It Solve?

`Object.defineProperties()` lets you define or change several properties on one
object using property descriptors.

This is useful when normal assignment is not enough.

Normal assignment creates ordinary writable, enumerable, configurable
properties:

```js
const user = {};

user.name = 'Asha';
```

`Object.defineProperties()` lets you describe more details:

```js
const user = {};

Object.defineProperties(user, {
  name: {
    value: 'Asha',
    enumerable: true,
    writable: true,
    configurable: true,
  },
  internalId: {
    value: 101,
    enumerable: false,
  },
});
```

Now `name` can be visible in normal enumeration, while `internalId` can exist
without appearing in `Object.keys(user)`.

## Quick Definition

`Object.defineProperties(object, descriptors)` defines or modifies multiple
properties directly on `object`.

It returns the same object.

```js
const profile = {};

const result = Object.defineProperties(profile, {
  username: {
    value: 'learner',
    enumerable: true,
  },
});

console.log(profile.username); // learner
console.log(result === profile); // true
```

## Mental Model

Think of the second argument as a map of property names to property
descriptors:

```text
Object.defineProperties(target, {
  propertyName: descriptor,
  anotherProperty: descriptor,
})
```

Each descriptor answers:

```text
What value should this property have?
Should it be writable?
Should it be enumerable?
Should it be configurable?
Is it a getter/setter property?
```

## Syntax

```js
Object.defineProperties(object, properties);
```

## Parameters

- `object`: The object on which properties will be defined or modified.
- `properties`: An object whose own enumerable keys are the property names to
  define. Each value must be a property descriptor object.

## Return Value

`Object.defineProperties()` returns the object passed as the first argument.

It modifies that object directly.

```js
const target = {};
const result = Object.defineProperties(target, {
  ready: {
    value: true,
  },
});

console.log(result === target); // true
```

## Basic Example

```js
const profile = {};

Object.defineProperties(profile, {
  username: {
    value: 'learner',
    enumerable: true,
    writable: true,
    configurable: true,
  },
  internalId: {
    value: 101,
  },
});

console.log(profile.username); // learner
console.log(Object.keys(profile)); // [ 'username' ]
console.log(Object.hasOwn(profile, 'internalId')); // true
```

What happened:

- `username` was created as an own property.
- `username` is enumerable, so it appears in `Object.keys(profile)`.
- `internalId` was also created as an own property.
- `internalId` did not set `enumerable: true`, so it does not appear in
  `Object.keys(profile)`.

## Descriptor Defaults

Descriptor flags default to `false`.

For a data property:

```js
const user = {};

Object.defineProperties(user, {
  internalId: {
    value: 101,
  },
});

const descriptor = Object.getOwnPropertyDescriptor(user, 'internalId');

console.log(descriptor.value); // 101
console.log(descriptor.enumerable); // false
console.log(descriptor.writable); // false
console.log(descriptor.configurable); // false
```

That means this:

```js
internalId: {
  value: 101,
}
```

is not the same as normal assignment.

Normal assignment usually creates a writable, enumerable, configurable
property. `Object.defineProperties()` gives you the descriptor defaults unless
you explicitly set them.

## Defining Several Properties At Once

```js
const settings = {};

Object.defineProperties(settings, {
  theme: {
    value: 'dark',
    enumerable: true,
    writable: true,
  },
  version: {
    value: 1,
    enumerable: true,
  },
  internalId: {
    value: 500,
  },
});

console.log(Object.keys(settings)); // [ 'theme', 'version' ]
console.log(settings.internalId); // 500
```

What happened:

- `theme`, `version`, and `internalId` were all defined in one call.
- Only `theme` and `version` are enumerable.
- `internalId` exists, but it is hidden from `Object.keys()`.

## Modifying Existing Properties

`Object.defineProperties()` can also modify existing properties when the current
property descriptor allows the change.

```js
const profile = {};

Object.defineProperties(profile, {
  username: {
    value: 'learner',
    writable: true,
    configurable: true,
  },
});

Object.defineProperties(profile, {
  username: {
    value: 'Asha',
    writable: false,
    configurable: true,
  },
});

console.log(profile.username); // Asha
console.log(Object.getOwnPropertyDescriptor(profile, 'username').writable);
// false
```

What happened:

- `username` was first created with `configurable: true`.
- Because it was configurable, the second call could change the descriptor.
- The value changed from `'learner'` to `'Asha'`.
- `writable` changed from `true` to `false`.

## Data Descriptors

A data descriptor describes a property that stores a value.

Common fields:

```text
value
writable
enumerable
configurable
```

Example:

```js
const lesson = {};

Object.defineProperties(lesson, {
  title: {
    value: 'Objects',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});

console.log(lesson.title); // Objects
```

## Accessor Descriptors

An accessor descriptor describes a property using `get` and/or `set`.

Accessor descriptors use:

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

Object.defineProperties(account, {
  fullName: {
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
Object.defineProperties({}, {
  broken: {
    value: 1,
    get() {
      return 1;
    },
  },
});
```

Why it is invalid:

- `value` belongs to a data descriptor.
- `get` belongs to an accessor descriptor.
- JavaScript cannot treat the same descriptor as both.

It throws a `TypeError`.

## Descriptor Values Must Be Objects

Each property in the `properties` object must point to a descriptor object.

```js
Object.defineProperties({}, {
  name: 'Asha',
});
```

This throws a `TypeError` because `'Asha'` is not a descriptor object.

Write this instead:

```js
Object.defineProperties({}, {
  name: {
    value: 'Asha',
  },
});
```

## The Descriptor Map Uses Own Enumerable Keys

The second argument to `Object.defineProperties()` is a descriptor map.

In this example, the descriptor map is the object named `descriptors`:

```js
const descriptors = {};
```

`Object.defineProperties()` does not read every property from that map.

It reads only the map's own enumerable keys.

```text
descriptor map key is enumerable     -> use it
descriptor map key is non-enumerable -> skip it
```

That rule is about the descriptor map property itself.

It is separate from the property that will be created on the target.

```js
const descriptors = {};

descriptors.visible = {
  value: 'shown',
  enumerable: true,
};
```

Normal assignment makes `descriptors.visible` enumerable, so
`Object.defineProperties()` can see it.

Now compare that with this:

```js
Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});
```

This creates a property named `hidden` on the descriptor map, but that key is
non-enumerable.

So `descriptors.hidden` exists, but `Object.defineProperties()` will not read
it from the descriptor map.

```js
const descriptors = {};

Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});

descriptors.visible = {
  value: 'shown',
  enumerable: true,
};

const target = {};
Object.defineProperties(target, descriptors);

console.log(target.visible); // shown
console.log(target.hidden); // undefined
```

What happened:

- `descriptors.visible` is enumerable on the descriptor map.
- So `Object.defineProperties()` used it to define `target.visible`.
- `descriptors.hidden` exists, but it is not enumerable on the descriptor map.
- So `Object.defineProperties()` skipped it.
- That is why `target.hidden` is `undefined`.

Use this table:

```text
property on descriptors | enumerable on descriptors? | result
visible                 | yes                        | target.visible is defined
hidden                  | no                         | target.hidden is skipped
```

The confusing nested part is this:

```js
value: {
  value: 'secret',
  enumerable: true,
}
```

That inner object is just the value stored inside `descriptors.hidden`.

It looks like a descriptor because it is meant to be used as a descriptor later.
The outer descriptor controls `descriptors.hidden` itself.

Related doubt:
[`Why is value nested inside another value?`](doubt/doubt.md#doubt-1-why-is-value-nested-inside-another-value)

## Symbol Keys Can Be Defined

The property names in the descriptor map can be strings or symbols.

```js
const accountId = Symbol('accountId');
const user = {};

Object.defineProperties(user, {
  [accountId]: {
    value: 500,
    enumerable: true,
  },
});

console.log(user[accountId]); // 500
```

## `null` And `undefined`

`null` and `undefined` cannot be used as the target object:

```js
Object.defineProperties(null, {}); // TypeError
Object.defineProperties(undefined, {}); // TypeError
```

They also cannot be used as the descriptor map:

```js
Object.defineProperties({}, null); // TypeError
Object.defineProperties({}, undefined); // TypeError
```

## Errors Can Leave Partial Changes

Before defining properties, JavaScript first converts the descriptor map into
property descriptors.

If a descriptor is invalid during that preparation step, no properties from
that call are defined.

```js
const target = {};

try {
  Object.defineProperties(target, {
    ok: {
      value: 1,
    },
    broken: {
      value: 2,
      get() {
        return 2;
      },
    },
  });
} catch (error) {
  console.log(error.name); // TypeError
}

console.log(Object.hasOwn(target, 'ok')); // false
```

But if the descriptors are valid and a later property cannot be defined on the
target, earlier successful definitions can remain.

```js
const target = {};

Object.defineProperty(target, 'locked', {
  value: 1,
  writable: false,
  configurable: false,
});

try {
  Object.defineProperties(target, {
    copiedBeforeError: {
      value: true,
      enumerable: true,
    },
    locked: {
      value: 2,
    },
    copiedAfterError: {
      value: true,
      enumerable: true,
    },
  });
} catch (error) {
  console.log(error.name); // TypeError
}

console.log(Object.hasOwn(target, 'copiedBeforeError')); // true
console.log(target.locked); // 1
console.log(Object.hasOwn(target, 'copiedAfterError')); // false
```

What happened:

- `copiedBeforeError` was defined.
- Updating `locked` failed because it was not configurable and not writable.
- The method stopped.
- `copiedAfterError` was not defined.

## Difference From `Object.defineProperty()`

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

- `Object.defineProperties()` is a static method on `Object`.
- It defines or modifies multiple own properties on one object.
- It returns the same target object.
- It uses property descriptors.
- Descriptor flags such as `writable`, `enumerable`, and `configurable`
  default to `false`.
- Data descriptors use `value` and `writable`.
- Accessor descriptors use `get` and `set`.
- Do not mix data descriptor fields with accessor descriptor fields.
- The descriptor map is read through its own enumerable keys.
- String keys and symbol keys can be defined.
- Invalid descriptors throw `TypeError`.
- `null` and `undefined` cannot be used as the target or descriptor map.
- If definition fails partway through, earlier changes can remain.

## When To Use It

Use `Object.defineProperties()`:

- when you need to define several properties with descriptor control,
- when some properties should be non-enumerable,
- when some properties should be read-only,
- when you need getters or setters,
- when you want one call instead of several `Object.defineProperty()` calls.

Use normal assignment:

- when you just need ordinary writable, enumerable, configurable properties.

Use `Object.assign()` or object spread:

- when you want to copy existing enumerable values into an object.

## Common Mistakes

### Mistake 1: Forgetting Descriptor Defaults

```js
const user = {};

Object.defineProperties(user, {
  name: {
    value: 'Asha',
  },
});

console.log(Object.keys(user)); // []
```

`name` exists, but it is not enumerable because `enumerable` defaults to
`false`.

### Mistake 2: Expecting A Descriptor Value To Be A Plain Value

```js
Object.defineProperties({}, {
  name: 'Asha',
});
```

This throws a `TypeError`.

The value must be wrapped in a descriptor object:

```js
Object.defineProperties({}, {
  name: {
    value: 'Asha',
  },
});
```

### Mistake 3: Mixing `value` With `get`

```js
Object.defineProperties({}, {
  score: {
    value: 100,
    get() {
      return 100;
    },
  },
});
```

This throws a `TypeError` because a descriptor cannot be both data and accessor.

### Mistake 4: Expecting It To Create A New Object

```js
const target = {};
const result = Object.defineProperties(target, {
  ready: {
    value: true,
  },
});

console.log(result === target); // true
```

The method modifies and returns the target object. It does not create a new
object automatically.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/defineProperties/defineProperties.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.defineProperties()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
- ECMAScript spec:
  [`Object.defineProperties`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.defineproperties)
