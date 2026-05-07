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

/* Each route declares its own priority + changefreq. Both fields are
   treated as hints by major crawlers; the goal here is to nudge them
   toward the marketing entry points (home, /for/coaches) and away from
   legal / status pages that almost never change. */
const routes = [
  { path: "/",                  priority: "1.0", changefreq: "weekly" },
  { path: "/for/coaches",       priority: "0.9", changefreq: "monthly" },
  { path: "/for/students",      priority: "0.7", changefreq: "monthly" },
  { path: "/about",             priority: "0.6", changefreq: "monthly" },
  { path: "/getting-started",   priority: "0.6", changefreq: "monthly" },
  { path: "/changelog",         priority: "0.6", changefreq: "weekly" },
  { path: "/contact",           priority: "0.5", changefreq: "yearly" },
  { path: "/security",          priority: "0.5", changefreq: "yearly" },
  { path: "/status",            priority: "0.4", changefreq: "daily" },
  { path: "/privacy",           priority: "0.3", changefreq: "yearly" },
  { path: "/data-use",          priority: "0.3", changefreq: "yearly" },
  { path: "/terms",             priority: "0.3", changefreq: "yearly" },
  { path: "/processors",        priority: "0.3", changefreq: "yearly" },
  { path: "/accessibility",     priority: "0.3", changefreq: "yearly" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .map(
    (r) => `  <url>
    <loc>${BASE}${r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
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
