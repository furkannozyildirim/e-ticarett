import { ShoppingBag } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface SiteHeaderProps {
  cartCount: number;
}

export function SiteHeader({ cartCount }: SiteHeaderProps) {
  return (
    <AppBar className="site-header" position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters className="site-header__toolbar">
          <RouterLink className="brand" to="/" aria-label="Sepetim ana sayfa">
            <span className="brand__mark">
              <ShoppingBag fontSize="small" />
            </span>
            <Typography component="span" className="brand__name">
              sepetim<span>.</span>
            </Typography>
          </RouterLink>

          <Box component="nav" className="site-nav" aria-label="Ana menü">
            <Button component={RouterLink} to="/">Alışveriş</Button>
            <Button component={RouterLink} to="/contact">İletişim</Button>
          </Box>

          <IconButton
            component={RouterLink}
            to="/cart"
            className="header-cart"
            aria-label={`Sepet sayfası, ${cartCount} ürün`}
          >
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingBag />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
