# Current Content Sprint

## Active Story

### JS-CONTENT-001BR: Create The Proxy `get` Trap Lesson

As a learner, I want to understand exactly when the Proxy `get` trap runs and
what its parameters mean, so I can safely customize property reads without
breaking normal object behavior.

## Current Folder

```text
src/proxy/handlers/get/
```

## Current Files

```text
src/proxy/handlers/get/get.js
src/proxy/handlers/get/get.md
.codex/CONTENT_REVIEW_TRACKER.md
.codex/CURRENT_CONTENT_SPRINT.md
```

## Starting Point

- The user asked to check whether `proxy-basics` was correct and
  self-explanatory for a first-time learner.
- `proxy-basics` was re-read and checked against official Proxy/Reflect
  behavior.
- The page covers the required beginner foundation: target, handler, trap,
  empty handler forwarding, `get` and `set` parameter meanings, `Reflect`
  forwarding, proxy-vs-target identity, and direct target access bypassing the
  proxy.
- Because the page was good enough to build on, the next lesson in the revision
  sequence, `reflect-forwarding`, was created.
- The user then updated `src/proxy/organized-notes.md` and asked for its large
  explanation to be divided into numbered, topic-focused pages.
- The source already contained 20 clear `Part` headings, so those headings are
  used as the page boundaries and reading order.
- `src/proxy/reference_jsinfo.md` was removed because its useful material is now
  incorporated into the organized notes.
- The next unchecked tracker entry is `src/proxy/handlers/get/get.js`, followed
  by its paired `get.md` explanation.
- The focused source note is
  `src/proxy/organized-notes/04-get-trap.md`.
- Existing unrelated dirty file remains outside this sprint:
  `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get
https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects
```

Key facts:

- `Proxy` creates an object that can be used in place of the original object
  and can redefine fundamental object operations.
- The `target` is the original object being proxied.
- The `handler` contains traps that define proxy behavior.
- A trap defines behavior for the corresponding object internal method.
- `Reflect` has static methods with the same names as proxy handler methods.
- A major `Reflect` use case is default forwarding behavior in Proxy traps.
- `Reflect` can invoke the corresponding object internal method after the trap
  performs custom work.
- Calling a `Reflect` method on the proxy from inside that proxy's own trap can
  re-enter the same trap and cause recursion.
- The `get` trap intercepts the target's `[[Get]]` internal method.
- Its parameters are `target`, `property`, and `receiver`; `property` is a
  string or symbol, and `receiver` supplies `this` when a getter runs.
- The trap may return any value, and that value becomes the result of the
  property read.
- `proxy.name`, `proxy[key]`, and `Reflect.get(proxy, key)` can trigger the
  trap.
- A `get` trap must preserve the value of a non-writable, non-configurable own
  data property.

## Sprint 1: Recheck Proxy Basics

Status: review-ready

Checklist:

- [x] Re-read `src/proxy/concepts/proxy-basics/proxy-basics.md`.
- [x] Re-read `src/proxy/concepts/proxy-basics/proxy-basics.js`.
- [x] Check that the page explains target, handler, trap, empty handler,
  `get`, `set`, `receiver`, Reflect forwarding, proxy-vs-target identity, and
  direct target bypass.
- [x] Confirm the page is good enough for a first-time learner before moving
  forward.

## Sprint 2: Create Reflect Forwarding

Status: review-ready

Checklist:

- [x] Replace `src/proxy/concepts/reflect-forwarding/.gitkeep` with a real
  page.
- [x] Add `src/proxy/concepts/reflect-forwarding/reflect-forwarding.js`.
- [x] Add `src/proxy/concepts/reflect-forwarding/reflect-forwarding.md`.
- [x] Explain the trap -> custom work -> Reflect -> target mental model.
- [x] Show `Reflect.get()` forwarding.
- [x] Show `Reflect.set()` forwarding.
- [x] Show `Reflect.has()` forwarding.
- [x] Show `Reflect.deleteProperty()` forwarding.
- [x] Explain the `Reflect.get(...arguments)` shortcut.
- [x] Explain why forwarding to the same proxy can recurse.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/concepts/reflect-forwarding/reflect-forwarding.js`.
- [x] Run `node --check src/proxy/concepts/reflect-forwarding/reflect-forwarding.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `reflect-forwarding.md`.

## Sprint 3: Split The Organized Notes

Status: review-ready

Checklist:

- [x] Remove `src/proxy/reference_jsinfo.md`.
- [x] Replace the monolithic `src/proxy/organized-notes.md` with a dedicated
  `src/proxy/organized-notes/` folder.
- [x] Add `00-reading-order.md` as the entry page.
- [x] Create `01-proxy-fundamentals.md` through
  `20-complete-summary.md`.
- [x] Preserve the existing `Part 1` through `Part 20` titles.
- [x] Fold the original introduction into Part 1.
- [x] Preserve the continuous section numbering from `1` through `77`.
- [x] Link the numbered reading order from
  `proxy-reflect-revision-sequence.md`.

Review List:

- [x] Confirm every numbered page has one top-level `Part` heading.
- [x] Confirm code fences remain balanced in every numbered page.
- [x] Confirm the split preserves all source content except the replaced
  document title and extra blank line.

## Sprint 4: Create The `get` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/get/.gitkeep` with `get.js` and `get.md`.
- [x] Explain which operations trigger the `get` trap.
- [x] Explain `target`, `property`, and `receiver` in beginner-friendly terms.
- [x] Show normal forwarding with `Reflect.get()`.
- [x] Show string, numeric-index, and symbol property keys.
- [x] Show a missing-property fallback and a virtual property.
- [x] Preview why `receiver` matters without duplicating its dedicated lesson.
- [x] Explain the locked-property invariant with a runnable example.
- [x] Add common mistakes, usage guidance, references, and the runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/handlers/get/get.js`.
- [x] Run `node --check src/proxy/handlers/get/get.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `get.md`.

## Stop Point

This page is review-ready. The next unchecked section after this one is:

```text
src/proxy/concepts/receiver/receiver.js
```
