import { createTheme } from "@mui/material/styles";

// overrides and typography will eventually also be here
const theme = createTheme({
  palette: {
    primary: {
      main: "#5356FF",
      light: "#5356ffd6",
      dark: "#2629d2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5356ffd6",
      light: "#fe91ca",
      dark: "#d3dbff",
      contrastText: "#fff",
    },
  },
});

export default theme;
