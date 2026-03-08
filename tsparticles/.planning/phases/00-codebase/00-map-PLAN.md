---
phase: 00-codebase
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - .planning/phases/00-codebase/00-map-PLAN.md
  - .planning/codebase/STACK.md
  - .planning/codebase/INTEGRATIONS.md
  - .planning/codebase/ARCHITECTURE.md
  - .planning/codebase/STRUCTURE.md
  - .planning/codebase/CONVENTIONS.md
  - .planning/codebase/TESTING.md
  - .planning/codebase/CONCERNS.md
autonomous: false
requirements:
  - MAP-01
user_setup: []
must_haves:
  truths:
    - ".planning/codebase exists and contains 7 structured documents (STACK, INTEGRATIONS, ARCHITECTURE, STRUCTURE, CONVENTIONS, TESTING, CONCERNS)."
    - "Each document contains concrete file references and is > 20 lines long (actionable for planners/executors)."
    - "Documents do not contain high-confidence secrets (API keys, private keys, tokens)."
    - "Mapping is ready to commit; commit performed only after explicit human approval."
  artifacts:
    - path: ".planning/codebase/STACK.md"
      provides: "Technology stack overview (languages, runtimes, package manager, key deps)"
    - path: ".planning/codebase/INTEGRATIONS.md"
      provides: "CI/CD, publishing, hosting and external services inventory"
    - path: ".planning/codebase/ARCHITECTURE.md"
      provides: "System architecture, layers, entry points and data-flow"
    - path: ".planning/codebase/STRUCTURE.md"
      provides: "Directory layout, package boundaries and source vs dist mapping"
    - path: ".planning/codebase/CONVENTIONS.md"
      provides: "Coding conventions, linting, formatting and naming guidance"
    - path: ".planning/codebase/TESTING.md"
      provides: "Test runner, fixtures, common commands and CI patterns"
    - path: ".planning/codebase/CONCERNS.md"
      provides: "Technical debt, security/performance concerns, and triage suggestions"
  key_links:
    - from: ".planning/codebase/ARCHITECTURE.md"
      to: "engine/src/index.ts"
      via: "engine entrypoint reference"
      pattern: "engine/src/index.ts"
    - from: ".planning/codebase/STRUCTURE.md"
      to: "bundles/slim/src/index.ts"
      via: "bundle loader examples"
      pattern: "bundles/slim/src/index.ts"
---

<objective>
Create a reproducible codebase map by orchestrating four parallel gsd-codebase-mapper agents.

Purpose: Provide a compact, actionable snapshot of the repository for planning and onboarding so subsequent planning phases can rely on structured, local documentation instead of live code reads.
Output: Seven documents under `.planning/codebase/`:
- STACK.md, INTEGRATIONS.md, ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md
</objective>

<execution_context>
@/Users/matteo/.config/opencode/get-shit-done/workflows/map-codebase.md
</execution_context>

<context>
This plan follows the map-codebase workflow. It spawns 4 `gsd-codebase-mapper` agents (tech, arch, quality, concerns) which MUST write documents directly into `.planning/codebase/` and return only a short confirmation block with file paths and line counts.

If `.planning/codebase/` already exists, the plan will not delete files automatically — it will create a small report and surface a decision for the human to pick (Refresh / Update / Skip).
</context>

<tasks>

<task type="auto">
  <name>Task 1: Prepare mapping environment & detect existing map</name>
  <files>.planning/codebase/, .planning/phases/00-codebase/00-map-PLAN.md</files>
  <action>
    - Run the official init helper to gather mapping context:
      node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" init map-codebase --json > .planning/phases/00-codebase/init.json
    - If `.planning/codebase/` does not exist, create it: `mkdir -p .planning/codebase` and ensure writable.
    - If `.planning/codebase/` already exists, write a short report at `.planning/codebase/EXISTING_MAP.md` listing files present and their line counts (do NOT delete or modify existing docs). The report should present three options and recommended default: Refresh (delete & remap), Update (remap specific docs), Skip (use existing).
    - Avoid deleting or overwriting existing documents without explicit human approval.
  </action>
  <verify>
    <automated>bash -lc 'node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" init map-codebase --json > /dev/null 2>&1; test -d .planning/codebase && echo "ok" || (mkdir -p .planning/codebase && echo "created")'</automated>
  </verify>
  <done>`.planning/codebase/` exists and is writable. If a pre-existing map was present, `.planning/codebase/EXISTING_MAP.md` exists with a short summary and options for the human.</done>
</task>

