# Current Content Sprint

## Active Story

### JS-CONTENT-001M: Review Array Every Pair

As the repo owner, I want the `Array.prototype.every()` learning page to be
clear, beginner-friendly, deterministic in the terminal, and useful as a
high-quality JavaScript array-method page. Future website reuse is secondary and
not part of the current sprint.

## Current Folder

```text
src/array/methods/instance/every/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/every/every.md
```

Paired runnable example:

```text
src/array/methods/instance/every/every.js
```

Topic doubt note:

```text
src/array/methods/instance/every/doubt/doubt.md
```

## Starting Point

- `every.js` already existed directly under `src/array/methods/instance/`.
- The old file only showed two basic boolean examples.
- There was no paired `every.md` study note.
- The reviewed pair now lives in `src/array/methods/instance/every/` so the
  method has its own folder.
- `find-some.js` still exists for the later `find()` vs `some()` comparison, so
  this page keeps the `some()` comparison short and focused.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
```

Key points to teach:

- `every()` returns a boolean.
- It returns `false` when it finds an element that does not satisfy the callback.
- It returns `true` when all checked elements satisfy the callback.
- It stops immediately after the first falsy callback result.
- Empty arrays return `true`.
- Empty slots in sparse arrays are skipped.
- Real `undefined` values are still visited.
- The callback receives `element`, `index`, and `array`.
- `thisArg` can be passed as the second argument.
- `every()` is generic and can work on array-like objects.

## Sprint 1: Review Array Every Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Confirm the next unchecked array page is `every.js`.
- [x] Review existing `every.js`.
- [x] Cross-check key behavior against MDN.
- [x] Move the reviewed pair into `src/array/methods/instance/every/`.
- [x] Rewrite `every.js` using the runnable JS teaching pattern.
- [x] Create `every.md` using the repo study-note teaching pattern.
- [x] Cover boolean return behavior, early stop, empty arrays, sparse arrays,
  real `undefined`, callback arguments, `thisArg`, subset checks, generic
  behavior, and async callback gotcha.
- [x] Add topic-level doubt notes explaining why `results.every(Boolean)` works
  after `Promise.all()` and why empty arrays return `true`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/instance/every/`.
- [x] Confirm the doubt note belongs beside the `every()` page.
- [x] Confirm this page does not fully duplicate the later `find-some.js` page.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/instance/fill.js
```
