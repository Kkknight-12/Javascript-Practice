# Content Review Tracker

## Story

### JS-CONTENT-001: Review And Polish Practice Content

As the repo owner, I want to review each source folder and each learning file so
the public practice repo stays accurate, readable, runnable, and useful as a
terminal-first JavaScript learning repo.

Future website reuse is allowed later, but it is not the current sprint scope.

## Current Scope

- Review one folder at a time.
- Review each `.js` and `.md` file inside that folder.
- Update content only when needed.
- Keep runnable examples terminal-first.
- Keep explanations near the related source files.
- Do not move folders/files during content review unless the user explicitly
  approves that as a separate structure sprint.

## Review Checklist For Each File

- [ ] Is the concept explanation correct?
- [ ] Is the filename/folder placement correct?
- [ ] Does the example run in Node when it should?
- [ ] Are comments useful and not misleading?
- [ ] For runnable `.js` files, do comments explain why the example works and
  show expected output?
- [ ] If a `.md` file has a paired runnable `.js` file, does it include a
  `Runnable Practice File` section with the exact `node ...` command?
- [ ] Should a nearby `.md` explanation be added or improved?
- [ ] Is anything outdated, duplicated, or confusing?
- [ ] Is this content clear enough to reuse later if needed, without making
  website work part of this sprint?

## Sprint Rules

- Pick one folder before editing.
- Discuss what we found before changing multiple files.
- Keep each sprint small and reviewable.
- Do not commit, push, or remove tracked content without explicit approval.
- After each sprint, record what changed and what still needs review.

## Folder Review Order

Suggested order:

1. `src/fundamentals/`
2. `src/functions/`
3. `src/array/`
4. `src/object/`
5. `src/string/`
6. `src/collections/`
7. `src/async/`
8. `src/classes/`
9. `src/advanced/`
10. `src/miscellaneous/`
11. `src/playground/`
12. `src/notes.md`

## Folder Tracker

- [ ] `src/fundamentals/`
- [ ] `src/functions/`
- [ ] `src/array/`
- [ ] `src/object/`
- [ ] `src/string/`
- [ ] `src/collections/`
- [ ] `src/async/`
- [ ] `src/classes/`
- [ ] `src/advanced/`
- [ ] `src/miscellaneous/`
- [ ] `src/playground/`
- [ ] `src/notes.md`

## File Tracker

### `src/fundamentals/`

- [ ] `src/fundamentals/hoisting/let-const.js`
- [ ] `src/fundamentals/hoisting/var.js`
- [x] `src/fundamentals/method-types/instance-vs-static-methods.js`
- [x] `src/fundamentals/method-types/instance-vs-static-methods.md`
- [ ] `src/fundamentals/scope/let-const.js`
- [ ] `src/fundamentals/scope/var.js`

### `src/functions/`

- [ ] `src/functions/callbackFunction.js`
- [ ] `src/functions/higher-order-functions.js`

### `src/array/`

