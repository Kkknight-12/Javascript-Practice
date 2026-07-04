# Current Content Sprint

## Active Story

### JS-CONTENT-001AS: Review Object.getOwnPropertyDescriptor

As a learner, I want to understand `Object.getOwnPropertyDescriptor()` as the
static method that inspects one own property's descriptor, so I can see
writable, enumerable, configurable, value, getter, and setter details.

## Current Folder

```text
src/object/methods/static-methods/getOwnPropertyDescriptor/
```

## Current Files

```text
src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js
src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md
```

## Starting Point

- The next unchecked object page was the old flat
  `Object.getOwnPropertyDescriptor()` file.
- The existing runnable file covered one basic descriptor example, but did not
  yet have a paired study note.
- This reviewed page now lives in a method folder:
  `src/object/methods/static-methods/getOwnPropertyDescriptor/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.getownpropertydescriptor
```

Key facts:

- `Object.getOwnPropertyDescriptor()` converts the first argument with
  `ToObject`, so primitive strings can be inspected but `null` and `undefined`
  throw `TypeError`.
- The property key is converted with `ToPropertyKey`.
- It checks only own properties through `[[GetOwnProperty]]`.
- Missing or inherited properties return `undefined`.
- Existing own properties return a descriptor object.
- Descriptor objects can be data descriptors or accessor descriptors.
- Reading an accessor descriptor does not call the getter.
- The returned descriptor object is mutable, but mutating it does not change the
  original property.

## Sprint 1: Review `Object.getOwnPropertyDescriptor`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `getOwnPropertyDescriptor/` so the paired
  `.js` and `.md` files live together.
- [x] Expand `getOwnPropertyDescriptor.js` with learner-facing examples.
- [x] Add paired `getOwnPropertyDescriptor.md` teaching note.
- [x] Cover normal descriptors, `Object.defineProperty()` descriptors, own-only
  lookup, missing properties, accessors, getter behavior, symbol keys, key
  conversion, primitives, descriptor-copy behavior, optional chaining, and
  differences from `Object.getOwnPropertyDescriptors()` and
  `Reflect.getOwnPropertyDescriptor()`.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js`.
- [x] Run `node --check src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/getOwnPropertyDescriptors.js
```
