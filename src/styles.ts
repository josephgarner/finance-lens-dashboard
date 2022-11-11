import {
  ActionIconStylesParams,
  AlertStylesParams,
  BadgeStylesParams,
  ButtonStylesParams,
  ChipStylesParams,
  InputStylesParams,
  MantineSize,
  MantineTheme,
  PaperStylesParams,
} from "@mantine/core";

export const ComponentStyles = {
  Button: {
    styles: (theme: MantineTheme, params: ButtonStylesParams) => ({
      root: {
        borderRadius: theme.radius.lg,
        fontSize: theme.fontSizes[params.size ?? "md"],
        fontWeight: BUTTON_FONT_WEIGHT_BY_SIZE[params.size ?? "xl"],
        height: BUTTON_HEIGHT_BY_SIZE[params.size ?? "md"],
        color:
          params.variant === "white" || params.variant === "light"
            ? theme.black
            : theme.white,
        backgroundColor:
          params.variant === "white"
            ? theme.white
            : params.variant === "light"
            ? theme.colors.secondary[0]
            : theme.colors.primary[0],

        ":hover": {
          backgroundColor: theme.fn.lighten(
            params.variant === "white"
              ? theme.white
              : params.variant === "light"
              ? theme.colors.secondary[0]
              : theme.colors.primary[0],
            0.1
          ),
        },
      },
    }),
  },
  ActionIcon: {
    styles: (theme: MantineTheme, params: ActionIconStylesParams) => ({
      root: {
        color:
          params.variant === "transparent"
            ? theme.colors.secondary[0]
            : theme.colors.primary[0],
      },
    }),
  },
  Badge: {
    styles: (theme: MantineTheme, params: BadgeStylesParams) => ({
      root: {
        fontSize: theme.fontSizes["sm"],
        fontWeight: BUTTON_FONT_WEIGHT_BY_SIZE["lg"],
        color:
          params.color === "red"
            ? theme.colors.red[2]
            : params.color === "yellow"
            ? theme.colors.yellow[2]
            : params.color === "gray"
            ? theme.colors.gray[7]
            : theme.colors.green[2],
        padding: theme.spacing.sm,
        paddingRight: theme.spacing.sm,
      },
    }),
  },
  Chip: {
    styles: (theme: MantineTheme, params: ChipStylesParams) => ({
      paper: {
        color:
          params.color === "red"
            ? theme.colors.red[2]
            : params.color === "yellow"
            ? theme.colors.yellow[2]
            : params.color === "gray"
            ? theme.colors.gray[7]
            : theme.colors.green[2],
      },
      iconWrapper: {
        color:
          params.color === "red"
            ? theme.colors.red[2]
            : params.color === "yellow"
            ? theme.colors.yellow[2]
            : params.color === "gray"
            ? theme.colors.gray[7]
            : theme.colors.green[2],
      },
    }),
  },
  Paper: {
    styles: (theme: MantineTheme, params: PaperStylesParams) => ({
      root: {
        borderRadius: theme.radius.lg,
        padding: theme.spacing.sm,
        backgroundColor: theme.fn.lighten(theme.white, 0.2),
      },
    }),
  },
  Alert: {
    styles: (theme: MantineTheme, params: AlertStylesParams) => ({
      root: {
        borderRadius: theme.radius.lg,
        width: "100%",
        color: params.variant === "outline" ? theme.black : theme.white,
        backgroundColor: theme.fn.lighten(
          params.variant === "outline"
            ? theme.colors.secondary[0]
            : theme.colors.tertiary[0],
          0.3
        ),
        border: "none",
      },
      message: {
        color: params.variant === "outline" ? theme.black : theme.white,
      },
    }),
  },
};

const BUTTON_HEIGHT_BY_SIZE: Record<MantineSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

const BUTTON_FONT_WEIGHT_BY_SIZE: Record<MantineSize, number> = {
  xs: 400,
  sm: 400,
  md: 400,
  lg: 600,
  xl: 800,
};
