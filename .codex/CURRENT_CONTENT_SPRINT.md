# Current Content Sprint

## Active Story

### JS-CONTENT-001J: Review Array Prototype Concept And Practice Split

As the repo owner, I want the old `array.prototype.js` scratch file to become a
clear prototype learning section with a concept page and a separate practice
page. The content should stay terminal-first, beginner-friendly, and useful for
future website reuse without making website work part of this sprint.

## Current Folder

```text
src/array/methods/instance/prototype/
```

## Current Files

Primary explanation:

```text
src/array/methods/instance/prototype/concept/array-prototype.md
src/array/methods/instance/prototype/practice/custom-map/custom-map.md
src/array/methods/instance/prototype/practice/custom-filter/custom-filter.md
src/array/methods/instance/prototype/practice/custom-sort/custom-sort.md
src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.md
```

Paired runnable example:

```text
src/array/methods/instance/prototype/concept/array-prototype.js
src/array/methods/instance/prototype/practice/custom-map/custom-map.js
src/array/methods/instance/prototype/practice/custom-filter/custom-filter.js
src/array/methods/instance/prototype/practice/custom-sort/custom-sort.js
src/array/methods/instance/prototype/practice/custom-reduce/custom-reduce.js
```

## Starting Point

- The old `array.prototype.js` file mixed concept explanation with custom
  `map`, `filter`, `sort`, and `reduce` practice.
- Some of the custom practice is useful, but it should not be the main concept
  explanation.
- Several built-in methods already have or will have their own method pages.
- The user approved splitting this topic into a prototype concept folder and a
  prototype practice folder.
- The user then approved splitting the prototype practice folder into separate
  custom map, filter, sort, and reduce practice pages.

## Reference Findings

Source checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
https://tc39.es/ecma262/multipage/indexed-collections.html#sec-properties-of-the-array-prototype-object
```

Key points to teach:

- Normal arrays are linked to `Array.prototype`.
- Shared array instance methods live on `Array.prototype`.
- JavaScript checks own properties before prototype properties.
- Static methods like `Array.from()` live on `Array`, not `Array.prototype`.
- `Array.prototype` itself is an array exotic object with initial length `0`.
- The normal array lookup chain is
  `array -> Array.prototype -> Object.prototype -> null`.
- Array methods can be grouped for learning as iteration methods, mutator
  methods, and accessor/copying methods.
- Custom map transforms existing items into a new array.
- Custom filter keeps original items when the callback returns truthy.
- Custom sort uses compare results to reorder values; the practice version
  returns a sorted copy while built-in `sort()` mutates.
- Custom reduce carries an accumulator and returns one final value.
- Custom prototype methods are useful for learning, but built-in prototypes
  should usually not be modified in production.

## Sprint 1: Review Array Prototype Concept And Practice Split

Status: complete

Checklist:

- [x] Confirm current Git status is clean before starting.
- [x] Cross-check key behavior against MDN and ECMAScript.
- [x] Compare teaching flow against the MongoDB notes style.
- [x] Replace the old single `array.prototype.js` file with
  `prototype/concept/` and `prototype/practice/`.
- [x] Create `array-prototype.js` using the runnable JS teaching pattern.
- [x] Create `array-prototype.md` using the repo study-note teaching pattern.
- [x] Polish the concept page around `Array.prototype`, prototype chain lookup,
  method categories, and monkey patching.
- [x] Create focused custom map, filter, sort, and reduce practice folders.
- [x] Create paired `.js` and `.md` files for each custom practice page.
- [x] Remove the combined `prototype-practice.js` and `prototype-practice.md`
  after migration.
- [x] Run all prototype concept and practice `.js` examples with Node.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md` after review.

Review List:

- [x] Confirm the concept explanation feels easy to understand.
- [x] Confirm the concept page explains method categories: iteration, mutator,
  and accessor/copying methods.
- [x] Confirm the practice examples preserve the useful from-scratch learning
  work.
- [x] Confirm each focused practice page teaches one mental model: transform,
  keep, compare/swap, or accumulate.
- [x] Confirm all runnable examples have clear terminal labels.
- [x] Confirm common mistakes are covered: `this`, arrow functions, cleanup, and
  modifying built-in prototypes.
- [x] Confirm the split belongs under `src/array/methods/instance/prototype/`.
- [x] Decide whether to commit this sprint.

## Stop Point

This sprint is complete after commit. The next unchecked array page is:

```text
src/array/methods/instance/concat.js
```
