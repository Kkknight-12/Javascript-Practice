# Part 11: Reflect

## 38. What Is Reflect?

`Reflect` is a built-in JavaScript object containing methods for performing fundamental object operations.

Examples:

```javascript
Reflect.get();
Reflect.set();
Reflect.has();
Reflect.deleteProperty();
Reflect.ownKeys();
Reflect.apply();
Reflect.construct();
```

`Reflect` is not a constructor.

This is invalid:

```javascript
new Reflect();
```

Use its methods directly:

```javascript
Reflect.get(object, property);
```

---

## 39. Reflect and Internal Methods

Reflect methods provide function-style access to operations related to JavaScript's internal object methods.

| Normal operation | Reflect method | Related internal method |
|---|---|---|
| `object[property]` | `Reflect.get()` | `[[Get]]` |
| `object[property] = value` | `Reflect.set()` | `[[Set]]` |
| `property in object` | `Reflect.has()` | `[[HasProperty]]` |
| `delete object[property]` | `Reflect.deleteProperty()` | `[[Delete]]` |
| `new Constructor(...args)` | `Reflect.construct()` | `[[Construct]]` |

Example:

```javascript
const user = {};

Reflect.set(user, "name", "John");

console.log(user.name);
// John

console.log(Reflect.get(user, "name"));
// John
```

---

## 40. Reflect Converts Operators into Function Calls

Some JavaScript operations normally use special syntax:

```javascript
delete user.name;
new User("John");
```

Reflect provides function forms:

```javascript
Reflect.deleteProperty(user, "name");

Reflect.construct(User, ["John"]);
```

This can make operations easier to forward, compose, or call dynamically.

---
