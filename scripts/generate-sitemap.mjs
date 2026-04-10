/**
 * Post-build script: generates dist/sitemap.xml from the prerender route list.
 * Called via the "postbuild" npm script.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "..", "dist");
const BASE = "https://kaynos.net";

const routes = [
  "/",
  "/privacy",
  "/data-use",
  "/getting-started",
  "/contact",
  "/changelog",
  "/accessibility",
  "/for/coaches",
];

const today = new Date().toISOString().split("T")[0];

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

mkdirSync(DIST, { recursive: true });
writeFileSync(resolve(DIST, "sitemap.xml"), xml, "utf-8");
console.log(`sitemap.xml written to ${DIST} (${routes.length} URLs)`);
