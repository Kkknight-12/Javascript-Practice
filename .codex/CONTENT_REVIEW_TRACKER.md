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
5. `src/reflect/`
6. `src/proxy/`
7. `src/string/`
8. `src/collections/`
9. `src/async/`
10. `src/classes/`
11. `src/advanced/`
12. `src/miscellaneous/`
13. `src/playground/`
14. `src/notes.md`

## Folder Tracker

- [ ] `src/fundamentals/`
- [ ] `src/functions/`
- [ ] `src/array/`
- [ ] `src/object/`
- [ ] `src/reflect/`
- [ ] `src/proxy/`
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
- [x] `src/array/methods/instance/filter/filter.js`
- [x] `src/array/methods/instance/filter/filter.md`
- [x] `src/array/methods/instance/find-some/find-some.js`
- [x] `src/array/methods/instance/find-some/find-some.md`
- [x] `src/array/methods/instance/findIndex-indexOf/findIndex-indexOf.js`
- [x] `src/array/methods/instance/findIndex-indexOf/findIndex-indexOf.md`
- [x] `src/array/methods/instance/flat/flat.js`
- [x] `src/array/methods/instance/flat/flat.md`
- [x] `src/array/methods/instance/flatMap/flatMap.js`
- [x] `src/array/methods/instance/flatMap/flatMap.md`
- [x] `src/array/methods/instance/includes/includes.js`
- [x] `src/array/methods/instance/includes/includes.md`
- [x] `src/array/methods/instance/includes/doubt/same-value-zero.md`
- [x] `src/array/methods/instance/Symbol.iterator/Symbol.iterator.js`
- [x] `src/array/methods/instance/Symbol.iterator/Symbol.iterator.md`
- [x] `src/array/methods/instance/map-filter/map-filter.js`
- [x] `src/array/methods/instance/map-filter/map-filter.md`
- [x] `src/array/methods/instance/reduce/reduce.js`
- [x] `src/array/methods/instance/reduce/reduce.md`
- [x] `src/array/methods/instance/reverse/reverse.js`
- [x] `src/array/methods/instance/reverse/reverse.md`
- [x] `src/array/methods/instance/slice/slice.js`
- [x] `src/array/methods/instance/slice/slice.md`
- [x] `src/array/methods/instance/sort/sort.js`
- [x] `src/array/methods/instance/sort/sort.md`
- [x] `src/array/methods/instance/splice/splice.js`
- [x] `src/array/methods/instance/splice/splice.md`
- [x] `src/array/methods/static/Array.fromAsync/Array.fromAsync.js`
- [x] `src/array/methods/static/Array.fromAsync/notes.md`
- [x] `src/array/methods/static/Array.isArray/Array.isArray.js`
- [x] `src/array/methods/static/Array.isArray/notes.md`
- [x] `src/array/methods/static/Array.from/array.from.js`
- [x] `src/array/methods/static/Array.from/array.from.md`
- [ ] `src/array/questions/flatten.js`

### `src/object/`

