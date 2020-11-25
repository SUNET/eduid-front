module.exports = {
    "env": {
        "amd": true,
        "browser": true,
        "es2021": true,
        "mocha": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
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
        "no-duplicate-case":"error",
        "no-empty":"error",
        "no-extra-semi":"error",
        "no-func-assign": "error",
        "no-irregular-whitespace":"error",
        "no-unreachable": "error",
        "curly": "error",
        "eqeqeq": "error",
        "no-multi-spaces": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-trailing-spaces": "error",
        "default-case": "error",
        "no-fallthrough": "error",
        "no-use-before-define": "error",
        "no-redeclare": "error",
        "brace-style": "error",
        "prefer-const": "error",
        "no-var": "error",
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": ["error", { "args": "all" }],
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};