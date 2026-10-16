import { request } from "../../../services/httpClient";
import type { CreateOrderRequest, OrderResponse } from "../../../types/order";

const orderServiceUrl = import.meta.env.VITE_ORDER_API_URL ?? "";

export const orderApi = {
  create: (order: CreateOrderRequest) =>
    request<OrderResponse>(orderServiceUrl, "/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }),
};
