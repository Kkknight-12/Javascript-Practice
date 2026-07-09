# Current Content Sprint

## Active Story

### JS-CONTENT-001BM: Add Reflect Overview

As a learner, I want to understand what `Reflect` is and why it exists, so the
individual Reflect method pages do not feel like duplicate Object method pages.

## Current Folder

```text
src/reflect/
```

## Current Files

```text
src/reflect/notes.md
src/reflect/methods/static/ownKeys/ownKeys.js
src/reflect/methods/static/ownKeys/ownKeys.md
src/object/loop-through-object/for-loop.md
```

## Starting Point

- The user said `Reflect` is new and asked whether the doubt is correct:
  Reflect appears to overlap with Object static methods.
- That doubt is valid: many Reflect methods overlap with normal syntax or
  `Object.*` methods, but Reflect exists as a consistent function-form API for
  low-level object operations and Proxy forwarding.
- The previous sprint created `src/reflect/methods/static/ownKeys/ownKeys.md`.
  The new overview note should sit at `src/reflect/notes.md` and explain why
  Reflect exists before learners study individual Reflect methods.
- Existing unrelated dirty file remains outside this sprint:
  `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.ownkeys
https://tc39.es/ecma262/multipage/reflection.html#sec-reflect-object
```

Key facts:

- `Reflect` is not a constructor; it is a namespace object with static methods.
- `Reflect` methods invoke interceptable JavaScript object internal methods.
- Many Reflect methods correspond to Proxy handler method names.
- A major use case is forwarding default behavior inside Proxy traps.
- Many Reflect operations can be done with normal syntax or `Object.*` methods,
  but Reflect gives consistent function forms and some subtle extra control.
- `Reflect.ownKeys(target)` returns an array of the target object's own property
  keys.
- The returned array can contain string keys and symbol keys.
- It includes enumerable and non-enumerable own keys.
- It skips inherited keys.
- It throws `TypeError` when `target` is not an object.
- For ordinary objects, key order is integer-index string keys first in numeric
  order, then other string keys in property creation order, then symbol keys in
  property creation order.
- `Reflect.ownKeys()` reads keys, not property values, so getters do not run.
- The ECMAScript operation calls the target object's `[[OwnPropertyKeys]]`
  internal method and returns those keys as an array.

## Sprint 1: Create Reflect Overview

Status: review-ready

Checklist:

- [x] Add `src/reflect/notes.md`.
- [x] Explain that the user's doubt is valid: Reflect overlaps with existing
  syntax and Object methods.
- [x] Explain what Reflect is: a namespace object with static methods, not a
  constructor.
- [x] Explain why Reflect exists: function form, low-level object operations,
  boolean success/failure, Proxy forwarding, and extra control such as receiver
  or `new.target`.
- [x] Compare common Object/syntax forms with their Reflect versions.
- [x] Link `src/reflect/methods/static/ownKeys/ownKeys.md` back to the new
  Reflect overview.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `git diff --check`.
- [x] Do a second note-format review for `src/reflect/notes.md`.

## Previous Sprint: Create And Review `Reflect.ownKeys()`

Status: review-ready

Checklist:

- [x] Replace the placeholder `.gitkeep` with a real `ownKeys.js` and
  `ownKeys.md` page.
- [x] Cross-check behavior against MDN and the ECMAScript specification.
- [x] Explain own vs inherited property coverage.
- [x] Explain string keys vs symbol keys.
- [x] Explain enumerable vs non-enumerable coverage.
- [x] Compare `Reflect.ownKeys()` with `Object.keys()`,
  `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()`, and
  `for...in`.
- [x] Show that getters do not run because only keys are read.
- [x] Show key order with integer-index strings, other strings, and symbols.
- [x] Show array behavior, including the non-enumerable `length` key.
- [x] Show `TypeError` for primitive targets.
- [x] Update `src/object/loop-through-object/for-loop.md` to link to the new
  local `Reflect.ownKeys()` page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/reflect/methods/static/ownKeys/ownKeys.js`.
- [x] Run `node --check src/reflect/methods/static/ownKeys/ownKeys.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `ownKeys.md`.

## Stop Point

This page is review-ready. The next unchecked section after this one is:

```text
src/proxy/concepts/proxy-basics/proxy-basics.js
```
