# Current Content Sprint

## Active Story

### JS-CONTENT-001AU: Review Object.getOwnPropertyNames

As a learner, I want to understand `Object.getOwnPropertyNames()` as the static
method that returns all own string property names, so I can inspect visible and
hidden string names without mixing them up with symbols or inherited
properties.

## Current Folder

```text
src/object/methods/static-methods/getOwnPropertyNames/
```

## Current Files

```text
src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.js
src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.md
```

## Starting Point

- The next unchecked object page was the old flat
  `Object.getOwnPropertyNames()` file.
- The existing runnable file covered basic property names, arrays, and a
  non-enumerable property example, but did not yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/getOwnPropertyNames/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertynames
```

Key facts:

- `Object.getOwnPropertyNames()` converts the argument with `ToObject`, so
  primitive strings can be inspected but `null` and `undefined` throw
  `TypeError`.
- It returns an array of strings.
- It includes own enumerable and non-enumerable string-keyed properties.
- It skips inherited properties.
- It skips symbol-keyed properties.
- Integer-like string keys come first in ascending numeric order, followed by
  other string keys in insertion order.
- Arrays include index names and the non-enumerable `length` property name.
- Use `Object.getOwnPropertySymbols()` or `Reflect.ownKeys()` when symbol keys
  matter.

## Sprint 1: Review `Object.getOwnPropertyNames`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `getOwnPropertyNames/` so the paired
  `.js` and `.md` files live together.
- [x] Expand `getOwnPropertyNames.js` with learner-facing examples.
- [x] Add paired `getOwnPropertyNames.md` teaching note.
- [x] Cover basic names, non-enumerable names, finding non-enumerable names,
  symbol skipping, `Reflect.ownKeys()`, inherited-property skipping, arrays,
  sparse arrays, property order, primitives, names-vs-descriptors, and
  differences from `Object.keys()`, `Object.getOwnPropertySymbols()`, and
  `Reflect.ownKeys()`.
- [x] Update the object-loop reference to the new detail page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.js`.
- [x] Run `node --check src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js
```
