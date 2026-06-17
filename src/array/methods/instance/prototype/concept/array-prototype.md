# Array Prototype

## What Problem Does It Solve?

`Array.prototype` explains why every normal array can use methods like:

```javascript
map()
filter()
reduce()
slice()
sort()
includes()
```

These methods are not copied into every array one by one.

They live on one shared object: `Array.prototype`.

That is why this works:

```javascript
const numbers = [1, 2, 3]

numbers.map((number) => number * 2)
// [2, 4, 6]
```

The array has values. `Array.prototype` has shared methods.

## Quick Definition

`Array.prototype` is the shared prototype object used by array instances.

```javascript
const numbers = [10, 20, 30]

Object.getPrototypeOf(numbers) === Array.prototype
// true
```

So when we say:

```javascript
Array.prototype.map
```

We are talking about the shared `map` function that array values can use.

## Two Meanings To Keep Separate

JavaScript uses the word prototype in two closely related ways.

### `Array.prototype`

This is a normal property on the `Array` constructor function.

```javascript
Array.prototype
```

It points to the shared object where array instance methods live.

### `[[Prototype]]`

This is the internal link from one object to another object.

You usually inspect it with:

```javascript
Object.getPrototypeOf(value)
```

For an array:

```javascript
const arr = [1, 2, 3]

Object.getPrototypeOf(arr)
// Array.prototype
```

Mental shortcut:

```text
Array.prototype is the shared method object.
[[Prototype]] is the hidden link that points to a prototype object.
```

## How The Prototype Chain Works

When JavaScript reads a property, it checks the object first.

Example:

```javascript
const numbers = [10, 20, 30]

numbers.map
```

JavaScript checks:

```text
1. Does numbers itself have a "map" property?
2. No? Then check Array.prototype.
3. Is "map" there?
4. Yes? Use that function.
```

For a normal array, the chain looks like this:

```text
numbers
  -> Array.prototype
    -> Object.prototype
      -> null
```

Small proof:

```javascript
Object.hasOwn(numbers, 'map')
// false

'map' in numbers
// true

Object.getPrototypeOf(numbers) === Array.prototype
// true
```

Explanation:

`numbers` does not own `map`, but `map` is still available through the prototype
chain.

## Own Property Wins

JavaScript checks the array itself before it checks `Array.prototype`.

```javascript
const words = ['learn', 'prototype']

words.join(' ')
// 'learn prototype'

words.join = function () {
  return 'own join wins'
}

words.join()
// 'own join wins'
```

The custom `join` exists directly on `words`, so JavaScript uses it first.

The original shared method still exists on `Array.prototype`:

```javascript
Array.prototype.join.call(words, ' ')
// 'learn prototype'
```

This behavior is called shadowing. The own property shadows the prototype
property with the same name.

## Why `this` Matters

When an inherited method is called, `this` points to the object before the dot.

```javascript
numbers.map(callback)
```

Inside `map`:

```javascript
this === numbers
```

That is how one shared method can work on many different arrays.

```javascript
[1, 2, 3].map(callback)
// this -> [1, 2, 3]

['a', 'b'].map(callback)
// this -> ['a', 'b']
```

## Instance Method Vs Static Method

An instance method is called on an array value.

```javascript
const numbers = [1, 2, 3]

numbers.includes(2)
// true
```

It lives on `Array.prototype`:

```javascript
Array.prototype.includes
Array.prototype.map
Array.prototype.filter
```

A static method is called on `Array` itself.

```javascript
Array.from('JS')
// ['J', 'S']

Array.isArray([1, 2, 3])
// true
```

It lives on `Array`:

```javascript
Array.from
Array.isArray
Array.of
```

## Core Method Categories

These categories are a learning tool. They help you predict whether a method
will loop, mutate, copy, or return a value.

### 1. Iteration Methods

Iteration methods visit array items.

Common examples:

```javascript
forEach()
map()
filter()
reduce()
find()
some()
every()
flatMap()
```

