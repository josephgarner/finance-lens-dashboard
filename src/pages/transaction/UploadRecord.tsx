import { createStyles, Container, Title } from "@mantine/core";
import { BackButton, UploadFileForm } from "components";
import { Paths } from "enums";

export const UploadRecord = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <BackButton route={Paths.Transactions} label="Return to transactions" />
      <Title className={classes.title}>Upload Transaction Record</Title>
      <UploadFileForm />
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
