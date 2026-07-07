# Object.setPrototypeOf()

## What Problem Does It Solve?

`Object.setPrototypeOf()` changes an object's immediate prototype.

That means it changes where JavaScript looks next when a property is not found
directly on the object.

```js
const profile = {
  name: 'Asha',
};

const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

Object.setPrototypeOf(profile, sharedBehavior);

console.log(profile.describe());
// Asha can use shared behavior
```

Use this method carefully.

Changing prototypes after an object already exists can make code harder to
reason about and can hurt performance.

When possible, prefer choosing the prototype while creating the object with
`Object.create()`.

## Quick Definition

`Object.setPrototypeOf(object, prototype)` sets `object`'s immediate prototype to
`prototype`.

`prototype` must be:

- an object,
- or `null`.

Example:

```js
const base = {
  role: 'member',
};

const user = {};

Object.setPrototypeOf(user, base);

console.log(Object.getPrototypeOf(user) === base);
// true
```

## Mental Model

Think of an object chain like this:

```text
object -> current prototype -> next prototype -> Object.prototype -> null
```

`Object.setPrototypeOf(object, newPrototype)` changes the first link:

```text
object -> newPrototype -> next prototype -> Object.prototype -> null
```

It does not copy properties.

It changes the lookup path.

## Syntax

```js
Object.setPrototypeOf(object, prototype);
```

## Parameters

- `object`: The value whose prototype should be changed.
- `prototype`: The new prototype. It must be an object or `null`.

`null` means the object should have no prototype.

## Return Value

`Object.setPrototypeOf()` returns the first argument.

For objects, it returns the same object after changing the prototype:

```js
const user = {};
const base = {};

const result = Object.setPrototypeOf(user, base);

console.log(result === user);
// true
```

For non-null primitive values, modern JavaScript returns the primitive value when
the prototype argument is valid:

```js
console.log(Object.setPrototypeOf(42, {}));
// 42
```

## Basic Example

```js
const profile = {
  name: 'Asha',
};

const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

Object.setPrototypeOf(profile, sharedBehavior);

console.log(Object.getPrototypeOf(profile) === sharedBehavior);
// true

console.log(profile.describe());
// Asha can use shared behavior
```

What happened:

- `profile` originally did not have `describe`.
- `Object.setPrototypeOf(profile, sharedBehavior)` changed `profile`'s immediate
  prototype.
- `profile.describe()` was found through the prototype chain.
- Inside `describe()`, `this` was still `profile`.

## It Changes The Same Object

`Object.setPrototypeOf()` mutates the object.

It does not create a new object.

```js
const user = {};
const base = {};

const result = Object.setPrototypeOf(user, base);

console.log(result === user);
// true
```

What happened:

- `user` itself was changed.
- `result` points to that same object.

## It Changes Only The Immediate Prototype

`Object.setPrototypeOf()` changes only the first prototype link.

```js
const grandParent = {
  category: 'learner',
};

const parent = Object.create(grandParent);
parent.role = 'member';

const account = {};

Object.setPrototypeOf(account, parent);

console.log(Object.getPrototypeOf(account) === parent);
// true

console.log(account.role);
// member

console.log(account.category);
// learner
```

What happened:

- `account`'s immediate prototype became `parent`.
- `role` was found on `parent`.
- `category` was found higher in the chain on `grandParent`.

## Setting The Prototype To `null`

The new prototype can be `null`.

That removes the prototype link.

```js
const dictionary = {
  topic: 'objects',
};

Object.setPrototypeOf(dictionary, null);

console.log(Object.getPrototypeOf(dictionary));
// null

console.log(typeof dictionary.toString);
// undefined
```

What happened:

- `dictionary` now has no prototype.
- It no longer inherits from `Object.prototype`.

For dictionary-like objects, `Object.create(null)` is usually clearer because it
creates the object with a null prototype from the beginning.

## The New Prototype Must Be Object Or `null`

The second argument must be an object or `null`.

```js
Object.setPrototypeOf({}, {});
Object.setPrototypeOf({}, null);
```

These are valid.

Primitive prototype values are not valid:

```js
Object.setPrototypeOf({}, 'not an object');
// TypeError
```

## `null` And `undefined` Object Arguments

