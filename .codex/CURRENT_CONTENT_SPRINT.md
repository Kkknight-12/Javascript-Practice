# Current Content Sprint

## Active Story

### JS-CONTENT-001AM: Review Object.assign

As a learner, I want to understand `Object.assign()` as the static method that
copies enumerable own properties from sources into a target, so I can use it
for shallow copies and merges without accidentally mutating the wrong object.

## Current Folder

```text
src/object/methods/static-methods/assign/
```

## Current Files

```text
src/object/methods/static-methods/assign/assign.js
src/object/methods/static-methods/assign/assign.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/assign.js`.
- The existing runnable file covered basic target mutation, shallow copy,
  merging, enumerable-property copying, and an error note, but did not yet have
  a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/assign/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
```

Key facts:

- `Object.assign()` copies enumerable own properties from source objects into a
  target object.
- It returns the target object after modifying it.
- Later sources overwrite earlier sources when they use the same property key.
- It makes a shallow copy, so nested object references are shared.
- It copies enumerable string keys and enumerable symbol keys.
- It skips inherited and non-enumerable properties.
- It ignores `null` and `undefined` sources, but throws for `null` or
  `undefined` targets.

## Sprint 1: Review `Object.assign`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `assign/` so the paired `.js` and `.md` files
  live together.
- [x] Expand `assign.js` with learner-facing examples.
- [x] Add paired `assign.md` teaching note.
- [x] Cover target mutation, return value, overwrite order, shallow copying,
  own enumerable property rules, symbol keys, getter behavior,
  `null`/`undefined`, and partial mutation on errors.
- [x] Update the `create-object` cross-reference to the new detail page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/assign/assign.js`.
- [x] Run `node --check src/object/methods/static-methods/assign/assign.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/defineProperties.js
```
