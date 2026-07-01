# Current Content Sprint

## Active Story

### JS-CONTENT-001AG: Review Object.prototype.hasOwnProperty

As a learner, I want to understand `Object.prototype.hasOwnProperty()` as an
older own-property check, so I can read legacy code and know why modern code
usually prefers `Object.hasOwn()`.

## Current Folder

```text
src/object/methods/instance/hasOwnProperty/
```

## Current Files

```text
src/object/methods/instance/hasOwnProperty/hasOwnProperty.js
src/object/methods/instance/hasOwnProperty/hasOwnProperty.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/instance/hasOwnProperty/hasOwnProperty.js`.
- The existing runnable file covered the basic modern-vs-legacy comparison but
  did not yet have a paired study note.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.hasownproperty
```

Key facts:

- `hasOwnProperty()` returns `true` when the key is an own property.
- It returns `false` for inherited or missing properties.
- It checks ownership, not truthiness or enumerability.
- It can check string keys and symbol keys.
- It is not available on null-prototype objects unless borrowed from
  `Object.prototype`.
- MDN recommends `Object.hasOwn()` over `hasOwnProperty()` where supported.

## Sprint 1: Review `hasOwnProperty`

Status: review

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Expand `hasOwnProperty.js` with learner-facing examples.
- [x] Add paired `hasOwnProperty.md` teaching note.
- [x] Cover own vs inherited, falsy values, non-enumerable properties, symbol
  keys, array holes, shadowed methods, null-prototype objects, and `for...in`
  filtering.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/instance/hasOwnProperty/hasOwnProperty.js`.
- [x] Run `node --check src/object/methods/instance/hasOwnProperty/hasOwnProperty.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/instance/isPrototypeOf.js
```
