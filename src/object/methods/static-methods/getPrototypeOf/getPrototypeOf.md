# Object.getPrototypeOf()

## What Problem Does It Solve?

`Object.getPrototypeOf()` lets you inspect the immediate prototype of an
object.

That helps when you need to ask:

```text
What object is directly behind this object in the prototype chain?
```

Example:

```js
const sharedUserBehavior = {};
const learner = Object.create(sharedUserBehavior);

console.log(Object.getPrototypeOf(learner) === sharedUserBehavior);
// true
```

## Quick Definition

`Object.getPrototypeOf(object)` returns the object's immediate prototype.

The result can be:

- another object,
- `null`.

```js
const base = {};
const child = Object.create(base);

console.log(Object.getPrototypeOf(child) === base); // true
```

## Mental Model

Think of a prototype chain like this:

```text
object -> direct prototype -> next prototype -> Object.prototype -> null
```

`Object.getPrototypeOf(object)` returns only the first object after `object`.

It does not return the whole chain.

## Syntax

```js
Object.getPrototypeOf(object);
```

## Parameters

- `object`: The value whose immediate prototype should be returned.

Primitive values are converted to wrapper objects before the prototype is read.

`null` and `undefined` throw `TypeError`.

## Return Value

The return value is:

- the immediate prototype object,
- or `null` when the object has no prototype.

```js
const dictionary = Object.create(null);

console.log(Object.getPrototypeOf(dictionary)); // null
```

## Basic Example With `Object.create()`

`Object.create(prototypeObject)` creates a new object and sets
`prototypeObject` as the new object's prototype.

```js
const sharedUserBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedUserBehavior);
learner.name = 'Asha';
learner.topic = 'prototypes';

console.log(Object.getPrototypeOf(learner) === sharedUserBehavior);
// true

console.log(learner.describe());
// Asha is learning prototypes
```

What happened:

- `Object.create(sharedUserBehavior)` created `learner`.
- `sharedUserBehavior` became the immediate prototype of `learner`.
- `Object.getPrototypeOf(learner)` returned `sharedUserBehavior`.
- `learner.describe()` worked because `describe` was inherited from
  `sharedUserBehavior`.

## Plain Object Prototype

A normal object literal has `Object.prototype` as its prototype.

```js
const plainObject = {};

console.log(Object.getPrototypeOf(plainObject) === Object.prototype);
// true
```

That means this chain is normal:

```text
plainObject -> Object.prototype -> null
```

`plainObject` itself does not have a `null` prototype.

`Object.prototype` has `null` as its prototype:

```js
console.log(Object.getPrototypeOf(Object.prototype));
// null
```

## Null-Prototype Objects

`Object.create(null)` creates an object with no prototype.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.getPrototypeOf(dictionary)); // null
console.log(Object.hasOwn(dictionary, 'topic')); // true
```

What happened:

- `dictionary` has no prototype.
- Its prototype is `null`.
- It can still have own properties.

## Immediate Prototype Only

`Object.getPrototypeOf()` returns only the immediate prototype.

```js
class Animal {}
class Dog extends Animal {}
class Beagle extends Dog {}

const snoopy = new Beagle();

console.log(Object.getPrototypeOf(snoopy) === Beagle.prototype); // true
console.log(Object.getPrototypeOf(snoopy) === Animal.prototype); // false
console.log(Animal.prototype.isPrototypeOf(snoopy)); // true
```

What happened:

- `Beagle.prototype` is the immediate prototype of `snoopy`.
- `Animal.prototype` is higher in the prototype chain.
- `Object.getPrototypeOf(snoopy)` returns the immediate prototype only.
- `isPrototypeOf()` can check anywhere in the chain.

## Walking The Prototype Chain

To inspect the full chain, call `Object.getPrototypeOf()` repeatedly.

```js
const firstPrototype = Object.getPrototypeOf(snoopy);
const secondPrototype = Object.getPrototypeOf(firstPrototype);
const thirdPrototype = Object.getPrototypeOf(secondPrototype);

console.log(firstPrototype === Beagle.prototype); // true
console.log(secondPrototype === Dog.prototype); // true
console.log(thirdPrototype === Animal.prototype); // true
```

The chain is:

```text
snoopy
  -> Beagle.prototype
  -> Dog.prototype
  -> Animal.prototype
  -> Object.prototype
  -> null
```

## Constructor Function Instances

Constructor functions also connect instances to `Constructor.prototype`.

```js
function Course(title) {
  this.title = title;
}

Course.prototype.label = function label() {
  return `Course: ${this.title}`;
};

const course = new Course('Objects');

console.log(Object.getPrototypeOf(course) === Course.prototype);
// true
```

What happened:

- `new Course('Objects')` created an instance object.
- The instance object's immediate prototype is `Course.prototype`.
- `Object.getPrototypeOf(course)` returned `Course.prototype`.

## Difference From `Object.setPrototypeOf()`

`Object.getPrototypeOf()` reads the immediate prototype.

`Object.setPrototypeOf()` changes the immediate prototype.

```js
const base = {
  role: 'admin',
};

const account = {
  name: 'Mina',
};

Object.setPrototypeOf(account, base);

