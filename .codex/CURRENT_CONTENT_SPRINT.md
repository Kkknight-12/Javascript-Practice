# Current Content Sprint

## Active Story

### JS-CONTENT-001AZ: Review Object.is

As a learner, I want to understand `Object.is()` as JavaScript's SameValue
comparison helper, so I can compare values without confusing it with `==`,
`===`, or SameValueZero.

## Current Folder

```text
src/object/methods/static-methods/is/
```

## Current Files

```text
src/object/methods/static-methods/is/is.js
src/object/methods/static-methods/is/is.md
```

## Starting Point

- The next unchecked object page was the old flat
  `src/object/methods/static-methods/is.js`.
- The existing file covered a few MDN examples, but several calls were not
  logged and the page did not yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/is/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is
```

Key facts:

- `Object.is(value1, value2)` returns a boolean.
- It uses SameValue comparison.
- It does not perform type coercion.
- It treats `NaN` as equal to `NaN`.
- It treats `0` and `-0` as different values.
- For most other everyday comparisons, it behaves like `===`.
- Objects, arrays, functions, and symbols are compared by identity/reference.
- It is different from SameValueZero, which treats `0` and `-0` as the same.

## Sprint 1: Review `Object.is`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `is/` so the paired `.js` and `.md` files
  live together.
- [x] Expand `is.js` with learner-facing examples.
- [x] Add paired `is.md` teaching note.
- [x] Cover no coercion, `NaN`, signed zero, object/array references, mutation
  and references, symbol identity, `==`, `===`, SameValueZero, deep-equality
  mistakes, and a small value-change helper.
- [x] Update the static-methods overview link.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/is/is.js`.
- [x] Run `node --check src/object/methods/static-methods/is/is.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/isExtensible/isExtensible.js
```
