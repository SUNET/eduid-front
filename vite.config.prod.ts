import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { formatjsPlugin, renameHtmlPlugin } from "./vite.config";
import baseConfig from "./vite.config";

// https://vitejs.dev/config/
// Production: no source maps, gzip compression
export default defineConfig({
  ...baseConfig,
  plugins: [
    formatjsPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    renameHtmlPlugin("index.html"),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  build: {
    ...baseConfig.build,
    sourcemap: false, // No source maps in production
    rollupOptions: {
      ...baseConfig.build!.rollupOptions,
      output: {
        ...baseConfig.build!.rollupOptions!.output,
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
});
