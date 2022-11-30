import {
  ActionIcon,
  createStyles,
  Grid,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { Transaction } from "types";
import { displayCurrency } from "utils/displayCurrency";
import { TypeBadge } from "./TypeBadge";
import { FaEdit } from "react-icons/fa";
import { UpdateTransactionModal } from "./UpdateTransactionModal";
import { useState } from "react";
import { displayDate } from "utils/displayDate";
import { TbCheck, TbEye } from "react-icons/tb";
import { PrivacySheild } from "components/core/PrivacySheild";
import { useFinance } from "context";

type Props = {
  transaction: Transaction;
};

export const TransactionRow = ({ transaction }: Props) => {
  const { classes } = useStyles();

  const { selectedTransaction, setTransaction } = useFinance();

  const isSanitized = transaction.sanitizedDescription!!;

  return (
    <>
      <Paper
        className={classes.paper}
        onClick={() => {
          selectedTransaction &&
          transaction.rawDescription == selectedTransaction.rawDescription
            ? setTransaction(null)
            : setTransaction(transaction);
        }}
      >
        <Group className={classes.group}>
          {isSanitized ? (
            <TbCheck className={`${classes.icon} ${classes.tick}`} size={20} />
          ) : (
            <TbEye className={`${classes.icon} ${classes.eye}`} size={20} />
          )}
          <Group position={"center"} className={classes.dateSectionGroups}>
            <Text>{displayDate(transaction.date)}</Text>

            <TypeBadge type={transaction.type} />
          </Group>
          <Group className={classes.sectionGroups}>
            <Group>
              <Text>{transaction.vendor}</Text>
              <Text>{transaction.category}</Text>
              <Text>{transaction.subcategory}</Text>
            </Group>
            <Text className={classes.description}>
              {isSanitized
                ? transaction.sanitizedDescription
                : transaction.rawDescription}
            </Text>
          </Group>
          <PrivacySheild>
            <Text>
              {displayCurrency(
                transaction.debit ? transaction.debit : transaction.credit
              )}
            </Text>
          </PrivacySheild>
        </Group>
      </Paper>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    width: "100%",
  },
  group: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  dateSectionGroups: {
    flexDirection: "column",
    alignItems: "center",
  },
  sectionGroups: {
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 4,
  },
  icon: {
    minWidth: 20,
  },
  eye: { color: theme.colors.red[8] },
  tick: { color: theme.colors.green[8] },
  description: {
    flexGrow: 1,
  },
  gridCol: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));