- [x] `src/object/concepts/create-object/create-object.js`
- [x] `src/object/concepts/create-object/create-object.md`
- [x] `src/object/concepts/key-existence/key-existence.js`
- [x] `src/object/concepts/key-existence/key-existence.md`
- [x] `src/object/loop-through-object/for-loop.js`
- [x] `src/object/loop-through-object/for-loop.md`
- [x] `src/object/methods/instance/hasOwnProperty/hasOwnProperty.js`
- [x] `src/object/methods/instance/hasOwnProperty/hasOwnProperty.md`
- [x] `src/object/methods/instance/isPrototypeOf/isPrototypeOf.js`
- [x] `src/object/methods/instance/isPrototypeOf/isPrototypeOf.md`
- [x] `src/object/methods/instance/isPrototypeOf/doubt/doubt.md`
- [x] `src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.js`
- [x] `src/object/methods/instance/propertyIsEnumerable/propertyIsEnumerable.md`
- [x] `src/object/methods/instance/toLocaleString/toLocaleString.js`
- [x] `src/object/methods/instance/toLocaleString/toLocaleString.md`
- [x] `src/object/methods/instance/toString/toString.js`
- [x] `src/object/methods/instance/toString/toString.md`
- [x] `src/object/methods/instance/valueOf/valueOf.js`
- [x] `src/object/methods/instance/valueOf/valueOf.md`
- [x] `src/object/methods/instance/valueOf/doubt/doubt.md`
- [x] `src/object/methods/static-methods/assign/assign.js`
- [x] `src/object/methods/static-methods/assign/assign.md`
- [x] `src/object/methods/static-methods/defineProperties/defineProperties.js`
- [x] `src/object/methods/static-methods/defineProperties/defineProperties.md`
- [x] `src/object/methods/static-methods/defineProperties/doubt/doubt.md`
- [x] `src/object/methods/static-methods/defineProperty/defineProperty.js`
- [x] `src/object/methods/static-methods/defineProperty/defineProperty.md`
- [x] `src/object/methods/static-methods/entries/entries.js`
- [x] `src/object/methods/static-methods/entries/entries.md`
- [x] `src/object/methods/static-methods/freeze/freeze.js`
- [x] `src/object/methods/static-methods/freeze/freeze.md`
- [x] `src/object/methods/static-methods/fromEntries/fromEntries.js`
- [x] `src/object/methods/static-methods/fromEntries/fromEntries.md`
- [x] `src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js`
- [x] `src/object/methods/static-methods/getOwnPropertyDescriptor/getOwnPropertyDescriptor.md`
- [x] `src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.js`
- [x] `src/object/methods/static-methods/getOwnPropertyDescriptors/getOwnPropertyDescriptors.md`
- [x] `src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.js`
- [x] `src/object/methods/static-methods/getOwnPropertyNames/getOwnPropertyNames.md`
- [x] `src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.js`
- [x] `src/object/methods/static-methods/getOwnPropertySymbols/getOwnPropertySymbols.md`
- [x] `src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.js`
- [x] `src/object/methods/static-methods/getPrototypeOf/getPrototypeOf.md`
- [x] `src/object/methods/static-methods/groupBy/groupBy.js`
- [x] `src/object/methods/static-methods/groupBy/groupBy.md`
- [x] `src/object/methods/static-methods/hasOwn/hasOwn.js`
- [x] `src/object/methods/static-methods/hasOwn/hasOwn.md`
- [x] `src/object/methods/static-methods/index.js`
- [x] `src/object/methods/static-methods/index.md`
- [x] `src/object/methods/static-methods/is/is.js`
- [x] `src/object/methods/static-methods/is/is.md`
- [x] `src/object/methods/static-methods/isExtensible/isExtensible.js`
- [x] `src/object/methods/static-methods/isExtensible/isExtensible.md`
- [x] `src/object/methods/static-methods/isFrozen/isFrozen.js`
- [x] `src/object/methods/static-methods/isFrozen/isFrozen.md`
- [x] `src/object/methods/static-methods/isSealed/isSealed.js`
- [x] `src/object/methods/static-methods/isSealed/isSealed.md`
- [x] `src/object/methods/static-methods/keys/keys.js`
- [x] `src/object/methods/static-methods/keys/keys.md`
- [x] `src/object/methods/static-methods/objectCreate/objectCreate.js`
- [x] `src/object/methods/static-methods/objectCreate/objectCreate.md`
- [ ] `src/object/methods/static-methods/objectEntries/entries.js`
- [ ] `src/object/methods/static-methods/preventExtensions.js`
- [ ] `src/object/methods/static-methods/seal.js`
- [ ] `src/object/methods/static-methods/setPrototypeOf.js`
- [ ] `src/object/methods/static-methods/values.js`
- [ ] `src/object/practice/index.js`
- [ ] `src/object/questions/deepCopyObject.js`

### `src/reflect/`

- [ ] `src/reflect/methods/static/ownKeys/ownKeys.js`
- [ ] `src/reflect/methods/static/ownKeys/ownKeys.md`

### `src/proxy/`

- [ ] `src/proxy/concepts/proxy-basics/proxy-basics.js`
- [ ] `src/proxy/concepts/proxy-basics/proxy-basics.md`
- [ ] `src/proxy/handlers/ownKeys/ownKeys.js`
- [ ] `src/proxy/handlers/ownKeys/ownKeys.md`
- [ ] `src/proxy/methods/static/revocable/revocable.js`
- [ ] `src/proxy/methods/static/revocable/revocable.md`

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

### Follow-up Cleanup: Array Prototype Borrowed Methods

Status: review

Checklist:

- [x] Rechecked `array-prototype.md` against the repo study-note quality bar.
- [x] Confirmed the page was already strong on prototype chain lookup, own
  property priority, instance/static methods, method categories, and monkey
  patching.
