import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f4c5c",
      light: "#2d6a7d",
      dark: "#082f3d",
    },
    secondary: {
      main: "#d17b49",
      light: "#e4a072",
      dark: "#8a4b22",
    },
    background: {
      default: "#f5efe7",
      paper: "rgba(255, 252, 247, 0.78)",
    },
    text: {
      primary: "#132028",
      secondary: "#4b5d67",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: '"Manrope Variable", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(15, 76, 92, 0.08)",
          boxShadow: "0 24px 60px rgba(19, 32, 40, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 700,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});
