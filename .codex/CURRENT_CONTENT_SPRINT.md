# Current Content Sprint

## Active Story

### JS-CONTENT-001AJ: Review Object.prototype.toLocaleString

As a learner, I want to understand `Object.prototype.toLocaleString()` as the
base method that delegates to `this.toString()`, so I can tell the difference
between Object's fallback behavior and locale-aware built-in overrides.

## Current Folder

```text
src/object/methods/instance/toLocaleString/
```

## Current Files

```text
src/object/methods/instance/toLocaleString/toLocaleString.js
src/object/methods/instance/toLocaleString/toLocaleString.md
```

## Starting Point

- The next unchecked object page was
  `src/object/methods/instance/toLocaleString/toLocaleString.js`.
- The existing runnable file showed the basic Object fallback plus Number and
  Date overrides, but did not yet have a paired study note.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.tolocalestring
```

Key facts:

- `Object.prototype.toLocaleString()` returns the result of calling
  `this.toString()`.
- The base Object version does not use locale/options arguments.
- The optional parameter positions are reserved for the pattern used by
  locale-aware overrides.
- Built-ins such as `Array`, `Number`, `Date`, `BigInt`, and typed arrays
  override `toLocaleString()` with locale-aware behavior.
- Null-prototype objects do not inherit the method.

## Sprint 1: Review `toLocaleString`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Expand `toLocaleString.js` with learner-facing examples.
- [x] Add paired `toLocaleString.md` teaching note.
- [x] Cover Object fallback behavior, custom `toString()`, ignored base
  arguments, built-in overrides, null-prototype objects, and non-callable
  `toString`.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/instance/toLocaleString/toLocaleString.js`.
- [x] Run `node --check src/object/methods/instance/toLocaleString/toLocaleString.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/instance/toString/toString.js
```
