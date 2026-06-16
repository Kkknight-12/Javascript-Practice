# Current Content Sprint

## Active Story

### JS-CONTENT-001H: Review For...Of Pair

As the repo owner, I want the `for...of` explanation and runnable example to be
clear, beginner-friendly, deterministic in the terminal, and useful for
JavaScript iteration practice. Future website reuse is secondary and not part
of the current sprint.

## Current Folder

```text
src/array/loop/for-of/
```

## Current Files

Primary explanation:

```text
src/array/loop/for-of/notes.md
```

Paired runnable example:

```text
src/array/loop/for-of/for-of.js
```

## Starting Point

- Both files already existed.
- The `.js` file had many useful examples, but the file name used underscore
  casing and the explanation was scratch-style.
- The `.md` file explained the concept but did not yet follow the current repo
  study-note pattern.
- This page teaches sync iteration over iterable values.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
```

Key points to teach:

- `for...of` loops over values from iterable objects.
- Arrays, strings, maps, sets, typed arrays, arguments objects, generators, and
  custom iterables can be used with `for...of`.
- Plain objects are not iterable by default.
- `for...of` calls `Symbol.iterator()` and then repeatedly calls `next()`.
- If the loop exits early, iterator cleanup can run through `return()`.
- Use `Object.entries()` when you want object key-value pairs.

## Sprint 1: Review For...Of Pair

Status: complete

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Rename `for_of.js` to `for-of.js` using the repo naming pattern.
- [x] Rewrite `for-of.js` using the runnable JS teaching pattern.
- [x] Rewrite `notes.md` using the repo study-note teaching pattern.
- [x] Include common mistakes and gotchas: plain objects, index confusion,
  `for...in` comparison, custom iterables, and cleanup on `break`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/loop/for-of/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/constructor/constructor.js
```
