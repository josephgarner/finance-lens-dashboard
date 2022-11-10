import { useAuth0 } from "@auth0/auth0-react";
import { AppShell } from "@mantine/core";
import { retreiveAPIToken } from "auth/retreiveAPIToken";
import { CoreNavbar } from "components";
import { Paths } from "enums";
import { Accounts, SanitizeTransactions, Transactions } from "pages";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

export const AppRoot = () => {
  const { isAuthenticated } = useAuth0();
  const { fetchToken } = retreiveAPIToken();

  useEffect(() => {
    fetchToken();
  }, [isAuthenticated]);

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
