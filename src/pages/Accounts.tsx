import { createStyles, Container, Title } from "@mantine/core";

export const Accounts = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.container}>
      <Title>Accounts</Title>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.xl,
  },
  divider: {
    marginBottom: theme.spacing.xl,
  },
}));
