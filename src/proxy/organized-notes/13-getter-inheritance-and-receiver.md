# Part 13: Getter Inheritance and `receiver`

## 44. The Problem

Consider this object:

```javascript
const user = {
  _name: "Guest",

  get name() {
    return this._name;
  }
};
```

Create a proxy:

```javascript
const userProxy = new Proxy(user, {
  get(target, property, receiver) {
    return target[property];
  }
});
```

Now create an object that inherits from the proxy:

```javascript
const admin = {
  __proto__: userProxy,
  _name: "Admin"
};
```

Read the inherited getter:

```javascript
console.log(admin.name);
// Guest
```

The expected result is:

```text
Admin
```

---

## 45. Why `target[property]` Produces the Wrong Result

The lookup starts with:

```javascript
admin.name
```

`admin` does not have its own `name` property.

JavaScript searches its prototype:

```javascript
userProxy
```

The proxy's `get` trap runs:

```javascript
get(target, property, receiver) {
  return target[property];
}
```

Here:

```text
target   = user
property = "name"
receiver = admin
```

But this line:

```javascript
target[property]
```

reads:

```javascript
user.name
```

The getter therefore runs with:

```text
this = user
```

Inside the getter:

```javascript
return this._name;
```

becomes:

```javascript
return user._name;
```

So the result is:

```text
Guest
```

---

## 46. Correct Version with `Reflect.get`

```javascript
const user = {
  _name: "Guest",

  get name() {
    return this._name;
  }
};

const userProxy = new Proxy(user, {
  get(target, property, receiver) {
    return Reflect.get(
      target,
      property,
      receiver
    );
  }
});

const admin = {
  __proto__: userProxy,
  _name: "Admin"
};

console.log(admin.name);
// Admin
```

`Reflect.get()` uses the supplied receiver when evaluating the getter.

Here:

```text
receiver = admin
```

Therefore, inside the getter:

```text
this = admin
```

So:

```javascript
this._name
```

reads:

```javascript
admin._name
```

and returns:

```text
Admin
```

---

## 47. Key Idea About `receiver`

```text
target
```

The object where the property was found.

```text
receiver
```

The object through which the property was requested.

These may be different during inheritance.

```javascript
admin.name
```

In this example:

```text
target   = user
receiver = admin
```

Using `receiver` preserves correct getter and setter behavior.

---

## 48. Short Forwarding Pattern

Because Reflect methods often accept the same arguments as traps, this can work:

```javascript
const proxy = new Proxy(target, {
  get() {
    return Reflect.get(...arguments);
  },

  set() {
    return Reflect.set(...arguments);
  }
});
```

A modern rest-parameter version:

```javascript
const proxy = new Proxy(target, {
  get(...args) {
    return Reflect.get(...args);
  },

  set(...args) {
    return Reflect.set(...args);
  }
});
```

Use explicit parameters when the trap contains extra custom logic.

---
