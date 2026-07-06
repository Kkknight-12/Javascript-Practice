# Current Content Sprint

## Active Story

### JS-CONTENT-001AX: Review Object.groupBy

As a learner, I want to understand `Object.groupBy()` as the static method that
groups iterable elements into arrays, so I can split lists by category without
writing manual accumulator code.

## Current Folder

```text
src/object/methods/static-methods/groupBy/
```

## Current Files

```text
src/object/methods/static-methods/groupBy/groupBy.js
src/object/methods/static-methods/groupBy/groupBy.md
```

## Starting Point

- The next unchecked object page was the old flat
  `src/object/methods/static-methods/groupBy.js`.
- The existing runnable file defined inventory data but left the main
  `Object.groupBy()` example commented out.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/groupBy/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.groupby
```

Key facts:

- `Object.groupBy(items, callback)` groups values from an iterable.
- The callback is called once for each element with `(element, index)`.
- The callback return value is coerced to a property key.
- Group keys can be strings or symbols.
- The returned object has a null prototype.
- Each group value is an array of the matching original elements.
- Plain objects are not iterable by default; use `Object.entries()`,
  `Object.values()`, or `Object.keys()` first when grouping object data.
- Use `Map.groupBy()` when group keys should keep object identity.

## Sprint 1: Review `Object.groupBy`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `groupBy/` so the paired `.js`
  and `.md` files live together.
- [x] Expand `groupBy.js` with learner-facing examples.
- [x] Add paired `groupBy.md` teaching note.
- [x] Cover grouping by property, callback index, null-prototype results,
  property-key coercion, symbol group keys, iterable inputs, plain object input
  mistakes, original object references, `reduce()`, and `Map.groupBy()`.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/groupBy/groupBy.js`.
- [x] Run `node --check src/object/methods/static-methods/groupBy/groupBy.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/index.js
```
