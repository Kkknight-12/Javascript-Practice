# Object.fromEntries()

## What Problem Does It Solve?

`Object.fromEntries()` creates an object from key-value pairs.

That is useful when data is already shaped like entries:

```js
const entries = [
  ['name', 'Asha'],
  ['role', 'developer'],
];

const user = Object.fromEntries(entries);

console.log(user);
// { name: 'Asha', role: 'developer' }
```

It is especially useful after transforming an object with `Object.entries()`
and array methods.

## Quick Definition

`Object.fromEntries(iterable)` returns a new object whose properties come from
the entries in `iterable`.

Each entry usually looks like this:

```js
[key, value]
```

Example:

```js
const user = Object.fromEntries([
  ['name', 'Asha'],
  ['role', 'developer'],
]);

console.log(user);
// { name: 'Asha', role: 'developer' }
```

## Mental Model

Think of `Object.fromEntries()` as:

```text
Object.fromEntries(entries)
  -> create a new ordinary object
  -> read each entry's 0 value as the key
  -> read each entry's 1 value as the value
  -> add that property to the new object
```

It answers:

```text
Can this iterable give me key-value pairs?
If yes, turn those pairs into object properties.
```

## Syntax

```js
Object.fromEntries(iterable);
```

## Parameters

- `iterable`: An iterable value that produces entry objects.

The outer value must be iterable, such as:

- an array of pairs,
- a `Map`,
- `URLSearchParams`,
- another iterable that produces entry objects.

Each entry should provide:

```text
entry[0] -> property key
entry[1] -> property value
```

Usually each entry is a two-item array.

## Return Value

`Object.fromEntries()` returns a new ordinary object.

```js
const entries = [['topic', 'objects']];

const result = Object.fromEntries(entries);

console.log(result);
// { topic: 'objects' }
```

The returned object is not the original iterable.

It is a fresh object with `Object.prototype` as its prototype.

## Basic Example

```js
const entries = [
  ['name', 'Asha'],
  ['role', 'developer'],
];

const profile = Object.fromEntries(entries);

console.log(profile);
// { name: 'Asha', role: 'developer' }
```

What happened:

- The first inner array became the `name` property.
- The second inner array became the `role` property.
- The first item in each pair became the key.
- The second item in each pair became the value.

## Converting A Map To An Object

`Map` is a natural input because a `Map` already produces key-value pairs.

```js
const profileMap = new Map([
  ['name', 'Mina'],
  ['topic', 'objects'],
]);

const profile = Object.fromEntries(profileMap);

console.log(profile);
// { name: 'Mina', topic: 'objects' }
```

What happened:

- The `Map` was iterable.
- Each `Map` entry was read as `[key, value]`.
- `Object.fromEntries()` created a plain object from those entries.

The original value is still a `Map`.

```js
console.log(profileMap instanceof Map); // true
```

## Transforming An Object

`Object.entries()` and `Object.fromEntries()` work well together.

```js
const stockCounts = {
  books: 10,
  pens: 2,
  bags: 25,
};

const restockedCounts = Object.fromEntries(
  Object.entries(stockCounts).map(([item, count]) => [item, count * 2]),
);

console.log(restockedCounts);
// { books: 20, pens: 4, bags: 50 }
```

What happened:

- `Object.entries(prices)` turned the object into pairs.
- `.map()` changed each value.
- `Object.fromEntries()` turned the new pairs back into an object.

This pattern is common when you want to transform object values.

## Duplicate Keys

Duplicate keys are allowed.

When the same key appears more than once, the later entry wins.

```js
const settings = Object.fromEntries([
  ['theme', 'light'],
  ['theme', 'dark'],
]);

console.log(settings);
// { theme: 'dark' }
```

What happened:

- The first entry created `theme: 'light'`.
- The second entry used the same key.
- The second value replaced the first value.

## Symbol Keys

`Object.fromEntries()` can create symbol-keyed properties.

