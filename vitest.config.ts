import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";
import { formatjsPlugin } from "./vite.config";

// Vitest config - extends the base Vite config
export default defineConfig({
  plugins: [
    formatjsPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      // Same aliases as Vite config
      setupTests: path.resolve(__dirname, "./src/setupTests.ts"),
      tests: path.resolve(__dirname, "./src/tests"),
      apis: path.resolve(__dirname, "./src/apis"),
      components: path.resolve(__dirname, "./src/components"),
      slices: path.resolve(__dirname, "./src/slices"),
      translation: path.resolve(__dirname, "./src/translation"),
      globals: path.resolve(__dirname, "./src/globals"),
      helperFunctions: path.resolve(__dirname, "./src/helperFunctions"),
      "eduid-hooks": path.resolve(__dirname, "./src/eduid-hooks"),
      "eduid-init-app": path.resolve(__dirname, "./src/eduid-init-app"),
      "eduid-store": path.resolve(__dirname, "./src/eduid-store"),
      commonConfig: path.resolve(__dirname, "./src/commonConfig"),
    },
  },
  test: {
    globals: true, // Use global test APIs (describe, it, expect, etc.)
    environment: "jsdom", // Simulate browser environment
    setupFiles: "./src/setupTests.ts", // Setup file (MSW, jest-dom)
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    include: [
      "src/**/*-test.{js,jsx,ts,tsx}", // Match Jest's *-test.tsx pattern
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}", // Also support .test.tsx pattern
    ],
  },
});
