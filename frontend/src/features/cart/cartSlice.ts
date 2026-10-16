import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (product.stock < 1) {
        state.items = state.items.filter((item) => item.id !== product.id);
        return;
      }

      if (existingItem) {
        existingItem.stock = product.stock;
        existingItem.quantity = Math.min(
          existingItem.quantity + 1,
          product.stock,
        );
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    changeQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((cartItem) => cartItem.id === id);

      if (!item) return;
      if (quantity < 1 || item.stock < 1) {
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
        return;
      }

      item.quantity = Math.min(quantity, item.stock);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, changeQuantity, clearCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
