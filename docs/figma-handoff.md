# Figma handoff for kaynos-site

This repo can **pull exports from your Figma file** through the official REST API. That gives you repeatable assets, reviewable diffs in git, and a path to CI without redrawing the site in code by hand.

## What you set up once

1. **Personal access token**  
   Figma → Settings → Security → Personal access tokens → generate.  
   Store as `FIGMA_TOKEN` (never commit it). `.gitignore` already ignores `.env`.

2. **File key**  
   From a file URL: `https://www.figma.com/design/THIS_PART_IS_THE_KEY/...`

3. **Node ids**  
   Right-click a frame or component → **Copy link**. The query looks like `node-id=1-234`. In `figma.exports.json` use either `1-234` or `1:234`.

4. **Config**  
   Copy `figma.exports.example.json` entries into `figma.exports.json` (or start from the empty `exports` array and add rows). Each row needs:

   - `nodeId` — frame or component to render  
   - `out` — path under the repo root, usually `public/figma/...`  
   - `format` — `png`, `svg`, or `jpeg` (optional, default `png`)  
   - `scale` — optional; default `2` for png/jpeg, `1` for svg  
   - `svgOutlineText` — optional, for svg  
   - `disabled` — optional; `true` skips the row  

## Commands

```bash
cd kaynos-site
export FIGMA_TOKEN=...
export FIGMA_FILE_KEY=...
npm run figma:export
```

Validate config without a token (no network):

```bash
export FIGMA_FILE_KEY=your_file_key
npm run figma:export:dry
```

With a token, `--dry-run` still calls Figma to verify node ids but does not write files:

```bash
npm run figma:export -- --dry-run
```

Override config path:

```bash
FIGMA_EXPORTS_CONFIG=./my-exports.json npm run figma:export
```

## Using assets in the site

Reference static files like any other file under `public/`:

`/figma/hero-mark.svg`

After adding new exports, run `npm run build` before shipping.

## GitHub Actions (optional)

Workflow **Figma assets** (`workflow_dispatch`) runs the same script. Add repository secrets:

- `FIGMA_TOKEN`  
- `FIGMA_FILE_KEY`  

Then run the workflow when you want a PR that refreshes assets from the current Figma nodes.

## Figma-side habits (high leverage)

- Name components and mark **Export** settings in Figma for the nodes you reference.  
- Keep a **Tokens** page and mirror names with `:root` variables in `src/styles.css` for color/type (the API does not replace a disciplined token workflow).  
- Use **file versions** or branches when you need to align “what shipped” with a release.

## API note

Image URLs from Figma are **short-lived**. This script downloads immediately and commits binaries into `public/`; do not hot-link the API URLs from the site.
