# Current Content Sprint

## Active Story

### JS-CONTENT-001BH: Review Object.setPrototypeOf

As a learner, I want to understand `Object.setPrototypeOf()` as the method that
changes an existing object's immediate prototype, so I can separate prototype
mutation from safer creation-time prototype choices.

## Current Folder

```text
src/object/methods/static-methods/setPrototypeOf/
```

## Current Files

```text
src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.js
src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.md
```

## Starting Point

- The next real unchecked page was the `Object.setPrototypeOf()` page under
  `src/object/methods/static-methods/`.
- The existing runnable file explained prototype-chain performance concerns and
  basic constructor-function inheritance, but it was still a loose file and did
  not have a paired study note.
- The reviewed page was moved into `setPrototypeOf/` with `setPrototypeOf.js`
  and `setPrototypeOf.md`.
- Existing unrelated dirty files remain outside this sprint:
  `src/array/questions/flatten.js` and `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.setprototypeof
```

Key facts:

- `Object.setPrototypeOf(object, prototype)` sets an object's immediate
  prototype and returns the first argument.
- The new prototype must be an object or `null`.
- `null` and `undefined` object arguments throw `TypeError`.
- Non-null primitive object arguments are returned as-is when the prototype
  argument is valid.
- Non-extensible objects cannot be changed to a different prototype.
- Setting the same prototype again is allowed.
- `Object.prototype` has an immutable prototype.
- Changing prototypes after creation can hurt performance and readability.
- `Object.create()` is preferred when the desired prototype is known at creation
  time.

## Sprint 1: Review `Object.setPrototypeOf`

Status: review-ready

Checklist:

- [x] Inspect the existing runnable file.
- [x] Cross-check behavior against MDN and the ECMAScript spec.
- [x] Move the reviewed page into `setPrototypeOf/` with method-page naming.
- [x] Rewrite `setPrototypeOf.js` with learner-facing examples.
- [x] Add paired `setPrototypeOf.md` teaching note.
- [x] Cover immediate prototype changes, same-object return value, null
  prototypes, invalid prototype values, primitive object arguments,
  non-extensible objects, immutable prototype objects, `Object.create()`
  comparison, constructor-function prototype chains, static inheritance,
  `Reflect.setPrototypeOf()`, and `__proto__`.
- [x] Update static-method, `isPrototypeOf()`, and overview links.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.js`.
- [x] Run `node --check src/object/methods/static-methods/setPrototypeOf/setPrototypeOf.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review against the project teaching pattern.

## Stop Point

This page is review-ready. The next unchecked object page after this one is:

```text
src/object/methods/static-methods/values.js
```
