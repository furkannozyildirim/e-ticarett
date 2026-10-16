import {
  Box,
  Chip,
  FormControl,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import type { Product } from "../../../types/product";
import { getCategoryDisplayName } from "../../../utils/productImage";
import { ProductGrid } from "./ProductGrid";

export type ProductSort = "featured" | "price-asc" | "price-desc";

interface ProductSectionProps {
  products: Product[];
  categories: string[];
  activeCategory: string;
  search: string;
  sort: ProductSort;
  onCategoryChange: (category: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (sort: ProductSort) => void;
  onAddToCart: (product: Product) => void;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  totalResults: number;
}

export function ProductSection({
  products,
  categories,
  activeCategory,
  search,
  sort,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onAddToCart,
  page,
  pageCount,
  onPageChange,
  totalResults,
}: ProductSectionProps) {
  return (
    <Box component="section" className="products-section" id="products">
      <Box className="products-section__heading">
        <Box>
          <Typography className="eyebrow">SENİN İÇİN SEÇTİK</Typography>
          <Typography component="h2" variant="h3">
            Güzel şeyler burada<span>.</span>
          </Typography>
          <Typography color="text.secondary">
            Günlük hayatına eşlik edecek küçük favoriler.
          </Typography>
        </Box>
        <Box className="products-section__tools">
          <TextField
            size="small"
            placeholder="Ürün ara..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            inputProps={{ "aria-label": "Ürün ara" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>
              ),
            }}
          />
          <FormControl size="small">
            <Select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as ProductSort)}
              inputProps={{ "aria-label": "Ürünleri sırala" }}
            >
              <MenuItem value="featured">Öne çıkanlar</MenuItem>
              <MenuItem value="price-asc">Fiyat: düşükten yükseğe</MenuItem>
              <MenuItem value="price-desc">Fiyat: yüksekten düşüğe</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Box className="category-filter" aria-label="Ürün kategorileri">
        {categories.map((category) => (
          <Chip
            key={category}
            label={category === "Tümü" ? category : getCategoryDisplayName(category)}
            color={activeCategory === category ? "primary" : "default"}
            variant={activeCategory === category ? "filled" : "outlined"}
            onClick={() => onCategoryChange(category)}
          />
        ))}
        <Typography className="products-section__count">
          {totalResults} ürün
        </Typography>
      </Box>

      <ProductGrid products={products} onAdd={onAddToCart} />
      {pageCount > 1 && (
        <Box className="product-pagination">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, nextPage) => {
              onPageChange(nextPage);
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
            aria-label="Ürün sayfaları"
          />
        </Box>
      )}
    </Box>
  );
}
