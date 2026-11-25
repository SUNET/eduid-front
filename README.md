# eduid-front

Frontend for eduID.

## Quickstart

### 1. Check Node and npm

```sh
node --version # Show the active Node version, if installed
npm --version  # Show the active npm version, if installed
cat .nvmrc     # Show the project's selected Node version or release line
```

Compare Node with `.nvmrc` and npm with the engines in
[package.json](package.json). A major-only `.nvmrc` value accepts that release
line.

**Node version scope:** [.nvmrc](.nvmrc) defines the Node version for local
development and frontend CI. Actual staging and production builds use the Node
version configured separately in
[`versions/build-toolchain.mk` in SUNET/eduid-releng](https://github.com/SUNET/eduid-releng/blob/master/versions/build-toolchain.mk),
not this repository's `.nvmrc`.

If both match, continue to **2. Install dependencies and start development**.
Otherwise, follow the installation options below first.

#### If Node or npm is missing or incompatible

Node distributions include npm. Try the installation instructions below;
if installing the required version is difficult, use the optional nvm fallback.

**Node and npm installation:** read `.nvmrc`, then choose
a matching release from [official Node.js downloads](https://nodejs.org/en/download).
If `.nvmrc` specifies only a major, choose a current patch in that release line
that also satisfies the project engines.

- **macOS:** download and run the matching `.pkg` installer, then open a new
  terminal. Select the required version, not simply the site's default release.
- **Linux:** install Node.js and npm using your distribution's package manager,
  selecting a version matching `.nvmrc`. If that version is unavailable, use a
  Node version manager such as nvm: it installs Node versions separately from
  the system packages and lets you select the version required by each project.
  See the nvm instructions below.

**Optional fallback: Node version manager (nvm)**

nvm installs Node versions for your user and lets you switch between them without
replacing the system installation. It reads `.nvmrc` to select this project's
version. Use it if you have trouble installing the required Node version directly.

- **macOS:** install nvm with Homebrew:

  ```sh
  brew install nvm # Install nvm using Homebrew
  mkdir -p "$HOME/.nvm" # Create nvm's working directory
  ```

  Follow Homebrew's instructions to enable nvm in your shell.

- **Linux:** install nvm using your distribution's package manager if available,
  then follow the package's shell setup instructions.

Once nvm is installed and enabled on either platform, open a new terminal,
return to the project directory, and run:

```sh
nvm install # Install Node matching .nvmrc
nvm use     # Activate that version in this shell
```

Run `nvm use` in each new project terminal unless automatic switching is configured.

For either installation method, repeat `node --version` and `npm --version`
from step 1 before continuing.

### 2. Install dependencies and start development

From the project directory, with the correct Node/npm active:

```sh
npm ci    # Install the exact locked dependencies
npm start # Watch source and compile development assets
```

`npm start` watches source changes and generates development assets in `build/`.
It does **not** start a web server: browser use requires the eduID backend and
static-serving environment. Stop the watcher with Ctrl+C.

## Tests

After installing dependencies:

```sh
npm test          # Run unit tests against source code
npm run lint      # Check JavaScript and TypeScript
npm run stylelint # Check application CSS
```

Unit tests do not need compiled assets or a running application.
`make test` and `make just_test` are shortcuts for `npm test`.

Run `npm run` to discover other scripts, including formatting and translations.

## Dependency management

Use `npm ci` for routine installation and restoring installed dependencies.
Do not delete the lockfile to fix an installation error.

For intentional dependency changes, audit feedback, and installation problems,
see [dependency management](docs/dependency-management.md).

## Further documentation

- [Project file reference](docs/project-files.md): a short explanation of each
  file in the project's main directory.
- [Local development](docs/local-development.md): serving assets, remote sync,
  and optional local build checks.
- [CI and releases](docs/ci-and-releases.md): automated checks, toolchain selection,
  release builds, and promotion.
- [Release contract](docs/release-contract.md): source selection, frontend build
  outputs, and the interface with releng.
- [Reproducible builds](docs/reproducible-builds.md): why the lockfile matters,
  how locked installation helps, and what it does not guarantee.
