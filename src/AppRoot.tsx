import { AppShell, createStyles } from "@mantine/core";
import { Transactions } from "pages";
import { useState } from "react";

export const AppRoot = () => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();
  return (
    <AppShell>
      <Transactions />
    </AppShell>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    padding: theme.spacing.md,
  },
}));
