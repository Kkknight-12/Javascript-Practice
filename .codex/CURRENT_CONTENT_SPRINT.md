# Current Content Sprint

## Active Story

### JS-CONTENT-001R: Review Array Flat Pair

As the repo owner, I want the `Array.prototype.flat()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/flat/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/flat/flat.md
```

Paired runnable example:

```text
src/array/methods/instance/flat/flat.js
```

## Starting Point

- `flat.js` already existed directly under `src/array/methods/instance/`.
- The old file showed default depth, custom depth, `Infinity`, and one shallow
  copy experiment.
- The old file had useful examples, but the explanation was not organized into
  the current learner-facing `.js` plus `.md` pattern.
- The old file mixed `flat()` teaching with a general spread-copy example that
  did not directly use `flat()`.
- `concat/` already teaches joining arrays and shallow-copy behavior, so this
  page compares with `concat()` only briefly.
- `flatMap.js` still exists for the next page, so this page only introduces
  `flatMap()` at a high level.
- The reviewed pair now lives in `src/array/methods/instance/flat/` so the
  method has its own folder.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
```

Key points to teach:

- `flat()` creates a new array by concatenating sub-array elements recursively
  up to the specified depth.
- The default depth is `1`.
- `flat(2)` opens two nested array levels.
- `flat(Infinity)` opens all nested array levels.
- `flat()` is a copying method and does not mutate the original array.
- The returned array is a shallow copy, so object references are shared.
- `flat()` removes empty slots at the root and at flattened levels.
- Empty slots deeper than the chosen depth stay inside nested arrays that were
  not opened yet.
- `flat()` is generic and can be called on array-like objects.
- `flat()` only flattens real arrays, not array-like objects stored as values.

## Sprint 1: Review Array Flat Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Treat `findIndex-indexOf/` as approved after user review.
- [x] Confirm the next unchecked array page is `flat.js`.
- [x] Review existing `flat.js`.
- [x] Check nearby `concat/` and `flatMap.js` pages for overlap.
- [x] Cross-check key behavior against MDN for `flat()`.
- [x] Move the reviewed pair into `src/array/methods/instance/flat/`.
- [x] Rewrite `flat.js` using the runnable JS teaching pattern.
- [x] Create `flat.md` using the repo study-note teaching pattern.
- [x] Cover default depth, custom depth, `Infinity`, depth `0`, non-mutation,
  shallow copy, sparse arrays, generic behavior, array-like values,
  `concat()` comparison, and `flatMap()` boundary.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/instance/flat/`.
- [x] Confirm this page stays distinct from earlier `concat/` and later
  `flatMap.js`.
- [x] Decide whether to commit this sprint.
- [x] Commit and push this sprint after user approval.

## Stop Point

This sprint is complete and approved. The next unchecked array page is:

```text
src/array/methods/instance/flatMap.js
```
