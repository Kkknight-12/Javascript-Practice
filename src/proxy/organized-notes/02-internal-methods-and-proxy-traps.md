# Part 2: Internal Methods and Proxy Traps

## 6. JavaScript Internal Methods

JavaScript objects are described in the specification using internal methods.

Examples include:

```text
[[Get]]
[[Set]]
[[Delete]]
[[HasProperty]]
[[OwnPropertyKeys]]
```

These names describe low-level object behavior.

For example:

```text
[[Get]]  → read a property
[[Set]]  → write a property
```

These internal methods cannot normally be called directly by name.

Proxy traps intercept operations associated with these internal methods.

---

## 7. Proxy Trap Reference

| Internal method | Proxy trap | Triggered by |
|---|---|---|
| `[[Get]]` | `get` | Reading a property |
| `[[Set]]` | `set` | Writing a property |
| `[[HasProperty]]` | `has` | The `in` operator |
| `[[Delete]]` | `deleteProperty` | The `delete` operator |
| `[[Call]]` | `apply` | Calling a function |
| `[[Construct]]` | `construct` | Calling with `new` |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | `Object.getPrototypeOf()` |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | `Object.setPrototypeOf()` |
| `[[IsExtensible]]` | `isExtensible` | `Object.isExtensible()` |
| `[[PreventExtensions]]` | `preventExtensions` | `Object.preventExtensions()` |
| `[[DefineOwnProperty]]` | `defineProperty` | `Object.defineProperty()` |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | Descriptor and enumeration operations |
| `[[OwnPropertyKeys]]` | `ownKeys` | Key-listing operations |

Some operations use more than one internal method.

For example, `Object.keys()` may use:

1. `ownKeys()` to obtain a list of own keys,
2. `getOwnPropertyDescriptor()` to check whether each key is enumerable.

---
