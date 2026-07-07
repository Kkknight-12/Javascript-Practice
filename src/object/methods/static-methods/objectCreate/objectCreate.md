# Object.create()

## What Problem Does It Solve?

`Object.create()` creates a new object with a prototype you choose.

That is useful when the prototype link matters:

```js
const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Asha';
learner.topic = 'prototypes';

console.log(learner.describe());
// Asha is learning prototypes
```

The important idea is:

```text
Object.create(sharedBehavior)
creates a new object and sets sharedBehavior as that new object's prototype.
```

It does not copy `sharedBehavior` into the new object.

## Quick Definition

`Object.create(proto)` creates a new object whose prototype is `proto`.

`proto` must be:

- an object,
- or `null`.

Example:

```js
const base = {
  role: 'member',
};

const user = Object.create(base);

console.log(Object.getPrototypeOf(user) === base);
// true
```

## Mental Model

Think of `Object.create()` as:

```text
new object -> chosen prototype -> next prototype -> Object.prototype -> null
```

When you write:

```js
const learner = Object.create(sharedBehavior);
```

the chain becomes:

```text
learner -> sharedBehavior -> Object.prototype -> null
```

`sharedBehavior` itself becomes the immediate prototype of `learner`.

## Syntax

```js
Object.create(proto);
Object.create(proto, propertiesObject);
```

## Parameters

- `proto`: The object that should become the new object's prototype, or `null`.
- `propertiesObject`: Optional. A descriptor map that defines own properties on
  the new object.

The second argument uses the same descriptor shape as `Object.defineProperties()`.

## Return Value

`Object.create()` returns a new object.

That new object has its `[[Prototype]]` set to the `proto` argument.

```js
const base = {};
const child = Object.create(base);

console.log(Object.getPrototypeOf(child) === base);
// true
```

## Basic Example

```js
const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Asha';
learner.topic = 'Object.create()';

console.log(learner.describe());
// Asha is learning Object.create()
```

What happened:

- `learner` was created as a new object.
- `sharedBehavior` became the prototype of `learner`.
- `name` and `topic` are own properties on `learner`.
- `describe()` is inherited from `sharedBehavior`.
- When `learner.describe()` runs, `this` is `learner`.

## It Does Not Copy Prototype Properties

This is one of the most important points.

`Object.create(base)` does not copy `base` properties into the new object.

It creates a prototype link.

```js
const base = {
  role: 'admin',
};

const user = Object.create(base);

console.log(Object.hasOwn(user, 'role'));
// false

console.log('role' in user);
// true
```

What happened:

- `role` lives on `base`.
- `user` inherits from `base`.
- `user` does not own `role`.
- The `in` operator returns `true` because it checks the prototype chain.

## Own Properties Can Shadow Inherited Properties

If the new object gets its own property with the same name, the own property wins
when reading normally.

```js
const defaults = {
  theme: 'light',
  notifications: true,
};

const settings = Object.create(defaults);
settings.theme = 'dark';

console.log(settings.theme);
// dark

console.log(settings.notifications);
// true
```

What happened:

- `settings.theme = 'dark'` created an own property on `settings`.
- That own `theme` shadows the inherited `defaults.theme`.
- `notifications` was not found on `settings`, so JavaScript looked at
  `defaults`.

## `Object.create(null)`

`Object.create(null)` creates an object with no prototype.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.getPrototypeOf(dictionary));
// null

console.log(Object.keys(dictionary));
// [ 'topic' ]
```

What happened:

- `dictionary` has no prototype.
- It does not inherit from `Object.prototype`.
- It can still have own properties.

Because it does not inherit from `Object.prototype`, this method is not available
directly:

```js
console.log(typeof dictionary.hasOwnProperty);
// undefined
```

Static methods still work:

```js
console.log(Object.hasOwn(dictionary, 'topic'));
// true
```

Borrowed methods also still work because the method is called from
`Object.prototype`, not from `dictionary`:

```js
console.log(Object.prototype.hasOwnProperty.call(dictionary, 'topic'));
// true
```

## Second Argument: Property Descriptors

The optional second argument defines own properties on the new object.

It is not a normal object of values.

It is a descriptor map:

```js
const profile = Object.create(Object.prototype, {
  name: {
    value: 'Mina',
    enumerable: true,
    writable: true,
    configurable: true,
  },
  internalId: {
    value: 42,
  },
});

console.log(profile.name);
// Mina

console.log(profile.internalId);
// 42
```

What happened:

- `profile` was created with `Object.prototype` as its prototype.
- `name` was defined as an own data property.
- `internalId` was also defined as an own data property.

Descriptor flags default to `false` when you do not write them:

```js
const descriptor = Object.getOwnPropertyDescriptor(profile, 'internalId');

console.log(descriptor);
// {
//   value: 42,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

So if you want object-literal-like behavior, write the descriptor flags
explicitly:

```js
const profile = Object.create(Object.prototype, {
  name: {
    value: 'Mina',
    writable: true,
    enumerable: true,
    configurable: true,
  },
});
```

## Descriptor Map Uses Own Enumerable Keys

The `propertiesObject` argument works like `Object.defineProperties()`.

Only the descriptor map's own enumerable keys are used.

```js
const descriptors = {};

descriptors.visible = {
  value: 'shown',
  enumerable: true,
};

Object.defineProperty(descriptors, 'hidden', {
  value: {
    value: 'secret',
    enumerable: true,
  },
  enumerable: false,
});

const result = Object.create(Object.prototype, descriptors);

console.log(result.visible);
// shown

console.log(result.hidden);
// undefined
```

What happened:

- `descriptors.visible` is an own enumerable key on the descriptor map.
- Its value is used as the descriptor for `result.visible`.
- `descriptors.hidden` is an own non-enumerable key on the descriptor map.
- Because the descriptor map key is non-enumerable, it is skipped.
- So `result.hidden` is not created.

This is the same rule taught in `Object.defineProperties()`.

## Object Literal Comparison

A normal object literal creates an ordinary object.

```js
const literalObject = {};
```

That is similar to:

```js
const createdPlainObject = Object.create(Object.prototype);
```

Both objects have `Object.prototype` as their prototype:

```js
console.log(Object.getPrototypeOf(literalObject) === Object.prototype);
// true

console.log(Object.getPrototypeOf(createdPlainObject) === Object.prototype);
// true
```

For everyday objects, `{}` is clearer.

Use `Object.create()` when choosing the prototype is the point.

## Difference From `new Constructor()`

`new Constructor()` does two big things:

- creates a new object linked to `Constructor.prototype`,
- runs the constructor function to initialize that object.

`Object.create(Constructor.prototype)` only creates the prototype link.

It does not run the constructor.

```js
function Course(title) {
  this.title = title;
}

Course.prototype.label = function label() {
  return `Course: ${this.title}`;
};

const realCourse = new Course('Objects');
const prototypeOnlyCourse = Object.create(Course.prototype);

console.log(realCourse.title);
// Objects

console.log(prototypeOnlyCourse.title);
// undefined

console.log(prototypeOnlyCourse instanceof Course);
// true
```

What happened:

- `realCourse` was created by `new Course('Objects')`.
- The `Course` function ran and assigned `title`.
- `prototypeOnlyCourse` was created with `Course.prototype` as its prototype.
- The `Course` function did not run for `prototypeOnlyCourse`.
- `prototypeOnlyCourse instanceof Course` is still `true` because `instanceof`
  checks the prototype chain.

This is why a prototype-shaped object is not always the same as a properly
initialized instance.

## Constructor Inheritance Pattern

Older JavaScript code sometimes uses `Object.create()` to connect constructor
function prototypes.

```js
function Shape() {
  this.x = 0;
  this.y = 0;
}

Shape.prototype.move = function move(x, y) {
  this.x += x;
  this.y += y;
};

function Rectangle() {
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype, {
  constructor: {
    value: Rectangle,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Shape); // true
```

What happened:

- `Rectangle.prototype` was replaced with an object that inherits from
  `Shape.prototype`.
- The `constructor` property was restored to `Rectangle`.
- `new Rectangle()` creates objects that can use both `Rectangle.prototype` and
  `Shape.prototype`.

In modern application code, `class extends` is usually clearer for this pattern.

## Invalid Prototype Values

The first argument must be an object or `null`.

```js
Object.create({});
Object.create(null);
```

These are valid.

Primitive values are not valid prototypes:

```js
Object.create('not an object');
// TypeError
```

## Important Notes

- `Object.create()` is a static method on `Object`.
- It creates a new object.
- The first argument becomes the new object's prototype.
- The first argument must be an object or `null`.
- `Object.create(base)` does not copy `base` properties.
- Inherited properties are found through the prototype chain.
- Own properties can shadow inherited properties.
- `Object.create(null)` creates a null-prototype object.
- The optional second argument is a descriptor map.
- Descriptor flags default to `false` when omitted.
- `Object.create(Constructor.prototype)` does not run the constructor.
- `{}` is usually clearer for everyday plain objects.

## When To Use It

Use `Object.create()`:

- when you intentionally want to choose the new object's prototype,
- when you want an object to inherit from a specific object,
- when you want a null-prototype dictionary object,
- when you need to define properties with descriptors during creation,
- when reading or maintaining older constructor-inheritance code.

Use `{}`:

- when you just need a normal plain object.

Use `new` or `class`:

- when you need constructor initialization.

## Common Mistakes

### Mistake 1: Expecting Prototype Properties To Be Copied

```js
const base = {
  role: 'admin',
};

const user = Object.create(base);

console.log(Object.hasOwn(user, 'role'));
// false
```

`role` is inherited from `base`.

It was not copied onto `user`.

### Mistake 2: Forgetting Descriptor Defaults

```js
const user = Object.create(Object.prototype, {
  name: {
    value: 'Asha',
  },
});

console.log(Object.keys(user));
// []
```

The `name` property exists, but `enumerable` defaults to `false`.

If you want it to appear in `Object.keys()`, write `enumerable: true`.

### Mistake 3: Thinking `Object.create(Constructor.prototype)` Runs The Constructor

```js
function Course(title) {
  this.title = title;
}

const course = Object.create(Course.prototype);

console.log(course.title);
// undefined
```

The new object has the prototype link, but the constructor function did not run.

### Mistake 4: Passing A Primitive As The Prototype

```js
Object.create(42);
// TypeError
```

The prototype must be an object or `null`.

### Mistake 5: Expecting Null-Prototype Objects To Have Object Methods

```js
const dictionary = Object.create(null);

console.log(typeof dictionary.hasOwnProperty);
// undefined
```

Use `Object.hasOwn(dictionary, key)` for ownership checks.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/objectCreate/objectCreate.js
```

The runnable file shows:

- choosing a prototype,
- inherited methods,
- own properties versus inherited properties,
- shadowing inherited properties,
- null-prototype objects,
- second-argument descriptor maps,
- descriptor defaults,
- descriptor-map enumerability,
- object literal comparison,
- `Object.create(Constructor.prototype)` versus `new Constructor()`,
- invalid prototype errors.

## References

- MDN:
  [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- ECMAScript specification:
  [`Object.create`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.create)
