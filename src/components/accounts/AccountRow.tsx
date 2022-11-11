import { createStyles, Group, Paper, Title } from "@mantine/core";
import { Account } from "types";
import { displayCurrency } from "utils/displayCurrency";

type Props = {
  account: Account;
};

export const AccountRow = ({ account }: Props) => {
  const { classes } = useStyles();

  return (
    <Paper
      key={account.accountName}
      className={classes.paper}
      radius="lg"
      p="xl"
    >
      <Group className={classes.descriptionGroup}>
        <Title order={2}>{account.accountName}</Title>
        <Title order={5}>{account.accountType}</Title>
      </Group>
      <Title>{displayCurrency(account.balance!)}</Title>
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionGroup: {
    alignItems: "flex-start",
    flexDirection: "column",
  },
}));
