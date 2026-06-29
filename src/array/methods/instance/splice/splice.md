# Array.prototype.splice()

## What Problem Does It Solve?

`splice()` changes an array by removing, inserting, or replacing items.

```javascript
const letters = ['a', 'b', 'c', 'd', 'e']

letters.splice(1, 2)
// [ 'b', 'c' ]
```

After the call:

```javascript
letters
// [ 'a', 'd', 'e' ]
```

It is useful when the question is:

```text
How do I edit this array in place?
```

Important:

```text
splice() mutates the original array.
```

## Quick Definition

`splice()` is an Array instance method.

It changes the original array.

It returns a new array containing the removed items.

It can:

- remove items
- insert items
- replace items

## Mental Model

Think:

```text
go to start index
remove deleteCount items
insert any new items at that position
return the removed items
```

Short version:

```text
splice() edits the same array.
```

## Syntax

```javascript
array.splice(start)
array.splice(start, deleteCount)
array.splice(start, deleteCount, item1)
array.splice(start, deleteCount, item1, item2, itemN)
```

## Parameters

`start` is the index where the change begins.

```javascript
array.splice(2)
```

A negative `start` counts from the end of the array.

```javascript
array.splice(-1, 1)
```

`deleteCount` is optional.

It tells `splice()` how many items to remove.

```javascript
array.splice(1, 2)
```

If `deleteCount` is omitted, `splice()` removes from `start` to the end.

`item1`, `item2`, and later values are optional.

They are inserted at the `start` position.

```javascript
array.splice(1, 0, 'new item')
```

## Return Value

`splice()` returns a new array containing the removed items.

```javascript
const letters = ['a', 'b', 'c', 'd']
const removed = letters.splice(1, 2)

removed
// [ 'b', 'c' ]

letters
// [ 'a', 'd' ]
```

If no items are removed, it returns an empty array.

```javascript
const colors = ['red', 'blue']

colors.splice(1, 0, 'green')
// []
```

## Basic Remove

```javascript
const letters = ['a', 'b', 'c', 'd', 'e']

const removedLetters = letters.splice(1, 2)
```

Result:

```javascript
removedLetters
// [ 'b', 'c' ]

letters
// [ 'a', 'd', 'e' ]
```

The original array changed.

The returned array contains the removed values.

## Omitted `deleteCount`

When `deleteCount` is omitted, `splice()` removes from `start` to the end.

```javascript
const queue = ['first', 'second', 'third', 'fourth']

queue.splice(2)
// [ 'third', 'fourth' ]
```

After the call:

```javascript
queue
// [ 'first', 'second' ]
```

## Insert Without Deleting

Use `deleteCount` `0` when you want to insert without removing anything.

```javascript
const colors = ['red', 'blue']

colors.splice(1, 0, 'green', 'yellow')
// []
```

After the call:

```javascript
colors
// [ 'red', 'green', 'yellow', 'blue' ]
```

## Replace Items

To replace items, remove some items and insert new items in the same call.

```javascript
const menu = ['Tea', 'Coffee', 'Juice', 'Water']

menu.splice(1, 2, 'Lemonade', 'Smoothie')
// [ 'Coffee', 'Juice' ]
```

After the call:

```javascript
menu
// [ 'Tea', 'Lemonade', 'Smoothie', 'Water' ]
```

## Negative Start Index

A negative `start` counts from the end of the array.

```javascript
const tasks = ['wake', 'code', 'review', 'ship']

tasks.splice(-1, 1)
// [ 'ship' ]
```

After the call:

```javascript
tasks
// [ 'wake', 'code', 'review' ]
```

## No Arguments Vs `undefined`

`splice()` with no arguments removes nothing.

```javascript
const values = ['a', 'b', 'c']

values.splice()
// []

values
// [ 'a', 'b', 'c' ]
```

But `splice(undefined)` treats `start` as `0`.

Because `deleteCount` is omitted, it removes to the end.

```javascript
const values = ['a', 'b', 'c']

values.splice(undefined)
// [ 'a', 'b', 'c' ]

values
// []
```

This difference matters when values are passed through variables.

## Deleting To The End While Inserting

If you want to delete from `start` to the end and also insert new items, pass
`Infinity` as `deleteCount`.

```javascript
const pages = ['intro', 'setup', 'old-a', 'old-b']

pages.splice(2, Infinity, 'new-a')
// [ 'old-a', 'old-b' ]
```

After the call:

```javascript
pages
// [ 'intro', 'setup', 'new-a' ]
```

Why not omit `deleteCount` here?

```text
The second argument slot is deleteCount; inserted items start after that slot.
```

## `toSpliced()` For Copying

Use `toSpliced()` when you want a changed copy without mutating the original.

