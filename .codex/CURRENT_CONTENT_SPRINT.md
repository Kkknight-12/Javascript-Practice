# Current Content Sprint

## Active Story

### JS-CONTENT-001I: Review Array Constructor Pair

As the repo owner, I want the `Array()` constructor explanation and runnable
example to be clear, beginner-friendly, deterministic in the terminal, and
useful for JavaScript array creation practice. Future website reuse is secondary
and not part of the current sprint.

## Current Folder

```text
src/array/methods/constructor/
```

## Current Files

Primary explanation:

```text
src/array/methods/constructor/constructor.md
```

Paired runnable example:

```text
src/array/methods/constructor/constructor.js
```

## Starting Point

- The `.js` file already existed.
- The `.js` file had useful starting examples, but the explanation was
  scratch-style and did not fully explain empty slots.
- There was no paired `.md` study note.
- This page teaches `Array()` / `new Array()` constructor behavior.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array
```

Key points to teach:

- `Array()` can be called with or without `new`.
- Both forms create a new `Array` instance.
- No arguments creates an empty array.
- One number argument creates an array with that length and empty slots.
- One non-number argument creates an array with that one element.
- Multiple arguments become normal elements.
- Invalid single numeric lengths throw `RangeError`.

## Sprint 1: Review Array Constructor Pair

Status: complete

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Rewrite `constructor.js` using the runnable JS teaching pattern.
- [x] Create `constructor.md` using the repo study-note teaching pattern.
- [x] Include common mistakes and gotchas: single number argument, empty slots,
  single non-number argument, multiple arguments, invalid length, and safer
  everyday choices.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/constructor/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/instance/array.prototype.js
```
