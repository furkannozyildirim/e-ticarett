import { ArrowForward, AutoAwesome } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";

export function HeroSection() {
  return (
    <Box className="hero-section" id="top">
      <Container maxWidth="lg" className="hero-section__inner">
        <Box className="hero-section__copy">
          <Typography className="eyebrow">KÜÇÜK ŞEYLER, GÜZEL HİSLER</Typography>
          <Typography component="h1" className="hero-section__title">
            Her gününe güzel bir <em>dokunuş.</em>
          </Typography>
          <Typography className="hero-section__description">
            Özenle seçilmiş favoriler, yaşamına küçük mutluluklar katmak için
            burada.
          </Typography>
          <Button
            className="hero-section__button"
            variant="contained"
            href="#products"
            endIcon={<ArrowForward />}
          >
            Koleksiyonu keşfet
          </Button>
          <Typography className="hero-section__note">
            <AutoAwesome fontSize="small" /> Güzel seçimler yapanlara katıl
          </Typography>
        </Box>
        <Box className="hero-section__image-wrap">
          <Box
            component="img"
            className="hero-section__image"
            src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=90"
            alt="Sade ve aydınlık bir yaşam alanı"
          />
          <Box className="hero-section__stamp">
            <AutoAwesome />
            <span>Günün<br />favorileri</span>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
