# Current Content Sprint

## Active Story

### JS-CONTENT-001BC: Review Object.isSealed

As a learner, I want to understand `Object.isSealed()` as the integrity check
for a locked property structure, so I can separate sealed, frozen, and
non-extensible behavior clearly.

## Current Folder

```text
src/object/methods/static-methods/isSealed/
```

## Current Files

```text
src/object/methods/static-methods/isSealed/isSealed.js
src/object/methods/static-methods/isSealed/isSealed.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/isSealed/isSealed.js`.
- The existing runnable file covered a basic `Object.seal()` flow, but it did
  not yet have a paired study note.
- This reviewed page already lived in a method folder:
  `src/object/methods/static-methods/isSealed/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.issealed
```

Key facts:

- `Object.isSealed(object)` returns a boolean.
- Sealed means non-extensible and all own properties non-configurable.
- Existing writable data-property values can still change.
- Frozen objects are sealed.
- Sealed objects are not automatically frozen.
- Empty non-extensible objects are sealed.
- Sealing is shallow.
- Accessor properties are checked by configurability.
- Modern JavaScript returns `true` for primitive values.

## Sprint 1: Review `Object.isSealed`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Keep the reviewed page in `isSealed/` so the paired `.js` and `.md`
  files live together.
- [x] Expand `isSealed.js` with learner-facing examples.
- [x] Add paired `isSealed.md` teaching note.
- [x] Cover `Object.seal()`, sealed vs frozen vs non-extensible, writable data
  properties, non-configurable descriptors, deletion, empty non-extensible
  objects, accessor properties, shallow sealing, primitives, and strict-mode
  errors.
- [x] Update the static-methods overview link.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/isSealed/isSealed.js`.
- [x] Run `node --check src/object/methods/static-methods/isSealed/isSealed.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/keys.js
```
