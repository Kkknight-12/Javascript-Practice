# Array.prototype.sort()

## What Problem Does It Solve?

`sort()` reorders array elements.

```javascript
const names = ['Maya', 'Asha', 'Neel']

names.sort()
// [ 'Asha', 'Maya', 'Neel' ]
```

It is useful when the question is:

```text
How do I arrange this array into a specific order?
```

Important:

```text
sort() mutates the original array.
```

## Quick Definition

`sort()` is an Array instance method.

It sorts the array in place.

It returns the same array object after sorting.

By default, it sorts values as strings.

For numbers and custom ordering, pass a compare function.

## Mental Model

Think:

```text
same array
compare two values
move them according to the compare result
continue until the array is ordered
return the same array
```

Short version:

```text
sort() reorders the same array.
```

## Syntax

```javascript
array.sort()
array.sort(compareFn)
```

## Parameters

`compareFn` is optional.

It receives two values from the array.

```javascript
array.sort((a, b) => {
  return a - b
})
```

The return value controls order:

```text
negative number -> a before b
positive number -> a after b
0               -> keep their relative order
```

If `compareFn` is omitted, values are converted to strings and sorted by
character order.

## Return Value

`sort()` returns the same array reference.

```javascript
const numbers = [3, 1, 2]
const result = numbers.sort((a, b) => a - b)

result
// [1, 2, 3]

numbers
// [1, 2, 3]

result === numbers
// true
```

This is different from copying methods like `slice()`, `concat()`, and
`toSorted()`.

## Basic Example

```javascript
const names = ['Maya', 'Asha', 'Neel']

const sortedNames = names.sort()
```

Result:

```javascript
sortedNames
// [ 'Asha', 'Maya', 'Neel' ]

names
// [ 'Asha', 'Maya', 'Neel' ]
```

Both variables point to the same array.

## Default Sort Is String Sort

Without a compare function, `sort()` converts values to strings.

That is why numeric arrays can look wrong.

```javascript
const numbers = [1, 30, 4, 21, 100000]

numbers.sort()
// [1, 100000, 21, 30, 4]
```

The values are sorted like string values:

```text
"1"
"100000"
"21"
"30"
"4"
```

For numeric sorting, pass a compare function.

## Numeric Ascending Sort

```javascript
const scores = [40, 100, 1, 5, 25, 10]

scores.sort((a, b) => a - b)
// [1, 5, 10, 25, 40, 100]
```

Why it works:

```text
a - b is negative -> a comes first
a - b is positive -> b comes first
```

## Numeric Descending Sort

```javascript
const scores = [40, 100, 1, 5, 25, 10]

scores.sort((a, b) => b - a)
// [100, 40, 25, 10, 5, 1]
```

For descending order, reverse the subtraction.

## Compare Function Meaning

A compare function must return a number.

```javascript
(a, b) => a - b
```

Example:

```javascript
2 - 5
// -3
```

Negative means `2` should come before `5`.

```javascript
5 - 2
// 3
```

Positive means `5` should come after `2`.

```javascript
5 - 5
// 0
```

Zero means the values are considered equal for sorting.

## Sort Objects By Number Property

```javascript
const people = [
  { name: 'Edward', age: 21 },
  { name: 'Sharpe', age: 37 },
  { name: 'And', age: 45 },
  { name: 'The', age: -12 },
  { name: 'Magnetic', age: 13 },
  { name: 'Zeros', age: 37 },
]

people.sort((a, b) => a.age - b.age)
```

Result:

```javascript
[
  { name: 'The', age: -12 },
  { name: 'Magnetic', age: 13 },
  { name: 'Edward', age: 21 },
  { name: 'Sharpe', age: 37 },
  { name: 'Zeros', age: 37 },
  { name: 'And', age: 45 },
]
```

## Sort Objects By String Property

Use `localeCompare()` for readable string sorting.

```javascript
const products = [
  { title: 'banana' },
  { title: 'Apple' },
  { title: 'cherry' },
]

products.sort((a, b) => {
  return a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
})
```

Result:

```javascript
[
  { title: 'Apple' },
  { title: 'banana' },
  { title: 'cherry' },
]
```

## Stable Sort

Modern JavaScript `sort()` is stable.

That means items that compare as equal keep their original relative order.

```javascript
const students = [
  { name: 'Alex', grade: 15 },
  { name: 'Devlin', grade: 15 },
  { name: 'Eagle', grade: 13 },
  { name: 'Sam', grade: 14 },
]

students.sort((a, b) => a.grade - b.grade)
```

Result:

```javascript
[
  { name: 'Eagle', grade: 13 },
  { name: 'Sam', grade: 14 },
  { name: 'Alex', grade: 15 },
  { name: 'Devlin', grade: 15 },
]
```

`Alex` and `Devlin` both have grade `15`.

They keep their original order.

## `toSorted()` For Copying

Use `toSorted()` when you want a sorted copy without mutating the original.

```javascript
const queue = ['third', 'first', 'second']

const sortedQueue = queue.toSorted()
```

