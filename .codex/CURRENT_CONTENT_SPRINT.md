# Current Content Sprint

## Active Story

### JS-CONTENT-001AB: Review Object Key-Existence Pair

As the repo owner, I want the first object page to clearly teach how to check
whether a key exists, when inherited properties count, and when only direct
properties should count. Future website reuse is secondary and not part of the
current sprint.

## Current Folder

```text
src/object/checkKeyInObject/
```

## Current Files

Primary explanation:

```text
src/object/checkKeyInObject/index.md
```

Paired runnable example:

```text
src/object/checkKeyInObject/index.js
```

## Starting Point

- `index.js` already existed under `src/object/checkKeyInObject/`.
- The old file compared the `in` operator, `hasOwnProperty()`,
  `object.key !== undefined`, and `Object.keys().includes()`.
- The old file correctly hinted that `in` checks the prototype chain.
- The old file did not clearly separate own-property checks from inherited
  property checks.
- The old file used `object.key !== undefined` in a way that could make a
  learner confuse value checks with key-existence checks.
- There was no paired Markdown note for this object opener.
- The user chose to start `src/object/` before finishing the remaining unchecked
  array question page, `src/array/questions/flatten.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
```

Key points to teach:

- The `in` operator checks own properties and inherited properties.
- `Object.hasOwn(object, key)` checks whether the object has the key as its own
  property.
- `Object.prototype.hasOwnProperty.call(object, key)` is the older safe pattern
  that still appears in legacy code.
- `Object.keys(object)` returns own enumerable string-keyed property names.
- `object.key !== undefined` checks a value, not key existence.
- An existing key can have the value `undefined`.

## Sprint 1: Review Object Key-Existence Pair

Status: review

Checklist:

- [x] Confirm current Git status before starting.
- [x] Treat the user request as an explicit pivot to `src/object/`.
- [x] Keep `src/array/questions/flatten.js` unchecked for a later sprint.
- [x] Confirm the first unchecked object page is
  `src/object/checkKeyInObject/index.js`.
- [x] Review existing `index.js`.
- [x] Check nearby `src/object/hasOwn.js` for overlap.
- [x] Cross-check key behavior against MDN references for `in`,
  `Object.hasOwn()`, and `Object.keys()`.
- [x] Rewrite `index.js` using the runnable JS teaching pattern.
- [x] Create `index.md` using the repo study-note teaching pattern.
- [x] Cover `in`, `Object.hasOwn()`,
  `Object.prototype.hasOwnProperty.call()`, `Object.keys().includes()`,
  inherited properties, non-enumerable properties, and the
  `undefined` value-check mistake.
- [x] Run the `.js` example with Node.
- [x] Run `node --check` on the runnable file.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.
- [x] Run `git diff --check`.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels and expected-output
  comments.
- [x] Confirm common mistakes are covered.
- [x] Confirm the file pair belongs under `src/object/checkKeyInObject/`.
- [x] Confirm this page stays distinct from the later dedicated
  `src/object/hasOwn.js` page.
- [x] Confirm `index.md` uses the documented study-note format as a flexible
  quality checklist.
- [ ] Decide whether to commit this sprint.

## Stop Point

This sprint is ready for review. After approval, the next unchecked object page is:

```text
src/object/hasOwn.js
```
