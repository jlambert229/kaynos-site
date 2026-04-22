# Claude Code configuration — Kaynos Site (marketing)

## What this repo is

- Marketing / brochure site: React 19 + Vite, prerender-oriented build (`vite-prerender-plugin` in devDependencies).
- Source: `src/`. Static assets: `public/`. Small docs: `docs/`. Utility scripts: `scripts/` (see `package.json` scripts).
- App and docs live in sibling repos: `kaynos` (product), `kaynos-docs` (docs site). Keep links, naming, and deploy messaging consistent when you touch cross-site concerns.

## Behavioral rules

- Do what was asked; avoid scope creep.
- Read a file before editing it.
- Prefer editing existing files over adding new ones unless a new file is clearly required.
- Do not commit secrets or `.env` files; keep API or design-tool tokens in local env or CI secrets, not the repo.
- Avoid dropping scratch markdown or one-off artifacts in the repo root.

## Multi-agent and swarm (Claude Code + claude-flow)

This repo includes `.claude-flow/` and `.swarm/`. Use **Claude Code Task subagents** as the main parallel execution path for implementation work.

- **Parallelism:** For independent lanes (e.g. copy updates in `src/`, SEO meta in `index.html`, Playwright specs, Netlify headers), schedule **all** Task calls in **one** assistant message with explicit file ownership per agent.
- **Batching:** Combine todo updates in a single TodoWrite when you track work.
- **No status polling:** After spawning subagents, wait for their outputs before issuing more tool calls in that turn.
- **CLI vs Task:** `npx @claude-flow/cli@latest` is for swarm init, memory, hooks, and diagnostics. It does not replace Task subagents for edits and refactors.

Suggested swarm init when using hierarchical coordination:

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

### Subagent brief template (paste into every Task)

1. **Goal:** one sentence.
2. **Scope:** paths (for example `src/pages/`, `index.html`, `public/`).
3. **Out of scope:** files another agent owns.
4. **Done means:** artifact plus **verify command** (`npm run build`, targeted `npm run test:e2e:chromium`, etc.).
5. **Return:** bullets and command output (no secrets).

### When to parallelize

- Parallelize **copy and layout** in different route folders, **SEO/meta** vs **component** refactors, or **Playwright** additions vs **Vite** config when they do not touch the same lines.
- Serialize work that edits the **same** route component or global CSS tokens at once.

## Power settings (MCP, memory, claude-flow)

- **Docs:** For Vite 8, React 19, `react-helmet-async`, `vite-prerender-plugin`, or Playwright behavior, use **current docs** (for example **Context7**) instead of guessing.
- **Daemon / doctor:** `npx @claude-flow/cli@latest daemon start` for long swarm sessions; `doctor --fix` when claude-flow misbehaves.
- **Memory namespace:** Store cross-session marketing decisions under `kaynos-site` (for example `hero-copy-2026`, `analytics-snippet-location`).

```bash
npx @claude-flow/cli@latest memory store --key "<key>" --value "<decision>" --namespace kaynos-site
```

## Build, test, and preview

- Dev: `npm run dev`
- Build: `npm run build`
- Unit tests: `npm test`
- E2E: `npm run test:e2e` (see `package.json` for browser/mobile variants)

Before committing UI or routing changes, run `npm run build` and the tests that cover the touched surface.

**Visual regressions:** Prefer Playwright or a real browser check for layout and prerendered HTML, not only `vite build` success.

## Netlify and shipping

- Site config: `netlify.toml`, `netlify/`.
- Follow org rules for production: offer local / draft verification before any production deploy CLI. Do not assume prod deploy without explicit confirmation when the task is deployment-shaped.

## File layout reference

| Area | Location                    |
|-----------|-----------------------------|
| App code  | `src/`                      |
| Tests     | `tests/` (if present)       |
| Scripts   | `scripts/`                  |
| Netlify   | `netlify/`, `netlify.toml`  |

## Linear (issues and projects)

Prefer the **`linear` CLI** in the shell for issue **CRUD**, bulk field updates (state, priority, project, labels), and scripted queries (for example `linear issue query -j`). Use **Linear MCP** only when `linear` is not installed, a GraphQL-only operation is required, or the CLI fails for that task. Canonical workspace rule: `.cursor/rules/linear-cli.mdc`. Never paste API keys or tokens into files or chat.

## Pull requests and production deploys

Use **GitHub pull requests (PRs)** for changes that should go through review. Target **`main`** (this repo's default branch; it is not `master` here). **Merging a PR into `main`** triggers **production** Netlify deploys for the linked marketing site. Additional jobs may exist under `.github/workflows/`. Treat a merge as production-impacting: run `npm run build` and relevant tests before merging, and follow org rules for Netlify production confirmation when using deploy CLIs.

## Support

- claude-flow: https://github.com/ruvnet/claude-flow
