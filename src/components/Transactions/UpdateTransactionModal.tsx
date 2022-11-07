import {
  Chip,
  createStyles,
  Group,
  Modal,
  Textarea,
  TextInput,
  Text,
  Title,
  Button,
  Collapse,
  Checkbox,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { QueryKey, TransactionType } from "enums";
import { Sanitization, Transaction } from "types";
import { displayCurrency } from "utils/displayCurrency";
import { displayDate } from "utils/displayDate";
import { FaInfoCircle } from "react-icons/fa";
import { useAddSanitizing, useUpdateTransaction } from "api";
import { useQueryClient } from "react-query";
import { useState } from "react";

type Props = {
  opened: boolean;
  setOpen: (openState: boolean) => void;
  transaction: Transaction;
};

export const UpdateTransactionModal = ({
  opened = false,
  setOpen,
  transaction,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const updateTransaction = useUpdateTransaction();
  const addSanitizing = useAddSanitizing();
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      sanitizedDescription: transaction.sanitizedDescription || "",
      type: transaction.type,
      category: transaction.category || "",
      vendor: transaction.vendor || "",
      useSanitize: false,
      keyword: transaction.rawDescription,
    },

    validate: {
      sanitizedDescription: (value: string) =>
        /^[a-zA-Z0-9-\s]*$/.test(value)
          ? null
          : "This field can only contain letters, - and numbers",
      category: (value: string) =>
        /^[a-zA-Z0-9-\s]*$/.test(value)
          ? null
          : "This field can only contain letters, - and numbers",
      vendor: (value: string) =>
        /^[a-zA-Z0-9-\s]*$/.test(value)
          ? null
          : "This field can only contain letters, - and numbers",
      keyword: (value: string) =>
        /^[a-zA-Z0-9-\s]*$/.test(value)
          ? null
          : "This field can only contain letters, - and numbers",
    },
  });

  const handleSubmit = async (transaction: Transaction) => {
    setLoading(true);
    await updateTransaction.mutateAsync(transaction);
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllTransactions],
    });
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListUnsanitizedTransactions],
    });
    setOpen(false);
    form.reset();
    setLoading(false);
  };

  const handleSanitize = async (sanitized: Sanitization) => {
    await addSanitizing.mutateAsync(sanitized);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpen(false), form.reset();
      }}
      title="Edit transaction"
      size="lg"
      radius="lg"
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values) => {
            const record = {
              ...transaction,
              sanitizedDescription: values.sanitizedDescription,
              type: values.type,
              category: values.category,
              vendor: values.vendor,
            };
            if (values.useSanitize) {
              const sanitize = {
                rawDescription: values.keyword,
                sanitizedDescription: values.sanitizedDescription,
                type: values.type,
                category: values.category,
                vendor: values.vendor,
              };
              handleSanitize(sanitize);
            }
            handleSubmit(record);
          })}
        >
          <Group className={classes.group}>
            <Group className={classes.group}>
              <Title order={3}>{displayDate(transaction.date)}</Title>
              <Title>
                {displayCurrency(
                  transaction.debit ? transaction.debit : transaction.credit
                )}
              </Title>
              <Text align={"center"}>{transaction.rawDescription}</Text>
            </Group>
            <Group className={classes.group} position={"left"} spacing={"xs"}>
              <Text className={classes.typeLabel}>Transaction Type</Text>
              <Chip.Group
                className={classes.chipGroup}
                position="left"
                {...form.getInputProps("type")}
              >
                <Chip
                  value={TransactionType.INCOME}
                  color="green"
                  variant="filled"
                  size="md"
                  disabled={transaction.credit ? false : true}
                >
                  {TransactionType.INCOME}
                </Chip>
                <Chip
                  value={TransactionType.EXPENSE}
                  color="red"
                  variant="filled"
                  size="md"
                  disabled={transaction.credit ? true : false}
                >
                  {TransactionType.EXPENSE}
                </Chip>
                <Chip
                  value={TransactionType.TRANSFER}
                  color="yellow"
                  variant="filled"
                  size="md"
                  disabled={transaction.credit ? true : false}
                >
                  {TransactionType.TRANSFER}
                </Chip>
              </Chip.Group>
            </Group>
            <Textarea
              className={classes.input}
              label="New Description"
              placeholder="Holiday Fish and Chips"
              radius="lg"
              withAsterisk
              required
              {...form.getInputProps("sanitizedDescription")}
            />
            <TextInput
              className={classes.input}
              label="Category"
              description="The category to which this transaction falls under"
              placeholder="Eating out"
              radius="lg"
              withAsterisk
              required
              {...form.getInputProps("category")}
            />
            <TextInput
              className={classes.input}
              label="vendor"
              description="The vendor where the transaction occured"
              placeholder="Blue Bird Cafe"
              radius="lg"
              withAsterisk
              required
              {...form.getInputProps("vendor")}
            />
            <Checkbox
              className={classes.input}
              label="Use these details to match similar future transactions"
              {...form.getInputProps("useSanitize")}
            />
            <Collapse
              className={classes.collapse}
              in={form.getInputProps("useSanitize").value}
            >
              <Group spacing={"lg"}>
                <Alert
                  icon={<FaInfoCircle size={16} />}
                  color="indigo"
                  radius="lg"
                >
                  <Text>
                    This section is used for the automated matching of
                    transactions. The details above will be applied to similar
                    transactions in the future that match the given key work you
                    provide bellow.
                  </Text>
                  <Text>
                    We suggest taking the unique keyword/s from the description
                    to ensure the success of the automated matching process
                  </Text>
                </Alert>
                <TextInput
                  className={classes.input}
                  label="Keyword match"
                  description="This value will be used to match the default description of the transaction"
                  placeholder="Purchase"
                  radius="lg"
                  {...form.getInputProps("keyword")}
                />
              </Group>
            </Collapse>
            <Button radius="lg" type={"submit"}>
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
}));
