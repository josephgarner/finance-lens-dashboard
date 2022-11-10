import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "./AppRoot";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { FinanceContextProvider } from "context";
import { theme } from "theme";
import { AuthProvider } from "auth/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <FinanceContextProvider>
            <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
              <NotificationsProvider>
                <AppRoot />
              </NotificationsProvider>
            </MantineProvider>
          </FinanceContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
