# Current Content Sprint

## Active Story

### JS-CONTENT-001F: Review Basic Array Loop Pair

As the repo owner, I want the basic array loop explanation and runnable example
to be clear, beginner-friendly, and useful for terminal practice in this repo.
Future website reuse is secondary and not part of the current sprint.

## Current Folder

```text
src/array/loop/
```

## Current Files

Primary explanation:

```text
src/array/loop/basic-loop.md
```

Paired runnable example:

```text
src/array/loop/basic-loop.js
```

## Starting Point

- The `.js` file already existed.
- The `.js` file had scratch-style examples.
- The `.js` file mixed array loop examples with an unfinished object recursion
  stub.
- There was no paired `.md` study note.
- This page compares basic ways to loop over arrays.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
```

Key points to teach:

- A `for` loop is best when you need an index or full loop control.
- `for...of` reads values from an iterable like an array.
- `array.entries()` is useful when you need index and value together.
- `forEach()` is useful for side effects, but it cannot be stopped with normal
  `break` or `continue`.
- `forEach()` expects synchronous callbacks and does not wait for promises.
- `for...in` reads property names, so it is usually the wrong choice for array
  values.

## Sprint 1: Review Basic Array Loop Pair

Status: complete

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Rewrite `basic-loop.js` using the runnable JS teaching pattern.
- [x] Create `basic-loop.md` using the repo study-note teaching pattern.
- [x] Include common mistakes and gotchas: `for...in` on arrays, `forEach()`
  with `break`, `forEach()` with async callbacks, and when to use `entries()`.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/loop/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/loop/for-await-of/for-await-of.js
```
