import { Box, createStyles } from "@mantine/core";
import { useFinance } from "context";
import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
  style?: CSSProperties;
};

export const PrivacySheild = ({ children, style }: Props) => {
  const { privacyMode } = useFinance();

  const { classes, cx } = useStyles();
  console.log(privacyMode);
  return (
    <Box style={{ ...style }} className={cx(privacyMode && classes.enabled)}>
      {children}
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  box: {
    width: "100%",
  },
  enabled: {
    filter: "blur(7px)",
    ":hover": {
      filter: "none",
    },
  },
}));
