# Object.prototype.toString()

## What Problem Does It Solve?

`toString()` gives an object a way to describe itself as a string.

That matters because JavaScript often needs a string representation:

```js
String(value);
`${value}`;
console.log(String(value));
```

For normal objects, the inherited base method is not very descriptive:

```js
const user = {
  name: 'Asha',
};

console.log(user.toString()); // [object Object]
```

The base `Object.prototype.toString()` method is still useful because it can
produce a tag-like string:

```text
[object Type]
```

For example:

```js
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new Date()); // [object Date]
```

## Quick Definition

`Object.prototype.toString()` returns a string in this shape:

```text
[object Type]
```

Many built-in objects override `toString()` with their own behavior.

That is why these two calls can be different:

```js
const values = [1, 2, 3];

console.log(values.toString()); // 1,2,3
console.log(Object.prototype.toString.call(values)); // [object Array]
```

## Mental Model

Use this distinction:

```text
value.toString()
  -> use whatever toString method this value has

Object.prototype.toString.call(value)
  -> use the base Object tag method on this value
```

So:

```js
const values = [1, 2, 3];

values.toString();
```

uses `Array.prototype.toString()`.

But:

```js
Object.prototype.toString.call(values);
```

uses `Object.prototype.toString()` with the array as `this`.

## Syntax

```js
object.toString();
Object.prototype.toString.call(value);
```

## Parameters

The base `Object.prototype.toString()` method takes no parameters.

Some objects override `toString()` with methods that accept parameters. For
example:

```js
(255).toString(16); // ff
```

That uses `Number.prototype.toString(radix)`, not
`Object.prototype.toString()`.

## Return Value

The base method returns a string like:

```text
[object Object]
[object Array]
[object Date]
[object Null]
[object Undefined]
```

## Plain Object Example

```js
const user = {
  name: 'Asha',
};

console.log(user.toString()); // [object Object]
console.log(Object.prototype.toString.call(user)); // [object Object]
```

What happened:

- `user` does not have its own `toString()` method.
- JavaScript finds `Object.prototype.toString()`.
- The base method returns `[object Object]`.

For plain objects, the default result usually does not show the object's data.

## Built-In Overrides

Some built-in objects have their own `toString()` method.

### Array

```js
const numbers = [1, 2, 3];

console.log(numbers.toString()); // 1,2,3
console.log(Object.prototype.toString.call(numbers)); // [object Array]
```

What happened:

- `numbers.toString()` uses `Array.prototype.toString()`.
- `Object.prototype.toString.call(numbers)` forces the base tag method.

### Date

```js
const date = new Date('2026-06-30T00:00:00Z');

console.log(Object.prototype.toString.call(date)); // [object Date]
```

`Date.prototype.toString()` normally returns a date string. The base Object
method returns the built-in tag.

## `null` And `undefined`

`Object.prototype.toString.call()` has special behavior for `null` and
`undefined`.

```js
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
```

This is different from many other Object prototype methods, where `null` or
`undefined` as `this` usually causes a `TypeError`.

## Primitive Values

Primitive values are converted to their object wrapper type for the base tag
check.

```js
console.log(Object.prototype.toString.call(42)); // [object Number]
console.log(Object.prototype.toString.call('hello')); // [object String]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
```

What happened:

- `42` is treated like a Number wrapper for this check.
- `'hello'` is treated like a String wrapper.
- `true` is treated like a Boolean wrapper.

## Custom `Symbol.toStringTag`

`Symbol.toStringTag` can customize the `Type` part of the base tag.

```js
const lesson = {
  [Symbol.toStringTag]: 'ObjectLesson',
};

console.log(Object.prototype.toString.call(lesson)); // [object ObjectLesson]
```

What happened:

- The object has a `Symbol.toStringTag` property.
- The value is a string.
- `Object.prototype.toString()` uses that string as the tag.

This is useful to know, but it also means
`Object.prototype.toString.call(value)` is not a perfect type checker. Objects
can customize the tag.

## Custom `toString()`

For your own objects, define `toString()` when you want meaningful string
conversion.

