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
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
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
  },
  globals: {
    // global variables from init-config and public-path, to prevent having "no-undef" errors
    EDUID_COOKIE_NAME: true,
    LOGIN_CONFIG_URL: true,
    PASSWORD_SERVICE_URL: true,
    AVAILABLE_LANGUAGES: true,
    LOCALIZED_MESSAGES: true,
    GROUP_MGMT_URL: true,
    ACTIONS_SERVICE_URL: true,
    __webpack_public_path__: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
