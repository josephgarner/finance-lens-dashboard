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
          <Grid sx={{ flexGrow: 4 }}>
            <Grid.Col className={classes.gridCol} span={2}>
              <Text>{displayDate(transaction.date)}</Text>
            </Grid.Col>
            <Grid.Col className={classes.gridCol} span={2}>
              <TypeBadge type={transaction.type} />
              <Text>{transaction.category}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>{transaction.vendor}</Text>
              <Text>
                {isSanitized
                  ? transaction.sanitizedDescription
                  : transaction.rawDescription}
              </Text>
            </Grid.Col>
            <Grid.Col className={classes.gridCol} span={2}>
              <Text>
                {displayCurrency(
                  transaction.debit ? transaction.debit : transaction.credit
                )}
              </Text>
            </Grid.Col>
          </Grid>
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
  gridCol: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));
