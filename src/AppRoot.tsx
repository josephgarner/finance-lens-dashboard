import { AppShell } from "@mantine/core";
import { CoreNavbar } from "components";
import { Paths } from "enums";
import { Accounts, SanitizeTransactions, Transactions } from "pages";
import { Route, Routes } from "react-router-dom";

export const AppRoot = () => {
  return (
    <AppShell
      padding="md"
      navbar={<CoreNavbar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Routes>
        <Route path={Paths.Transactions} element={<Transactions />} />
        <Route
          path={Paths.SanitizeTransactions}
          element={<SanitizeTransactions />}
        />
        <Route path={Paths.Accounts} element={<Accounts />} />
      </Routes>
    </AppShell>
  );
};
