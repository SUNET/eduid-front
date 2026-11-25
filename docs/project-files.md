# Project file reference

This reference briefly describes the files in the project's main directory, including
hidden configuration files. Directories are outside its scope.

## Getting started and project information

| File | Role |
|---|---|
| [README.md](../README.md) | Starting point for developer setup, everyday commands, and links to detailed guides. |
| [DESIGN.md](../DESIGN.md) | Reference for the application's visual design system and UI patterns. |
| [LICENSE](../LICENSE) | License terms for using and redistributing the project. |
| [publiccode.yml](../publiccode.yml) | Machine-readable software catalogue metadata, including the product description, maintenance, and supported languages. |
| [favicon.ico](../favicon.ico) | Browser icon asset. |

## Dependencies and toolchain

| File | Role |
|---|---|
| [package.json](../package.json) | Declares dependencies, npm commands, package metadata, and supported Node/npm engines. |
| [package-lock.json](../package-lock.json) | Records the resolved dependency graph and package integrity data used by `npm ci`. |
| [.npmrc](../.npmrc) | Shared npm installation policy: engine enforcement, disabled installation scripts, audit feedback, and suppressed funding messages. |
| [.nvmrc](../.nvmrc) | Node version selection for nvm and frontend GitHub Actions; it does not select releng's release toolchain. |

See [dependency management](dependency-management.md) for operational guidance
and [reproducible builds](reproducible-builds.md) for the lockfile's purpose.

## Compilation and assets

| File | Role |
|---|---|
| [webpack.config.js](../webpack.config.js) | Development bundling configuration and shared entry, module-resolution, and loader settings reused by release configurations. |
| [webpack.prod.config.js](../webpack.prod.config.js) | Production bundling configuration, including production asset URLs, HTML generation, compression, and output paths. |
| [webpack.staging.config.js](../webpack.staging.config.js) | Derives the staging variant from production settings, with staging filenames, asset URLs, and output paths. |
| [tsconfig.json](../tsconfig.json) | TypeScript compiler settings, including strict checks, JSX handling, module resolution, and source inclusion. |
| [babel.config.js](../babel.config.js) | JavaScript, React, and TypeScript transformations; includes a test-only adjustment for `import.meta`. |
| [postcss.config.js](../postcss.config.js) | CSS processing plugins for imports, custom media queries, and vendor prefixes. |

See [local development](local-development.md) for serving and build outputs.

## Tests, linting, and formatting

| File | Role |
|---|---|
| [jest.config.js](../jest.config.js) | Test discovery, DOM environment, source transformations, asset mocks, and test setup. |
| [eslint.config.mjs](../eslint.config.mjs) | JavaScript/TypeScript lint rules, including React, hooks, testing-library DOM assertions, and translation message IDs. |
| [.stylelintrc.json](../.stylelintrc.json) | CSS lint rules and ignored paths. |
| [.prettierignore](../.prettierignore) | Files and directories excluded from Prettier formatting. |
| [audit-ci.json](../audit-ci.json) | Configuration for the `audit-ci` tool; the current frontend GitHub Actions workflow uses `npm audit` instead. |

## Automation and integrations

| File | Role |
|---|---|
| [Makefile](../Makefile) | Shortcuts for tests, formatting, translations, cleanup, isolated build checks, and remote development sync. |
| [.jenkins.yaml](../.jenkins.yaml) | Jenkins installation, testing, release compilation, dependency-file checks, artifact archiving, and weekly trigger configuration. |
| [.gitignore](../.gitignore) | Paths Git normally excludes from untracked-file discovery, such as installed dependencies and generated build output. |
| [transifex.yaml](../transifex.yaml) | Maps extracted English messages and translated language files for Transifex synchronization. |

GitHub Actions configuration lives under `.github/workflows/`, not at the root.
See [CI and releases](ci-and-releases.md) for automation behavior.
