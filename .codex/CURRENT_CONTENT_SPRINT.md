# Current Content Sprint

## Active Story

### JS-CONTENT-001AT: Review Object.getOwnPropertyDescriptors

As a learner, I want to understand `Object.getOwnPropertyDescriptors()` as the
static method that collects all own property descriptors, so I can inspect,
copy, and preserve descriptor details intentionally.

## Current Folder

```text
src/object/methods/static-methods/getOwnPropertyDescriptors/
```

## Current Files

```text
src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.js
src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.md
```

## Starting Point

- The next unchecked object page was the old flat
  `Object.getOwnPropertyDescriptors()` file.
- The existing runnable file covered one basic all-descriptors example and a
  shallow-copy pattern, but did not yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/getOwnPropertyDescriptors/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptors
```

Key facts:

- `Object.getOwnPropertyDescriptors()` converts the first argument with
  `ToObject`, so primitive strings can be inspected but `null` and `undefined`
  throw `TypeError`.
- It gets all own property keys with `[[OwnPropertyKeys]]`.
- It includes string-keyed and symbol-keyed own properties.
- It includes enumerable and non-enumerable own properties.
- It skips inherited properties.
- It creates a new ordinary descriptor-map object.
- Each value in the descriptor map is a descriptor object created from the
  source property descriptor.
- The descriptor map can be passed to `Object.defineProperties()`.

## Sprint 1: Review `Object.getOwnPropertyDescriptors`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `getOwnPropertyDescriptors/` so the paired
  `.js` and `.md` files live together.
- [x] Expand `getOwnPropertyDescriptors.js` with learner-facing examples.
- [x] Add paired `getOwnPropertyDescriptors.md` teaching note.
- [x] Cover descriptor-map shape, non-enumerable properties, symbol keys,
  inherited-property skipping, accessors, getter behavior, descriptor-map copy
  behavior, descriptor-preserving copies, `Object.assign()` differences,
  prototype-preserving shallow clones, primitives, and the difference from
  `Object.getOwnPropertyDescriptor()`.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.js`.
- [x] Run `node --check src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/getOwnPropertyNames.js
```
