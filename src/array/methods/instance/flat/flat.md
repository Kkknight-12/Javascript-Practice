# Array.prototype.flat()

## What Problem Does It Solve?

`flat()` opens nested arrays and returns a new flattened array.

```javascript
const numbers = [1, 2, [3, 4]]

numbers.flat()
// [1, 2, 3, 4]
```

It is useful when your data has arrays inside arrays and you want fewer nesting
levels.

Examples:

```text
grouped search results
nested category ids
matrix rows that should become one list
API data that arrives in grouped chunks
```

## Quick Definition

`flat()` is an Array instance method.

```javascript
array.flat()
array.flat(depth)
```

It returns a new array.

It does not mutate the original array.

The default `depth` is `1`.

## Mental Model

Think:

```text
Start with an empty result array.
Walk through the array.
If an item is not an array:
  put it into the result.
If an item is an array:
  open it only as deep as the chosen depth allows.
Return the new result array.
```

Short version:

```text
flat() opens nested arrays up to a chosen depth.
```

## Basic Example

```javascript
const values = [0, 1, 2, [3, 4]]

values.flat()
// [0, 1, 2, 3, 4]
```

The original array stays nested:

```javascript
values
// [0, 1, 2, [3, 4]]
```

## Default Depth Is `1`

If you do not pass a depth, `flat()` opens only one nested level.

```javascript
const values = [0, 1, [2, [3, [4, 5]]]]

values.flat()
// [0, 1, 2, [3, [4, 5]]]
```

Only `[2, [3, [4, 5]]]` was opened one level.

The deeper `[3, [4, 5]]` stayed nested.

## Choosing A Depth

Pass a number when you want to flatten more levels.

```javascript
const values = [0, 1, [2, [3, [4, 5]]]]

values.flat(2)
// [0, 1, 2, 3, [4, 5]]
```

Use `Infinity` when you want to flatten all nested array levels.

```javascript
values.flat(Infinity)
// [0, 1, 2, 3, 4, 5]
```

Use this carefully.

`Infinity` is convenient, but it can hide the real shape of your data if you use
it everywhere without thinking.

## Depth `0`

`flat(0)` does not open nested arrays.

But it still returns a new outer array.

```javascript
const source = [1, [2, 3]]
const result = source.flat(0)

result
// [1, [2, 3]]

result === source
// false
```

This is still a shallow copy.

## Not Recursive Unless Depth Is High Enough

```javascript
const boxes = ['outer', ['level 1', ['level 2', ['level 3']]]]

boxes.flat(1)
// ['outer', 'level 1', ['level 2', ['level 3']]]

boxes.flat(2)
// ['outer', 'level 1', 'level 2', ['level 3']]

boxes.flat(Infinity)
// ['outer', 'level 1', 'level 2', 'level 3']
```

The depth controls how many array layers are opened.

## Return Rule

`flat()` returns a new array.

```javascript
const original = [1, [2, 3]]
const flattened = original.flat()

flattened
// [1, 2, 3]

flattened === original
// false
```

It does not mutate the original array.

```javascript
original
// [1, [2, 3]]
```

## Shallow Copy Behavior

`flat()` creates a new outer array.

But objects inside the result are still the same object references from the
original array.

```javascript
const teams = [
  [{ name: 'Asha', skills: ['JS'] }],
  [{ name: 'Mayank', skills: ['CSS'] }],
]

const flatTeams = teams.flat()

flatTeams[0] === teams[0][0]
// true
```

If you mutate that shared object, the change is visible from both arrays.

```javascript
flatTeams[0].skills.push('React')

teams[0][0]
// { name: 'Asha', skills: ['JS', 'React'] }
```

But replacing an item in the returned array does not replace the item inside the
original nested array.

```javascript
flatTeams[1] = { name: 'Nina', skills: ['Node'] }

teams[1][0]
// { name: 'Mayank', skills: ['CSS'] }
```

Why?

```text
Mutating the shared object affects both.
Replacing the result slot changes only the new outer array.
```

## Sparse Arrays

A sparse array has empty slots.

```javascript
const values = [1, , 3, [4, , 6]]
```

