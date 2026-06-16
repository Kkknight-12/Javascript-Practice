# Current Content Sprint

## Active Story

### JS-CONTENT-001E: Review Array Creation Shortcuts Pair

As the repo owner, I want the array creation shortcut explanation and runnable
example to be clear, beginner-friendly, and useful for terminal practice in this
repo. Future website reuse is secondary and not part of the current sprint.

## Current Folder

```text
src/array/creation/
```

## Current Files

Primary explanation:

```text
src/array/creation/create-array-shortcuts.md
```

Paired runnable example:

```text
src/array/creation/create-array-shortcuts.js
```

## Starting Point

- The `.js` file already existed.
- The `.js` file had scratch-style examples and a blog link.
- There was no paired `.md` study note.
- This page is a topic page, not one single method page, because it compares
  several ways to create arrays.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
```

Key points to teach:

- Array literals are the clearest choice when values are known.
- `Array()` and `new Array()` both create arrays.
- `new Array(number)` creates empty slots, not real `undefined` values.
- `Array.of(number)` creates an array containing that number.
- Spread can turn empty slots into actual `undefined` values.
- `Array.from({ length }, mapFn)` is useful for ranges and calculated values.
- `fill(primitive)` is useful, but `fill(object)` reuses the same object
  reference in every position.

## Sprint 1: Review Array Creation Shortcuts Pair

Status: complete

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Rewrite `create-array-shortcuts.js` using the runnable JS teaching pattern.
- [x] Create `create-array-shortcuts.md` using the repo study-note teaching
  pattern.
- [x] Include common mistakes and gotchas: `Array(3)`, empty slots,
  `Array.of(3)`, spread, `Array.from()`, and `fill(object)` references.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/creation/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/loop/basic-loop.js
```
