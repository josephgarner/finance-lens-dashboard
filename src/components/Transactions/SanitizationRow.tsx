import {
  ActionIcon,
  Badge,
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
  const { classes, cx } = useStyles();

  const [openEdit, setOpenEdit] = useState(false);

  const getKeywords = () => {
    return sanitization.keywords.map((word, index) => (
      <Badge className={classes.tagBagde} key={index} color={"gray"}>
        {word}
      </Badge>
    ));
  };

  return (
    <>
      <UpdateSanitizationModal
        opened={openEdit}
        sanitization={sanitization}
        setOpen={setOpenEdit}
      />
      <Paper className={classes.paper}>
        <Grid className={classes.grid} columns={24}>
          <Grid.Col className={classes.col} span={4}>
            <Text className={classes.title}>Type</Text>
            <TypeBadge type={sanitization.type} />
          </Grid.Col>
          <Grid.Col className={classes.col} span={4}>
            <Text className={classes.title}>Category</Text>
            <Text>{sanitization.category}</Text>
          </Grid.Col>
          <Grid.Col className={classes.col} span={4}>
            <Text className={classes.title}>Vendor</Text>
            <Text>{sanitization.vendor}</Text>
          </Grid.Col>
          <Grid.Col className={classes.col} span={10}>
            <Text className={classes.title}>Description</Text>
            <Text className={classes.description}>
              {sanitization.sanitizedDescription}
            </Text>
          </Grid.Col>

          <Grid.Col className={classes.col} span={22}>
            <Text className={classes.title}>Keyword Tag/s</Text>
            {getKeywords()}
          </Grid.Col>
          <Grid.Col className={cx(classes.col, classes.actionCol)} span={1}>
            <ActionIcon size="sm" onClick={() => setOpenEdit(true)}>
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
    width: "100%",
  },
  grid: {
    padding: theme.spacing.xs,
  },
  description: {
    flexGrow: 2,
  },
  col: {
    padding: 0,
    margin: theme.spacing.xs,
  },
  title: {
    fontWeight: 600,
    color: theme.colors.gray[6],
  },
  tagBagde: {
    textTransform: "none",
    marginRight: theme.spacing.sm,
  },
  actionCol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
