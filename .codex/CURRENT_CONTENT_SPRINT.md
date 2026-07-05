# Current Content Sprint

## Active Story

### JS-CONTENT-001AW: Review Object.getPrototypeOf

As a learner, I want to understand `Object.getPrototypeOf()` as the static
method that returns an object's immediate prototype, so I can inspect direct
prototype links without confusing them with whole-chain checks.

## Current Folder

```text
src/object/methods/static-methods/getPrototypeOf/
```

## Current Files

```text
src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.js
src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.md
```

## Starting Point

- The next unchecked object page was the old flat
  `src/object/methods/static-methods/getPrototypeOf.js`.
- The existing runnable file covered one `Object.create()` prototype example,
  but did not yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/getPrototypeOf/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getprototypeof
```

Key facts:

- `Object.getPrototypeOf()` converts the argument with `ToObject`, so primitive
  values can be inspected but `null` and `undefined` throw `TypeError`.
- It returns the immediate `[[Prototype]]` value.
- The return value can be another object or `null`.
- It does not return the whole prototype chain.
- Normal object literals point to `Object.prototype`; `Object.prototype` points
  to `null`.
- `Object.create(null)` creates an object whose prototype is `null`.
- `Reflect.getPrototypeOf()` does not coerce primitive values.
- Proxy objects can intercept prototype reads with a `getPrototypeOf` trap.

## Sprint 1: Review `Object.getPrototypeOf`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `getPrototypeOf/` so the paired `.js`
  and `.md` files live together.
- [x] Expand `getPrototypeOf.js` with learner-facing examples.
- [x] Add paired `getPrototypeOf.md` teaching note.
- [x] Cover `Object.create()`, normal object literals, `Object.prototype`,
  null-prototype objects, class chains, constructor functions,
  `Object.setPrototypeOf()`, primitives, `Reflect.getPrototypeOf()`,
  differences from `isPrototypeOf()` and `instanceof`, and proxy traps.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.js`.
- [x] Run `node --check src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/groupBy.js
```
