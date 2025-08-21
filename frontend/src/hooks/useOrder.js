import { useApiQuery, useApiMutation } from "./useApi";
import { fetchOrders, createOrder, fetchOrderById } from "../api/orderApi";

// Orders hook
export const useOrdersActions = () => {
  // Fetch all orders
  const ordersQuery = useApiQuery("orders", fetchOrders);
  // Create a new order
  const createOrderMutation = useApiMutation("orders", createOrder);

  return {
    ordersQuery,
    createOrderMutation,
  };
};
