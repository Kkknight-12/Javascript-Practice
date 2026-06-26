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

## `Array.prototype.method.call(this, callback)`

`Array.prototype.method.call(this, callback)` means:

```text
Take an Array method from Array.prototype.
Run it with this pointing to another value.
Use callback as the test or transform function when that method needs one.
```

Here `this` does not mean a random variable name.

It means:

```text
the value that the Array method should work on
```

For a real array, JavaScript sets `this` automatically.

```javascript
const numbers = [2, 4, 6]

numbers.every((number) => number % 2 === 0)
// true
```

Inside `every()`, `this` is `numbers`.

So this direct call:

```javascript
numbers.every(callback)
```

is similar to this borrowed-method call:

```javascript
Array.prototype.every.call(numbers, callback)
```

In normal code, use the direct version for real arrays because it is cleaner.

## Why Borrow With `.call()`?

Use `.call()` when the value is array-like, but not a real array.

An array-like value has:

```text
length
numeric keys like 0, 1, 2
```

But it may not have Array methods like `.every()`, `.map()`, or `.filter()`.

Common array-like values:

```text
arguments
NodeList
HTMLCollection
custom objects with length and numeric keys
strings
```

So this may not work:

```javascript
arrayLike.every(callback)
```

because `arrayLike` may not have its own `every()` method.

Borrow the method instead:

```javascript
Array.prototype.every.call(arrayLike, callback)
```

Read it like:

```text
Use Array.prototype.every.
But make it work on arrayLike.
Use callback for the condition.
```

## When To Use Which?

### Use The Direct Method For Real Arrays

Use the direct method when you have a real array.

Examples:

```javascript
const literalArray = [1, 2, 3]
const constructedArray = new Array(1, 2, 3)
const convertedArray = Array.from('abc')
```

Direct calls are the most common and recommended style:

```javascript
literalArray.every(callback)
convertedArray.map(callback)
```

Use this style because it is the cleanest syntax and JavaScript automatically
sets `this` to the array before the dot.

### Use `.call()` For Array-Like Values

Use `Array.prototype.method.call()` when you are working with an array-like
value.

Common examples:

```text
arguments object in regular functions
NodeList from document.querySelectorAll()
HTMLCollection
custom objects with length and numeric keys
strings
legacy code or libraries that return array-like objects
```

Example:

```javascript
Array.prototype.every.call(arrayLike, callback)
```

You may also see `.apply()`:

```javascript
Array.prototype.every.apply(arrayLike, [callback])
```

Both examples borrow `every()` from `Array.prototype`.

The difference is how arguments are passed:

```text
call(thisValue, arg1, arg2)
apply(thisValue, [arg1, arg2])
```

For most modern code, prefer `.call()` here because it is easier to read.

Small caution: strings are array-like, so many read-style methods can inspect
their characters. Mutating Array methods are not a good fit for strings because
strings are immutable.

Another practical option is to convert the array-like value first:

```javascript
const values = Array.from(arrayLike)

values.every(callback)
values.map(callback)
values.filter(callback)
```

This is often clearer when you need to use several Array methods on the same
array-like value.

Quick rule:

```text
Direct call:
array.method(callback)

Borrowed call:
Array.prototype.method.call(valueToUseAsThis, callback)
```

## Examples With Different Methods

```javascript
const arrayLike = {
  0: 'html',
  1: 'css',
  2: 'javascript',
  length: 3,
}
```

### `every()`

```javascript
Array.prototype.every.call(arrayLike, (value) => value.length > 0)
// true
```

Meaning:

```text
Check whether every value is non-empty.
```

### `some()`

```javascript
Array.prototype.some.call(arrayLike, (value) => value === 'javascript')
// true
```

Meaning:

```text
Check whether at least one value is "javascript".
```

### `map()`

```javascript
Array.prototype.map.call(arrayLike, (value) => value.toUpperCase())
// [ 'HTML', 'CSS', 'JAVASCRIPT' ]
```

Meaning:

```text
Transform every value and return a new real array.
```

### `filter()`

```javascript
Array.prototype.filter.call(arrayLike, (value) => value.length > 3)
// [ 'html', 'javascript' ]
```

Meaning:

```text
Keep only the values that pass the condition.
```

### `find()`

```javascript
Array.prototype.find.call(arrayLike, (value) => value.startsWith('j'))
// 'javascript'
```

Meaning:

```text
Return the first value that matches.
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
6. Direct array method calls set `this` automatically to the array before the
   dot.
7. `Array.prototype.method.call(arrayLike, callback)` borrows an Array method
   for an array-like value.
8. Static methods live on `Array`.
9. Iteration methods visit items.
10. Mutator methods change the original array.
11. Accessor and copying methods do not mutate the original array.
12. Monkey patching built-in prototypes is useful for learning, but risky in
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
