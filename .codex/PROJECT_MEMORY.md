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

## Current Risks

- Larger topic moves should stay reviewable and happen in a separate sprint.
- Some older camelCase method filenames still exist, but the most obvious typo/punctuation names were cleaned in Sprint 2.
- Scratch files were moved into `src/playground/` during Sprint 1.
- Site-generation or browser-preview work does not belong in this repo unless the user explicitly changes direction.

## Sprint 2 Naming Cleanup

Completed typo/casing/punctuation renames:

```text
src/array/methods/array.proptotype.js -> src/array/methods/array.prototype.js
src/array/methods/mapFIlter.js -> src/array/methods/map-filter.js
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

Use the `src/array/methods/static/array.from.js` review as the current pattern:

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
`src/array/methods/static/array.from.md` as the current pattern.

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
src/array/methods/reduce.js
src/array/methods/reduce.md

src/fundamentals/scope/var.js
src/fundamentals/scope/var.md
```
