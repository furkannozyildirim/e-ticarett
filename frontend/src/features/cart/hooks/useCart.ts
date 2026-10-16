import { useAppSelector } from "../../../app/hooks";

export function useCart() {
  const items = useAppSelector((state) => state.cart.items);

  return {
    items,
    count: items.reduce((total, item) => total + item.quantity, 0),
    total: items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    ),
  };
}
