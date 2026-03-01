# Technology Stack

**Analysis Date:** 2026-03-01

Overview

- This repository is a small monorepo / utilities workspace for the tsParticles project. It is TypeScript-first and built with Nx and Lerna orchestration, using pnpm as the workspace package manager. Key package-level code lives under `packages/*` and each package exposes build/lint/test scripts in its `package.json`.

1) Languages
- Primary: TypeScript 5.9.3 - used across `packages/*` (see `packages/tsconfig/package.json` and `pnpm-lock.yaml` references to `typescript@5.9.3`). Files: `packages/webpack-config/src/**/*.ts`, `packages/eslint-config/src/eslint.config.ts`, `packages/depcruise-config/src/index.ts`.

2) Runtime & Package Manager
- Node.js - CI uses Node 24 (see `.github/workflows/node.js-ci.yml` step `actions/setup-node@v6` with `node-version: '24'`).
- Package manager: pnpm (root `package.json` declares `"packageManager": "pnpm@10.30.2"`). Lockfile: `pnpm-lock.yaml` (present at repository root).

3) Monorepo & Orchestration
- Nx ^22.5.2 - workspace configured in `nx.json` (see `nx.json` for `tasksRunnerOptions` and `targetDefaults`). Entry: root `package.json` scripts call `nx run-many`.
- Lerna ^9.0.4 - used for release/publish scripts in root `package.json` (see `package.json` root keys `version:alpha`, `publish:alpha`).

4) Frameworks, Build & Bundlers
- Webpack ^5.105.2 used inside `packages/webpack-config` (see `packages/webpack-config/package.json` dependencies). Relevant implementation: `packages/webpack-config/src/webpack-tsparticles.ts`.
- swc (`@swc/core`) and `swc-loader` used as fast transforms in `packages/webpack-config` (`packages/webpack-config/package.json`).
- tsup ^8.5.1 used in `packages/depcruise-config` as the compile tool (see `packages/depcruise-config/package.json` `compile` script).

5) Linting & Formatting
- ESLint (9.x) and a packaged config at `packages/eslint-config` (config file: `packages/eslint-config/src/eslint.config.ts`). See `packages/eslint-config/package.json` for lint scripts (`pnpm run lint`).
- Prettier configured through `@tsparticles/prettier-config` in `packages/prettier-config` (see `packages/prettier-config/package.json`).

6) Key dependencies (examples and locations)
- `typescript@5.9.3` — declared in root devDependencies and per-package `package.json` files (`package.json`, `packages/tsconfig/package.json`, `pnpm-lock.yaml`).
- `nx@^22.5.2` — root `package.json` devDependencies and `nx.json` config.
- `lerna@^9.0.4` — root `package.json` devDependencies and used by release/publish workflows (`.github/workflows/npm-publish.yml`).
- `webpack@^5.105.2` — `packages/webpack-config/package.json` dependencies.
- `@swc/core@^1.15.13` — `packages/webpack-config/package.json` dependencies and in `pnpm-lock.yaml`.
- `tsup@^8.5.1` — `packages/depcruise-config/package.json` devDependencies (build tool).

7) Configuration files and important paths
- Root workspace manifest: `package.json` (root) — contains workspace `workspaces: ["packages/*"]` and scripts: `build`, `build:ci`.
- Lockfile: `pnpm-lock.yaml` at repository root.
- Nx config: `nx.json` (workspace task defaults and nx-cloud runner). File: `nx.json`.
- Per-package manifests: `packages/*/package.json` (see `packages/eslint-config/package.json`, `packages/webpack-config/package.json`, `packages/tsconfig/package.json`).
- ESLint flat config: `packages/eslint-config/src/eslint.config.ts`.
- TypeScript config package sources: `packages/tsconfig/src/tsconfig.json` (package exports a reusable tsconfig set).

8) CI and release automation
- GitHub Actions workflows: `/.github/workflows/node.js-ci.yml` (CI build using Nx & pnpm) and `/.github/workflows/npm-publish.yml` (publishing packages on tag push). Both workflows initialize Nx Cloud and rely on `secrets.NX_CLOUD_ACCESS_TOKEN` (see `node.js-ci.yml` and `npm-publish.yml`).

9) Developer Tooling & Common Commands
- Install dependencies (developer):
  - pnpm install
  - (alternatively) npx pnpm install

- Build (workspace):
  - pnpm run build         # runs `nx run-many -t build` via root `package.json`
  - npx nx run-many -t build:ci
  - npx nx affected -t build:ci   # used in CI (`.github/workflows/node.js-ci.yml` step `Build packages` runs `npx nx affected -t build:ci`)

- Lint & Format (examples):
  - pnpm --filter @tsparticles/eslint-config run lint    # package-level lint
  - pnpm --filter @tsparticles/webpack-plugin run lint  # run lint for the webpack-config package

- Publish (release flow - automated in CI):
  - Lerna publishing is invoked in `.github/workflows/npm-publish.yml` using `npx lerna publish from-package` with OIDC / tag logic.

10) Example config snippets
- Root `package.json` (scripts excerpt):

```json
{
  "scripts": {
    "build": "nx run-many -t build",
    "build:ci": "nx run-many -t build:ci",
    "version:alpha": "lerna version prerelease --preid alpha --conventional-commits"
  }
}
```

- `nx.json` (runner & caching excerpt):

```json
{
  "tasksRunnerOptions": {
    "default": { "runner": "nx-cloud", "options": { "cacheableOperations": ["build","test","lint"] } }
  }
}
```

11) Notes / Observations
- No application servers or databases are present in this repository — it provides build/config packages for the main tsParticles project.
- Package-level build scripts vary: some packages use `tsc` (`packages/webpack-config`), others use `tsup` or copy tasks (`cpx2`). See `packages/*/package.json` for each package's build commands.

---

*Stack analysis: 2026-03-01*
