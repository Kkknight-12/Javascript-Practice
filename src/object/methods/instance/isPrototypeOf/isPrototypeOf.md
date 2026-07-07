# Object.prototype.isPrototypeOf()

## What Problem Does It Solve?

`isPrototypeOf()` checks whether one object appears in another object's
prototype chain.

That helps when you need to ask:

Is this object part of the inheritance chain for another object?

## Quick Definition

`prototypeObject.isPrototypeOf(object)` returns `true` when `prototypeObject`
appears anywhere in `object`'s prototype chain.

It returns `false` when the object is not in that chain.

## Mental Model

Think of the prototype chain like stacked pages behind an object.

```text
object -> direct prototype -> parent prototype -> Object.prototype -> null
```

`isPrototypeOf()` asks whether a specific page exists anywhere behind the
object.

## Syntax

```js
prototypeObject.isPrototypeOf(object);
Object.prototype.isPrototypeOf.call(prototypeObject, object);
```

## The Object Before The Dot Matters

Read every call like this:

```text
possiblePrototype.isPrototypeOf(objectToCheck)
```

The object before `.isPrototypeOf()` must be the possible prototype object you
are searching for.

Sometimes that possible prototype is a normal object:

```js
const sharedUserBehavior = {};
const learner = Object.create(sharedUserBehavior);

console.log(sharedUserBehavior.isPrototypeOf(learner)); // true
```

`Object.create(sharedUserBehavior)` creates a new object and sets
`sharedUserBehavior` as that new object's prototype. That means
`sharedUserBehavior` is already the prototype object for `learner`.

That is why we call `sharedUserBehavior.isPrototypeOf(learner)`.

Do not write this:

```js
sharedUserBehavior.prototype.isPrototypeOf(learner);
```

`sharedUserBehavior` is not a constructor function or class. It is just the
object that was used as `learner`'s prototype, so `sharedUserBehavior.prototype`
is not the prototype object to check. In this example,
`sharedUserBehavior.prototype` is `undefined`.

Plain objects do not automatically receive a `.prototype` property. Function
objects and classes have a `.prototype` property because they can be used with
`new` to create instances.

Other times the possible prototype comes from a constructor function or class:

```js
class Dog {}
const pet = new Dog();

console.log(Dog.prototype.isPrototypeOf(pet)); // true
console.log(Dog.isPrototypeOf(pet)); // false
```

Here `Dog` is the class function object, but instances are linked to
`Dog.prototype`. That is why `Dog.prototype.isPrototypeOf(pet)` is true and
`Dog.isPrototypeOf(pet)` is false.

## Parameters

- `object`: The value whose prototype chain should be searched.

The object before `.isPrototypeOf()` is the possible prototype you are searching
for.

## Return Value

`isPrototypeOf()` returns a boolean:

- `true` when the calling object appears in the argument object's prototype
  chain.
- `false` when it does not.
- `false` when the argument is a primitive value.

## Basic Example

```js
const sharedUserBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedUserBehavior);

console.log(sharedUserBehavior.isPrototypeOf(learner)); // true
console.log(Object.prototype.isPrototypeOf(learner)); // true
console.log(learner.isPrototypeOf(sharedUserBehavior)); // false
```

What happened:

- `learner` was created with `sharedUserBehavior` as its prototype.
- `sharedUserBehavior` is in `learner`'s prototype chain.
- `Object.prototype` is also in the chain.
- The relationship does not work backward.

## It Checks The Whole Prototype Chain

```js
class Animal {}
class Dog extends Animal {}
class Beagle extends Dog {}

const snoopy = new Beagle();

console.log(Beagle.prototype.isPrototypeOf(snoopy)); // true
console.log(Dog.prototype.isPrototypeOf(snoopy)); // true
console.log(Animal.prototype.isPrototypeOf(snoopy)); // true
console.log(Object.prototype.isPrototypeOf(snoopy)); // true
```

What happened:

- `snoopy` was created from `Beagle`.
- `Beagle.prototype` is the immediate prototype.
- `Dog.prototype`, `Animal.prototype`, and `Object.prototype` are higher in the
  chain.
- `isPrototypeOf()` can find prototypes at any level.

## Difference From `Object.getPrototypeOf()`

```js
console.log(Object.getPrototypeOf(snoopy) === Beagle.prototype); // true
console.log(Object.getPrototypeOf(snoopy) === Animal.prototype); // false
console.log(Animal.prototype.isPrototypeOf(snoopy)); // true
```

What happened:

- `Object.getPrototypeOf(snoopy)` returns only the immediate prototype.
- `Animal.prototype` is not the immediate prototype.
- `Animal.prototype` is still somewhere in the chain, so `isPrototypeOf()`
  returns `true`.

## Difference From `instanceof`

```js
console.log(snoopy instanceof Dog); // true
console.log(Dog.prototype.isPrototypeOf(snoopy)); // true
console.log(Dog.isPrototypeOf(snoopy)); // false
```

What happened:

- `snoopy instanceof Dog` checks whether `Dog.prototype` appears in
  `snoopy`'s prototype chain.
- `Dog.prototype.isPrototypeOf(snoopy)` checks the same prototype object
  directly.
- `Dog.isPrototypeOf(snoopy)` checks whether the function object `Dog` itself is
  in the chain, which is not the same thing.

The chain is roughly:

```text
snoopy
  -> Beagle.prototype
  -> Dog.prototype
  -> Animal.prototype
  -> Object.prototype
  -> null
```

