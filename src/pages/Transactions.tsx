import {
  createStyles,
  Container,
  Title,
  Tabs,
  Alert,
  Text,
} from "@mantine/core";
import {
  SelectableAccountList,
  TransactionList,
  TransactionActions,
} from "components";
import { useFinance } from "context";
import { FaInfoCircle } from "react-icons/fa";

export const Transactions = () => {
  const { classes } = useStyles();

  const { selectedAccount } = useFinance();

  return (
    <Container className={classes.container}>
      <Title className={classes.title}>Transactions</Title>
      <SelectableAccountList />
      <TransactionActions />
      {!selectedAccount ? (
        <Alert icon={<FaInfoCircle size={16} />}>
          <>
            <Text>
              An account has either not been created or selected. Please either
              select from an account above or nagivate the accounts page and
              create a new account
            </Text>
          </>
        </Alert>
      ) : (
        <Tabs
          variant="outline"
          radius="lg"
          defaultValue="Outstanding"
          classNames={{ tabLabel: classes.tab }}
        >
          <Tabs.List>
            <Tabs.Tab value="Outstanding">Outstanding</Tabs.Tab>
            <Tabs.Tab value="History">History</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Outstanding" pt="md">
            <TransactionList unSanitized selectedAccount={selectedAccount} />
          </Tabs.Panel>
          <Tabs.Panel value="History" pt="md">
            <TransactionList selectedAccount={selectedAccount} />
          </Tabs.Panel>
        </Tabs>
      )}
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
  tab: {
    "::before": {
      background: "none",
    },
  },
}));
