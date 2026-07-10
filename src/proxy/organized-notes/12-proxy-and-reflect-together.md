# Part 12: Proxy and Reflect Together

## 41. Matching Trap and Reflect Names

For many Proxy traps, Reflect provides a method with:

- the same name,
- and compatible arguments.

Examples:

```text
get trap               ↔ Reflect.get()
set trap               ↔ Reflect.set()
has trap               ↔ Reflect.has()
deleteProperty trap    ↔ Reflect.deleteProperty()
ownKeys trap           ↔ Reflect.ownKeys()
apply trap             ↔ Reflect.apply()
construct trap         ↔ Reflect.construct()
```

This makes Reflect useful for forwarding intercepted operations to the target.

---

## 42. Logging Reads and Writes

```javascript
const user = new Proxy(
  {
    name: "John"
  },
  {
    get(target, property, receiver) {
      console.log(`GET ${String(property)}`);

      return Reflect.get(
        target,
        property,
        receiver
      );
    },

    set(target, property, value, receiver) {
      console.log(
        `SET ${String(property)} = ${value}`
      );

      return Reflect.set(
        target,
        property,
        value,
        receiver
      );
    }
  }
);
```

Usage:

```javascript
const name = user.name;
// GET name

user.name = "Pete";
// SET name = Pete
```

The trap adds logging and then forwards the normal operation using Reflect.

---

## 43. Why Reflect Is Better Than Direct Target Access

A simple read might be written as:

```javascript
return target[property];
```

But the safer forwarding form is:

```javascript
return Reflect.get(
  target,
  property,
  receiver
);
```

A simple write might be written as:

```javascript
target[property] = value;
return true;
```

But the safer forwarding form is:

```javascript
return Reflect.set(
  target,
  property,
  value,
  receiver
);
```

Reflect preserves more of JavaScript's normal semantics, especially for:

- getters,
- setters,
- inheritance,
- receivers,
- boolean success results.

---
