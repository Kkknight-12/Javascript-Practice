# Object.getOwnPropertyDescriptor()

## What Problem Does It Solve?

`Object.getOwnPropertyDescriptor()` lets you inspect the hidden settings of one
own property.

Normal property access only shows the value:

```js
const user = {
  name: 'Asha',
};

console.log(user.name); // Asha
```

But a property has more details than just its value.

For a data property, JavaScript also tracks:

```text
value
writable
enumerable
configurable
```

`Object.getOwnPropertyDescriptor()` shows those details.

## Quick Definition

`Object.getOwnPropertyDescriptor(object, propertyKey)` returns the descriptor
for one own property.

```js
const user = {
  name: 'Asha',
};

const descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(descriptor);
// { value: 'Asha', writable: true, enumerable: true, configurable: true }
```

If the object does not have that own property, it returns `undefined`.

## Mental Model

Think of `Object.getOwnPropertyDescriptor()` as:

```text
Look directly on this object.
Find this exact key.
Show me the property's settings.
```

It answers:

```text
Does this object itself own this property?
If yes, what kind of property is it?
How is that property configured?
```

It does not search the prototype chain.

## Syntax

```js
Object.getOwnPropertyDescriptor(object, propertyKey);
```

## Parameters

- `object`: The value to inspect.
- `propertyKey`: The string or symbol key whose descriptor should be returned.

The `propertyKey` is converted to a property key, so values like numbers or
objects can become string keys.

## Return Value

The return value is either:

- a property descriptor object, if the own property exists,
- `undefined`, if the own property does not exist.

```js
const user = {
  name: 'Asha',
};

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
// { value: 'Asha', writable: true, enumerable: true, configurable: true }

console.log(Object.getOwnPropertyDescriptor(user, 'email'));
// undefined
```

## Basic Example

```js
const profile = {
  name: 'Asha',
};

const descriptor = Object.getOwnPropertyDescriptor(profile, 'name');

console.log(descriptor.value); // Asha
console.log(descriptor.writable); // true
console.log(descriptor.enumerable); // true
console.log(descriptor.configurable); // true
```

What happened:

- `name` is an own property on `profile`.
- It was created by normal assignment/object literal syntax.
- Normal assignment creates a writable, enumerable, configurable data property.
- `Object.getOwnPropertyDescriptor()` returned those settings.

## Descriptor Fields

A descriptor can describe a data property or an accessor property.

Data descriptor fields:

```text
value
writable
enumerable
configurable
```

Accessor descriptor fields:

```text
get
set
enumerable
configurable
```

The shared fields are:

```text
enumerable
configurable
```

## Data Property Descriptor

A data property stores a value.

```js
const settings = {};

Object.defineProperty(settings, 'internalId', {
  value: 101,
  enumerable: false,
  writable: false,
  configurable: false,
});

const descriptor = Object.getOwnPropertyDescriptor(settings, 'internalId');

console.log(descriptor);
// {
//   value: 101,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

What happened:

- `internalId` is an own data property.
- `value` shows the stored value.
- `writable: false` means assignment cannot change the value.
- `enumerable: false` means common enumeration tools skip it.
- `configurable: false` means the property cannot be deleted or freely
  reconfigured.

## Accessor Property Descriptor

An accessor property uses a getter and/or setter.

```js
let readCount = 0;

const counter = {
  get value() {
    readCount += 1;
    return 42;
  },
};

const descriptor = Object.getOwnPropertyDescriptor(counter, 'value');

console.log(typeof descriptor.get); // function
console.log(descriptor.set); // undefined
console.log(descriptor.value); // undefined
console.log(descriptor.writable); // undefined
```

What happened:

- `value` is an accessor property.
- The descriptor has `get` and `set` fields.
- It does not have `value` and `writable` fields.

## Reading A Descriptor Does Not Run The Getter

`Object.getOwnPropertyDescriptor()` inspects the property settings.

It does not read the property value through the getter.

```js
let readCount = 0;

const counter = {
  get value() {
    readCount += 1;
    return 42;
  },
};

const descriptor = Object.getOwnPropertyDescriptor(counter, 'value');

console.log(typeof descriptor.get); // function
console.log(readCount); // 0
console.log(counter.value); // 42
console.log(readCount); // 1
```

What happened:

- `Object.getOwnPropertyDescriptor(counter, 'value')` returned the descriptor.
- `descriptor.get` gave us the getter function.
- Reading `descriptor.get` did not call the getter function.
- Reading `counter.value` did call the getter.

This is useful when you want to inspect an accessor without triggering it.

Do not confuse reading the getter function with calling it:

```js
descriptor.get; // reads the getter function
descriptor.get(); // calls the getter function
```

## Only Own Properties Are Checked

`Object.getOwnPropertyDescriptor()` does not search inherited properties.

```js
const sharedUserFields = {
  role: 'member',
};

const user = Object.create(sharedUserFields);
user.name = 'Mina';

console.log(Object.getOwnPropertyDescriptor(user, 'name'));
// { value: 'Mina', writable: true, enumerable: true, configurable: true }

console.log(Object.getOwnPropertyDescriptor(user, 'role'));
// undefined
```

What happened:

- `name` is an own property on `user`.
- `role` exists through the prototype chain.
- Because `role` is inherited, this method returned `undefined`.

Use the `in` operator when you intentionally want to include inherited
properties.

## Missing Properties Return `undefined`

If the own property does not exist, the result is `undefined`.

```js
const user = {
  name: 'Asha',
};

const descriptor = Object.getOwnPropertyDescriptor(user, 'email');

