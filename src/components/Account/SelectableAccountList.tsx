import { createStyles, Group, Loader, Paper, Title } from "@mantine/core";
import { useListAllAccounts } from "api";
import { Account } from "types";
import { displayCurrency } from "utils/displayCurrency";

export const SelectableAccountList = () => {
  const { classes } = useStyles();
  const listAccounts = useListAllAccounts();

  if (!listAccounts.isSuccess) return <Loader />;

  return (
    <Group className={classes.group}>
      {listAccounts.data.accounts.map((account) => (
        <Paper
          key={account.accountName}
          className={classes.selected}
          radius="lg"
          p="xl"
          withBorder
        >
          <Title order={4}>{account.accountName}</Title>
          <Title>{displayCurrency(account.balance!)}</Title>
          <Title order={5}>{account.accountType}</Title>
        </Paper>
      ))}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100vw",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  selected: {
    marginBottom: theme.spacing.md,
  },
  unSelected: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.gray[1],
  },
}));
