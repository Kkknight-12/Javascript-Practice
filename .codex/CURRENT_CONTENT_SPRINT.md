# Current Content Sprint

## Active Story

### JS-CONTENT-001N: Review Array Fill Pair

As the repo owner, I want the `Array.prototype.fill()` learning page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/fill/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/fill/fill.md
```

Paired runnable example:

```text
src/array/methods/instance/fill/fill.js
```

## Starting Point

- `fill.js` already existed directly under `src/array/methods/instance/`.
- The old file showed the basic MDN-style examples for full fill, `start`, and
  `end`.
- There was no paired `fill.md` study note.
- The old file did not explain mutation, same-array return, negative indexes,
  empty arrays, sparse arrays, object references, matrix row sharing, or generic
  behavior.
- The reviewed pair now lives in `src/array/methods/instance/fill/` so the
  method has its own folder.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
```

Key points to teach:

- `fill()` changes the contents of the original array.
- It returns the modified same array.
- Syntax is `fill(value)`, `fill(value, start)`, and
  `fill(value, start, end)`.
- `start` is included.
- `end` is excluded.
- Negative `start` and `end` values count backward from the end.
- If `start` is beyond the array length, nothing is filled.
- If `end` is before or equal to `start`, nothing is filled.
- `fill()` cannot add length to an empty array.
- `fill()` fills empty slots in sparse arrays.
- If `value` is an object, every filled slot receives the same object reference.
- `fill()` is generic and can work on array-like objects.

## Sprint 1: Review Array Fill Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Confirm the next unchecked array page is `fill.js`.
- [x] Review existing `fill.js`.
- [x] Cross-check key behavior against MDN.
- [x] Move the reviewed pair into `src/array/methods/instance/fill/`.
- [x] Rewrite `fill.js` using the runnable JS teaching pattern.
- [x] Create `fill.md` using the repo study-note teaching pattern.
- [x] Cover mutation, same-array return, `start`, `end`, negative indexes, no-op
  ranges, empty arrays, sparse arrays, object references, matrix rows, and
  generic behavior.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/instance/fill/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/instance/filter.js
```
