# Doubts: Array.prototype.every()

## Doubt 1: Why Do We Write `Boolean` Inside `every()`?

Question:

```javascript
const results = await Promise.all(items.map(asyncCheck))
const allPassed = results.every(Boolean)
```

Why do we write `Boolean` inside `every()`?

What will it do?

## Short Answer

`Boolean` is being used as the callback function for `every()`.

This:

```javascript
results.every(Boolean)
```

means the same thing as:

```javascript
results.every((result) => Boolean(result))
```

So it asks:

```text
Are all values inside results truthy?
```

## Why This Works

`every()` calls its callback for each value.

Normally we write:

```javascript
results.every((result) => {
  return Boolean(result)
})
```

But `Boolean` is already a function.

So we can pass it directly:

```javascript
results.every(Boolean)
```

`every()` will call it like this internally:

```javascript
Boolean(result)
```

`Boolean(result)` converts the value into `true` or `false`.

## Example With Only Booleans

```javascript
const results = [true, true, true]

results.every(Boolean)
// true
```

All values are already `true`, so the result is `true`.

Now compare:

```javascript
const results = [true, false, true]

results.every(Boolean)
// false
```

One value is `false`, so `every()` returns `false`.

## Example With Truthy And Falsy Values

`Boolean(value)` converts values using JavaScript truthy/falsy rules.

```javascript
Boolean(true)
// true

Boolean(false)
// false

Boolean(1)
// true

Boolean(0)
// false

Boolean('hello')
// true

Boolean('')
// false

Boolean(null)
// false

Boolean(undefined)
// false
```

So:

```javascript
const results = ['done', 1, true]

results.every(Boolean)
// true
```

All values are truthy.

But:

```javascript
const results = ['done', 0, true]

results.every(Boolean)
// false
```

`0` is falsy.

## How It Helps With Async Checks

This pattern is useful when each async check returns a truthy/falsy result.

```javascript
const results = await Promise.all(items.map(asyncCheck))
const allPassed = results.every(Boolean)
```

Read it like this:

```text
Run asyncCheck for every item.
Wait until all checks finish.
Store all returned values in results.
Check whether every result is truthy.
```

Example:

```javascript
const results = await Promise.all([
  Promise.resolve(true),
  Promise.resolve(true),
  Promise.resolve(false),
])

const allPassed = results.every(Boolean)

allPassed
// false
```

## Important Detail

`every()` passes three arguments to its callback:

```javascript
callback(value, index, array)
```

So this:

```javascript
results.every(Boolean)
```

technically calls:

```javascript
Boolean(value, index, array)
```

But `Boolean()` only uses the first argument and ignores the extra arguments.

That is why this shortcut is safe here.

## Strict Version

`every(Boolean)` checks truthiness.

If you only want actual `true` values to pass, write this:

```javascript
const allPassed = results.every((result) => result === true)
```

Difference:

```javascript
[1, true].every(Boolean)
// true

[1, true].every((result) => result === true)
// false
```

Why?

`1` is truthy, but `1` is not exactly `true`.

## Beginner-Friendly Version

For learning, this is clearer:

```javascript
const allPassed = results.every((result) => Boolean(result))
```

For real code, this shorter version is common:

```javascript
const allPassed = results.every(Boolean)
```

Both mean:

```text
Every result must be truthy.
```

## Doubt 2: Why Does `every()` Return `true` For An Empty Array?

Question:

```javascript
const cartItems = []

cartItems.every((item) => item.inStock)
// true
```

Why does this return `true`?

## Short Answer

`every()` returns `true` for an empty array because it did not find any failing
element.

The callback never runs.

So there is no item that can return `false`.

## How To Think About It

`every()` works like this:

```text
Assume everything passes.

Check each item one by one.

If any item fails:
  return false immediately.

If the loop finishes without finding a failure:
  return true.
```

For this array:

```javascript
const cartItems = []
```

there are zero items to check.

So `every()` finishes immediately and says:

```text
I did not find any failing item.
```

That is why the result is `true`.

## Callback Does Not Run

You can prove it with a counter:

```javascript
const cartItems = []
let callbackCount = 0

const result = cartItems.every((item) => {
  callbackCount += 1
  return item.inStock
})

result
// true

callbackCount
// 0
```

The callback count is `0`, so `item.inStock` was never checked.

## Why This Can Be Confusing

In real life, this sentence feels strange:

```text
Every item in the empty cart is in stock.
```

But JavaScript is not checking whether the cart has items.

It is only checking whether any existing item fails the test.

No existing item failed.

So `every()` returns `true`.

## Business Rule Fix

If your rule is:

```text
The cart must have at least one item, and every item must be in stock.
```

then write both checks:

```javascript
const isValidCart =
  cartItems.length > 0 && cartItems.every((item) => item.inStock)
```

For an empty cart:

```javascript
const cartItems = []

const isValidCart =
  cartItems.length > 0 && cartItems.every((item) => item.inStock)

isValidCart
// false
```

## Simple Rule

Use only `every()` when this question is enough:

```text
Do all existing items pass?
```

Use `length > 0 && every()` when this question matters:

```text
Is there at least one item, and do all items pass?
```
