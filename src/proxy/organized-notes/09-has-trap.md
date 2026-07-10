# Part 9: The `has` Trap

## 30. Purpose of `has`

The `has` trap intercepts the `in` operator.

```javascript
property in proxy;
```

---

## 31. `has` Syntax

```javascript
const proxy = new Proxy(target, {
  has(target, property) {
    return trueOrFalse;
  }
});
```

### Parameters

#### `target`

The original wrapped object.

#### `property`

The value used on the left side of the `in` operator.

---

## 32. Example: Range Object

```javascript
const range = new Proxy(
  {
    start: 1,
    end: 10
  },
  {
    has(target, value) {
      return (
        value >= target.start &&
        value <= target.end
      );
    }
  }
);
```

Usage:

```javascript
console.log(5 in range);
// true

console.log(50 in range);
// false
```

Normally, `in` checks whether a property exists.

For this proxy, the trap changes the behavior so that `in` checks whether a number lies inside the range.

---
