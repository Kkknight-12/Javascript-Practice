# CLAUDE.md

## Project Overview
This repo started as a personal JavaScript revision resource and is evolving into a public educational website — similar to javascript.info — where people can learn JavaScript through organized, well-commented examples.

## Repo Structure
```
src/
├── array/          # Array methods, loops (for-of, for-await-of), static methods
├── classes/        # OOP, class syntax
├── EventLoop/      # Event loop concepts
├── functions/      # Arrow functions, closures, advanced patterns
├── hoisting/       # Hoisting behavior
├── map/            # Map data structure
├── miscellaneous/  # Mixed JS topics
├── object/         # Object methods, prototypes, hasOwn, property descriptors
├── pattern/        # Design patterns
├── scope/          # Scope and closures
└── string/         # String instance and static methods
```

## Website Plan
See `WEBSITE_PROJECT_PLAN.md` for the full plan. Key decisions:
- **Stack**: VitePress (static site generator, markdown-centric, Vue-based)
- **Goal**: Transform this content into an interactive educational site
- **Phases**: Foundation → Content Migration → Interactive Features → Enhanced Content → Polish → Launch

## Development Notes
- Node.js project with `nodemon` for running JS files during practice
- Content is a mix of `.js` practice files and `.md` notes
- Interview questions are included in the content inventory