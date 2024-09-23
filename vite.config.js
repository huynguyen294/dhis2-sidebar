/* eslint-disable no-undef */
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        "script-runner-sandbox": path.resolve(__dirname, "script-runner-sandbox.html"),
      },
    },
  },
  server: { port: 3000 },
});
