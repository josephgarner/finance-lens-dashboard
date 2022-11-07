import { Button, createStyles, Group, Loader } from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import { QueryKey } from "enums";
import { useState } from "react";
import { TbBookUpload, TbRefreshDot } from "react-icons/tb";
import { useQueryClient } from "react-query";
import { UploadFileModal } from "./UploadFileModal";

export const TransactionActions = () => {
  const runSanitization = useRunSanitization();
  const { classes } = useStyles();
  const queryClient = useQueryClient();

  const [matchLoading, setMatchLoading] = useState(false);

  const [openUpload, setOpenUpload] = useState(false);

  return (
    <>
      <UploadFileModal opened={openUpload} setOpen={setOpenUpload} />
      <Group className={classes.group}>
        <Button
          leftIcon={<TbBookUpload />}
          radius="lg"
          onClick={() => setOpenUpload(true)}
        >
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
          radius="lg"
          onClick={async () => {
            setMatchLoading(true);
            await runSanitization.mutateAsync({ account: "Payment Account" });
            await queryClient.refetchQueries({
              queryKey: [QueryKey.ListAllTransactions],
            });
            await queryClient.refetchQueries({
              queryKey: [QueryKey.ListUnsanitizedTransactions],
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
    width: "100vw",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
}));
