/**
 * Post-build script: generates dist/sitemap.xml from the prerender route list.
 * Called via the "postbuild" npm script.
 *
 * `lastmod` uses the build timestamp for every URL. That's not a precise
 * per-page edit time, but it's a useful freshness signal for crawlers and
 * costs nothing to maintain.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE = "https://www.kaynos.net";

const routes = [
  "/",
  "/privacy",
  "/data-use",
  "/getting-started",
  "/contact",
  "/changelog",
  "/accessibility",
  "/for/coaches",
  "/for/students",
  "/security",
  "/processors",
  "/terms",
  "/about",
  "/status",
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

mkdirSync(DIST, { recursive: true });
try {
  writeFileSync(resolve(DIST, "sitemap.xml"), xml, "utf-8");
  console.log(`sitemap.xml written to ${DIST} (${routes.length} URLs)`);
} catch (err) {
  console.error(`ERROR: failed to write sitemap.xml — ${err.message}`);
  process.exit(1);
}
