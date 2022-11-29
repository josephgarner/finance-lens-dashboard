import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: process.env.E2E_DEPLOYMENT_URL ?? "http://localhost:3000",
    viewportHeight: 1080,
    viewportWidth: 1920,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {},
  },
});
