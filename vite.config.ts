import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    envDir: "./",
    server: {
      port: 3000,
      watch: {
        usePolling: true,
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
    },
  });
};
