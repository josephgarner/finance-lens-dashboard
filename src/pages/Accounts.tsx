import { createStyles, Container, Title } from "@mantine/core";
import { AccountList } from "components/account/AccountList";

export const Accounts = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <Title className={classes.title}>Accounts</Title>
      <AccountList />
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
}));