- [x] Cleaned up the borrowed-method explanation so
  `Array.prototype.method.call(this, callback)` has one clear flow instead of
  repeated direct-vs-borrowed rules.
- [x] Added explicit guidance for when to use direct array methods, when to use
  `.call()` / `.apply()`, and when converting with `Array.from()` is clearer.
- [x] Added matching runnable examples to `array-prototype.js` for direct
  `every()`, borrowed `every()`, borrowed `map()`, and `Array.from()`.
- [x] Ran `node src/array/methods/instance/prototype/concept/array-prototype.js`.
- [x] Ran `node --check src/array/methods/instance/prototype/concept/array-prototype.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Explanation is now richer without becoming an `every()`-only note.
- [x] The shared concept page remains the right home for this reusable pattern.
- [x] Runnable examples match the Markdown explanation.
- [ ] Decide whether to commit this cleanup with the current content batch.

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

### Sprint 16: Review Array Filter Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `fill()`.
- [x] Reviewed existing `filter.js`.
- [x] Checked related custom-filter practice and `map-filter.js` overlap.
- [x] Cross-checked key behavior against MDN.
- [x] Moved the reviewed pair into `src/array/methods/instance/filter/`.
- [x] Rewrote `filter.js` using the runnable JS teaching pattern.
- [x] Created `filter.md` using the repo study-note teaching pattern.
- [x] Covered keep/skip behavior, return value, no mutation, shallow copy,
  callback arguments, `thisArg`, sparse arrays, `filter()` vs `find()`,
  `filter()` vs `map()`, generic behavior, and async callback gotcha.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/filter/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from custom-filter practice and later `map-filter.js`.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array filter study pair`.

### Sprint 17: Review Array Find And Some Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `filter()`.
- [x] Reviewed existing `find-some.js`.
- [x] Checked related `entries-find/` and `findIndex-indexOf.js` overlap.
- [x] Cross-checked key behavior against MDN pages for `find()` and `some()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/find-some/`.
- [x] Rewrote `find-some.js` using the runnable JS teaching pattern.
- [x] Created `find-some.md` using the repo study-note teaching pattern.
- [x] Covered return-value differences, early stop, object lookup, existence
  checks, falsy found values, empty arrays, sparse-array behavior, callback
  arguments, `thisArg`, and generic behavior.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/find-some/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from earlier `entries-find/` and later
  `findIndex-indexOf.js`.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array find-some study pair`.

### Sprint 18: Review Array FindIndex And IndexOf Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `find-some/`.
- [x] Reviewed existing `findIndex-indexOf.js`.
- [x] Checked nearby `find-some/` and `filter/` pages for overlap.
- [x] Cross-checked key behavior against MDN pages for `indexOf()` and
  `findIndex()`.
- [x] Moved the reviewed pair into
  `src/array/methods/instance/findIndex-indexOf/`.
- [x] Rewrote `findIndex-indexOf.js` using the runnable JS teaching pattern.
- [x] Created `findIndex-indexOf.md` using the repo study-note teaching pattern.
- [x] Covered exact-value search, condition-based index search, `fromIndex`,
  `-1`, index `0`, strict equality, object references, `NaN`, early stop,
  callback arguments, `thisArg`, sparse arrays, and generic behavior.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under
  `src/array/methods/instance/findIndex-indexOf/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from earlier `find-some/`.
- [x] Decide whether to commit this sprint.
- [x] User approved this sprint; commit was not requested at that boundary.
- [x] Committed together with the `flat()` sprint as
  `docs: add array index and flat study pairs`.

### Sprint 19: Review Array Flat Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `findIndex-indexOf/`.
- [x] Reviewed existing `flat.js`.
- [x] Checked nearby `concat/` and `flatMap.js` pages for overlap.
- [x] Cross-checked key behavior against MDN for `flat()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/flat/`.
- [x] Rewrote `flat.js` using the runnable JS teaching pattern.
- [x] Created `flat.md` using the repo study-note teaching pattern.
- [x] Covered default depth, custom depth, `Infinity`, depth `0`,
  non-mutation, shallow copy, sparse arrays, generic behavior, array-like
  values, `concat()` comparison, and `flatMap()` boundary.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/flat/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from earlier `concat/` and later `flatMap.js`.
- [x] Decide whether to commit this sprint.
- [x] Committed as `docs: add array index and flat study pairs`.

