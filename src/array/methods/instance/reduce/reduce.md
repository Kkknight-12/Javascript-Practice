# Array.prototype.reduce()

## What Problem Does It Solve?

`reduce()` takes many array values and builds one final result.

```javascript
const numbers = [1, 2, 3, 4]

numbers.reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 10
```

It is useful when the question is:

```text
How do I combine all items into one final value?
```

Examples:

```text
numbers -> total
words -> count object
rows -> grouped object
nested arrays -> one flat array
cart items -> final bill
```

## Quick Definition

`reduce()` is an Array instance method.

It runs a reducer callback for each existing array element.

It returns one final accumulator value.

## Mental Model

Think:

```text
start with an accumulator

for each existing item:
  combine accumulator with current item
  return the next accumulator

return the final accumulator
```

Short version:

```text
reduce() carries a value forward.
```

## Syntax

```javascript
array.reduce(callbackFn)
array.reduce(callbackFn, initialValue)
```

Unlike methods such as `map()`, `filter()`, and `every()`, `reduce()` does not
have a `thisArg` parameter.

## Parameters

`callbackFn` runs for each existing element.

```javascript
array.reduce((accumulator, currentValue, currentIndex, array) => {
  return nextAccumulator
}, initialValue)
```

The callback receives:

```text
accumulator  -> value carried from the previous step
currentValue -> current array element
currentIndex -> current index
array        -> original array being reduced
```

`initialValue` is optional, but usually recommended.

It is the first accumulator value.

## Return Value

`reduce()` returns the final accumulator.

The final value can be any type:

```text
number
string
array
object
boolean
Map
anything you deliberately build
```

## Basic Example

```javascript
const numbers = [1, 2, 3, 4]

const total = numbers.reduce((accumulator, number) => {
  return accumulator + number
}, 0)
```

Result:

```javascript
10
```

The initial accumulator is `0`.

Each callback return value becomes the next accumulator.

## Step-By-Step Dry Run

```javascript
[1, 2, 3, 4].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
```

Dry run:

```text
start accumulator = 0

index 0 -> accumulator 0  + number 1 -> return 1
index 1 -> accumulator 1  + number 2 -> return 3
index 2 -> accumulator 3  + number 3 -> return 6
index 3 -> accumulator 6  + number 4 -> return 10

final result = 10
```

## With Initial Value

When you pass an initial value, `reduce()` starts reading at the first existing
array element.

```javascript
[10, 20, 30].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 60
```

Start:

```text
accumulator = 0
currentValue = 10
```

This is usually easier to reason about.

## Without Initial Value

When you do not pass an initial value, the first existing element becomes the
accumulator.

The callback starts at the next existing element.

```javascript
[10, 20, 30].reduce((accumulator, number) => {
  return accumulator + number
})
// 60
```

Start:

```text
accumulator = 10
currentValue = 20
```

This can be okay for simple non-empty arrays, but it is easier to make mistakes
with empty arrays and mixed result types.

## Empty Arrays

An empty array works when you provide an initial value.

```javascript
[].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 0
```

An empty array without an initial value throws a `TypeError`.

```javascript
[].reduce((accumulator, number) => {
  return accumulator + number
})
// TypeError
```

Practical rule:

```text
Prefer passing an initial value.
```

## Callback Return Rule

The callback must return the next accumulator.

Wrong:

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  accumulator + number
}, 0)
// undefined
```

Why?

The callback body uses braces, but it does not `return`.

Fix:

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 6
```

Or use an implicit return:

```javascript
[1, 2, 3].reduce((accumulator, number) => accumulator + number, 0)
// 6
```

## Reduce Into An Object

The accumulator does not have to be a number.

It can be an object.

Example: count method names.

```javascript
const methods = ['map', 'filter', 'map', 'reduce', 'filter', 'map']

methods.reduce((counts, methodName) => {
  counts[methodName] = (counts[methodName] || 0) + 1
  return counts
}, {})
// { map: 3, filter: 2, reduce: 1 }
```

Mental model:

```text
counts starts as {}
each item updates counts
return counts for the next step
```

## Reduce Into Grouped Arrays

`reduce()` is useful when each item must be placed into one bucket.

```javascript
const channels = [
  { id: 1, type: 'TEXT', name: 'general' },
  { id: 2, type: 'TEXT', name: 'random' },
  { id: 3, type: 'AUDIO', name: 'music' },
]

channels.reduce(
  (groups, channel) => {
    if (channel.type === 'TEXT') {
      groups.textChannels.push(channel)
    }

    if (channel.type === 'AUDIO') {
      groups.audioChannels.push(channel)
    }

    return groups
  },
  {
    textChannels: [],
    audioChannels: [],
  }
)
```

Result:

