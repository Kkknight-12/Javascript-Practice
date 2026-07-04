# Current Content Sprint

## Active Story

### JS-CONTENT-001AR: Review Object.fromEntries

As a learner, I want to understand `Object.fromEntries()` as the static method
that turns key-value pairs into a new object, so I can rebuild objects after
entry transformations and know which inputs are valid.

## Current Folder

```text
src/object/methods/static-methods/fromEntries/
```

## Current Files

```text
src/object/methods/static-methods/fromEntries/fromEntries.js
src/object/methods/static-methods/fromEntries/fromEntries.md
```

## Starting Point

- The next unchecked object page was the old flat `Object.fromEntries()` file.
- The existing runnable file covered basic array and `Map` conversion plus an
  `Object.entries()` transformation, but did not yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/fromEntries/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.fromentries
https://tc39.es/ecma262/multipage/keyed-collections.html#sec-add-entries-from-iterable
```

Key facts:

- `Object.fromEntries()` creates a new ordinary object from an iterable of
  entries.
- Each produced entry is read from property `0` for the key and property `1`
  for the value.
- Keys are converted with `ToPropertyKey`, so keys become strings or symbols.
- Symbol keys can be created.
- Duplicate keys keep the later value.
- The outer argument must be iterable, and each produced entry must be an
  object.
- Created properties are ordinary writable, enumerable, configurable data
  properties.
- The method ignores `this`; borrowing it with `.call()` does not create a
  custom constructor instance.

## Sprint 1: Review `Object.fromEntries`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `fromEntries/` so the paired `.js` and `.md`
  files live together.
- [x] Expand `fromEntries.js` with learner-facing examples.
- [x] Add paired `fromEntries.md` teaching note.
- [x] Cover arrays of pairs, `Map`, `Object.entries()` transformations,
  duplicate keys, symbol keys, key conversion, array-like entries, missing and
  extra entry values, invalid inputs, `Set` entry mistakes, `URLSearchParams`,
  created descriptors, ignored `this`, and differences from `Object.entries()`
  and `Map`.
- [x] Update the object creation reference to the new detail page.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/fromEntries/fromEntries.js`.
- [x] Run `node --check src/object/methods/static-methods/fromEntries/fromEntries.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/getOwnPropertyDescriptor.js
```
