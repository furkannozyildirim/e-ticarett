import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { AddShoppingCart, ArrowBack } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { productApi } from "../features/products/api/productApi";
import {
  getProductImages,
  normalizeName,
} from "../features/products/api/productImageApi";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/formatPrice";
import {
  getCategoryDisplayName,
  getProductDisplayDescription,
  getProductDisplayName,
  getProductImage,
} from "../utils/productImage";

export function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    let isMounted = true;
    const id = Number(productId);

    if (!Number.isInteger(id) || id < 1) {
      setError("Ürün numarası geçersiz.");
      setLoading(false);
      return;
    }

    productApi
      .getById(id)
      .then(async (result) => {
        let imageUrl: string | undefined;
        try {
          imageUrl = (await getProductImages()).get(normalizeName(result.name));
        } catch {
          // The product detail still works with its category fallback image.
        }
        if (isMounted) setProduct({ ...result, imageUrl });
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Ürün bilgisi yüklenemedi.",
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  function handleAddToCart() {
    if (!product) return;
    dispatch(addToCart(product));
    setNotification(`${getProductDisplayName(product.name)} sepete eklendi.`);
  }

  return (
    <Box component="main" className="page-background">
      <Container maxWidth="lg" className="inner-page product-detail">
        <Button component={RouterLink} to="/" startIcon={<ArrowBack />}>
          Ürünlere dön
        </Button>
        {isLoading ? (
          <Box className="catalog-loading"><CircularProgress /></Box>
        ) : error ? (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        ) : product ? (
          <Box className="product-detail__layout">
            <Box
              component="img"
              className="product-detail__image"
              src={getProductImage(product.name, product.category, product.imageUrl)}
              alt={getProductDisplayName(product.name)}
            />
            <Stack className="product-detail__info" spacing={2}>
              <Typography className="eyebrow">
                {getCategoryDisplayName(product.category)}
              </Typography>
              <Typography component="h1" className="inner-page__title">
                {getProductDisplayName(product.name)}
              </Typography>
              <Typography color="text.secondary">
                {getProductDisplayDescription(product.name, product.description)}
              </Typography>
              <Typography className="product-detail__price">
                {formatPrice(product.price)}
              </Typography>
              <Typography color={product.stock > 0 ? "success.main" : "error.main"}>
                {product.stock > 0 ? `${product.stock} adet stokta` : "Stokta yok"}
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                onClick={handleAddToCart}
                disabled={product.stock < 1}
                sx={{ alignSelf: "flex-start" }}
              >
                Sepete ekle
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Container>
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3000}
        onClose={() => setNotification("")}
        message={notification}
      />
    </Box>
  );
}
