export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
}

export interface OrderResponse {
  id: number;
  customerName: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
}

export interface ApiErrorResponse {
  message?: string;
}
