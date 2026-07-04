# Ways To Create Objects In JavaScript

## What Problem Does It Solve?

JavaScript gives us several ways to create objects. They can look similar, but
they are useful in different situations.

Common options include:

- object literal `{}`
- `Object()` / `new Object()`
- `Object.create()`
- `Object.create(null)`
- constructor function with `new`
- class with `new`
- `Object.fromEntries()`
- object spread `{ ...source }`
- `Object.assign()`

This note is a decision map. It explains when each creation style is useful and
points to the detailed pages for deeper behavior.

## Quick Definition

Object creation means making a new object value.

The most common option is an object literal:

```js
const user = {
  name: 'Asha',
  role: 'developer',
};
```

Use other object creation styles when you need a custom prototype, a
null-prototype dictionary, many similar instances, entries-to-object conversion,
or a shallow copy.

## Mental Model

```text
Known properties?        -> use {}
Need a custom prototype? -> use Object.create(prototype)
Need a dictionary?       -> use Object.create(null)
Need many similar items? -> use class or constructor function with new
Have key-value pairs?    -> use Object.fromEntries()
Need a shallow copy?     -> use object spread or Object.assign()
```

## Syntax Summary

```js
const plain = {};
const fromConstructor = new Object();
const withPrototype = Object.create(prototypeObject);
const dictionary = Object.create(null);
const instance = new ConstructorFunction();
const classInstance = new ClassName();
const fromPairs = Object.fromEntries(entries);
const copied = { ...source };
const assigned = Object.assign({}, source);
```

## Related Detail Pages

This page gives the overview. These pages explain individual tools in more
detail:

- `Object.create()`:
  [`src/object/methods/static-methods/objectCreate/index.js`](../../methods/static-methods/objectCreate/index.js)
- `Object.assign()`:
  [`src/object/methods/static-methods/assign/assign.md`](../../methods/static-methods/assign/assign.md)
- `Object.fromEntries()`:
  [`src/object/methods/static-methods/fromEntries/fromEntries.md`](../../methods/static-methods/fromEntries/fromEntries.md)
- Class basics:
  [`src/classes/basic-syntax-1.js`](../../../classes/basic-syntax-1.js)
- Key existence:
  [`src/object/concepts/key-existence/key-existence.md`](../key-existence/key-existence.md)
- `Object.hasOwn()`:
  [`src/object/methods/static-methods/hasOwn/hasOwn.md`](../../methods/static-methods/hasOwn/hasOwn.md)

## Object Literal `{}`

Use an object literal when you already know the properties.

```js
const profile = {
  name: 'Asha',
  role: 'developer',
};

console.log(profile); // { name: 'Asha', role: 'developer' }
```

What happened:

- A new plain object was created.
- The object has `Object.prototype` in its prototype chain.
- The properties were written directly inside `{}`.

This is the clearest everyday way to create an object.

## `Object()` / `new Object()`

`Object()` and `new Object()` can create an ordinary object.

```js
const settings = new Object();
settings.theme = 'dark';

console.log(settings); // { theme: 'dark' }
```

What happened:

- `new Object()` created a new ordinary object.
- The property was added after creation.

In normal code, `{}` is usually clearer than `new Object()`.

## `Object.create()` With A Prototype

Use `Object.create(prototype)` when you want the new object to inherit from a
specific prototype object.

```js
const sharedBehavior = {
  describe() {
    return `${this.name} is learning ${this.topic}`;
  },
};

const learner = Object.create(sharedBehavior);
learner.name = 'Knight';
learner.topic = 'objects';

console.log(learner.describe()); // Knight is learning objects
```

What happened:

- `learner` was created with `sharedBehavior` as its prototype.
- `name` and `topic` are own properties on `learner`.
- `describe()` is inherited from `sharedBehavior`.

Use this when the prototype choice matters.

## `Object.create(null)` For Dictionary Objects

`Object.create(null)` creates an object with no prototype.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(Object.getPrototypeOf(dictionary)); // null
console.log(Object.hasOwn(dictionary, 'topic')); // true
```

What happened:

- The object does not inherit from `Object.prototype`.
- It does not have methods like `dictionary.hasOwnProperty`.
- `Object.hasOwn(dictionary, 'topic')` still works.

Use this style when you want an object to behave like a plain key-value
dictionary.

## Constructor Function With `new`

Constructor functions are an older pattern for creating many similar objects.

```js
function Course(title, level) {
  this.title = title;
  this.level = level;
}

