import { Button, createStyles, Group, Loader } from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import { useFinance } from "context";
import { QueryKey } from "enums";
import { useState } from "react";
import { TbBookUpload, TbRefreshDot } from "react-icons/tb";
import { useQueryClient } from "react-query";
import { UploadFileModal } from "./UploadFileModal";

export const TransactionActions = () => {
  const runSanitization = useRunSanitization();
  const { classes } = useStyles();
  const queryClient = useQueryClient();
  const { selectedAccount } = useFinance();

  const [matchLoading, setMatchLoading] = useState(false);

  const [openUpload, setOpenUpload] = useState(false);

  return (
    <>
      <UploadFileModal opened={openUpload} setOpen={setOpenUpload} />
      <Group className={classes.group}>
        <Button leftIcon={<TbBookUpload />} onClick={() => setOpenUpload(true)}>
          Upload Transaction Record
        </Button>
        <Button
          leftIcon={
            matchLoading ? (
              <Loader variant="dots" size="xs" color="white" />
            ) : (
              <TbRefreshDot />
            )
          }
          disabled={!selectedAccount}
          onClick={async () => {
            setMatchLoading(true);
            await runSanitization.mutateAsync({ account: selectedAccount! });
            await queryClient.refetchQueries({
              queryKey: [`${QueryKey.ListAllTransactions}-${selectedAccount}`],
            });
            await queryClient.refetchQueries({
              queryKey: [
                `${QueryKey.ListUnsanitizedTransactions}-${selectedAccount}`,
              ],
            });
            setMatchLoading(false);
          }}
        >
          Match Transactions
        </Button>
      </Group>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100%",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
}));