console.log(Object.getPrototypeOf(account) === base); // true
console.log(account.role); // admin
```

What happened:

- `Object.setPrototypeOf(account, base)` changed `account`'s prototype.
- `Object.getPrototypeOf(account)` then returned `base`.
- `account.role` was found through the prototype chain.

Changing prototypes after object creation can make code harder to reason about.
Prefer choosing the prototype during creation when possible.

## Primitive Values

Primitive values are converted to wrapper objects before reading the prototype.

```js
console.log(Object.getPrototypeOf('abc') === String.prototype); // true
console.log(Object.getPrototypeOf(42) === Number.prototype); // true
console.log(Object.getPrototypeOf(true) === Boolean.prototype); // true
```

`null` and `undefined` cannot be converted to objects:

```js
Object.getPrototypeOf(null); // TypeError
Object.getPrototypeOf(undefined); // TypeError
```

## Difference From `Reflect.getPrototypeOf()`

`Object.getPrototypeOf()` converts primitive values to wrapper objects.

```js
console.log(Object.getPrototypeOf('abc') === String.prototype);
// true
```

`Reflect.getPrototypeOf()` expects an object.

```js
Reflect.getPrototypeOf('abc'); // TypeError
```

Both methods return the immediate prototype for object values.

## Difference From `isPrototypeOf()`

`Object.getPrototypeOf()` returns one object: the immediate prototype.

```js
Object.getPrototypeOf(snoopy);
// Beagle.prototype
```

`isPrototypeOf()` returns a boolean and can check the whole chain.

```js
Animal.prototype.isPrototypeOf(snoopy);
// true
```

Use `Object.getPrototypeOf()` when you want to inspect the direct link.

Use `isPrototypeOf()` when you want to ask whether an object appears anywhere
in the chain.

## Difference From `instanceof`

`instanceof` checks whether a constructor's `.prototype` object appears in an
object's prototype chain.

```js
console.log(snoopy instanceof Dog); // true
console.log(Object.getPrototypeOf(snoopy) === Dog.prototype); // false
console.log(Dog.prototype.isPrototypeOf(snoopy)); // true
```

What happened:

- `snoopy instanceof Dog` checks the whole chain for `Dog.prototype`.
- `Object.getPrototypeOf(snoopy)` returns only `Beagle.prototype`.
- `Dog.prototype` is higher in the chain, so the direct check is `false`.

## Proxy Note

Proxy objects can intercept prototype reads with a `getPrototypeOf` trap.

```js
const target = {};

const proxy = new Proxy(target, {
  getPrototypeOf(target) {
    return Reflect.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy) === Object.prototype);
// true
```

What happened:

- `Object.getPrototypeOf(proxy)` asked the proxy for its prototype.
- The proxy's `getPrototypeOf` trap ran.
- The trap delegated to `Reflect.getPrototypeOf(target)`.

## Important Notes

- `Object.getPrototypeOf()` is a static method on `Object`.
- It returns the immediate prototype of the given value.
- The returned value can be an object or `null`.
- It does not return the whole prototype chain.
- A normal object literal has `Object.prototype` as its prototype.
- `Object.prototype` has `null` as its prototype.
- `Object.create(null)` creates an object whose prototype is `null`.
- Class and constructor instances usually point to `Constructor.prototype`.
- Primitive values are converted to wrapper objects.
- `null` and `undefined` throw `TypeError`.
- Proxy objects can intercept prototype reads.

## When To Use It

Use `Object.getPrototypeOf()`:

- when you need to inspect an object's immediate prototype,
- when checking what object was used with `Object.create()`,
- when debugging class or constructor instance chains,
- when checking whether an object has a null prototype,
- when walking a prototype chain step by step.

Use `isPrototypeOf()`:

- when you need to know whether an object appears anywhere in another object's
  prototype chain.

Use `instanceof`:

- when you want constructor-style instance checks.

Use `Object.setPrototypeOf()`:

- when you intentionally need to change an object's prototype.

## Common Mistakes

### Mistake 1: Expecting The Whole Chain

```js
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(Object.getPrototypeOf(dog) === Animal.prototype);
// false
```

`Object.getPrototypeOf()` returns only the immediate prototype.

### Mistake 2: Thinking `{}` Has A Null Prototype

```js
const obj = {};

console.log(Object.getPrototypeOf(obj) === Object.prototype);
// true

console.log(Object.getPrototypeOf(obj) === null);
// false
```

A normal object literal points to `Object.prototype`.

`Object.prototype` points to `null`.

### Mistake 3: Mixing Up Constructor And Constructor Prototype

```js
class Dog {}
const pet = new Dog();

console.log(Object.getPrototypeOf(pet) === Dog); // false
console.log(Object.getPrototypeOf(pet) === Dog.prototype); // true
```

Instances are linked to `Dog.prototype`, not to the `Dog` function object
itself.

### Mistake 4: Expecting `Reflect.getPrototypeOf()` To Coerce Primitives

```js
Object.getPrototypeOf('abc'); // String.prototype
Reflect.getPrototypeOf('abc'); // TypeError
```

`Object.getPrototypeOf()` coerces primitives. `Reflect.getPrototypeOf()` does
not.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.getPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
- ECMAScript spec:
  [`Object.getPrototypeOf`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getprototypeof)
