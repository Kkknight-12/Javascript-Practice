# Array.prototype.concat()

## What Problem Does It Solve?

`concat()` creates a new array by joining arrays and/or values.

```javascript
const letters = ['a', 'b', 'c']
const moreLetters = ['d', 'e', 'f']

letters.concat(moreLetters)
// ['a', 'b', 'c', 'd', 'e', 'f']
```

It is useful when you want a merged array without changing the original arrays.

## Quick Definition

`concat()` is an Array instance method.

```javascript
array.concat(value1, value2, valueN)
```

It returns a new array.

It does not mutate the array before the dot.

It does not mutate the arrays passed as arguments.

## Mental Model

```text
current array + arguments -> new array
```

Example:

```javascript
['a', 'b'].concat(['c', 'd'], 'e')
// ['a', 'b', 'c', 'd', 'e']
```

Think:

```text
start with ['a', 'b']
add each item from ['c', 'd']
add value 'e'
return a new array
```

## Syntax

```javascript
concat()
concat(value1)
concat(value1, value2)
concat(value1, value2, valueN)
```

Arguments can be arrays or normal values.

## Basic Merge

```javascript
const letters = ['a', 'b', 'c']
const moreLetters = ['d', 'e', 'f']

const result = letters.concat(moreLetters)

result
// ['a', 'b', 'c', 'd', 'e', 'f']
```

The originals stay the same:

```javascript
letters
// ['a', 'b', 'c']

moreLetters
// ['d', 'e', 'f']
```

## Multiple Arguments

`concat()` can receive more than one argument.

```javascript
const result = ['a'].concat(['b', 'c'], 'd', ['e', 'f'])

result
// ['a', 'b', 'c', 'd', 'e', 'f']
```

Array arguments are spread one level.

Normal values are added as values.

## No Arguments Means Shallow Copy

```javascript
const letters = ['a', 'b', 'c']
const copy = letters.concat()

copy
// ['a', 'b', 'c']

copy === letters
// false
```

The outer array is new.

But this is still a shallow copy.

## Shallow Copy

Shallow copy means nested objects and arrays are shared.

```javascript
const team = [{ name: 'Mayank', skills: ['JS'] }]
const teamCopy = team.concat()

teamCopy[0].skills.push('React')

team
// [{ name: 'Mayank', skills: ['JS', 'React'] }]
```

The outer array is copied:

```javascript
teamCopy === team
// false
```

But the nested object is shared:

```javascript
teamCopy[0] === team[0]
// true
```

## Nested Arrays Are Not Deeply Flattened

`concat()` spreads array arguments one level.

It does not recursively flatten nested arrays.

```javascript
const num1 = [[1]]
const num2 = [2, [3]]

num1.concat(num2)
// [[1], 2, [3]]
```

If you need deep flattening, use `flat()` with the right depth.

## Empty Slots Are Preserved

Sparse arrays keep their empty slots.

```javascript
[1, , 3].concat([4, , 6])
// [1, empty, 3, 4, empty, 6]
```

The empty slots are still missing indexes, not real `undefined` values.

## Array-Like Objects

Array-like objects are not spread by default.

```javascript
const arrayLike = {
  0: 'x',
  1: 'y',
  length: 2,
}

['start'].concat(arrayLike)
// ['start', { 0: 'x', 1: 'y', length: 2 }]
```

The object is added as one value.

## `Symbol.isConcatSpreadable`

`Symbol.isConcatSpreadable` tells `concat()` whether a value should be spread.

```javascript
const spreadableArrayLike = {
  0: 'x',
  1: 'y',
  length: 2,
  [Symbol.isConcatSpreadable]: true,
}

['start'].concat(spreadableArrayLike)
// ['start', 'x', 'y']
```

You can also stop a real array from being spread:

```javascript
const values = ['x', 'y']

Object.defineProperty(values, Symbol.isConcatSpreadable, {
  value: false,
  configurable: true,
})

['start'].concat(values)
// ['start', ['x', 'y']]
```

This is not common in everyday code, but it explains the deeper behavior.

## Generic Behavior

`concat()` is generic. That means it can be called with a non-array `this`
value.

```javascript
Array.prototype.concat.call({ type: 'object' }, 1, 2)
// [{ type: 'object' }, 1, 2]
```

The return value is still a new plain array.

This is advanced behavior. In everyday code, you will normally call `concat()`
on arrays.

## `concat()` Vs `push()`

`concat()` returns a new array.

```javascript
const values = [1, 2]

values.concat(3)
// [1, 2, 3]

values
// [1, 2]
```

`push()` mutates the original array and returns the new length.

```javascript
const values = [1, 2]

values.push(3)
// 3

values
// [1, 2, 3]
```

## `concat()` Vs Spread Syntax

For everyday array merging, spread syntax is often shorter.

```javascript
const result = [...[1, 2], ...[3, 4]]
// [1, 2, 3, 4]
```

`concat()` is still useful when:

1. You prefer method chaining.
2. You are working with code that already uses array methods.
3. You need concat-specific behavior like `Symbol.isConcatSpreadable`.
4. You want a shallow copy with `array.concat()`.

## Common Mistakes

### Mistake 1: Expecting `concat()` To Mutate

```javascript
const numbers = [1, 2]

numbers.concat(3)

numbers
// [1, 2]
```

Fix:

```javascript
const result = numbers.concat(3)
// [1, 2, 3]
```

### Mistake 2: Expecting Deep Copy

```javascript
const original = [[1]]
const copy = original.concat()

copy[0].push(2)

original
// [[1, 2]]
```

The nested array is shared.

### Mistake 3: Expecting Deep Flattening

```javascript
[[1]].concat([2, [3]])
// [[1], 2, [3]]
```

Use `flat()` if flattening is the goal.

### Mistake 4: Expecting Array-Like Objects To Spread

```javascript
['a'].concat({ 0: 'b', length: 1 })
// ['a', { 0: 'b', length: 1 }]
```

Use `Symbol.isConcatSpreadable` or convert the object with `Array.from()`.

## Important Notes

1. `concat()` returns a new array.
2. It does not mutate the source arrays.
3. It is a shallow-copy method.
4. Array arguments are spread one level.
5. Nested arrays are not deeply flattened.
6. Empty slots are preserved.
7. Array-like objects are not spread unless `Symbol.isConcatSpreadable` is true.
8. `push()` mutates; `concat()` does not.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/concat/concat.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## Reference

- [MDN: Array.prototype.concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
