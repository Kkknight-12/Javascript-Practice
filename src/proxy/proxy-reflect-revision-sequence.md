# Proxy And Reflect Revision Sequence

Use this file when revising the Proxy and Reflect section.

For a continuous topic-by-topic explanation, begin with the
[numbered Proxy and Reflect reading order](./organized-notes/00-reading-order.md).
Use the sequence below when studying the smaller runnable lessons and their
paired method pages.

The main idea is:

```text
Proxy intercepts an operation.
Reflect performs or forwards the normal operation.
```

Do not study Proxy only as one topic. Study it as a set of operations that
JavaScript can intercept.

Also do not jump straight from Proxy basics to `ownKeys()`. Learn `get`, `set`,
`receiver`, and the forwarding pattern first.

## How To Revise

For each topic:

1. Read the `.md` page.
2. Run the paired `.js` file when it exists.
3. Explain the operation in plain English.
4. Explain which `Reflect` method forwards the default behavior.
5. Move to the next topic only after the trap parameters feel clear.

When a folder only contains `.gitkeep`, the topic is planned but the lesson page
has not been written yet.

## Core Foundation

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 1 | Proxy basics | `src/proxy/concepts/proxy-basics/` | `target`, `handler`, trap, empty handler, proxy is not a copy |
| 2 | Reflect forwarding | `src/proxy/concepts/reflect-forwarding/` | custom trap logic first, then `Reflect.*` for normal behavior |
| 3 | `get` trap | `src/proxy/handlers/get/` | property reads, default values, logging reads |
| 4 | `Reflect.get()` | `src/reflect/methods/static/get/` | function form of property read, especially useful with `receiver` |
| 5 | `receiver` | `src/proxy/concepts/receiver/` | why getters and inherited proxy cases need the correct `this` |
| 6 | `set` trap | `src/proxy/handlers/set/` | property writes, validation, returning a boolean |
| 7 | `Reflect.set()` | `src/reflect/methods/static/set/` | normal assignment as a function, returns `true` or `false` |

## Basic Object Operation Traps

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 8 | `has` trap | `src/proxy/handlers/has/` | intercepts the `in` operator |
| 9 | `Reflect.has()` | `src/reflect/methods/static/has/` | function form of `key in object` |
| 10 | `deleteProperty` trap | `src/proxy/handlers/deleteProperty/` | intercepts `delete object.key` |
| 11 | `Reflect.deleteProperty()` | `src/reflect/methods/static/deleteProperty/` | function form of `delete`, returns success/failure |
| 12 | Proxy invariants | `src/proxy/concepts/invariants/` | traps must obey JavaScript's required object rules |

## Keys, Descriptors, And Property Control

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 13 | `ownKeys` trap | `src/proxy/handlers/ownKeys/` | intercepts own-key listing |
| 14 | `Reflect.ownKeys()` | `src/reflect/methods/static/ownKeys/` | all own keys: strings, symbols, enumerable, non-enumerable |
| 15 | `getOwnPropertyDescriptor` trap | `src/proxy/handlers/getOwnPropertyDescriptor/` | controls descriptor reads and affects visible enumerable keys |
| 16 | `Reflect.getOwnPropertyDescriptor()` | `src/reflect/methods/static/getOwnPropertyDescriptor/` | function form of descriptor lookup |
| 17 | `defineProperty` trap | `src/proxy/handlers/defineProperty/` | intercepts property creation/change through descriptors |
| 18 | `Reflect.defineProperty()` | `src/reflect/methods/static/defineProperty/` | descriptor definition as a boolean-returning function |
| 19 | Protected properties | `src/proxy/concepts/protected-properties/` | combining traps to hide or block underscore/internal properties |

## Prototype And Extensibility Traps

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 20 | `getPrototypeOf` trap | `src/proxy/handlers/getPrototypeOf/` | intercepts prototype reads |
| 21 | `Reflect.getPrototypeOf()` | `src/reflect/methods/static/getPrototypeOf/` | function form of `Object.getPrototypeOf()` |
| 22 | `setPrototypeOf` trap | `src/proxy/handlers/setPrototypeOf/` | intercepts prototype changes |
| 23 | `Reflect.setPrototypeOf()` | `src/reflect/methods/static/setPrototypeOf/` | boolean-returning prototype change |
| 24 | `isExtensible` trap | `src/proxy/handlers/isExtensible/` | intercepts extensibility checks |
| 25 | `Reflect.isExtensible()` | `src/reflect/methods/static/isExtensible/` | function form of `Object.isExtensible()` |
| 26 | `preventExtensions` trap | `src/proxy/handlers/preventExtensions/` | intercepts making an object non-extensible |
| 27 | `Reflect.preventExtensions()` | `src/reflect/methods/static/preventExtensions/` | boolean-returning form of `Object.preventExtensions()` |

## Function And Constructor Proxies

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 28 | `apply` trap | `src/proxy/handlers/apply/` | intercepts normal function calls |
| 29 | `Reflect.apply()` | `src/reflect/methods/static/apply/` | function call forwarding with `thisArg` and arguments |
| 30 | `construct` trap | `src/proxy/handlers/construct/` | intercepts `new` calls |
| 31 | `Reflect.construct()` | `src/reflect/methods/static/construct/` | constructor forwarding and `new.target` control |

## Practical Limits And Real-World Safety

| Step | Topic | Folder | What To Understand |
|---:|---|---|---|
| 32 | Arrays and Proxy | `src/proxy/concepts/arrays-and-proxy/` | array operations also use internal object operations |
| 33 | Internal slots | `src/proxy/concepts/internal-slots/` | some built-ins like `Map` need method binding because of internal slots |
| 34 | Private fields | `src/proxy/concepts/private-fields/` | private fields are brand-checked and can fail through proxies |
| 35 | Proxy identity | `src/proxy/concepts/proxy-identity/` | proxy and target are different object identities |
| 36 | Use proxy everywhere | `src/proxy/concepts/use-proxy-everywhere/` | target access bypasses traps, so code should use the proxy |
| 37 | `Proxy.revocable()` | `src/proxy/methods/static/revocable/` | creates a proxy that can later be disabled |
| 38 | Best practices | `src/proxy/concepts/best-practices/` | forward with Reflect, respect invariants, avoid unnecessary proxies |

## Quick Memory Map

```text
Foundation:
Proxy basics -> Reflect forwarding -> get -> receiver -> set

Object operations:
has -> deleteProperty -> invariants -> ownKeys -> descriptors -> defineProperty

Object shape:
prototype traps -> extensibility traps

Functions:
apply -> construct

Limitations:
arrays -> internal slots -> private fields -> identity -> use proxy everywhere

Finish:
Proxy.revocable() -> best practices
```

## Revision Questions

After revising the section, you should be able to answer:

- What is the difference between the proxy and the target?
- What is a handler?
- What is a trap?
- Which operation triggers `get`?
- Which operation triggers `set`?
- Why does `set` return `true` or `false`?
- What is `receiver` used for?
- Why is `Reflect.get()` safer than `target[property]` in forwarding examples?
- Why should direct code use the proxy instead of the raw target?
- Why can a proxy trap throw `TypeError` even when your code looks valid?
- Why are `ownKeys` and `getOwnPropertyDescriptor` often studied together?
- Why can proxies have trouble with built-ins and private fields?
