import { createMuiTheme } from "@material-ui/core/styles";
import Colors from "../enums/Colors";

// Cria a instância do tema.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.PRIMARY,
    },
    secondary: {
      main: "#C94277",
    },
    error: {
      main: "#F05D5E",
    },
    warning: {
      main: "#FF8552",
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
      fontFamily: "FuturaPT",
    },
    h2: {
      fontFamily: "FuturaPT",
    },
    h3: {
      fontFamily: "FuturaPT",
    },
    h4: {
      fontFamily: "FuturaPT",
    },
    h5: {
      fontFamily: "FuturaPT",
    },
    h6: {
      fontFamily: "FuturaPT",
    },
    subtitle1: {
      fontFamily: "FuturaPT",
    },
    subtitle2: {
      fontFamily: "FuturaPT",
    },
    fontSize: 16,
    fontFamily: [
      "FuturaPT",
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
