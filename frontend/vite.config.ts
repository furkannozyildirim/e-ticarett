import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/@mui/") || id.includes("node_modules/@emotion/")) {
            return "mui";
          }
          if (
            id.includes("node_modules/@reduxjs/") ||
            id.includes("node_modules/react-redux/")
          ) {
            return "state";
          }
        },
      },
    },
  },
});
