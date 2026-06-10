# Task Tracker

## Current Story

### JS-STRUCTURE-001: Prepare JavaScript Practice Repo Structure

As the repo owner, I want the public JavaScript practice project to have a clear topic structure, local Codex memory, and sprint checklist so terminal-first practice work can happen safely.

## Acceptance Criteria

- `.codex/` exists with start, memory, structure review, and task tracker docs.
- The current folder review is captured in repo-local memory.
- Event loop, hoisting, map, pattern, and scope placement decisions are recorded.
- Sprint work is split into small reviewable steps.
- Sprint 1 starts with safe hygiene work, not mass file movement.

## Sprint Plan

### Sprint 1: Planning And Git Hygiene

Status: review

Checklist:

- [x] Create `.codex/` folder.
- [x] Add `START_HERE.md`.
- [x] Add `PROJECT_MEMORY.md`.
- [x] Add `STRUCTURE_REVIEW.md`.
- [x] Add this task tracker.
- [x] Expand `.gitignore` for dependencies, OS files, editor files, and logs.
- [x] Untrack already-tracked `node_modules`, `.DS_Store`, and `.idea` files while keeping them on disk.
- [x] Move `del1.js` and `src/del.js` into `src/playground/`.
- [x] Update `npm run dev` to use `src/playground/del.js`.

Review List:

- [ ] Confirm the target folder mapping feels right.
- [x] Confirm whether `.idea` should be fully ignored or partially kept.
- [x] Confirm whether tracked `node_modules` should be removed from Git index with `git rm --cached`.
- [x] Confirm whether the next sprint should rename folders or move scratch files first.
- [ ] Review the staged index cleanup before commit.
- [ ] Decide whether Sprint 2 should begin with typo renames or topic folder moves.

Verification Notes:

- `git ls-files node_modules .idea .DS_Store src/.DS_Store src/object/.DS_Store` returned no tracked files.
- `node --check src/playground/del.js` completed successfully.
- `git status --short` now shows many staged `D` entries for previously tracked generated/editor files. That is expected after `git rm --cached`; the files remain on disk and are now ignored.

### Sprint 2: Safe Naming Cleanup

Status: completed

Checklist:

- [x] Rename obvious typo files after review.
- [x] Normalize obvious file names to lowercase kebab-case where the meaning is unchanged.
- [x] Keep compatibility notes for old names if needed.
- [x] Verify Git status after each group of renames.

Scope Notes:

- This sprint is limited to typo/casing/punctuation cleanup.
- Topic folder moves such as `EventLoop` -> `async/event-loop` stay in Sprint 3.

Renames:

- [x] `src/array/methods/array.proptotype.js` -> `src/array/methods/array.prototype.js`
- [x] `src/array/methods/mapFIlter.js` -> `src/array/methods/map-filter.js`
- [x] `src/classes/BasicSyntax1.js` -> `src/classes/basic-syntax-1.js`
- [x] `src/classes/PrivateClass.js` -> `src/classes/private-class.js`
- [x] `src/functions/HOF.js` -> `src/functions/higher-order-functions.js`
- [x] `src/map/loop,-map.js` -> `src/map/loop-map.js`
- [x] `src/object/loopthroughObject/` -> `src/object/loop-through-object/`
- [x] `src/string/methods/instance-methods/subString.js` -> `src/string/methods/instance-methods/substring.js`

Review List:

- [x] Check that no learning content disappeared.
- [ ] Check that renamed topics still match the terminal-practice plan.
- [ ] Check that file names are readable for a future site nav.

Verification Notes:

- `git diff --cached --name-status` shows rename-only entries for the lesson files.
- `node --check` passed for each renamed JavaScript file.

### Sprint 3: Topic Folder Restructure

Status: completed

Checklist:

- [x] Move `EventLoop` to `async/event-loop`.
- [x] Move `hoisting` and `scope` to `fundamentals`.
- [x] Move JavaScript `Map` content to `collections/map`.
- [x] Move design pattern content to `advanced/design-patterns`.
- [x] Keep scratch work in `playground`.

Review List:

- [x] Review each move before committing.
- [x] Check for broken local scripts.
- [x] Update `CLAUDE.md` after the new tree is accepted.
- [ ] Confirm the new top-level source structure reads well.
- [ ] Decide whether to commit Sprint 3 before the next scope cleanup.

Moves:

- [x] `src/EventLoop/` -> `src/async/event-loop/`
- [x] `src/hoisting/` -> `src/fundamentals/hoisting/`
- [x] `src/scope/` -> `src/fundamentals/scope/`
- [x] `src/map/` -> `src/collections/map/`
- [x] `src/pattern/` -> `src/advanced/design-patterns/`

Verification Notes:

- `find src -maxdepth 3 -type d -print | sort` shows the new parent folders.
- Old folder-name references remain only as historical mapping notes in `.codex`.

### Sprint 4: Public Repo Scope Cleanup

Status: review

Checklist:

- [x] Remove site scaffold from the current public repo view.
- [x] Remove site project plan from the current public repo view.
- [x] Update `.codex` memory so future work stays terminal-first.
- [x] Preserve `npm run dev` as the nodemon-based terminal workflow.

Review List:

- [ ] Confirm the public repo scope now reads as JavaScript practice only.
- [ ] Confirm whether this cleanup commit should be pushed.
