import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function StorySection() {
  return (
    <Container maxWidth="lg" className="story-section" id="about">
      <Box
        component="img"
        className="story-section__image"
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
        alt="Özenle hazırlanmış bir mağaza"
        loading="lazy"
      />
      <Box className="story-section__copy">
        <Typography className="eyebrow">BİZİM KÜÇÜK DÜNYAMIZ</Typography>
        <Typography component="h2">
          Güzel hissettiren <em>şeylere</em> inanıyoruz.
        </Typography>
        <Typography color="text.secondary">
          Her ürünün bir hikâyesi, her küçük seçimin gününe kattığı bir güzellik
          var. Biz de senin için tam böyle parçaları bir araya getiriyoruz.
        </Typography>
        <Button component={RouterLink} to="/" endIcon={<ArrowForward />}>
          Favorilerini bul
        </Button>
      </Box>
    </Container>
  );
}
