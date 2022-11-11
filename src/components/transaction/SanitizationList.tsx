import {
  Alert,
  createStyles,
  Grid,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useListAllSanitizing } from "api";
import { matchSorter } from "match-sorter";
import { useMemo, useState } from "react";
import { SanitizationRow } from "./SanitizationRow";
import { LoadingError } from "components";
import { FaInfoCircle } from "react-icons/fa";

export const SanitizationList = () => {
  const { classes } = useStyles();
  const { isSuccess, isError, data } = useListAllSanitizing();
  const [search, setSearch] = useState("");

  const sanitizations = useMemo(
    () => (isSuccess ? data.sanitization : []),
    [isSuccess, data?.sanitization]
  );

  if ((!isSuccess && !isError) || isError) {
    return <LoadingError isSuccess={isSuccess} error={isError} />;
  }

  const searchsanitizations = () => {
    if (sanitizations.length > 0)
      return matchSorter(sanitizations, search, {
        keys: ["keywords", "sanitizedDescription"],
      });
    return [];
  };
  return (
    <Group className={classes.container} position="center">
      <TextInput
        radius="lg"
        placeholder="Search descriptions and keyword/s"
        className={classes.searchInput}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      {searchsanitizations().map((sanitization, index) => (
        <SanitizationRow key={index} sanitization={sanitization} />
      ))}
      {sanitizations.length <= 0 ? (
        <Alert
          icon={<FaInfoCircle size={16} />}
          color="indigo"
          radius="lg"
          className={classes.width100}
        >
          <>
            <Text>This section displays all matching data</Text>
            <Text>
              To get started head back to the transactions page and start
              sorting through your transactions. You will see a checkbox at the
              bottom of the edit transaction modal, from there you will be able
              to create a matching transaction
            </Text>
          </>
        </Alert>
      ) : null}
    </Group>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    marginBottom: theme.spacing.md,
  },
  width100: {
    width: "100%",
  },
  searchInput: {
    flexGrow: 1,
  },
}));
