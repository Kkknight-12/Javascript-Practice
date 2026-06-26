# SameValueZero Equality Algorithm

## The Doubt

Why does this return `true`?

```javascript
[NaN].includes(NaN)
// true
```

But this returns `-1`?

```javascript
[NaN].indexOf(NaN)
// -1
```

The reason is that `includes()` and `indexOf()` do not use the same equality
rule.

`includes()` uses `SameValueZero`.

`indexOf()` uses `IsStrictlyEqual`, which behaves like strict equality for this
case.

## What Is SameValueZero?

`SameValueZero` is an internal JavaScript equality algorithm.

It is not a function that you call directly.

JavaScript uses it inside some built-in features, such as:

```text
Array.prototype.includes()
Set membership
Map key matching
```

The simple mental model:

```text
SameValueZero is mostly like ===,
but NaN is equal to NaN.

+0 and -0 are also treated as equal.
```

## Plain-English Algorithm

When JavaScript compares `x` and `y` with `SameValueZero`, think like this:

```text
1. If x and y have different types:
   return false

2. If both values are numbers:
   - if both are NaN:
     return true

   - if one is +0 and the other is -0:
     return true

   - if both are the same numeric value:
     return true

   - otherwise:
     return false

3. If both values are not numbers:
   compare them as the same primitive value or the same object reference.
```

This is learning-friendly pseudocode, not the exact engine implementation.

## Important Examples

### `NaN` Matches `NaN`

```javascript
[NaN].includes(NaN)
// true
```

With normal strict equality:

```javascript
NaN === NaN
// false
```

This is the biggest visible difference.

`SameValueZero` treats `NaN` as equal to `NaN`.

## `0` And `-0`

```javascript
[0].includes(-0)
// true

[-0].includes(0)
// true
```

`SameValueZero` treats `0` and `-0` as equal.

Strict equality does this too:

```javascript
0 === -0
// true
```

But `Object.is()` is different:

```javascript
Object.is(0, -0)
// false
```

## No Type Coercion

`SameValueZero` does not convert types.

```javascript
['3'].includes(3)
// false
```

The string `'3'` and the number `3` are different types, so the result is
`false`.

## Objects Still Use Reference Matching

`SameValueZero` does not do deep object comparison.

```javascript
const savedUser = { id: 1 }

const users = [savedUser]

users.includes(savedUser)
// true

users.includes({ id: 1 })
// false
```

The second object has the same shape, but it is a different object reference.

## SameValueZero Vs `===` Vs `Object.is()`

```javascript
NaN === NaN
// false

Object.is(NaN, NaN)
// true

[NaN].includes(NaN)
// true
```

```javascript
0 === -0
// true

Object.is(0, -0)
// false

[0].includes(-0)
// true
```

Short comparison:

```text
===           -> NaN is not equal to NaN, 0 and -0 are equal
Object.is()   -> NaN is equal to NaN, 0 and -0 are different
SameValueZero -> NaN is equal to NaN, 0 and -0 are equal
```

## Why `includes()` Uses It

For membership checks, this behavior is useful:

```javascript
const values = [1, 2, NaN]

values.includes(NaN)
// true
```

If an array contains `NaN`, a learner usually expects "does this array include
`NaN`?" to return `true`.

That is why `includes()` feels more natural than `indexOf()` for this case.

## Common Mistakes

### Mistake 1: Thinking SameValueZero Means Loose Equality

It does not.

```javascript
[false].includes(0)
// false

['1'].includes(1)
// false
```

There is no type conversion.

### Mistake 2: Thinking SameValueZero Does Deep Equality

It does not.

```javascript
[{ id: 1 }].includes({ id: 1 })
// false
```

Objects match only when they are the same object reference.

### Mistake 3: Thinking SameValueZero And `Object.is()` Are The Same

They are close, but not identical.

```javascript
Object.is(0, -0)
// false

[0].includes(-0)
// true
```

## Final Mental Model

Use this memory:

```text
SameValueZero is strict matching,
with one learner-friendly fix:

NaN can match NaN.

And 0 / -0 are treated as the same value.
```

## References

- [ECMAScript Specification: SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero)
- [ECMAScript Specification: Array.prototype.includes](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes)
- [ECMAScript Specification: Array.prototype.indexOf](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.indexof)
- [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)
