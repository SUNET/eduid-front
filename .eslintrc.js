module.exports = {
  env: {
    amd: true,
    browser: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest-dom/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest-dom"],
  root: true,
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
  },
  globals: {
    // global variables from init-config and public-path, to prevent having "no-undef" errors
    __webpack_public_path__: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
