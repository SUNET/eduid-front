import { transform } from "@formatjs/ts-transformer";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import ts from "typescript";
import { defineConfig, Plugin } from "vite";
import viteCompression from "vite-plugin-compression";

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
            transform({
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    formatjsPlugin(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    renameHtmlPlugin("index.html"), // Production keeps index.html
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  base: "/static/front-build/",
  build: {
    outDir: "build",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
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
      scss: {},
    },
  },
  mode: "production",
});
