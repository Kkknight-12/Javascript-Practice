# Reflect.ownKeys()

## Before This Page

If `Reflect` itself is new, start here:

[`src/reflect/notes.md`](../../../notes.md)

That overview explains why `Reflect` exists even though some of its methods feel
similar to `Object` static methods.

## What Problem Does It Solve?

`Reflect.ownKeys()` gives you every key that exists directly on an object.

It includes:

- own enumerable string keys,
- own non-enumerable string keys,
- own enumerable symbol keys,
- own non-enumerable symbol keys.

That makes it useful when you want the full own-key list in one call.

## Quick Definition

`Reflect.ownKeys(object)` returns an array of the object's own property keys.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

Object.defineProperty(user, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Reflect.ownKeys(user));
// [ 'name', 'internalId', Symbol(id) ]
```

It returns string keys and symbol keys.

It does not return inherited keys.

## Mental Model

Think of `Reflect.ownKeys()` as:

```text
Look directly on this object.
Collect every own key.
Include strings and symbols.
Include enumerable and non-enumerable keys.
Skip inherited keys.
```

It answers:

```text
Which keys are directly stored on this object?
```

## Syntax

```js
Reflect.ownKeys(target);
```

## Parameters

- `target`: The object whose own keys should be returned.

`target` must be an object.

Unlike some `Object.*` methods, `Reflect.ownKeys()` does not convert primitives
to wrapper objects. Passing a primitive, `null`, or `undefined` throws
`TypeError`.

## Return Value

`Reflect.ownKeys()` returns an array.

The array can contain:

- strings,
- symbols.

```js
const token = Symbol('token');
const session = {
  name: 'morning',
  [token]: 'secret',
};

console.log(Reflect.ownKeys(session));
// [ 'name', Symbol(token) ]
```

## Basic Example

```js
const secretKey = Symbol('secretKey');

const settings = {
  theme: 'dark',
  [secretKey]: 'hidden',
};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Reflect.ownKeys(settings));
// [ 'theme', 'internalId', Symbol(secretKey) ]
```

What happened:

- `theme` is an own enumerable string key.
- `internalId` is an own non-enumerable string key.
- `secretKey` is an own symbol key.
- `Reflect.ownKeys()` returned all of them.

## Own Keys Only

`Reflect.ownKeys()` does not walk up the prototype chain.

```js
const sharedFields = {
  plan: 'free',
};

const account = Object.create(sharedFields);
account.name = 'Asha';

console.log('plan' in account);
// true

console.log(Reflect.ownKeys(account));
// [ 'name' ]
```

What happened:

- `plan` exists through the prototype chain.
- `plan` is not an own key on `account`.
- `Reflect.ownKeys(account)` skipped it.

## Non-Enumerable Keys Are Included

```js
const settings = {
  theme: 'dark',
};

Object.defineProperty(settings, 'internalId', {
  value: 42,
  enumerable: false,
});

console.log(Object.keys(settings));
// [ 'theme' ]

console.log(Reflect.ownKeys(settings));
// [ 'theme', 'internalId' ]
```

What happened:

- `Object.keys()` returned only own enumerable string keys.
- `Reflect.ownKeys()` returned own string keys whether they were enumerable or
  non-enumerable.

## Symbol Keys Are Included

```js
const privateToken = Symbol('privateToken');

const account = {
  name: 'Asha',
  [privateToken]: 'secret-token',
};

console.log(Object.keys(account));
// [ 'name' ]

console.log(Object.getOwnPropertySymbols(account));
// [ Symbol(privateToken) ]

console.log(Reflect.ownKeys(account));
// [ 'name', Symbol(privateToken) ]
```

What happened:

- `Object.keys()` skipped the symbol key.
- `Object.getOwnPropertySymbols()` returned only the symbol key.
- `Reflect.ownKeys()` returned both string and symbol keys.

## Comparison With Other Property Tools

| Tool | Own | Inherited | Enumerable only | String keys | Symbol keys |
| --- | --- | --- | --- | --- | --- |
| `Object.keys()` | yes | no | yes | yes | no |
| `Object.getOwnPropertyNames()` | yes | no | no | yes | no |
| `Object.getOwnPropertySymbols()` | yes | no | no | no | yes |
| `Reflect.ownKeys()` | yes | no | no | yes | yes |
| `for...in` | yes | yes | yes | yes | no |

Use this table to choose the right tool.

`Reflect.ownKeys()` has the widest own-property key coverage.

## It Reads Keys, Not Values

`Reflect.ownKeys()` does not read property values.

That means it does not run getters.

```js
let getterRuns = 0;

