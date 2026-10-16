import { request } from "../../../services/httpClient";
import type { Product } from "../../../types/product";

const catalogServiceUrl = import.meta.env.VITE_CATALOG_API_URL ?? "";

export const productApi = {
  getAll: () => request<Product[]>(catalogServiceUrl, "/api/products"),
  getById: (id: number) => request<Product>(catalogServiceUrl, `/api/products/${id}`),
};
