# `for...of`

## What Problem Does It Solve?

`for...of` gives you a clean way to read values from iterable data.

Examples:

- array values
- string characters
- `Map` entries
- `Set` values
- generator values
- custom iterable values

## Quick Definition

`for...of` loops over values from an iterable object.

```javascript
for (const value of iterable) {
  console.log(value)
}
```

## Mental Model

```text
iterable -> Symbol.iterator() -> iterator -> next() -> value
```

In simple words:

`for...of` asks the iterable for the next value again and again until the
iterator says it is done.

## Syntax

```javascript
for (variable of iterable) {
  statement
}
```

## Iterable

An iterable is a value that has a `Symbol.iterator` method.

Common iterable values:

- arrays
- strings
- maps
- sets
- typed arrays
- arguments objects
- generators
- custom objects that implement `Symbol.iterator`

Plain objects are not iterable by default.

## Array Example

```javascript
const learners = ['Aman', 'Chaman', 'Baga']

for (const learner of learners) {
  console.log(learner)
}
```

Explanation:

The loop gives you one array value at a time. You do not need to manage an
index manually.

## String Example

```javascript
for (const character of 'JS') {
  console.log(character)
}
```

Output:

```text
J
S
```

Explanation:

Strings are iterable, so `for...of` can read characters from a string.

## Map Example

```javascript
const scores = new Map([
  ['Aman', 10],
  ['Chaman', 20],
])

for (const [name, score] of scores) {
  console.log(name, score)
}
```

Explanation:

A `Map` gives `[key, value]` pairs. Destructuring lets you read the key and
value separately.

## Set Example

```javascript
const topics = new Set(['array', 'array', 'object'])

for (const topic of topics) {
  console.log(topic)
}
```

Output:

```text
array
object
```

Explanation:

A `Set` stores unique values. `for...of` reads each unique value.

## Plain Object Gotcha

Plain objects are not iterable by default.

```javascript
const user = {
  name: 'Aman',
  role: 'admin',
}

for (const value of user) {
  console.log(value)
}
```

This throws a `TypeError`.

Use `Object.entries()` when you want key-value pairs:

```javascript
for (const [key, value] of Object.entries(user)) {
  console.log(key, value)
}
```

## Custom Iterable

You can make an object work with `for...of` by adding `Symbol.iterator`.

```javascript
const countdown = {
  from: 3,
  [Symbol.iterator]() {
    let current = this.from

    return {
      next() {
        if (current > 0) {
          return { value: current--, done: false }
        }

        return { value: undefined, done: true }
      },
    }
  },
}

for (const number of countdown) {
  console.log(number)
}
```

Output:

```text
3
2
1
```

## Cleanup On `break`

If a `for...of` loop exits early, JavaScript calls the iterator `return()`
method when it exists.

```javascript
const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 1, done: false }
      },
      return() {
        console.log('cleanup')
        return { done: true }
      },
    }
  },
}

for (const value of iterable) {
  break
}
```

Explanation:

This cleanup path is useful for iterators that need to close a resource or stop
work early.

## Important Notes

1. `for...of` reads values, not property names.
2. It works only with iterable values.
3. Arrays, strings, maps, sets, and generators are iterable.
4. Plain objects are not iterable by default.
5. Use `Object.entries(object)` if you want object key-value pairs.
6. Use `for...in` for enumerable property names, not array-style values.
7. A `break` can trigger iterator cleanup through `return()`.

## When To Use It

### You Need Values

```javascript
for (const value of values) {
  console.log(value)
}
```

### You Need Map Key-Value Pairs

```javascript
for (const [key, value] of map) {
  console.log(key, value)
}
```

### You Need `break` Or `continue`

```javascript
for (const value of values) {
  if (value === 'skip') continue
  if (value === 'stop') break
}
```

## Common Mistakes

### Mistake 1: Using `for...of` On A Plain Object

```javascript
for (const value of { name: 'Aman' }) {
  console.log(value)
}
```

Plain objects are not iterable by default. Use `Object.keys()`,
`Object.values()`, or `Object.entries()`.

### Mistake 2: Thinking `for...of` Gives Indexes

```javascript
for (const value of ['a', 'b']) {
  console.log(value)
}
```

This gives values: `'a'`, then `'b'`.

Use `entries()` when you need index and value:

```javascript
for (const [index, value] of ['a', 'b'].entries()) {
  console.log(index, value)
}
```

### Mistake 3: Confusing `for...of` And `for...in`

`for...of` reads iterable values.

`for...in` reads enumerable property names.

## Runnable Practice File

Run this file from the repo root:

```bash
node src/array/loop/for-of/for-of.js
```

The runnable file includes comments, terminal labels, and expected output near
the examples.

## MDN References

- [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator)
- [Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
