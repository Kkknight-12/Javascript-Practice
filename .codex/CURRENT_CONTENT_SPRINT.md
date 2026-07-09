# Current Content Sprint

## Active Story

### JS-CONTENT-001BK: Apply Practice Question Explanation Pattern

As a learner, I want practice-question notes under `src/array/questions/` and
`src/object/questions/` to follow the lighter DSA-style problem explanation
pattern, so recursive and algorithmic practice feels visual, step-by-step, and
easy to simulate.

## Current Folders

```text
src/array/questions/
src/object/questions/
src/object/practice/
```

## Current Files

```text
src/array/questions/flatten/problem.md
src/array/questions/flatten/brute-force.js
src/array/questions/flatten/optimal-recursive.js
src/array/questions/flatten/optimal-iterative.js
src/array/questions/flatten/notes/brute-force-notes.md
src/array/questions/flatten/notes/optimal-recursive-notes.md
src/array/questions/flatten/notes/optimal-iterative-notes.md
src/object/questions/deep-copy-object/problem.md
src/object/questions/deep-copy-object/brute-force.js
src/object/questions/deep-copy-object/better-json-clone.js
src/object/questions/deep-copy-object/optimal-recursive.js
src/object/questions/deep-copy-object/built-in-structured-clone.js
src/object/questions/deep-copy-object/notes/brute-force-notes.md
src/object/questions/deep-copy-object/notes/better-json-clone-notes.md
src/object/questions/deep-copy-object/notes/optimal-recursive-notes.md
src/object/questions/deep-copy-object/notes/structured-clone-notes.md
src/object/practice/index.js
src/object/practice/index.md
```

## Starting Point

- The user asked to apply the new DSA_Ts-inspired problem explanation pattern
  to practice-question folders such as `src/array/questions/` and
  `src/object/questions/`.
- Earlier in this sprint, the user asked to update `src/array/questions/flatten.js`
  and `src/object/practice/index.js` before moving to `Reflect` methods.
- `flatten.js` already had local edits: mostly semicolon cleanup, the original
  recursive/iterative flatten attempts, and a stray `Array.isArray(1);` line.
- `object/practice/index.js` was a mixed scratchpad with JSON mutation, string
  reversal, deep-clone practice, and `Object.entries()` / `Object.fromEntries()`
  examples.
- `deepCopyObject.js` was still an older object-question scratch file covering
  JSON cloning, recursive cloning, entries/fromEntries, and `structuredClone()`
  without a paired `.md` note.
- The flat `flatten.js` / `flatten.md` and `deepCopyObject.js` /
  `deepCopyObject.md` files were replaced with DSA-style problem folders after
  the user clarified that `problem.md` should come before conditions,
  adjustment logic, visual trees, and approach-specific notes.
- Existing unrelated dirty file remains outside this sprint:
  `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
```

Key facts:

- `Array.prototype.flat()` returns a new array and can flatten nested arrays up
  to the provided depth; `Infinity` flattens deeply.
- `Array.isArray(value)` is the right check for deciding whether a value should
  be opened by a custom flatten function.
- `Object.keys()`, `Object.values()`, and `Object.entries()` focus on own
  enumerable string-keyed properties.
- `Object.hasOwn()` checks direct property ownership, including non-enumerable
  and symbol-keyed own properties.
- `Reflect.ownKeys()` returns all own keys, including non-enumerable strings and
  symbols.
- `Object.groupBy()` groups iterable values and returns a null-prototype object.
- `structuredClone()` creates a deep clone for structured-cloneable values and
  can preserve circular references.
- `JSON.stringify()` visits enumerable own properties, skips symbols and
  non-enumerable properties, turns some values into JSON forms, and throws for
  `BigInt`.

## Sprint 1: Review `flatten/` Question Folder

Status: review-ready

Checklist:

- [x] Replace the old flat files with `src/array/questions/flatten/`.
- [x] Add `problem.md` with the problem, examples, goal, and approach file map.
- [x] Add `brute-force.js` for known-depth one-level `concat()` passes.
- [x] Add `optimal-recursive.js` with `Array.isArray()` recursion.
- [x] Add `optimal-iterative.js` using repeated one-level `concat()`
  flattening.
- [x] Add separate notes for brute force, recursive, and iterative approaches.
- [x] Keep conditions, adjustment logic, visual tree, and execution table inside
  the approach notes after the approach has been introduced.
- [x] Show mixed values, object references, empty nested arrays, non-array input
  handling, and `concat()` one-level behavior.

Review List:

- [x] Run `node src/array/questions/flatten/brute-force.js`.
- [x] Run `node src/array/questions/flatten/optimal-recursive.js`.
- [x] Run `node src/array/questions/flatten/optimal-iterative.js`.
- [x] Run `node --check` for each `flatten/` runnable file.
- [x] Do a second note-format review for the `flatten/notes/` files.

## Sprint 2: Review `object/practice/index.js`

Status: review-ready

Checklist:

- [x] Replace unrelated scratchpad examples with object-section review
  practice.
- [x] Cover own vs inherited properties.
- [x] Cover enumerable vs non-enumerable properties.
- [x] Cover string keys, symbol keys, and `Reflect.ownKeys()`.
- [x] Cover descriptors and `Object.getOwnPropertyDescriptor()`.
- [x] Cover `Object.create()` prototype practice and `isPrototypeOf()`.
- [x] Cover object transformations with `Object.entries()`,
  `Object.fromEntries()`, `Object.values()`, `filter()`, `map()`, and
  `reduce()`.
- [x] Cover `Object.groupBy()` null-prototype results.
- [x] Cover sealed object behavior where an existing writable property can still
  be updated.
- [x] Add paired `index.md` explanation note.

Review List:

- [x] Run `node src/object/practice/index.js`.
- [x] Run `node --check src/object/practice/index.js`.
- [x] Do a second note-format review for `index.md`.

## Sprint 3: Review `deep-copy-object/` Question Folder

Status: review-ready

Checklist:

- [x] Replace scratch-style object question with focused deep-copy practice
  folder.
- [x] Add `problem.md` with the problem, examples, goal, and approach file map.
- [x] Add `brute-force.js` showing why shallow copy is not enough.
- [x] Add `better-json-clone.js` for JSON-safe data and JSON limitations.
- [x] Add `optimal-recursive.js` for the recursive plain-object/array learning
  solution.
- [x] Add `built-in-structured-clone.js` for the built-in comparison.
- [x] Show why shallow copy is not enough for nested objects.
- [x] Add recursive plain-object/array clone using `Array.isArray()`,
  `Object.entries()`, and `Object.fromEntries()`.
- [x] Show that copied nested objects and arrays are new references.
- [x] Explain helper limitations around symbols, non-enumerable properties,
  descriptors, prototypes, circular references, and special object types.
- [x] Compare with JSON cloning and its limits.
- [x] Compare with `structuredClone()`.
- [x] Add separate approach notes for brute force, JSON clone, recursive clone,
  and `structuredClone()`.

Review List:

- [x] Run `node src/object/questions/deep-copy-object/brute-force.js`.
- [x] Run `node src/object/questions/deep-copy-object/better-json-clone.js`.
- [x] Run `node src/object/questions/deep-copy-object/optimal-recursive.js`.
- [x] Run `node src/object/questions/deep-copy-object/built-in-structured-clone.js`.
- [x] Run `node --check` for each `deep-copy-object/` runnable file.
- [x] Do a second note-format review for the `deep-copy-object/notes/` files.
- [x] Run `git diff --check`.

## Stop Point

The current practice-question pages are review-ready. The next unchecked section
after this sprint is:

```text
src/reflect/methods/static/ownKeys/ownKeys.js
```
