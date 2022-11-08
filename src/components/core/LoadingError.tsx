import { Alert, createStyles, Group, Loader } from "@mantine/core";
import { FaInfoCircle } from "react-icons/fa";

type Props = {
  error: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
};

export const LoadingError = ({ error, isFetching, isSuccess }: Props) => {
  const { classes } = useStyles();

  if (isFetching || (!isSuccess && !error))
    return (
      <Group className={classes.container}>
        <Loader size="lg" variant="dots" />
      </Group>
    );

  if (error)
    return (
      <Alert
        icon={<FaInfoCircle size={16} />}
        title="Failure"
        color="red"
        variant="filled"
      >
        An error has occured! seems something has gone wrong in our backend.
      </Alert>
    );
  return null;
};

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: theme.spacing.xl,
    width: "100%",
    justifyContent: "center",
  },
}));
