# Object.prototype.valueOf()

## What Problem Does It Solve?

`valueOf()` gives an object a way to provide a primitive value for conversion.

That matters when JavaScript needs to use an object like a primitive:

```js
object + 10;
+object;
Number(object);
```

For ordinary objects, the inherited base method is intentionally not very
useful:

```js
const profile = {
  name: 'Asha',
};

console.log(profile.valueOf() === profile); // true
```

The base `Object.prototype.valueOf()` method returns the object itself.

`valueOf()` becomes useful when an object overrides it and returns a primitive
value.

## Quick Definition

For ordinary objects:

```js
object.valueOf();
```

returns the object itself.

For objects that override `valueOf()`, the method can return a meaningful
primitive value:

```js
const score = {
  points: 42,

  valueOf() {
    return this.points;
  },
};

console.log(score + 8); // 50
```

## Mental Model

Use this distinction:

```text
Object.prototype.valueOf()
  -> base version
  -> returns the object itself

custom valueOf()
  -> your version
  -> should return a primitive value
```

Primitive values include:

```text
number, string, boolean, bigint, symbol, null, undefined
```

Objects are not primitive values.

## Syntax

```js
object.valueOf();
Object.prototype.valueOf.call(object);
```

## Parameters

The base `Object.prototype.valueOf()` method takes no parameters.

Custom `valueOf()` methods should also usually take no parameters because
JavaScript does not pass arguments when it calls `valueOf()` during conversion.

## Return Value

The base Object version returns the `this` value converted to an object.

For an ordinary object, that means it returns the same object:

```js
const profile = {};

console.log(profile.valueOf() === profile); // true
```

For `null` or `undefined` as `this`, the base method throws a `TypeError`
because those values cannot be converted to objects.

## Basic Example

```js
const profile = {
  name: 'Asha',
};

console.log(profile.valueOf() === profile); // true
```

What happened:

- `profile` inherits `valueOf()` from `Object.prototype`.
- The base method returns `profile` itself.
- It does not return `profile.name`.
- It does not create a useful display string.

For normal objects, the base method is mostly a fallback.

## Custom `valueOf()`

You can define your own `valueOf()` when your object has a meaningful primitive
value.

```js
const score = {
  points: 42,

  valueOf() {
    return this.points;
  },
};

console.log(score.valueOf()); // 42
console.log(score + 8); // 50
console.log(+score); // 42
```

What happened:

- `score.valueOf()` returns the number `42`.
- `score + 8` needs a primitive value.
- JavaScript can use `score.valueOf()`.
- The result becomes `42 + 8`.

