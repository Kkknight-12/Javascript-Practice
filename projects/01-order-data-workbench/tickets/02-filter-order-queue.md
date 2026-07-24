# Ticket 02: Filter The Queue By Status

## User Need

The operations team often works on one payment status at a time. Scanning all
orders makes it harder to focus on paid, pending, cancelled, or refunded
orders.

Add a status filter above the current table.

## Expected Interaction

The filter must be a labelled `<select>` with these options:

| Visible label | Value |
|---|---|
| All orders | `all` |
| Paid | `paid` |
| Pending | `pending` |
| Cancelled | `cancelled` |
| Refunded | `refunded` |

`All orders` is selected when the page first loads.

Changing the selection must immediately update the table without reloading the
page.

The data flow should be:

```text
user changes the select
        |
        v
read the selected status
        |
        v
derive visible orders from the original orders
        |
        v
render the visible orders
```

## Checkpoint 1: Filtering Logic

Create:

```text
src/order-filters.ts
```

Define a type that represents every possible filter selection:

```ts
export type StatusFilter = OrderStatus | "all";
```

Then create and export a function with this responsibility:

```ts
filterOrdersByStatus(orderList, selectedStatus)
```

The function must:

- return all orders when the selected status is `all`;
- otherwise return only orders whose `status` matches the selection;
- preserve the original order of matching entries;
- return a new array;
- return an empty array when the input array is empty;
- never modify the input array or its order objects.

Expected results with the supplied dataset:

| Selection | Result count | Result IDs |
|---|---:|---|
| `all` | `5` | `ORD-1041` through `ORD-1045` |
| `paid` | `2` | `ORD-1041`, `ORD-1043` |
| `pending` | `1` | `ORD-1042` |
| `cancelled` | `1` | `ORD-1044` |
| `refunded` | `1` | `ORD-1045` |

Complete and check this function before adding the select.

## Checkpoint 2: Connect It To The Page

Add the labelled select above the table and listen for its `change` event.

When the selection changes:

1. Read the selected value.
2. Derive the visible orders with `filterOrdersByStatus()`.
3. Render those visible orders.

The selected option and filter control must remain visible after the table
updates.

The table caption must show the visible count:

```text
Current orders (2)
```

when `Paid` is selected.

## No-Match State

When filtering produces no orders, keep the filter visible and replace only the
queue result with:

```text
No orders match this status.
```

This is different from the initial-data message:

```text
No orders available.
```

The page must therefore know whether there is no source data or whether a
filter produced no matches.

The supplied dataset currently contains every selectable status. To verify this
state, temporarily render an empty filtered result while keeping the original
`orders` array non-empty, confirm the message, and then restore the real
filtered result.

## Constraints

- Keep `orders` as the source of truth.
- Do not replace `orders` with the filtered result.
- Do not mutate or sort the source array.
- Do not hard-code matching order IDs.
- Do not use `any`.
- Do not add another dependency.
- Keep calculations separate from DOM rendering.
- Continue rendering customer data with safe text APIs.
- Preserve the missing-`#app` error from Ticket 01.

## Acceptance Criteria

- The page initially displays all five orders.
- Selecting each status displays exactly the expected rows.
- Returning to `All orders` restores all five rows in their original order.
- The caption always reports the visible row count.
- The filter remains visible and retains its selected value after an update.
- A no-match result displays `No orders match this status.`
- Filtering does not reload the page.
- The browser console has no unexpected errors.
- `npm run build` succeeds.

## Before Review

Be ready to explain:

1. Why the filter function receives the order list instead of reading the
   imported `orders` variable directly.
2. How you know the original array was not changed.
3. Why `all` is part of `StatusFilter` but not part of `OrderStatus`.
4. Which code performs data work and which code performs DOM work.

Start with Checkpoint 1 only. Once its five expected results are correct, move
to Checkpoint 2.
