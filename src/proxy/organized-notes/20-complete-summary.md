# Part 20: Complete Summary

## 74. Proxy Summary

A Proxy wraps an object or function.

```javascript
const proxy = new Proxy(target, handler);
```

The handler contains traps.

Common traps include:

```javascript
get
set
has
deleteProperty
ownKeys
getOwnPropertyDescriptor
apply
construct
```

When an operation occurs:

```text
Matching trap exists?
   ↓
Yes → Run the trap
No  → Forward to the target
```

---

## 75. Reflect Summary

Reflect provides function-style methods for fundamental object operations.

```javascript
Reflect.get();
Reflect.set();
Reflect.has();
Reflect.deleteProperty();
Reflect.ownKeys();
Reflect.apply();
Reflect.construct();
```

Reflect is especially useful inside Proxy traps.

```javascript
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    return Reflect.get(
      target,
      property,
      receiver
    );
  },

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

---

## 76. Important Limitations

Remember:

```javascript
proxy !== target;
```

Proxies cannot intercept strict equality.

Some built-in objects rely on internal slots.

Private class fields may fail when methods receive the proxy as `this`.

Binding methods to the target can solve some problems, but may bypass proxy traps.

Proxy traps must respect JavaScript invariants.

---

## 77. Final Mental Model

```text
Proxy
  intercepts

Reflect
  forwards or performs

Target
  contains the original data and behavior
```

The most common pattern is:

```javascript
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    // Add custom behavior here

    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});
```

Use Proxy when you need to control how an object behaves.

Use Reflect when you want to perform the normal operation correctly after intercepting it.
