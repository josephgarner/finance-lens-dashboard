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

type Props = {
  transaction: Transaction;
};

export const TransactionRow = ({ transaction }: Props) => {
  const { classes } = useStyles();

  const [openEdit, setOpenEdit] = useState(false);
  const isSanitized = transaction.sanitizedDescription!!;

  return (
    <>
      <UpdateTransactionModal
        opened={openEdit}
        transaction={transaction}
        setOpen={setOpenEdit}
      />
      <Paper className={classes.paper}>
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
            <Text>{transaction.vendor}</Text>
            <Text>{transaction.category}</Text>
          </Group>
          <Text className={classes.description}>
            {isSanitized
              ? transaction.sanitizedDescription
              : transaction.rawDescription}
          </Text>
          <Text>
            {displayCurrency(
              transaction.debit ? transaction.debit : transaction.credit
            )}
          </Text>

          <ActionIcon color="blue" size="sm" onClick={() => setOpenEdit(true)}>
            <FaEdit size={18} />
          </ActionIcon>
        </Group>
      </Paper>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  paper: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
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
