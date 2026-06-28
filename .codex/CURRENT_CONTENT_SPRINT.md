# Current Content Sprint

## Active Story

### JS-CONTENT-001Y: Review Array Slice Pair

As the repo owner, I want the `Array.prototype.slice()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/slice/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/slice/slice.md
```

Paired runnable example:

```text
src/array/methods/instance/slice/slice.js
```

## Starting Point

- `slice.js` already existed directly under
  `src/array/methods/instance/`.
- The old file correctly showed basic `start` / `end` examples and a common
  remove-with-copy pattern.
- The old file used scratch-style variable names and did not explain why the end
  index is excluded.
- The old file did not cover no-argument shallow copy, negative indexes,
  out-of-range indexes, fractional indexes, sparse arrays, generic array-like
  behavior, shallow object references, or the `slice()` / `splice()` contrast.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.slice
```

Key points to teach:

- `slice()` returns a shallow copy of a selected portion of an array.
- It does not mutate the original array.
- The `start` index is included.
- The `end` index is excluded.
- Omitting `end` copies through the end of the array.
- Negative indexes count from the end.
- Out-of-range indexes are clamped into the valid range.
- Empty slots in sparse arrays are preserved.
- `slice()` is generic and can be borrowed for array-like objects.

## Sprint 1: Review Array Slice Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` and `reduce/reduce.md` out of this sprint.
- [x] Commit and push the approved `reverse/` batch first.
- [x] Treat `reverse/` as committed and choose the next unchecked array page.
- [x] Confirm the next requested array page is `slice.js`.
- [x] Review existing `slice.js`.
- [x] Check nearby copying/mutating method pages for overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec for
  `slice()`.
- [x] Move the reviewed pair into `src/array/methods/instance/slice/`.
- [x] Rewrite `slice.js` using the runnable JS teaching pattern.
- [x] Create `slice.md` using the repo study-note teaching pattern.
- [x] Polish `slice.md` with a second note-format review.
- [x] Cover shallow copy, no mutation, excluded end index, no-argument copy,
  negative indexes, out-of-range indexes, fractional indexes, sparse arrays,
  generic behavior, and comparison with `splice()`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/array/methods/instance/slice/`.
- [x] Confirm this page stays distinct from later `splice()` and existing
  copying-method notes.
- [x] Confirm `slice.md` uses the documented study-note format as a
  flexible quality checklist.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked array page is:

```text
src/array/methods/instance/sort.js
```

## Note Quality Cleanup

Current cleanup pass:

```text
src/array/methods/instance/concat/concat.md
```

Status: review

Checklist:

- [x] Compare the page against the topic itself, MDN, and the flexible
  `Array.from` quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the existing content scope because the explanation is already strong.
- [x] Add natural `Parameters`, `Return Value`, and `When To Use It` sections
  because they improve scanability for `concat()`.
- [x] Avoid forcing artificial sections or changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current cleanup pass:

```text
src/array/methods/instance/entries-find/entries-find.md
```

Status: review

Checklist:

- [x] Compare the page against the topic itself, MDN, the paired runnable file,
  and the flexible `Array.from` quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the combined-topic structure because this page teaches
  `entries()` first, `find()` second, then the combined pattern.
- [x] Add natural `Quick Definition`, `Syntax`, `Parameters`, `Return Value`,
  and `When To Use It` sections because they improve scanability for this
  specific topic.
- [x] Avoid forcing artificial sections or changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current cleanup pass:

```text
src/array/methods/instance/every/every.md
```

Status: review

Checklist:

- [x] Compare the page against the topic itself, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the existing explanation scope because the page already teaches empty
  arrays, sparse arrays, real `undefined`, `thisArg`, generic behavior, and the
  async callback gotcha well.
- [x] Add natural `Syntax`, `Parameters`, `Return Value`, and `When To Use It`
  sections because they improve scanability for this topic.
- [x] Add the ECMAScript spec reference beside MDN.
- [x] Avoid forcing artificial sections or changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current cleanup pass:

```text
src/array/methods/instance/fill/fill.md
```

Status: review

Checklist:

- [x] Compare the page against the topic itself, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the existing explanation scope because the page already teaches
  mutation, same-array return, ranges, empty arrays, sparse arrays, shared
  references, matrix rows, and generic behavior well.
- [x] Add natural `Parameters`, `Return Value`, and `When To Use It` sections
  because they improve scanability for this topic.
- [x] Add the ECMAScript spec reference beside MDN.
- [x] Avoid forcing artificial sections or changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current cleanup pass:

```text
src/array/methods/instance/filter/filter.md
```

Status: review

Checklist:

- [x] Compare the page against the topic itself, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the existing explanation scope because the page already teaches
  keep/skip behavior, shallow result arrays, callback arguments, `thisArg`,
  sparse arrays, comparisons with `find()`/`map()`, generic behavior, and async
  callback gotcha well.
- [x] Add natural `Syntax`, `Parameters`, `Return Value`, and `When To Use It`
  sections because they improve scanability for this topic.
- [x] Add the ECMAScript spec reference beside MDN.
- [x] Avoid forcing artificial sections or changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current cleanup pass:

```text
src/array/methods/instance/find-some/find-some.md
```

Status: review

Checklist:

- [x] Compare the combined page against the topics themselves, MDN, the
  ECMAScript spec, the paired runnable file, and the flexible `Array.from`
  quality baseline.
- [x] Decide whether the page actually needs structural polish.
- [x] Keep the combined structure because the page teaches `find()` and
  `some()` by contrasting their return values and use cases.
- [x] Add natural `Syntax`, `Parameters`, `Return Value`, and `When To Use It`
  sections because they improve scanability for this comparison topic.
- [x] Tighten duplicate return wording so `find()` and `some()` return behavior
  is summarized once, then reinforced through examples.
- [x] Add ECMAScript spec references beside MDN.
- [x] Avoid changing the runnable `.js` file.
- [x] Run verification after the polish.
- [ ] Decide whether to commit this cleanup with the current content batch.

Current doubt note:

```text
src/array/methods/instance/includes/doubt/same-value-zero.md
```

Status: review

Checklist:

- [x] Keep the deeper SameValueZero explanation outside `includes.md`.
- [x] Explain SameValueZero as an internal equality algorithm.
- [x] Cover `NaN`, `0`/`-0`, no type coercion, object references,
  `===`, and `Object.is()`.
- [x] Add trusted references.
- [ ] Decide whether to commit this doubt note.
