import { Button, createStyles, Group } from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import { TbBookUpload, TbRefreshDot } from "react-icons/tb";

export const TransactionActions = () => {
  const runSanitization = useRunSanitization();
  const { classes } = useStyles();
  return (
    <Group className={classes.group}>
      <Button leftIcon={<TbBookUpload />}>Upload Transaction Record</Button>
      <Button
        leftIcon={<TbRefreshDot />}
        onClick={async () =>
          await runSanitization.mutateAsync({ account: "Payment Account" })
        }
      >
        Run CleanUp
      </Button>
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100vw",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
}));
