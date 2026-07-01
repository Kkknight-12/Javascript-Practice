# Current Content Sprint

## Active Story

### JS-CONTENT-001AI: Review Object.prototype.propertyIsEnumerable

As a learner, I want to understand `Object.prototype.propertyIsEnumerable()` as
an own-and-enumerable property check, so I can tell the difference between a
property existing and a property being included by enumeration tools.

## Current Folder

```text
src/object/methods/instance/propertyIsEnumerable/
```

## Current Files

```text
src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js
src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js`.
- The existing runnable file covered the basic own-enumerable distinction but
  did not yet have a paired study note.
- Existing uncommitted `isPrototypeOf` work remains in the working tree from the
  previous review step.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.propertyisenumerable
```

Key facts:

- `propertyIsEnumerable()` returns `true` only when the property is both own and
  enumerable.
- Missing, inherited, and non-enumerable properties return `false`.
- The property key can be a string or a symbol.
- Null-prototype objects do not inherit this method, so the borrowed-call
  pattern is needed.
- Descriptor checks can expose the underlying `enumerable` flag.

## Sprint 1: Review `propertyIsEnumerable`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Expand `propertyIsEnumerable.js` with learner-facing examples.
- [x] Add paired `propertyIsEnumerable.md` teaching note.
- [x] Cover own enumerable properties, non-enumerable own properties, inherited
  properties, symbol keys, arrays, null-prototype objects, and descriptor-based
  checks.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js`.
- [x] Run `node --check src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/instance/toLocaleString/toLocaleString.js
```
