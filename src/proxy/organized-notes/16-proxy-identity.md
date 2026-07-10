# Part 16: Proxy Identity

## 56. Proxy and Target Are Different Objects

```javascript
const target = {};
const proxy = new Proxy(target, {});

console.log(proxy === target);
// false
```

A proxy may behave like the target for many operations, but it has a different object identity.

---

## 57. Set Example

```javascript
const allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

console.log(allUsers.has(user));
// true

user = new Proxy(user, {});

console.log(allUsers.has(user));
// false
```

The `Set` contains the original object.

After reassignment, `user` refers to the proxy.

Because the proxy is a different object, the `Set` does not consider it the same value.

---

## 58. Strict Equality Cannot Be Intercepted

Proxies can intercept operations such as:

```javascript
property in proxy;
delete proxy.property;
proxy();
new proxy();
```

However, there is no trap for strict equality:

```javascript
proxy === target;
```

Object equality is based on identity.

An object is strictly equal only to the same object reference.

The proxy cannot make itself strictly equal to the target.

---