### Sprint 20: Review Array FlatMap Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `flat/`.
- [x] Reviewed existing `flatMap.js`.
- [x] Checked nearby `flat/`, `filter/`, and `map-filter.js` pages for overlap.
- [x] Cross-checked key behavior against MDN for `flatMap()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/flatMap/`.
- [x] Rewrote `flatMap.js` using the runnable JS teaching pattern.
- [x] Created `flatMap.md` using the repo study-note teaching pattern.
- [x] Covered `map().flat(1)`, one-level flattening, zero/one/many outputs,
  non-array return values, splitting strings, callback arguments, `thisArg`,
  sparse arrays, returned array-like objects, generic behavior, async callback
  gotcha, and boundaries with `flat()` plus `filter().map()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.

Review List:

- [x] File pair belongs under `src/array/methods/instance/flatMap/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from earlier `flat/` and later `map-filter.js`.
- [x] Decide whether to commit this sprint.
- [x] User approved moving to `includes.js`; commit was not requested at this
  boundary.

### Sprint 21: Review Array Includes Pair

Status: review

Checklist:

- [x] Chosen as the next array page after `flatMap/`.
- [x] Reviewed existing `includes.js`.
- [x] Checked nearby `findIndex-indexOf/`, `find-some/`, and `flatMap/` pages
  for overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `includes()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/includes/`.
- [x] Rewrote `includes.js` using the runnable JS teaching pattern.
- [x] Created `includes.md` using the repo study-note teaching pattern.
- [x] Polished `includes.md` after review so it explicitly includes the
  standard `Syntax`, `Parameters`, `Return Value`, `Important Notes`, and
  `When To Use It` sections.
- [x] Covered boolean return, exact value search, string-vs-array `includes()`,
  no type coercion, `fromIndex`, negative `fromIndex`, `SameValueZero`, `NaN`,
  `0`/`-0`, object references, `some()` comparison, empty arrays, sparse arrays,
  and generic behavior.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Added a Codex memory update to require a post-draft note-format check.
- [x] Audited existing `.md` notes for the same heading-format gaps.

Review List:

- [x] File pair belongs under `src/array/methods/instance/includes/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from earlier `findIndex-indexOf/` and `find-some/`.
- [x] `includes.md` now follows the documented study-note format more closely
  than the first draft.
- [ ] Decide whether to commit this sprint.

### Sprint 22: Review Array Symbol.iterator Pair

Status: review

Checklist:

- [x] Chosen as the next array page after `includes/`.
- [x] Reviewed existing `Symbol.iterator.js`.
- [x] Checked nearby `for-of/`, `entries-find/`, and `includes/` pages for
  overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `Array.prototype[Symbol.iterator]()`.
- [x] Moved the reviewed pair into
  `src/array/methods/instance/Symbol.iterator/`.
- [x] Rewrote `Symbol.iterator.js` using the runnable JS teaching pattern.
- [x] Created `Symbol.iterator.md` using the repo study-note teaching pattern.
- [x] Polished `Symbol.iterator.md` with a second note-format review.
- [x] Covered array iterability, `next()`, iterator state, `for...of`, spread,
  destructuring, `values()`, `entries()`/`keys()` comparison, sparse arrays,
  plain object gotcha, and generic array-like behavior.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under
  `src/array/methods/instance/Symbol.iterator/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from the earlier `for-of/` loop page.
- [x] `Symbol.iterator.md` uses the documented study-note format as a flexible
  quality checklist.
- [ ] Decide whether to commit this sprint.

### Sprint 23: Review Array Map-Filter Pair

Status: review

Checklist:

- [x] Chosen as the next array page after `Symbol.iterator/`.
- [x] Reviewed existing `map-filter.js`.
- [x] Checked nearby `filter/`, `flatMap/`, and custom map practice pages for
  overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `filter()` and `map()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/map-filter/`.