## Primitive Values Return `false`

```js
console.log(Object.prototype.isPrototypeOf(42)); // false
console.log(Object.prototype.isPrototypeOf('hello')); // false
```

Primitive values do not have a normal object prototype chain to search, so the
result is `false`.

## Null-Prototype Objects

```js
const dictionary = Object.create(null);

console.log(Object.prototype.isPrototypeOf(dictionary)); // false
console.log(Object.getPrototypeOf(dictionary)); // null
```

What happened:

- `dictionary` has `null` as its prototype.
- `Object.prototype` is not in its prototype chain.

## Borrowed Call Pattern

```js
const base = {};
const child = Object.create(base);

console.log(Object.prototype.isPrototypeOf.call(base, child)); // true
```

`Object.prototype.isPrototypeOf.call(base, child)` borrows the method from
`Object.prototype`, then uses `base` as the object before `.isPrototypeOf()`.

So this call asks:

```text
Is base in child's prototype chain?
```

In this example, the direct form also works:

```js
console.log(base.isPrototypeOf(child)); // true
```

The borrowed-call form is useful when the object might not inherit
`isPrototypeOf()` safely.

The reason the result is `true` is the prototype chain:

```js
const base = {};
const child = Object.create(base);
```

`const base = {}` creates a normal object. Its prototype is `Object.prototype`,
not `null`.

`Object.create(base)` creates `child` and sets `base` itself as `child`'s
prototype.

These checks show each link:

```js
console.log(Object.getPrototypeOf(child) === base); // true
console.log(Object.getPrototypeOf(base) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
console.log(base.isPrototypeOf(child)); // true
```

The chain is:

```text
child -> base -> Object.prototype -> null
```

Only `Object.create(null)` creates an object whose prototype is `null`.

## `null` Or `undefined` As `this`

```js
Object.prototype.isPrototypeOf.call(null, {});
```

This throws a `TypeError` because `null` and `undefined` cannot be converted
into objects for the method call.

## Prototype Chain Is Not A Private-Field Brand Check

```js
class SecretBox {
  #value = 'secret';

  static hasSecretBrand(value) {
    return #value in value;
  }
}

const fakeBox = Object.create(SecretBox.prototype);

console.log(SecretBox.prototype.isPrototypeOf(fakeBox)); // true
console.log(SecretBox.hasSecretBrand(fakeBox)); // false
```

What happened:

- `fakeBox` has `SecretBox.prototype` in its prototype chain.
- `fakeBox` was not constructed by `SecretBox`.
- It does not have `SecretBox`'s private field brand.

Use a private-field brand check when the real question is whether an object was
created by a class that declares a private field.

Related doubt:
[`Is Object.create(SecretBox.prototype) the same as new SecretBox()?`](doubt/doubt.md)

## Important Notes

- `isPrototypeOf()` searches the prototype chain of the argument.
- The object before `.isPrototypeOf()` is the possible prototype.
- The check can match a prototype at any level, not only the immediate one.
- It returns `false` when the argument is a primitive.
- It throws a `TypeError` when called with `null` or `undefined` as `this`.
- It is related to `instanceof`, but `instanceof` checks
  `Constructor.prototype`, not the constructor function object itself.
- Prototype-chain membership does not prove private-field branding.

## When To Use It

Use `isPrototypeOf()`:

- When you have a prototype object and want to know whether it appears in
  another object's prototype chain.
- When `instanceof` is not the right shape because you are not starting from a
  constructor function.
- When checking objects created with `Object.create()`.

Use `Object.getPrototypeOf()`:

- When you only need the immediate prototype.

Use `instanceof`:

- When you have a constructor function or class and want to check whether
  `Constructor.prototype` appears in an object's prototype chain.

## Related Detail Pages

- Object creation:
  [`src/object/concepts/create-object/create-object.md`](../../../concepts/create-object/create-object.md)
- `Object.create()`:
  [`src/object/methods/static-methods/objectCreate/objectCreate.md`](../../static-methods/objectCreate/objectCreate.md)
- `Object.getPrototypeOf()`:
  [`src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.md`](../../static-methods/getPrototypeOf/getPrototypeOf.md)
- `Object.setPrototypeOf()`:
  [`src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.md`](../../static-methods/setPrototypeOf/setPrototypeOf.md)

## Common Mistakes

### Mistake 1: Reversing The Direction

```js
const parent = {};
const child = Object.create(parent);

console.log(parent.isPrototypeOf(child)); // true
console.log(child.isPrototypeOf(parent)); // false
```

The possible prototype goes before `.isPrototypeOf()`.

### Mistake 2: Calling It On The Constructor Instead Of The Prototype

```js
class Dog {}
const pet = new Dog();

console.log(Dog.isPrototypeOf(pet)); // false
console.log(Dog.prototype.isPrototypeOf(pet)); // true
```

`Dog` is the constructor function. `Dog.prototype` is the prototype object used
by instances. Put the actual possible prototype object before
`.isPrototypeOf()`.

### Mistake 3: Expecting It To Prove Private Fields Exist

An object can be manually linked to a class prototype with `Object.create()`.
That can make `ClassName.prototype.isPrototypeOf(object)` return `true`, but it
does not add the class's private fields to the object.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/isPrototypeOf/isPrototypeOf.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.isPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf)
- MDN:
  [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
- MDN:
  [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
