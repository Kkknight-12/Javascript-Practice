# CLAUDE.md

## Project Overview
This repo started as a personal JavaScript revision resource and is evolving into a public educational website — similar to javascript.info — where people can learn JavaScript through organized, well-commented examples.

## Repo Structure
```
src/
├── advanced/
│   └── design-patterns/  # Design patterns
├── array/                # Array methods, loops, static methods, questions
├── async/
│   └── event-loop/       # Event loop concepts
├── classes/              # OOP, class syntax
├── collections/
│   └── map/              # JavaScript Map data structure
├── fundamentals/
│   ├── hoisting/         # Hoisting behavior
│   └── scope/            # Scope and closures
├── functions/            # Callbacks, HOFs, function patterns
├── miscellaneous/        # Mixed JS topics
├── object/               # Object methods, prototypes, hasOwn, descriptors
├── playground/           # Scratch or temporary experiments
└── string/               # String instance and static methods
```

## Website Plan
See `WEBSITE_PROJECT_PLAN.md` for the full plan. Key decisions:
- **Stack**: VitePress (static site generator, markdown-centric, Vue-based)
- **Goal**: Transform this content into an interactive educational site
- **Phases**: Foundation → Content Migration → Interactive Features → Enhanced Content → Polish → Launch
- **Current docs layer**: `docs/` contains a VitePress-ready scaffold and navigation map. The VitePress dependency is not installed yet.

## Development Notes
- Node.js project with `nodemon` for running JS files during practice
- Content is a mix of `.js` practice files and `.md` notes
- Interview questions are included in the content inventory
- Keep runnable source examples in `src/`; migrate learner-facing explanation and navigation into `docs/`.
