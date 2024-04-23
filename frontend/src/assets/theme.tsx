import { createTheme } from "@mui/material/styles";

// overrides and typography will eventually also be here
const theme = createTheme({
  palette: {
    primary: {
      main: "#5356FF",
      light: "#67C6E3",
      dark: "#378CE7",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffe0f7",
      light: "#fe91ca",
      dark: "#d3dbff",
      contrastText: "#fff",
    },
  },
});

export default theme;
