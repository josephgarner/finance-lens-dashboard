import { createStyles, Container, Title, Tabs } from "@mantine/core";
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
      <Tabs variant="outline" radius="lg" defaultValue="Outstanding">
        <Tabs.List>
          <Tabs.Tab value="Outstanding">Outstanding</Tabs.Tab>
          <Tabs.Tab value="History">History</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Outstanding" pt="xs">
          <TransactionList unSanitized />
        </Tabs.Panel>
        <Tabs.Panel value="History" pt="xs">
          <TransactionList />
        </Tabs.Panel>
      </Tabs>
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
}));
