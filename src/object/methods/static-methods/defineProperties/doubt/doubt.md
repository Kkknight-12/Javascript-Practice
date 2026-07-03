# Doubts: Object.defineProperties()

## Doubt 1: Why Is `value` Nested Inside Another `value`?

Question:

```js
Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  writable: false,
  enumerable: false,
  configurable: false,
});
```

The normal syntax is:

```js
Object.defineProperty(obj, propertyKey, descriptor);
```

So why does the descriptor contain this?

```js
value: {
  value: 'secret',
  enumerable: true,
}
```

## Short Answer

There are two different objects here.

```text
Outer object:
  the descriptor passed to Object.defineProperty()
  controls descriptors.hidden itself

Inner object:
  the value stored inside descriptors.hidden
  later can be used as a descriptor by Object.defineProperties()
```

This is nested, but it is not a special new syntax.

It is just one object being stored as the value of another property.

## First, Remember What `value` Means

In a data descriptor, `value` means:

```text
What value should this property store?
```

That value can be anything.

```js
{ value: 'secret' } // stores a string
```

```js
{ value: 100 } // stores a number
```

```js
{ value: true } // stores a boolean
```

```js
{ value: { topic: 'objects' } } // stores an object
```

So this is allowed:

```js
value: {
  value: 'secret',
  enumerable: true,
}
```

It means:

```text
Store this object as the property value.
```

## A Small Example Without `defineProperties()`

```js
const box = {};

Object.defineProperty(box, 'item', {
  value: {
    name: 'Book',
  },
  enumerable: true,
});

console.log(box.item);
// { name: 'Book' }
```

The property is `box.item`.

The value stored inside `box.item` is an object:

```js
{
  name: 'Book',
}
```

So storing an object inside `value` is normal.

## Now Come Back To The Descriptor Map

`Object.defineProperties()` expects a descriptor map:

```js
Object.defineProperties(target, {
  visible: {
    value: 'shown',
    enumerable: true,
  },
});
```

In that map, `visible` is the property name to define, and the object beside it
is the descriptor object.

So if we want to prepare a descriptor map manually, its values should be
descriptor objects.

```js
const descriptors = {};

descriptors.visible = {
  value: 'shown',
  enumerable: true,
};
```

Here:

```js
descriptors.visible
```

stores this descriptor object:

```js
{
  value: 'shown',
  enumerable: true,
}
```

Later, `Object.defineProperties()` can use that object to define
`target.visible`.

## Why Does `hidden` Use `Object.defineProperty()`?

This code creates a property named `hidden` on the descriptor map:

```js
Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});
```

Read it as:

```text
Create descriptors.hidden.

Store this value inside descriptors.hidden:
  { value: 'secret', enumerable: true }

Make descriptors.hidden non-enumerable.
```

After that:

```js
console.log(descriptors.hidden);
// { value: 'secret', enumerable: true }
```

So the inner object is the value of `descriptors.hidden`.

It looks like a descriptor because we want it to be usable as a descriptor for
some future `target.hidden` property.

## Why Does `target.hidden` Not Get Created?

Because `descriptors.hidden` itself is non-enumerable.

```js
enumerable: false
```

`Object.defineProperties()` only reads own enumerable keys from the descriptor
map.

So this:

```js
const target = {};
Object.defineProperties(target, descriptors);
```

works like this:

```text
descriptors.visible is enumerable
  -> use descriptors.visible
  -> create target.visible

descriptors.hidden is non-enumerable
  -> skip descriptors.hidden
  -> target.hidden is not created
```

That is why:

```js
console.log(target.visible); // shown
console.log(target.hidden); // undefined
```

## What If `hidden` Was Enumerable?

If `descriptors.hidden` was enumerable, then `Object.defineProperties()` would
use it.

```js
const descriptors = {};

Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: true,
});

const target = {};
Object.defineProperties(target, descriptors);

console.log(target.hidden); // secret
```

Now the descriptor map key `hidden` is enumerable, so it is processed.

The inner descriptor object:

```js
{
  value: 'secret',
  enumerable: true,
}
```

is used to define `target.hidden`.

## Final Mental Model

```text
Object.defineProperty(descriptors, 'hidden', {
  value: { value: 'secret', enumerable: true },
  enumerable: false,
});
```

Means:

```text
descriptors.hidden exists.

descriptors.hidden stores:
  { value: 'secret', enumerable: true }

descriptors.hidden is non-enumerable on the descriptor map.
```

Then:

```js
Object.defineProperties(target, descriptors);
```

Means:

```text
Use only enumerable keys from descriptors.
```

So:

```text
Outer descriptor controls descriptors.hidden.
Inner object is the value stored in descriptors.hidden.
Object.defineProperties() skips descriptors.hidden if the outer descriptor made
it non-enumerable.
```
