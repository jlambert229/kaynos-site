#!/usr/bin/env node
/**
 * Export frames/components from Figma to local files via the REST API.
 *
 * Setup:
 * 1. Figma → Settings → Security → Personal access token
 * 2. File URL: https://www.figma.com/design/FILE_KEY/... → FILE_KEY is the segment after /design/
 * 3. Right-click a frame → Copy link → node-id=1-2 means node id 1:2 in the API
 *
 * Env:
 *   FIGMA_TOKEN (or FIGMA_PERSONAL_ACCESS_TOKEN) — required
 *   FIGMA_FILE_KEY — required unless passed as argv[2]
 *
 * Config: figma.exports.json (override with FIGMA_EXPORTS_CONFIG)
 *
 * Usage:
 *   node scripts/figma-export.mjs
 *   node scripts/figma-export.mjs <file_key>
 *   node scripts/figma-export.mjs --dry-run
 */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const DEFAULT_CONFIG = resolve(ROOT, "figma.exports.json");

function getToken() {
  return (
    process.env.FIGMA_TOKEN ||
    process.env.FIGMA_PERSONAL_ACCESS_TOKEN ||
    ""
  ).trim();
}

function getFileKey(argv) {
  const positional = argv.filter((a) => !a.startsWith("-"));
  if (positional[0] && !positional[0].endsWith(".json")) return positional[0];
  return (process.env.FIGMA_FILE_KEY || "").trim();
}

async function loadConfig() {
  const path = process.env.FIGMA_EXPORTS_CONFIG
    ? resolve(ROOT, process.env.FIGMA_EXPORTS_CONFIG)
    : DEFAULT_CONFIG;
  const raw = await readFile(path, "utf8");
  const data = JSON.parse(raw);
  if (!data.exports || !Array.isArray(data.exports)) {
    throw new Error(`${path}: expected { "exports": [ ... ] }`);
  }
  return { path, exports: data.exports };
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function figmaImages(fileKey, token, ids, format, scale, svgOutlineText) {
  const params = new URLSearchParams();
  params.set("ids", ids.join(","));
  params.set("format", format);
  if (scale != null && format !== "svg") params.set("scale", String(scale));
  if (format === "svg" && svgOutlineText) params.set("svg_outline_text", "true");
  const url = `https://api.figma.com/v1/images/${fileKey}?${params}`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma images API ${res.status}: ${text}`);
  }
  return res.json();
}

async function downloadToFile(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download ${outPath}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, buf);
}

async function main() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes("--dry-run") || argv.includes("-n");

  const token = getToken();
  const fileKey = getFileKey(argv);

  if (argv.includes("--help") || argv.includes("-h")) {
    console.log(`figma-export.mjs — export nodes from Figma to disk

Env: FIGMA_TOKEN, FIGMA_FILE_KEY (or pass file key as first argument)
Config: figma.exports.json — see docs/figma-handoff.md

Options: --dry-run, --help
`);
    process.exit(0);
  }

  const { path: configPath, exports } = await loadConfig();
  const active = exports.filter((e) => e && e.nodeId && e.out && !e.disabled);
  if (active.length === 0) {
    console.log(
      `No exports in ${configPath} (add entries with nodeId + out, or set disabled: false).`,
    );
    process.exit(0);
  }

  if (!fileKey) {
    console.error("Missing FIGMA_FILE_KEY or pass file key as first argument");
    process.exit(1);
  }

  console.log(`Config: ${configPath}`);
  console.log(`File:   ${fileKey}`);

  if (dryRun && !token) {
    console.log("Dry run (no token): planned exports only.\n");
    for (const item of active) {
      const apiId = item.nodeId.replace(/-/g, ":");
      console.log(`  ${apiId} → ${item.out} (${item.format || "png"})`);
    }
    process.exit(0);
  }

  if (!token) {
    console.error("Missing FIGMA_TOKEN or FIGMA_PERSONAL_ACCESS_TOKEN");
    process.exit(1);
  }

  if (dryRun) console.log("Dry run: will call API but not write files.\n");

  const batches = chunk(active, 15);
  const idToMeta = new Map();
  for (const batch of batches) {
    const byFormat = new Map();
    for (const item of batch) {
      const format = item.format || "png";
      const scale = item.scale ?? (format === "png" ? 2 : 1);
      const key = `${format}:${scale}:${item.svgOutlineText ? "1" : "0"}`;
      if (!byFormat.has(key)) {
        byFormat.set(key, { format, scale, svgOutlineText: item.svgOutlineText, items: [] });
      }
      byFormat.get(key).items.push(item);
    }
    for (const { format, scale, svgOutlineText, items } of byFormat.values()) {
      const ids = items.map((i) => i.nodeId.replace(/-/g, ":"));
      const json = await figmaImages(fileKey, token, ids, format, scale, svgOutlineText);
      const images = json.images || {};
      for (const item of items) {
        const apiId = item.nodeId.replace(/-/g, ":");
        idToMeta.set(apiId, { item, url: images[apiId] });
      }
    }
  }

  let ok = 0;
  let fail = 0;
  for (const [apiId, { item, url }] of idToMeta) {
    const outPath = resolve(ROOT, item.out);
    if (!url) {
      console.error(`No render URL for ${apiId} → ${item.out} (check node id / permissions)`);
      fail++;
      continue;
    }
    if (dryRun) {
      console.log(`Would fetch ${apiId} → ${item.out}`);
      ok++;
      continue;
    }
    try {
      await downloadToFile(url, outPath);
      console.log(`Wrote ${item.out}`);
      ok++;
    } catch (e) {
      console.error(`${item.out}: ${e.message}`);
      fail++;
    }
  }

  if (fail > 0) process.exit(1);
  console.log(`Done (${ok} file(s)).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
