# Current Content Sprint

## Active Story

### JS-CONTENT-001Z: Review Array Sort Pair

As the repo owner, I want the `Array.prototype.sort()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/sort/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/sort/sort.md
```

Paired runnable example:

```text
src/array/methods/instance/sort/sort.js
```

## Starting Point

- `sort.js` already existed directly under
  `src/array/methods/instance/`.
- The old file had a useful comparator contract comment and object-sorting
  examples.
- The old file mixed `sort()` with unrelated higher-order function and prototype
  scratch experiments.
- The old file did not clearly teach mutation, same-reference return, default
  string sorting, numeric compare functions, stable sort, `toSorted()`, sparse
  arrays, `undefined`, generic array-like behavior, or well-formed compare
  functions.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort
```

Key points to teach:

- `sort()` sorts array elements in place.
- It returns the same array object.
- Without `compareFn`, values are converted to strings and sorted by character
  order.
- For numbers, `(a, b) => a - b` sorts ascending and `(a, b) => b - a` sorts
  descending.
- Modern JavaScript `sort()` is stable.
- `toSorted()` returns a sorted shallow copy and does not mutate the original.
- `undefined` values move after defined values.
- Empty slots move to the end and remain empty slots.
- `sort()` is generic and can be borrowed for array-like objects.

## Sprint 1: Review Array Sort Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` and `reduce/reduce.md` out of this sprint.
- [x] Commit and push the approved `slice/` batch first.
- [x] Treat `slice/` as committed and choose the next unchecked array page.
- [x] Confirm the next requested array page is `sort.js`.
- [x] Review existing `sort.js`.
- [x] Check nearby custom sort practice and recent mutating/copying method pages
  for overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec for
  `sort()`.
- [x] Move the reviewed pair into `src/array/methods/instance/sort/`.
- [x] Rewrite `sort.js` using the runnable JS teaching pattern.
- [x] Create `sort.md` using the repo study-note teaching pattern.
- [x] Polish `sort.md` with a second note-format review.
- [x] Cover mutation, same-reference return, default string sort, numeric
  compare functions, object sorting, stable sort, `toSorted()`, shallow copies,
  `undefined`, sparse arrays, generic behavior, and compare function mistakes.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/array/methods/instance/sort/`.
- [x] Confirm this page stays distinct from custom sort implementation practice.
- [x] Confirm `sort.md` uses the documented study-note format as a
  flexible quality checklist.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked array page is:

```text
src/array/methods/instance/splice.js
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