Related doubt:
[`How does the score object become 42?`](doubt/doubt.md#doubt-1-how-does-the-score-object-become-42)

## `valueOf()` Must Return A Primitive

For conversion, `valueOf()` is only useful when it returns a primitive value.

```js
const broken = {
  valueOf() {
    return {};
  },

  toString() {
    return '9';
  },
};

console.log(+broken); // 9
```

What happened:

- JavaScript tried `valueOf()`.
- `valueOf()` returned an object.
- That object could not be used as the primitive result.
- JavaScript then tried `toString()`.
- `toString()` returned the string `'9'`.
- Numeric conversion turned `'9'` into `9`.

If both `valueOf()` and `toString()` fail to return a primitive value, conversion
throws a `TypeError`.

```js
const impossible = {
  valueOf() {
    return {};
  },

  toString() {
    return {};
  },
};

Number(impossible); // TypeError
```

## Built-In Overrides

Many built-in objects have their own `valueOf()` methods.

### Date

```js
const date = new Date('2026-06-30T00:00:00Z');

console.log(date.valueOf()); // 1782777600000
console.log(+date); // 1782777600000
```

What happened:

- `Date.prototype.valueOf()` returns the timestamp in milliseconds.
- Unary plus needs a number.
- JavaScript can use the date's primitive timestamp.

### Number Wrapper

```js
const wrappedNumber = new Number(42);

console.log(wrappedNumber.valueOf()); // 42
```

This uses `Number.prototype.valueOf()`, not
`Object.prototype.valueOf()`.

## `Symbol.toPrimitive` Has Priority

If an object has `Symbol.toPrimitive`, JavaScript uses it before `valueOf()` and
`toString()` during primitive conversion.

```js
const priorityExample = {
  [Symbol.toPrimitive](hint) {
    return hint === 'string' ? 'score object' : 100;
  },

  valueOf() {
    return 42;
  },

  toString() {
    return 'profile';
  },
};

console.log(priorityExample + 1); // 101
console.log(String(priorityExample)); // score object
```

What happened:

- JavaScript found `Symbol.toPrimitive`.
- It used that method before `valueOf()`.
- `valueOf()` was not used for these conversions.

`Symbol.toPrimitive` gives the most control, but `valueOf()` is still important
because many examples and built-in objects use it.

## Difference From `toString()`

Use this beginner distinction:

```text
toString()
  -> usually answers: how should this object look as text?

valueOf()
  -> usually answers: what primitive value should this object behave like?
```

Example:

```js
const score = {
  points: 42,

  valueOf() {
    return this.points;
  },

  toString() {
    return `Score: ${this.points}`;
  },
};

console.log(score + 8); // 50
console.log(String(score)); // Score: 42
```

What happened:

- Numeric/default conversion can use `valueOf()`.
- String conversion usually tries `toString()` first.

## Null-Prototype Objects

Objects created with `Object.create(null)` do not inherit from
`Object.prototype`.

```js
const dictionary = Object.create(null);
dictionary.topic = 'objects';

console.log(typeof dictionary.valueOf); // undefined
console.log(Object.prototype.valueOf.call(dictionary) === dictionary); // true
```

What happened:

- `dictionary` does not inherit `valueOf()`.
- So `dictionary.valueOf` is `undefined`.
- Borrowing `Object.prototype.valueOf.call(dictionary)` still works.
- The borrowed base method returns `dictionary` itself.

## `null` And `undefined`

The base Object method cannot use `null` or `undefined` as `this`.

```js
Object.prototype.valueOf.call(null); // TypeError
Object.prototype.valueOf.call(undefined); // TypeError
```

That is different from `Object.prototype.toString.call(null)`, which returns
`[object Null]`.

## Important Notes

- The base `Object.prototype.valueOf()` method returns the object itself.
- For ordinary objects, the base method is not useful for primitive conversion.
- Custom `valueOf()` should return a primitive value.
- If `valueOf()` returns an object, JavaScript may try `toString()` instead.
- If no primitive value can be produced, conversion throws a `TypeError`.
- Built-in objects can override `valueOf()`.
- `Date.prototype.valueOf()` returns a timestamp in milliseconds.
- `Symbol.toPrimitive` has priority over `valueOf()` and `toString()`.
- Null-prototype objects do not inherit `valueOf()`.
- `Object.prototype.valueOf.call(null)` and
  `Object.prototype.valueOf.call(undefined)` throw `TypeError`.

## When To Use It

Use custom `valueOf()`:

- When your object naturally represents a primitive value.
- When numeric/default conversion should use that value.
- When you are learning how JavaScript object-to-primitive conversion works.

Use `toString()`:

- When your object needs a readable display string.

Use `Symbol.toPrimitive()`:

- When you need full control over string, number, and default conversion hints.

Most application objects do not need a custom `valueOf()`. Use it only when the
primitive meaning of the object is obvious.

## Common Mistakes

### Mistake 1: Expecting Base `valueOf()` To Return Object Data

```js
const user = {
  name: 'Asha',
};

console.log(user.valueOf() === user); // true
```

The base method returns the object itself. It does not return one property from
the object.

### Mistake 2: Returning An Object From Custom `valueOf()`

```js
const value = {
  valueOf() {
    return {};
  },
};
```

Returning an object does not give JavaScript a primitive value to use.

Return a number, string, boolean, bigint, symbol, `null`, or `undefined`
instead.

### Mistake 3: Forgetting `Symbol.toPrimitive` Has Priority

```js
const value = {
  [Symbol.toPrimitive]() {
    return 100;
  },

  valueOf() {
    return 42;
  },
};

console.log(value + 1); // 101
```

`valueOf()` is not used because `Symbol.toPrimitive` was found first.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/valueOf/valueOf.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.valueOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf)
- ECMAScript spec:
  [`Object.prototype.valueOf`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.valueof)
