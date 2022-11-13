import {
  Alert,
  createStyles,
  Group,
  Pagination,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useListAllTransactions, uselistUnsanitizedTransactions } from "api";
import { useEffect, useMemo, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { groupByDate } from "utils/groupByDate";
import { matchSorter } from "match-sorter";
import { LoadingError, MonthRow, TransactionRow } from "components";

type Props = {
  selectedAccount: string;
  unSanitized?: boolean;
};

export const TransactionList = ({ unSanitized, selectedAccount }: Props) => {
  const { classes } = useStyles();
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [currentAccount, setCurrentAccount] = useState(selectedAccount);
  const { isSuccess, isError, data, isFetching } = unSanitized
    ? uselistUnsanitizedTransactions({
        account: selectedAccount,
        pageNumber: currentPage,
      })
    : useListAllTransactions({
        account: selectedAccount,
        pageNumber: currentPage,
      });

  useEffect(() => {
    setCurrentAccount(selectedAccount);
  }, [selectedAccount, setCurrentAccount, data?.transactions]);

  const transactions = useMemo(
    () => (isSuccess ? data.transactions : []),
    [isSuccess, data?.transactions]
  );

  if (currentAccount !== selectedAccount) {
    if (isFetching || isError) {
      return <LoadingError isFetching={isFetching} error={isError} />;
    }
  }

  if (!isSuccess || isError) {
    return <LoadingError isSuccess={isSuccess} error={isError} />;
  }

  const groupedTransactions = groupByDate(transactions);
  const uniqueMonths = Object.keys(groupedTransactions);

  if (transactions.length === 0) {
    return (
      <Alert
        icon={<FaInfoCircle size={16} />}
        color="indigo"
        radius="lg"
        className={classes.width100}
      >
        {unSanitized ? (
          <>
            <Text>
              This section displays all outstanding transactions that need to be
              reviewed and matched
            </Text>
            <Text>
              To get started click the Upload Transaction Record button above
              and upload your first transaction record.
            </Text>
          </>
        ) : (
          <Text>
            This section displays all transactions.
            <Text>
              To get started click the Upload Transaction Record button above
              and upload your first transaction record.
            </Text>
          </Text>
        )}
      </Alert>
    );
  }

  const searchTransactions = (month: string) => {
    if (search)
      return matchSorter(groupedTransactions[month], search, {
        keys: ["rawDescription", "sanitizedDescription"],
      });
    if (groupedTransactions[month]) return groupedTransactions[month];
    return [];
  };

  return (
    <Group className={classes.container} position="center">
      <Group className={classes.actionsGroup}>
        <Group className={classes.filterGroup}>
          <Select
            data={["All Months", ...uniqueMonths]}
            defaultValue={"All Months"}
            onChange={(value) => setSelectedMonth(value!)}
            radius="lg"
          />
          <Select
            data={["2022"]}
            radius="lg"
            defaultValue={"2022"}
            // onChange={(event) => TODO}
          />
        </Group>
        <TextInput
          radius="lg"
          placeholder="Search"
          className={classes.searchInput}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <Group className={classes.searchInput} position="center">
          <Pagination
            total={data.totalPages}
            radius="lg"
            onChange={setCurrentPage}
          />
        </Group>
      </Group>
      {selectedMonth === "All Months" ? (
        uniqueMonths.map((month) => {
          return (
            <Group key={month} className={classes.width100}>
              <MonthRow
                month={month}
                count={searchTransactions(month).length}
              />
              {searchTransactions(month).map((transaction, index) => (
                <TransactionRow
                  key={`${index}-${month}`}
                  transaction={transaction}
                />
              ))}
            </Group>
          );
        })
      ) : (
        <Group className={classes.width100}>
          <MonthRow
            month={selectedMonth}
            count={searchTransactions(selectedMonth).length}
          />
          {searchTransactions(selectedMonth).map((transaction, index) => (
            <TransactionRow
              key={`${index}-${selectedMonth}`}
              transaction={transaction}
            />
          ))}
        </Group>
      )}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
  width100: {
    width: "100%",
  },
  actionsGroup: {
    width: "100%",
    justifyContent: "space-between",
  },
  searchInput: {
    flexGrow: 4,
  },
  filterGroup: {
    justifyContent: "flex-start",
  },
}));
