import { Box, createStyles, Group, Loader, Text } from "@mantine/core";
import {
  useListAllAccounts,
  useListAllTransactions,
  uselistUnsanitizedTransactions,
} from "api";
import { MonthRow, TransactionRow } from "components";
import { useEffect, useState } from "react";
import { Transaction } from "types";
import { groupByDate } from "utils/groupByDate";

type Props = {
  unSanitized?: boolean;
};

export const TransactionList = ({ unSanitized }: Props) => {
  const { classes } = useStyles();
  const { isSuccess, data } = unSanitized
    ? uselistUnsanitizedTransactions()
    : useListAllTransactions();

  if (!isSuccess) return <Loader />;

  const groupedTransactions = groupByDate(data.transactions);
  const uniqueMonths = Object.keys(groupedTransactions);

  return (
    <Group className={classes.container} position="center">
      {uniqueMonths.map((month) => {
        return (
          <Group key={month}>
            <MonthRow month={month} />
            {groupedTransactions[month].map((transaction, index) => (
              <TransactionRow
                key={`${index}-${month}`}
                transaction={transaction}
              />
            ))}
          </Group>
        );
      })}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
}));
