# Dependencies and toolchain

For everyday commands, start with the [developer README](../README.md).

## Configuration and installation

[.nvmrc](../.nvmrc) selects Node when an installed nvm runs `nvm install` or
`nvm use`. Frontend GitHub Actions also reads it. It does not install nvm,
automatically activate Node, or control the devcontainer image or releng's
independently selected Node image. A major-only value follows that release line;
it does not pin a patch version. Node/npm must satisfy
[package.json](../package.json) engine requirements.

[.npmrc](../.npmrc) shares the following policy:

- `ignore-scripts=true`: disables installation lifecycle scripts and implicit
  pre/post hooks. Explicit commands such as `npm test` still run.
- `engine-strict=true`: rejects incompatible declared engines.
- `audit=true`: enables automatic vulnerability feedback during installation.
- `fund=false`: suppresses funding messages.

Review any dependency's need for installation scripts instead of bypassing this
policy locally. CI and releng need development dependencies too: they contain
the compiler and other build tools.

## Lockfile lifecycle

| Operation | Effect on `package-lock.json` |
|---|---|
| Clone, pull, switch branches | Receives the version recorded by Git |
| `npm ci` | Reads it without rewriting it |
| `npm install`, `npm update`, `npm uninstall` | May intentionally update it |
| Tests, builds, formatting, cleanup | Must not change it |
| Commit a reviewed dependency update | Shares the new graph with developers and builders |

Dependency maintenance may change transitive packages as well as the requested
package. Review the diff, use `npm ci` to verify installation, and run tests,
lint checks, and local build checks before committing. Commit the manifest and
lockfile together when both change. Lockfile-only changes can update versions
within existing manifest ranges.

## Troubleshooting

- **Unsupported engine:** compare `node --version` and `npm --version` with the
  project configuration. Select the supported toolchain, not weaker checks.
- **Missing or inconsistent lockfile:** inspect
  `git diff -- package.json package-lock.json`. Resolve merge conflicts or restore
  unintended edits through Git after reviewing them. For intentional changes,
  use the appropriate dependency-maintenance command and commit the result.
- **Stale or modified installed dependencies:** stop watchers and run `npm ci`.
  It removes the previous `node_modules` automatically, but does not restore
  edited dependency files from Git.
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

Releng explicitly uses `--no-audit` during release installation; vulnerability
checks remain separate from image assembly.

## Reproducibility limits

Commit the manifest, lockfile, Node selection, npm policy, and relevant source
and build configuration. Builders must consume the reviewed inputs rather than
resolve dependency upgrades during a release.

Locked installation does not freeze the complete toolchain or OS. Mutable image
tags, Node version ranges, and webpack compilation hashes can change outputs.
CI checks compilation but does not compare repeated-build artifacts.
Promotion reuses the tested image rather than reinstalling or recompiling.