```js
const profile = {
  name: 'Asha',

  toString() {
    return `Profile: ${this.name}`;
  },
};

console.log(profile.toString()); // Profile: Asha
console.log(String(profile)); // Profile: Asha
console.log(`${profile}`); // Profile: Asha
```

What happened:

- `profile` has its own `toString()` method.
- `String(profile)` needs a string representation.
- The template literal also needs a string representation.
- JavaScript can use the custom `toString()` result.

## `Symbol.toPrimitive` Has Priority

If an object has `Symbol.toPrimitive`, JavaScript uses it before `toString()`
during primitive conversion.

```js
const priorityExample = {
  [Symbol.toPrimitive](hint) {
    return `primitive via ${hint}`;
  },

  toString() {
    return 'toString result';
  },
};

console.log(String(priorityExample)); // primitive via string
```

What happened:

- `String(priorityExample)` needs a primitive string.
- JavaScript checks `Symbol.toPrimitive` first.
- Because that method returns a primitive value, `toString()` is not used.

You do not need `Symbol.toPrimitive` for most beginner object display cases, but
it explains why `toString()` is not always the final conversion hook.

## Null-Prototype Objects

Objects created with `Object.create(null)` do not inherit from
`Object.prototype`.

```js
const dictionary = Object.create(null);

console.log(typeof dictionary.toString); // undefined
console.log(Object.prototype.toString.call(dictionary)); // [object Object]
```

What happened:

- `dictionary` does not inherit `toString()`.
- So `dictionary.toString` is `undefined`.
- Borrowing `Object.prototype.toString.call(dictionary)` still works.

## Difference From `toLocaleString()`

For plain objects:

```js
const object = {
  topic: 'objects',
};

console.log(object.toString()); // [object Object]
console.log(object.toLocaleString()); // [object Object]
```

The default `Object.prototype.toLocaleString()` calls `this.toString()`, so the
result is usually the same for a plain object.

For numbers and dates, `toLocaleString()` is different because those objects
override it for display formatting.

## Important Notes

- `Object.prototype.toString()` returns a tag-like string.
- The string shape is `[object Type]`.
- Many objects override `toString()`.
- `value.toString()` may use an override.
- `Object.prototype.toString.call(value)` forces the base Object tag method.
- `null` becomes `[object Null]`.
- `undefined` becomes `[object Undefined]`.
- `null.toString()` and `undefined.toString()` throw because those values do not
  have methods.
- `Symbol.toStringTag` can customize the tag.
- Custom `toString()` is useful for meaningful string display.
- `Symbol.toPrimitive` has priority during primitive conversion.

## When To Use It

Use custom `toString()`:

- When your object should have a meaningful string representation.
- When `String(object)` or template literals should show useful text.

Use `Object.prototype.toString.call(value)`:

- When learning or debugging built-in tags.
- When you need the base `[object Type]` behavior.
- When the value might be `null` or `undefined` and you still want a tag.

Do not treat the base tag as a perfect type system. `Symbol.toStringTag` can
change the result.

## Common Mistakes

### Mistake 1: Expecting Plain Objects To Show Their Data

```js
const user = {
  name: 'Asha',
};

console.log(user.toString()); // [object Object]
```

The default Object result does not list object properties.

Use a custom `toString()` method or `JSON.stringify()` when you want a readable
data display.

### Mistake 2: Forgetting Built-Ins Override `toString()`

```js
const numbers = [1, 2, 3];

console.log(numbers.toString()); // 1,2,3
console.log(Object.prototype.toString.call(numbers)); // [object Array]
```

`numbers.toString()` and `Object.prototype.toString.call(numbers)` do not call
the same method.

### Mistake 3: Treating `[object Type]` As Fully Reliable Type Checking

```js
const fakeDate = {
  [Symbol.toStringTag]: 'Date',
};

console.log(Object.prototype.toString.call(fakeDate)); // [object Date]
```

The tag can be customized, so the output can be misleading.

### Mistake 4: Calling `.toString()` Directly On `null` Or `undefined`

```js
null.toString(); // TypeError
undefined.toString(); // TypeError
```

`null` and `undefined` do not have methods.

Use the borrowed base method when you specifically want their tags:

```js
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/instance/toString/toString.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
- ECMAScript spec:
  [`Object.prototype.toString`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.tostring)
