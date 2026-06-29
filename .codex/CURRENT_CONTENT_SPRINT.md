# Current Content Sprint

## Active Story

### JS-CONTENT-001AC: Review Object.hasOwn Pair

As the repo owner, I want the `Object.hasOwn()` page to clearly teach direct
property checks, why inherited properties do not count, and why
`Object.hasOwn()` is safer than calling `object.hasOwnProperty()` directly.
Future website reuse is secondary and not part of the current sprint.

## Current Folder

```text
src/object/methods/static-methods/hasOwn/
```

## Current Files

Primary explanation:

```text
src/object/methods/static-methods/hasOwn/hasOwn.md
```

Paired runnable example:

```text
src/object/methods/static-methods/hasOwn/hasOwn.js
```

## Starting Point

- `hasOwn.js` already existed directly under `src/object/`.
- The old file correctly said `Object.hasOwn()` checks own properties.
- The old file included useful examples for undefined values, inherited
  properties, and shadowed `hasOwnProperty`.
- The old file had informal wording, noisy object output, and no paired
  Markdown note.
- The previous concept page, `src/object/concepts/key-existence/`, already
  teaches the broad decision between `in`, `Object.hasOwn()`, and
  `Object.keys().includes()`.
- This page should stay focused on `Object.hasOwn()` itself.
- The reviewed pair now lives in `src/object/methods/static-methods/hasOwn/`
  because `Object.hasOwn()` is a static method.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.hasown
```

Key points to teach:

- `Object.hasOwn(object, key)` returns `true` for own properties.
- It returns `false` for inherited properties and missing properties.
- It is recommended over direct `object.hasOwnProperty()` calls.
- It works when `hasOwnProperty` is shadowed.
- It works with null-prototype objects.
- It can check string keys and symbol keys.
- It throws a `TypeError` when the first argument is `null` or `undefined`.

## Sprint 1: Review Object.hasOwn Pair

Status: review

Checklist:

- [x] Confirm current Git status before starting and leave unrelated
  `src/array/questions/flatten.js` and `src/playground/del.js` out of this
  sprint.
- [x] Confirm the next unchecked object page was the loose
  `src/object/hasOwn.js` file before moving it into the static-method bucket.
- [x] Review existing `hasOwn.js`.
- [x] Check the previous object key-existence page for overlap.
- [x] Cross-check key behavior against MDN and the ECMAScript spec.
- [x] Rewrite `hasOwn.js` using the runnable JS teaching pattern.
- [x] Create `hasOwn.md` using the repo study-note teaching pattern.
- [x] Move the pair into `src/object/methods/static-methods/hasOwn/` because
  `Object.hasOwn()` is a static method.
- [x] Record the object concept-vs-method bucket decision in
  `.codex/PROJECT_MEMORY.md`.
- [x] Cover own properties, inherited properties, falsy values,
  shadowed `hasOwnProperty`, null-prototype objects, symbol keys, sparse array
  slots, and `null`/`undefined` first-argument errors.
- [x] Run the `.js` example with Node.
- [x] Run `node --check` on the runnable file.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under
  `src/object/methods/static-methods/hasOwn/`.
- [x] Confirm this page stays distinct from
  `src/object/concepts/key-existence/key-existence.md`.
- [x] Confirm `hasOwn.md` uses the documented study-note format as a flexible
  quality checklist.
- [ ] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked object page is:

```text
src/object/loop-through-object/for-loop.js
```
