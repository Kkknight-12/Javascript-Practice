# Part 7: `ownKeys` and Property Descriptors

## 22. Why Returning Keys May Not Be Enough

Consider this proxy:

```javascript
const proxy = new Proxy(
  {},
  {
    ownKeys() {
      return ["a", "b", "c"];
    }
  }
);

console.log(Object.keys(proxy));
// []
```

The `ownKeys` trap returned:

```javascript
["a", "b", "c"]
```

But `Object.keys()` still returned an empty array.

Why?

Because `Object.keys()` only returns enumerable properties.

After obtaining the keys, JavaScript checks the property descriptor for each key.

Since `a`, `b`, and `c` do not really exist, there are no property descriptors showing that they are enumerable.

---

## 23. `getOwnPropertyDescriptor` Trap

The `getOwnPropertyDescriptor` trap intercepts operations that request a property's descriptor.

```javascript
const proxy = new Proxy(target, {
  getOwnPropertyDescriptor(target, property) {
    // Return a descriptor or undefined
  }
});
```

A descriptor may contain flags such as:

```javascript
{
  enumerable: true,
  configurable: true,
  writable: true,
  value: 10
}
```

---

## 24. Creating Virtual Enumerable Keys

```javascript
const proxy = new Proxy(
  {},
  {
    ownKeys() {
      return ["a", "b", "c"];
    },

    getOwnPropertyDescriptor(target, property) {
      return {
        enumerable: true,
        configurable: true
      };
    }
  }
);

console.log(Object.keys(proxy));
// ["a", "b", "c"]
```

Now `Object.keys()` sees descriptors with:

```javascript
enumerable: true
```

Therefore, it includes the keys.

Important:

You only need this additional trap when the reported properties do not already exist with suitable descriptors on the target.

---
