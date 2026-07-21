# Current Content Sprint

## Active Story

### JS-CONTENT-001CB: Create The Proxy `getPrototypeOf` Trap Lesson

As a learner, I want to understand how the Proxy `getPrototypeOf` trap reports
an object's immediate prototype, so I can distinguish prototype inspection
from property lookup, recognize indirect callers such as `isPrototypeOf()` and
`instanceof`, and preserve required target facts.

## Current Folder

```text
src/proxy/handlers/getPrototypeOf/
```

## Current Files

```text
src/proxy/handlers/getPrototypeOf/getPrototypeOf.js
src/proxy/handlers/getPrototypeOf/getPrototypeOf.md
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
- The `get` trap lesson was committed and pushed as `b556628`.
- The next unchecked tracker entry is
  `src/proxy/concepts/receiver/receiver.js`, followed by `receiver.md`.
- The focused source note for this lesson is
  `src/proxy/organized-notes/13-getter-inheritance-and-receiver.md`.
- The receiver lesson was committed and pushed as `9651b2d`.
- The next unchecked tracker entry is `src/proxy/handlers/set/set.js`, followed
  by its paired `set.md` explanation.
- The focused source note for this lesson is
  `src/proxy/organized-notes/05-set-trap.md`.
- The `set` trap lesson was committed and pushed as `3ca2e3e`.
- The next unchecked tracker entry is `src/proxy/handlers/has/has.js`, followed
  by its paired `has.md` explanation.
- The focused source note for this lesson is
  `src/proxy/organized-notes/09-has-trap.md`.
- The `has` trap lesson and final `set` clarifications were committed and pushed
  as `d5aed10`.
- The next unchecked tracker entry is
  `src/proxy/handlers/deleteProperty/deleteProperty.js`, followed by its paired
  `deleteProperty.md` explanation.
- Supporting source notes are `src/proxy/organized-notes/03-proxy-invariants.md`,
  `12-proxy-and-reflect-together.md`, and `18-best-practices.md`.
- The `deleteProperty` lesson and Reflect-forwarding doubt were committed and
  pushed as `c42255f`.
- The next unchecked tracker entry is
  `src/proxy/concepts/invariants/invariants.js`, followed by its paired
  `invariants.md` explanation.
- This consolidation lesson uses only the already-studied `get`, `set`, `has`,
  and `deleteProperty` traps for its detailed examples.
- The invariants lesson and `deleteProperty` clarification were committed and
  pushed as `d7ce65c`.
- The next unchecked tracker entry is `src/proxy/handlers/ownKeys/ownKeys.js`,
  followed by its paired `ownKeys.md` explanation.
- Supporting source notes are `src/proxy/organized-notes/06-property-listing.md`
  and `07-ownkeys-and-property-descriptors.md`.
- The `ownKeys` lesson was committed and pushed as `a926f28`.
- The next unchecked tracker entry is
  `src/proxy/handlers/getOwnPropertyDescriptor/getOwnPropertyDescriptor.js`,
  followed by its paired `getOwnPropertyDescriptor.md` explanation.
- The existing Object method lesson at
  `src/object/methods/static-methods/getOwnPropertyDescriptor/` supplies the
  descriptor foundation; this page focuses on Proxy interception.
- The `getOwnPropertyDescriptor` lesson was committed and pushed as `5daa09f`.
- The next unchecked tracker entry is
  `src/proxy/handlers/defineProperty/defineProperty.js`, followed by its paired
  `defineProperty.md` explanation.
- The existing Object method lesson at
  `src/object/methods/static-methods/defineProperty/` supplies the descriptor
  creation foundation; this page focuses on Proxy interception, forwarding,
  declared status, and invariants.
- The `defineProperty` lesson was committed and pushed as `f851886`.
- The next unchecked tracker entry is
  `src/proxy/concepts/protected-properties/protected-properties.js`, followed
  by its paired `protected-properties.md` explanation.
- This is a synthesis lesson that combines the already-studied `get`, `set`,
  `has`, `deleteProperty`, `ownKeys`, `getOwnPropertyDescriptor`, and
  `defineProperty` traps into one underscore-key policy.
- The focused source note is
  `src/proxy/organized-notes/08-protected-properties.md`.
- The protected-properties lesson was committed and pushed as `95683d8`.
- The next unchecked tracker entry is
  `src/proxy/handlers/getPrototypeOf/getPrototypeOf.js`, followed by its paired
  `getPrototypeOf.md` explanation.
- The existing Object method lesson at
  `src/object/methods/static-methods/getPrototypeOf/` supplies the prototype
  foundation; this page focuses on Proxy interception, virtual reports, and
  invariants.
- Existing unrelated dirty file remains outside this sprint:
  `src/playground/del.js`.

## Reference Findings

Sources checked:

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
https://tc39.es/ecma262/multipage/reflection.html#sec-proxy-objects
https://tc39.es/ecma262/multipage/ordinary-and-exotic-objects-behaviours.html#sec-proxy-object-internal-methods-and-internal-slots-defineownproperty-p-desc
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
- For `get`, `receiver` supplies the `this` value when a getter is evaluated.
- For `set`, `receiver` supplies the `this` value for setters and may receive
  the written property when it differs from `target`.
- In a direct read through a proxy, `target` is the wrapped object while
  `receiver` is usually the proxy.
- When another object inherits from the proxy, that inheriting object can be
  the receiver.
- Omitting the optional receiver from `Reflect.get()` or `Reflect.set()` makes
  it default to the target.
- The `set` trap intercepts the target's `[[Set]]` internal method.
- Its parameters are `target`, `property`, `value`, and `receiver`.
- The trap result is coerced to a boolean and becomes the trap's declared
  status; it does not independently verify whether stored data changed.
- A falsy declared status causes strict-mode assignment to throw `TypeError`.
- Returning `true` does not perform the write by itself.
- `Reflect.set()` performs normal assignment behavior and returns a boolean.
- Array methods such as `push()` can trigger `set` for indexes and `length`.
- A `set` trap must not pretend that an incompatible write succeeded for a
  non-writable, non-configurable own data property or a non-configurable own
  accessor without a setter.
- The `has` trap intercepts the target's `[[HasProperty]]` internal method.
- Its parameters are `target` and `property`; the property key is a string or
  symbol.
- Its result is coerced to a boolean and becomes the answer returned by `in`
  or `Reflect.has()`.
- Normal forwarding with `Reflect.has()` includes inherited properties, just
  like the `in` operator.
- `Object.hasOwn()` does not use the `has` trap because it checks own-property
  descriptors instead of `[[HasProperty]]`.
- A `has` trap cannot report a non-configurable own property as absent.
- A `has` trap also cannot report any own property as absent when the target is
  non-extensible.
- The `deleteProperty` trap intercepts the target's `[[Delete]]` internal
  method.
- Its parameters are `target` and `property`; the property key is a string or
  symbol.
- Its result is coerced to a boolean and becomes the deletion's declared
  status.
- Returning `true` does not delete a property by itself, and returning `false`
  does not restore a property already deleted by custom trap code.
- `Reflect.deleteProperty()` performs normal deletion and directly returns its
  boolean result.
- A falsy result from `[[Delete]]` makes strict-mode `delete` throw a
  `TypeError`, while `Reflect.deleteProperty()` exposes the `false` result.
- Normal deletion affects only own properties. Deleting a missing or inherited
  property reports success without removing a prototype property.
- A trap cannot report successful deletion while a non-configurable own
  property still exists on the target.
- A trap also cannot report successful deletion while an own property still
  exists on a non-extensible target.
- Proxy invariants are semantics that custom trap behavior must leave
  unchanged.
- JavaScript verifies invariants against the Proxy target, especially facts
  created by non-configurable properties and non-extensible objects.
- Custom behavior remains valid when it does not contradict the particular
  trap's protected target facts.
- The `get`, `set`, `has`, and `deleteProperty` traps enforce different rules;
  there is no single invariant shared identically by every trap.
- An invariant violation throws a `TypeError` from the proxy operation after
  the trap produces a contradictory result.
- Matching `Reflect` methods are a strong forwarding default because their
  results normally remain consistent with the target operation.
- The `ownKeys` trap intercepts the target's `[[OwnPropertyKeys]]` internal
  method and receives only `target`.
- `Reflect.ownKeys(proxy)`, `Object.keys(proxy)`,
  `Object.getOwnPropertyNames(proxy)`, and
  `Object.getOwnPropertySymbols(proxy)` can trigger the trap.
- `Reflect.ownKeys(target)` is the normal forwarding operation and supplies all
  own string and symbol keys, including non-enumerable keys.
- APIs such as `Object.keys()` apply additional string and enumerability filters
  after receiving the candidate list from `ownKeys`.
- Virtual keys returned by `ownKeys` appear in `Reflect.ownKeys()`, but
  `Object.keys()` also needs suitable enumerable property descriptors.
- The result must be an object containing only unique string or symbol keys.
- The result must include every non-configurable own key of the target.
- For a non-extensible target, the result must contain exactly the target's own
  keys, although their order may be customized.
- The `getOwnPropertyDescriptor` trap intercepts the target's
  `[[GetOwnProperty]]` internal method and receives `target` plus a string or
  symbol property key.
- It must return a descriptor object or `undefined`; omitted descriptor fields
  are normalized with the same defaults used by property-definition syntax.
- `Object.getOwnPropertyDescriptor()`,
  `Reflect.getOwnPropertyDescriptor()`, `Object.hasOwn()`,
  `propertyIsEnumerable()`, and descriptor-filtering listing operations can
  trigger the trap.
- Returning a descriptor reports an own property to descriptor-sensitive
  operations but does not create storage or change ordinary `get` behavior.
- Returning `undefined` may hide a configurable property on an extensible
  target, but cannot hide a non-configurable own property or any own property
  on a non-extensible target.
- A missing target property may be reported virtually only while the target is
  extensible and only as configurable.
- Reported descriptors must remain compatible with protected target
  descriptors.
- The `defineProperty` trap intercepts the proxy's `[[DefineOwnProperty]]`
  internal method and receives `target`, a string or symbol `property`, and a
  descriptor object.
- `Object.defineProperty()`, `Object.defineProperties()`, and
  `Reflect.defineProperty()` can trigger the trap. Other operations may also
  reach it when they invoke `[[DefineOwnProperty]]` internally.
- The trap result is coerced to a boolean and declares whether the requested
  definition was accepted; the returned value does not define a property by
  itself.
- `Reflect.defineProperty(target, property, descriptor)` performs normal
  definition behavior and returns the matching boolean status.
- `Object.defineProperty()` throws when the proxy reports failure, while
  `Reflect.defineProperty()` exposes the `false` status.
- Only standard descriptor fields reach the trap. Omitted fields remain absent
  from the descriptor request and custom fields are ignored.
- A truthy result cannot claim that a property was added to a non-extensible
  target or that a descriptor change succeeded when it contradicts protected
  target facts.
- A trap cannot merely claim that a property became non-configurable or that a
  non-configurable writable property became non-writable; the target must
  actually have the matching protected state after the trap runs.
- An underscore prefix is a naming convention, not language-enforced privacy.
- A consistent protected-property facade needs multiple traps because reads,
  writes, existence checks, deletions, key listings, descriptor reads, and
  descriptor definitions request different internal object methods.
- `ownKeys` filtering alone does not hide a property from direct reads, the
  `in` operator, `Object.hasOwn()`, or descriptor inspection.
- Hiding an own property from `ownKeys`, `has`, and
  `getOwnPropertyDescriptor` is valid only while the target facts permit it.
  Non-configurable properties and non-extensible targets restrict those
  reports.
- Binding methods to the target can let trusted methods access protected keys,
  but all property operations performed with `this === target` bypass the
  proxy's traps.
- Keeping the target unreachable is necessary when callers must follow the
  facade, but a proxy policy is still not the same as native private elements.
- Native `#` private elements are enforced by JavaScript and are not ordinary
  string- or symbol-keyed properties that Proxy traps can enumerate or hide.
