# Current Content Sprint

## Active Story

### JS-CONTENT-001BI: Review Object.values

As a learner, I want to understand `Object.values()` as the method for reading an
object's own enumerable string-keyed values, so I can choose it correctly when I
need values but not property names.

## Current Folder

```text
src/object/methods/static-methods/values/
```

## Current Files

```text
src/object/methods/static-methods/values/values.js
src/object/methods/static-methods/values/values.md
```

## Starting Point

- The next real unchecked page was the `Object.values()` page under
  `src/object/methods/static-methods/`.
- The existing runnable file covered a basic object, a non-enumerable property,
  strings, and number primitives, but it was still a loose file and did not have
  a paired study note.
- The reviewed page was moved into `values/` with `values.js` and `values.md`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.values
```

Key facts:

- `Object.values(object)` returns an array.
- It returns values from own enumerable string-keyed properties.
- It skips inherited properties, non-enumerable properties, and symbol keys.
- It reads values, so getters run.
- Its order follows the same own string-key order used by `Object.keys()` and
  `Object.entries()`.
- Numeric index keys come before other string keys in ascending numeric order.
- Strings return character values.
- Most other primitives return `[]`.
- `null` and `undefined` throw `TypeError`.

## Sprint 1: Review `Object.values`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `values/` with method-page naming.
- [x] Rewrite `values.js` with learner-facing examples.
- [x] Add paired `values.md` teaching note.
- [x] Cover own enumerable string-keyed values, inherited property skipping,
  non-enumerable property skipping, symbol-keyed value skipping, getter behavior,
  arrays, sparse arrays, explicit `undefined` values, value order,
  null-prototype objects, primitives, and `Object.entries()` comparison.
- [x] Update static-method and object-loop overview links.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/values/values.js`.
- [x] Run `node --check src/object/methods/static-methods/values/values.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/practice/index.js
```
