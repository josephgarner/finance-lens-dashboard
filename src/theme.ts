import { MantineThemeOverride } from "@mantine/core";
import { ComponentStyles } from "styles";

export const theme: MantineThemeOverride = {
  colorScheme: "light",

  lineHeight: 1.55,
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  colors: {
    // primary: ["#297373"],
    // primary: ["#3C91E6"],
    primary: ["#16302B"],
    secondary: ["#FF8552"],
    // tertiary: ["#52414C"],
    tertiary: ["#02182B"],
    red: ["#DD7E93", "#BA324F", "#711E30"],
    green: ["#C9DABE", "#8BB174", "#5F8349"],
    yellow: ["#FFE0AD", "#FFBA49", "#E08A00"],
    white: ["#E6E6E6"],
  },

  white: "#fff",
  black: "#39393A",

  primaryColor: "primary",
  primaryShade: 0,

  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },
  defaultRadius: "lg",

  components: ComponentStyles,
};
