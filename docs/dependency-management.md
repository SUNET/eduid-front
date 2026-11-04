# Dependency management and toolchain

For everyday commands, start with the [developer README](../README.md).
See [local development](local-development.md) for serving and local build checks,
or [CI and releases](ci-and-releases.md) for automated checks and release builds.

## Configuration and installation

Follow the [README's Node/npm setup](../README.md#1-check-node-and-npm), then
run `npm ci` for routine installation. For automated environments' Node version
selection, see [CI and releases](ci-and-releases.md#node-version-selection).

[.npmrc](../.npmrc) shares the following policy:

- `ignore-scripts=true`: disables installation lifecycle scripts and implicit
  pre/post hooks. Explicit commands such as `npm test` still run.
- `engine-strict=true`: rejects incompatible declared engines.
- `audit=true`: enables automatic vulnerability feedback during installation.
- `fund=false`: suppresses funding messages.

Review any dependency's need for installation scripts instead of bypassing this
policy locally. Build environments need development dependencies too: they
contain the compiler and other build tools.

## Add, update, or remove dependencies

Use these commands only for intentional dependency changes:

| Action | Command |
|---|---|
| Add a runtime dependency | `npm install <package>` |
| Add a development dependency | `npm install --save-dev <package>` |
| Update within the declared range | `npm update <package>` |
| Select a specific version | `npm install <package>@<version>` (add `--save-dev` for development dependencies) |
| Remove a dependency | `npm uninstall <package>` |

Dependency maintenance may change transitive packages as well as the requested
package. Review changes to `package.json` and `package-lock.json`, use `npm ci`
to verify installation, and run the [tests and linters](../README.md#tests) and
[local build checks](local-development.md#isolated-local-build-checks) before
committing. Review installation audit warnings as described below.

Commit the manifest and lockfile together when both change. A reviewed
lockfile-only update within existing manifest ranges is also valid.

## Lockfile lifecycle

| Operation | Effect on `package-lock.json` |
|---|---|
| Clone, pull, switch branches | Receives the version recorded by Git |
| `npm ci` | Reads it without rewriting it |
| `npm install`, `npm update`, `npm uninstall` | May intentionally update it |
| Tests, builds, formatting, cleanup | Must not change it |
| Commit a reviewed dependency update | Shares the new graph with developers and builders |

For what the lockfile records and why it matters, see
[reproducible builds](reproducible-builds.md).

## Restore installed dependencies

Stop active watchers, then run:

```sh
npm ci
```

This replaces `node_modules` using the existing lockfile; it does not undo edits
to dependency files. Also run it after pulling or switching branches when those
files change. **Do not delete the lockfile to fix an installation error.**
Check Node/npm compatibility and resolve manifest/lockfile conflicts instead.

## Troubleshooting

- **Unsupported engine:** compare `node --version` and `npm --version` with the
  project configuration. Select the supported toolchain, not weaker checks.
- **Missing or inconsistent lockfile:** inspect
  `git diff -- package.json package-lock.json`. Resolve merge conflicts or restore
  unintended edits through Git after reviewing them. For intentional changes,
  use the appropriate dependency-maintenance command and commit the result.
- **Stale or modified installed dependencies:** follow
  [restore installed dependencies](#restore-installed-dependencies).
- **Registry/download failure:** fix network or registry access and retry.
  Deleting the lockfile or upgrading dependencies is not a network fix.

## Vulnerability feedback

Review reports during installation. To check for newly disclosed advisories:

```sh
npm audit
```

Source edits and test runs do not trigger fresh audits. Installation feedback is
not a vulnerability gate; CI has separate audit jobs with severity policies.
Do not blindly run `npm audit fix --force`: it can introduce breaking changes.
An audit report alone does not rewrite dependency files.

See [CI and releases](ci-and-releases.md) for automated audit jobs and release
installation behavior.
