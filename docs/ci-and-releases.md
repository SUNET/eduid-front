# CI and releases

This guide covers automated frontend checks and actual staging and production
builds. For running the frontend, serving assets, and optional build checks on
your machine, see [local development](local-development.md).
For the implemented interface between the frontend and releng, see the
[release contract](release-contract.md).

## Node version selection

- **Frontend GitHub Actions:** reads [.nvmrc](../.nvmrc) through
  `actions/setup-node`, using the latest matching version.
- **Jenkins:** uses the Node version supplied by the
  `docker.sunet.se/sunet/docker-jenkins-node-job` image, not `.nvmrc`.
- **Actual staging and production builds:** use the Node version configured in
  [`versions/build-toolchain.mk` in SUNET/eduid-releng](https://github.com/SUNET/eduid-releng/blob/master/versions/build-toolchain.mk),
  not this repository's `.nvmrc`.

Node/npm must satisfy the [package.json engines](../package.json).
See [dependency management](dependency-management.md) for installation policy
and [reproducible builds](reproducible-builds.md) for reproducibility limits.

## GitHub Actions

The [frontend workflow](../.github/workflows/run-tests.yaml) runs on pushes and
pull requests. Its jobs run independently:

| Job | Commands | Purpose |
|---|---|---|
| Unit tests | `npm ci`, `npm test -- --ci` | Test source without compiled assets or a running application |
| Build checks | `npm ci`, `npm run build-staging`, `npm run build-production` | Check both release variants compile |
| Linters | `npm ci`, `npm run lint`, `npm run stylelint` | Check application code and CSS |
| Production audit | `npm audit --package-lock-only --omit=dev --audit-level=moderate` | Fail on moderate-or-higher production dependency advisories |
| Full dependency audit | `npm audit --package-lock-only --audit-level=moderate \|\| true` | Report advisories including development dependencies without failing the job |

Build checks use a clean checkout and generate staging followed by production
in the shared `build/` directory. They check compilation; they do not deploy the
application.

## Jenkins

The [Jenkins configuration](../.jenkins.yaml) uses a clean workspace and:

1. Prints the Node/npm versions and branch.
2. Installs locked dependencies with `npm ci`.
3. Runs `npm test -- --ci`.
4. Runs `npm run build-staging`, then `npm run build-production`.
5. Checks that `package.json` and `package-lock.json` have not changed.
6. Archives `build/*`.

It also configures a weekly trigger.

## Release builds and promotion

Releng builds committed Git-free source exports and records revision metadata
separately. It installs locked dependencies with `npm ci`, explicitly using
`--no-audit`; vulnerability checks remain separate from image assembly.

Without `LOCAL_BUILDTEST=1`, staging and production builds both write to `build/`.
Release builds generate staging followed by production into this shared
directory. Both variants are packaged; do not clean between them.

Public URLs, nginx paths, and releng packaging are unchanged by the optional
local build isolation described in [local development](local-development.md).
HTML uses compilation-hash query strings for cache invalidation, which need not
be identical across build environments.

Image promotion reuses the tested image; it does not reinstall dependencies or
recompile assets.
