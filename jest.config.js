/** @type {import('jest').Config} */
const config = {
  verbose: true,
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "<rootDir>/src/tests/__mocks__/styleMock.js"
  },
  testEnvironment: "jest-fixed-jsdom",
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testMatch: [
    "/__tests__/**/*-test.[jt]s?(x)",
    "**/?(*)+(test).[jt]s?(x)"
  ],
  modulePaths: [
    "<rootDir>/src/"
  ],
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest",
      {
        "isolatedModules": true,
        "astTransformers": {
          "before": [
            {
              "path": "@formatjs/ts-transformer/ts-jest-integration",
              "options": {
                "overrideIdFn": "[sha512:contenthash:base64:6]",
                "ast": true
              }
            }
          ]
        }
      }
    ]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!spin.js|intl-messageformat|@formatjs/icu-messageformat-parser).+\\.js$"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  roots : [
    "<rootDir>/src"
  ]
}

export default config;