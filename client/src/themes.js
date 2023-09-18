import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00916E",
    },
    secondary: {
      main: "#FE5F55",
    },
    info: {
      main: "#E0AFA0",
    },
    background: {
      default: "#33658A",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00916E",
    },
    secondary: {
      main: "#FE5F55",
    },
    info: {
      main: "#E0AFA0",
    },
    background: {
      default: "#33658A",
    },
  },
});
