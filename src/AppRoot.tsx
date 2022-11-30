import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { AppShell } from "@mantine/core";
import { RequiresAuth } from "auth";
import { retreiveAPIToken } from "auth/retreiveAPIToken";
import { CoreNavbar } from "components";
import { Paths } from "enums";
import {
  Accounts,
  Home,
  SanitizeTransactions,
  Transactions,
  UpdateTransaction,
  UploadRecord,
} from "pages";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useIsHomePage } from "utils/useIsHomePage";

export const AppRoot = () => {
  const { isAuthenticated } = useAuth0();
  const { fetchToken } = retreiveAPIToken();
  const isHome = useIsHomePage();

  useEffect(() => {
    fetchToken();
  }, [isAuthenticated]);

  return (
    <AppShell
      padding="md"
      navbar={isHome && !isAuthenticated ? <></> : <CoreNavbar />}
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
        <Route
          path={Paths.Home}
          element={
            isAuthenticated ? (
              <RequiresAuth component={Transactions} />
            ) : (
              <Home />
            )
          }
        />

        <Route
          path={Paths.Transactions}
          element={<RequiresAuth component={Transactions} />}
        />
        <Route
          path={Paths.UploadRecord}
          element={<RequiresAuth component={UploadRecord} />}
        />
        <Route
          path={Paths.UpdateTransaction}
          element={<RequiresAuth component={UpdateTransaction} />}
        />
        <Route
          path={Paths.SanitizeTransactions}
          element={<RequiresAuth component={SanitizeTransactions} />}
        />
        <Route
          path={Paths.Accounts}
          element={<RequiresAuth component={Accounts} />}
        />
      </Routes>
    </AppShell>
  );
};
