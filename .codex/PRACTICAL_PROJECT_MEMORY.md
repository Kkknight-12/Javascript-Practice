# Practical Project Memory

## Purpose

This file defines the project-based practice mode for the JavaScript practice
repo.

The goal is not to build a large product.

The goal is to practise the agreed JavaScript topics inside small, realistic
development situations.

The project provides the environment. Topic coverage is the deliverable.

## Source Of Truth

Use these memory files together:

```text
PRACTICAL_PROJECT_MEMORY.md  -> project-based practice workflow
PROJECT_MEMORY.md            -> note-authoring and question-teaching workflow
```

Project work does not replace the existing note system.

When project work reveals a missing or weak explanation, temporarily return to
the paired `.js` plus `.md` note workflow in `PROJECT_MEMORY.md`, repair the
learning material, and then resume the same project ticket.

## Non-Negotiable Principles

- Cover every topic in the agreed core and advanced topic inventories.
- Use compact projects rather than a catalogue of disconnected exercises.
- Keep the work focused on JavaScript behavior and browser development.
- Use vanilla TypeScript, native ES modules, HTML, and only enough CSS to make
  the interface usable. TypeScript supplies compile-time checks; runtime
  explanations must still identify the underlying JavaScript behavior.
- Do not add a framework, backend, authentication system, deployment pipeline,
  database, or elaborate visual design unless the user explicitly changes the
  scope.
- Keep TypeScript strict, but begin with ordinary annotations, object types,
  unions, and narrowing. Do not let advanced type-level programming replace
  JavaScript practice.
- Distinguish TypeScript compiler errors from JavaScript runtime and logic
  errors during reviews.
- Do not use `any` merely to silence a compiler error.
- Give each concept a real project requirement.
- Fit concepts into the project; do not reshape the whole project around one
  concept.
- Do not force every built-in method into the code.
- Cover topic categories completely, then choose the methods that genuinely
  solve each requirement.
- Use existing notes as references when a requirement creates a doubt.
- Keep each ticket small, runnable, testable, and reviewable.
- Work on only one small project at a time.
- Select the next project from the remaining topic-coverage gaps.
- Do not scaffold every planned project in advance.

## Two Working Modes

### Project Mode

Use project mode when implementing or changing a realistic feature.

The primary unit of work is a feature ticket with:

```text
problem or user need
requirements
constraints
acceptance criteria
edge cases
verification
```

The ticket should describe behavior. It should not prescribe an array method or
language feature unless that restriction is itself part of the exercise.

### Note Mode

Use note mode when:

- the required topic has no focused `.js` and `.md` lesson;
- the existing lesson is inaccurate or too weak to resolve the doubt;
- the learner cannot explain the behavior needed by the active feature;
- a deeper doubt would overload the project code review.

After the note is created or repaired, return to the exact project ticket that
exposed the gap.

## Coverage Model

The project plan is feature-first.

A separate coverage audit makes sure no topic is lost.

Each topic moves through these states:

```text
planned
implemented
modified through a realistic change request
explained by the learner
verified
```

A topic is not complete merely because its syntax appears once.

Evidence should include:

- the project file and feature that use it;
- the behavior or test that proves it works;
- one change request or edge case that required understanding;
- a short learner explanation in the review;
- a link to the focused note when one was needed.

## Small Project Ladder

The earlier two-project model has been replaced by a ladder of focused,
realistic projects.

No single project must contain every JavaScript topic.

Each project should cover a coherent group of topics and produce evidence for
the shared coverage audit.

The provisional ladder is:

| Order | Small project | Main experience |
|---:|---|---|
| `01` | Order Data Workbench | arrays, objects, functions, copying, modules, basic DOM |
| `02` | Form Validation Workflow | forms, validation, scope, closures, regex, custom errors |
| `03` | Interactive Task Board | DOM state, events, delegation, storage, mutation |
| `04` | Async Data Explorer | promises, Fetch, errors, retries, cancellation, race handling |
| `05` | Model And Inheritance Lab | prototypes, classes, inheritance, `this`, composition |
| `06` | Controlled Object Library | descriptors, symbols, iteration, coercion, Proxy, Reflect |
| later | Browser API subprojects | storage, workers, streams, components, and other platform APIs |

This order is a planning baseline, not a rigid curriculum.

After each project, review the coverage matrix and choose the next project that
best addresses the remaining gaps.

A normal small project should have:

- one clear scenario;
- a small number of connected features;
- several feature tickets rather than one large implementation request;
- at least one bug report;
- at least one changing requirement;
- at least one refactor protected by tests;
- a final learner explanation and coverage review.