Course.prototype.label = function label() {
  return `${this.title} (${this.level})`;
};

const course = new Course('Objects', 'beginner');

console.log(course.label()); // Objects (beginner)
```

What happened:

- `new Course(...)` created a new object.
- Inside `Course`, `this` referred to that new object.
- `label()` was shared through `Course.prototype`.

You will see this pattern in older JavaScript code.

## Class With `new`

Classes are modern syntax for constructor-style objects.

```js
class Lesson {
  constructor(title) {
    this.title = title;
  }

  label() {
    return `Lesson: ${this.title}`;
  }
}

const lesson = new Lesson('Object creation');

console.log(lesson.label()); // Lesson: Object creation
```

What happened:

- `new Lesson(...)` created a new object.
- The `constructor` initialized the object.
- The `label()` method is shared by instances.

Use a class when you need many objects with the same behavior and a clear
constructor-style shape.

## `Object.fromEntries()`

Use `Object.fromEntries()` when you already have key-value pairs.

```js
const entries = [
  ['name', 'Asha'],
  ['role', 'developer'],
];

const user = Object.fromEntries(entries);

console.log(user); // { name: 'Asha', role: 'developer' }
```

What happened:

- Each inner array became one property.
- The first item became the key.
- The second item became the value.

This is useful after transforming entries with array methods.

## Object Spread And `Object.assign()`

Object spread and `Object.assign()` are common ways to create shallow copies or
merged objects.

```js
const defaults = {
  theme: 'light',
  notifications: true,
};

const userSettings = {
  theme: 'dark',
};

const spreadCopy = {
  ...defaults,
  ...userSettings,
};

const assignCopy = Object.assign({}, defaults, userSettings);

console.log(spreadCopy); // { theme: 'dark', notifications: true }
console.log(assignCopy); // { theme: 'dark', notifications: true }
```

What happened:

- A fresh target object was created.
- Properties from later objects replaced properties from earlier objects.
- The copy is shallow, so nested objects are still shared by reference.

Use these when you want a new object based on existing object properties.

## Important Notes

- Use `{}` for most everyday objects.
- Use `Object.create()` when the prototype matters.
- Use `Object.create(null)` for dictionary-like objects with no inherited
  object methods.
- Use classes or constructor functions when you need many similar objects.
- Use `Object.fromEntries()` when the data is already shaped like key-value
  pairs.
- Use object spread or `Object.assign()` for shallow copies and merges.
- Object spread and `Object.assign()` do not deep clone nested objects.

## When To Use Which?

Use `{}`:

- When you already know the properties.
- When you want the clearest plain object syntax.

Use `Object.create()`:

- When you intentionally choose the prototype.
- When creating a null-prototype dictionary.

Use a class or constructor function:

- When you need many similar objects.
- When those objects should share behavior.

Use `Object.fromEntries()`:

- When you have key-value pairs.
- When converting transformed entries back into an object.

Use object spread or `Object.assign()`:

- When creating a shallow copy.
- When merging existing object properties into a fresh object.

## Common Mistakes

### Mistake 1: Using `new Object()` When `{}` Is Clearer

```js
const a = new Object();
const b = {};
```

Both can create ordinary objects, but `{}` is shorter and easier to read.

### Mistake 2: Expecting `Object.create()` To Copy Properties

```js
const base = {
  role: 'admin',
};

const user = Object.create(base);

console.log(Object.hasOwn(user, 'role')); // false
console.log('role' in user); // true
```

`role` is inherited through the prototype. It was not copied as an own property.

### Mistake 3: Treating Shallow Copy Like Deep Copy

```js
const original = {
  preferences: {
    theme: 'dark',
  },
};

const copy = { ...original };
copy.preferences.theme = 'light';

console.log(original.preferences.theme); // light
```

The top-level object is new, but the nested `preferences` object is shared.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/concepts/create-object/create-object.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object initializer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- MDN:
  [`Object()` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
- MDN:
  [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- MDN:
  [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- MDN:
  [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- MDN:
  [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
- MDN:
  [`Classes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
