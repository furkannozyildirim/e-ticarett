import {
  FavoriteBorder,
  LocalShippingOutlined,
  SpaOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";

const benefits = [
  { label: "Özenle seçildi", icon: <SpaOutlined /> },
  { label: "Güvenli alışveriş", icon: <FavoriteBorder /> },
  { label: "Kolay sipariş", icon: <LocalShippingOutlined /> },
  { label: "Her güne biraz neşe", icon: <StorefrontOutlined /> },
];

export function BenefitsBar() {
  return (
    <Box className="benefits-bar">
      <Container maxWidth="lg" className="benefits-bar__items">
        {benefits.map((benefit) => (
          <Box className="benefits-bar__item" key={benefit.label}>
            {benefit.icon}
            <Typography variant="body2">{benefit.label}</Typography>
          </Box>
        ))}
      </Container>
    </Box>
  );
}
