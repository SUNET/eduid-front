module.exports = {
    "env": {
        "amd": true,
        "browser": true,
        "es2021": true,
        "mocha": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    },
    "globals": { // global variables from init-config, to prevent having an error "no-undef" 
        "EDUID_COOKIE_NAME": true,
        "TOKEN_SERVICE_URL": true,
        "EDUID_CONFIG_URL": true,
        "SIGNUP_CONFIG_URL": true,
        "LOGIN_CONFIG_URL": true,
        "PASSWORD_SERVICE_URL": true,
        "AVAILABLE_LANGUAGES": true,
        "LOCALIZED_MESSAGES": true,
        "SIGNUP_SERVICE_URL": true,
        "BASE_PATH": true,
        "GROUP_MGMT_URL": true,
        "ACTIONS_SERVICE_URL": true,
        "__webpack_public_path__": true
      }
};