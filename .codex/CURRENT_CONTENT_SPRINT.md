# Current Content Sprint

## Active Story

### JS-CONTENT-001AV: Review Object.getOwnPropertySymbols

As a learner, I want to understand `Object.getOwnPropertySymbols()` as the
static method that returns own symbol keys, so I can inspect symbol-keyed
properties without confusing them with string keys or private state.

## Current Folder

```text
src/object/methods/static-methods/getOwnPropertySymbols/
```

## Current Files

```text
src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js
src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js`.
- The existing runnable file covered basic symbol keys, string-key skipping,
  and inherited-symbol skipping, but did not yet have a paired study note.
- This reviewed page already lived in a method folder:
  `src/object/methods/static-methods/getOwnPropertySymbols/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertysymbols
```

Key facts:

- `Object.getOwnPropertySymbols()` converts the argument with `ToObject`, so
  primitives can be inspected but `null` and `undefined` throw `TypeError`.
- It returns an array of symbols.
- It includes own enumerable and non-enumerable symbol-keyed properties.
- It skips inherited symbol properties.
- It skips string-keyed properties.
- Symbol descriptions do not make two symbols equal.
- Symbols are not private because they can be discovered from the object.
- Use `Reflect.ownKeys()` when own string keys and own symbol keys are both
  needed.

## Sprint 1: Review `Object.getOwnPropertySymbols`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Keep the reviewed page in `getOwnPropertySymbols/` so the paired `.js`
  and `.md` files live together.
- [x] Expand `getOwnPropertySymbols.js` with learner-facing examples.
- [x] Add paired `getOwnPropertySymbols.md` teaching note.
- [x] Cover basic symbol keys, non-enumerable symbol keys, string-key skipping,
  symbol identity, inherited-symbol skipping, `Reflect.ownKeys()`, symbols not
  being private, names-vs-descriptors, JSON behavior, `Symbol.for()`,
  primitives, and differences from `Object.getOwnPropertyNames()`.
- [x] Update the object-loop reference to the new detail page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js`.
- [x] Run `node --check src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/getPrototypeOf.js
```
