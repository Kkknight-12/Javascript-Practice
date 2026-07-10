# Part 17: Revocable Proxies

## 59. What Is a Revocable Proxy?

A revocable proxy can be permanently disabled.

This is useful when access to an object should expire.

Examples:

- temporary permissions,
- plugin access,
- resource cleanup,
- session-based access,
- capability systems.

---

## 60. Syntax

```javascript
const {
  proxy,
  revoke
} = Proxy.revocable(target, handler);
```

The method returns an object containing:

### `proxy`

The proxy object.

### `revoke`

A function that disables the proxy.

---

## 61. Example

```javascript
const object = {
  data: "Valuable data"
};

const {
  proxy,
  revoke
} = Proxy.revocable(object, {});
```

Before revocation:

```javascript
console.log(proxy.data);
// Valuable data
```

Disable the proxy:

```javascript
revoke();
```

After revocation:

```javascript
console.log(proxy.data);
// TypeError
```

Once revoked, operations through the proxy fail.

The proxy cannot be reactivated.

---

## 62. What Revocation Does

Calling:

```javascript
revoke();
```

disconnects the proxy from its target.

After that, operations such as these fail:

```javascript
proxy.name;
proxy.name = "John";
delete proxy.name;
Object.keys(proxy);
```

The target object may still exist elsewhere, but the revoked proxy can no longer access it.

---

## 63. Associating Proxies with Their Revoke Functions

A `WeakMap` can associate each proxy with its revocation function.

```javascript
const revocations = new WeakMap();

const object = {
  data: "Valuable data"
};

const {
  proxy,
  revoke
} = Proxy.revocable(object, {});

revocations.set(proxy, revoke);
```

Later:

```javascript
const revokeProxy = revocations.get(proxy);

revokeProxy();
```

A `WeakMap` is useful because it does not prevent the proxy from being garbage-collected when no other references remain.

---
