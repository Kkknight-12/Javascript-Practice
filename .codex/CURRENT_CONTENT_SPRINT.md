# Current Content Sprint

## Active Story

### JS-CONTENT-001D: Review Array.fromAsync Static Method Pair

As the repo owner, I want the `Array.fromAsync()` explanation and runnable
example to be clear, beginner-friendly, and useful for terminal practice in this
repo. Future website reuse is secondary and not part of the current sprint.

## Current Folder

```text
src/array/methods/static/Array.fromAsync/
```

## Current Files

Primary explanation:

```text
src/array/methods/static/Array.fromAsync/notes.md
```

Paired runnable example:

```text
src/array/methods/static/Array.fromAsync/Array.fromAsync.js
```

## Starting Point

- Both files already existed.
- Both files had starter content, but not in the final repo teaching style.
- This topic is more advanced than `Array.from()` because it involves async
  iterables, promises, `await`, and sequential consumption.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync
```

Key points to teach:

- `Array.fromAsync(items)` is a static method.
- It creates a new shallow-copied array from an async iterable, iterable, or
  array-like object.
- It returns a `Promise` whose fulfilled value is a new array.
- It can use `mapFn` and `thisArg`.
- For sync iterable and array-like inputs, values are awaited before they enter
  the final array.
- If `mapFn` returns a Promise, the mapped output is awaited.
- It consumes values sequentially/lazily, unlike `Promise.all()` which retrieves
  all values first and awaits them concurrently.

## Sprint 1: Review Array.fromAsync Pair

Status: review

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Rewrite `notes.md` using the repo study-note teaching pattern.
- [x] Rewrite `Array.fromAsync.js` using the runnable JS teaching pattern.
- [x] Include common mistakes and gotchas: forgetting `await`, confusing it
  with `Array.from()`, and using it where `Promise.all()` may be clearer.
- [x] Run the `.js` example with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/array/methods/static/Array.fromAsync/`.
- [ ] Decide whether to commit this sprint.

## Stop Point

After creating and reviewing this pair, stop and ask before committing or moving
to the next array file.
