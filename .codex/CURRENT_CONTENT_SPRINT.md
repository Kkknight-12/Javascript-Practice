# Current Content Sprint

## Active Story

### JS-CONTENT-001AY: Review Object static methods overview

As a learner, I want a clear overview of `Object` static methods, so I can
understand which method family solves which object problem before reading the
individual method pages.

## Current Folder

```text
src/object/methods/static-methods/
```

## Current Files

```text
src/object/methods/static-methods/index.js
src/object/methods/static-methods/index.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/index.js`.
- The existing file mixed several short examples, included an instance method
  (`hasOwnProperty`) inside the static-method overview, and did not explain the
  method families clearly.
- This page stays at the static-methods folder root because it is an overview,
  not one specific method page.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object-constructor
```

Key facts:

- `Object` static methods are called from `Object`, usually with the target
  object passed as an argument.
- Modern object utilities are mostly static methods.
- Static methods are safer for null-prototype objects because the method does
  not need to be inherited from the object being inspected.
- Property-reading methods differ by own vs inherited, enumerable vs
  non-enumerable, and string vs symbol coverage.
- Descriptor methods explain property settings, not just property values.
- Integrity methods have action/check pairs such as `freeze()` /
  `isFrozen()`.
- `Reflect.ownKeys()` is not an `Object` method, but it is the useful companion
  when all own string and symbol keys are needed.

## Sprint 1: Review `Object` static methods overview

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Keep `index.js` at the static-methods folder root because it is an
  overview page.
- [x] Rewrite `index.js` as a runnable overview of static method families.
- [x] Add paired `index.md` teaching note.
- [x] Cover static-vs-instance methods, null-prototype safety, property-reading
  coverage, descriptors, creation/conversion, prototypes, ownership,
  comparison, integrity methods, and related detail-page links.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/index.js`.
- [x] Run `node --check src/object/methods/static-methods/index.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/is.js
```
