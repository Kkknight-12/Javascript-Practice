# Current Content Sprint

## Active Story

### JS-CONTENT-001AP: Review Object.entries

As a learner, I want to understand `Object.entries()` as the static method that
turns an object's own enumerable string-keyed properties into `[key, value]`
pairs, so I can loop, transform, and convert object data intentionally.

## Current Folder

```text
src/object/methods/static-methods/entries/
```

## Current Files

```text
src/object/methods/static-methods/entries/entries.js
src/object/methods/static-methods/entries/entries.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/entries.js`.
- The existing runnable file covered a basic `Object.entries()` example and
  one non-enumerable-property example, but did not yet have a paired study
  note.
- A duplicate older example existed at
  `src/object/methods/static-methods/objectEntries/entries.js`; this reviewed
  page consolidates the topic into the `entries/` method folder.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/entries/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.entries
```

Key facts:

- `Object.entries()` returns an array of `[key, value]` pairs.
- It includes own enumerable string-keyed properties.
- It skips inherited properties, non-enumerable properties, and symbol-keyed
  properties.
- Array indexes are returned as string keys.
- Property order places integer-like string keys first in ascending numeric
  order, then other string keys in insertion order.
- Strings return character index entries.
- `null` and `undefined` throw `TypeError`.
- Getters run because the property values are read.

## Sprint 1: Review `Object.entries`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `entries/` so the paired `.js` and `.md`
  files live together.
- [x] Remove the duplicate older `objectEntries/entries.js` example.
- [x] Expand `entries.js` with learner-facing examples.
- [x] Add paired `entries.md` teaching note.
- [x] Cover basic entries, `for...of` destructuring, own/enumerable/string-key
  filtering, symbol-key skipping, arrays, sparse arrays, key order, primitive
  values, getters, `Object.fromEntries()`, `Map`, and differences from
  `Object.keys()`, `Object.values()`, and array `entries()`.
- [x] Update the object loop reference to the new detail page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/entries/entries.js`.
- [x] Run `node --check src/object/methods/static-methods/entries/entries.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/freeze.js
```
