# Current Content Sprint

## Active Story

### JS-CONTENT-001BB: Review Object.isFrozen

As a learner, I want to understand `Object.isFrozen()` as the integrity check
for the strongest normal object lock, so I can separate frozen, sealed, and
non-extensible behavior clearly.

## Current Folder

```text
src/object/methods/static-methods/isFrozen/
```

## Current Files

```text
src/object/methods/static-methods/isFrozen/isFrozen.js
src/object/methods/static-methods/isFrozen/isFrozen.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/isFrozen/isFrozen.js`.
- The existing runnable file covered a basic `Object.freeze()` flow and shallow
  freezing, but it did not yet have a paired study note.
- This reviewed page already lived in a method folder:
  `src/object/methods/static-methods/isFrozen/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.isfrozen
```

Key facts:

- `Object.isFrozen(object)` returns a boolean.
- Frozen means non-extensible, all own properties non-configurable, and all own
  data properties non-writable.
- Frozen objects are also sealed and non-extensible.
- Non-extensible objects are not automatically frozen.
- Sealed objects are not automatically frozen.
- Empty non-extensible objects are frozen.
- Freezing is shallow.
- Accessor properties are checked by configurability, not writability.
- Modern JavaScript returns `true` for primitive values.

## Sprint 1: Review `Object.isFrozen`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Keep the reviewed page in `isFrozen/` so the paired `.js` and `.md`
  files live together.
- [x] Expand `isFrozen.js` with learner-facing examples.
- [x] Add paired `isFrozen.md` teaching note.
- [x] Cover `Object.freeze()`, frozen vs sealed vs non-extensible, data
  property descriptors, empty non-extensible objects, shallow freezing, arrays,
  accessor properties, primitives, and strict-mode errors.
- [x] Update the static-methods overview link.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/isFrozen/isFrozen.js`.
- [x] Run `node --check src/object/methods/static-methods/isFrozen/isFrozen.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/isSealed/isSealed.js
```
