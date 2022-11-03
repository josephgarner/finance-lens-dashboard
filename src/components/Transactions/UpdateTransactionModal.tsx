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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { QueryKey, TransactionType } from "enums";
import { Sanitization, Transaction } from "types";
import { displayCurrency } from "utils/displayCurrency";
import { displayDate } from "utils/displayDate";
import { FaInfoCircle } from "react-icons/fa";
import { useAddSanitizing, useUpdateTransaction } from "api";
import { useQueryClient } from "react-query";

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
  const updateTransaction = useUpdateTransaction();
  const addSanitizing = useAddSanitizing();
  const queryClient = useQueryClient();

  const handleSubmit = async (transaction: Transaction) => {
    await updateTransaction.mutateAsync(transaction);
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllTransactions],
    });
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListUnsanitizedTransactions],
    });
    setOpen(false);
  };

  const handleSanitize = async (sanitized: Sanitization) => {
    await addSanitizing.mutateAsync(sanitized);
  };

  const form = useForm({
    initialValues: {
      sanitizedDescription: transaction.sanitizedDescription || "",
      type: transaction.type,
      category: transaction.category || "",
      vendor: transaction.vendor || "",
      useSanitize: false,
      keyword: "",
    },

    validate: {
      sanitizedDescription: (value: string) =>
        /^[a-zA-Z0-9\s]*$/.test(value) ? null : "Invalid Description",
      category: (value: string) =>
        /^[a-zA-Z0-9\s]*$/.test(value) ? null : "Invalid Category",
      vendor: (value: string) =>
        /^[a-zA-Z0-9\s]*$/.test(value) ? null : "Invalid Vendor",
      keyword: (value: string) =>
        /^[a-zA-Z0-9\s]*$/.test(value) ? null : "Invalid KeyWord",
    },
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpen(false)}
      title="Edit transaction"
      size={"lg"}
    >
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
            label="Use these details to sanitize all other transactions"
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
                  This section is used for the automated sanitization of
                  transactions. The details above will be applied to all
                  transactions that match the given key work you provide bellow.
                </Text>
                <Text>
                  We suggest taking the unique keyword/s from the description
                  otherwise we can not garuentee effective sanitization.
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
          <Button type={"submit"}>Update Transaction</Button>
        </Group>
      </form>
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
