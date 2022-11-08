import {
  createStyles,
  Group,
  Loader,
  Paper,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useListAllAccounts } from "api";
import { LoadingError } from "components/core";
import { useFinance } from "context";
import { useEffect, useMemo } from "react";
import { displayCurrency } from "utils/displayCurrency";

export const SelectableAccountList = () => {
  const { classes, cx } = useStyles();
  const { selectedAccount, setSelectedAccount } = useFinance();
  const { isSuccess, isError, isFetching, data } = useListAllAccounts();

  const accounts = useMemo(
    () => (isSuccess ? data.accounts : []),
    [isSuccess, data?.accounts]
  );

  if ((!isSuccess && !isError) || isError) {
    return <LoadingError isSuccess={isSuccess} error={isError} />;
  }

  return (
    <Group className={classes.group}>
      {accounts.map((account) => (
        <UnstyledButton
          key={account.accountName}
          onClick={() => setSelectedAccount(account.accountName)}
        >
          <Paper
            className={cx(
              classes.option,
              selectedAccount === account.accountName
                ? classes.selected
                : classes.unSelected
            )}
            radius="lg"
            p="xl"
          >
            <Title order={4}>{account.accountName}</Title>
            <Title>{displayCurrency(account.balance!)}</Title>
            <Title order={5}>{account.accountType}</Title>
          </Paper>
        </UnstyledButton>
      ))}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100vw",
  },
  option: {
    marginBottom: theme.spacing.md,
    width: 220,
  },
  selected: {
    backgroundColor: theme.colors.green[6],
    color: theme.white,
  },
  unSelected: {
    // marginBottom: theme.spacing.md,
    // backgroundColor: theme.colors.gray[1],
    // color: theme.colors.gray[5],
  },
}));