- The `getPrototypeOf` trap intercepts the proxy's `[[GetPrototypeOf]]`
  internal method and receives only `target`.
- It must return an object or `null`, representing the prototype reported for
  the proxy.
- `Object.getPrototypeOf()`, `Reflect.getPrototypeOf()`, the legacy
  `__proto__` getter, `Object.prototype.isPrototypeOf()`, and standard
  `instanceof` checks can invoke the trap.
- `Reflect.getPrototypeOf(target)` is the normal forwarding operation and
  returns the target's actual immediate prototype.
- While the target is extensible, a trap may report a different object or
  `null` as a virtual prototype.
- Reporting a virtual prototype does not change the target's actual prototype
  and does not automatically redirect ordinary property lookup.
- If the target is non-extensible, the trap must return the target's actual
  prototype exactly.
- `Object.create(proxy)` uses the proxy itself as the new object's prototype;
  it does not first request the proxy's own prototype.

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

## Sprint 5: Explain `receiver`

Status: review-ready

Checklist:

- [x] Replace `src/proxy/concepts/receiver/.gitkeep` with `receiver.js` and
  `receiver.md`.
- [x] Define `target`, `receiver`, trap `this`, and getter/setter `this`
  separately.
- [x] Establish normal getter inheritance before introducing a proxy.
- [x] Show why `target[property]` returns the wrong inherited getter value.
- [x] Show how `Reflect.get(target, property, receiver)` fixes it.
- [x] Trace direct-proxy and inheriting-object receiver values.
- [x] Show that a receiver matters to accessors but not a plain data read.
- [x] Add a focused `Reflect.set()` receiver preview.
- [x] Add common mistakes, usage guidance, references, and the runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/concepts/receiver/receiver.js`.
- [x] Run `node --check src/proxy/concepts/receiver/receiver.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `receiver.md`.