- [x] `src/array/creation/create-array-shortcuts.js`
- [x] `src/array/creation/create-array-shortcuts.md`
- [x] `src/array/loop/basic-loop/basic-loop.js`
- [x] `src/array/loop/basic-loop/basic-loop.md`
- [x] `src/array/loop/for-await-of/for-await-of.js`
- [x] `src/array/loop/for-await-of/notes.md`
- [x] `src/array/loop/for-of/for-of.js`
- [x] `src/array/loop/for-of/notes.md`
- [x] `src/array/methods/constructor/constructor.js`
- [x] `src/array/methods/constructor/constructor.md`
- [x] `src/array/methods/instance/prototype/concept/array-prototype.js`
- [x] `src/array/methods/instance/prototype/concept/array-prototype.md`
- [x] `src/array/methods/instance/prototype/practice/custom-map/custom-map.js`
- [x] `src/array/methods/instance/prototype/practice/custom-map/custom-map.md`
- [x] `src/array/methods/instance/prototype/practice/custom-filter/custom-filter.js`
- [x] `src/array/methods/instance/prototype/practice/custom-filter/custom-filter.md`
- [x] `src/array/methods/instance/prototype/practice/custom-sort/custom-sort.js`
- [x] `src/array/methods/instance/prototype/practice/custom-sort/custom-sort.md`
- [x] `src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.js`
- [x] `src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.md`
- [x] `src/array/methods/instance/concat/concat.js`
- [x] `src/array/methods/instance/concat/concat.md`
- [x] `src/array/methods/instance/entries-find/entries-find.js`
- [x] `src/array/methods/instance/entries-find/entries-find.md`
- [x] `src/array/methods/instance/every/every.js`
- [x] `src/array/methods/instance/every/every.md`
- [x] `src/array/methods/instance/every/doubt/doubt.md`
- [x] `src/array/methods/instance/fill/fill.js`
- [x] `src/array/methods/instance/fill/fill.md`
- [ ] `src/array/methods/instance/filter.js`
- [ ] `src/array/methods/instance/find-some.js`
- [ ] `src/array/methods/instance/findIndex-indexOf.js`
- [ ] `src/array/methods/instance/flat.js`
- [ ] `src/array/methods/instance/flatMap.js`
- [ ] `src/array/methods/instance/includes.js`
- [ ] `src/array/methods/instance/Symbol.iterator.js`
- [ ] `src/array/methods/instance/map-filter.js`
- [ ] `src/array/methods/instance/reduce.js`
- [ ] `src/array/methods/instance/reverse.js`
- [ ] `src/array/methods/instance/slice.js`
- [ ] `src/array/methods/instance/sort.js`
- [ ] `src/array/methods/instance/splice.js`
- [x] `src/array/methods/static/Array.fromAsync/Array.fromAsync.js`
- [x] `src/array/methods/static/Array.fromAsync/notes.md`
- [x] `src/array/methods/static/Array.isArray/Array.isArray.js`
- [x] `src/array/methods/static/Array.isArray/notes.md`
- [x] `src/array/methods/static/Array.from/array.from.js`
- [x] `src/array/methods/static/Array.from/array.from.md`
- [ ] `src/array/questions/flatten.js`

### `src/object/`

- [ ] `src/object/checkKeyInObject/index.js`
- [ ] `src/object/hasOwn.js`
- [ ] `src/object/loop-through-object/for-loop.js`
- [ ] `src/object/loop-through-object/for_in.js`
- [ ] `src/object/methods/instance/isPrototypeOf.js`
- [ ] `src/object/methods/static-methods/assign.js`
- [ ] `src/object/methods/static-methods/defineProperties.js`
- [ ] `src/object/methods/static-methods/defineProperty.js`
- [ ] `src/object/methods/static-methods/entries.js`
- [ ] `src/object/methods/static-methods/freeze.js`
- [ ] `src/object/methods/static-methods/fromEntries.js`
- [ ] `src/object/methods/static-methods/getOwnPropertyDescriptor.js`
- [ ] `src/object/methods/static-methods/getOwnPropertyDescriptors.js`
- [ ] `src/object/methods/static-methods/getOwnPropertyNames.js`
- [ ] `src/object/methods/static-methods/getPrototypeOf.js`
- [ ] `src/object/methods/static-methods/groupBy.js`
- [ ] `src/object/methods/static-methods/index.js`
- [ ] `src/object/methods/static-methods/is.js`
- [ ] `src/object/methods/static-methods/keys.js`
- [ ] `src/object/methods/static-methods/objectCreate/index.js`
- [ ] `src/object/methods/static-methods/objectEntries/entries.js`
- [ ] `src/object/methods/static-methods/preventExtensions.js`
- [ ] `src/object/methods/static-methods/seal.js`
- [ ] `src/object/methods/static-methods/setPrototypeOf.js`
- [ ] `src/object/methods/static-methods/values.js`
- [ ] `src/object/practice/index.js`
- [ ] `src/object/questions/deepCopyObject.js`

### `src/string/`

- [ ] `src/string/loop-string.js`
- [ ] `src/string/methods/instance-methods/at.js`
- [ ] `src/string/methods/instance-methods/charAt.js`
- [ ] `src/string/methods/instance-methods/includes.js`
- [ ] `src/string/methods/instance-methods/indexOf.js`
- [ ] `src/string/methods/instance-methods/lastIndexOf.js`
- [ ] `src/string/methods/instance-methods/localeCompare.js`
- [ ] `src/string/methods/instance-methods/normalize.js`
- [ ] `src/string/methods/instance-methods/padStart.js`
- [ ] `src/string/methods/instance-methods/slice.js`
- [ ] `src/string/methods/instance-methods/split.js`
- [ ] `src/string/methods/instance-methods/substring.js`
- [ ] `src/string/methods/instance-methods/valueOf.js`
- [ ] `src/string/string.js`

