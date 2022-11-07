import { createStyles, Group, Loader, Paper, Title } from "@mantine/core";
import { useListAllAccounts } from "api";
import { LoadingError } from "components/core";
import { Account } from "types";
import { displayCurrency } from "utils/displayCurrency";

export const SelectableAccountList = () => {
  const { classes } = useStyles();
  const { isSuccess, isError, data } = useListAllAccounts();

  if ((!isSuccess && !isError) || isError) {
    return <LoadingError success={isSuccess} error={isError} />;
  }

  return (
    <Group className={classes.group}>
      {data.accounts.map((account) => (
        <Paper
          key={account.accountName}
          className={classes.selected}
          radius="lg"
          p="xl"
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
  },
  selected: {
    marginBottom: theme.spacing.md,
  },
  unSelected: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.gray[1],
  },
}));