## Sprint 6: Create The `set` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/set/.gitkeep` with `set.js` and `set.md`.
- [x] Explain which operations trigger the `set` trap.
- [x] Explain `target`, `property`, `value`, and `receiver`.
- [x] Separate intercepting, performing, and reporting a write.
- [x] Show validation with normal `Reflect.set()` forwarding.
- [x] Explain truthy/falsy trap results and strict-mode failure.
- [x] Show string, numeric-index, and symbol property keys.
- [x] Show how array `push()` triggers index and `length` writes.
- [x] Show an inherited receiver receiving the property.
- [x] Explain the locked-property invariants with a runnable example.
- [x] Add common mistakes, usage guidance, references, and the runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/handlers/set/set.js`.
- [x] Run `node --check src/proxy/handlers/set/set.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `set.md`.

## Sprint 7: Create The `has` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/has/.gitkeep` with `has.js` and `has.md`.
- [x] Explain which operations trigger the `has` trap.
- [x] Explain `target`, `property`, and the boolean result.
- [x] Compare `in`, `Reflect.has()`, and `Object.hasOwn()`.
- [x] Show inherited-property behavior during normal forwarding.
- [x] Show string, numeric-index, and symbol property keys.
- [x] Show configurable-property hiding without implying value protection.
- [x] Show virtual existence without creating a property or value.
- [x] Explain the range-membership example and string key conversion.
- [x] Explain both `has` invariants with runnable examples.
- [x] Add common mistakes, usage guidance, references, and the runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/handlers/has/has.js`.
- [x] Run `node --check src/proxy/handlers/has/has.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `has.md`.