`flat()` removes empty slots at the levels it flattens.

```javascript
values.flat()
// [1, 3, 4, 6]
```

The missing root slot was removed.

The missing slot inside `[4, , 6]` was also removed because that nested array was
flattened at depth `1`.

Empty slots deeper than the chosen depth stay inside nested arrays that were not
opened yet.

```javascript
const deepValues = [1, [2, [3, , 5]]]

deepValues.flat(1)
// [1, 2, [3, empty, 5]]

deepValues.flat(2)
// [1, 2, 3, 5]
```

## `flat()` Only Flattens Real Arrays

`flat()` opens real arrays.

It does not flatten array-like objects that are stored inside the array.

```javascript
const values = [
  ['a', 'b'],
  { 0: 'c', 1: 'd', length: 2 },
  ['e'],
]

values.flat()
// ['a', 'b', { 0: 'c', 1: 'd', length: 2 }, 'e']
```

The object with `length` looks array-like, but it is still just an object.

So `flat()` keeps it as one value.

## Generic Behavior

`flat()` itself is generic.

That means you can call it on an array-like object.

It needs:

```text
a length property
integer-keyed properties
```

Example:

```javascript
const arrayLike = {
  length: 3,
  0: [1, 2],
  1: { 0: 3, 1: 4, length: 2 },
  2: 5,
}

Array.prototype.flat.call(arrayLike)
// [1, 2, { 0: 3, 1: 4, length: 2 }, 5]
```

The `0` value is a real array, so it is flattened.

The `1` value is array-like, but not a real array, so it is kept as one object.

## `flat()` Vs `concat()`

`flat()` opens nested arrays inside one array.

```javascript
[1, [2, 3]].flat()
// [1, 2, 3]
```

`concat()` joins values and arguments.

```javascript
[1].concat([[2, 3]])
// [1, [2, 3]]
```

The array `[[2, 3]]` is passed as an argument to `concat()`, so `concat()`
spreads that argument one level and keeps `[2, 3]` as a value.

If your main problem is nested arrays inside one array, think about `flat()`.

If your main problem is joining multiple arrays or values, think about
`concat()`.

## `flat()` Vs `flatMap()`

`flat()` only flattens.

`flatMap()` maps each item and then flattens one level.

```javascript
[1, 2, 3].flatMap((number) => [number * 2])
// [2, 4, 6]
```

We will keep the `flatMap()` details for the separate `flatMap` page.

## Common Mistakes

### Mistake 1: Expecting Deep Flattening By Default

```javascript
const values = [1, [2, [3]]]

values.flat()
// [1, 2, [3]]
```

Default depth is `1`.

Use a higher depth when needed.

```javascript
values.flat(2)
// [1, 2, 3]
```

### Mistake 2: Thinking `flat()` Mutates The Original Array

```javascript
const values = [1, [2, 3]]

values.flat()

values
// [1, [2, 3]]
```

The original array is unchanged.

Save the result.

```javascript
const flattened = values.flat()
```

### Mistake 3: Forgetting It Is Shallow

```javascript
const values = [[{ count: 1 }]]
const flattened = values.flat()

flattened[0].count = 2

values[0][0]
// { count: 2 }
```

The outer array is new.

The object is shared.

### Mistake 4: Expecting Array-Like Objects To Flatten

```javascript
const values = [{ 0: 'a', 1: 'b', length: 2 }]

values.flat()
// [{ 0: 'a', 1: 'b', length: 2 }]
```

That object is array-like, but not a real array.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/flat/flat.js
```

The `.js` file includes commented examples and expected output comments beside
the terminal logs.

## Review Checklist

- [x] `flat()` returns a new array.
- [x] Default depth is `1`.
- [x] A custom depth controls how many nested array levels are opened.
- [x] `Infinity` flattens all nested array levels.
- [x] `flat()` does not mutate the original array.
- [x] The result is shallow, so nested objects are shared.
- [x] Empty slots are removed at flattened levels.
- [x] `flat()` is generic, but only real arrays are flattened.
- [x] The runnable file can be executed with Node.

## References

- [MDN: Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)