Result:

```javascript
sortedQueue
// [ 'first', 'second', 'third' ]

queue
// [ 'third', 'first', 'second' ]

sortedQueue === queue
// false
```

## Copy-First Sort Pattern

If `toSorted()` is not available in an older environment, copy first.

```javascript
const priorities = [3, 1, 2]

const sortedPriorities = [...priorities].sort((a, b) => a - b)
```

Result:

```javascript
sortedPriorities
// [1, 2, 3]

priorities
// [3, 1, 2]
```

You can also use `Array.from(priorities).sort(...)`.

## Shallow Copy Warning

`toSorted()`, `[...array].sort()`, and `Array.from(array).sort()` create a new
outer array.

They do not deep clone nested objects.

```javascript
const tasks = [
  { title: 'learn sort', priority: 2, done: false },
  { title: 'practice compareFn', priority: 1, done: false },
]

const sortedTaskCopy = tasks.toSorted((a, b) => a.priority - b.priority)

sortedTaskCopy[0].done = true
```

The outer array is new.

The task objects are shared references.

```javascript
tasks[1].done
// true
```

## `undefined` And Sparse Array Behavior

`undefined` values sort after defined values.

Empty slots move after `undefined` values and remain empty slots.

```javascript
const values = [3, undefined, 1, , 2]

values.sort((a, b) => a - b)
// [1, 2, 3, undefined, empty]
```

The empty slot did not become a real `undefined` value.

```javascript
Object.hasOwn(values, 4)
// false
```

## Generic Behavior

`sort()` is generic.

That means it can be borrowed for array-like objects.

```javascript
const arrayLike = {
  0: 'delta',
  1: 'alpha',
  2: 'charlie',
  length: 3,
}

Array.prototype.sort.call(arrayLike)
// { '0': 'alpha', '1': 'charlie', '2': 'delta', length: 3 }
```

The same object is mutated and returned.

## Compare Function Must Be Well-Formed

A compare function should be consistent.

This is good:

```javascript
numbers.sort((a, b) => a - b)
```

This is a common mistake:

```javascript
numbers.sort((a, b) => a > b)
```

Why?

```text
a > b returns true or false.
sort() expects negative number, positive number, or 0.
```

Different JavaScript engines may handle bad compare functions differently.

## `sort()` Vs `toSorted()`

`sort()` mutates the original array.

```javascript
const numbers = [3, 1, 2]

numbers.sort((a, b) => a - b)

numbers
// [1, 2, 3]
```

`toSorted()` returns a sorted copy.

```javascript
const numbers = [3, 1, 2]

const sorted = numbers.toSorted((a, b) => a - b)

numbers
// [3, 1, 2]

sorted
// [1, 2, 3]
```

## Important Notes

- `sort()` mutates the original array.
- `sort()` returns the same array reference.
- Default `sort()` compares string values.
- Use `(a, b) => a - b` for numeric ascending sort.
- Use `(a, b) => b - a` for numeric descending sort.
- Modern JavaScript `sort()` is stable.
- Use `toSorted()` when you want a sorted copy.
- Copy-first patterns are shallow, not deep.
- `undefined` values sort after defined values.
- Sparse array empty slots remain empty slots and move to the end.
- `sort()` is generic and can be borrowed for array-like objects.

## When To Use It

Use `sort()` when:

- you intentionally want to reorder the original array
- you need alphabetical sorting
- you need numeric sorting with a compare function
- you need to sort objects by a property
- you understand that the original array will change

Use `toSorted()` when you want the sorted result but want to keep the original
array unchanged.

## Common Mistakes

### Sorting Numbers Without A Compare Function

```javascript
[1, 30, 4, 21, 100000].sort()
// [1, 100000, 21, 30, 4]
```

Fix:

```javascript
[1, 30, 4, 21, 100000].sort((a, b) => a - b)
// [1, 4, 21, 30, 100000]
```

### Forgetting That `sort()` Mutates

```javascript
const numbers = [3, 1, 2]

numbers.sort((a, b) => a - b)

numbers
// [1, 2, 3]
```

Use `toSorted()` or copy first if you need the original order later.

### Returning Booleans From `compareFn`

```javascript
numbers.sort((a, b) => a > b)
```

This is not a well-formed compare function.

Return a number instead.

```javascript
numbers.sort((a, b) => a - b)
```

### Thinking `toSorted()` Deep Clones Objects

```javascript
const users = [{ name: 'Asha' }]
const sorted = users.toSorted((a, b) => a.name.localeCompare(b.name))

sorted[0].name = 'Asha updated'

users[0].name
// 'Asha updated'
```

The array is new, but the object inside is shared.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/methods/instance/sort/sort.js
```

The runnable file contains focused examples with terminal labels and expected
output comments.

## References

- MDN:
  [`Array.prototype.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- MDN:
  [`Array.prototype.toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted)
- ECMAScript spec:
  [`Array.prototype.sort`](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort)
