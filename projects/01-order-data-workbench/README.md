# Order Data Workbench

Order Data Workbench is a small internal browser tool for an operations team.
The team needs to inspect order data, calculate useful values, and safely make
small updates.

The project exists to practise JavaScript in a realistic codebase. TypeScript
will check the shapes of values while the browser still runs JavaScript.

## Current Ticket

[Ticket 02: Filter The Queue By Status](tickets/02-filter-order-queue.md)

Make the first implementation attempt before asking Codex to review it. The
next ticket begins only after the current ticket has been reviewed and
verified.

## Progress

- [x] [Ticket 01: Display The Order Queue](tickets/01-display-order-queue.md)
- [ ] [Ticket 02: Filter The Queue By Status](tickets/02-filter-order-queue.md)

## Starter Data

The supplied dataset is in:

```text
src/data/orders.ts
```

Prices are stored as integer paise. For example:

```text
249900 paise = INR 2,499.00
```

Using integer minor units prevents ordinary calculations from introducing
fractional currency values.

## Commands

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Check TypeScript and create a production build:

```bash
npm run build
```

## Project Boundaries

- Use TypeScript, native ES modules, and browser APIs.
- Keep the reasoning focused on JavaScript runtime behavior.
- Do not add a framework or another dependency.
- Keep the interface practical and easy to scan.
- Do not build features from future tickets early.
- Do not use `any` just to bypass a type error.
