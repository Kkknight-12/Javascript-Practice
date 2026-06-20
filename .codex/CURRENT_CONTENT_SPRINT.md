# Current Content Sprint

## Active Story

### JS-CONTENT-001O: Review Array Filter Pair

As the repo owner, I want the `Array.prototype.filter()` learning page to be
clear, beginner-friendly, deterministic in the terminal, and useful as a
high-quality JavaScript array-method page. Future website reuse is secondary and
not part of the current sprint.

## Current Folder

```text
src/array/methods/instance/filter/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/filter/filter.md
```

Paired runnable example:

```text
src/array/methods/instance/filter/filter.js
```

## Starting Point

- `filter.js` already existed directly under `src/array/methods/instance/`.
- The old file contained a scratch custom filter helper and unrelated selection
  sort notes.
- A separate custom filter practice already exists under
  `src/array/methods/instance/prototype/practice/custom-filter/`.
- `map-filter.js` still exists for the later filtering plus mapping chain page,
  so this page keeps the map comparison short and focused.
- The reviewed pair now lives in `src/array/methods/instance/filter/` so the
  method has its own folder.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
```

Key points to teach:

- `filter()` creates a new shallow-copy array of elements that pass the callback
  test.
- The callback should return truthy to keep an element and falsy to skip it.
- The callback receives `element`, `index`, and `array`.
- The callback result decides keep/skip; it is not placed into the result array.
- If no elements pass, `filter()` returns an empty array.
- `filter()` does not mutate the original array.
- Kept objects are shared references because the result is shallow.
- Empty slots in sparse arrays are skipped.
- `thisArg` can be passed as the second argument.
- `filter()` is generic and can work on array-like objects.

## Sprint 1: Review Array Filter Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Confirm the next unchecked array page is `filter.js`.
- [x] Review existing `filter.js`.
- [x] Check nearby custom-filter and `map-filter.js` overlap.
- [x] Cross-check key behavior against MDN.
- [x] Move the reviewed pair into `src/array/methods/instance/filter/`.
- [x] Rewrite `filter.js` using the runnable JS teaching pattern.
- [x] Create `filter.md` using the repo study-note teaching pattern.
- [x] Cover keep/skip behavior, return value, no mutation, shallow copy,
  callback arguments, `thisArg`, sparse arrays, `filter()` vs `find()`,
  `filter()` vs `map()`, generic behavior, and async callback gotcha.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/instance/filter/`.
- [x] Confirm this page does not duplicate the custom-filter practice page.
- [x] Confirm this page does not fully duplicate the later `map-filter.js` page.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/instance/find-some.js
```
