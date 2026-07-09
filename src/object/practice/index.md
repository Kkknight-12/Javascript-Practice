# Object Practice Review

## What Problem Does It Solve?

The object section has many related tools.

This practice file helps you use them together instead of studying each method
in isolation.

It reviews these questions:

- Is this property own or inherited?
- Is this property enumerable or non-enumerable?
- Is this key a string key or a symbol key?
- Do I need keys, values, entries, descriptors, or all own keys?
- Is this object using another object as its prototype?
- Can this sealed object still update an existing property?

## Quick Goal

Run the practice file and connect each output to the object concept behind it.

```bash
node src/object/practice/index.js
```

The file is not trying to teach one method only.

It is a review playground for the object section.

## Mental Model

When you work with objects, do not ask only:

```text
Does this property exist?
```

Ask the more precise question:

```text
Is it own or inherited?
Is it enumerable or non-enumerable?
Is it string-keyed or symbol-keyed?
Do I need the value, the key, or the descriptor?
```

Different methods answer different questions.

## Property Visibility Practice

The practice file creates an object with several kinds of properties:

```js
const sharedAccountFields = {
  plan: 'free',
};

const privateToken = Symbol('privateToken');
const account = Object.create(sharedAccountFields);

account.name = 'Asha';
account.topic = 'objects';
account[privateToken] = 'secret-token';

Object.defineProperty(account, 'internalId', {
  value: 42,
  enumerable: false,
});
```

The object has:

- own enumerable string properties: `name`, `topic`,
- one inherited property: `plan`,
- one own symbol property: `privateToken`,
- one own non-enumerable string property: `internalId`.

That is why these methods show different results.

## `Object.keys()`

```js
Object.keys(account);
// ['name', 'topic']
```

`Object.keys()` returns own enumerable string keys only.

It skips:

- inherited keys,
- non-enumerable keys,
- symbol keys.

## `Object.values()`

```js
Object.values(account);
// ['Asha', 'objects']
```

`Object.values()` reads the values from the same property group that
`Object.keys()` sees.

That means it returns values from own enumerable string-keyed properties only.

## `Object.entries()`

```js
Object.entries(account);
// [['name', 'Asha'], ['topic', 'objects']]
```

`Object.entries()` returns key-value pairs from own enumerable string-keyed
properties.

Use it when you need both the property name and the value.

## `Object.hasOwn()`

```js
Object.hasOwn(account, 'internalId');
// true

Object.hasOwn(account, privateToken);
// true
```

`Object.hasOwn()` checks whether the property exists directly on the object.

It is not limited to enumerable string keys.

That is why it can see:

- non-enumerable own properties,
- symbol-keyed own properties.

It does not count inherited properties as own:

```js
Object.hasOwn(account, 'plan');
// false
```

## `in`

```js
'plan' in account;
// true
```

The `in` operator checks the whole prototype chain.

That means it can find inherited properties.

Use it when inherited properties should count.

Use `Object.hasOwn()` when only direct properties should count.

## `Reflect.ownKeys()`

```js
Reflect.ownKeys(account);
// ['name', 'topic', 'internalId', Symbol(privateToken)]
```

`Reflect.ownKeys()` returns all own keys:

- enumerable string keys,
- non-enumerable string keys,
- symbol keys.

It still does not return inherited keys.

## Descriptor Practice

The practice file defines a hidden read-only property:

```js
Object.defineProperty(lesson, 'internalId', {
  value: 'lesson-001',
  enumerable: false,
  writable: false,
  configurable: false,
});
```

Then it reads the descriptor:

```js
const descriptor = Object.getOwnPropertyDescriptor(lesson, 'internalId');
```

A descriptor explains the property's settings:

- `value`: the stored value,
- `enumerable`: whether listing tools like `Object.keys()` can see it,
- `writable`: whether assignment can change it,
- `configurable`: whether the property can be deleted or reconfigured.

So `internalId` exists, but `Object.keys(lesson)` does not list it because it is
non-enumerable.

## Prototype Practice

This part creates one object using another object as its prototype:

```js
const learner = Object.create(sharedLearnerBehavior);
```

That means:

```text
learner -> sharedLearnerBehavior -> Object.prototype -> null
```

The method `describe()` is not copied onto `learner`.

It is inherited from `sharedLearnerBehavior`.

