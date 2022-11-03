import {
  createStyles,
  Container,
  Title,
  Group,
  ScrollArea,
  Divider,
} from "@mantine/core";
import {
  SelectableAccountList,
  TransactionList,
  TransactionActions,
} from "components";

export const Transactions = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <Title className={classes.title}>Transactions</Title>
      <SelectableAccountList />
      <TransactionActions />
      <Group className={classes.sectionGroup}>
        <Title order={2} className={classes.sectionTitle}>
          Outstanding
        </Title>
        <ScrollArea style={{ height: 400 }}>
          <TransactionList unSanitized />
        </ScrollArea>
      </Group>
      {/* <Divider className={classes.divider} size="sm" /> */}
      <Group className={classes.sectionGroup}>
        <Title order={2} className={classes.sectionTitle}>
          History
        </Title>
        <TransactionList />
      </Group>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.xl,
  },
  divider: {
    marginBottom: theme.spacing.xl,
  },
  sectionGroup: {
    spacing: 0,
    width: "100%",
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
}));