## Sprint 8: Create The `deleteProperty` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/deleteProperty/.gitkeep` with
  `deleteProperty.js` and `deleteProperty.md`.
- [x] Explain which operations trigger the `deleteProperty` trap.
- [x] Explain `target`, `property`, and the boolean result.
- [x] Separate intercepting, performing, and reporting a deletion.
- [x] Compare `delete` with `Reflect.deleteProperty()`.
- [x] Show missing and inherited-property deletion behavior.
- [x] Show string, numeric-index, and symbol property keys.
- [x] Show that deleting an array index leaves an empty slot.
- [x] Show a protected-property policy and strict-mode failure.
- [x] Explain both `deleteProperty` invariants with runnable examples.
- [x] Add common mistakes, usage guidance, references, and the runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/handlers/deleteProperty/deleteProperty.js`.
- [x] Run `node --check src/proxy/handlers/deleteProperty/deleteProperty.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `deleteProperty.md`.

## Sprint 9: Create The Proxy Invariants Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/concepts/invariants/.gitkeep` with `invariants.js` and
  `invariants.md`.
- [x] Define invariants as protected facts that custom trap results must not
  contradict.
- [x] Explain when JavaScript checks a trap result and why it throws
  `TypeError`.
- [x] Show that custom behavior is valid when no invariant is violated.
- [x] Explain the studied `get` invariants with runnable examples.
- [x] Explain the studied `set` invariants with runnable examples.
- [x] Explain the studied `has` invariants with runnable examples.
- [x] Explain the studied `deleteProperty` invariants with runnable examples.
- [x] Explain how descriptors and target extensibility create protected facts.
- [x] Preview that later traps have their own invariants without teaching them
  prematurely.
