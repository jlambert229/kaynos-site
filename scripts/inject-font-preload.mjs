#!/usr/bin/env node
/**
 * Postbuild: inject a <link rel="preload" as="font"> for the Inter Latin
 * woff2 into every prerendered HTML in dist/.
 *
 * Why: without the preload, the browser starts the font fetch only after
 * it parses the external stylesheet and notices the @font-face src. With
 * the preload, the fetch starts in parallel with HTML parsing — typically
 * 100–150 ms earlier on Mobile Safari over LTE. Inter's font-display:
 * swap still applies; this just shortens the swap window.
 *
 * We preload only the Latin subset (the Latin-Ext file is fetched on
 * demand if any unicode-range matches — typically never for this site).
 *
 * Implementation: greps dist/assets for the actual hashed filename so the
 * preload survives rebuilds. Injects right after the dark/light theme-
 * color metas so the preload-scanner sees it as early as possible.
 *
 * Idempotent: if the preload already exists in the HTML, skips that file.
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const ASSETS = join(DIST, "assets");

async function findLatinFont() {
  const entries = await readdir(ASSETS);
  const match = entries.find(
    (n) =>
      n.startsWith("inter-latin-wght-normal-") &&
      !n.includes("latin-ext") &&
      n.endsWith(".woff2"),
  );
  if (!match) {
    throw new Error("inject-font-preload: no inter-latin-wght-normal-*.woff2 in dist/assets/");
  }
  return `/assets/${match}`;
}

async function* walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(full);
    else if (entry.isFile() && entry.name.endsWith(".html")) yield full;
  }
}

const ANCHOR = '<meta name="theme-color" content="#f8f8fa" media="(prefers-color-scheme: light)">';

export function injectFontPreload(html, href) {
  if (html.includes(`rel="preload" as="font"`)) return html;
  // Different builds emit `>` vs ` />`; match both.
  const anchorVariants = [
    ANCHOR,
    ANCHOR.replace(">", " />"),
  ];
  const tag = `\n  <link rel="preload" as="font" type="font/woff2" crossorigin href="${href}">`;
  for (const a of anchorVariants) {
    if (html.includes(a)) return html.replace(a, a + tag);
  }
  // Fall back: insert just before </head>.
  return html.replace(/<\/head>/i, `${tag}\n</head>`);
}

async function main() {
  const href = await findLatinFont();
  let patched = 0;
  for await (const file of walkHtml(DIST)) {
    const html = await readFile(file, "utf-8");
    const next = injectFontPreload(html, href);
    if (next !== html) {
      await writeFile(file, next, "utf-8");
      patched++;
    }
  }
  console.log(
    `inject-font-preload: wrote ${href} preload into ${patched} HTML file${patched === 1 ? "" : "s"}.`,
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("inject-font-preload: failed");
    console.error(err);
    process.exit(1);
  });
}
