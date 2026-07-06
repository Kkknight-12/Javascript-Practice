# Object.is()

## What Problem Does It Solve?

`Object.is()` checks whether two values are the same value.

It is useful when `===` is almost right, but you care about these two edge
cases:

```js
NaN
0 and -0
```

Example:

```js
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
```

## Quick Definition

`Object.is(value1, value2)` returns `true` when both values are the same value.

```js
console.log(Object.is('js', 'js')); // true
console.log(Object.is('1', 1)); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(0, -0)); // false
```

It does not convert types.

It does not compare object contents deeply.

## Mental Model

Think of `Object.is()` as:

```text
Compare these two values without type conversion.
Treat NaN as equal to NaN.
Treat +0 and -0 as different.
For objects, compare the reference.
```

It answers:

```text
Are these two values the same value?
```

## Syntax

```js
Object.is(value1, value2);
```

## Parameters

- `value1`: The first value to compare.
- `value2`: The second value to compare.

Both arguments can be any JavaScript value:

- primitives,
- objects,
- arrays,
- functions,
- symbols,
- `null`,
- `undefined`,
- `NaN`,
- `0`,
- `-0`.

## Return Value

`Object.is()` returns a boolean:

- `true` when the two values are the same value,
- `false` when they are not.

```js
console.log(Object.is(25, 25)); // true
console.log(Object.is(25, '25')); // false
```

## Basic Example

```js
console.log(Object.is('objects', 'objects')); // true
console.log(Object.is('objects', 'arrays')); // false
console.log(Object.is('1', 1)); // false
```

What happened:

- The first comparison used the same string value.
- The second comparison used different string values.
- The third comparison did not coerce `'1'` into `1`.

## No Type Coercion

`Object.is()` does not behave like `==`.

```js
console.log('1' == 1); // true
console.log(Object.is('1', 1)); // false
```

What happened:

- `==` converted the string before comparing.
- `Object.is()` did not convert either value.
- A string and a number are different values.

In this way, `Object.is()` is closer to `===` than to `==`.

## The `NaN` Difference

`NaN` means "not a number".

With strict equality, `NaN` is not equal to itself:

```js
console.log(NaN === NaN); // false
```

With `Object.is()`, `NaN` is treated as the same value as `NaN`:

```js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(NaN, 0 / 0)); // true
```

What happened:

- `0 / 0` creates `NaN`.
- `Object.is()` uses SameValue comparison.
- SameValue treats `NaN` as equal to `NaN`.

## The Signed Zero Difference

JavaScript has positive zero and negative zero.

Most of the time, they behave the same.

Strict equality treats them as equal:

```js
console.log(0 === -0); // true
```

`Object.is()` treats them as different:

```js
console.log(Object.is(0, -0)); // false
console.log(Object.is(-0, -0)); // true
console.log(Object.is(+0, 0)); // true
```

What happened:

- `0` and `+0` are the same signed zero.
- `-0` is the negative zero value.
- `Object.is()` keeps that difference visible.

## Object References

`Object.is()` does not compare object contents.

It compares object references.

```js
const user = {
  name: 'Asha',
};

const sameUser = user;

const matchingUser = {
  name: 'Asha',
};

console.log(Object.is(user, sameUser)); // true
console.log(Object.is(user, matchingUser)); // false
```

What happened:

- `sameUser` points to the same object as `user`.
- `matchingUser` is a different object.
- Having the same property values does not make two objects the same reference.

This is also true for arrays:

```js
const numbers = [1, 2, 3];

console.log(Object.is(numbers, numbers)); // true
console.log(Object.is(numbers, [1, 2, 3])); // false
```

## Same Reference After Mutation

If two variables point to the same object, mutating that object does not change
the reference.

```js
const profile = {
  name: 'Asha',
};

const sameProfile = profile;

profile.name = 'Mina';

console.log(Object.is(profile, sameProfile)); // true
console.log(sameProfile.name); // Mina
```

What happened:

- `profile` and `sameProfile` still point to the same object.
- The object's contents changed.
- The reference did not change.

## Symbol Values

Symbols compare by symbol identity.

```js
const id = Symbol('id');
const sameId = id;

console.log(Object.is(id, sameId)); // true
console.log(Object.is(Symbol('id'), Symbol('id'))); // false
```

What happened:

- `sameId` points to the same symbol value as `id`.
- Each `Symbol('id')` call creates a new symbol.
- The description text does not make two local symbols equal.

