import { transform as formatjsTransform } from "@formatjs/ts-transformer";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import ts from "typescript";
import { defineConfig, Plugin } from "vite";

// Custom Vite plugin to apply formatjs transformer to TypeScript files
function formatjsPlugin(): Plugin {
  return {
    name: "vite-plugin-formatjs",
    enforce: "pre", // Run before other plugins
    transform(code, id) {
      // Only transform .ts and .tsx files, skip node_modules
      if (!/\.(ts|tsx)$/.test(id) || id.includes("node_modules")) {
        return null;
      }

      // Use TypeScript compiler with formatjs transformer
      const result = ts.transpileModule(code, {
        fileName: id,
        compilerOptions: {
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          jsx: ts.JsxEmit.Preserve,
          sourceMap: true,
        },
        transformers: {
          before: [
            formatjsTransform({
              overrideIdFn: "[sha512:contenthash:base64:6]",
            }),
          ],
        },
      });

      return {
        code: result.outputText,
        map: result.sourceMapText ? JSON.parse(result.sourceMapText) : null,
      };
    },
  };
}

// Plugin to rename the output HTML file
function renameHtmlPlugin(newName: string): Plugin {
  return {
    name: "rename-html",
    closeBundle() {
      const buildDir = path.resolve(__dirname, "build");
      const oldPath = path.join(buildDir, "index.html");
      const newPath = path.join(buildDir, newName);
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    formatjsPlugin(), // Apply formatjs transformer FIRST
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    renameHtmlPlugin("index.dev.html"),
  ],
  base: "/static/front-build/",
  build: {
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name]-bundle.dev.js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      // Match webpack's module resolution from src
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
  css: {
    preprocessorOptions: {
      scss: {
        // Add any global SCSS variables if needed
      },
    },
  },
  server: {
    port: 9000,
  },
});
