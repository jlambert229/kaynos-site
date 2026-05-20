/**
 * Canonical list of public marketing routes (sitemap, prerender sentinels, e2e).
 * Keep in sync with static <Route path="…"> entries in src/App.jsx.
 */

/** @typedef {{ path: string, priority: string, changefreq: string, e2eHeading?: RegExp }} PublicRoute */

/** @type {PublicRoute[]} */
export const publicRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/for/coaches", priority: "0.9", changefreq: "monthly" },
  { path: "/for/students", priority: "0.7", changefreq: "monthly" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/getting-started", priority: "0.6", changefreq: "monthly", e2eHeading: /up and running/i },
  { path: "/changelog", priority: "0.6", changefreq: "weekly", e2eHeading: /what's new/i },
  { path: "/contact", priority: "0.5", changefreq: "yearly", e2eHeading: /get in touch/i },
  { path: "/security", priority: "0.5", changefreq: "yearly" },
  { path: "/status", priority: "0.4", changefreq: "daily" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly", e2eHeading: /privacy policy/i },
  { path: "/data-use", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/processors", priority: "0.3", changefreq: "yearly" },
  { path: "/accessibility", priority: "0.3", changefreq: "yearly", e2eHeading: /accessibility/i },
];

/** @type {string[]} */
export const publicRoutePaths = publicRoutes.map((r) => r.path);

/**
 * Dist-relative path for a prerendered HTML artifact.
 * @param {string} routePath
 * @returns {string}
 */
export function pathToDistArtifact(routePath) {
  if (routePath === "/") return "index.html";
  return `${routePath.replace(/^\//, "")}/index.html`;
}

/** @type {string[]} */
export const prerenderArtifactPaths = publicRoutes.map((r) => pathToDistArtifact(r.path));

/**
 * Routes with e2e heading matchers for navigation smoke tests.
 * @returns {{ path: string, heading: RegExp }[]}
 */
export function getE2eNavigationRoutes() {
  return publicRoutes
    .filter((r) => r.e2eHeading)
    .map((r) => ({ path: r.path, heading: r.e2eHeading }));
}
