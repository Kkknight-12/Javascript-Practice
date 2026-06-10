# Structure Review

## Verdict

The current structure is good enough for personal JavaScript practice, but it needs cleanup before becoming a public learning site.

## What Is Good

- Top-level topic grouping is easy to understand.
- Arrays, objects, strings, classes, functions, hoisting, scope, map, event loop, and patterns are already separated.
- The repo contains both runnable `.js` examples and `.md` learning notes.

## What Needs Work

- Move from mixed naming to consistent lowercase kebab-case folders.
- Separate scratch/playground files from durable learning content.
- Keep JavaScript `Map` separate from `Array.prototype.map`.
- Clean Git hygiene around `node_modules`, `.DS_Store`, and IDE metadata.
- Add a future docs layer only after the source content is stable.

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

## Future Website Shape

When VitePress starts, mirror the learning topics into `docs/` instead of forcing the current practice files to become docs immediately:

```text
docs/
  index.md
  fundamentals/
  arrays/
  objects/
  strings/
  async/
  collections/
  advanced/
```
