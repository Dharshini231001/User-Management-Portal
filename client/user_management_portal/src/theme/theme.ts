import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    }
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif"
  }
});

export default theme;
