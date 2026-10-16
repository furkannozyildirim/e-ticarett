const currencyFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return currencyFormatter.format(price);
}
