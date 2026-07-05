# Object.getOwnPropertySymbols()

## What Problem Does It Solve?

`Object.getOwnPropertySymbols()` gives you the symbol keys that exist directly
on an object.

Normal object-reading tools usually focus on string keys:

```js
Object.keys(object);
Object.getOwnPropertyNames(object);
```

Symbol keys are separate from string keys.

`Object.getOwnPropertySymbols()` is the method that reads own symbol keys.

## Quick Definition

`Object.getOwnPropertySymbols(object)` returns an array of own symbol property
keys.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(id) ]
```

It does not include string keys.

It does not include inherited symbol keys.

## Mental Model

Think of `Object.getOwnPropertySymbols()` as:

```text
Look directly on this object.
Collect own property keys that are symbols.
Skip string keys.
Skip inherited symbol keys.
```

It answers:

```text
Which own symbol keys exist on this object?
```

## Syntax

```js
Object.getOwnPropertySymbols(object);
```

## Parameters

- `object`: The value whose own symbol keys should be returned.

Primitive values are converted to objects before the lookup.

`null` and `undefined` throw `TypeError`.

## Return Value

`Object.getOwnPropertySymbols()` returns an array of symbols.

```js
const id = Symbol('id');

const user = {
  [id]: 101,
};

const symbols = Object.getOwnPropertySymbols(user);

console.log(symbols);
// [ Symbol(id) ]
```

If the object has no own symbol keys, the returned array is empty.

## Basic Example

```js
const userId = Symbol('userId');

const user = {
  name: 'Asha',
  [userId]: 101,
};

const symbols = Object.getOwnPropertySymbols(user);

console.log(symbols.length); // 1
console.log(symbols.includes(userId)); // true
console.log(user[userId]); // 101
```

What happened:

- `name` is a string key.
- `userId` is a symbol key.
- `Object.getOwnPropertySymbols(user)` returned only the symbol key.

## Non-Enumerable Symbol Keys Are Included

`Object.getOwnPropertySymbols()` includes own symbol keys even when they are
non-enumerable.

```js
const internalToken = Symbol('internalToken');
const user = {};

Object.defineProperty(user, internalToken, {
  value: 'secret-token',
  enumerable: false,
});

const symbols = Object.getOwnPropertySymbols(user);

console.log(symbols.includes(internalToken)); // true
```

What happened:

- `internalToken` is an own symbol property.
- It is non-enumerable.
- This method still returned it because it reads own symbol keys, not only
  enumerable symbol keys.

## String Keys Are Skipped

`Object.getOwnPropertySymbols()` returns symbol keys only.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(id) ]

console.log(Object.keys(user));
// [ 'name' ]

console.log(Object.getOwnPropertyNames(user));
// [ 'name' ]
```

Use string-key methods when string names are the question.

Use symbol-key methods when symbol keys are the question.

## Symbol Identity Matters

Two symbols can have the same description and still be different keys.

```js
const id = Symbol('id');
const sameDescription = Symbol('id');

const user = {
  [id]: 101,
};

console.log(id === sameDescription); // false
console.log(user[sameDescription]); // undefined
```

What happened:

- Both symbols have the description `'id'`.
- They are still different symbol values.
- The object was keyed by `id`, not by `sameDescription`.

The description helps debugging. It does not make symbols equal.

## Inherited Symbol Keys Are Skipped

Only own symbol keys are returned.

```js
const inheritedSymbol = Symbol('inheritedSymbol');
const userId = Symbol('userId');

const parent = {
  [inheritedSymbol]: 'from parent',
};

const child = Object.create(parent);
child[userId] = 202;

console.log(Object.getOwnPropertySymbols(child).includes(userId)); // true
console.log(Object.getOwnPropertySymbols(child).includes(inheritedSymbol));
// false
```

What happened:

- `userId` is an own symbol key on `child`.
- `inheritedSymbol` exists through the prototype chain.
- The inherited symbol key was skipped.

## Symbols Are Not Private

Symbol keys are skipped by many common tools, but they are not private.

```js
const secretKey = Symbol('secretKey');

const user = {
  name: 'Asha',
  [secretKey]: 'token-123',
};

console.log(Object.keys(user));
// [ 'name' ]

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(secretKey) ]
```

Anyone with the object can discover its own symbol keys with
`Object.getOwnPropertySymbols()` or `Reflect.ownKeys()`.

Use private class fields when you need real private state.

## Difference From `Reflect.ownKeys()`

`Reflect.ownKeys()` returns all own keys:

```text
own string keys + own symbol keys
```