- [x] Add common mistakes, debugging guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/concepts/invariants/invariants.js`.
- [x] Run `node --check src/proxy/concepts/invariants/invariants.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `invariants.md`.

## Sprint 10: Create The Proxy `ownKeys` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/ownKeys/.gitkeep` with `ownKeys.js` and
  `ownKeys.md`.
- [x] Explain `[[OwnPropertyKeys]]`, `target`, and the returned key list.
- [x] Show normal forwarding with `Reflect.ownKeys()`.
- [x] Compare how listing APIs filter the candidate key list.
- [x] Explain why `Object.keys()` may need property descriptors after
  `ownKeys`.
- [x] Show configurable-key filtering without implying value protection.
- [x] Show virtual keys with and without matching descriptor behavior.
- [x] Show string, symbol, enumerable, non-enumerable, and array keys.
- [x] Show that key listing does not itself read values or run getters.
- [x] Explain result type, key type, duplicate, non-configurable-key, and
  non-extensible-target invariants.
- [x] Show direct target listing bypassing the proxy.
- [x] Add common mistakes, usage guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run `node src/proxy/handlers/ownKeys/ownKeys.js`.
- [x] Run `node --check src/proxy/handlers/ownKeys/ownKeys.js`.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `ownKeys.md`.

## Sprint 11: Create The Proxy `getOwnPropertyDescriptor` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/getOwnPropertyDescriptor/.gitkeep` with the
  runnable `.js` and paired `.md` lesson.
- [x] Explain `[[GetOwnProperty]]`, `target`, `property`, and the descriptor or
  `undefined` result.
- [x] Show normal forwarding with `Reflect.getOwnPropertyDescriptor()`.
- [x] Review data and accessor descriptor shapes without duplicating the Object
  method lesson.
- [x] Explain descriptor normalization and that reading descriptors does not
  run getters.
- [x] Show operations such as `Object.hasOwn()`, `propertyIsEnumerable()`, and
  `Object.keys()` triggering descriptor checks.
- [x] Show that reported descriptors do not create storage or control ordinary
  value reads.
- [x] Connect virtual enumerable keys with `ownKeys` and `get` behavior.
- [x] Show string, numeric-index, and symbol property keys.
- [x] Explain result-type, hidden-property, virtual-property,
  non-configurability, and compatibility invariants.
- [x] Show direct target inspection bypassing the proxy.
- [x] Add common mistakes, usage guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run the `getOwnPropertyDescriptor.js` practice file.
- [x] Run `node --check` on the practice file.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `getOwnPropertyDescriptor.md`.

## Sprint 12: Create The Proxy `defineProperty` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/defineProperty/.gitkeep` with the runnable
  `.js` and paired `.md` lesson.
- [x] Explain `[[DefineOwnProperty]]`, `target`, `property`, `descriptor`, and
  the boolean trap result.