### `src/collections/`

- [ ] `src/collections/map/loop-map.js`
- [ ] `src/collections/map/map-basics.js`

### `src/async/`

- [ ] `src/async/event-loop/index.js`

### `src/classes/`

- [ ] `src/classes/basic-syntax-1.js`
- [ ] `src/classes/private-class.js`

### `src/advanced/`

- [ ] `src/advanced/design-patterns/Singleton.js`

### `src/miscellaneous/`

- [ ] `src/miscellaneous/array-like-object.md`
- [ ] `src/miscellaneous/spreadOperator.js`
- [ ] `src/miscellaneous/url.js`

### `src/playground/`

- [ ] `src/playground/del.js`
- [ ] `src/playground/del1.js`

### Root Notes

- [ ] `src/notes.md`

## Sprint Log

### Sprint 1: Tracker Setup

Status: complete

Checklist:

- [x] Create content review tracker.
- [x] Record review rules.
- [x] Record folder review order.
- [x] Record every current `.js` and `.md` source file.

Review List:

- [ ] Confirm folder review order.
- [ ] Choose first folder to review.
- [ ] Decide whether the new method-types note should be included in the next
  commit with this tracker.

### Sprint 2: Review Method-Type Concept Pair

Status: complete

Checklist:

- [x] Reviewed `instance-vs-static-methods.md`.
- [x] Reviewed `instance-vs-static-methods.js`.
- [x] Ran the example with Node.
- [x] Polished explanation with prototype/static helper guidance.
- [x] Polished terminal output with labels.

Review List:

- [x] File pair belongs under `src/fundamentals/method-types/`.
- [x] Format is a good first pattern for `.md` explanation plus runnable `.js`.
- [ ] Decide whether to commit this sprint together with the tracker.

### Sprint 3: Review Array.from Static Method Pair

Status: complete

Checklist:

- [x] Switched active review direction to `src/array/` by user request.
- [x] Reviewed `array.from.md`.
- [x] Reviewed `array.from.js`.
- [x] Ran the example with Node before editing.
- [x] Cross-checked key behavior against MDN.
- [x] Compared teaching quality against the MongoDB notes style.
- [x] Removed scratch-style grid/range output from the runnable example.
- [x] Restored learner-facing comments and expected output in the runnable
  example after review feedback.
- [x] Polished the explanation around static method usage, iterables,
  array-like values, `mapFn`, `thisArg`, common mistakes, sequences, and shallow
  copy.
- [x] Ran the example with Node after editing.

Review List:

- [x] File pair belongs under `src/array/methods/static/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Committed as `81d6652 docs: polish array from study notes`.

### Sprint 4: Review Array.isArray Static Method Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `Array.from()`.
- [x] Confirmed current files exist.
- [x] Confirmed both files are currently empty.
- [x] Cross-check key behavior against MDN.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Create or polish `notes.md`.
- [x] Create or polish `Array.isArray.js`.
- [x] Include common mistakes and gotchas: static call, array-like objects,
  typed arrays, `instanceof Array`, cross-realm arrays, and `Array.prototype`.
- [x] Run the `.js` example with Node.
- [x] Update file tracker after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the runnable example has clear terminal labels.
- [x] Confirm common mistakes are covered.
- [x] File pair belongs under `src/array/methods/static/Array.isArray/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Committed as `082a2bf docs: add array isarray study pair`.

### Sprint 5: Review Array.fromAsync Static Method Pair

Status: complete

Checklist:

- [x] Chosen as the next static array page after `Array.isArray()`.
- [x] Reviewed existing `notes.md`.
- [x] Reviewed existing `Array.fromAsync.js`.
- [x] Cross-checked key behavior against MDN.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `notes.md` using the repo study-note teaching pattern.
- [x] Rewrote `Array.fromAsync.js` using the runnable JS teaching pattern.
- [x] Covered async iterables, sync iterables, array-like promises, `mapFn`,
  `thisArg`, Promise return value, and `Promise.all()` comparison.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/static/Array.fromAsync/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Committed as `bea5534 docs: polish array fromasync study pair`.

