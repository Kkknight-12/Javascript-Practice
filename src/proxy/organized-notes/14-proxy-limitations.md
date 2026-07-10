# Part 14: Proxy Limitations

## 49. Built-In Objects and Internal Slots

Many built-in objects use hidden internal storage called **internal slots**.

Examples include:

- `Map`,
- `Set`,
- `WeakMap`,
- `WeakSet`,
- `Date`,
- `Promise`.

A `Map`, for example, stores its entries in an internal slot often described as:

```text
[[MapData]]
```

Built-in methods access these internal slots directly.

They do not access them through ordinary property reads such as `[[Get]]`.

Therefore, a proxy cannot intercept or recreate those slots automatically.

---

## 50. Proxying a Map

```javascript
const map = new Map();

const proxy = new Proxy(map, {});

proxy.set("test", 1);
// TypeError
```

Why?

When this method is called:

```javascript
proxy.set("test", 1);
```

the method receives:

```text
this = proxy
```

But the proxy does not contain the target Map's internal `[[MapData]]` slot.

`Map.prototype.set()` expects `this` to be a real Map object containing that slot.

---

## 51. Binding Built-In Methods to the Target

One workaround is to bind function properties to the original target.

```javascript
const map = new Map();

const proxy = new Proxy(map, {
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
proxy.set("test", 1);

console.log(proxy.get("test"));
// 1
```

Now the methods run with:

```text
this = target
```

Therefore, the Map methods can access the target's internal slots.

---

## 52. Drawback of Binding Built-In Methods

Binding methods to the target solves one problem but creates another.

Operations inside the method use the original target rather than the proxy.

This can bypass:

- logging traps,
- validation traps,
- access-control traps,
- other proxy layers.

Use this workaround carefully.

---

## 53. Arrays Usually Work Normally

Arrays are a notable practical exception.

Array indexes and `length` participate in normal object operations that proxies can intercept.

```javascript
const numbers = new Proxy([], {
  set(target, property, value, receiver) {
    console.log(`Setting ${String(property)}`);

    return Reflect.set(
      target,
      property,
      value,
      receiver
    );
  }
});

numbers.push(10);
```

Possible log:

```text
Setting 0
Setting length
```

This is why the earlier number-validation example works with `push()`.

---