- [x] Rewrote `map-filter.js` using the runnable JS teaching pattern.
- [x] Created `map-filter.md` using the repo study-note teaching pattern.
- [x] Polished `map-filter.md` with a second note-format review.
- [x] Covered keep-then-transform flow, order, callback return rules,
  non-mutation, shallow object references, callback arguments, sparse arrays,
  async callback gotchas, generic behavior, and boundaries with `filter()`,
  `map()`, and `flatMap()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/map-filter/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from `filter/`, custom map practice, and `flatMap/`.
- [x] `map-filter.md` uses the documented study-note format as a flexible
  quality checklist.
- [ ] Decide whether to commit this sprint.

### Sprint 24: Review Array Reduce Pair

Status: review

Checklist:

- [x] Chosen as the next array page after `map-filter/`.
- [x] Reviewed existing `reduce.js`.
- [x] Checked nearby custom reduce practice and recent array-method pages for
  overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `reduce()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/reduce/`.
- [x] Rewrote `reduce.js` using the runnable JS teaching pattern.
- [x] Created `reduce.md` using the repo study-note teaching pattern.
- [x] Polished `reduce.md` with a second note-format review.
- [x] Covered accumulator flow, initial value behavior, no-initial-value
  behavior, empty arrays, sparse arrays, callback arguments, missing return,
  counting, grouping, flattening, generic behavior, and when not to use
  `reduce()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/reduce/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from custom reduce implementation practice.
- [x] `reduce.md` uses the documented study-note format as a flexible quality
  checklist.
- [ ] Decide whether to commit this sprint.

### Sprint 25: Review Array Reverse Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `reduce/`.
- [x] Reviewed existing `reverse.js`.
- [x] Checked nearby mutating/copying method pages for overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `reverse()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/reverse/`.
- [x] Rewrote `reverse.js` using the runnable JS teaching pattern.
- [x] Created `reverse.md` using the repo study-note teaching pattern.
- [x] Polished `reverse.md` with a second note-format review.
- [x] Covered mutation, same-reference return, object references, copying with
  `toReversed()` / spread / `Array.from()`, sparse arrays, generic behavior,
  and comparison with `sort()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/reverse/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from later `sort()` and existing copying-method
  notes.
- [x] `reverse.md` uses the documented study-note format as a flexible quality
  checklist.
- [x] Decide whether to commit this sprint.

### Sprint 26: Review Array Slice Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `reverse/`.
- [x] Reviewed existing `slice.js`.
- [x] Checked nearby copying/mutating method pages for overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `slice()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/slice/`.
- [x] Rewrote `slice.js` using the runnable JS teaching pattern.
- [x] Created `slice.md` using the repo study-note teaching pattern.
- [x] Polished `slice.md` with a second note-format review.
- [x] Covered shallow copy, no mutation, excluded end index, no-argument copy,
  negative indexes, out-of-range indexes, fractional indexes, sparse arrays,
  generic behavior, and comparison with `splice()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/slice/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from later `splice()` and existing copying-method
  notes.
- [x] `slice.md` uses the documented study-note format as a flexible quality
  checklist.
- [x] Decide whether to commit this sprint.

### Sprint 27: Review Array Sort Pair

Status: complete

Checklist:

- [x] Chosen as the next array page after `slice/`.
- [x] Reviewed existing `sort.js`.
- [x] Checked nearby custom sort practice and recent mutating/copying method
  pages for overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `sort()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/sort/`.
- [x] Rewrote `sort.js` using the runnable JS teaching pattern.
- [x] Created `sort.md` using the repo study-note teaching pattern.
- [x] Polished `sort.md` with a second note-format review.
- [x] Covered mutation, same-reference return, default string sort, numeric
  compare functions, object sorting, stable sort, `toSorted()`, shallow copies,
  `undefined`, sparse arrays, generic behavior, and compare function mistakes.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/sort/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from custom sort implementation practice.
- [x] `sort.md` uses the documented study-note format as a flexible quality
  checklist.
- [x] Decide whether to commit this sprint.

### Sprint 28: Review Array Splice Pair

Status: review

Checklist:

- [x] Chosen as the next array page after `sort/`.
- [x] Reviewed existing `splice.js`.
- [x] Checked nearby `slice/`, `sort/`, and copying-method pages for overlap.
- [x] Cross-checked key behavior against MDN and the ECMAScript spec for
  `splice()`.
- [x] Moved the reviewed pair into `src/array/methods/instance/splice/`.
- [x] Rewrote `splice.js` using the runnable JS teaching pattern.
- [x] Created `splice.md` using the repo study-note teaching pattern.
- [x] Polished `splice.md` with a second note-format review.
- [x] Covered mutation, removed-item return value, remove/insert/replace
  patterns, omitted arguments, negative indexes, `Infinity` delete count,
  `toSpliced()`, shallow copies, sparse arrays, generic behavior, and comparison
  with `slice()`.
- [x] Ran the example with Node.
- [x] Updated file tracker.
- [x] Ran `git diff --check`.

Review List:

- [x] File pair belongs under `src/array/methods/instance/splice/`.
- [x] Terminal output has readable labels.
- [x] Explanation is useful as terminal-first repo content.
- [x] Content quality matches the stricter post-prototype bar.
- [x] Page stays distinct from `slice/` and modern `toSpliced()` copy-safe
  behavior.
- [x] `splice.md` uses the documented study-note format as a flexible quality
  checklist.
- [ ] Decide whether to commit this sprint.

### Sprint 29: Review Object Key-Existence Pair

Status: review

Checklist:

- [x] Chosen as the first object page after the user explicitly pivoted to
  `src/object/`.
- [x] Reviewed the existing `src/object/checkKeyInObject/index.js` before
  moving it into `src/object/concepts/key-existence/`.
- [x] Checked the nearby `Object.hasOwn()` page for overlap.
- [x] Cross-checked behavior against MDN pages for the `in` operator,
  `Object.hasOwn()`, and `Object.keys()`.
- [x] Rewrote `index.js` using the runnable JS teaching pattern.
- [x] Created `index.md` using the repo study-note teaching pattern.
- [x] Moved the reviewed comparison page into
  `src/object/concepts/key-existence/`.
- [x] Covered inherited vs own properties, `Object.hasOwn()`,
  `Object.prototype.hasOwnProperty.call()`, `Object.keys().includes()`,
  non-enumerable properties, and why `object.key !== undefined` is not a
  reliable existence check.
- [x] Run `node src/object/concepts/key-existence/key-existence.js`.
- [x] Run `node --check src/object/concepts/key-existence/key-existence.js`.
- [x] Run `git diff --check`.

Review List:

- [x] Explanation is useful as the object-section opener.
- [x] Runnable example has clear labels and expected-output comments.
- [x] Common mistakes are covered without duplicating the later dedicated
  `hasOwn.js` page.
- [ ] Decide whether to commit this sprint.

### Sprint 30: Review Object.hasOwn Pair

Status: review

Checklist:

- [x] Chosen as the next object page after the key-existence opener.
- [x] Reviewed the existing loose `src/object/hasOwn.js` file before moving it
  into `src/object/methods/static-methods/hasOwn/`.
- [x] Checked the previous object key-existence page for overlap.
- [x] Cross-checked behavior against MDN and the ECMAScript spec.
- [x] Rewrote `hasOwn.js` using the runnable JS teaching pattern.
- [x] Created `hasOwn.md` using the repo study-note teaching pattern.
- [x] Moved the reviewed pair into
  `src/object/methods/static-methods/hasOwn/`.
- [x] Recorded the object concept-vs-method bucket decision in
  `.codex/PROJECT_MEMORY.md`.
- [x] Covered own properties, inherited properties, falsy values,
  shadowed `hasOwnProperty`, null-prototype objects, symbol keys, sparse array
  slots, and `null`/`undefined` first-argument errors.
- [x] Run `node src/object/methods/static-methods/hasOwn/hasOwn.js`.
- [x] Run `node --check src/object/methods/static-methods/hasOwn/hasOwn.js`.
- [x] Run `git diff --check`.

Review List:

- [x] Explanation is focused on `Object.hasOwn()` rather than repeating the full
  key-existence concept overview.
- [x] Runnable example has clear labels and expected-output comments.
- [x] Common mistakes are covered with direct examples.
- [ ] Decide whether to commit this sprint.

### Note Quality Cleanup: Array Concat

Status: review

Checklist:

- [x] Rechecked `concat.md` against the topic, MDN, and the flexible
  `Array.from` quality baseline.
- [x] Confirmed the page content is already strong and does not need a rewrite.
- [x] Added natural `Parameters`, `Return Value`, and `When To Use It` sections
  because they improve scanability for this topic.
- [x] Left `concat.js` unchanged because the runnable teaching file already
  matches the current pattern.
- [x] Ran `node src/array/methods/instance/concat/concat.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN-backed behavior are preserved.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Note Quality Cleanup: Array Entries And Find

Status: review

Checklist:

- [x] Rechecked `entries-find.md` against the combined topic, MDN pages for
  `entries()` and `find()`, the paired runnable file, and the flexible
  `Array.from` quality baseline.
- [x] Confirmed the page should keep its combined flow: teach `entries()`,
  teach `find()`, then combine them.
- [x] Added natural `Quick Definition`, `Syntax`, `Parameters`, `Return Value`,
  and `When To Use It` sections because they improve scanability for this
  topic.
- [x] Left `entries-find.js` unchanged because the runnable teaching file
  already matches the current pattern.
- [x] Ran `node src/array/methods/instance/entries-find/entries-find.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN-backed behavior are preserved.
- [x] Page still keeps `find()` return behavior explained once before combining
  it with `entries()`.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Note Quality Cleanup: Array Every

