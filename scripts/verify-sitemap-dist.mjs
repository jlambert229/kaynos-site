#!/usr/bin/env node
/**
 * Postbuild: fail if sitemap.xml URLs and prerendered dist pages diverge.
 * Uses publicRoutes.mjs as the canonical route list.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { publicRoutePaths, pathToDistArtifact } from "./publicRoutes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const SITEMAP = resolve(DIST, "sitemap.xml");
const BASE = "https://www.kaynos.net";

/**
 * @param {string} xml
 * @returns {string[]}
 */
export function parseSitemapPaths(xml) {
  const paths = [];
  const re = /<loc>https:\/\/www\.kaynos\.net([^<]*)<\/loc>/g;
  let match;
  while ((match = re.exec(xml)) !== null) {
    paths.push(match[1] || "/");
  }
  return [...new Set(paths)].sort();
}

/**
 * @param {string[]} manifestPaths
 * @param {string[]} sitemapPaths
 * @param {string} distDir
 * @returns {{ ok: boolean, missingFromDist: string[], missingFromSitemap: string[], missingArtifacts: string[] }}
 */
export function compareSitemapAndDist(manifestPaths, sitemapPaths, distDir) {
  const manifest = [...manifestPaths].sort();
  const sitemap = [...sitemapPaths].sort();
  const missingFromSitemap = manifest.filter((p) => !sitemap.includes(p));
  const missingFromDist = sitemap.filter((p) => !manifest.includes(p));
  const missingArtifacts = manifest.filter((p) => {
    const rel = pathToDistArtifact(p);
    const full = resolve(distDir, rel);
    return !existsSync(full);
  });
  return {
    ok: missingFromSitemap.length === 0
      && missingFromDist.length === 0
      && missingArtifacts.length === 0,
    missingFromDist,
    missingFromSitemap,
    missingArtifacts,
  };
}

function main() {
  if (!existsSync(SITEMAP)) {
    console.error("verify-sitemap-dist: dist/sitemap.xml missing — run build first");
    process.exit(1);
  }
  const xml = readFileSync(SITEMAP, "utf-8");
  const sitemapPaths = parseSitemapPaths(xml);
  const result = compareSitemapAndDist(publicRoutePaths, sitemapPaths, DIST);

  if (!result.ok) {
    if (result.missingFromSitemap.length) {
      console.error("verify-sitemap-dist: routes missing from sitemap:", result.missingFromSitemap.join(", "));
    }
    if (result.missingFromDist.length) {
      console.error("verify-sitemap-dist: sitemap URLs not in route manifest:", result.missingFromDist.join(", "));
    }
    if (result.missingArtifacts.length) {
      console.error("verify-sitemap-dist: prerender artifacts missing from dist:", result.missingArtifacts.join(", "));
    }
    process.exit(1);
  }

  console.log(`verify-sitemap-dist: OK (${publicRoutePaths.length} routes, sitemap base ${BASE})`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