- [x] Show normal forwarding with `Reflect.defineProperty()`.
- [x] Compare `Object.defineProperty()` and `Reflect.defineProperty()` when the
  trap reports failure.
- [x] Separate intercepting, performing, and reporting a property definition.
- [x] Explain recognized descriptor fields, omitted fields, defaults, and
  accessor descriptors.
- [x] Show `Object.defineProperties()` invoking the trap once per property.
- [x] Explain why assignment can sometimes run both `set` and
  `defineProperty`.
- [x] Show validation, descriptor transformation, string, numeric, and symbol
  keys.
- [x] Explain non-extensible-target, non-configurability, compatibility, and
  non-writable transition invariants.
- [x] Show direct target definition bypassing the trap.
- [x] Add common mistakes, usage guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run the `defineProperty.js` practice file.
- [x] Run `node --check` on the practice file.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `defineProperty.md`.

## Sprint 13: Create The Proxy Protected Properties Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/concepts/protected-properties/.gitkeep` with the
  runnable `.js` and paired `.md` lesson.
- [x] Explain that underscore-prefixed keys are conventional internal keys,
  not native private data.
- [x] Build one shared protected-key predicate and coordinated `get`, `set`,
  `has`, `deleteProperty`, `ownKeys`, `getOwnPropertyDescriptor`, and
  `defineProperty` traps.
- [x] Map direct access, existence, deletion, listing, descriptor, and
  definition operations to the trap that enforces each part of the policy.
- [x] Show public reads, writes, deletions, and definitions continuing through
  normal Reflect forwarding.
- [x] Show protected reads, writes, deletions, existence checks, descriptor
  reads, listings, spread, and descriptor definitions.
- [x] Explain string-key scope and why symbols are not private automatically.
- [x] Explain method receiver behavior, target binding, and the bypass tradeoff.
- [x] Show why leaked target access bypasses every proxy rule.
- [x] Explain configurable-property and extensible-target requirements for
  hiding keys without violating invariants.
- [x] Distinguish a Proxy facade from closures, WeakMaps, and native private
  elements without teaching the later private-field Proxy page prematurely.
- [x] Add common mistakes, usage guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run the `protected-properties.js` practice file.
- [x] Run `node --check` on the practice file.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `protected-properties.md`.

## Sprint 14: Create The Proxy `getPrototypeOf` Trap Lesson

Status: review-ready

Checklist:

- [x] Replace `src/proxy/handlers/getPrototypeOf/.gitkeep` with the runnable
  `.js` and paired `.md` lesson.
- [x] Explain `[[GetPrototypeOf]]`, the `target` parameter, trap `this`, and the
  object-or-`null` return requirement.
- [x] Show normal forwarding with `Reflect.getPrototypeOf()` and one immediate
  prototype at a time.
- [x] Show `Object.getPrototypeOf()`, `Reflect.getPrototypeOf()`, `__proto__`,
  `isPrototypeOf()`, and `instanceof` invoking the trap.
- [x] Explain why the legacy `__proto__` getter reaches `[[GetPrototypeOf]]`.
- [x] Show a virtual prototype on an extensible target.
- [x] Separate reported prototype identity from actual target prototype,
  ordinary property lookup, and prototype mutation.
- [x] Show how a matching `get` trap can coordinate value lookup when a virtual
  prototype is intended to provide behavior.
- [x] Explain `Object.create(proxy)` using the proxy itself without inspecting
  the proxy's prototype.
- [x] Show valid `null` results and invalid primitive results.
- [x] Explain the exact non-extensible-target invariant and the effect of
  making a previously extensible target non-extensible.
- [x] Show direct target inspection bypassing the trap.
- [x] Add common mistakes, usage guidance, references, and runnable command.
- [x] Update `.codex/CONTENT_REVIEW_TRACKER.md`.

Review List:

- [x] Run the `getPrototypeOf.js` practice file.
- [x] Run `node --check` on the practice file.
- [x] Run `git diff --check`.
- [x] Do a second note-format review for `getPrototypeOf.md`.

## Stop Point

The next page is:

```text
src/proxy/handlers/setPrototypeOf/setPrototypeOf.js
```
