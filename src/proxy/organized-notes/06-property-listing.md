# Part 6: Property Listing

## 19. The `ownKeys` Trap

The `ownKeys` trap controls the list of an object's own property keys.

```javascript
const proxy = new Proxy(target, {
  ownKeys(target) {
    return [];
  }
});
```

It can affect:

```javascript
Object.keys(object);
Object.values(object);
Object.entries(object);
Object.getOwnPropertyNames(object);
Object.getOwnPropertySymbols(object);
Reflect.ownKeys(object);
```

It also participates in `for...in` behavior.

---

## 20. Differences Between Key-Listing Operations

### `Object.getOwnPropertyNames()`

Returns own string keys, including non-enumerable keys.

### `Object.getOwnPropertySymbols()`

Returns own symbol keys.

### `Object.keys()`

Returns own enumerable string keys.

### `Object.values()`

Returns values of own enumerable string-keyed properties.

### `Object.entries()`

Returns `[key, value]` pairs for own enumerable string-keyed properties.

### `for...in`

Iterates enumerable string keys from:

- the object itself,
- and its prototype chain.

### `Reflect.ownKeys()`

Returns all own keys:

- string keys,
- symbol keys,
- enumerable keys,
- non-enumerable keys.

All of these operations begin by obtaining some form of property-key list.

---

## 21. Example: Hide Underscore Properties

```javascript
const user = new Proxy(
  {
    name: "John",
    age: 30,
    _password: "***"
  },
  {
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
console.log(Object.keys(user));
// ["name", "age"]

console.log(Object.values(user));
// ["John", 30]

for (const key in user) {
  console.log(key);
}
// name
// age
```

The `_password` key is filtered out from listing operations.

---
