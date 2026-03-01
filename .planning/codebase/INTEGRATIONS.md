# External Integrations

**Analysis Date:** 2026-03-01

Overview

- This repository is a tooling / config monorepo. Integrations are primarily CI/CD, workspace caching (Nx Cloud), and package publishing. There are no runtime external service integrations (databases, auth providers) inside the code in `packages/*` — the repo integrates with external services as part of CI and package distribution.

1) CI/CD
- GitHub Actions workflows live at `/.github/workflows/`:
  - `/.github/workflows/node.js-ci.yml` — main CI pipeline. Steps:
    - `actions/checkout@v6` to fetch code
    - `actions/setup-node@v6` sets Node.js to `24` (see `node-version: '24'`).
    - `pnpm/action-setup@v4.2.0` installs pnpm (set `run_install: false` here; CI calls `pnpm install`).
    - Initializes Nx Cloud via `npx nx-cloud start-ci-run` (line in `node.js-ci.yml`) and shuts down with `npx nx fix-ci`.
  - `/.github/workflows/npm-publish.yml` — publishes packages on tag pushes, uses OIDC-authenticated `actions/setup-node` and runs `npx lerna publish from-package`.

2) Nx Cloud (distributed caching & CI helpers)
- Nx Cloud is configured as the tasks runner in `nx.json` (`tasksRunnerOptions.default.runner` = `nx-cloud`).
- CI workflows set `NX_CLOUD_DISTRIBUTED_EXECUTION: true` and pass `NX_CLOUD_ACCESS_TOKEN` from GitHub Secrets (see `/.github/workflows/node.js-ci.yml` env and `/.github/workflows/npm-publish.yml`).
- Files: `nx.json` (runner and cacheable operations), `/.github/workflows/node.js-ci.yml` and `/.github/workflows/npm-publish.yml` (initialization and environment variables).
- Credentials: `NX_CLOUD_ACCESS_TOKEN` stored in GitHub Secrets. DO NOT include token values in repo files.

3) Package Registry / Publishing
- Lerna + npm registry
  - Root `package.json` has Lerna devDependency (`lerna@^9.0.4`) and release scripts (`version:alpha`, `publish:alpha`).
  - `/.github/workflows/npm-publish.yml` uses OIDC via `actions/setup-node` and runs `npx lerna publish from-package` to publish packages to npm. The job uses `registry-url: https://registry.npmjs.org`.
  - Credentials: CI uses GitHub OIDC + repository permissions (no long-lived npm token in repo). The workflow environment does not expose secrets in source.

4) Caching & Artifact storage
- pnpm store caching configured in GitHub Actions workflows using `pnpm store path` and `actions/cache@v5` keyed on `**/pnpm-lock.yaml` (see `/.github/workflows/node.js-ci.yml` and `/.github/workflows/npm-publish.yml`).

5) Code Quality Integrations
- ESLint and Prettier are packaged as local packages exported from `packages/eslint-config` and `packages/prettier-config`.
  - Usage: packages reference `@tsparticles/eslint-config` and `@tsparticles/prettier-config` in their `package.json` `prettier`/`dependencies` fields (see `packages/webpack-config/package.json`, `packages/eslint-config/package.json`).
  - CI lint steps: per-package lint commands are invoked inside `packages/*/package.json` `build` and `build:ci` scripts (see `packages/webpack-config/package.json` and `packages/eslint-config/package.json`).

6) External Libraries (dev-time integrations)
- `dependency-cruiser` is a peer dependency for `packages/depcruise-config` (see `packages/depcruise-config/package.json`). This is a dev-time tool for analyzing dependency graphs.
- `@swc/core` used as a build-speed integration for transpilation in `packages/webpack-config`.

7) Observability / Error tracking
- Not detected — there are no Sentry, Datadog, or similar integrations in this repository's codebase or CI workflows.

8) Environment variables & secrets used by integrations (where configured)
- `NX_CLOUD_ACCESS_TOKEN` — used by CI workflows and referenced in `/.github/workflows/node.js-ci.yml` and `/.github/workflows/npm-publish.yml`. Value stored in GitHub Secrets.
- `GITHUB_REF`, `GITHUB_EVENT`, etc. — standard GitHub Actions runtime environment variables are used in `/.github/workflows/npm-publish.yml` to derive the tag for publishing.
- No other named env vars for third-party APIs were found in repository files.

9) Webhooks & Callbacks
- None configured inside this repository. Publishing and CI rely on GitHub Actions triggers (`on: push`, `on: pull_request`, `on: tags`). See `/.github/workflows/node.js-ci.yml` and `/.github/workflows/npm-publish.yml` for triggers.

10) How integrations are wired (short guide)
- CI: `/.github/workflows/node.js-ci.yml` -> checks out code, sets up Node (24), installs pnpm, runs `pnpm install`, runs `npx nx affected -t build:ci`, and calls `npx nx fix-ci` at the end.
- Nx Cloud: configured in `nx.json`, requires secret `NX_CLOUD_ACCESS_TOKEN` in GitHub Secrets to enable distributed execution — workflows export `NX_CLOUD_DISTRIBUTED_EXECUTION: true`.
- Publish: `/.github/workflows/npm-publish.yml` triggers on tags and runs `npx lerna publish from-package` with OIDC auth provided by `actions/setup-node` configuration.

11) Recommended checks for contributors
- Verify `NX_CLOUD_ACCESS_TOKEN` is present in CI secrets before relying on Nx Cloud features; absence will fall back to local runner defined in `nx.json` `tasksRunnerOptions.local`.
- When adding new packages that require publishing, add package-level `prepack`/`build` scripts to ensure `npx lerna publish from-package` picks up the built `dist` directory (examples: `packages/webpack-config/package.json` defines `prepack: "pnpm run build"`).

---

*Integration audit: 2026-03-01*
