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
        "no-undef": "off",
        "react/jsx-no-undef": "off", 
        "no-case-declarations": "off",
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
        "no-empty": "off"
    },
};