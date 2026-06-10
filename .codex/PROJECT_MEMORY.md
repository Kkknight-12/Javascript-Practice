# Project Memory

## Project Shape

This repository is currently a JavaScript practice and revision workspace. The long-term direction recorded in `CLAUDE.md` and `WEBSITE_PROJECT_PLAN.md` is to evolve it into a public educational website, likely using VitePress.

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