```javascript
const steps = ['plan', 'draft', 'review']

const updatedSteps = steps.toSpliced(1, 1, 'write')
```

Result:

```javascript
updatedSteps
// [ 'plan', 'write', 'review' ]

steps
// [ 'plan', 'draft', 'review' ]

updatedSteps === steps
// false
```

## Shallow Copy Warning

`toSpliced()` creates a new outer array.

It does not deep clone nested objects.

```javascript
const tasks = [
  { title: 'learn splice', done: false },
  { title: 'practice methods', done: false },
]

const updatedTasks = tasks.toSpliced(1, 0, {
  title: 'write notes',
  done: false,
})

updatedTasks[0].done = true
```

The outer array is new.

Nested objects from the original are still shared references.

```javascript
tasks[0].done
// true
```

## Sparse Array Behavior

`splice()` preserves empty slots in sparse arrays.

```javascript
const values = [1, , 3, 4, , 6]

const removed = values.splice(1, 2)
```

Removed result:

```javascript
removed
// [ empty, 3 ]
```

The first slot in `removed` is still empty.

```javascript
Object.hasOwn(removed, 0)
// false
```

The original array is also still sparse.

```javascript
values
// [ 1, 4, empty, 6 ]

Object.hasOwn(values, 2)
// false
```

## `toSpliced()` And Sparse Arrays

`toSpliced()` returns a dense array.

That means empty slots become real `undefined` values.

```javascript
const result = [1, , 3, 4, , 6].toSpliced(1, 2)

result
// [ 1, 4, undefined, 6 ]

Object.hasOwn(result, 2)
// true
```

## Generic Behavior

`splice()` is generic.

That means it can be borrowed for array-like objects.

```javascript
const arrayLike = {
  0: 'a',
  2: 'c',
  length: 3,
}

Array.prototype.splice.call(arrayLike, 0, 1, 'x', 'y')
// [ 'a' ]
```

The same object is mutated.

```javascript
arrayLike
// { '0': 'x', '1': 'y', '3': 'c', length: 4 }
```

## `splice()` Vs `slice()`

`splice()` mutates the original array.

```javascript
const values = ['a', 'b', 'c', 'd']

values.splice(1, 2)
// [ 'b', 'c' ]

values
// [ 'a', 'd' ]
```

`slice()` copies a portion and leaves the original unchanged.

```javascript
const values = ['a', 'b', 'c', 'd']

values.slice(1, 3)
// [ 'b', 'c' ]

values
// [ 'a', 'b', 'c', 'd' ]
```

## `splice()` Vs `toSpliced()`

`splice()` changes the original array.

`toSpliced()` returns a changed copy.

```javascript
const values = ['a', 'b', 'c']

values.toSpliced(1, 1, 'x')
// [ 'a', 'x', 'c' ]

values
// [ 'a', 'b', 'c' ]
```

## Important Notes

- `splice()` mutates the original array.
- `splice()` returns the removed items.
- `splice()` can remove, insert, and replace in one method.
- Omitted `deleteCount` removes from `start` to the end.
- `deleteCount` `0` inserts without deleting.
- Negative `start` counts from the end.
- Use `toSpliced()` when you want a copy-safe version.
- `splice()` preserves empty slots in sparse arrays.
- `toSpliced()` returns a dense array.
- `splice()` is generic and can be borrowed for array-like objects.

## When To Use It

Use `splice()` when:

- you intentionally want to edit the original array
- you want to remove items by index
- you want to insert items at a specific index
- you want to replace a section of an array

Use `toSpliced()` when you want the same kind of update without mutating the
original array.

## Common Mistakes

### Forgetting That `splice()` Mutates

```javascript
const letters = ['a', 'b', 'c']

letters.splice(1, 1)

letters
// [ 'a', 'c' ]
```

If you need the original array later, use `toSpliced()` or copy first.

### Confusing `splice()` With `slice()`

```javascript
array.splice(start, deleteCount)
array.slice(start, end)
```

`splice()` mutates.

`slice()` copies.

### Expecting Inserted Items In The Return Value

```javascript
const colors = ['red', 'blue']

colors.splice(1, 0, 'green')
// []
```

The return value contains removed items only.

The inserted item is in the original array.

```javascript
colors
// [ 'red', 'green', 'blue' ]
```

### Omitting `deleteCount` When You Also Want To Insert

```javascript
array.splice(2, Infinity, 'new item')
```

Use `Infinity` when you need to delete through the end and still pass inserted
items.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/splice/splice.js
```

The runnable file contains focused examples with terminal labels and expected
output comments.

## References

- MDN:
  [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
- MDN:
  [`Array.prototype.toSpliced()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced)
- ECMAScript spec:
  [`Array.prototype.splice`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.splice)
