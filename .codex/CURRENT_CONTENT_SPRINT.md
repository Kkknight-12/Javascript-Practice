# Current Content Sprint

## Active Story

### JS-CONTENT-001T: Review Array Includes Pair

As the repo owner, I want the `Array.prototype.includes()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/includes/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/includes/includes.md
```

Paired runnable example:

```text
src/array/methods/instance/includes/includes.js
```

## Starting Point

- `includes.js` already existed directly under `src/array/methods/instance/`.
- The old file showed basic boolean membership checks and generic array-like
  behavior.
- The old file did not clearly explain that `includes()` returns only a boolean,
  not an index or value.
- The old file did not cover `fromIndex`, negative `fromIndex`, `SameValueZero`,
  `NaN`, `0`/`-0`, object references, sparse arrays, empty arrays, or callback
  mistakes.
- `findIndex-indexOf/` already teaches index-returning search, so this page
  focuses on yes/no value membership.
- `find-some/` already teaches condition-based yes/no checks with `some()`, so
  this page explains why `includes()` is for exact values, not callbacks.
- The reviewed pair now lives in `src/array/methods/instance/includes/` so the
  method has its own folder.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.includes
```

Key points to teach:

- `includes()` returns `true` when the searched value is found.
- `includes()` returns `false` when the searched value is not found.
- `includes()` returns a boolean, not the element or index.
- `fromIndex` controls where the search starts.
- A negative `fromIndex` counts back from the end first, but the search still
  moves left to right.
- If `fromIndex` is greater than or equal to array length, the array is not
  searched and `false` is returned.
- `includes()` uses `SameValueZero` comparison.
- `includes()` can find `NaN`.
- `0` and `-0` are treated as equal.
- Objects are compared by reference.
- Sparse-array empty slots are treated like `undefined`.
- `includes()` is generic and can be called on array-like objects.

## Sprint 1: Review Array Includes Pair

Status: review

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Treat `flatMap/` as approved after user moved to `includes.js`.
- [x] Confirm the next requested array page is `includes.js`.
- [x] Review existing `includes.js`.
- [x] Check nearby `findIndex-indexOf/`, `find-some/`, and `flatMap/` pages for
  overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec for
  `includes()`.
- [x] Move the reviewed pair into `src/array/methods/instance/includes/`.
- [x] Rewrite `includes.js` using the runnable JS teaching pattern.
- [x] Create `includes.md` using the repo study-note teaching pattern.
- [x] Polish `includes.md` after review so it explicitly includes the standard
  `Syntax`, `Parameters`, `Return Value`, `Important Notes`, and
  `When To Use It` sections.
- [x] Cover boolean return, exact value search, string-vs-array `includes()`,
  no type coercion, `fromIndex`, negative `fromIndex`, `SameValueZero`, `NaN`,
  `0`/`-0`, object references, `some()` comparison, empty arrays, sparse arrays,
  and generic behavior.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Add a Codex memory update to require a post-draft note-format check.
- [x] Audit existing `.md` notes for the same heading-format gaps.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/instance/includes/`.
- [x] Confirm this page stays distinct from earlier `findIndex-indexOf/` and
  `find-some/`.
- [x] Confirm `includes.md` now follows the documented study-note format more
  closely than the first draft.
- [ ] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked array page is:

```text
src/array/methods/instance/Symbol.iterator.js
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
