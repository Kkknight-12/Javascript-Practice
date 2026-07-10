# Part 10: Wrapping Functions

## 33. Functions Are Objects

Functions can be used as proxy targets because functions are objects in JavaScript.

```javascript
function greet(name) {
  console.log(`Hello, ${name}`);
}

const proxy = new Proxy(greet, {});
```

The proxy can intercept:

- function calls using `apply`,
- constructor calls using `construct`,
- normal property reads using `get`,
- normal property writes using `set`.

---

## 34. The `apply` Trap

The `apply` trap intercepts normal function calls.

```javascript
proxy();
proxy(1, 2);
proxy.call(context);
proxy.apply(context, argumentsList);
```

---

## 35. `apply` Syntax

```javascript
const proxy = new Proxy(targetFunction, {
  apply(target, thisArg, argumentsList) {
    // Return the function-call result
  }
});
```

### Parameters

#### `target`

The original function.

#### `thisArg`

The value that should be used as `this`.

#### `argumentsList`

An array containing the function arguments.

---

## 36. Function-Based Delay Wrapper

A traditional delay wrapper may look like this:

```javascript
function delay(fn, milliseconds) {
  return function (...args) {
    setTimeout(() => {
      fn.apply(this, args);
    }, milliseconds);
  };
}
```

Usage:

```javascript
function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

sayHi("John");
```

This works, but the wrapper function does not automatically preserve every property of the original function.

For example:

```javascript
function sayHi(user) {}

console.log(sayHi.length);
// 1
```

After wrapping:

```javascript
sayHi = delay(sayHi, 3000);

console.log(sayHi.length);
// 0
```

The wrapper itself has a different function signature.

---

## 37. Proxy-Based Delay Wrapper

```javascript
function delay(fn, milliseconds) {
  return new Proxy(fn, {
    apply(target, thisArg, argumentsList) {
      setTimeout(() => {
        Reflect.apply(
          target,
          thisArg,
          argumentsList
        );
      }, milliseconds);
    }
  });
}
```

Usage:

```javascript
function sayHi(user) {
  console.log(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

console.log(sayHi.length);
// 1

sayHi("John");
```

The proxy intercepts function calls, while normal property reads such as:

```javascript
sayHi.length
```

are forwarded to the original function.

This makes the proxy a richer wrapper than a plain replacement function.

---
