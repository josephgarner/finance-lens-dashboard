import { ActionIcon, createStyles, Group, Paper } from "@mantine/core";
import { useListAllAccounts } from "api";
import { LoadingError } from "components/core";
import { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { AccountRow } from "./AccountRow";
import { CreateAccountModal } from "./CreateAccountModal";

export const AccountList = () => {
  const { classes } = useStyles();
  const [openCreate, setOpenCreate] = useState(false);
  const { isSuccess, isError, data } = useListAllAccounts();

  if ((!isSuccess && !isError) || isError) {
    return <LoadingError success={isSuccess} error={isError} />;
  }

  return (
    <>
      <CreateAccountModal opened={openCreate} setOpen={setOpenCreate} />
      <Group className={classes.group}>
        {data.accounts.map((account, index) => (
          <AccountRow key={index} account={account} />
        ))}
        <ActionIcon
          className={classes.action}
          size="xl"
          radius="lg"
          variant="light"
          onClick={() => setOpenCreate(true)}
        >
          <TbPlus size={28} />
        </ActionIcon>
      </Group>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  group: {
    width: "100%",
  },
  action: {
    width: "100%",
  },
}));
