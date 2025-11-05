import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { formatjsPlugin, renameHtmlPlugin } from "./vite.config";
import baseConfig from "./vite.config";

// https://vitejs.dev/config/
// Staging: development mode with source maps and gzip compression
export default defineConfig({
  ...baseConfig,
  plugins: [
    formatjsPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    renameHtmlPlugin("index.staging.html"),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  build: {
    ...baseConfig.build,
    rollupOptions: {
      ...baseConfig.build!.rollupOptions,
      output: {
        ...baseConfig.build!.rollupOptions!.output,
        entryFileNames: "[name].staging.js",
        chunkFileNames: "[name]-[hash].staging.js",
      },
    },
  },
  mode: "development",
});
