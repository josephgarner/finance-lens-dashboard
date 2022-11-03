import {
  Button,
  createStyles,
  Group,
  useMantineTheme,
  Text,
} from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import { useState } from "react";
import { TbBookUpload, TbEyeglass2, TbRefreshDot } from "react-icons/tb";
import { UploadFileModal } from "./UploadFileModal";

export const TransactionActions = () => {
  const runSanitization = useRunSanitization();
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const [openUpload, setOpenUpload] = useState(false);

  return (
    <>
      <UploadFileModal opened={openUpload} setOpen={setOpenUpload} />
      <Group className={classes.group}>
        <Button leftIcon={<TbBookUpload />} onClick={() => setOpenUpload(true)}>
          Upload Transaction Record
        </Button>
        <Button
          leftIcon={<TbRefreshDot />}
          onClick={async () =>
            await runSanitization.mutateAsync({ account: "Payment Account" })
          }
        >
          Run CleanUp
        </Button>
      </Group>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100vw",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
}));