The first argument cannot be `null` or `undefined`.

```js
Object.setPrototypeOf(null, {});
// TypeError

Object.setPrototypeOf(undefined, {});
// TypeError
```

JavaScript cannot change the prototype of `null` or `undefined`.

## Primitive Object Arguments

Non-null primitive values are returned as-is when the prototype argument is
valid.

```js
console.log(Object.setPrototypeOf(42, {}));
// 42
```

But the prototype argument is still checked first:

```js
Object.setPrototypeOf(42, 'not an object');
// TypeError
```

## Non-Extensible Objects

A non-extensible object cannot be changed to a different prototype.

```js
const base = {
  plan: 'free',
};

const account = {};

Object.setPrototypeOf(account, base);
Object.preventExtensions(account);

Object.setPrototypeOf(account, {});
// TypeError
```

What happened:

- `account` was made non-extensible.
- Changing its prototype to a different object failed.
- The old prototype stayed in place.

Setting the same prototype again is allowed:

```js
Object.setPrototypeOf(account, base);
// returns account
```

## Immutable Prototype Objects

Some built-in objects have an immutable prototype.

The main language-level example is `Object.prototype`.

`Object.prototype` already has `null` as its prototype:

```js
console.log(Object.getPrototypeOf(Object.prototype));
// null
```

Setting it to `null` again is allowed:

```js
Object.setPrototypeOf(Object.prototype, null);
```

Trying to change it to a different object throws:

```js
Object.setPrototypeOf(Object.prototype, {});
// TypeError
```

This protects important built-in prototype structure.

## Prefer `Object.create()` When Possible

Changing prototypes after creation can be slow and can make behavior harder to
follow.

If you already know the prototype you want, create the object with that
prototype:

```js
const sharedBehavior = {
  describe() {
    return `${this.name} can use shared behavior`;
  },
};

const profile = Object.create(sharedBehavior);
profile.name = 'Asha';

console.log(profile.describe());
// Asha can use shared behavior
```

Use `Object.setPrototypeOf()` when you really need to change the prototype of an
object that already exists.

## Constructor Prototype Chains

Older JavaScript code sometimes uses `Object.setPrototypeOf()` to connect
constructor-function prototype objects.

```js
function Human(name) {
  this.name = name;
}

Human.prototype.speak = function speak() {
  return `${this.name} says hello.`;
};

function SuperHero(name) {
  Human.call(this, name);
}

SuperHero.prototype.fly = function fly() {
  return `${this.name} is flying.`;
};

Object.setPrototypeOf(SuperHero.prototype, Human.prototype);

const hero = new SuperHero('Mina');

console.log(hero.fly());
// Mina is flying.

console.log(hero.speak());
// Mina says hello.
```

What happened:

- `hero` inherits from `SuperHero.prototype`.
- `SuperHero.prototype` inherits from `Human.prototype`.
- `fly()` was found on `SuperHero.prototype`.
- `speak()` was found higher in the prototype chain on `Human.prototype`.

In modern code, `class extends` is usually clearer.

## Static Inheritance Between Constructors

If you connect only the `.prototype` objects, instances inherit methods.

Static methods on the constructor function are a different link.

```js
Human.describeType = function describeType() {
  return 'human type';
};

Object.setPrototypeOf(SuperHero, Human);

console.log(SuperHero.describeType());
// human type
```

What happened:

- `Object.setPrototypeOf(SuperHero.prototype, Human.prototype)` connects instance
  methods.
- `Object.setPrototypeOf(SuperHero, Human)` connects static properties and
  methods between the constructor functions themselves.

## Difference From `Object.getPrototypeOf()`

`Object.getPrototypeOf()` reads the immediate prototype.

`Object.setPrototypeOf()` changes the immediate prototype.

```js
const base = {};
const user = {};

console.log(Object.getPrototypeOf(user) === base);
// false

Object.setPrototypeOf(user, base);

console.log(Object.getPrototypeOf(user) === base);
// true
```

Use `getPrototypeOf()` to inspect.

Use `setPrototypeOf()` to change.

## Difference From `Object.create()`

`Object.create(prototype)` creates a new object with a chosen prototype.

`Object.setPrototypeOf(object, prototype)` changes an existing object's
prototype.