Status: review

Checklist:

- [x] Rechecked `every.md` against the topic, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Confirmed the page content is already strong and does not need a rewrite.
- [x] Added natural `Syntax`, `Parameters`, `Return Value`, and
  `When To Use It` sections because they improve scanability for this topic.
- [x] Added the ECMAScript spec reference beside MDN.
- [x] Left `every.js` unchanged because the runnable teaching file already
  matches the current pattern.
- [x] Ran `node src/array/methods/instance/every/every.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN-backed behavior are preserved.
- [x] Empty-array, sparse-array, and async callback gotchas remain clear.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Note Quality Cleanup: Array Fill

Status: review

Checklist:

- [x] Rechecked `fill.md` against the topic, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Confirmed the page content is already strong and does not need a rewrite.
- [x] Added natural `Parameters`, `Return Value`, and `When To Use It` sections
  because they improve scanability for this topic.
- [x] Added the ECMAScript spec reference beside MDN.
- [x] Left `fill.js` unchanged because the runnable teaching file already
  matches the current pattern.
- [x] Ran `node src/array/methods/instance/fill/fill.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN-backed behavior are preserved.
- [x] Mutation, range behavior, empty arrays, sparse arrays, shared references,
  and matrix-row gotchas remain clear.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Note Quality Cleanup: Array Filter

Status: review

Checklist:

- [x] Rechecked `filter.md` against the topic, MDN, the ECMAScript spec, the
  paired runnable file, and the flexible `Array.from` quality baseline.
- [x] Confirmed the page content is already strong and does not need a rewrite.
- [x] Added natural `Syntax`, `Parameters`, `Return Value`, and
  `When To Use It` sections because they improve scanability for this topic.
- [x] Added the ECMAScript spec reference beside MDN.
- [x] Left `filter.js` unchanged because the runnable teaching file already
  matches the current pattern.
- [x] Ran `node src/array/methods/instance/filter/filter.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN-backed behavior are preserved.
- [x] Keep/skip behavior, shallow-copy references, callback arguments,
  sparse-array behavior, and async callback gotcha remain clear.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Note Quality Cleanup: Array Find And Some

Status: review

Checklist:

- [x] Rechecked `find-some.md` against the combined topic, MDN pages for
  `find()` and `some()`, the ECMAScript spec entries, the paired runnable file,
  and the flexible `Array.from` quality baseline.
- [x] Confirmed the page should keep its comparison flow instead of splitting
  the two methods apart.
- [x] Added natural `Syntax`, `Parameters`, `Return Value`, and
  `When To Use It` sections because they improve scanability for this topic.
- [x] Tightened duplicate return wording so `find()` and `some()` return
  behavior is summarized once, then reinforced through examples.
- [x] Added ECMAScript spec references beside MDN.
- [x] Left `find-some.js` unchanged because the runnable teaching file already
  matches the current pattern.
- [x] Ran `node src/array/methods/instance/find-some/find-some.js`.
- [x] Ran `git diff --check`.

Review List:

- [x] Polish improves clarity without forcing a rigid template.
- [x] Existing examples and MDN/spec-backed behavior are preserved.
- [x] Different return values, falsy found values, empty arrays, sparse-array
  difference, callback arguments, and `thisArg` remain clear.
- [ ] Decide whether to commit this cleanup with the current content batch.

### Doubt Note: SameValueZero

Status: review

Checklist:

- [x] Created `src/array/methods/instance/includes/doubt/same-value-zero.md`.
- [x] Kept the deeper explanation outside `includes.md` as requested.
- [x] Explained SameValueZero as an internal equality algorithm, not a callable
  user-facing function.
- [x] Covered `NaN`, `0`/`-0`, no type coercion, object reference matching,
  comparison with `===`, and comparison with `Object.is()`.
- [x] Added ECMAScript and MDN references.

Review List:

- [x] Note is close to the `includes()` topic without expanding `includes.md`.
- [x] Explanation is beginner-friendly and algorithm-focused.
- [ ] Decide whether to commit this doubt note.

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
