import { createMuiTheme } from "@material-ui/core/styles";
import Colors from "../enums/Colors";

// Cria a instância do tema.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.PRIMARY,
    },
    secondary: {
      main: Colors.SECONDARY,
    },
    error: {
      main: Colors.ERROR,
    },
    warning: {
      main: Colors.WARNING,
    },
    info: {
      main: "#9A348E",
    },
    success: {
      main: "#80D0C7",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  typography: {
    h1: {
      fontFamily: "Commissioner",
    },
    h2: {
      fontFamily: "Commissioner",
    },
    h3: {
      fontFamily: "Commissioner",
    },
    h4: {
      fontFamily: "Commissioner",
    },
    h5: {
      fontFamily: "Commissioner",
    },
    h6: {
      fontFamily: "Commissioner",
    },
    subtitle1: {
      fontFamily: "Commissioner",
    },
    subtitle2: {
      fontFamily: "Commissioner",
    },
    fontSize: 16,
    fontFamily: [
      "Commissioner",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

export default theme;
