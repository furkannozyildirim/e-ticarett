import { useState, type FormEvent } from "react";
import {
  EmailOutlined,
  LocationOnOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? "";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!contactEmail) {
      setError("İletişim e-posta adresi henüz yapılandırılmamış.");
      return;
    }

    const subject = encodeURIComponent(`Sepetim iletişim mesajı - ${name}`);
    const body = encodeURIComponent(
      `Gönderen: ${name}\nE-posta: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <Box component="main" className="page-background">
      <Container maxWidth="md" className="inner-page contact-page">
        <Typography className="eyebrow">BİZİMLE KONUŞ</Typography>
        <Typography component="h1" className="inner-page__title">
          Yardım etmek için buradayız.
        </Typography>
        <Typography color="text.secondary" className="contact-page__intro">
          Bir sorun, öneri ya da sadece merhaba demek için bize yazabilirsin.
        </Typography>

        <Box className="contact-page__layout">
          <Paper className="contact-info" variant="outlined">
            <Typography component="h2" variant="h6">
              İletişim bilgileri
            </Typography>
            <Stack className="contact-info__item" direction="row" spacing={1.5}>
              <EmailOutlined color="primary" />
              <Box>
                <Typography variant="subtitle2">E-posta</Typography>
                <Typography variant="body2" color="text.secondary">
                  {contactEmail || "E-posta adresi yapılandırılacak"}
                </Typography>
              </Box>
            </Stack>
            <Stack className="contact-info__item" direction="row" spacing={1.5}>
              <LocationOnOutlined color="primary" />
              <Box>
                <Typography variant="subtitle2">Mağaza</Typography>
                <Typography variant="body2" color="text.secondary">
                  Online mağaza — her yerden ulaşabilirsin.
                </Typography>
              </Box>
            </Stack>
            <Typography className="contact-info__note" variant="body2" color="text.secondary">
              Mesaj formu, cihazındaki e-posta uygulamasını açar. İletişim adresini
              `frontend/.env` dosyasında `VITE_CONTACT_EMAIL` olarak tanımlayabilirsin.
            </Typography>
          </Paper>

          <Paper className="contact-form" variant="outlined">
            <Typography component="h2" variant="h6">
              Mesaj gönder
            </Typography>
            {error && <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Stack spacing={2}>
                <TextField
                  label="Adın"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                  fullWidth
                />
                <TextField
                  label="E-posta adresin"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  fullWidth
                />
                <TextField
                  label="Mesajın"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  minRows={4}
                  multiline
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendOutlined />}
                  fullWidth
                >
                  E-posta ile gönder
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