```js
learner.describe();
// 'Mina studies Object.create()'

Object.hasOwn(learner, 'describe');
// false
```

This check confirms the prototype relationship:

```js
sharedLearnerBehavior.isPrototypeOf(learner);
// true
```

## Transform Object Data

The practice file starts with this object:

```js
const rawScores = {
  asha: 92,
  mina: 76,
  nia: 88,
};
```

Use `Object.entries()` when you need names and scores together:

```js
Object.entries(rawScores);
// [['asha', 92], ['mina', 76], ['nia', 88]]
```

Then you can transform the pairs and rebuild an object:

```js
const scoreLabels = Object.fromEntries(
  Object.entries(rawScores).map(([name, score]) => {
    return [name, score >= 85 ? 'high' : 'practice'];
  }),
);
```

The mental flow is:

```text
object -> entries -> transformed entries -> object
```

Use `Object.values()` when only the numbers matter:

```js
const totalScore = Object.values(rawScores).reduce((total, score) => {
  return total + score;
}, 0);
```

Here the names do not matter, so `Object.values()` is the clean fit.

## Grouping Practice

`Object.groupBy()` groups iterable values.

```js
const tasksByStatus = Object.groupBy(tasks, ({ status }) => status);
```

The callback returns the group key.

For the task list, the group keys are:

```js
['todo', 'doing']
```

Important detail:

```js
Object.getPrototypeOf(tasksByStatus) === null;
// true
```

`Object.groupBy()` returns a null-prototype object.

That is why the practice file uses:

```js
Object.hasOwn(tasksByStatus, 'todo');
```

This works even when the result object does not inherit
`Object.prototype.hasOwnProperty()`.

## Sealed Object Practice

`Object.seal(object)` prevents:

- adding new properties,
- deleting existing properties,
- reconfiguring existing properties.

But it can still allow updating an existing property if that property is
writable.

```js
const preferences = {
  theme: 'light',
};

Object.seal(preferences);

preferences.theme = 'dark';
preferences.language = 'en';

console.log(preferences.theme);
// 'dark'

console.log(Object.hasOwn(preferences, 'language'));
// false
```

What happened:

- `theme` already existed and was writable, so it changed.
- `language` did not exist, so it was not added.

## Method Choice Summary

Use `Object.keys()`:

- when you need own enumerable string keys.

Use `Object.values()`:

- when you need own enumerable string-keyed values.

Use `Object.entries()`:

- when you need own enumerable string-keyed pairs.

Use `Object.hasOwn()`:

- when you need to know whether a property exists directly on the object.

Use `Reflect.ownKeys()`:

- when you need all own keys, including non-enumerable string keys and symbol
  keys.

Use `Object.getOwnPropertyDescriptor()`:

- when you need a property's settings.

Use `Object.create()`:

- when you want a new object with a chosen prototype.

Use `Object.groupBy()`:

- when you want to group iterable values into arrays by a callback result.

## Common Mistakes

### Mistake 1: Thinking `Object.keys()` Shows Everything

`Object.keys()` does not show everything.

It only shows own enumerable string keys.

Use `Reflect.ownKeys()` when symbol keys or non-enumerable keys matter.

### Mistake 2: Treating Inherited Properties As Own Properties

```js
'plan' in account;
// true

Object.hasOwn(account, 'plan');
// false
```

Both outputs can be correct because they answer different questions.

### Mistake 3: Thinking Sealed Means Fully Frozen

A sealed object can still update existing writable properties.

Use `Object.freeze()` when existing data properties should become read-only too.

### Mistake 4: Calling `hasOwnProperty()` On Null-Prototype Results

Some objects do not inherit from `Object.prototype`.

Use this:

```js
Object.hasOwn(object, key);
```

instead of this:

```js
object.hasOwnProperty(key);
```

when the object's prototype shape is uncertain.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/practice/index.js
```

The runnable file shows:

- own vs inherited properties,
- enumerable vs non-enumerable properties,
- string keys vs symbol keys,
- descriptors,
- prototypes,
- object transformations,
- `Object.groupBy()`,
- sealed object update behavior.

## References

- MDN:
  [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- MDN:
  [`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- MDN:
  [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- MDN:
  [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- MDN:
  [`Object.hasOwn()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)
- MDN:
  [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- MDN:
  [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
- MDN:
  [`Object.groupBy()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
- MDN:
  [`Object.seal()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
- MDN:
  [`Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