```js
const id = Symbol('id');

const user = Object.fromEntries([
  ['name', 'Nina'],
  [id, 101],
]);

console.log(user[id]); // 101
console.log(Object.getOwnPropertySymbols(user).length); // 1
```

This is one important difference from `Object.entries()`.

`Object.entries()` only returns string-keyed properties.

`Object.fromEntries()` can create string-keyed properties and symbol-keyed
properties.

## Key Conversion

Every key is converted to a property key.

Property keys can only be strings or symbols.

```js
const result = Object.fromEntries([
  [1, 'one'],
  [true, 'yes'],
  [{}, 'object key'],
]);

console.log(result);
// { '1': 'one', true: 'yes', '[object Object]': 'object key' }

console.log(Object.keys(result));
// [ '1', 'true', '[object Object]' ]
```

What happened:

- `1` became the string key `'1'`.
- `true` became the string key `'true'`.
- `{}` became the string key `'[object Object]'`.

Use a `Map` if object identity must stay as the key.

```js
const firstKey = {};
const secondKey = {};

const result = Object.fromEntries([
  [firstKey, 'first'],
  [secondKey, 'second'],
]);

console.log(result);
// { '[object Object]': 'second' }
```

Both object keys became the same string key, so the later value won.

## What Counts As An Entry?

Each produced entry is usually an array.

```js
['name', 'Asha']
```

But the entry does not have to be an array.

It must be an object with values at property `0` and property `1`.

```js
const entry = {
  0: 'level',
  1: 'beginner',
};

console.log(Object.fromEntries([entry]));
// { level: 'beginner' }
```

What happened:

- `entry[0]` became the key.
- `entry[1]` became the value.

This is why the mental model is:

```text
entry[0] -> key
entry[1] -> value
```

## Missing And Extra Entry Values

If the value is missing, the property value becomes `undefined`.

```js
console.log(Object.fromEntries([['enabled']]));
// { enabled: undefined }
```

If the entry has extra items, they are ignored.

```js
console.log(Object.fromEntries([['name', 'Asha', 99]]));
// { name: 'Asha' }
```

`Object.fromEntries()` reads position `0` and position `1`.

It does not care about position `2`.

## Invalid Inputs

The outer argument must be iterable.

```js
Object.fromEntries({
  name: 'Asha',
}); // TypeError
```

A normal plain object is not directly iterable.

Use `Object.entries(object)` first when starting from a plain object.

```js
const user = {
  name: 'Asha',
};

const copy = Object.fromEntries(Object.entries(user));

console.log(copy);
// { name: 'Asha' }
```

Each produced entry must also be an object.

```js
Object.fromEntries(['ab']); // TypeError
```

The string `'ab'` is iterable, but it produces primitive characters.

The first produced entry is `'a'`, and `'a'` is not an entry object.

## A Subtle Set Mistake

A `Set` is iterable, but a `Set` item is not automatically treated as an inner
entry iterator.

```js
const setEntry = new Set(['status', 'active']);

console.log(Object.fromEntries([setEntry]));
// { undefined: undefined }
```

What happened:

- The outer array produced one entry.
- That entry was the `Set` object.
- `Object.fromEntries()` read `setEntry[0]` and `setEntry[1]`.
- A `Set` does not have those properties.
- So both the key and value were `undefined`.

Use an array pair instead:

```js
console.log(Object.fromEntries([['status', 'active']]));
// { status: 'active' }
```

## URLSearchParams

`URLSearchParams` produces key-value pairs, so it can be converted to an
object.

```js
const params = new URLSearchParams('topic=objects&level=beginner');

console.log(Object.fromEntries(params));
// { topic: 'objects', level: 'beginner' }
```

This is useful when turning query parameters into a plain object.

## Created Property Descriptors

The created properties are ordinary data properties.

```js
const result = Object.fromEntries([['topic', 'objects']]);

const descriptor = Object.getOwnPropertyDescriptor(result, 'topic');

console.log(descriptor);
// {
//   value: 'objects',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

The created property is writable, enumerable, and configurable.

## It Ignores `this`

`Object.fromEntries()` always creates an ordinary object.

Borrowing it with `.call()` does not create an instance of another constructor.

```js
function CustomObject() {}

