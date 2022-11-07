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
import { Sanitization } from "types";
import { useDeleteSanitizing, useUpdateSanitization } from "api";
import { useQueryClient } from "react-query";
import { useState } from "react";

type Props = {
  opened: boolean;
  setOpen: (openState: boolean) => void;
  sanitization: Sanitization;
};

export const UpdateSanitizationModal = ({
  opened = false,
  setOpen,
  sanitization,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const updateSanitization = useUpdateSanitization();
  const deleteSanitization = useDeleteSanitizing();
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      keyword: sanitization.rawDescription || "",
      sanitizedDescription: sanitization.sanitizedDescription || "",
      type: sanitization.type,
      category: sanitization.category || "",
      vendor: sanitization.vendor || "",
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
    },
  });

  const handleSubmit = async (sanitization: Sanitization) => {
    setLoading(true);
    await updateSanitization.mutateAsync(sanitization);
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllSanitizing],
    });
    form.reset();
    setOpen(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    console.log(sanitization.id);
    await deleteSanitization.mutateAsync({ id: sanitization.id! });
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllSanitizing],
    });
    form.reset();
    setOpen(false);
    setLoading(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpen(false), form.reset();
      }}
      title="Edit matching transaction"
      size="lg"
      radius="lg"
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values) => {
            const record = {
              ...sanitization,
              sanitizedDescription: values.sanitizedDescription,
              type: values.type,
              category: values.category,
              vendor: values.vendor,
            };
            handleSubmit(record);
          })}
        >
          <Group className={classes.group}>
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
                >
                  {TransactionType.INCOME}
                </Chip>
                <Chip
                  value={TransactionType.EXPENSE}
                  color="red"
                  variant="filled"
                  size="md"
                >
                  {TransactionType.EXPENSE}
                </Chip>
                <Chip
                  value={TransactionType.TRANSFER}
                  color="yellow"
                  variant="filled"
                  size="md"
                >
                  {TransactionType.TRANSFER}
                </Chip>
              </Chip.Group>
            </Group>
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
            <Textarea
              className={classes.input}
              label="Keyword/s"
              placeholder="Purchase"
              radius="lg"
              withAsterisk
              required
              {...form.getInputProps("keyword")}
            />
            <Textarea
              className={classes.input}
              label="New Description"
              placeholder="Holiday Fish and Chips"
              radius="lg"
              withAsterisk
              required
              {...form.getInputProps("sanitizedDescription")}
            />
            <Group>
              <Button radius="lg" color="red" onClick={() => handleDelete()}>
                Delete
              </Button>
              <Button radius="lg" type={"submit"}>
                Update Matching Transaction
              </Button>
            </Group>
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
