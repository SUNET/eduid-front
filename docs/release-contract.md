# Frontend release-readiness contract

## Scope and ownership

This contract defines what must be checked in `eduid-front` so that `main` is
ready to be included in an eduID release through releng. The normal workflow
does not select a separate frontend release commit or require a frontend release
tag. It is not approval to deploy or a guarantee of byte-identical rebuilds.

When releng updates what to build, it normally takes `origin/main` and records
the resulting frontend submodule revision. Builds then export that recorded
revision, not a moving branch fetched during compilation. Recording the commit
is for traceability: it identifies which state of `main` was included. Later
merges are included only after releng updates its source selection again.

Read it together with the
[frontend releng contract in SUNET/eduid-releng](https://github.com/SUNET/eduid-releng/blob/master/docs/contracts/frontend-releng-contract.md)
(`docs/contracts/frontend-releng-contract.md`). That contract defines the
cross-repository interface and releng's responsibilities.

The frontend owns its source, dependency inputs, npm commands, tests, and output
compatibility. Releng owns installation orchestration, artifact placement,
revision metadata, image assembly, and promotion. Releng does not run frontend
tests as part of its build path or guarantee browser behavior; those checks
cannot be deferred to release assembly.

## 1. Keep `main` release-ready

- [ ] All required source, translation, dependency, and build-configuration
  changes are reviewed and merged into `main`.
- [ ] The exported source includes `package.json`, `package-lock.json`, `.npmrc`,
  and the build configuration. No required input exists only in an ignored file
  or a developer's working tree.
- [ ] Dependency changes have been reviewed according to
  [dependency management](dependency-management.md).
- [ ] Any changed npm script names, output paths, public URLs, or required
  toolchain versions have been coordinated with releng and its contract.

## 2. Verify frontend quality checks

For the state of `main` taken by releng, require successful results from the
[frontend CI checks](ci-and-releases.md#github-actions):

- [ ] Locked dependency installation succeeds.
- [ ] Unit tests pass (`npm test -- --ci`).
- [ ] Code and CSS lint checks pass (`npm run lint`, `npm run stylelint`).
- [ ] Both staging and production compilation checks pass.
- [ ] The production dependency audit passes its configured severity gate.
- [ ] Full dependency audit findings have been reviewed. This CI job is
  advisory: a green result alone does not mean it reported no vulnerabilities.

Use the linked CI guide for the exact audit commands and job behavior. A build
from an older commit, a local development build, or Jenkins alone is not evidence
that all of these checks passed.

## 3. Verify the releng build interface

Frontend CI uses `.nvmrc`; actual release builds use the toolchain selected in
[`versions/build-toolchain.mk` in SUNET/eduid-releng](https://github.com/SUNET/eduid-releng/blob/master/versions/build-toolchain.mk).
Check compatibility with that toolchain, including its bundled npm, rather than
assuming a successful local install proves release compatibility.

Use a separate, clean export of the state of `main` taken by releng, without
`.git` or installed dependencies. Do not use the development watcher directory.
With development dependencies included and `LOCAL_BUILDTEST` unset, verify:

```sh
node --version
npm --version
NPM_CONFIG_ENGINE_STRICT=true npm ci --ignore-scripts --no-audit --no-fund
npm run build-staging
npm run build-production
```

- [ ] Installation and both builds succeed with the releng toolchain, without
  weakening engine checks or requiring installation lifecycle scripts.
- [ ] Builds work without Git metadata. They do not require local caches,
  uncommitted inputs, or developer-only environment settings.
- [ ] Installation and compilation leave the manifest and lockfile unchanged.
- [ ] Staging is built before production into the same `build/` directory,
  without cleaning between them.
- [ ] After both builds, `build/` contains `index.staging.html`,
  `index.staging.js`, `index.html`, `index.js`, and their referenced assets.
- [ ] Public paths and compilation-hash query strings remain compatible with
  releng's copy logic and the runtime serving environment.
- [ ] The frontend does not generate or require `build/revision.txt`; releng
  supplies revision metadata separately.

The isolated outputs described in
[local development](local-development.md#isolated-local-build-checks) are useful
for debugging but do not validate the shared release output layout.

## 4. Check runtime integration

- [ ] In a representative eduID environment, smoke-test the changed routes and
  user flows, including relevant success and error paths.
- [ ] Check that the generated HTML and assets load with the expected backend,
  static-serving paths, and `eduid-html` content.
- [ ] For UI changes, check affected translations, themes, and accessibility
  behavior as applicable.

Compilation and unit tests do not establish application-level routing or
browser correctness. If integration cannot be checked yet, record it as an
outstanding release-readiness check, not as a pass.

## 5. Record release evidence

Record in the eduID release record or releng handoff:

- The frontend revision taken from `main` by releng and links to its CI results,
  for traceability rather than as a separate frontend release selection.
- The releng toolchain selection and actual Node/npm versions used.
- Each additional validation command and its result, including the Git-free
  export build and output-layout checks.
- The environment and results of runtime smoke tests.
- Reviewed advisory findings and any outstanding checks or failures.

`main` is ready to be included in the release only when the required checks above
have passed for the state taken by releng. If releng updates to newer changes on
`main`, the evidence must cover that updated state. Missing checks or failures
must be resolved rather than inferred from a successful image build. Subsequent
image assembly and promotion follow the releng contract; see
[CI and releases](ci-and-releases.md).