<task type="auto">
  <name>Task 2: Spawn 4 gsd-codebase-mapper agents (parallel)</name>
  <files>.planning/codebase/STACK.md, .planning/codebase/INTEGRATIONS.md, .planning/codebase/ARCHITECTURE.md, .planning/codebase/STRUCTURE.md, .planning/codebase/CONVENTIONS.md, .planning/codebase/TESTING.md, .planning/codebase/CONCERNS.md</files>
  <action>
    - Launch four `gsd-codebase-mapper` agents in parallel (use Task tool / agent runtime). Provide each agent the exact prompt below (replace {mapper_model} with the mapper model from init.json if available):

      Agent A (tech): write `.planning/codebase/STACK.md` and `.planning/codebase/INTEGRATIONS.md`.

      Agent B (arch): write `.planning/codebase/ARCHITECTURE.md` and `.planning/codebase/STRUCTURE.md`.

      Agent C (quality): write `.planning/codebase/CONVENTIONS.md` and `.planning/codebase/TESTING.md`.

      Agent D (concerns): write `.planning/codebase/CONCERNS.md`.

    - Requirements for agents (must be included in each agent prompt):
      - Use templates from `/Users/matteo/.config/opencode/get-shit-done/workflows/map-codebase.md` (structure, required sections, always include file paths in backticks).
      - Write documents directly to the paths above.
      - When finished, each agent must append a short confirmation file (or stdout) containing the block:

        ## Mapping Complete

        **Focus:** {focus}
        **Documents written:**
        - `.planning/codebase/{DOC}.md` ({N} lines)

    - Use run_in_background=true and wait for all agents to complete before proceeding. Capture their confirmation blocks but DO NOT capture document contents.

    - Avoid returning or embedding file contents in the orchestrator logs (only paths + line counts allowed).
  </action>
  <verify>
    <automated>bash -lc 'wc -l .planning/codebase/{STACK,INTEGRATIONS,ARCHITECTURE,STRUCTURE,CONVENTIONS,TESTING,CONCERNS}.md || true'</automated>
  </verify>
  <done>All seven documents exist in `.planning/codebase/` and `wc -l` shows non-zero line counts. Each file should be >20 lines or have a documented exception in `.planning/codebase/EXISTING_MAP.md`.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Complete codebase map: Seven documents under `.planning/codebase/`</what-built>
  <how-to-verify>
    1. Run: `wc -l .planning/codebase/*.md` — expect seven entries: STACK.md, INTEGRATIONS.md, ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md. Each should be >20 lines.
    2. Run secret scan (automated command already ran in step 2):
       `grep -E '(sk-[A-Za-z0-9]{20,}|sk_live_[A-Za-z0-9]+|sk_test_[A-Za-z0-9]+|ghp_[A-Za-z0-9]{36}|gho_[A-Za-z0-9]{36}|glpat-[A-Za-z0-9_-]+|AKIA[A-Z0-9]{16}|xox[baprs]-[A-Za-z0-9-]+|-----BEGIN.*PRIVATE KEY|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.)' .planning/codebase/*.md || true`
       - Expected: no matches. If matches appear, reply with `secrets-found` and edit files before committing.
    3. Manually spot-check the first 30 lines of each doc: `head -n 30 .planning/codebase/STACK.md` (repeat for each). Confirm documents contain concrete file paths and actionable guidance.

  </how-to-verify>
  <resume-signal>Reply with `approved` to commit the codebase map, or `review` to open files for edit. If `approved`, the executor will run the commit command; if `review`, stop and allow edits (no commit will be made).</resume-signal>
</task>

</tasks>

<verification>
After `approved` signal the executor should run:

```bash
# Final secret check (safety) then commit
grep -E '(sk-[A-Za-z0-9]{20,}|sk_live_[A-Za-z0-9]+|sk_test_[A-Za-z0-9]+|ghp_[A-Za-z0-9]{36}|gho_[A-Za-z0-9]{36}|glpat-[A-Za-z0-9_-]+|AKIA[A-Z0-9]{16}|xox[baprs]-[A-Za-z0-9-]+|-----BEGIN.*PRIVATE KEY|eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.)' .planning/codebase/*.md || true
node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" commit "docs(map): add codebase mapping" --files .planning/codebase/*.md
```

If secrets are detected, DO NOT commit. Ask the user to remove secrets and re-run the commit.
</verification>

<success_criteria>
- `.planning/codebase/` exists and contains the seven documents named above.
- Each document has >20 lines and includes file path references.
- No high-confidence secrets are present in generated docs (or user approved them to proceed).
- User either approved commit (files committed) or chose to review edits before commit.
</success_criteria>

<output>
After completion, create `.planning/phases/00-codebase/00-map-SUMMARY.md` with a short table of file → line counts and pointers to next actions (`/gsd-new-project`, `/gsd-plan-phase`).
</output>