const result = Object.fromEntries.call(CustomObject, [['topic', 'objects']]);

console.log(result instanceof CustomObject); // false
console.log(Object.getPrototypeOf(result) === Object.prototype); // true
```

What happened:

- `Object.fromEntries()` was called with a custom `this` value.
- That custom `this` value was ignored.
- The result was still a normal object.

## Difference From `Object.entries()`

`Object.entries()` goes from object to entries.

```js
Object.entries({ name: 'Asha' });
// [ [ 'name', 'Asha' ] ]
```

`Object.fromEntries()` goes from entries to object.

```js
Object.fromEntries([['name', 'Asha']]);
// { name: 'Asha' }
```

They are often used together.

One important difference:

- `Object.entries()` returns only own enumerable string-keyed properties.
- `Object.fromEntries()` can create string-keyed and symbol-keyed properties.

## Difference From `Map`

`Map` can keep any value as a key.

Objects can only use strings and symbols as property keys.

```js
const key = {};

const map = new Map([[key, 'value']]);

console.log(map.get(key)); // value
```

If you convert that `Map` to an object, the object key becomes a string.

```js
const object = Object.fromEntries(map);

console.log(object);
// { '[object Object]': 'value' }
```

Use `Map` when object identity matters.

Use `Object.fromEntries()` when you want plain object properties.

## Important Notes

- `Object.fromEntries()` is a static method on `Object`.
- It creates a new ordinary object.
- The input must be iterable.
- Each produced entry must be an object.
- Usually each entry is a two-item array: `[key, value]`.
- It reads `entry[0]` as the key.
- It reads `entry[1]` as the value.
- Keys are converted to property keys.
- Property keys can be strings or symbols.
- Duplicate keys keep the last value.
- Missing values become `undefined`.
- Extra entry values are ignored.
- Created properties are writable, enumerable, and configurable.
- It ignores `this` and does not create custom constructor instances.

## When To Use It

Use `Object.fromEntries()`:

- when you already have key-value pairs,
- when converting a `Map` to a plain object,
- when converting `URLSearchParams` to a plain object,
- when rebuilding an object after transforming `Object.entries()`,
- when you want to create symbol-keyed properties from entries.

Use `Object.entries()`:

- when starting from a plain object and you need key-value pairs.

Use `Map`:

- when keys need to stay as objects or functions.

## Common Mistakes

### Mistake 1: Passing A Plain Object Directly

```js
Object.fromEntries({
  name: 'Asha',
}); // TypeError
```

Plain objects are not directly iterable.

Use `Object.entries()` first:

```js
Object.fromEntries(Object.entries({ name: 'Asha' }));
// { name: 'Asha' }
```

### Mistake 2: Thinking Object Keys Stay As Object Keys

```js
const key = {};

const result = Object.fromEntries([[key, 'value']]);

console.log(result);
// { '[object Object]': 'value' }
```

The object key was converted to a string.

Use a `Map` if the key must stay as the object itself.

### Mistake 3: Expecting A Set Entry To Work Like An Array Pair

```js
const setEntry = new Set(['status', 'active']);

console.log(Object.fromEntries([setEntry]));
// { undefined: undefined }
```

`Object.fromEntries()` reads `entry[0]` and `entry[1]`.

A `Set` does not provide values through numeric properties.

### Mistake 4: Forgetting Duplicate Keys Overwrite Earlier Values

```js
const result = Object.fromEntries([
  ['theme', 'light'],
  ['theme', 'dark'],
]);

console.log(result);
// { theme: 'dark' }
```

The later value won.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/fromEntries/fromEntries.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- ECMAScript spec:
  [`Object.fromEntries`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.fromentries)
  and
  [`AddEntriesFromIterable`](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-add-entries-from-iterable)
