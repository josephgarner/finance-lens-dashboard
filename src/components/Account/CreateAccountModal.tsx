import {
  Chip,
  createStyles,
  Group,
  Modal,
  TextInput,
  Text,
  Button,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { AccountType, Bank, QueryKey } from "enums";
import { Account } from "types";
import { useCreateAccount } from "api";
import { useQueryClient } from "react-query";
import { useState } from "react";

type Props = {
  opened: boolean;
  setOpen: (openState: boolean) => void;
  account?: Account;
};

export const CreateAccountModal = ({
  opened = false,
  setOpen,
  account,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const createAccount = useCreateAccount();
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      accountName: account?.accountName || "",
      accountType: account?.accountType || "",
      bank: account?.bank || "",
    },

    validate: {
      accountName: (value: string) => {
        if (value == "") {
          return "Please enter an Account Name";
        }
        if (!/^[a-zA-Z0-9-\s]*$/.test(value)) {
          return "This field can only contain letters, - and numbers";
        }
        return null;
      },
      accountType: (value: string) =>
        value === "" ? "Please select an account type" : null,
      bank: (value: string) => (value === "" ? "Please select a Bank" : null),
    },
  });

  const handleSubmit = async (account: Account) => {
    setLoading(true);

    await createAccount.mutateAsync(account);
    await queryClient.refetchQueries({
      queryKey: [QueryKey.ListAllAccounts],
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
      title={account ? "Edit Account" : "Create Account"}
      size="lg"
      radius="lg"
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} overlayBlur={2} />
        <form
          onSubmit={form.onSubmit((values) => {
            const record = {
              ...account,
              accountName: values.accountName,
              accountType: values.accountType,
              bank: values.bank as Bank,
            };
            handleSubmit(record);
          })}
        >
          <Group className={classes.group}>
            <Group className={classes.group} position={"left"} spacing={"xs"}>
              <TextInput
                className={classes.input}
                label="Account Name"
                placeholder="Spending Account"
                radius="lg"
                withAsterisk
                {...form.getInputProps("accountName")}
              />
              <Select
                className={classes.input}
                label="Bank"
                placeholder="Select Bank"
                radius="lg"
                withAsterisk
                data={Object.values(Bank)}
                {...form.getInputProps("bank")}
              />
              <Group className={classes.typeSelection}>
                <Text className={classes.typeLabel}>Account Type</Text>
                <Chip.Group
                  className={classes.chipGroup}
                  position="left"
                  {...form.getInputProps("accountType")}
                >
                  <Chip
                    value={AccountType.SPENDING}
                    variant="filled"
                    color={"gray"}
                    size="md"
                  >
                    {AccountType.SPENDING}
                  </Chip>
                  <Chip
                    value={AccountType.SAVINGS}
                    variant="filled"
                    color={"gray"}
                    size="md"
                  >
                    {AccountType.SAVINGS}
                  </Chip>
                  <Chip
                    value={AccountType.TERMDEPOSIT}
                    variant="filled"
                    size="md"
                    color={"gray"}
                  >
                    {AccountType.TERMDEPOSIT}
                  </Chip>
                </Chip.Group>
                <Text className={classes.typeError}>
                  {form.errors.accountType}
                </Text>
              </Group>
            </Group>

            <Group>
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
  typeSelection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  chipGroup: {
    width: "100%",
  },
  typeLabel: {
    width: "100%",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
  },
  typeError: {
    color: theme.colors.red[6],
    fontSize: theme.fontSizes.xs,
  },
  input: {
    width: "100%",
  },
  collapse: {
    width: "100%",
  },
}));
