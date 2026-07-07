# Current Content Sprint

## Active Story

### JS-CONTENT-001BF: Review Object.preventExtensions

As a learner, I want to understand `Object.preventExtensions()` as the lightest
object-integrity action, so I can separate "no new properties" from sealed and
frozen behavior.

## Current Folder

```text
src/object/methods/static-methods/preventExtensions/
```

## Current Files

```text
src/object/methods/static-methods/preventExtensions/preventExtensions.js
src/object/methods/static-methods/preventExtensions/preventExtensions.md
```

## Starting Point

- The next unchecked tracker entry was
  `src/object/methods/static-methods/objectEntries/entries.js`, but that file
  did not exist and `Object.entries()` was already reviewed under
  `src/object/methods/static-methods/entries/`.
- That stale duplicate tracker entry was removed.
- The next real unchecked page was
  `src/object/methods/static-methods/preventExtensions.js`.
- The existing runnable file covered the basic `Object.preventExtensions()`,
  `Object.seal()`, and `Object.freeze()` difference, but it was still a loose
  file and did not have a paired study note.
- The reviewed page was moved into `preventExtensions/` with
  `preventExtensions.js` and `preventExtensions.md`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.preventextensions
```

Key facts:

- `Object.preventExtensions(object)` prevents new own properties from being
  added to an object.
- It returns the object being made non-extensible.
- Existing writable properties can still change.
- Existing configurable properties can still be deleted.
- A non-extensible object's prototype cannot be reassigned to a different
  object.
- Properties can still be added to the object's prototype.
- There is no way to make an object extensible again after preventing
  extensions.
- Modern JavaScript returns primitive values as-is.
- The ECMAScript algorithm returns the argument when it is not an object.

## Sprint 1: Review `Object.preventExtensions`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Remove the stale duplicate `objectEntries/entries.js` tracker entry.
- [x] Move the reviewed page into `preventExtensions/` with method-page naming.
- [x] Rewrite `preventExtensions.js` with learner-facing examples.
- [x] Add paired `preventExtensions.md` teaching note.
- [x] Cover non-extensible objects, same-object return value, existing property
  changes, deletion, `Object.defineProperty()`, prototype reassignment, inherited
  properties from the prototype, sealed/frozen comparison, shallow behavior,
  null-prototype objects, primitives, `Reflect.preventExtensions()`, and strict
  mode errors.
- [x] Update the static-method overview link.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/preventExtensions/preventExtensions.js`.
- [x] Run `node --check src/object/methods/static-methods/preventExtensions/preventExtensions.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/seal.js
```
