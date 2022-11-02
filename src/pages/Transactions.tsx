import {
  createStyles,
  Container,
  Title,
  Group,
  ScrollArea,
  Divider,
  ActionIcon,
} from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import {
  SelectableAccountList,
  TransactionList,
  TransactionActions,
} from "components";
import { TbRefreshDot } from "react-icons/tb";

export const Transactions = () => {
  const { classes } = useStyles();
  const runSanitization = useRunSanitization();
  return (
    <Container>
      <Title>Transactions</Title>
      <SelectableAccountList />
      <TransactionActions />
      <Title order={2}>Outstanding</Title>
      <ScrollArea style={{ height: 400 }}>
        <TransactionList unSanitized />
      </ScrollArea>
      <Divider className={classes.divider} size="sm" />
      <Title order={2}>History</Title>
      <TransactionList />
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    minWidth: "100vw",
    padding: theme.spacing.md,
  },
  divider: {
    marginBottom: theme.spacing.xl,
  },
}));