`Object.getOwnPropertySymbols()` returns only own symbol keys.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(Reflect.ownKeys(user));
// [ 'name', Symbol(id) ]

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(id) ]
```

Use `Reflect.ownKeys()` when you want the full own-key list.

## Names Only, Not Descriptors

`Object.getOwnPropertySymbols()` returns symbol keys only.

It does not tell you whether the property is writable, enumerable, or
configurable.

```js
const token = Symbol('token');
const user = {};

Object.defineProperty(user, token, {
  value: 'secret',
  enumerable: false,
});

const symbols = Object.getOwnPropertySymbols(user);

console.log(symbols);
// [ Symbol(token) ]
```

Use `Object.getOwnPropertyDescriptor()` when descriptor details matter.

```js
const descriptor = Object.getOwnPropertyDescriptor(user, token);

console.log(descriptor.enumerable); // false
```

## Symbol Keys And JSON

`JSON.stringify()` skips symbol-keyed properties.

```js
const id = Symbol('id');

const user = {
  name: 'Asha',
  [id]: 101,
};

console.log(JSON.stringify(user));
// {"name":"Asha"}
```

The symbol property still exists. It is just ignored by JSON serialization.

```js
console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(id) ]
```

## `Symbol.for()`

`Symbol.for(key)` returns a shared symbol from the global symbol registry.

```js
const first = Symbol.for('sharedId');
const second = Symbol.for('sharedId');

console.log(first === second); // true
```

That shared symbol can be used as a property key.

```js
const user = {
  [first]: 500,
};

console.log(user[second]); // 500
console.log(Object.getOwnPropertySymbols(user).includes(first)); // true
```

`Object.getOwnPropertySymbols()` returns symbol keys whether they came from
`Symbol()` or `Symbol.for()`.

## Primitive Values

Primitive values are converted to objects before symbol keys are collected.

Most primitive wrappers have no own symbol keys:

```js
console.log(Object.getOwnPropertySymbols('abc'));
// []

console.log(Object.getOwnPropertySymbols(42));
// []
```

`null` and `undefined` cannot be converted to objects:

```js
Object.getOwnPropertySymbols(null); // TypeError
Object.getOwnPropertySymbols(undefined); // TypeError
```

## Difference From `Object.getOwnPropertyNames()`

`Object.getOwnPropertyNames()` returns own string names.

```js
Object.getOwnPropertyNames(object);
```

`Object.getOwnPropertySymbols()` returns own symbol keys.

```js
Object.getOwnPropertySymbols(object);
```

Use both when you want to inspect string keys and symbol keys separately.

## Important Notes

- `Object.getOwnPropertySymbols()` is a static method on `Object`.
- It returns an array of symbols.
- It includes own enumerable symbol properties.
- It includes own non-enumerable symbol properties.
- It skips inherited symbol properties.
- It skips string-keyed properties.
- Symbol descriptions do not make two symbols equal.
- Symbols are not private because they can be discovered from the object.
- `JSON.stringify()` skips symbol-keyed properties.
- Primitive values are converted to objects.
- `null` and `undefined` throw `TypeError`.

## When To Use It

Use `Object.getOwnPropertySymbols()`:

- when you need the symbol keys directly on an object,
- when non-enumerable symbol keys matter,
- when debugging objects that use symbols for metadata,
- when you want to inspect symbol keys separately from string keys.

Use `Object.getOwnPropertyNames()`:

- when you need own string property names.

Use `Reflect.ownKeys()`:

- when you need own string keys and own symbol keys together.

Use private class fields:

- when you need real private state.

## Common Mistakes

### Mistake 1: Expecting String Keys

```js
const user = {
  name: 'Asha',
};

console.log(Object.getOwnPropertySymbols(user));
// []
```

String keys are skipped.

### Mistake 2: Expecting Inherited Symbols

```js
const inherited = Symbol('inherited');

const parent = {
  [inherited]: 'from parent',
};

const child = Object.create(parent);

console.log(Object.getOwnPropertySymbols(child));
// []
```

Inherited symbol keys are skipped.

### Mistake 3: Thinking Symbols Are Private

```js
const token = Symbol('token');

const user = {
  [token]: 'secret',
};

console.log(Object.getOwnPropertySymbols(user));
// [ Symbol(token) ]
```

The symbol key can be discovered from the object.

### Mistake 4: Recreating A Symbol By Description

```js
const id = Symbol('id');
const user = {
  [id]: 101,
};

console.log(user[Symbol('id')]);
// undefined
```

`Symbol('id')` creates a new symbol each time.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js
```

The runnable file contains commented examples, terminal labels, and expected
output comments.

## References

- MDN:
  [`Object.getOwnPropertySymbols()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
- ECMAScript spec:
  [`Object.getOwnPropertySymbols`](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertysymbols)
