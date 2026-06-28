# Current Content Sprint

## Active Story

### JS-CONTENT-001X: Review Array Reverse Pair

As the repo owner, I want the `Array.prototype.reverse()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/reverse/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/reverse/reverse.md
```

Paired runnable example:

```text
src/array/methods/instance/reverse/reverse.js
```

## Starting Point

- `reverse.js` already existed directly under
  `src/array/methods/instance/`.
- The old file correctly mentioned mutation and same-reference return.
- The old file used semicolons and scratch-style comments unlike the current
  reviewed pages.
- The old file did not cover `toReversed()`, copying with spread/`Array.from()`,
  sparse arrays, generic array-like behavior, object reference behavior, or
  comparison with sorting/iteration.
- Node in this repo supports `toReversed()`, so the runnable page can show the
  modern copying method directly.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.reverse
```

Key points to teach:

- `reverse()` reverses array elements in place.
- It returns the same array object.
- Mutating the returned value mutates the original because they are the same
  reference.
- `reverse()` takes no parameters.
- `toReversed()` returns a reversed shallow copy and does not mutate the
  original.
- `[...array].reverse()` and `Array.from(array).reverse()` are copy-first
  alternatives.
- `reverse()` preserves empty slots in sparse arrays.
- `reverse()` is generic and can be borrowed for array-like objects.

## Sprint 1: Review Array Reverse Pair

Status: complete

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` out of this sprint.
- [x] Commit and push the approved `map-filter/` and `reduce/` batch first.
- [x] Treat `reduce/` as committed and choose the next unchecked array page.
- [x] Confirm the next requested array page is `reverse.js`.
- [x] Review existing `reverse.js`.
- [x] Check nearby mutating/copying method pages for
  overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec for
  `reverse()`.
- [x] Move the reviewed pair into `src/array/methods/instance/reverse/`.
- [x] Rewrite `reverse.js` using the runnable JS teaching pattern.
- [x] Create `reverse.md` using the repo study-note teaching pattern.
- [x] Polish `reverse.md` with a second note-format review.
- [x] Cover mutation, same-reference return, object references, copying with
  `toReversed()` / spread / `Array.from()`, sparse arrays, generic behavior,
  and comparison with `sort()`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/array/methods/instance/reverse/`.
- [x] Confirm this page stays distinct from later `sort()` and existing
  copying-method notes.
- [x] Confirm `reverse.md` uses the documented study-note format as a
  flexible quality checklist.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked array page is:

```text
src/array/methods/instance/slice.js
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