```js
const base = {};

const created = Object.create(base);
const changed = {};

Object.setPrototypeOf(changed, base);

console.log(Object.getPrototypeOf(created) === base);
// true

console.log(Object.getPrototypeOf(changed) === base);
// true
```

Use `Object.create()` when you can choose the prototype during creation.

Use `Object.setPrototypeOf()` when the object already exists and the prototype
must be changed.

## Difference From `Reflect.setPrototypeOf()`

Both methods try to set an object's prototype.

The beginner-facing difference is the return value:

```js
const user = {};
const base = {};

console.log(Object.setPrototypeOf(user, base) === user);
// true

console.log(Reflect.setPrototypeOf(user, base));
// true
```

`Object.setPrototypeOf()` returns the object.

`Reflect.setPrototypeOf()` returns a boolean.

Another difference is primitive handling:

```js
Object.setPrototypeOf(42, {}); // 42
Reflect.setPrototypeOf(42, {}); // TypeError
```

`Reflect.setPrototypeOf()` expects an object.

## Difference From `__proto__`

You may see old code using `__proto__`.

```js
object.__proto__ = prototype;
```

Prefer `Object.setPrototypeOf(object, prototype)` in code that intentionally
changes a prototype.

Prefer `Object.create(prototype)` when creating a new object with a chosen
prototype.

## Important Notes

- `Object.setPrototypeOf()` is a static method.
- It changes the immediate prototype of an existing object.
- It returns the first argument.
- The new prototype must be an object or `null`.
- `null` and `undefined` cannot be used as the object argument.
- Non-null primitive object arguments are returned as-is when the prototype
  argument is valid.
- Non-extensible objects cannot be changed to a different prototype.
- Setting the same prototype again is allowed.
- `Object.prototype` has an immutable prototype.
- Changing prototypes after creation can hurt performance and readability.
- Prefer `Object.create()` when you can choose the prototype during creation.
- `Reflect.setPrototypeOf()` returns a boolean.

## When To Use It

Use `Object.setPrototypeOf()`:

- when you must change the prototype of an object that already exists,
- when reading or maintaining older prototype-based inheritance code,
- when you are intentionally wiring constructor-function prototype chains.

Use `Object.create()`:

- when you are creating a new object and already know the desired prototype.

Use `class extends`:

- when writing modern constructor-style inheritance.

## Common Mistakes

### Mistake 1: Using It For Normal Object Creation

```js
const user = {};
Object.setPrototypeOf(user, sharedBehavior);
```

If you control object creation, this is usually clearer:

```js
const user = Object.create(sharedBehavior);
```

### Mistake 2: Expecting Properties To Be Copied

```js
const base = {
  role: 'member',
};

const user = {};

Object.setPrototypeOf(user, base);

console.log(Object.hasOwn(user, 'role'));
// false
```

`role` is inherited from `base`.

It was not copied onto `user`.

### Mistake 3: Passing A Primitive As The New Prototype

```js
Object.setPrototypeOf({}, 'base');
// TypeError
```

The new prototype must be an object or `null`.

### Mistake 4: Changing A Non-Extensible Object's Prototype

```js
const user = {};
Object.preventExtensions(user);

Object.setPrototypeOf(user, {});
// TypeError
```

Non-extensible objects cannot be changed to a different prototype.

### Mistake 5: Forgetting Static Inheritance Is Separate

```js
Object.setPrototypeOf(SuperHero.prototype, Human.prototype);
```

This connects instance methods.

It does not connect static methods on `SuperHero` to static methods on `Human`.

Use a separate constructor-function link when you intentionally need static
inheritance:

```js
Object.setPrototypeOf(SuperHero, Human);
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.js
```

The runnable file shows:

- changing an object's immediate prototype,
- same-object return value,
- inherited property lookup,
- setting the prototype to `null`,
- invalid prototype errors,
- `null` and `undefined` object-argument errors,
- primitive object-argument behavior,
- non-extensible object behavior,
- immutable `Object.prototype` behavior,
- `Object.create()` comparison,
- constructor-function prototype chains,
- static inheritance between constructor functions,
- `Reflect.setPrototypeOf()` return value.

## References

- MDN:
  [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
- ECMAScript specification:
  [`Object.setPrototypeOf`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.setprototypeof)
