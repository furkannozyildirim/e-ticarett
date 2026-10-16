import { useState } from "react";
import {
  Add,
  ArrowBack,
  ArrowForward,
  DeleteOutline,
  Remove,
  ShoppingBag,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { changeQuantity, clearCart, removeFromCart } from "../features/cart/cartSlice";
import { useCart } from "../features/cart/hooks/useCart";
import { CheckoutDialog } from "../features/orders/components/CheckoutDialog";
import { orderApi } from "../features/orders/api/orderApi";
import { formatPrice } from "../utils/formatPrice";
import {
  getCategoryDisplayName,
  getProductDisplayName,
  getProductImage,
} from "../utils/productImage";

export function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useCart();
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  async function createOrder(customerName: string, customerEmail: string) {
    const order = await orderApi.create({
      customerName,
      customerEmail,
      items: cart.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    });

    dispatch(clearCart());
    setCheckoutOpen(false);
    setConfirmation(`Siparişin alındı. Sipariş numaran: #${order.id}`);
  }

  return (
    <Box component="main" className="page-background">
      <Container maxWidth="lg" className="inner-page">
        <Button component={RouterLink} to="/" startIcon={<ArrowBack />}>
          Alışverişe dön
        </Button>
        <Typography className="eyebrow" sx={{ mt: 3 }}>
          SEÇTİKLERİN
        </Typography>
        <Typography component="h1" className="inner-page__title">
          Alışveriş sepetin
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sepetindeki ürünleri ve adetlerini buradan düzenleyebilirsin.
        </Typography>

        {confirmation && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setConfirmation("")}
          >
            {confirmation}
          </Alert>
        )}

        {cart.items.length === 0 ? (
          <Paper className="cart-empty-state" variant="outlined">
            <ShoppingBag color="primary" sx={{ fontSize: 42 }} />
            <Typography component="h2" variant="h5">
              Sepetin şimdilik boş
            </Typography>
            <Typography color="text.secondary">
              Beğendiğin ürünleri mağazadan ekleyebilirsin.
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              endIcon={<ArrowForward />}
            >
              Ürünleri keşfet
            </Button>
          </Paper>
        ) : (
          <Box className="cart-page-layout">
            <Stack spacing={1.5}>
              {cart.items.map((item) => (
                <Paper className="cart-page-item" variant="outlined" key={item.id}>
                  <Box
                    component="img"
                    className="cart-page-item__image"
                    src={getProductImage(item.name, item.category, item.imageUrl)}
                    alt={getProductDisplayName(item.name)}
                  />
                  <Box className="cart-page-item__details">
                    <Typography variant="caption" color="text.secondary">
                      {getCategoryDisplayName(item.category)}
                    </Typography>
                    <Typography component="h2" className="cart-page-item__name">
                      {getProductDisplayName(item.name)}
                    </Typography>
                    <Typography color="primary.dark" fontWeight={700}>
                      {formatPrice(item.price)}
                    </Typography>
                    <Stack direction="row" alignItems="center" className="quantity-control">
                      <IconButton
                        size="small"
                        aria-label={`${item.name} adedini azalt`}
                        onClick={() =>
                          dispatch(changeQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        aria-label={`${item.name} adedini artır`}
                        disabled={item.quantity >= item.stock}
                        onClick={() =>
                          dispatch(changeQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                  <Box className="cart-page-item__end">
                    <IconButton
                      aria-label={`${item.name} ürününü sepetten çıkar`}
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <DeleteOutline />
                    </IconButton>
                    <Typography fontWeight={700}>
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>

            <Paper className="cart-summary-card" variant="outlined">
              <Typography component="h2" variant="h6">
                Sipariş özeti
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Ürün adedi</Typography>
                <Typography>{cart.count}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}>
                <Typography color="text.secondary">Ara toplam</Typography>
                <Typography fontWeight={700}>{formatPrice(cart.total)}</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", my: 2 }}>
                Kargo ücreti sipariş sırasında hesaplanır.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForward />}
                onClick={() => setCheckoutOpen(true)}
              >
                Siparişi tamamla
              </Button>
            </Paper>
          </Box>
        )}
      </Container>

      <CheckoutDialog
        open={isCheckoutOpen}
        total={cart.total}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={createOrder}
      />
    </Box>
  );
}
