# Ticket 01: Display The Order Queue

## User Need

The operations team receives order data as an array of objects, but they cannot
scan raw source code while working. They need a clear browser view of the
current order queue.

## Your Task

Replace the generated Vite demo with the first useful screen of Order Data
Workbench.

Import the supplied orders from `src/data/orders.ts` and display one table row
for every order.

Each row must show:

- order ID;
- customer name;
- payment status;
- total number of units across all item lines;
- total order value in INR.

The item count means the sum of the item quantities. It is not simply the
number of objects in `order.items`.

For example:

```ts
items: [
  { quantity: 1 },
  { quantity: 2 },
]
```

represents `3` units.

The order value is the sum of:

```text
quantity * unitPriceInPaise
```

for every item in that order.

## Requirements

- Use the supplied dataset as the only source of order content.
- Derive item counts and order values from each order instead of hard-coding
  the displayed results.
- Convert paise to rupees only for display.
- Display currency with two decimal places.
- Keep calculations separate from the code that creates or updates DOM
  elements.
- Render values from the dataset with safe DOM text APIs.
- Give the page a clear heading and make the table readable on an ordinary
  desktop viewport.
- Remove the generated Vite logos, counter, and starter instructions from the
  rendered page.
- Keep the source `orders` array and its nested objects unchanged.
- Do not use `any`.

## Empty-State Edge Case

Your rendering code must also work when it receives an empty order array.

Instead of showing an empty table, display:

```text
No orders available.
```

You may temporarily pass an empty array while checking this behavior, but
restore the supplied data afterward.

## Error Case

Do not assume that the `#app` element always exists.

If it cannot be found, stop the program with an error whose message explains
which required element is missing.

## Out Of Scope

Do not add these yet:

- filtering;
- searching;
- sorting;
- editing;
- summary cards;
- persistence.

They will arrive as later feature requests.

## Acceptance Criteria

- All five supplied orders appear in their original order.
- Every row displays the correct unit count and order value.
- `Ravi & Sons` is displayed as text without breaking the page.
- Passing an empty array displays the required empty-state message.
- The browser console has no unexpected errors.
- `npm run build` succeeds.
- The default Vite demo is no longer visible.

## Before Review

Be ready to explain:

1. Why `order.items.length` is not the required unit count.
2. Which parts of your solution calculate data and which parts change the DOM.
3. How your code avoids changing the supplied orders.
4. One difference between a TypeScript error and a JavaScript runtime error
   that you encountered.

When your attempt is ready, ask Codex to review Ticket 01. Do not begin the next
ticket yet.
