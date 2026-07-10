# Part 19: Proxy vs Reflect

## 71. Proxy

A Proxy intercepts or customizes an operation.

```javascript
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    console.log("Property read");

    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});
```

---

## 72. Reflect

Reflect performs the underlying operation.

```javascript
Reflect.get(
  target,
  property,
  receiver
);
```

---

## 73. Relationship

```text
Proxy   → intercepts the operation
Reflect → performs or forwards the operation
Target  → stores the actual data or behavior
```

Typical pattern:

```javascript
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    // Custom behavior
    console.log(`GET ${String(property)}`);

    // Normal operation
    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});
```

---