### Sprint 6: Review Array Creation Shortcuts Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after the reviewed static method pair.
- [x] Reviewed existing `create-array-shortcuts.js`.
- [x] Cross-checked key behavior against MDN pages for `Array()`,
  `Array.of()`, `Array.from()`, `fill()`, and spread syntax.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `create-array-shortcuts.js` using the runnable JS teaching pattern.
- [x] Created `create-array-shortcuts.md` using the repo study-note teaching
  pattern.
- [x] Covered array literals, `Array()`, `new Array()`, `Array.of()`, spread,
  `Array.from()`, `fill()`, empty slots, and shared object references.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/creation/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array creation shortcuts study pair`.

### Sprint 7: Review Basic Array Loop Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after array creation shortcuts.
- [x] Reviewed existing `basic-loop.js`.
- [x] Cross-checked key behavior against MDN pages for loops, `for`,
  `for...of`, and `forEach()`.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `basic-loop.js` using the runnable JS teaching pattern.
- [x] Created `basic-loop.md` using the repo study-note teaching pattern.
- [x] Covered `for`, `for...of`, `entries()`, `forEach()`, `break`,
  `continue`, `for...in` on arrays, and `forEach()` async gotcha.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/loop/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add basic array loop study pair`.

### Sprint 8: Review For Await...Of Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after basic array loops.
- [x] Reviewed existing `for-await-of.js`.
- [x] Reviewed existing `notes.md`.
- [x] Cross-checked key behavior against MDN pages for `for await...of`,
  `Symbol.asyncIterator`, and `AsyncGenerator`.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `for-await-of.js` using the runnable JS teaching pattern.
- [x] Rewrote `notes.md` using the repo study-note teaching pattern.
- [x] Removed live network `fetch` dependency from the runnable example.
- [x] Covered async generators, sync iterables yielding promises, comparison
  with `for...of`, cleanup on `break`, plain arrays, and `Promise.all()`
  comparison.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/loop/for-await-of/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: polish array loop study pairs`.

### Sprint 9: Review For...Of Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `for await...of`.
- [x] Reviewed existing `for_of.js`.
- [x] Reviewed existing `notes.md`.
- [x] Cross-checked key behavior against MDN pages for `for...of`,
  `Symbol.iterator`, and iteration protocols.
- [x] Renamed `for_of.js` to `for-of.js` using the repo naming pattern.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `for-of.js` using the runnable JS teaching pattern.
- [x] Rewrote `notes.md` using the repo study-note teaching pattern.
- [x] Covered arrays, strings, maps, sets, plain object gotcha, custom
  iterables, iterator cleanup, and `for...in` comparison.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/loop/for-of/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: polish for-of loop study pair`.

### Sprint 10: Review Array Constructor Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after the loop pages.
- [x] Reviewed existing `constructor.js`.
- [x] Cross-checked key behavior against MDN for `Array()` constructor.
- [x] Compared teaching flow against the MongoDB notes style.
- [x] Rewrote `constructor.js` using the runnable JS teaching pattern.
- [x] Created `constructor.md` using the repo study-note teaching pattern.
- [x] Covered `Array()` with and without `new`, no arguments, single number,
  empty slots, single non-number argument, multiple arguments, invalid length,
  and safer everyday choices.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/constructor/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array constructor study pair`.

### Sprint 11: Review Array Prototype Concept And Practice Split

Status: complete

Checklist:

- [x] Chosen as the next array page after the constructor page.
- [x] Reviewed existing `array.prototype.js`.
- [x] Confirmed the file mixed prototype concept notes with custom
  map/filter/sort/reduce practice.
- [x] Cross-checked key behavior against MDN and ECMAScript.
- [x] Split the topic into `prototype/concept/` and `prototype/practice/`.
- [x] Created `array-prototype.js` using the runnable JS teaching pattern.
- [x] Created `array-prototype.md` using the repo study-note teaching pattern.
- [x] Expanded the concept page to explain `Array.prototype`, the prototype
  chain, core method categories, and monkey patching.
- [x] Split the combined prototype practice page into custom map, filter, sort,
  and reduce practice folders.
- [x] Created paired `.js` and `.md` files for each custom practice page.
- [x] Removed the combined `prototype-practice.js` and `prototype-practice.md`
  after migration.
- [x] Ran the concept page and all four practice examples with Node.
- [x] Updated file tracker.

Review List:

- [x] Concept page explains lookup, shared methods, own-property priority,
  instance vs static methods, and prototype safety.
- [x] Concept page groups methods into iteration, mutator, and accessor/copying
  categories.
- [x] Practice page keeps custom map/filter/sort/reduce work separate from the
  concept explanation.
- [x] Practice folder now keeps custom map, filter, sort, and reduce in separate
  focused pages.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array prototype study section`.

