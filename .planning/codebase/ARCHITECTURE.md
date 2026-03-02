# Architecture

**Analysis Date:** 2026-03-01

## Pattern Overview

Overall: Monorepo of developer-focused tooling and configs managed with Nx + pnpm + Lerna.

Key characteristics:
- A package-per-concern layout where each top-level package under `packages/` is an independently versioned npm package (e.g. `packages/webpack-config`, `packages/eslint-config`).
- Build artifacts are produced into `dist/` inside each package and declared in each `package.json` (`main`, `module`, `types`). See `packages/webpack-config/package.json` and `packages/depcruise-config/package.json`.
- Orchestration and caching are handled by Nx (`nx.json`) and CI uses Nx Cloud integration. See `nx.json` and `.github/workflows/node.js-ci.yml`.

This repository is not an application runtime; it is a libraries/configs/tooling repository. The runtime surface is the published npm packages.

## High-level Components

- Packaging & workspace management:
  - `package.json` (repo root) — workspace, scripts for `build`, `build:ci`, and lerna version/publish flows. See `package.json` at repo root.
  - `pnpm-workspace.yaml` — workspace globs: includes `packages/*`.
  - `lerna` referenced in `package.json` for versioning/publishing flows.

- Build & tooling packages (examples):
  - `packages/webpack-config/` — webpack builder/presets and helpers. See `packages/webpack-config/package.json` and `packages/webpack-config/src/` (source files exist here).
  - `packages/eslint-config/` — shared ESLint config. See `packages/eslint-config/package.json` and `packages/eslint-config/src/eslint.config.ts`.
  - `packages/prettier-config/` — Prettier configuration package. See `packages/prettier-config/package.json` and `packages/prettier-config/src/`.
  - `packages/tsconfig/` — TypeScript base config package. See `packages/tsconfig/package.json`.
  - `packages/depcruise-config/` — dependency-cruiser config helper library. See `packages/depcruise-config/src/index.ts` and `packages/depcruise-config/package.json`.

- CI and publishing:
  - `.github/workflows/node.js-ci.yml` — defines Node.js CI job using Nx affected builds and Nx Cloud session.
  - `.github/workflows/npm-publish.yml` — (present) used to publish packages (see `.github` folder).

## Layers

This repo follows a layered structure (conceptual):

1. Authoring layer — source code and configuration held under `packages/*/src` and package root files (e.g. `packages/depcruise-config/src/`).
2. Build layer — per-package build tools defined in each `package.json` (`tsup`, `tsc`, `cpx`, etc.) that output into `packages/<pkg>/dist`.
3. Distribution layer — package `dist/` artifacts are the published outputs consumed by other projects.

Files and locations:
- Sources: `packages/<pkg>/src/*` (e.g. `packages/depcruise-config/src/index.ts`)
- Build configs: `packages/<pkg>/tsup.config.ts`, `packages/<pkg>/tsconfig.json` (present in `packages/depcruise-config/` and `packages/webpack-config/`).
- Outputs: `packages/<pkg>/dist/` (listed in `package.json.files`).

## Data Flow / Release Flow

ASCII diagram - high level flow for building & publishing:

Repository (root)
  |
  +-- `packages/*/src`  --(build via pnpm + nx)->  `packages/*/dist`  --(pack/publish)-> npm registry
  |
  +-- CI (`.github/workflows/node.js-ci.yml`) triggers Nx affected builds -> Nx Cloud for distributed caching

Steps for a change that affects a package:
1. Developer edits `packages/<pkg>/src` (example: `packages/depcruise-config/src/loadConfig.ts`).
2. `nx` / `pnpm` build tasks run (`pnpm install` then `npx nx affected -t build:ci`) as in `.github/workflows/node.js-ci.yml`.
3. Package build scripts (`tsup`, `tsc`, `cpx`) produce `packages/<pkg>/dist/` and `package.json` lists `dist` in `files`.
4. Release uses `lerna` commands defined in root `package.json` for versioning and `npm` publishing (via actions or manual flow).

## Runtime Topology

There is no long-running server component in this repository. The "runtime" is the Node.js build environment used to run tooling and to build packages. Relevant runtime elements:

- Node.js versions targeted in CI: defined in `.github/workflows/node.js-ci.yml` (`node-version: '24'`).
- Local development uses `pnpm` (see `package.json` `packageManager: "pnpm@10.30.2"`) and Nx tasks.

## Design Patterns Observed

- Monorepo pattern (pnpm workspaces + Nx + Lerna): packages are single-purpose and published independently. See `pnpm-workspace.yaml` and root `package.json`.
- Convention over configuration for package structure: each package exposes `main`, `module`, `types` and places compiled artifacts in `dist/` (see `packages/depcruise-config/package.json` and `packages/webpack-config/package.json`).
- Reuse by composition: packages reference the repo `workspace:` dependencies (internal dependency links). E.g. `@tsparticles/eslint-config` is consumed by other packages (see `packages/depcruise-config/package.json` `devDependencies`).

## Key Abstractions

- Package boundary: Each `packages/<name>/` directory is the primary abstraction. Key files per package:
  - `packages/<name>/package.json` — public interface, scripts, dependencies
  - `packages/<name>/src/` — implementation (e.g. `packages/depcruise-config/src/index.ts`)
  - `packages/<name>/dist/` — build output
- Build targets (Nx): defined implicitly by package scripts and `nx.json` target defaults. `nx` orchestrates `build`, `build:ci`, `prepare`, `package` flows and caches outputs to `{projectRoot}/dist`.

## Entry Points

- Per-package entry points (consumers/packagers): `packages/<pkg>/package.json` fields `main` / `module` / `types` point to files in `dist/`. Examples:
  - `packages/webpack-config/package.json` -> `main: dist/webpack-tsparticles.js`
  - `packages/depcruise-config/package.json` -> `main: dist/index.cjs`, `module: dist/index.js`

- Root-level scripts for repository orchestration: `package.json` at repo root contains `build`/`build:ci` scripts that invoke `nx run-many -t build`.

## Error handling & Observability

This repository provides no application-level error handling code; errors mainly surface during build/lint/test steps.

CI observability:
- CI logs and Nx Cloud session management are implemented in `.github/workflows/node.js-ci.yml` (Nx Cloud start/stop steps). See lines that call `npx nx-cloud start-ci-run` and `npx nx fix-ci`.

## Cross-cutting Concerns

- Linting & formatting are centralized via internal packages: `packages/eslint-config` and `packages/prettier-config`. Packages reference them in `package.json` `prettier` and `devDependencies` (see `packages/webpack-config/package.json`).
- TypeScript configuration is shared via `packages/tsconfig`.

## Short ASCII component diagram

 [dev machine] -- pnpm install --> [workspace root]
   |-- `packages/webpack-config/src` --build--> `packages/webpack-config/dist`
   |-- `packages/eslint-config/src` --build--> `packages/eslint-config/dist`
   `-- nx orchestrates (see `nx.json`)

---

*Architecture analysis: 2026-03-01*
