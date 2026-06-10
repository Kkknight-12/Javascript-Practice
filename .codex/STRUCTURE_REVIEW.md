# Structure Review

## Verdict

The current structure is intended for public, terminal-first JavaScript practice.

## What Is Good

- Top-level topic grouping is easy to understand.
- Arrays, objects, strings, classes, functions, hoisting, scope, map, event loop, and patterns are already separated.
- The repo contains both runnable `.js` examples and `.md` learning notes.

## What Needs Work

- Move from mixed naming to consistent lowercase kebab-case folders.
- Separate scratch/playground files from durable learning content.
- Keep JavaScript `Map` separate from `Array.prototype.map`.
- Clean Git hygiene around `node_modules`, `.DS_Store`, and IDE metadata.
- Keep explanations close to runnable source files. Prefer `.md` notes beside the related `.js` examples.

## Target Topic Placement

```text
fundamentals/
  scope/
  hoisting/
  execution-context/

async/
  event-loop/

collections/
  map/

advanced/
  design-patterns/
```

## Explanation Shape

Use adjacent notes:

```text
src/array/methods/reduce.js
src/array/methods/reduce.md

src/fundamentals/scope/var.js
src/fundamentals/scope/var.md
```
