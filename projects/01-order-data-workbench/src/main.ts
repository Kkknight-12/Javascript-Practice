import "./style.css";
import { type Order, type OrderItem, orders } from "./data/orders.ts";
import { filterOrdersByStatus, type StatusFilter } from "./order-filters.ts";

export const orderStatusValues: StatusFilter[] = [
  "all",
  "paid",
  "pending",
  "cancelled",
  "refunded",
];

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function paiseToRupees(paise: number): number {
  return paise / 100;
}

export function getItemsCount(items: OrderItem[]): number {
  let count = 0;

  items.forEach((item) => {
    count += item.quantity;
  });

  return count;
}

export function getTotalPriceInPaise(items: OrderItem[]): number {
  let totalInPaise = 0;

  items.forEach((item) => {
    totalInPaise += item.unitPriceInPaise * item.quantity;
  });

  return totalInPaise;
}

function formatPrice(totalInPaise: number): string {
  return inrFormatter.format(paiseToRupees(totalInPaise));
}

function createTextCell(
  text: string,
  className?: string,
): HTMLTableCellElement {
  const cell = document.createElement("td");

  // textContent displays customer data as text, not as executable HTML.
  cell.textContent = text;

  if (className) {
    cell.classList.add(className);
  }

  return cell;
}

function createOrderRow(order: Order): HTMLTableRowElement {
  const {
    id,
    customer: { name },
    status,
    items,
  } = order;

  const itemsCount = getItemsCount(items);
  const totalPriceInPaise = getTotalPriceInPaise(items);

  const row = document.createElement("tr");
  const statusCell = document.createElement("td");
  const statusLabel = document.createElement("span");

  statusLabel.classList.add("status");
  statusLabel.dataset.status = status;
  statusLabel.textContent = status;
  statusCell.append(statusLabel);

  row.append(
    createTextCell(id, "order-id"),
    createTextCell(name),
    statusCell,
    createTextCell(String(itemsCount), "numeric"),
    createTextCell(formatPrice(totalPriceInPaise), "numeric"),
  );

  return row;
}

function createOrdersTable(visibleOrders: Order[]): HTMLDivElement {
  const tableRegion = document.createElement("div");
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  const tableHead = document.createElement("thead");
  const headingRow = document.createElement("tr");
  const tableBody = document.createElement("tbody");

  tableRegion.classList.add("table-region");
  tableRegion.setAttribute("aria-label", "Current order queue");
  tableRegion.tabIndex = 0;

  caption.textContent = `Current orders (${visibleOrders.length})`;

  ["Order ID", "Customer", "Status", "Units", "Total"].forEach(
    (heading, index) => {
      const headingCell = document.createElement("th");
      headingCell.scope = "col";
      headingCell.textContent = heading;

      if (index >= 3) {
        headingCell.classList.add("numeric");
      }

      headingRow.append(headingCell);
    },
  );

  visibleOrders.forEach((order) => {
    tableBody.append(createOrderRow(order));
  });

  tableHead.append(headingRow);
  table.append(caption, tableHead, tableBody);
  tableRegion.append(table);

  return tableRegion;
}

export function renderOrders(
  root: HTMLElement,
  sourceOrders: Order[],
  selectedStatus: StatusFilter = "all",
): void {
  const visibleOrders = filterOrdersByStatus(sourceOrders, selectedStatus);

  const statusSelect = createStatusSelect(selectedStatus);

  statusSelect.addEventListener("change", () => {
    renderOrders(root, sourceOrders, statusSelect.value as StatusFilter);
  });

  const workspace = document.createElement("main");
  const pageHeader = document.createElement("header");
  const heading = document.createElement("h1");
  const description = document.createElement("p");
  const filterControl = document.createElement("div");
  const filterLabel = document.createElement("label");

  filterLabel.htmlFor = statusSelect.id;
  filterLabel.textContent = "Status";
  filterControl.classList.add("filter-control");
  statusSelect.classList.add("status-select");
  workspace.classList.add("workspace");
  pageHeader.classList.add("page-header");
  heading.textContent = "Order Data Workbench";
  description.textContent =
    "Inspect the current order queue and its calculated values.";
  pageHeader.append(heading, description);
  filterControl.append(filterLabel, statusSelect);
  workspace.append(pageHeader, filterControl);

  if (sourceOrders.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.classList.add("empty-state");
    emptyState.setAttribute("role", "status");
    emptyState.textContent = "No orders available.";
    workspace.append(emptyState);
  } else if (visibleOrders.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.classList.add("empty-state");
    emptyState.setAttribute("role", "status");
    emptyState.textContent = "No orders match this status.";
    workspace.append(emptyState);
  } else {
    workspace.append(createOrdersTable(visibleOrders));
  }

  // replaceChildren lets this function render both the normal and empty states.
  root.replaceChildren(workspace);
}

export function createStatusOption(): HTMLOptionElement[] {
  return orderStatusValues.map((status) => {
    const option = document.createElement("option");
    option.value = status;
    option.textContent =
      status === "all"
        ? "All orders"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return option;
  });
}

export function createStatusSelect(
  selectedStatus: StatusFilter,
): HTMLSelectElement {
  const selectDropdown = document.createElement("select");
  selectDropdown.id = "status-filter";
  selectDropdown.name = "status-filter";
  selectDropdown.setAttribute("aria-label", "Filter orders by status");

  const options = createStatusOption();
  selectDropdown.append(...options);
  selectDropdown.value = selectedStatus;

  return selectDropdown;
}

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error(
    'Order Data Workbench requires an element with the id "app".',
  );
}

function renderApp(app: HTMLElement): void {
  renderOrders(app, orders);
}

renderApp(app);