Useful mental model:

```text
map       -> transform each item and return a new array
filter    -> keep matching items and return a new array
reduce    -> combine items into one final value
find      -> return the first matching item
some      -> return true if at least one item passes
every     -> return true if all items pass
forEach   -> run side effects, return undefined
```

Example:

```javascript
const scores = [70, 85, 90]

scores.map((score) => score + 5)
// [75, 90, 95]

scores.filter((score) => score >= 80)
// [85, 90]

scores.reduce((total, score) => total + score, 0)
// 245
```

These examples do not mutate `scores`.

### 2. Mutator Methods

Mutator methods change the original array.

Common examples:

```javascript
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
fill()
copyWithin()
```

Example:

```javascript
const queue = ['first', 'second']

queue.push('third')

queue
// ['first', 'second', 'third']
```

Important gotcha:

```javascript
const numbers = [3, 1, 2]

numbers.sort((a, b) => a - b)

numbers
// [1, 2, 3]
```

`sort()` changed the original `numbers` array.

### 3. Accessor And Copying Methods

Accessor and copying methods read from the array or return a new value/array.
They do not change the original array.

Common examples:

```javascript
at()
includes()
indexOf()
join()
slice()
concat()
flat()
toSorted()
toReversed()
toSpliced()
with()
```

Example:

```javascript
const topics = ['prototype', 'scope', 'closure']

topics.slice(0, 2)
// ['prototype', 'scope']

topics.concat('event loop')
// ['prototype', 'scope', 'closure', 'event loop']

topics
// ['prototype', 'scope', 'closure']
```

Important note:

Copying methods usually make a shallow copy. If the array contains objects, the
new array still points to the same objects.

## Extending `Array.prototype`: Monkey Patching

Adding or changing a method on a built-in prototype is called monkey patching.

Example:

```javascript
Array.prototype.firstValuePractice = function () {
  return this[0]
}

['red', 'blue'].firstValuePractice()
// 'red'
```

This works because every normal array can reach `Array.prototype` through the
prototype chain.

## Should We Monkey Patch `Array.prototype`?

For learning, yes, small demos are useful.

For production code, usually no.

Problems:

1. You change behavior globally for every array in the runtime.
2. You may conflict with a future JavaScript method name.
3. Other libraries may not expect your extra method.
4. Direct assignment creates an enumerable property by default.
5. Bugs can become hard to trace because the change is far away from the code
   using it.

If you practice monkey patching, prefer a unique practice name and clean it up:

```javascript
Object.defineProperty(Array.prototype, 'firstValuePractice', {
  value: function () {
    return this[0]
  },
  configurable: true,
  writable: true,
})

delete Array.prototype.firstValuePractice
```

`Object.defineProperty()` keeps the method non-enumerable by default, which is
closer to built-in array method behavior.

## Important Notes

1. `Array.prototype` is the shared method object for arrays.
2. Array values reach it through their internal `[[Prototype]]` link.
3. The normal chain is `array -> Array.prototype -> Object.prototype -> null`.
4. JavaScript checks own properties before prototype properties.
5. Instance methods live on `Array.prototype`.
6. Static methods live on `Array`.
7. Iteration methods visit items.
8. Mutator methods change the original array.
9. Accessor and copying methods do not mutate the original array.
10. Monkey patching built-in prototypes is useful for learning, but risky in
    production.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/prototype/concept/array-prototype.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Related Practice Page

After this concept page, use the focused practice pages for custom prototype
exercises:

```bash
node src/array/methods/instance/prototype/practice/custom-map/custom-map.js
node src/array/methods/instance/prototype/practice/custom-filter/custom-filter.js
node src/array/methods/instance/prototype/practice/custom-sort/custom-sort.js
node src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.js
```

Those files practice custom `map`, `filter`, `sort`, and `reduce` style methods
one page at a time.

## References

- [MDN: Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain)
- [ECMAScript: Properties of the Array Prototype Object](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object)
