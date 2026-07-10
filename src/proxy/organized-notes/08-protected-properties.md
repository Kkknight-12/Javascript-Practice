# Part 8: Protected Properties

## 25. Underscore Properties

A common convention is to prefix internal properties with `_`.

```javascript
const user = {
  name: "John",
  _password: "secret"
};
```

However, the underscore does not create real privacy.

This is still allowed:

```javascript
console.log(user._password);
// secret
```

A proxy can enforce access restrictions.

---

## 26. Protecting Reads, Writes, Deletions, and Enumeration

To protect underscore-prefixed properties completely, we may need several traps:

- `get`,
- `set`,
- `deleteProperty`,
- `ownKeys`.

```javascript
const user = new Proxy(
  {
    name: "John",
    _password: "***"
  },
  {
    get(target, property, receiver) {
      if (
        typeof property === "string" &&
        property.startsWith("_")
      ) {
        throw new Error("Access denied");
      }

      return Reflect.get(
        target,
        property,
        receiver
      );
    },

    set(target, property, value, receiver) {
      if (
        typeof property === "string" &&
        property.startsWith("_")
      ) {
        throw new Error("Access denied");
      }

      return Reflect.set(
        target,
        property,
        value,
        receiver
      );
    },

    deleteProperty(target, property) {
      if (
        typeof property === "string" &&
        property.startsWith("_")
      ) {
        throw new Error("Access denied");
      }

      return Reflect.deleteProperty(
        target,
        property
      );
    },

    ownKeys(target) {
      return Reflect.ownKeys(target).filter((property) => {
        return !(
          typeof property === "string" &&
          property.startsWith("_")
        );
      });
    }
  }
);
```

Usage:

```javascript
console.log(user.name);
// John

user.name = "Pete";
// Works

delete user.name;
// Works
```

Protected operations:

```javascript
console.log(user._password);
// Error: Access denied

user._password = "new";
// Error: Access denied

delete user._password;
// Error: Access denied

console.log(Object.keys(user));
// Does not include _password
```

---

## 27. Method Access to Protected Properties

Suppose the object has a method that must access `_password`.

```javascript
const user = {
  _password: "secret",

  checkPassword(value) {
    return value === this._password;
  }
};
```

If `this` is the proxy, this line:

```javascript
this._password
```

triggers the `get` trap and may throw an error.

One possible workaround is to bind methods to the target.

```javascript
const user = new Proxy(
  {
    _password: "secret",

    checkPassword(value) {
      return value === this._password;
    }
  },
  {
    get(target, property, receiver) {
      if (
        typeof property === "string" &&
        property.startsWith("_")
      ) {
        throw new Error("Access denied");
      }

      const value = Reflect.get(
        target,
        property,
        receiver
      );

      return typeof value === "function"
        ? value.bind(target)
        : value;
    }
  }
);
```

Now:

```javascript
console.log(user.checkPassword("secret"));
// true
```

The method runs with:

```text
this = target
```

Therefore, its internal access to `_password` bypasses the proxy.

---

## 28. Drawback of Binding Methods to the Target

The binding solution is not perfect.

When a method receives the original target as `this`:

- property operations inside the method bypass proxy traps,
- the method may expose or pass the unproxied target elsewhere,
- multiple layers of proxies may behave unexpectedly.

Therefore, method binding should be used carefully.

---

## 29. Native Private Fields

Modern JavaScript supports private class fields:

```javascript
class User {
  #password = "secret";
}
```

A private field:

- is enforced by JavaScript,
- cannot be accessed outside the class,
- does not require underscore conventions.

However, private fields have their own proxy limitations, discussed later.

---
