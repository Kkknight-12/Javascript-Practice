# Part 1: Proxy Fundamentals

## 1. Introduction

A `Proxy` object wraps another object and allows you to intercept operations performed on that object.

These operations can include:

- reading a property,
- writing a property,
- deleting a property,
- checking whether a property exists,
- listing object keys,
- calling a function,
- calling a constructor with `new`,
- reading or changing a prototype.

A proxy may:

1. handle the operation itself,
2. modify the operation,
3. block the operation,
4. or forward the operation to the original object.

Proxies are commonly used in:

- validation systems,
- reactive frameworks,
- access-control systems,
- logging and debugging tools,
- API wrappers,
- virtual properties,
- function decorators.

---

## 2. Proxy Syntax

```javascript
const proxy = new Proxy(target, handler);
```

### `target`

The original object or function that the proxy wraps.

The target can be:

- a normal object,
- an array,
- a function,
- a class,
- or another proxy.

### `handler`

An object containing special methods called **traps**.

A trap intercepts a particular operation.

For example:

```javascript
const user = {
  name: "John"
};

const proxy = new Proxy(user, {
  get(target, property) {
    console.log(`Reading ${String(property)}`);
    return target[property];
  }
});

console.log(proxy.name);
```

Output:

```text
Reading name
John
```

The `get` trap intercepted the property-read operation.

---

## 3. Mental Model

Think of a proxy as a layer placed in front of another object.

```text
Your code
   ↓
Proxy
   ↓
Target object
```

When an operation is performed on the proxy:

1. JavaScript checks whether the handler has a corresponding trap.
2. If the trap exists, JavaScript runs it.
3. If the trap does not exist, JavaScript forwards the operation to the target.

```text
Operation
   ↓
Does a matching trap exist?
   ↓
Yes → Run the trap
No  → Forward to the target
```

---

## 4. Proxy Without Traps

A proxy with an empty handler behaves like a transparent wrapper.

```javascript
const target = {};
const proxy = new Proxy(target, {});

proxy.test = 5;

console.log(target.test);
// 5

console.log(proxy.test);
// 5

for (const key in proxy) {
  console.log(key);
}
// test
```

Because the handler is empty:

- writing to the proxy writes to the target,
- reading from the proxy reads from the target,
- iteration over the proxy uses the target's properties.

Conceptually:

```javascript
proxy.test = 5;
```

is forwarded to:

```javascript
target.test = 5;
```

Important:

```javascript
proxy === target;
// false
```

The proxy and target are still two different objects.

---

## 5. Use the Proxy Instead of the Target

After an object is wrapped, application code should normally interact with the proxy.

```javascript
let dictionary = {
  Hello: "Hola"
};

dictionary = new Proxy(dictionary, {
  get(target, property) {
    return property in target
      ? target[property]
      : property;
  }
});
```

This replaces the original variable with the proxy.

That is useful because direct access to the target would bypass the traps.

For example:

```javascript
const target = {
  name: "John"
};

const proxy = new Proxy(target, {
  set(target, property, value) {
    console.log("Property changed");
    target[property] = value;
    return true;
  }
});

proxy.name = "Pete";
// Property changed

target.name = "Alex";
// No trap runs
```

The second assignment bypasses the proxy.

---
