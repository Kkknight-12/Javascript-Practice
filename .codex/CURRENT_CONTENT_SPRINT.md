# Current Content Sprint

## Active Story

### JS-CONTENT-001AA: Review Array Splice Pair

As the repo owner, I want the `Array.prototype.splice()` page to be clear,
beginner-friendly, deterministic in the terminal, and useful as a high-quality
JavaScript array-method page. Future website reuse is secondary and not part of
the current sprint.

## Current Folder

```text
src/array/methods/instance/splice/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/splice/splice.md
```

Paired runnable example:

```text
src/array/methods/instance/splice/splice.js
```

## Starting Point

- `splice.js` already existed directly under
  `src/array/methods/instance/`.
- The old file correctly said `splice()` mutates the original array.
- The old file had examples for removing, inserting, and replacing items.
- The first runnable example used `str` before declaring it.
- The old file did not cover omitted arguments, negative indexes, `Infinity`
  delete count, `toSpliced()`, shallow copy behavior, sparse arrays, generic
  array-like behavior, or the `splice()` / `slice()` contrast.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.splice
```

Key points to teach:

- `splice()` mutates the original array.
- It returns a new array containing removed items.
- It can remove, insert, and replace items.
- Omitting `deleteCount` removes from `start` to the end.
- `deleteCount` `0` inserts without deleting.
- Negative `start` counts from the end.
- `toSpliced()` returns an updated shallow copy and does not mutate the original.
- `splice()` preserves empty slots in sparse arrays.
- `toSpliced()` returns a dense array.
- `splice()` is generic and can be borrowed for array-like objects.

## Sprint 1: Review Array Splice Pair

Status: review

Checklist:

- [x] Confirm current Git status before starting and keep unrelated
  `src/playground/del.js` and `reduce/reduce.md` out of this sprint.
- [x] Treat `sort/` as committed and choose the next unchecked array page.
- [x] Confirm the next requested array page is `splice.js`.
- [x] Review existing `splice.js`.
- [x] Check nearby `slice/`, `sort/`, and copying-method pages for overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec for
  `splice()`.
- [x] Move the reviewed pair into `src/array/methods/instance/splice/`.
- [x] Rewrite `splice.js` using the runnable JS teaching pattern.
- [x] Create `splice.md` using the repo study-note teaching pattern.
- [x] Polish `splice.md` with a second note-format review.
- [x] Cover mutation, removed-item return value, remove/insert/replace patterns,
  omitted arguments, negative indexes, `Infinity` delete count, `toSpliced()`,
  shallow copies, sparse arrays, generic behavior, and comparison with `slice()`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/array/methods/instance/splice/`.
- [x] Confirm this page stays distinct from `slice/` and modern `toSpliced()`
  copy-safe behavior.
- [x] Confirm `splice.md` uses the documented study-note format as a
  flexible quality checklist.
- [ ] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked array page is:

```text
src/array/questions/flatten.js
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