Do not add product features merely to make a project appear more impressive.

## Core JavaScript Topic Inventory Across Projects

Every topic below must receive evidence somewhere in the small-project ladder.

No single project is expected to contain the entire inventory.

#### Values, Types, And Control Flow

- primitive values and objects;
- `typeof` and practical type checks;
- truthiness and falsiness;
- strict equality and everyday conversion;
- optional chaining and nullish coalescing;
- conditionals, `switch` where appropriate, guard clauses, and early returns;
- normal loops and practical recursion.

#### Data And Collections

- arrays and objects;
- common string and number operations;
- array methods selected by the problem;
- object keys, values, entries, and ownership checks;
- `Map` and `Set`;
- JSON parsing and serialization;
- dates and `Intl` formatting;
- regular expressions for one suitable search or validation requirement;
- `URL` or `URLSearchParams` for one suitable browser-state requirement.

#### Functions

- function declarations, expressions, and arrow functions;
- parameters, default parameters, rest parameters, and return values;
- callbacks and higher-order functions;
- lexical scope and block scope;
- closures;
- `this`;
- method calls and practical `bind`, `call`, or `apply` usage where natural;
- pure functions and functions with controlled side effects.

#### State, References, And Copying

- object references;
- mutation and non-mutation;
- shallow copying;
- nested update behavior;
- destructuring;
- spread and rest syntax;
- `structuredClone()` where a real deep-copy snapshot is required;
- immutable state updates where preserving an earlier value matters.

#### Prototypes, Classes, And Inheritance

- the prototype chain;
- constructor and instance relationships;
- class constructors;
- instance methods and static methods;
- public and private fields where useful;
- inheritance with `extends`;
- method overriding;
- `super`;
- `instanceof` and prototype-chain checks;
- one custom error class such as `ValidationError extends Error`;
- a comparison between inheritance and composition for one small design
  decision.

Inheritance must be practised as real reuse and specialization, not only as an
isolated syntax example.

#### Asynchronous JavaScript

- timers;
- practical event-loop, task, and microtask ordering;
- promises and chaining;
- `async` and `await`;
- asynchronous error handling;
- `fetch()` and basic `Response` handling;
- parallel work with suitable Promise combinators;
- loading, success, empty, failure, and retry states;
- stale-request or race-condition handling;
- cancellation with `AbortController` where suitable.

#### Browser JavaScript

- DOM selection, creation, updating, and removal;
- event listeners;
- event objects;
- bubbling, delegation, and `preventDefault()`;
- forms, `FormData`, and validation;
- local storage;
- safe rendering with text content rather than unsafe HTML insertion;
- browser developer tools and breakpoints.

#### Modules And Development Practice

- native ES module imports and exports;
- clear state, data, UI, and utility responsibilities;
- named and default exports only where each choice is justified;
- error messages that help diagnose failures;
- focused unit tests for data and state logic;
- browser-level verification for important UI flows;
- linting or formatting only when it supports the JavaScript work;
- debugging syntax, runtime, and logic errors.

### Natural Feature-To-Topic Examples

These are examples of requirements, not mandatory implementation details:

| Project requirement | Topics it naturally exercises |
|---|---|
| Search and sort tasks | arrays, strings, callbacks, non-mutation |
| Delay search until typing stops | closures, timers, events |
| Update one nested task while preserving a snapshot | references, spread, structured cloning |
| Keep unique labels and fast task lookup | `Set`, `Map` |
| Display and validate deadlines | `Date`, `Intl`, regular expressions |
| Store filters in the address bar | `URL`, `URLSearchParams` |
| Submit an add-task form | forms, `FormData`, validation, events |
| Render one listener for many task rows | bubbling and event delegation |
| Load sample data with retry and cancellation | promises, fetch, errors, `AbortController` |
| Create specialized validation failures | class inheritance and custom errors |
| Render nested subtasks | recursion and tree traversal |
| Split state, API, UI, and utilities | ES modules and scope |

## First Project: Order Data Workbench

### Purpose

The first project is a compact browser workbench for inspecting and updating
order data.

It creates realistic data-processing requirements without becoming a large
product.

### Folder

Create the project at:

```text
projects/01-order-data-workbench/
```

The repository itself is already named `practice`, so do not add another
top-level `practice/` directory inside it.

Keep the existing responsibilities separate:

```text
src/                                -> focused JavaScript notes
projects/01-order-data-workbench/   -> first project
.codex/                             -> workflow, trackers, and memory
```

Each mini-project may have its own `package.json`.

### Tooling

Use the official Vite vanilla TypeScript template:

```bash
npm create vite@latest projects/01-order-data-workbench -- --template vanilla-ts
```

Then install and run it from its own directory:

```bash
cd projects/01-order-data-workbench
npm install
npm run dev
```

Vite is only the browser development environment, and TypeScript is a
development-time safety layer over the JavaScript being practised. Keep
`strict` mode enabled. Do not add a framework or extra libraries at the
beginning.

Scaffold only this first project. Create later project folders only when their
turn begins.

### Fixed Scope

The first workbench may support:

- displaying a supplied order dataset;
- filtering paid and unpaid orders;
- searching by customer or identifier;
- sorting by amount without mutating the source array;
- calculating revenue and summary values;
- selecting and updating one order;
- preserving an earlier state when a ticket requires it;
- splitting data, calculations, state, and UI into native modules.

Do not add authentication, a backend, checkout, payment processing, customer
accounts, or elaborate design.

### Initial Coverage Target

The first project should primarily exercise:

- arrays and objects;
- property access and object ownership;
- iteration and problem-selected array methods;
- functions, parameters, callbacks, and return values;
- references, mutation, and non-mutation;
- destructuring and spread;
- shallow copying and state snapshots;
- native ES modules;
- basic DOM rendering and events;
- clear errors and focused tests for calculation logic.

It does not need to finish the complete core inventory.

## Advanced Small Project: Controlled Object Library

### Purpose

The Controlled Object Library is one later small project in the ladder.

It exists to practise advanced object behavior after the relevant core
JavaScript topics are comfortable.

It is not a full reactive framework.

### Fixed Product Scope

The library may support:

- controlled model creation;
- validation;
- readonly and hidden fields;
- computed fields;
- change observation and history;
- iterable history;
- custom primitive conversion;
- specialized model types;
- revocable access;
- focused invariant tests.

Plugins, a large UI, persistence infrastructure, and production-framework
features are stretch work only.

### Advanced JavaScript Topic Inventory

Every topic below must receive project evidence.

#### Property Descriptors

- data and accessor descriptors;
- writable, enumerable, and configurable behavior;
- getters and setters;
- reading, defining, and copying descriptors;
- object integrity levels where relevant.

#### Prototype Behavior And Inheritance

- `Object.create()` with the exact prototype object;
- reading and changing prototype links;
- manual prototype-chain inheritance;
- constructor/class inheritance comparison;
- shared methods, overriding, and `super`;
- inheritance versus composition.

#### Symbols

- unique symbol keys;
- symbol-keyed metadata;
- global symbols only when justified;
- well-known symbols used by iteration, coercion, tags, or instance checks.

#### Iteration And Generators

- iterable and iterator protocols;
- `Symbol.iterator`;
- custom iterators;
- generator functions and `yield`;
- lazy filtering or traversal;
- iterator completion behavior.

#### Coercion Protocols

- ordinary object-to-primitive behavior;
- `valueOf()` and `toString()`;
- `Symbol.toPrimitive`;
- string, number, and default hints;
- one meaningful model conversion.

#### Proxy And Reflect

- target, handler, trap, receiver, and forwarding;
- `get`, `set`, `has`, and `deleteProperty`;
- `ownKeys`, `getOwnPropertyDescriptor`, and `defineProperty`;
- `getPrototypeOf`, `setPrototypeOf`, `isExtensible`, and
  `preventExtensions`;
- `apply` and `construct` through one callable or constructable feature;
- trap return values and invariant checks;
- identity, direct-target bypass, revocation, and use-proxy-everywhere rules;
- arrays, private fields, and internal-slot limitations where the project
  reaches them.

Do not add every trap to one handler merely to create a checklist.

Use several small, coherent features inside the same controlled-object project.
Each feature should introduce only the traps required by its behavior.

## Inheritance Coverage

Inheritance is required across the project ladder in different forms.

The Form Validation Workflow or another suitable core project should include
class-based inheritance in a normal application context. A custom application
error is a compact and realistic example:

```js
class ValidationError extends Error {}
```

A model project may also include a small specialization when it represents a
real behavioral difference.

The Model And Inheritance Lab and Controlled Object Library should expose the
underlying prototype links and compare:

```text
Object.create()
constructor functions
class extends
```

The learner should be able to explain:

- what is inherited;
- where a method is found;
- the difference between own and inherited properties;
- how `extends` builds on the prototype chain;
- how overriding and `super` work;
- when composition is simpler than inheritance.

## Specialized Browser API Subprojects

JavaScript and browser development include many specialized APIs.

Keep them out of the core projects and practise them through separate compact
subprojects.

Planned platform subprojects may include:

