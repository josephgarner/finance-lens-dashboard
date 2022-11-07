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
import { UpdateSanitizationModal } from "./UpdateSanitizationModal";

type Props = {
  sanitization: Sanitization;
};

export const SanitizationRow = ({ sanitization }: Props) => {
  const { classes } = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <UpdateSanitizationModal
        opened={openEdit}
        sanitization={sanitization}
        setOpen={setOpenEdit}
      />
      <Paper className={classes.paper}>
        <Grid columns={24}>
          <Grid.Col span={3}>
            <TypeBadge type={sanitization.type} />
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{sanitization.category}</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text>{sanitization.vendor}</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text>{sanitization.rawDescription}</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Text className={classes.description}>
              {sanitization.sanitizedDescription}
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <ActionIcon
              color="blue"
              size="sm"
              onClick={() => setOpenEdit(true)}
            >
              <FaEdit size={18} />
            </ActionIcon>
          </Grid.Col>
        </Grid>
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