`Symbol.for()` uses the global symbol registry, so the same key returns the
same symbol:

```js
console.log(Object.is(Symbol.for('id'), Symbol.for('id'))); // true
```

## Difference From `===`

For most everyday values, `Object.is()` and `===` give the same result.

```js
console.log(Object.is(25, 25)); // true
console.log(25 === 25); // true

console.log(Object.is('1', 1)); // false
console.log('1' === 1); // false
```

The important differences are:

| Comparison | `===` | `Object.is()` |
| --- | --- | --- |
| `NaN` and `NaN` | `false` | `true` |
| `0` and `-0` | `true` | `false` |

## Difference From `==`

`==` performs type coercion.

`Object.is()` does not.

```js
console.log(false == 0); // true
console.log(Object.is(false, 0)); // false

console.log('' == false); // true
console.log(Object.is('', false)); // false
```

Use `Object.is()` when you want a precise comparison without conversion.

## Difference From SameValueZero

`Object.is()` uses SameValue comparison.

Some other JavaScript features use SameValueZero comparison.

For example, `Array.prototype.includes()` uses SameValueZero.

Both SameValue and SameValueZero treat `NaN` as equal to `NaN`.

The difference is signed zero:

```js
const values = [-0];

console.log(values.includes(0)); // true
console.log(Object.is(0, -0)); // false
```

Mental shortcut:

```text
Object.is()   -> NaN equals NaN, 0 and -0 are different
SameValueZero -> NaN equals NaN, 0 and -0 are the same
```

For the deeper SameValueZero note, see:

```text
src/array/methods/instance/includes/doubt/same-value-zero.md
```

## It Is Not Deep Equality

`Object.is()` does not compare nested values.

```js
const first = {
  settings: {
    theme: 'dark',
  },
};

const second = {
  settings: {
    theme: 'dark',
  },
};

console.log(Object.is(first, second)); // false
console.log(Object.is(first.settings, second.settings)); // false
console.log(Object.is(first.settings.theme, second.settings.theme)); // true
```

What happened:

- `first` and `second` are different objects.
- `first.settings` and `second.settings` are also different objects.
- The primitive string values `'dark'` and `'dark'` are the same value.

## Practical Helper Example

`Object.is()` is useful when writing a small helper that needs to know whether
a value changed.

```js
function didValueChange(previousValue, nextValue) {
  return !Object.is(previousValue, nextValue);
}

console.log(didValueChange(NaN, NaN)); // false
console.log(didValueChange(0, -0)); // true
console.log(didValueChange({}, {})); // true
```

What happened:

- `NaN` and `NaN` are the same value for `Object.is()`.
- `0` and `-0` are different values for `Object.is()`.
- Two object literals create two different object references.

## Important Notes

- `Object.is()` is a static method.
- It compares exactly two values.
- It does not coerce types.
- It treats `NaN` as equal to `NaN`.
- It treats `0` and `-0` as different values.
- It compares objects, arrays, and functions by reference.
- It does not perform deep equality.
- It uses SameValue comparison, not SameValueZero comparison.

## When To Use It

Use `Object.is()` when:

- you want a precise comparison without type coercion,
- `NaN` should compare equal to `NaN`,
- the difference between `0` and `-0` matters,
- you are writing an equality helper that should follow SameValue behavior.

Use `===` for most everyday comparisons.

Use a deep equality helper when you need to compare object contents.

## Common Mistakes

### Mistake 1: Thinking It Works Like `==`

```js
console.log('1' == 1); // true
console.log(Object.is('1', 1)); // false
```

`Object.is()` does not convert strings into numbers.

### Mistake 2: Thinking It Is Exactly The Same As `===`

```js
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
```

`Object.is()` differs from `===` for `NaN` and signed zero.

### Mistake 3: Thinking It Compares Object Contents

```js
console.log(Object.is({ name: 'Asha' }, { name: 'Asha' }));
// false
```

Each object literal creates a new object reference.

### Mistake 4: Confusing SameValue And SameValueZero

```js
console.log([-0].includes(0)); // true
console.log(Object.is(0, -0)); // false
```

`includes()` uses SameValueZero.

`Object.is()` uses SameValue.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/is/is.js
```

The runnable file shows:

- no type coercion,
- comparison with `==` and `===`,
- `NaN`,
- signed zero,
- object and array references,
- symbol identity,
- difference from SameValueZero,
- a small value-change helper.

## References

- MDN:
  [`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- ECMAScript specification:
  [`Object.is`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is)
