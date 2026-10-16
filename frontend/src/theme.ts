import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#315b46",
      dark: "#234331",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a17d5b",
    },
    background: {
      default: "#fbfaf7",
      paper: "#ffffff",
    },
    text: {
      primary: "#26372f",
      secondary: "#7c837b",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"Playfair Display", Georgia, serif' },
    h2: { fontFamily: '"Playfair Display", Georgia, serif' },
    h3: { fontFamily: '"Playfair Display", Georgia, serif' },
    h4: { fontFamily: '"Playfair Display", Georgia, serif' },
    h5: { fontFamily: '"Playfair Display", Georgia, serif' },
    h6: { fontFamily: '"Playfair Display", Georgia, serif' },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "#efeee9",
          boxShadow: "none",
        },
      },
    },
  },
});
