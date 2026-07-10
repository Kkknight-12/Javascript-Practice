# Part 18: Best Practices

## 64. Use Reflect for Normal Forwarding

Prefer:

```javascript
get(target, property, receiver) {
  return Reflect.get(
    target,
    property,
    receiver
  );
}
```

Instead of:

```javascript
get(target, property) {
  return target[property];
}
```

Prefer:

```javascript
set(target, property, value, receiver) {
  return Reflect.set(
    target,
    property,
    value,
    receiver
  );
}
```

Instead of:

```javascript
set(target, property, value) {
  target[property] = value;
  return true;
}
```

Reflect helps preserve:

- receivers,
- getters,
- setters,
- inheritance,
- return-value semantics.

---

## 65. Return Correct Values from Traps

Traps such as these must return booleans:

```javascript
set();
deleteProperty();
defineProperty();
preventExtensions();
setPrototypeOf();
```

Use their matching Reflect methods when possible.

Example:

```javascript
deleteProperty(target, property) {
  return Reflect.deleteProperty(
    target,
    property
  );
}
```

---

## 66. Do Not Bypass the Proxy Accidentally

After proxying an object, avoid mixing direct target access and proxy access.

```javascript
const target = {
  score: 0
};

const proxy = new Proxy(target, handler);
```

This uses the proxy:

```javascript
proxy.score = 10;
```

This bypasses the proxy:

```javascript
target.score = 10;
```

Keep the target private when proxy behavior must always apply.

---

## 67. Be Careful When Binding Methods

This pattern can fix some built-in and private-field issues:

```javascript
return typeof value === "function"
  ? value.bind(target)
  : value;
```

But it also changes:

```text
this = proxy
```

into:

```text
this = target
```

As a result, operations inside the method may bypass proxy traps.

---

## 68. Respect Proxy Invariants

Do not report impossible information.

Examples of risky behavior:

- hiding non-configurable properties,
- returning duplicate keys,
- reporting extra keys for a non-extensible target,
- returning incompatible property descriptors,
- reporting an incorrect prototype for a non-extensible target.

JavaScript may throw a `TypeError` when an invariant is violated.

---

## 69. Consider Performance

Proxy operations add overhead.

For most ordinary application code, this may not matter.

It can matter when proxies are used:

- in large loops,
- on frequently accessed objects,
- inside rendering hot paths,
- in performance-sensitive libraries.

Measure performance before using proxies in bottleneck code.

---

## 70. Prefer Native Language Features When They Fit

A proxy is powerful, but it is not always the simplest solution.

Use:

- private class fields for enforced class privacy,
- normal getters and setters for simple computed properties,
- validation functions for one-time validation,
- plain wrapper functions for simple function decoration.

Use a proxy when you need operation-level interception across many properties or behaviors.

---
