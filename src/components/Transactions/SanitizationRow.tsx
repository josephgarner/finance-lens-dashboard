import {
  ActionIcon,
  createStyles,
  Grid,
  Group,
  Paper,
  Text,
} from "@mantine/core";
import { Sanitization, Transaction } from "types";
import { displayCurrency } from "utils/displayCurrency";
import { TypeBadge } from "./TypeBadge";
import { FaEdit } from "react-icons/fa";
import { UpdateTransactionModal } from "./UpdateTransactionModal";
import { useState } from "react";
import { displayDate } from "utils/displayDate";

type Props = {
  sanitization: Sanitization;
};

export const SanitizationRow = ({ sanitization }: Props) => {
  const { classes } = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <Paper className={classes.paper}>
        <Group className={classes.group}>
          <TypeBadge type={sanitization.type} />

          <Text>{sanitization.category}</Text>

          <Text>{sanitization.rawDescription}</Text>

          <Text className={classes.description}>
            {sanitization.sanitizedDescription}
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
  description: {
    flexGrow: 2,
  },
}));
