import {
  createStyles,
  Group,
  Loader,
  Paper,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useListAllAccounts } from "api";
import { LoadingError } from "components";
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
          >
            <Group spacing={"sm"}>
              <Title className={cx(classes.title)} order={4}>
                {account.accountName}
              </Title>
              <Title className={cx(classes.title, classes.textRight)}>
                {displayCurrency(account.balance!)}
              </Title>
              <Title className={cx(classes.title)} order={5}>
                {account.accountType}
              </Title>
            </Group>
          </Paper>
        </UnstyledButton>
      ))}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100%",
  },
  title: {
    width: "100%",
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  option: {
    marginBottom: theme.spacing.md,
    width: 250,
  },
  selected: {
    backgroundColor: theme.colors.primary[0],
    color: theme.white,
  },
  unSelected: {},
}));
