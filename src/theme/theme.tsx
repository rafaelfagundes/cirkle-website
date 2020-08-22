import { createMuiTheme } from "@material-ui/core/styles";

export enum Colors {
  PRIMARY = "#561643",
  SECONDARY = "#C94277",
  WHITE = "#FFF",
  BLACK = "#121212",
  BLACK2 = "#232323",
  BLACK3 = "#333",
  SIDE_MENU_BG = "##F9F9F9",
  AMARANTH_PINK = "#E79CB4",
  BLUE_JEANS = "#33A1FD",
  CHARM_PINK = "#E3879E",
  CREAM = "#F3FFBD",
  CRIMSON = "#D7263D",
  CYAN_PROCESS = "#5DB7DE",
  DARK_MOSS_GREEN = "#3F612D",
  DARK_PURPLE = "#231123",
  DARK_SEA_GREEN = "#8DB580",
  EMERALD = "#2FBF71",
  FIRE_OPAL = "#E65F5C",
  FLAX = "#E8DB7D",
  FOREST_GREEN_CRAYOLA = "#4DA167",
  FRENCH_RASPBERRY = "#C42847",
  GRAY = "#9A9A9A",
  LAVENDER = "#DAE0F2",
  LIGHT_CORAL = "#EC8583",
  LIGHT_GRAY = "#CFCFCF",
  ULTRA_LIGHT_GRAY = "#EEE",
  MADDER_LAKE_RED = "#CC2936",
  MAGENTA = "#8F2D56",
  MANGO = "#FFBE0B",
  MANTIS = "#8CD867",
  MAX_YELLOW_RED = "#FFBC42",
  MELON = "#E0AC9D",
  MIDDLE_RED = "#E88873",
  MIDDLE_YELLOW = "#FEEA00",
  MINDARO = "#DBFE87",
  MORNING_BLUE = "#7BA098",
  MYSTIC = "#D65780",
  OLD_BURGUNDY = "#2C1A1D",
  ORANGE_KIDS = "#FFA400",
  ORANGE_PANTONE = "#FB5607",
  OUTRAGEOUS_ORANGE = "#FF785A",
  PALATINE_PURPLE = "#52154E",
  PANSY_PURPLE = "#82204A",
  PARADISE_PINK = "#EF476F",
  PLUM = "#8F3985",
  POOL_GREEN = "#80D0C7",
  PORTLAND_ORANGE = "#F46036",
  PRINCETON_ORANGE = "#ED7D3A",
  PURPUREUS = "#9D44B5",
  RADICAL_RED = "#FF1654",
  RED_CRAYOLA = "#EF2D56",
  RED_PINK = "#FF1D6F",
  RUBY = "#D81159",
  RUSTY_RED = "#DE3C4B",
  SPANISH_VIRIDIAN = "#0C7C59",
  SUNGLOW = "#FDCA40",
  TEA_GREEN = "#BDE4A8",
  TYRIAN_PURPLE = "#561643",
  ULTRA_RED = "#EF798A",
  URANIAN_BLUE = "#BADEFC",
  VERY_LIGHT_GRAY = "#F5F5F5",
  WINTER_SKY = "#FF006E",
  XIKETIC = "#1C0F13",
  YELLOW_ORANGE = "#F79824",
}

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
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
