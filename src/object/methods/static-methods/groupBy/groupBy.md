# Object.groupBy()

## What Problem Does It Solve?

`Object.groupBy()` groups values from an iterable into separate arrays.

That is useful when you have one list, but you want the values separated by a
category:

```js
const inventory = [
  { name: 'bananas', type: 'fruit' },
  { name: 'cherries', type: 'fruit' },
  { name: 'goat', type: 'meat' },
];

const grouped = Object.groupBy(inventory, (item) => item.type);

console.log(grouped.fruit);
// [
//   { name: 'bananas', type: 'fruit' },
//   { name: 'cherries', type: 'fruit' }
// ]
```

Without `Object.groupBy()`, you usually write a manual `reduce()` loop and
create the group arrays yourself.

## Quick Definition

`Object.groupBy(items, callbackFn)` returns a new object.

Each property in that object is a group.

Each group contains an array of values from the original iterable.

```js
const numbers = [1, 2, 3, 4];

const grouped = Object.groupBy(numbers, (number) => {
  return number % 2 === 0 ? 'even' : 'odd';
});

console.log(grouped.odd); // [1, 3]
console.log(grouped.even); // [2, 4]
```

The real returned object has a null prototype, so Node may print it as:

```text
[Object: null prototype] { odd: [ 1, 3 ], even: [ 2, 4 ] }
```

That is still the grouped result.

## Mental Model

Think of `Object.groupBy()` as:

```text
Take each item from the iterable.
Run the callback for that item.
Use the callback result as the group key.
Put the item into the array for that group key.
Return an object that holds all those arrays.
```

It answers:

```text
Which bucket should each item go into?
```

## Syntax

```js
Object.groupBy(items, callbackFn);
```

## Parameters

- `items`: An iterable value.
- `callbackFn`: A function that decides the group key for each item.

The input can be any iterable, such as:

- an array,
- a string,
- a `Set`,
- a `Map`,
- the result of another iterable-producing operation.

The callback receives two arguments:

```js
callbackFn(element, index);
```

- `element`: The current value from the iterable.
- `index`: The zero-based index of that value during iteration.

There is no third `thisArg` parameter.

## Return Value

`Object.groupBy()` returns a new null-prototype object.

Each property is a group key.

Each value is an array containing the original elements that matched that key.

```js
const words = ['hi', 'sun', 'tree'];

const grouped = Object.groupBy(words, (word) => word.length);

console.log(grouped[2]); // [ 'hi' ]
console.log(grouped[3]); // [ 'sun' ]
console.log(grouped[4]); // [ 'tree' ]
```

Number group keys become string property keys:

```js
console.log(Object.keys(grouped));
// [ '2', '3', '4' ]
```

## Basic Example

```js
const inventory = [
  { name: 'asparagus', type: 'vegetables', quantity: 5 },
  { name: 'bananas', type: 'fruit', quantity: 0 },
  { name: 'goat', type: 'meat', quantity: 23 },
  { name: 'cherries', type: 'fruit', quantity: 5 },
  { name: 'fish', type: 'meat', quantity: 22 },
];

const grouped = Object.groupBy(inventory, (item) => item.type);

console.log(grouped.fruit);
// [
//   { name: 'bananas', type: 'fruit', quantity: 0 },
//   { name: 'cherries', type: 'fruit', quantity: 5 }
// ]
```

What happened:

- `Object.groupBy()` read each item from `inventory`.
- The callback returned the item's `type`.
- Items with the same type were placed into the same array.
- The returned object got one property per type.

## The Callback Decides The Group Key

The callback does not have to return an existing property.

It can calculate a group name:

```js
const inventory = [
  { name: 'asparagus', quantity: 5 },
  { name: 'bananas', quantity: 0 },
  { name: 'fish', quantity: 22 },
];

const grouped = Object.groupBy(inventory, ({ quantity }) => {
  return quantity === 0 ? 'outOfStock' : 'available';
});

console.log(grouped.outOfStock);
// [ { name: 'bananas', quantity: 0 } ]
```

What happened:

- The callback returned `'outOfStock'` for bananas.
- It returned `'available'` for the other items.
- `Object.groupBy()` created those two groups.

## The Callback Receives The Index

The second callback argument is the current index.

```js
const steps = ['draft', 'review', 'publish', 'share'];

const grouped = Object.groupBy(steps, (_step, index) => {
  return index % 2 === 0 ? 'evenIndex' : 'oddIndex';
});

console.log(grouped.evenIndex);
// [ 'draft', 'publish' ]
```

What happened:

- `draft` had index `0`, so it went into `evenIndex`.
- `publish` had index `2`, so it also went into `evenIndex`.
- The callback can use the value, the index, or both.

## Values Keep Their Original Order

Values inside each group keep the order from the original iterable.

```js
const numbers = [5, 1, 3, 2];

const grouped = Object.groupBy(numbers, (number) => {
  return number > 2 ? 'large' : 'small';
});

console.log(grouped.large);
// [ 5, 3 ]

console.log(grouped.small);
// [ 1, 2 ]
```

What happened:

- `5` appeared before `3` in the original array.
- So `5` appears before `3` inside the `large` group.
- `Object.groupBy()` groups values, but it does not sort them.

## The Result Has A Null Prototype

The object returned by `Object.groupBy()` does not inherit from
`Object.prototype`.

```js
const grouped = Object.groupBy(['apple', 'banana'], (fruit) => {
  return fruit[0];
});

console.log(Object.getPrototypeOf(grouped)); // null
console.log(typeof grouped.hasOwnProperty); // undefined
```

This is intentional.

The result object is meant to hold group data without inherited object methods
or inherited object keys getting in the way.

Use `Object.hasOwn()` when you need to check whether a group exists:

```js
console.log(Object.hasOwn(grouped, 'a')); // true
console.log(Object.hasOwn(grouped, 'z')); // false
```

## Non-String Keys Are Usually Converted To Strings

Object property keys can be strings or symbols.

If the callback returns a value that is not a string or symbol, JavaScript
converts it into a property key.

```js
const numbers = [1, 2, 3, 4];

const grouped = Object.groupBy(numbers, (number) => {
  return number % 2 === 0;
});

console.log(Object.keys(grouped));
// [ 'false', 'true' ]

console.log(grouped.true);
// [ 2, 4 ]
```

What happened:

- The callback returned boolean values: `true` or `false`.
- Object keys cannot be booleans.
- JavaScript converted them to the string keys `'true'` and `'false'`.

This also happens with numbers:

```js
const grouped = Object.groupBy(['hi', 'sun', 'tree'], (word) => word.length);

console.log(Object.keys(grouped));
// [ '2', '3', '4' ]
```

The values `2`, `3`, and `4` became the string keys `'2'`, `'3'`, and `'4'`.

## Symbol Group Keys

The callback can return a symbol.

Symbol group keys stay as symbols.

```js
const short = Symbol('short');
const long = Symbol('long');

const grouped = Object.groupBy(['js', 'node', 'css'], (word) => {
  return word.length <= 3 ? short : long;
});

console.log(grouped[short]);
// [ 'js', 'css' ]

console.log(Object.getOwnPropertySymbols(grouped));
// [ Symbol(short), Symbol(long) ]
```

What happened:

- The callback returned `short` or `long`.
- Those are symbols, so JavaScript used symbol property keys.
- `Object.keys(grouped)` would not show those symbol keys.

Use `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()` when symbol groups
matter.

## It Works With Any Iterable

`Object.groupBy()` is not an array method.

It accepts an iterable.

That means a `Set` also works:

```js
const tags = new Set(['js', 'css', 'html', 'api']);

const grouped = Object.groupBy(tags, (tag) => tag.length);

console.log(grouped[3]);
// [ 'css', 'api' ]
```

What happened:

- The `Set` produced each tag.
- The callback returned each tag's length.
- Tags with the same length went into the same group.

## Plain Objects Are Not Iterable

`Object.groupBy()` groups iterable values.

A plain object is not directly iterable:

```js
const scores = {
  Asha: 92,
  Mina: 76,
};

Object.groupBy(scores, (score) => score >= 80);
// TypeError
```

If you want to group data from an object's properties, first turn the object
into an iterable form:

```js
const scores = {
  Asha: 92,
  Mina: 76,
  Nia: 88,
};

const grouped = Object.groupBy(Object.entries(scores), ([_name, score]) => {
  return score >= 85 ? 'high' : 'practice';
});

console.log(grouped.high);
// [ [ 'Asha', 92 ], [ 'Nia', 88 ] ]
```

What happened:

- `Object.entries(scores)` created an array of `[name, score]` pairs.
- That array is iterable.
- `Object.groupBy()` grouped those pairs.

## The Elements Are Not Deep Copies

The grouped arrays contain the original elements.

If those elements are objects, the grouped arrays hold references to the same
objects.

```js
const inventory = [
  { name: 'asparagus', quantity: 5 },
  { name: 'fish', quantity: 22 },
];

const grouped = Object.groupBy(inventory, ({ quantity }) => {
  return quantity > 5 ? 'enough' : 'low';
});

console.log(grouped.low[0] === inventory[0]); // true

inventory[0].quantity = 10;

console.log(grouped.low[0].quantity); // 10
```

What happened:

- `grouped.low[0]` and `inventory[0]` point to the same object.
- Changing the object through one reference is visible through the other.
- The grouping is not automatically recalculated after the object changes.

## Difference From `Map.groupBy()`

Use `Object.groupBy()` when group names are naturally property keys.

That usually means strings, numbers that can become strings, or symbols.

```js
const grouped = Object.groupBy(['apple', 'banana'], (fruit) => fruit[0]);

console.log(grouped.a);
// [ 'apple' ]
```

Use `Map.groupBy()` when the group key should be an object or another value
that should keep its identity.

