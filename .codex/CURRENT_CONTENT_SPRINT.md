# Current Content Sprint

## Active Story

### JS-CONTENT-001C: Create Array.isArray Static Method Pair

As the repo owner, I want the `Array.isArray()` explanation and runnable example
to be clear, beginner-friendly, and useful for terminal practice in this repo.
Future website reuse is secondary and not part of the current sprint.

## Current Folder

```text
src/array/methods/static/Array.isArray/
```

## Current Files

Primary explanation:

```text
src/array/methods/static/Array.isArray/notes.md
```

Paired runnable example:

```text
src/array/methods/static/Array.isArray/Array.isArray.js
```

## Current Starting Point

- Both files already exist.
- Both files are currently empty.
- `visual_notes/` exists locally in this folder, but PNGs and `visual_notes/`
  are ignored and should not be pushed to GitHub.
- Before writing this page, loose files under `src/array/methods/` were checked:
  instance methods were moved to `instance/`, static methods stayed in
  `static/`, and the Array constructor lesson moved to `constructor/`.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
```

Key points to teach:

- `Array.isArray(value)` is a static method.
- It returns `true` when `value` is an actual array.
- It returns `false` for non-arrays such as strings, objects, numbers, `null`,
  `undefined`, booleans, and typed arrays.
- `Array.isArray(new Array(5))` is `true`.
- `Array.isArray(new Int16Array([15, 33]))` is `false`.
- It is preferred over `instanceof Array` for array checks because it is more
  reliable across realms such as iframes.
- A tricky edge case: `Array.isArray(Array.prototype)` returns `true`.

## Why This File Next

- It is the next static array method after `Array.from()`.
- It has the same paired `.md` plus runnable `.js` shape.
- It is small enough to use as the second page in the new teaching pattern.
- It helps reinforce the difference between static and instance methods.

## Sprint 1: Create Array.isArray Pair

Status: active

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Confirm the previous `Array.from()` sprint is committed.
- [x] Confirm the `Array.isArray()` files exist.
- [x] Confirm the files are currently empty.
- [x] Cross-check key behavior against MDN.
- [x] Check and normalize array method folder placement.
- [ ] Compare teaching flow against the MongoDB notes style.
- [ ] Create the `.md` explanation if needed.
- [ ] Create the runnable `.js` example if needed.
- [ ] Run the `.js` example with Node.
- [ ] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [ ] Confirm the concept explanation feels easy to understand.
- [ ] Confirm the runnable example has clear terminal labels.
- [ ] Confirm common mistakes are covered.
- [ ] Confirm the file pair belongs under `src/array/methods/static/Array.isArray/`.
- [ ] Decide whether to commit this sprint.

## Stop Point

After setting up the next page and reviewing the source files, stop before
writing the actual `Array.isArray()` content unless the user says to proceed.
