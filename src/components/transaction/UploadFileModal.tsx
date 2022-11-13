import {
  createStyles,
  Group,
  Modal,
  Text,
  Title,
  Button,
  Alert,
  NativeSelect,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Bank, QueryKey, TransactionType } from "enums";
import { useListAllAccounts } from "api";
import { useQueryClient } from "react-query";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  TbFileCheck,
  TbFileDescription,
  TbFileOff,
  TbFileUpload,
  TbInfoCircle,
} from "react-icons/tb";
import { useMemo, useState } from "react";
import { listAllAccountNames } from "utils/listAllAccountNames";
import { useUploadTransactionRecord } from "api/hooks/useUploadTransactionRecord";
import { delay } from "underscore";

type Props = {
  opened: boolean;
  setOpen: (openState: boolean) => void;
};

export const UploadFileModal = ({ opened = false, setOpen }: Props) => {
  const { classes } = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const listAccounts = useListAllAccounts();
  const upload = useUploadTransactionRecord();
  const queryClient = useQueryClient();

  const accounts = useMemo(
    () => (listAccounts.isSuccess ? listAccounts.data.accounts : []),
    [listAccounts.isSuccess, listAccounts.data?.accounts]
  );

  const form = useForm({
    initialValues: {
      bank: "",
      account: "",
    },
    validate: {
      bank: (value: string) => (value ? null : "Please select a bank"),
      account: (value: string) => (value ? null : "Please select an account"),
    },
  });

  const handleSubmit = (bank: string, account: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("transactionRecord", file!, file!.name);
    formData.append("bank", bank);
    formData.append("account", account);

    // upload.mutateAsync(formData);
    delay(() => {}, 1000);
    queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllTransactions],
    });
    queryClient.refetchQueries({
      queryKey: [QueryKey.ListUnsanitizedTransactions],
    });
    setOpen(false);
    form.reset();
    setFile(null);
    setLoading(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpen(false);
        form.reset();
        setFile(null);
      }}
      title="Upload Transaction Record"
      size={"lg"}
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values) => {
            handleSubmit(values.bank, values.account);
          })}
        >
          <Group className={classes.group}>
            <Group className={classes.group}></Group>
            {file ? (
              <Group className={classes.fileGroup}>
                <Group>
                  <TbFileCheck size={42} className={classes.icon} />
                  <Title order={4}>{file.name}</Title>
                </Group>
                <Button onClick={() => setFile(null)}>Remove</Button>
              </Group>
            ) : (
              <Dropzone
                onDrop={(files) => setFile(files[0])}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={7 * 1024 ** 2}
                accept={[MIME_TYPES.csv]}
              >
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: 220, pointerEvents: "none" }}
                >
                  <Dropzone.Accept>
                    <TbFileUpload
                      size={50}
                      color={
                        theme.colors[theme.primaryColor][
                          theme.colorScheme === "dark" ? 4 : 6
                        ]
                      }
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <TbFileOff
                      size={50}
                      color={
                        theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                      }
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <TbFileDescription size={50} />
                  </Dropzone.Idle>
                  <div>
                    <Text size="lg" inline>
                      Drag CSV file here or click to select file
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Attach one file per upload, the file should not exceed 7mb
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            )}
            <NativeSelect
              className={classes.input}
              data={["", Bank.ING]}
              placeholder="ING"
              label="Bank Selection"
              description="Select the bank where the transaction record was exported from"
              radius="lg"
              withAsterisk
              disabled={!listAccounts.isSuccess}
              {...form.getInputProps("bank")}
            />
            <Alert icon={<TbInfoCircle size={16} />} color="orange" radius="lg">
              <Text>
                If your designated bank is not selectable from the list above
                please contact support.
              </Text>
            </Alert>
            <NativeSelect
              className={classes.input}
              data={["", ...listAllAccountNames(accounts)]}
              placeholder="Savings Account"
              label="Account Selection"
              description="Select account that this transaction record is related to"
              radius="lg"
              withAsterisk
              {...form.getInputProps("account")}
            />
            <Button type={"submit"} disabled={!file}>
              Update Transaction
            </Button>
          </Group>
        </form>
      </div>
    </Modal>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  chipGroup: {
    width: "100%",
  },
  typeLabel: {
    width: "100%",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },
  input: {
    width: "100%",
  },
  collapse: {
    width: "100%",
  },
  fileGroup: {
    flexDirection: "column",
  },
  icon: {
    color: theme.colors.green[6],
  },
}));