```javascript
{
  textChannels: [
    { id: 1, type: 'TEXT', name: 'general' },
    { id: 2, type: 'TEXT', name: 'random' }
  ],
  audioChannels: [
    { id: 3, type: 'AUDIO', name: 'music' }
  ]
}
```

This is the strongest idea from the old scratch file, now with the accumulator
made explicit.

## Reduce Into An Array

The accumulator can be an array too.

```javascript
const nestedNumbers = [[1, 2], [3], [4, 5]]

nestedNumbers.reduce((result, group) => {
  return result.concat(group)
}, [])
// [1, 2, 3, 4, 5]
```

This works.

But for simple flattening, `flat()` is clearer:

```javascript
nestedNumbers.flat()
// [1, 2, 3, 4, 5]
```

## Callback Arguments

The reducer callback receives four arguments.

```javascript
array.reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator
}, initialValue)
```

Example:

```javascript
['a', 'b'].reduce((details, value, index, array) => {
  details.push(`${index}:${value}/${array.length}`)
  return details
}, [])
// [ '0:a/2', '1:b/2' ]
```

## Sparse Array Behavior

`reduce()` skips empty slots.

```javascript
const sparse = [1, , 3]

sparse.reduce((accumulator, value) => {
  return accumulator + value
}, 0)
// 4
```

The empty slot at index `1` is not visited.

```javascript
Object.hasOwn(sparse, 1)
// false
```

## Generic Behavior

`reduce()` is generic.

That means it can be borrowed for array-like objects.

```javascript
const arrayLikeScores = {
  0: 72,
  1: 91,
  2: 64,
  length: 3,
}

Array.prototype.reduce.call(
  arrayLikeScores,
  (accumulator, score) => accumulator + score,
  0
)
// 227
```

For the shared explanation of borrowed Array methods, see:

```text
src/array/methods/instance/prototype/concept/array-prototype.md
```

## When `reduce()` Is Not The Clearest Tool

`reduce()` is powerful, but power is not always clarity.

This works:

```javascript
const activeNames = users.reduce((names, user) => {
  if (user.active) {
    names.push(user.name)
  }

  return names
}, [])
```

But this often reads better:

```javascript
const activeNames = users
  .filter((user) => user.active)
  .map((user) => user.name)
```

Use the method that makes the intention easiest to read.

## Important Notes

1. `reduce()` returns one final accumulator value.
2. The callback return value becomes the next accumulator.
3. Passing an initial value is usually the safest habit.
4. Empty arrays without an initial value throw `TypeError`.
5. Without an initial value, the first existing item becomes the accumulator.
6. Empty slots in sparse arrays are skipped.
7. `reduce()` does not have a `thisArg` parameter.
8. `reduce()` is generic and can work with array-like objects.
9. The accumulator can be any type.
10. Do not use `reduce()` when a clearer method communicates the intent better.

## When To Use It

Use `reduce()` when you are building one final result from many items.

Good fits:

```text
sum numbers
calculate a cart total
count frequencies
group items by category
build a lookup object
combine nested arrays
```

Use another method when the question is simpler:

```text
Need transformed values?      -> map()
Need selected items?          -> filter()
Need selected then shaped?    -> filter().map()
Need a flattened array?       -> flat() or flatMap()
Need the first matching item? -> find()
Need a yes/no answer?         -> some() or every()
```

## Common Mistakes

### Mistake 1: Forgetting To Return The Accumulator

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  accumulator + number
}, 0)
// undefined
```

Fix:

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  return accumulator + number
}, 0)
// 6
```

### Mistake 2: Skipping The Initial Value

```javascript
[].reduce((accumulator, number) => accumulator + number)
// TypeError
```

Fix:

```javascript
[].reduce((accumulator, number) => accumulator + number, 0)
// 0
```

### Mistake 3: Changing Accumulator Type By Accident

```javascript
[1, 2, 3].reduce((accumulator, number) => {
  if (number === 2) {
    return 'two'
  }

  return accumulator + number
}, 0)
```

This makes the accumulator switch from number to string.

Keep the accumulator type intentional.

### Mistake 4: Using `reduce()` For Everything

```javascript
users.reduce((names, user) => {
  if (user.active) names.push(user.name)
  return names
}, [])
```

This is valid.

But this may be clearer:

```javascript
users.filter((user) => user.active).map((user) => user.name)
```

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/reduce/reduce.js
```

The runnable file contains labelled terminal examples, inline comments, and
expected output comments for the main cases.

## Related Practice File

For a from-scratch implementation, use:

```bash
node src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.js
```

This page teaches the built-in method.

The custom practice page teaches how a learning version can be implemented.

## References

- MDN:
  [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- ECMAScript spec:
  [`Array.prototype.reduce`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reduce)