```js
const warmGroup = { label: 'warm' };
const coolGroup = { label: 'cool' };

const colors = [
  { name: 'rose', group: warmGroup },
  { name: 'sky', group: coolGroup },
  { name: 'sun', group: warmGroup },
];

const objectGrouped = Object.groupBy(colors, ({ group }) => group);

console.log(Object.keys(objectGrouped));
// [ '[object Object]' ]

const mapGrouped = Map.groupBy(colors, ({ group }) => group);

console.log(mapGrouped.get(warmGroup));
// [
//   { name: 'rose', group: warmGroup },
//   { name: 'sun', group: warmGroup }
// ]
```

What happened:

- `Object.groupBy()` converted object keys into property keys.
- Both plain object keys became the same string: `'[object Object]'`.
- `Map.groupBy()` kept the object keys by identity.

## Difference From `Array.prototype.reduce()`

`reduce()` can also group values, but you must build the accumulator yourself.

```js
const numbers = [1, 2, 3, 4];

const grouped = numbers.reduce((accumulator, number) => {
  const key = number % 2 === 0 ? 'even' : 'odd';

  if (!accumulator[key]) {
    accumulator[key] = [];
  }

  accumulator[key].push(number);

  return accumulator;
}, {});

console.log(grouped);
// { odd: [1, 3], even: [2, 4] }
```

`Object.groupBy()` is clearer when the main job is only grouping:

```js
const grouped = Object.groupBy(numbers, (number) => {
  return number % 2 === 0 ? 'even' : 'odd';
});
```

Use `reduce()` when you need more custom accumulator behavior than grouping
alone.

## Not An Array Instance Method

`Object.groupBy()` is a static method on `Object`.

Call it like this:

```js
Object.groupBy(items, callbackFn);
```

Do not call it like this:

```js
items.groupBy(callbackFn);
items.group(callbackFn);
```

Some older experimental implementations used an array instance method, but the
standard method is `Object.groupBy()`.

## Newer Method Note

`Object.groupBy()` is a modern JavaScript method.

Modern browsers and current Node versions support it, but older environments
may not.

When supporting older environments, check compatibility or use a polyfill or a
manual `reduce()` grouping pattern.

## Important Notes

- `Object.groupBy()` groups values from an iterable.
- The callback runs once for each element.
- The callback receives `(element, index)`.
- The callback result becomes the group key.
- Values keep their original order inside each group.
- Non-string and non-symbol group keys are converted to property keys.
- Symbol group keys are allowed.
- The returned object has a null prototype.
- Each group value is an array.
- The grouped arrays contain the original elements, not deep copies.
- Plain objects are not iterable unless you use something like
  `Object.entries()`, `Object.keys()`, or `Object.values()` first.
- Use `Map.groupBy()` when group keys should keep object identity.

## When To Use It

Use `Object.groupBy()` when:

- you have iterable data,
- you want to split values into named groups,
- each group key can naturally be a string or symbol,
- you want arrays of the original elements.

Good examples:

- group products by category,
- group students by grade,
- group tasks by status,
- group words by length,
- group records by date string.

## Common Mistakes

### Mistake 1: Passing A Plain Object Directly

```js
const scores = {
  Asha: 92,
  Mina: 76,
};

Object.groupBy(scores, (score) => score >= 80);
// TypeError
```

Plain objects are not iterable.

Use `Object.entries(scores)`, `Object.values(scores)`, or `Object.keys(scores)`
depending on what you want to group.

### Mistake 2: Forgetting The Result Has A Null Prototype

```js
const grouped = Object.groupBy(['apple'], (fruit) => fruit[0]);

grouped.hasOwnProperty('a');
// TypeError: grouped.hasOwnProperty is not a function
```

Use `Object.hasOwn()`:

```js
console.log(Object.hasOwn(grouped, 'a')); // true
```

### Mistake 3: Expecting Object Keys To Stay As Objects

```js
const group = { label: 'demo' };

const grouped = Object.groupBy(['a', 'b'], () => group);

console.log(Object.keys(grouped));
// [ '[object Object]' ]
```

`Object.groupBy()` returns an object, so group keys must become property keys.

Use `Map.groupBy()` when object keys must stay as objects.

### Mistake 4: Thinking It Clones Objects

```js
const users = [{ name: 'Asha', active: true }];

const grouped = Object.groupBy(users, (user) => {
  return user.active ? 'active' : 'inactive';
});

console.log(grouped.active[0] === users[0]); // true
```

The grouped array stores the same object reference.

### Mistake 5: Calling It On The Array

```js
const numbers = [1, 2, 3, 4];

numbers.groupBy((number) => number % 2);
// TypeError
```

`Object.groupBy()` is called from `Object`:

```js
const grouped = Object.groupBy(numbers, (number) => number % 2);

console.log(grouped[0]); // [2, 4]
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/groupBy/groupBy.js
```

The runnable file shows:

- grouping by object property,
- null-prototype result objects,
- `Object.hasOwn()` with grouped results,
- callback index usage,
- boolean keys becoming string keys,
- symbol group keys,
- original order inside groups,
- grouping a `Set`,
- grouping `Object.entries()` from a plain object,
- same-object references,
- the difference between `Object.groupBy()` and `Map.groupBy()`.

## References

- MDN:
  [`Object.groupBy()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)
- ECMAScript specification:
  [`Object.groupBy`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.groupby)
