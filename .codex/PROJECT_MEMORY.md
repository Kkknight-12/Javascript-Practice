# Project Memory

## Project Shape

This repository is a public JavaScript practice and revision workspace. It should stay terminal-first: runnable `.js` examples in `src/`, with explanations as nearby `.md` notes when useful.

## Structure Decisions

Use topic-first organization for learning content. The current source tree keeps the older singular folder names for arrays, objects, and strings, while the newer cross-cutting topics now live under clearer parent folders:

```text
src/
  advanced/
    design-patterns/
  array/
  async/
    event-loop/
  classes/
  collections/
    map/
  fundamentals/
    scope/
    hoisting/
  functions/
  miscellaneous/
  object/
  playground/
  string/
```

Completed Sprint 3 mappings:

```text
src/EventLoop/  -> src/async/event-loop/
src/hoisting/   -> src/fundamentals/hoisting/
src/scope/      -> src/fundamentals/scope/
src/map/        -> src/collections/map/
src/pattern/    -> src/advanced/design-patterns/
```

If a file is about `Array.prototype.map`, keep it under array methods instead of `collections/map`.

## Array Topic Buckets

Keep `src/array/` root free of loose tracked `.js` learning files. Route files
into a topic bucket:

```text
src/array/
  creation/
    create-array-shortcuts.js
  loop/
    basic-loop/
      basic-loop.js
      basic-loop.md
    for-of/
    for-await-of/
  methods/
    constructor/
    instance/
    static/
  questions/
```

- Array creation basics, such as spread, `Array.of()`, `Array.from()`,
  `new Array()`, and `fill()` combinations, belong in `src/array/creation/`.
- General array loop examples belong in `src/array/loop/`.
- Method-specific examples belong under `src/array/methods/`.
- Practice questions belong under `src/array/questions/`.

## Array Method Buckets

Array method practice should be grouped by where the API lives:

```text
src/array/methods/
  constructor/
    constructor.js
  instance/
    concat.js
    map-filter.js
    reduce.js
    ...
  static/
    Array.from/
      array.from.js
      array.from.md
    Array.fromAsync/
    Array.isArray/
```

- Instance methods are called on array values, for example `arr.map()` or
  `arr.includes()`, so they belong in `src/array/methods/instance/`.
- Static methods are called on `Array`, for example `Array.from()` or
  `Array.isArray()`, so they belong in `src/array/methods/static/`.
- `constructor.js` is about `new Array(...)` / `Array(...)`, so keep it under
  `src/array/methods/constructor/` instead of forcing it into instance/static.

## Current Risks

- Larger topic moves should stay reviewable and happen in a separate sprint.
- Some older camelCase method filenames still exist, but the most obvious typo/punctuation names were cleaned in Sprint 2.
- Scratch files were moved into `src/playground/` during Sprint 1.
- Site-generation or browser-preview work does not belong in this repo unless the user explicitly changes direction.

## Sprint 2 Naming Cleanup

Completed typo/casing/punctuation renames:

```text
src/array/methods/array.proptotype.js -> src/array/methods/instance/array.prototype.js
src/array/methods/mapFIlter.js -> src/array/methods/instance/map-filter.js
src/classes/BasicSyntax1.js -> src/classes/basic-syntax-1.js
src/classes/PrivateClass.js -> src/classes/private-class.js
src/functions/HOF.js -> src/functions/higher-order-functions.js
src/map/loop,-map.js -> src/map/loop-map.js
src/object/loopthroughObject/ -> src/object/loop-through-object/
src/string/methods/instance-methods/subString.js -> src/string/methods/instance-methods/substring.js
```

## Sprint 3 Topic Folder Restructure

Completed topic-folder moves:

```text
src/EventLoop/ -> src/async/event-loop/
src/hoisting/ -> src/fundamentals/hoisting/
src/scope/ -> src/fundamentals/scope/
src/map/ -> src/collections/map/
src/pattern/ -> src/advanced/design-patterns/
```

## Workflow

- Keep repo-local planning in `.codex/`.
- Write a story, sprint checklist, and review list before implementation.
- Start with low-risk hygiene and documentation before restructuring folders.
- Generated dependencies, OS files, and IDE files should stay ignored. They were removed from Git tracking during Sprint 1 with `git rm --cached`.

## Runnable JavaScript Teaching Pattern

When reviewing or polishing runnable `.js` files, keep the file useful for a
first-time learner who opens it directly in the editor or runs it in the
terminal.

Use the `src/array/methods/static/Array.from/array.from.js` review as the current pattern:

- Keep focused examples only; remove unrelated scratch experiments.
- Keep learner-facing comments before meaningful examples.
- Explain why the example works, not only what it prints.
- Include expected output comments near each `console.log`.
- Use clear terminal labels in `console.log` output.
- Keep the `.js` file independently understandable even when a nearby `.md`
  file also exists.
- Do not over-clean runnable files into bare code; the repo is for learning and
  revision, so useful explanation inside `.js` is part of the content.

When a `.md` explanation has a paired runnable `.js` file, add a short
`Runnable Practice File` section that shows the exact `node ...` command from
the repo root and explains that the `.js` file contains commented examples,
terminal labels, and expected output comments. Use
`src/array/methods/static/Array.from/array.from.md` as the current pattern.

## Markdown Study Note Teaching Pattern

When reviewing or creating a method/topic `.md` file, use
`src/array/methods/static/Array.from/array.from.md` as the current teaching
pattern.

Preferred flow:

1. Start with `What Problem Does It Solve?`
2. Add a `Quick Definition`.
3. Add a simple `Mental Model`.
4. Show `Syntax`.
5. Explain `Parameters`.
6. Explain `Return Value`.
7. Teach examples in small sections.
8. After each important example, explain what happened in simple words.
9. Add `Important Notes`.
10. Add `When To Use It`.
11. Add `Common Mistakes`.
12. Add `Runnable Practice File` with the exact repo-root `node ...` command.
13. Add the trusted reference link, usually MDN.

Before writing or polishing a page, cross-check behavior against MDN or another
trusted reference. Keep the note learner-first, not a compressed reference
sheet: define the method, say what it does, show the smallest useful examples,
then add gotchas and deeper details.

## Collaboration Rules From DSA Visual Learning

These rules are adapted from the user's `dsa-visual-learning` workflow and apply
to future work in this repo:

- Discuss first, then act. For non-trivial work, brainstorm the direction with
  the user before editing files.
- Do not continue just because the next step seems obvious. Wait for the user
  to explicitly say to continue.
- Before coding or restructuring, inspect the existing repo state and explain
  the current situation in plain terms.
- For meaningful work, create or update a small story/sprint/checklist before
  implementation.
- Keep each sprint small and reviewable. Finish one slice, verify it, then stop
  for user review.
- Do not commit, push, merge, rewrite history, or remove public files unless the
  user explicitly asks.
- Do not revert unrelated dirty files.
- For this repo, preserve the terminal-first practice workflow unless the user
  explicitly chooses another direction. Keep `npm run dev` focused on running a
  JavaScript file with `nodemon`.
- Do not add site-generation or browser-preview work without explicit approval.

## Public Repo Scope Correction

The earlier site scaffold and plan were removed from the current repo view because this repo is public and the user does not want that direction here.

Keep explanations next to source examples instead:

```text
src/array/methods/instance/reduce.js
src/array/methods/instance/reduce.md

src/fundamentals/scope/var.js
src/fundamentals/scope/var.md
```
