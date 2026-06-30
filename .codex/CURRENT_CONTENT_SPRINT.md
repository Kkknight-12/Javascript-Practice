# Current Content Sprint

## Active Story

### JS-CONTENT-001AD: Add Missing Object Method Files

As the repo owner, I want the object method inventory to include the important
standard Object static and prototype methods so future review work does not miss
core APIs. Future website reuse is secondary and not part of the current
sprint.

## Current Folder

```text
src/object/methods/
```

## Current Files

Added static method runnable files:

```text
src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js
src/object/methods/static-methods/isExtensible/isExtensible.js
src/object/methods/static-methods/isFrozen/isFrozen.js
src/object/methods/static-methods/isSealed/isSealed.js
```

Added instance/prototype method runnable files:

```text
src/object/methods/instance/hasOwnProperty/hasOwnProperty.js
src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js
src/object/methods/instance/toLocaleString/toLocaleString.js
src/object/methods/instance/toString/toString.js
src/object/methods/instance/valueOf/valueOf.js
```

## Starting Point

- `Object.hasOwn()` and the key-existence concept page were reviewed and moved
  into their correct concept/static-method buckets.
- The object method inventory still missed several important standard Object
  APIs.
- Existing unrelated dirty files were present:
  `src/array/questions/flatten.js` and `src/playground/del.js`.
- The user asked to add the missing method files, not to fully review each new
  method page yet.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
```

Missing important static methods added:

- `Object.getOwnPropertySymbols()`
- `Object.isExtensible()`
- `Object.isFrozen()`
- `Object.isSealed()`

Missing important instance/prototype methods added:

- `Object.prototype.hasOwnProperty()`
- `Object.prototype.propertyIsEnumerable()`
- `Object.prototype.toLocaleString()`
- `Object.prototype.toString()`
- `Object.prototype.valueOf()`

Deprecated prototype methods were intentionally not added to the main learning
path.

## Sprint 1: Add Missing Object Method Files

Status: review

Checklist:

- [x] Confirm current Git status before starting and leave unrelated
  `src/array/questions/flatten.js` and `src/playground/del.js` out of this
  sprint.
- [x] Check current object method inventory under `src/object/methods/`.
- [x] Cross-check important Object APIs against MDN's Object reference.
- [x] Add missing static method runnable files under
  `src/object/methods/static-methods/`.
- [x] Add missing instance/prototype method runnable files under
  `src/object/methods/instance/`.
- [x] Add each new file to `.codex/CONTENT_REVIEW_TRACKER.md` as unchecked
  future review work.
- [x] Run each new `.js` file with Node.
- [x] Run `node --check` for each new `.js` file.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm each new method file is in the right static/instance bucket.
- [x] Confirm the new files are learner-facing enough to run immediately.
- [x] Confirm the tracker does not mark these files reviewed yet.
- [ ] Decide whether to commit this inventory sprint.

## Stop Point

This inventory sprint is ready for review. The next unchecked object review page is:

```text
src/object/loop-through-object/for-loop.js
```
