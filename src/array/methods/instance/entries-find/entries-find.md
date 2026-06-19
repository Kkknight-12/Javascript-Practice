# Array.entries() With find()

## What Problem Does It Solve?

This page teaches a useful two-step pattern:

```javascript
array.entries()
array.find(callback)
```

Use `entries()` when you need both the index and value while looping.

Use `find()` when you need the first element that matches a condition.

Then combine them when you need to loop over one list and search inside each
item.

## Mental Model

```text
entries()
  -> give me [index, value] pairs

find()
  -> give me the first element that passes a test

entries() + find()
  -> loop with index, then search inside each value
```

## Part 1: `entries()`

`entries()` returns an iterator of `[index, value]` pairs.

```javascript
const letters = ['a', 'b', 'c']

const iterator = letters.entries()
```

It does not return a normal array.

```javascript
Array.isArray(iterator)
// false
```

## Reading An `entries()` Iterator

Call `next()` to pull one pair at a time.

```javascript
const letters = ['a', 'b', 'c']
const iterator = letters.entries()

iterator.next().value
// [0, 'a']

iterator.next().value
// [1, 'b']

iterator.next().value
// [2, 'c']
```

After the iterator is consumed, it is done:

```javascript
iterator.next()
// { value: undefined, done: true }
```

## Convert Entries To A Real Array

If you want to see all pairs at once, use spread syntax:

```javascript
const letters = ['a', 'b', 'c']

[...letters.entries()]
// [[0, 'a'], [1, 'b'], [2, 'c']]
```

## Most Common `entries()` Pattern

Use `for...of` with destructuring.

```javascript
const letters = ['a', 'b', 'c']

for (const [index, letter] of letters.entries()) {
  console.log(index, letter)
}
```

Output:

```text
0 a
1 b
2 c
```

## Empty Slots With `entries()`

`entries()` visits every index from `0` to `length - 1`.

Empty slots appear as `undefined`.

```javascript
const sparse = ['a', , 'c']

[...sparse.entries()]
// [[0, 'a'], [1, undefined], [2, 'c']]
```

The slot is still missing:

```javascript
Object.hasOwn(sparse, 1)
// false
```

## Part 2: `find()`

`find()` searches from left to right and returns the first element whose callback
returns truthy.

```javascript
const numbers = [5, 12, 8, 130, 44]

numbers.find((number) => number > 10)
// 12
```

This is the one return rule to remember:

```text
find() returns the element itself.
It does not return true/false.
It does not return the index.
It does not return the callback result.
```

In the example above, the callback returns `true` for `12`, but `find()` returns
`12`.

Even if the callback returns some other truthy value, `find()` still returns the
matching element:

```javascript
[5, 12].find((number) => {
  return number > 10 ? 'yes' : false
})
// 12
```

The callback result decides whether the element matches. It is not the final
return value.

## Object Reference Nuance

When the matching element is an object, the value you receive is the same object
that already lives inside the array.

```javascript
const users = [
  { id: 1, name: 'Asha' },
  { id: 2, name: 'Mayank' },
  { id: 3, name: 'Nina' },
]

const foundUser = users.find((user) => user.id === 2)

foundUser
// { id: 2, name: 'Mayank' }

foundUser === users[1]
// true
```

That means no clone is created.

## When Nothing Matches

If no element passes the callback test, `find()` returns `undefined`.

```javascript
const numbers = [5, 12, 8]

numbers.find((number) => number > 100)
// undefined
```

Small nuance:

If `undefined` can be a real element in your array, then `undefined` alone is
not enough to prove "not found".

```javascript
[undefined, 1].find((value) => value === undefined)
// undefined
```

In that kind of case, use `findIndex()` or `some()` when you need a clear
existence check.

## `find()` Stops After The First Match

```javascript
const visited = []

[1, 3, 4, 6, 8].find((number) => {
  visited.push(number)
  return number % 2 === 0
})

visited
// [1, 3, 4]
```

It stopped after finding `4`.

## `find()` Callback Arguments

The callback receives:

```javascript
find((value, index, array) => {
  // return truthy to make find() return value
})
```

Use these when the position or original array matters.

```javascript
numbers.find((value, index, array) => {
  return value > 10 && index < array.length
})
```

## Part 3: `entries()` And `find()` Together

Example: tic-tac-toe winning combinations.

```javascript
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]

const playerMoves = new Set([0, 2, 3, 4, 5])
```

We want three things:

```text
combo index
combo value
first cell in that combo that the player has played
```

Use `entries()` for the outer index:

```javascript
for (const [comboIndex, combo] of winCombos.entries()) {
  // comboIndex -> 0, 1, 2...
  // combo -> [0, 1, 2], [3, 4, 5]...
}
```

Use `find()` inside each combo:

```javascript
const firstMatchingCell = combo.find((cell) => playerMoves.has(cell))
```

Full pattern:

```javascript
const results = []

for (const [comboIndex, combo] of winCombos.entries()) {
  const firstMatchingCell = combo.find((cell) => playerMoves.has(cell))

  if (firstMatchingCell !== undefined) {
    results.push({ comboIndex, combo, firstMatchingCell })
  }
}
```

For this exact data, `firstMatchingCell !== undefined` works because cell values
are numbers. If `undefined` could be a valid found value, use `findIndex()` or
`some()` for the existence check.

## Object Entries Comparison

For arrays:

```javascript
array.entries()
```

For plain objects:

```javascript
Object.entries(object)
```

Example:

```javascript
const user = {
  name: 'Mayank',
  role: 'learner',
}

Object.entries(user)
// [['name', 'Mayank'], ['role', 'learner']]
```

## Common Mistakes

### Mistake 1: Thinking `entries()` Returns An Array

```javascript
const result = ['a', 'b'].entries()

Array.isArray(result)
// false
```

It returns an iterator.

Use this when you need a real array:

```javascript
[...['a', 'b'].entries()]
// [[0, 'a'], [1, 'b']]
```

### Mistake 2: Reusing A Consumed Iterator

```javascript
const iterator = ['a', 'b'].entries()

iterator.next()
iterator.next()
iterator.next()
// done
```

After it is done, create a new iterator:

```javascript
const freshIterator = ['a', 'b'].entries()
```

### Mistake 3: Checking `find()` Result With Truthy/Falsy Logic

This is wrong when `0` can be a valid found value.

```javascript
const found = [0, 1, 2].find((cell) => cell === 0)

if (found) {
  console.log('found')
}
```

`0` is falsy, so that check fails.

For this kind of data, use:

```javascript
if (found !== undefined) {
  console.log('found')
}
```

If `undefined` can be a valid found value, use `findIndex()` or `some()`.

### Mistake 4: Confusing `Object.entries()` And `array.entries()`

```javascript
array.entries()
Object.entries(object)
```

They solve similar-looking problems for different data shapes.

## Important Notes

1. `entries()` returns an iterator, not an array.
2. Each entry is `[index, value]`.
3. Use `for...of` with destructuring for clean array loops.
4. `entries()` visits empty slots as `undefined`.
5. `find()` returns the first matching element itself.
6. `find()` does not return true/false, the index, or the callback result.
7. `find()` returns `undefined` when nothing matches.
8. `find()` stops after the first match.
9. Be careful with truthy/falsy checks when `find()` may return `0`, `''`,
   `false`, or `undefined` as real data.
10. Use `Object.entries()` for plain objects.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/entries-find/entries-find.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## References

- [MDN: Array.prototype.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)
- [MDN: Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
