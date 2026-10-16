import { ArrowForward } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import { formatPrice } from "../../../utils/formatPrice";

interface CheckoutDialogProps {
  open: boolean;
  total: number;
  onClose: () => void;
  onSubmit: (customerName: string, customerEmail: string) => Promise<void>;
}

export function CheckoutDialog({
  open,
  total,
  onClose,
  onSubmit,
}: CheckoutDialogProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onSubmit(customerName, customerEmail);
      setCustomerName("");
      setCustomerEmail("");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Sipariş oluşturulamadı.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onClose={isSubmitting ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle className="checkout-title">
        <Typography className="eyebrow">SON BİR ADIM</Typography>
        <Typography component="h2" variant="h5">Sipariş bilgileri</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          Siparişini hazırlayabilmemiz için bilgilerini bırak.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Adın soyadın"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              autoComplete="name"
              required
              fullWidth
            />
            <TextField
              label="E-posta adresin"
              type="email"
              value={customerEmail}
              onChange={(event) => setCustomerEmail(event.target.value)}
              autoComplete="email"
              required
              fullWidth
            />
            <Stack
              className="checkout-total"
              direction="row"
              sx={{ justifyContent: "space-between" }}
            >
              <Typography color="text.secondary">Toplam</Typography>
              <Typography sx={{ fontWeight: 700 }}>{formatPrice(total)}</Typography>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForward />}
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Sipariş veriliyor..." : "Siparişi oluştur"}
            </Button>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Hesap oluşturman gerekmez.
            </Typography>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
