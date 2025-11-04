import { defineConfig } from "eslint/config";
import globals from "globals";
import react from "eslint-plugin-react";
import jestDom from "eslint-plugin-jest-dom";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks"

export default defineConfig([
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  tseslint.configs.recommended,
  jestDom.configs["flat/recommended"],
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.amd,
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        __webpack_public_path__: true,
      },

      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
    },

    rules: {
      "react/jsx-no-target-blank": "off",
      "react/display-name": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true
        }
      ],
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