const report = {
  get total() {
    getterRuns++;
    return 100;
  },
};

console.log(Reflect.ownKeys(report));
// [ 'total' ]

console.log(getterRuns);
// 0
```

What happened:

- `Reflect.ownKeys(report)` inspected the key list.
- It did not read `report.total`.
- The getter did not run.

The getter runs only when the value is read:

```js
console.log(report.total);
// 100
```

## Key Order

For ordinary objects, `Reflect.ownKeys()` returns keys in this order:

1. Integer-index string keys in ascending numeric order.
2. Other string keys in property creation order.
3. Symbol keys in property creation order.

```js
const firstSymbol = Symbol('firstSymbol');
const secondSymbol = Symbol('secondSymbol');

const example = {
  100: 'large index',
  2: 'small index',
  name: 'Order Example',
  [firstSymbol]: 'first symbol',
  [secondSymbol]: 'second symbol',
};

Object.defineProperty(example, 'hidden', {
  value: 'non-enumerable string',
  enumerable: false,
});

console.log(Reflect.ownKeys(example));
// [ '2', '100', 'name', 'hidden', Symbol(firstSymbol), Symbol(secondSymbol) ]
```

What happened:

- `'2'` and `'100'` are integer-index string keys, so they came first in numeric
  order.
- `name` and `hidden` are other string keys, so they came next.
- Symbol keys came last.

## Arrays

Arrays are objects.

Their indexes are own string keys, and `length` is also an own string key.

```js
console.log(Reflect.ownKeys(['a', 'b']));
// [ '0', '1', 'length' ]
```

What happened:

- `'0'` and `'1'` are array index keys.
- `length` is an own non-enumerable string key.
- `Reflect.ownKeys()` returned all of them.

## Difference From Combining Object Methods

For ordinary objects, this:

```js
Reflect.ownKeys(object);
```

is usually similar to:

```js
Object.getOwnPropertyNames(object).concat(
  Object.getOwnPropertySymbols(object),
);
```

But `Reflect.ownKeys()` is clearer when your goal is:

```text
Give me every own key in one call.
```

It is also the reflective operation used by proxy `ownKeys` behavior, which will
be studied in the Proxy section.

## Important Notes

- `Reflect.ownKeys()` returns own keys only.
- It includes string keys and symbol keys.
- It includes enumerable and non-enumerable keys.
- It skips inherited keys.
- It reads keys, not values, so getters do not run.
- It throws `TypeError` if the target is not an object.
- For arrays, it includes the non-enumerable `length` key.

## When To Use It

Use `Reflect.ownKeys()` when you need all own keys in one call.

Good examples:

- debugging object shape,
- comparing all own keys on two objects,
- inspecting symbol keys and non-enumerable keys together,
- writing low-level utilities,
- preparing for Proxy `ownKeys` behavior.

Use `Object.keys()` instead when you only want own enumerable string keys for
normal application loops.

## Common Mistakes

### Mistake 1: Expecting Inherited Keys

`Reflect.ownKeys()` does not include inherited keys.

Use the `in` operator or walk the prototype chain manually if inherited
properties should count.

### Mistake 2: Expecting Only Visible Keys

`Reflect.ownKeys()` includes non-enumerable keys too.

If you only want normal visible string keys, use `Object.keys()`.

### Mistake 3: Forgetting Symbols

The result can contain symbols.

Do not assume every key is a string.

```js
for (const key of Reflect.ownKeys(object)) {
  console.log(typeof key);
}
```

The output can include:

```text
string
symbol
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/reflect/methods/static/ownKeys/ownKeys.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Reflect.ownKeys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
- ECMAScript specification:
  [`Reflect.ownKeys`](https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.ownkeys)
