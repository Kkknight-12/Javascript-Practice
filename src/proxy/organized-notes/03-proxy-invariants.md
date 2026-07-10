# Part 3: Proxy Invariants

## 8. What Are Invariants?

Proxy traps cannot return completely arbitrary results.

JavaScript enforces rules called **invariants**.

An invariant is a condition that must remain true so the language behaves consistently.

Examples:

- `set()` must indicate whether a write succeeded.
- `deleteProperty()` must indicate whether a deletion succeeded.
- `ownKeys()` cannot return duplicate keys.
- `ownKeys()` cannot hide certain non-configurable properties.
- a proxy cannot report impossible property descriptors.
- some prototype operations must remain consistent with the target.

---

## 9. Boolean Results from Traps

Some traps must return a boolean.

### `set()`

```javascript
set(target, property, value) {
  target[property] = value;
  return true;
}
```

`true` means the write succeeded.

`false` means the write failed.

### `deleteProperty()`

```javascript
deleteProperty(target, property) {
  delete target[property];
  return true;
}
```

`true` means the deletion succeeded.

`false` means it failed.

In strict mode, returning `false` from these traps can cause a `TypeError`.

---

## 10. Example of an Invariant Violation

```javascript
const target = {};

Object.defineProperty(target, "id", {
  value: 1,
  configurable: false
});

const proxy = new Proxy(target, {
  ownKeys() {
    return [];
  }
});

Reflect.ownKeys(proxy);
// TypeError
```

The proxy tries to hide the non-configurable `id` property.

JavaScript rejects this because the proxy must respect the target's non-configurable properties.

---