console.log(descriptor); // undefined
```

That means you should avoid reading descriptor fields before checking that a
descriptor exists.

```js
const descriptor = Object.getOwnPropertyDescriptor(user, 'email');

console.log(descriptor?.enumerable ?? false); // false
```

## Symbol Property Keys

The property key can be a symbol.

```js
const secretKey = Symbol('secretKey');

const account = {
  [secretKey]: 'token-123',
};

const descriptor = Object.getOwnPropertyDescriptor(account, secretKey);

console.log(descriptor.value); // token-123
```

Use the same symbol value that was used to create the property.

## Property Key Conversion

The second argument is converted to a property key.

```js
const profile = {
  name: 'Asha',
};

const keyObject = {
  toString() {
    return 'name';
  },
};

const descriptor = Object.getOwnPropertyDescriptor(profile, keyObject);

console.log(descriptor.value); // Asha
```

What happened:

- `keyObject` was converted to the string key `'name'`.
- The descriptor for `profile.name` was returned.

## Primitive Values

Primitive values are converted to objects before the lookup.

Strings have own index properties:

```js
const descriptor = Object.getOwnPropertyDescriptor('abc', 0);

console.log(descriptor);
// { value: 'a', writable: false, enumerable: true, configurable: false }
```

Most other primitives usually do not have the requested own property:

```js
console.log(Object.getOwnPropertyDescriptor(42, 'x'));
// undefined
```

`null` and `undefined` cannot be converted to objects:

```js
Object.getOwnPropertyDescriptor(null, 'x'); // TypeError
Object.getOwnPropertyDescriptor(undefined, 'x'); // TypeError
```

## The Returned Descriptor Is A Copy

The descriptor object returned by `Object.getOwnPropertyDescriptor()` is
mutable.

But changing that descriptor object does not change the original property.

```js
const profile = {
  name: 'Asha',
};

const descriptor = Object.getOwnPropertyDescriptor(profile, 'name');

descriptor.value = 'Mina';
descriptor.writable = false;

console.log(profile.name); // Asha

console.log(Object.getOwnPropertyDescriptor(profile, 'name').writable);
// true
```

What happened:

- The returned descriptor object was changed.
- The actual property on `profile` was not changed.
- To change a real property descriptor, use `Object.defineProperty()`.

## Difference From `Object.getOwnPropertyDescriptors()`

`Object.getOwnPropertyDescriptor()` reads one own property descriptor.

```js
Object.getOwnPropertyDescriptor(user, 'name');
```

`Object.getOwnPropertyDescriptors()` reads all own property descriptors.

```js
Object.getOwnPropertyDescriptors(user);
```

Use the singular method when you need one property.

Use the plural method when you need to inspect or copy all descriptors.

## Difference From `Reflect.getOwnPropertyDescriptor()`

`Object.getOwnPropertyDescriptor()` converts primitive values to objects.

```js
Object.getOwnPropertyDescriptor('abc', 0);
// { value: 'a', writable: false, enumerable: true, configurable: false }
```

`Reflect.getOwnPropertyDescriptor()` expects the first argument to already be an
object.

```js
Reflect.getOwnPropertyDescriptor('abc', 0);
// TypeError
```

Both methods check only own properties.

## Important Notes

- `Object.getOwnPropertyDescriptor()` is a static method on `Object`.
- It returns the descriptor for one own property.
- It does not search the prototype chain.
- It returns `undefined` when the own property does not exist.
- It can inspect string-keyed and symbol-keyed properties.
- The property key is converted to a property key.
- It can return data descriptors or accessor descriptors.
- Reading an accessor descriptor does not call the getter.
- Primitive values are converted to objects.
- `null` and `undefined` throw `TypeError`.
- The returned descriptor object is mutable.
- Mutating the returned descriptor object does not change the original
  property.

## When To Use It

Use `Object.getOwnPropertyDescriptor()`:

- when you need to inspect one property's descriptor,
- when you need to check whether a property is writable,
- when you need to check whether a property is enumerable,
- when you need to check whether a property is configurable,
- when you need to inspect a getter or setter without running the getter,
- when debugging behavior created by `Object.defineProperty()`.

Use `Object.getOwnPropertyDescriptors()`:

- when you need all own property descriptors.

Use `Object.hasOwn()`:

- when you only need to know whether an own property exists.

Use `propertyIsEnumerable()`:

- when you only need to know whether an own property is enumerable.

## Common Mistakes

### Mistake 1: Expecting Inherited Properties

```js
const parent = {
  role: 'admin',
};

const user = Object.create(parent);

console.log(Object.getOwnPropertyDescriptor(user, 'role'));
// undefined
```

`role` is inherited. It is not an own property on `user`.

### Mistake 2: Reading Fields From `undefined`

```js
const descriptor = Object.getOwnPropertyDescriptor(user, 'missing');

console.log(descriptor.enumerable); // TypeError
```

Check that the descriptor exists first:

```js
console.log(descriptor?.enumerable ?? false); // false
```

### Mistake 3: Thinking The Descriptor Object Is Live

```js
const user = {
  name: 'Asha',
};

const descriptor = Object.getOwnPropertyDescriptor(user, 'name');

descriptor.value = 'Mina';

console.log(user.name); // Asha
```

The descriptor object is a copy, not a live control panel.

### Mistake 4: Thinking It Calls Getters

```js
let readCount = 0;

const user = {
  get name() {
    readCount += 1;
    return 'Asha';
  },
};

Object.getOwnPropertyDescriptor(user, 'name');

console.log(readCount); // 0
```

The getter did not run. The method inspected the descriptor only.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- ECMAScript spec:
  [`Object.getOwnPropertyDescriptor`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptor)
