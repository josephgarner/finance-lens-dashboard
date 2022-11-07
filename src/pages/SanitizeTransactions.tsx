import { createStyles, Container, Title } from "@mantine/core";
import { SanitizationList } from "components";

export const SanitizeTransactions = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <Title className={classes.title}>Transaction Matching List</Title>
      <SanitizationList />
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
