import { ShoppingBag } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function SiteFooter() {
  return (
    <Box component="footer" className="site-footer">
      <Container maxWidth="lg" className="site-footer__inner">
        <RouterLink className="brand" to="/">
          <span className="brand__mark"><ShoppingBag fontSize="small" /></span>
          <Typography component="span" className="brand__name">
            sepetim<span>.</span>
          </Typography>
        </RouterLink>
        <Typography variant="body2">Güzel şeyler, güzel hisler.</Typography>
        <Box className="site-footer__links">
          <Button component={RouterLink} to="/">Alışveriş</Button>
          <Button component={RouterLink} to="/contact">İletişim</Button>
          <Typography variant="caption">© 2026 Sepetim</Typography>
        </Box>
      </Container>
    </Box>
  );
}
