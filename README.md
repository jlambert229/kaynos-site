# Kaynos site

Public marketing site for Kaynos. Built with React and Vite, deployed on Netlify (`www.kaynos.net`).

## Prerequisites

- Node.js (use a current LTS version)
- npm

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

The dev server listens on port `5173` by default (see `vite.config.js`).

## Build and preview

```bash
npm run build
npm run preview
```

For a one-shot build plus opening the preview server:

```bash
npm run preview:open
```

## Tests

```bash
npm test                # unit tests (Vitest)
npm run test:e2e        # Playwright (builds first)
```

See `package.json` for browser-specific e2e targets.

## Figma export

```bash
npm run figma:export      # export assets
npm run figma:export:dry  # dry run
```

## Deploy

Netlify runs `npm run build` and publishes `dist/` (see `netlify.toml`). For local parity with CI, run `npm run build` before opening a PR.

## Repo

Upstream: `https://github.com/jlambert229/kaynos-site.git`