| Subproject | Coverage |
|---|---|
| Network Reliability Lab | retries, pagination, stale requests, WebSocket or SSE |
| Storage And Offline Lab | IndexedDB, Cache API, service workers, migrations |
| Browser Concurrency Lab | event loop, Web Workers, structured cloning, transferable data |
| Files And Streams Lab | File, Blob, ArrayBuffer, typed arrays, streams |
| Browser Components Lab | custom elements, Shadow DOM, observers, advanced events |

Create only the selected subproject when its turn begins.

Some browser APIs are domain-specific rather than universally required:

- Canvas and WebGL;
- media APIs;
- WebRTC;
- device APIs;
- advanced graphics APIs.

Keep these as recognize-and-look-up topics unless the learner's target work or
a genuine project requirement makes deeper practice useful.

## Feature Ticket Workflow

For each project ticket:

1. State the user-facing problem or internal engineering need.
2. Give requirements, constraints, acceptance criteria, and edge cases.
3. Do not name the intended method unless the ticket specifically tests that
   API.
4. Let the learner make the first implementation attempt.
5. Review correctness, behavior, maintainability, and topic understanding.
6. Introduce a realistic change request that makes the learner modify the code.
7. Verify with tests, browser behavior, or clear terminal output.
8. Ask for or record a short learner explanation.
9. Update the coverage audit.
10. Stop for review before beginning the next ticket.

## AI Collaboration Rule

Codex acts as a project mentor and reviewer, not as an automatic project
generator.

Codex may:

- create the initial small project scaffold after approval;
- write feature tickets and acceptance criteria;
- prepare sample data and focused tests;
- inspect and review the learner's implementation;
- explain failures and relevant language behavior;
- suggest a smaller reproduction;
- create or repair notes when a genuine learning gap appears.

Codex should not:

- implement the whole project before the learner attempts it;
- name the exact method in every ticket;
- add unrelated architecture or tooling;
- turn a JavaScript practice ticket into a UI-design sprint;
- mark a topic complete because generated code contains its syntax.

## Returning To Notes During A Project

When a missing or weak topic note blocks a feature:

1. Record the active project ticket and exact unresolved question.
2. Search `src/` for the existing topic folder and paired files.
3. If the lesson exists, review it before creating a duplicate.
4. Check one trusted primary reference.
5. Create or revise the learner-facing runnable `.js` first.
6. Run the `.js` file and keep comments that explain what and why.
7. Create or revise the paired `.md` after the runnable behavior is correct.
8. Route a long learner-specific explanation to a nearby `doubt/` note when it
   would interrupt the main lesson.
9. Apply the full note checklist from `PROJECT_MEMORY.md`.
10. Run syntax, runtime, link, and `git diff --check` verification.
11. Update the relevant note tracker.
12. Resume the recorded project ticket and apply the concept there.

Notes must contain teaching content only.

Do not write repo-planning commentary, statements about why the repo does or
does not need another page, or other author-facing decisions inside learner
notes.

## Preserved Note-Authoring Contract

The established note workflow remains mandatory:

- Use one focused topic or method folder.
- Keep a learner-facing runnable `.js` and paired `.md`.
- Read existing files before editing.
- Check a trusted reference before teaching behavior.
- Make the `.js` understandable by itself.
- Explain important syntax with what it does and why it is needed.
- Keep expected-output comments near meaningful output.
- Build the `.md` around the learner's problem and natural explanation order.
- Use `What Problem Does It Solve?`, `Quick Definition`, `Mental Model`,
  `Syntax`, `Parameters`, `Return Value`, examples, important notes, usage,
  mistakes, runnable command, and references as a flexible checklist.
- Explain a doubt after the code or behavior that creates it, not before the
  learner has seen the problem.
- Use a nearby doubt note for a long explanation that would damage the main
  lesson flow.
- Do a second teaching-flow and heading review.
- Verify the runnable file, syntax, Markdown fences, local links, and diff
  whitespace.
- Update the active tracker.
- Keep unrelated dirty files outside the sprint.

`PROJECT_MEMORY.md` remains the detailed source of truth for this contract.

## Project Completion Rule

A small project is not complete merely because its UI works.

A small project is complete when:

- every topic assigned to that project has verified evidence;
- the learner has modified each major feature after review;
- important behavior is tested;
- missing note gaps discovered by the work have been repaired;
- the learner can explain the main design choices.

After completion, update the master coverage audit before selecting the next
small project.

The overall project ladder is complete only when every required core, advanced,
and selected browser-platform topic has the same evidence and the learner can
complete a final integration project with minimal guidance.
