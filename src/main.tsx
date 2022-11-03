import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoot } from "./AppRoot";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{ colorScheme: "light" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <AppRoot />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
