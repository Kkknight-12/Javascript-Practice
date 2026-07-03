# Doubts: Object.prototype.valueOf()

## Doubt 1: How Does The `score` Object Become `42`?

Code:

```js
const score = {
  points: 42,

  valueOf() {
    return this.points;
  },
};

console.log(score.valueOf()); // 42
console.log(score + 8); // 50
console.log(+score); // 42
```

`score` is an object with one data property and one method:

```js
points: 42
```

```js
valueOf() {
  return this.points;
}
```

The custom `valueOf()` method tells JavaScript:

```text
When this object needs to behave like a primitive value, use its points value.
```

For this object, that primitive value is `42`.

### 1. Direct Method Call

```js
console.log(score.valueOf()); // 42
```

Here we are calling the method ourselves.

Inside `valueOf()`:

```js
return this.points;
```

`this` refers to the object before the method call. In this call, that object is
`score`.

So:

```js
this.points
```

means:

```js
score.points
```

That value is `42`.

### 2. `score + 8`

```js
console.log(score + 8); // 50
```

This is the important conversion example.

`score` is an object, but `+` needs primitive values to perform the operation.
So JavaScript tries to convert `score` into a primitive value.

Because `score` has a custom `valueOf()` method, JavaScript can call it during
object-to-primitive conversion.

The conversion works like this:

```text
score + 8
score.valueOf() + 8
42 + 8
50
```

So `score + 8` prints `50`.

### 3. Unary Plus

```js
console.log(+score); // 42
```

This is not addition. This is unary plus.

Unary plus means:

```text
Convert this value into a number.
```

For example:

```js
+'10'; // 10
+true; // 1
+false; // 0
```

When JavaScript sees:

```js
+score;
```

it needs a number. So it tries to convert `score` into a primitive number.

Again, `score.valueOf()` returns `42`.

So the mental flow is:

```text
+score
+score.valueOf()
+42
42
```

### Important Point

`valueOf()` does not change the object.

The object is still:

```js
{
  points: 42,
  valueOf() {
    return this.points;
  },
}
```

Only during numeric/default conversion, JavaScript uses `score.valueOf()` to get
the primitive value `42`.

That is why these also work:

```js
console.log(Number(score)); // 42
console.log(score > 40); // true
console.log(score < 50); // true
```

The object is still an object, but in these operations it behaves like `42`.
