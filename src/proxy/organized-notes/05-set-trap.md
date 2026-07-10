# Part 5: The `set` Trap

## 15. Purpose of `set`

The `set` trap intercepts property assignments.

```javascript
proxy.name = "John";
proxy[0] = 10;
```

Array methods such as `push()` may also trigger `set`, because they internally assign array indexes and update `length`.

---

## 16. `set` Syntax

```javascript
const proxy = new Proxy(target, {
  set(target, property, value, receiver) {
    // Return true or false
  }
});
```

### Parameters

#### `target`

The original wrapped object.

#### `property`

The property being changed.

#### `value`

The new value.

#### `receiver`

The object through which the assignment occurred.

---

## 17. Example: Number-Only Array

```javascript
const numbers = new Proxy([], {
  set(target, property, value, receiver) {
    if (
      property !== "length" &&
      typeof value !== "number"
    ) {
      throw new TypeError("Only numbers are allowed");
    }

    return Reflect.set(
      target,
      property,
      value,
      receiver
    );
  }
});
```

Usage:

```javascript
numbers.push(1);
numbers.push(2);

console.log(numbers);
// [1, 2]

console.log(numbers.length);
// 2

numbers.push("test");
// TypeError: Only numbers are allowed
```

The built-in `push()` method still works.

Why?

Because `push()` eventually performs property assignments such as:

```javascript
numbers[0] = 1;
numbers.length = 1;
```

Those writes are intercepted by the `set` trap.

We do not need to replace every array method individually.

---

## 18. Do Not Forget to Return a Result

This is incorrect:

```javascript
const proxy = new Proxy({}, {
  set(target, property, value) {
    target[property] = value;
  }
});
```

The trap returns `undefined`, which is falsy.

A successful `set` trap should return `true`.

Better:

```javascript
const proxy = new Proxy({}, {
  set(target, property, value, receiver) {
    return Reflect.set(
      target,
      property,
      value,
      receiver
    );
  }
});
```

`Reflect.set()` performs the assignment and returns the appropriate boolean.

---
