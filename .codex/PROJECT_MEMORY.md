# Project Memory

## Project Shape

This repository is currently a JavaScript practice and revision workspace. The long-term direction recorded in `CLAUDE.md` and `WEBSITE_PROJECT_PLAN.md` is to evolve it into a public educational website, likely using VitePress.

## Structure Decisions

Use topic-first organization for learning content:

```text
src/
  fundamentals/
    scope/
    hoisting/
    execution-context/
  arrays/
  objects/
  strings/
  functions/
  async/
    event-loop/
  collections/
    map/
  oop/
  advanced/
    design-patterns/
  playground/
```

Specific mappings from the current tree:

```text
src/EventLoop/  -> src/async/event-loop/
src/hoisting/   -> src/fundamentals/hoisting/
src/scope/      -> src/fundamentals/scope/
src/map/        -> src/collections/map/
src/pattern/    -> src/advanced/design-patterns/
```

If a file is about `Array.prototype.map`, keep it under array methods instead of `collections/map`.

## Current Risks

- `node_modules`, `.DS_Store`, and `.idea` files are currently tracked or visible in Git status.
- There are many uncommitted changes and deleted paths, so large file moves should wait for review.
- Some names are inconsistent or misspelled, for example `EventLoop`, `loopthroughObject`, `mapFIlter.js`, `array.proptotype.js`, and `subString.js`.
- Scratch files were moved into `src/playground/` during Sprint 1.

## Workflow

- Keep repo-local planning in `.codex/`.
- Write a story, sprint checklist, and review list before implementation.
- Start with low-risk hygiene and documentation before restructuring folders.
- Generated dependencies, OS files, and IDE files should stay ignored. They were removed from Git tracking during Sprint 1 with `git rm --cached`.
