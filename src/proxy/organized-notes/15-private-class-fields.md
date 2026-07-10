# Part 15: Private Class Fields

## 54. Proxying an Instance with Private Fields

```javascript
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

console.log(user.getName());
// TypeError
```

Private fields use special internal mechanisms.

When `getName()` runs through the proxy:

```text
this = proxy
```

But the private field belongs to the original `User` instance, not the proxy.

The proxy does not possess the private-field internal state.

---

## 55. Binding Methods as a Workaround

```javascript
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

const target = new User();

const user = new Proxy(target, {
  get(target, property, receiver) {
    const value = Reflect.get(
      target,
      property,
      receiver
    );

    return typeof value === "function"
      ? value.bind(target)
      : value;
  }
});
```

Usage:

```javascript
console.log(user.getName());
// Guest
```

The method now runs with:

```text
this = target
```

Therefore, it can access `#name`.

Again, this binding may bypass other proxy behavior.

---
