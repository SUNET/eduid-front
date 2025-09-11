import { defineConfig } from "eslint/config";
import globals from "globals";
import react from "eslint-plugin-react";
import jestDom from "eslint-plugin-jest-dom";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  tseslint.configs.recommended,
  jestDom.configs["flat/recommended"],
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
      "no-useless-escape": "off",
      "react/jsx-key": "off",
      "react/jsx-no-duplicate-props": "off",
      "react/no-deprecated": "off",
      "react/jsx-no-target-blank": "off",
      "react/prop-types": "off",
      "react/no-string-refs": "off",
      "no-class-assign": "off",
      "no-prototype-builtins": "off",
      "react/display-name": "off",
      "no-empty": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-this-alias": "off",
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
