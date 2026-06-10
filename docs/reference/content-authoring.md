# Content Authoring

Use this checklist when turning a source example into a learner-facing docs page.

This does not mean moving topic source files out of `src/`. Keep source examples runnable in `src/`; write polished explanations and navigation in `docs/`.

## Page Shape

Each learner-facing page should include:

1. What the concept is.
2. Why it matters.
3. Syntax or mental model.
4. Runnable example.
5. Expected output.
6. Common mistakes.
7. Related topics.

## Source To Docs Mapping

```text
src/fundamentals/ -> docs/fundamentals/
src/functions/ -> docs/functions/
src/array/ -> docs/arrays/
src/object/ -> docs/objects/
src/string/ -> docs/strings/
src/async/ -> docs/async/
src/collections/ -> docs/collections/
src/advanced/ -> docs/advanced/
```

## Current Decision

The docs scaffold is VitePress-ready, but the VitePress dependency is not installed yet. Install and wire scripts in a separate dependency sprint.
