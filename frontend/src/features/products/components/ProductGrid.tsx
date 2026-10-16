import { Box, Typography } from "@mui/material";
import type { Product } from "../../../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onAdd: (product: Product) => void;
}

export function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <Box className="empty-products">
        <Typography variant="h5">Aradığın ürünü bulamadık.</Typography>
        <Typography color="text.secondary">
          Arama veya kategori seçimini değiştirebilirsin.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </Box>
  );
}
