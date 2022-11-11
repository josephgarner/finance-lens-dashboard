import {
  Chip,
  createStyles,
  Group,
  Modal,
  Textarea,
  TextInput,
  Text,
  Button,
  LoadingOverlay,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { QueryKey, TransactionType } from "enums";
import { Sanitization } from "types";
import { useDeleteSanitizing, useUpdateSanitization } from "api";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";

type Props = {
  opened: boolean;
  setOpen: (openState: boolean) => void;
  sanitization: Sanitization;
};

type Keyword = {
  value: string;
  label: string;
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
  const [keywords, setKeyWords] = useState<Keyword[]>([]);

  const initialFormValues = {
    keyword: sanitization.keywords || [""],
    sanitizedDescription: sanitization.sanitizedDescription || "",
    type: sanitization.type,
    category: sanitization.category || "",
    vendor: sanitization.vendor || "",
  };

  const form = useForm({
    initialValues: initialFormValues,

    validate: {
      sanitizedDescription: (value: string) => {
        if (value == "") {
          return "Please enter a description";
        }
        if (!/^[a-zA-Z0-9-\s]*$/.test(value)) {
          return "This field can only contain letters, - and numbers";
        }
      },
      category: (value: string) => {
        if (value == "") {
          return "Please enter a catergory";
        }
        if (!/^[a-zA-Z0-9-\s]*$/.test(value)) {
          return "This field can only contain letters, - and numbers";
        }
      },
      vendor: (value: string) => {
        if (value == "") {
          return "Please enter a vender";
        }
        if (!/^[a-zA-Z0-9-\s]*$/.test(value)) {
          return "This field can only contain letters, - and numbers";
        }
      },
      keyword: (value: string[]) => {
        if (value.length === 0) {
          return "Please enter at least one keyword";
        }
      },
    },
  });

  useEffect(() => {
    form.setValues(initialFormValues);
    setKeyWords(
      sanitization.keywords.map((word) => {
        return { value: word, label: word };
      })
    );
  }, [sanitization]);

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
        setOpen(false), form.reset(), setLoading(false);
      }}
      closeOnClickOutside={false}
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
              keywords: values.keyword,
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
            <MultiSelect
              className={classes.input}
              label="Keyword match"
              data={keywords}
              description="These values will be used to match the default description of the transaction"
              placeholder="purchase"
              searchable
              creatable
              getCreateLabel={(query) => `+ Add ${query} keyword/s`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setKeyWords((current) => [...current, item]);
                return item;
              }}
              radius="lg"
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
              <Button
                radius="lg"
                variant="light"
                onClick={() => handleDelete()}
              >
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