### Sprint 12: Review Array Concat Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after the prototype section.
- [x] Reviewed existing `concat.js`.
- [x] Confirmed the old file only covered basic merging and multiple arguments.
- [x] Cross-checked key behavior against MDN.
- [x] Rewrote `concat.js` using the runnable JS teaching pattern.
- [x] Created `concat.md` using the repo study-note teaching pattern.
- [x] Moved the reviewed pair into `src/array/methods/instance/concat/`.
- [x] Covered non-mutation, shallow copy, nested arrays, sparse arrays,
  `Symbol.isConcatSpreadable`, generic behavior, `push()` comparison, spread
  syntax comparison, and common mistakes.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: polish array concat study pair`.

### Sprint 13: Review Array Entries And Find Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `concat()`.
- [x] Reviewed existing `entries-find.js`.
- [x] Checked related `find-some.js` and `findIndex-indexOf.js` files for
  overlap.
- [x] Cross-checked key behavior against MDN pages for `entries()` and `find()`.
- [x] Moved the reviewed pair into
  `src/array/methods/instance/entries-find/`.
- [x] Rewrote `entries-find.js` using the runnable JS teaching pattern.
- [x] Created `entries-find.md` using the repo study-note teaching pattern.
- [x] Covered iterator behavior, `for...of` destructuring, sparse arrays,
  `find()` stopping early, `0` as a valid found value, and `Object.entries()`
  comparison.
- [x] Reworked the page after review feedback so it teaches `entries()` first,
  explains the `find()` return rule once, then combines both methods.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/entries-find/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] The `find()` return behavior is not repeated as a separate second lesson.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array entries-find study pair`.

### Sprint 14: Review Array Every Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `entries-find`.
- [x] Reviewed existing `every.js`.
- [x] Cross-checked key behavior against MDN.
- [x] Moved the reviewed pair into `src/array/methods/instance/every/`.
- [x] Rewrote `every.js` using the runnable JS teaching pattern.
- [x] Created `every.md` using the repo study-note teaching pattern.
- [x] Covered boolean return behavior, early stop, empty arrays, sparse arrays,
  real `undefined`, callback arguments, `thisArg`, subset checks, generic
  behavior, and async callback gotcha.
- [x] Added topic-level doubt notes explaining why `results.every(Boolean)`
  works after `Promise.all()` and why empty arrays return `true`.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/every/`.
- [x] Doubt note belongs under `src/array/methods/instance/every/doubt/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array every study pair`.

### Sprint 15: Review Array Fill Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `every()`.
- [x] Reviewed existing `fill.js`.
- [x] Cross-checked key behavior against MDN.
- [x] Moved the reviewed pair into `src/array/methods/instance/fill/`.
- [x] Rewrote `fill.js` using the runnable JS teaching pattern.
- [x] Created `fill.md` using the repo study-note teaching pattern.
- [x] Covered mutation, same-array return, `start`, `end`, negative indexes,
  no-op ranges, empty arrays, sparse arrays, object references, matrix rows, and
  generic behavior.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/fill/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array fill study pair`.

### Structure Note: Array Method Buckets

Status: complete

Checklist:

- [x] Checked loose files under `src/array/methods/`.
- [x] Moved Array instance method practice files into
  `src/array/methods/instance/`.
- [x] Kept existing static method practice files under
  `src/array/methods/static/`.
- [x] Moved Array constructor practice into
  `src/array/methods/constructor/constructor.js` because it is not an instance
  method.
- [x] Updated this tracker with the new paths.

### Structure Note: Loose Array Root Files

Status: complete

Checklist:

- [x] Checked loose tracked files directly under `src/array/`.
- [x] Moved filter practice to `src/array/methods/instance/filter.js`.
- [x] Moved array creation shortcut practice to
  `src/array/creation/create-array-shortcuts.js`.
- [x] Moved basic array loop practice to
  `src/array/loop/basic-loop/basic-loop.js`.
- [x] Updated this tracker with the new paths.
