import { Alert, createStyles, Group, Loader } from "@mantine/core";
import { useListAllSanitizing } from "api";
import { FaInfoCircle } from "react-icons/fa";

import { useMemo } from "react";
import { SanitizationRow } from "./SanitizationRow";

export const SanitizationList = () => {
  const { classes } = useStyles();
  const { isSuccess, isError, data } = useListAllSanitizing();

  const sanitizations = useMemo(
    () => (isSuccess ? data.sanitization : []),
    [isSuccess, data?.sanitization]
  );

  if (!isSuccess && !isError) return <Loader />;
  console.log(sanitizations);

  if (isError)
    return (
      <Alert
        icon={<FaInfoCircle size={16} />}
        title="Bummer!"
        color="red"
        variant="filled"
      >
        Something terrible happened! The backend seems to be having a bad day!
      </Alert>
    );

  return (
    <Group className={classes.container} position="center">
      {sanitizations.map((sanitization) => (
        <SanitizationRow sanitization={sanitization} />
      ))}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
}));
