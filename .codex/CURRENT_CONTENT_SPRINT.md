# Current Content Sprint

## Active Story

### JS-CONTENT-001P: Review Array Find And Some Pair

As the repo owner, I want the `Array.prototype.find()` plus
`Array.prototype.some()` comparison page to be clear, beginner-friendly,
deterministic in the terminal, and useful as a high-quality JavaScript
array-method page. Future website reuse is secondary and not part of the current
sprint.

## Current Folder

```text
src/array/methods/instance/find-some/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/find-some/find-some.md
```

Paired runnable example:

```text
src/array/methods/instance/find-some/find-some.js
```

## Starting Point

- `find-some.js` already existed directly under `src/array/methods/instance/`.
- The old file mixed a basic `find()` example, mutation inside a callback, and a
  basic `some()` example.
- The old page did not clearly separate the return values: `find()` returns a
  matching element, while `some()` returns a boolean.
- `entries-find/` already teaches `entries()` plus `find()`, so this page focuses
  on the `find()` vs `some()` comparison.
- `findIndex-indexOf.js` still exists for the later index-focused comparison.
- The reviewed pair now lives in `src/array/methods/instance/find-some/` so the
  comparison page has its own folder.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
```

Key points to teach:

- `find()` returns the first matching element.
- `find()` returns `undefined` when nothing matches.
- `some()` returns `true` when at least one element passes.
- `some()` returns `false` when nothing passes.
- Both methods stop after the first truthy callback result.
- The callback receives `element`, `index`, and `array`.
- Both methods support `thisArg`.
- Both methods are generic and can work on array-like objects.
- `find()` visits empty slots and treats them as `undefined`.
- `some()` skips empty slots.

## Sprint 1: Review Array Find And Some Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Confirm the next unchecked array page is `find-some.js`.
- [x] Review existing `find-some.js`.
- [x] Check nearby `entries-find/` and `findIndex-indexOf.js` overlap.
- [x] Cross-check key behavior against MDN pages for `find()` and `some()`.
- [x] Move the reviewed pair into `src/array/methods/instance/find-some/`.
- [x] Rewrite `find-some.js` using the runnable JS teaching pattern.
- [x] Create `find-some.md` using the repo study-note teaching pattern.
- [x] Cover return-value differences, early stop, object lookup, existence
  checks, falsy found values, empty arrays, sparse-array behavior, callback
  arguments, `thisArg`, and generic behavior.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/array/methods/instance/find-some/`.
- [x] Confirm this page does not duplicate the earlier `entries-find/` page.
- [x] Confirm this page does not fully duplicate the later
  `findIndex-indexOf.js` page.
- [x] Decide whether to commit this sprint.
- [x] Commit and push this sprint after user approval.

## Stop Point

This sprint is complete and approved. The next unchecked array page is:

```text
src/array/methods/instance/findIndex-indexOf.js
```
