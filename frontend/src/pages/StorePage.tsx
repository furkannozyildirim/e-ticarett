import { useEffect, useMemo, useState } from "react";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { ProductSection, type ProductSort } from "../features/products/components/ProductSection";
import { productApi } from "../features/products/api/productApi";
import {
  getProductImages,
  normalizeName,
} from "../features/products/api/productImageApi";
import { BenefitsBar } from "../components/layout/BenefitsBar";
import { HeroSection } from "../components/layout/HeroSection";
import { StorySection } from "../components/layout/StorySection";
import type { Product } from "../types/product";
import {
  getCategoryDisplayName,
  getProductDisplayDescription,
  getProductDisplayName,
} from "../utils/productImage";

export function StorePage() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ProductSort>("featured");
  const [isLoading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    let isMounted = true;

    productApi
      .getAll()
      .then(async (data) => {
        let images = new Map<string, string>();

        try {
          images = await getProductImages();
        } catch {
          // Product browsing remains available if the optional image catalog is offline.
        }

        if (isMounted) {
          setProducts(
            data.map((product) => ({
              ...product,
              imageUrl: images.get(normalizeName(product.name)),
            })),
          );
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLoadError(
            error instanceof Error
              ? error.message
              : "Ürünler şu an yüklenemedi.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["Tümü", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("tr-TR");
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "Tümü" || product.category === activeCategory;
      const searchableText = [
        product.name,
        product.description,
        product.category,
        getProductDisplayName(product.name),
        getProductDisplayDescription(product.name, product.description),
        getCategoryDisplayName(product.category),
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");
      return matchesCategory && searchableText.includes(normalizedSearch);
    });

    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [activeCategory, products, search, sort]);

  const pageSize = 12;
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const pagedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sort]);

  useEffect(() => {
    if (pageCount > 0 && page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  function handleAddToCart(product: Product) {
    dispatch(addToCart(product));
    setNotification(`${getProductDisplayName(product.name)} sepete eklendi.`);
  }

  return (
    <>
      <Box component="main">
        <HeroSection />
        <BenefitsBar />
        <Box className="catalog-container">
          {loadError && (
            <Alert
              severity="error"
              action={
                <button className="text-button" onClick={() => window.location.reload()}>
                  Tekrar dene
                </button>
              }
            >
              {loadError}
            </Alert>
          )}
          {isLoading ? (
            <Box className="catalog-loading">
              <CircularProgress />
            </Box>
          ) : (
            <ProductSection
              products={pagedProducts}
              categories={categories}
              activeCategory={activeCategory}
              search={search}
              sort={sort}
              onCategoryChange={(category) => {
                setActiveCategory(category);
                setPage(1);
              }}
              onSearchChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              onSortChange={(value) => {
                setSort(value);
                setPage(1);
              }}
              onAddToCart={handleAddToCart}
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
              totalResults={filteredProducts.length}
            />
          )}
        </Box>
        <StorySection />
      </Box>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={5000}
        onClose={() => setNotification("")}
      >
        <Alert severity="success" onClose={() => setNotification("")}>
          {notification}
        </Alert>
      </Snackbar>
    </>
  );
}
