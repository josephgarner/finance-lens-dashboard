import {
  ActionIcon,
  Affix,
  createStyles,
  Group,
  Loader,
  Tooltip,
} from "@mantine/core";
import { useRunSanitization } from "api/hooks/useRunSanitization";
import { Link } from "components";
import { useFinance } from "context";
import { Paths, QueryKey } from "enums";
import { useState } from "react";
import { TbBookUpload, TbEdit, TbRefreshDot } from "react-icons/tb";
import { useQueryClient } from "react-query";

/**
 * To use framer-motion the elements will need to be wrapped in motion.
 * See example below
 * https://github.com/mantinedev/mantine/discussions/1169
 */

export const TransactionActionCenter = () => {
  const { classes } = useStyles();
  const runSanitization = useRunSanitization();

  const queryClient = useQueryClient();
  const { selectedAccount, selectedTransaction } = useFinance();

  const [matchLoading, setMatchLoading] = useState(false);

  const [openUpload, setOpenUpload] = useState(false);
  //UpdateTransaction
  return (
    <Affix className={classes.affix}>
      <Group className={classes.group} spacing={"lg"}>
        <Group className={classes.subGroup}>
          <Tooltip label="Upload Record">
            <ActionIcon<typeof Link>
              component={Link}
              to={Paths.UploadRecord}
              size={"lg"}
              data-testid="upload-transaction-button"
            >
              <TbBookUpload size={42} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Edit">
            <ActionIcon<typeof Link>
              component={Link}
              to={Paths.UpdateTransaction}
              size={"xl"}
              disabled={!selectedTransaction}
              data-testid="edit-transaction-button"
            >
              <TbEdit size={42} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Run Auto Matching">
            <ActionIcon
              size={"lg"}
              disabled={!selectedAccount}
              onClick={async () => {
                setMatchLoading(true);
                await runSanitization.mutateAsync({
                  account: selectedAccount!,
                });
                await queryClient.refetchQueries({
                  queryKey: [
                    `${QueryKey.ListAllTransactions}-${selectedAccount}`,
                  ],
                });
                await queryClient.refetchQueries({
                  queryKey: [
                    `${QueryKey.ListUnsanitizedTransactions}-${selectedAccount}`,
                  ],
                });
                setMatchLoading(false);
              }}
            >
              {matchLoading ? (
                <Loader variant="dots" size="xs" color="white" />
              ) : (
                <TbRefreshDot size={42} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Affix>
  );
};

const useStyles = createStyles((theme) => ({
  affix: {
    paddingLeft: "250px",
    left: "50%",
    transform: "translate(-50%, 0)",
  },
  group: {
    justifyContent: "center",
  },
  subGroup: {
    justifyContent: "center",
    padding: theme.spacing.sm,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    backgroundColor: theme.white,
    borderRadius: `${theme.spacing.xl}px ${theme.spacing.xl}px 0px 0px`,
    border: `1px solid ${theme.colors.gray[3]}`,
    borderBottom: 0,
  },
}));
