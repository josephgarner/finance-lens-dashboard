import {
  createStyles,
  Group,
  Modal,
  Text,
  Title,
  Button,
  Alert,
  useMantineTheme,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Bank, Paths } from "enums";
import { useListAllAccounts } from "api";
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
import { GenericSelect } from "components";
import { useNavigate } from "react-router-dom";

export const UploadFileForm = () => {
  const { classes } = useStyles();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const listAccounts = useListAllAccounts();
  const upload = useUploadTransactionRecord();

  const navigate = useNavigate();

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

  const handleSubmit = async (bank: string, account: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("transactionRecord", file!, file!.name);
    formData.append("bank", bank);
    formData.append("account", account);

    try {
      await upload.mutateAsync(formData);

      await delay(() => {}, 3000);

      navigate(Paths.Transactions);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <form
        className={classes.form}
        onSubmit={form.onSubmit(async (values) => {
          await handleSubmit(values.bank, values.account);
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
              data-testid="transactions-upload-dropzone"
              onDrop={(files) => setFile(files[0])}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={7 * 1024 ** 2}
              accept={[MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx]}
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
          <GenericSelect
            className={classes.input}
            data={[Bank.ING]}
            label="Bank Selection"
            description="Select the bank where the transaction record was exported from"
            withAsterisk
            props={form.getInputProps("bank")}
          />
          <Alert icon={<TbInfoCircle size={16} />} color="orange" radius="lg">
            <Text>
              If your designated bank is not selectable from the list above
              please contact support.
            </Text>
          </Alert>
          <GenericSelect
            className={classes.input}
            data={[...listAllAccountNames(accounts)]}
            label="Account Selection"
            description="Select account that this transaction record is related to"
            withAsterisk
            props={form.getInputProps("account")}
          />
          <Button className={classes.button} type={"submit"} disabled={!file}>
            Upload
          </Button>
        </Group>
      </form>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  group: {
    display: "flex",
    // maxWidth: theme.breakpoints.xs,
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
    minHeight: 272,
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    color: theme.colors.green[6],
  },
  button: {
    marginTop: theme.spacing.md,
  },
}));
