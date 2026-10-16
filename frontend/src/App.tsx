import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useCart } from "./features/cart/hooks/useCart";
import { AnnouncementBar } from "./components/layout/AnnouncementBar";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteHeader } from "./components/layout/SiteHeader";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { StorePage } from "./pages/StorePage";
import { theme } from "./theme";
import "./styles.css";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppLayout() {
  const cart = useCart();

  return (
    <>
      <AnnouncementBar />
      <SiteHeader cartCount={cart.count} />
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  );
}
