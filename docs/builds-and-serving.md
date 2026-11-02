# Builds and serving

## Development comes first

`npm start` watches source and compiles into `build/`.
`npm run build-development` builds the same variant once.
Neither starts an HTTP server or the backend.

The [development webpack configuration](../webpack.config.js) generates asset
URLs under `https://html.eduid.docker/static/front-build/`. The local eduID
environment must serve the generated files at that location and provide the
backend separately.

## Remote developer instances

Generate development assets first, then run in a second terminal:

```sh
make DEV=<instance> sync_dev_files
```

The target requires Make, `fswatch`, `rsync`, and configured SSH access. It watches
`build/` and synchronizes changes to:

```text
eduid@eduid-developer-<instance>-1.sunet.se:/opt/eduid/src/eduid-front/build/
```

It uses `rsync --delete`, so destination files absent locally are removed.
It only transfers files: it does not compile, start a server, or configure the
remote environment.

## Isolated local build checks

Release compilation is checked in CI and is not required for local unit tests
or browser development. If you need to investigate a release compilation issue
locally, use isolated outputs:

```sh
npm run clean-buildtest
LOCAL_BUILDTEST=1 npm run build-staging
LOCAL_BUILDTEST=1 npm run build-production
```

| Output | Purpose |
|---|---|
| `build/` | Development assets used by local serving and remote sync |
| `build-release/staging/` | Local staging compilation check |
| `build-release/production/` | Local production compilation check |

`clean-buildtest` removes only the two local build-check directories, not
development assets or dependencies. It is not a development-output reset.
The development watcher can remain running during these isolated checks, but
avoid running multiple build checks or their cleanup concurrently.

Use `LOCAL_BUILDTEST=1` inline, not as a persistent shell export. These outputs
are compilation checks, not browser previews: their public URLs still reference
the staging/production environments.

## CI and release behavior

Without the local flag, `npm run build-staging` and `npm run build-production`
both write to `build/`. Do not run these unflagged commands alongside development
or remote sync: they can overwrite or mix development assets.

Clean CI checkouts and releng source exports build staging followed by production
into the shared directory. Both variants are packaged; do not clean between
them. Public URLs, nginx paths, and releng packaging are unchanged by local
build isolation. HTML uses the original compilation-hash query strings for
cache invalidation, which need not be identical across build environments.

GitHub Actions separates unit tests, build checks, lint, and audits. Jenkins
installs, tests, builds, and archives `build/*`. Releng builds committed Git-free
exports and records revision metadata separately. Image promotion does not
recompile assets.

## Other developer shortcuts

Run `npm run` to list scripts. The [Makefile](../Makefile) provides:

| Target | Behavior |
|---|---|
| `make test` / `make just_test` | Unit tests only (`npm test`) |
| `make prettier` | Format with the locked Prettier version |
| `make translation` | Extract translation messages |
| `make DEV=<instance> sync_dev_files` | Watch and synchronize development assets |

Install dependencies with `npm ci` before using these targets.
Unit tests consume source through Jest, not compiled assets.
