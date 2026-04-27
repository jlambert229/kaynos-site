#!/usr/bin/env node
/**
 * Post-build verification: every prerendered HTML page in dist/ must have a
 * unique <title> and a unique <meta name="description">. Catches Helmet
 * ordering regressions where pages silently share the home page's metadata.
 *
 * Exits non-zero on duplicates so the build fails.
 */
import { readFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { resolve, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");

async function* walkHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkHtml(full);
    } else if (entry.isFile() && entry.name === "index.html") {
      yield full;
    }
  }
}

function extractMeta(html) {
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  const descMatch = /<meta[^>]+name=["']description["'][^>]*>/i.exec(html);
  let description = "";
  if (descMatch) {
    const contentMatch = /content=["']([^"']*)["']/i.exec(descMatch[0]);
    description = contentMatch ? contentMatch[1] : "";
  }
  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    description: description.trim(),
  };
}

async function main() {
  try {
    statSync(DIST);
  } catch {
    console.error(`verify-prerender-seo: ${DIST} does not exist. Run 'npm run build' first.`);
    process.exit(1);
  }

  const seenTitles = new Map(); // title -> first route
  const seenDescriptions = new Map();
  const missing = [];
  const dupes = [];

  for await (const file of walkHtml(DIST)) {
    const route = "/" + relative(DIST, dirname(file));
    const html = readFileSync(file, "utf-8");
    const { title, description } = extractMeta(html);

    if (!title) missing.push({ route, field: "title" });
    if (!description) missing.push({ route, field: "description" });

    if (title) {
      if (seenTitles.has(title)) {
        dupes.push({ field: "title", value: title, routes: [seenTitles.get(title), route] });
      } else {
        seenTitles.set(title, route);
      }
    }
    if (description) {
      if (seenDescriptions.has(description)) {
        dupes.push({ field: "description", value: description, routes: [seenDescriptions.get(description), route] });
      } else {
        seenDescriptions.set(description, route);
      }
    }
  }

  if (missing.length || dupes.length) {
    if (missing.length) {
      console.error("verify-prerender-seo: pages missing required SEO metadata:");
      for (const m of missing) console.error(`  - ${m.route} missing ${m.field}`);
    }
    if (dupes.length) {
      console.error("verify-prerender-seo: pages share metadata that should be unique:");
      for (const d of dupes) {
        console.error(`  - ${d.field} '${d.value}' shared by ${d.routes.join(" and ")}`);
      }
    }
    process.exit(1);
  }

  console.log(`verify-prerender-seo: ${seenTitles.size} pages have unique titles + descriptions.`);
}

main();
