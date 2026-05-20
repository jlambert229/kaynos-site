# Vite 8 build hang workaround

`scripts/build.mjs` wraps `vite build` and force-exits after prerender completes. Without it, Netlify builds can hang until timeout because the Node process never exits.

## Why

Vite 8 with Rolldown and `vite-prerender-plugin` can leave dangling handles after `writeBundle`, keeping the event loop alive even when the build output is complete.

## Upstream issues to watch

| Issue | Repo |
| --- | --- |
| [vite-prerender-plugin #3](https://github.com/preactjs/vite-prerender-plugin/issues/3) | Process hang after prerender (React 19) |
| [vite #21957](https://github.com/vitejs/vite/issues/21957) | Rolldown server build stalls |

## Quarterly check (or on major Vite bump)

1. Upgrade Vite / vite-prerender-plugin in a branch.
2. Temporarily replace `scripts/build.mjs` with direct `"build": "vite build"` in `package.json`.
3. Run `npm run build` locally and on a deploy preview; confirm the process exits and Netlify finishes within normal time.
4. If clean, remove the wrapper and delete this doc section. If not, keep the wrapper and note the tested versions here.

## Last verified

- **2026-05-19:** Wrapper still required on Vite ^8.0.11, vite-prerender-plugin ^0.5.13, Node 22.
