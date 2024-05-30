import { createTheme } from "@shopify/restyle";

import Colors from "@/constants/Colors";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",
  black: "#0B0B0B",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    white: palette.white,
    gray: Colors.gray,
    primary: Colors.primary,
    background: Colors.background,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
  containerVariants: {
    defaults: {},
    rowAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    rowCenterBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    centerItems: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export type Theme = typeof theme;
export default theme;
