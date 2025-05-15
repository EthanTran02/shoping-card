import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // Enable global APIs like `describe`, `it`, `expect`
    environment: "jsdom", // Simulate browser DOM for React components
    setupFiles: "./src/tests/setupTests.jsx", // Optional setup file
  },
});
