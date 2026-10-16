import {
  AddShoppingCart,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { Product } from "../../../types/product";
import { formatPrice } from "../../../utils/formatPrice";
import {
  getCategoryDisplayName,
  getProductDisplayDescription,
  getProductDisplayName,
  getProductImage,
} from "../../../utils/productImage";
import { Link as RouterLink } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  return (
    <Card className="product-card" variant="outlined">
      <Box className="product-card__image-wrap">
        <CardMedia
          component="img"
          className="product-card__image"
          image={getProductImage(product.name, product.category, product.imageUrl)}
          alt={getProductDisplayName(product.name)}
        />
        <Chip
          className="product-card__category"
          label={getCategoryDisplayName(product.category)}
          size="small"
        />
        <IconButton
          className="product-card__favorite"
          aria-label={favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          onClick={() => setFavorite((value) => !value)}
          size="small"
        >
          {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <Button
          className="product-card__add"
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={() => onAdd(product)}
          disabled={product.stock < 1}
          fullWidth
        >
          Sepete ekle
        </Button>
      </Box>
      <CardContent className="product-card__content">
        <Link
          component={RouterLink}
          to={`/products/${product.id}`}
          underline="hover"
          color="inherit"
          className="product-card__name-link"
        >
          <Typography component="h3" variant="h6" className="product-card__name">
            {getProductDisplayName(product.name)}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          className="product-card__description"
        >
          {getProductDisplayDescription(product.name, product.description)}
        </Typography>
        <Stack
          direction="row"
          className="product-card__footer"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontWeight: 700 }} color="primary.dark">
            {formatPrice(product.price)}
          </Typography>
          <Typography
            variant="caption"
            color={product.stock > 0 ? "success.main" : "error.main"}
          >
            {product.stock > 0 ? `${product.stock} stokta` : "Tükendi"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
