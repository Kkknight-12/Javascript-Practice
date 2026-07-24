import { type Order, type OrderStatus } from "./data/orders.ts";

export type StatusFilter = OrderStatus | "all";

export function filterOrdersByStatus(
  orderList: Order[],
  selectedStatus: StatusFilter,
): Order[] {
  if (selectedStatus === "all") {
    return [...orderList];
  }
  return orderList.filter((order) => order.status === selectedStatus);
}