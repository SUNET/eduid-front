# Reproducible builds

## What does reproducible mean?

A fully reproducible build produces byte-for-byte identical artifacts when
repeated with the same source, inputs, and build environment.

This project uses **locked dependency installation** as a foundation for that
goal. It makes dependency selection repeatable, but does not by itself guarantee
identical compiled assets. Our CI checks tests and compilation; it does not
currently compare artifacts from repeated builds.

## Why do we need it?

The frontend depends on libraries and build tools, which themselves depend on
other packages. Those indirect dependencies are called **transitive dependencies**.
Their versions can change even when nobody changes the application source.

Controlling these inputs helps us:

- Reproduce a colleague's or CI's results when investigating a failure.
- Avoid unexpected dependency upgrades during a staging or production build.
- Review dependency changes explicitly instead of discovering them at release time.
- Rebuild an older revision with its recorded dependency versions.
- Know which dependency versions were selected when investigating an advisory.

Rebuilding an older revision still requires a compatible toolchain and access
to its dependency packages. The lockfile is not a backup of those packages.

## `package.json` versus `package-lock.json`

[package.json](../package.json) declares the dependencies the application needs
and the versions it allows. For example, a hypothetical `"example": "^1.2.3"`
normally permits compatible releases from `1.2.3` up to, but not including, `2.0.0`.
Resolving that range at different times could select different versions.

[package-lock.json](../package-lock.json) records the resolved dependency graph:

- Exact versions of direct and transitive dependencies.
- Where packages are obtained, such as registry tarball URLs.
- Integrity hashes for registry packages, used to verify downloaded content.
- Dependency relationships and package metadata needed to install the graph.

For example, the manifest might allow `^1.2.3`, while the lockfile records
`1.2.5` and the exact versions of that package's dependencies. A newly published
`1.2.6` is not automatically selected by `npm ci`.

Integrity checks help detect downloaded content that differs from the recorded
package. They do not prove a package is safe or free of vulnerabilities.

**Commit the lockfile.** It shares the reviewed dependency graph between local
development, CI, and release builds.

## How `npm ci` helps

For routine installation, run:

```sh
npm ci
```

Unlike dependency-maintenance commands, `npm ci`:

- Requires an existing lockfile.
- Installs the locked dependency graph rather than selecting newer versions
  within the manifest's ranges.
- Fails if the manifest and lockfile are inconsistent.
- Replaces an existing `node_modules` directory.
- Does not rewrite `package.json` or `package-lock.json`.

See [dependency management](dependency-management.md) for installation policy,
intentional dependency updates, and troubleshooting.

## What the lockfile does not control

Repeatable dependencies are only one part of a reproducible build. Outputs can
also depend on:

- Node/npm and compiler versions.
- Operating system, architecture, and platform-specific optional dependencies.
- Container image contents, especially when image tags are mutable.
- Build configuration, environment variables, and generated metadata.

A major-only Node selection does not pin a patch version.
See the [README](../README.md#1-check-node-and-npm) for local setup and
[CI and releases](ci-and-releases.md#node-version-selection) for automated
environments' toolchain selection.

Keep these inputs committed alongside the source:

| File | Purpose |
|---|---|
| [package.json](../package.json) | Dependencies, allowed ranges, scripts, and engine requirements |
| [package-lock.json](../package-lock.json) | Resolved dependency graph and package integrity hashes |
| [.nvmrc](../.nvmrc) | Node selection for nvm and frontend GitHub Actions |
| [.npmrc](../.npmrc) | Shared installation policy |

Commit relevant build configuration changes with the changes that require them.
For byte-identical artifacts, the remaining environment inputs would also need
to be controlled and repeated outputs compared. Do not treat a successful
`npm ci` or CI build as proof of that stronger guarantee.
