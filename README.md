# eduid-front

Frontend for eduID.

## Requirements

- Git and the Node.js version specified in [.nvmrc](.nvmrc), with npm satisfying
  the [package.json engines](package.json).
- For local Node installation, we recommend [nvm](https://github.com/nvm-sh/nvm).
  Alternatively, use another version manager or a compatible direct Node installation.
- Make only if you use the Make shortcuts.

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

If both match, continue to **2. Install dependencies and start development**.
Otherwise, follow the installation options below first.

#### If Node or npm is missing or incompatible

Choose one method; Node distributions include npm.

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

**Node version manager (nvm):**

nvm installs Node versions for your user and lets you switch between them without
replacing the system installation. It reads `.nvmrc` to select this project's
version, which is useful when working on projects with different Node requirements.

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

CI checks staging and production compilation separately from unit tests.
See [builds and serving](docs/builds-and-serving.md) for optional local build checks.
Run `npm run` to discover other scripts, including formatting and translations.

## Add, update, or remove dependencies

Use these commands only for intentional dependency changes:

| Action | Command |
|---|---|
| Add a runtime dependency | `npm install <package>` |
| Add a development dependency | `npm install --save-dev <package>` |
| Update within the declared range | `npm update <package>` |
| Select a specific version | `npm install <package>@<version>` (add `--save-dev` for development dependencies) |
| Remove a dependency | `npm uninstall <package>` |

Review changes to `package.json` and `package-lock.json`, then run `npm ci`,
the tests/lint checks above. CI checks release compilation. Commit both dependency files
when both change; a reviewed lockfile-only update is also valid.
Review installation audit warnings and run `npm audit` for a fresh vulnerability check.

## Restore dependencies when something goes wrong

Stop active watchers, then run:

```sh
npm ci # Replace node_modules with dependencies from the lockfile
```

This replaces `node_modules` using the existing lockfile; it does not undo edits
to dependency files. Also run it after pulling or switching branches when those
files change. **Do not delete the lockfile to fix an installation error.**
Check Node/npm compatibility and resolve manifest/lockfile conflicts instead.
See [dependency troubleshooting](docs/dependencies.md).

## Reproducible builds: committed inputs

We now use **locked dependency installation** as the foundation for reproducible
builds. Routine development, CI, and releng install with `npm ci`, not `npm install`.

Keep these files committed:

| File | Purpose |
|---|---|
| [package.json](package.json) | Dependencies, allowed ranges, scripts, and engine requirements |
| [package-lock.json](package-lock.json) | Exact dependency graph and package integrity hashes |
| [.nvmrc](.nvmrc) | Node selection for nvm and frontend CI |
| [.npmrc](.npmrc) | Shared installation policy, including engine checks and audit feedback |

Commit relevant configuration changes alongside the source/dependency changes
that require them. `npm ci` does not rewrite the manifest or lockfile and fails
if they are inconsistent. These files improve repeatability, but do not alone
guarantee byte-identical artifacts: toolchain versions, platform, and build
configuration also matter. See [dependency and toolchain details](docs/dependencies.md).

## Development serving and remote sync

The local eduID static-serving environment serves the development assets in
`build/`. For a remote developer instance, run this alongside `npm start`:

```sh
# Replace <instance> with your developer instance name
make DEV=<instance> sync_dev_files # Watch and sync development assets to that instance
```

This requires `fswatch`, `rsync`, and SSH access to the instance. It transfers
files, including destination deletions; it does not compile or start services.
Unflagged release commands also write to `build/`; avoid them while developing
or synchronizing. See [serving paths and build isolation](docs/builds-and-serving.md).
