# Part 4: The `get` Trap

## 11. Purpose of `get`

The `get` trap intercepts property reads.

```javascript
proxy.name;
proxy[0];
proxy.method;
```

All of these can trigger `get`.

---

## 12. `get` Syntax

```javascript
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    // Return the value that should be received
  }
});
```

### Parameters

#### `target`

The original wrapped object.

#### `property`

The property key being accessed.

It may be:

- a string,
- or a symbol.

#### `receiver`

The object through which the property was accessed.

Usually this is the proxy itself, but it may be another object that inherits from the proxy.

The `receiver` becomes especially important when getters and inheritance are involved.

---

## 13. Example: Default Array Values

Normally, a missing array index returns `undefined`.

```javascript
const numbers = [0, 1, 2];

console.log(numbers[100]);
// undefined
```

A proxy can return a default value instead.

```javascript
const numbers = new Proxy([0, 1, 2], {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    }

    return 0;
  }
});

console.log(numbers[1]);
// 1

console.log(numbers[100]);
// 0
```

The proxy changes the behavior of missing values.

The original array still stores only:

```javascript
[0, 1, 2]
```

The value `0` for missing indexes is virtual behavior created by the proxy.

---

## 14. Example: Translation Fallback

Consider a dictionary:

```javascript
const dictionary = {
  Hello: "Hola",
  Bye: "Adiós"
};

console.log(dictionary.Hello);
// Hola

console.log(dictionary.Welcome);
// undefined
```

Instead of returning `undefined`, we can return the untranslated phrase.

```javascript
const dictionary = new Proxy(
  {
    Hello: "Hola",
    Bye: "Adiós"
  },
  {
    get(target, phrase, receiver) {
      if (phrase in target) {
        return Reflect.get(target, phrase, receiver);
      }

      return phrase;
    }
  }
);

console.log(dictionary.Hello);
// Hola

console.log(dictionary.Welcome);
// Welcome

console.log(dictionary["Welcome to Proxy"]);
// Welcome to Proxy
```

This provides a graceful fallback.

---
