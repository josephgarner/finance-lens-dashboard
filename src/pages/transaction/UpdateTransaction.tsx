import { Container, createStyles, Title } from "@mantine/core";
import { BackButton, UpdateTransactionForm } from "components";
import { Paths } from "enums";

export const UpdateTransaction = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <BackButton route={Paths.Transactions} label="Return to transactions" />
      <Title className={classes.title}>Update Transaction</Title>
      <UpdateTransactionForm />
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
}));
