# Current Content Sprint

## Active Story

### JS-CONTENT-001BD: Review Object.keys

As a learner, I want to understand `Object.keys()` as the method for reading an
object's own enumerable string-keyed property names, so I can choose it correctly
when looping over objects or comparing key-reading methods.

## Current Folder

```text
src/object/methods/static-methods/keys/
```

## Current Files

```text
src/object/methods/static-methods/keys/keys.js
src/object/methods/static-methods/keys/keys.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/static-methods/keys.js`.
- The existing runnable file covered arrays, array-like objects, numeric key
  order, and one non-enumerable property example, but it did not yet have a
  paired study note.
- The reviewed page was moved into a method folder:
  `src/object/methods/static-methods/keys/`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.keys
```

Key facts:

- `Object.keys(object)` returns an array of strings.
- It returns own enumerable string-keyed property names.
- It skips inherited properties, non-enumerable properties, and symbol keys.
- Its order matches `for...in` for own properties, but `for...in` also includes
  the prototype chain.
- Numeric index keys come before other string keys in ascending numeric order.
- Non-object arguments are converted to objects.
- Strings return character index keys.
- Most other primitives return `[]`.
- `null` and `undefined` throw `TypeError`.

## Sprint 1: Review `Object.keys`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `keys/` so the paired `.js` and `.md` files
  live together.
- [x] Expand `keys.js` with learner-facing examples.
- [x] Add paired `keys.md` teaching note.
- [x] Cover own enumerable string keys, inherited property skipping,
  non-enumerable property skipping, symbol key skipping, arrays, sparse arrays,
  key order, null-prototype objects, primitives, `for...in` comparison, getter
  behavior, and `Object.keys().includes()` limitations.
- [x] Update the static-methods overview link.
- [x] Update the object-loop note link that pointed at the old loose `keys.js`.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/keys/keys.js`.
- [x] Run `node --check src/object/methods/static-methods/keys/keys.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/objectCreate/index.js
```
