import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";
import { publicRoutePaths } from "../scripts/publicRoutes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appPath = resolve(__dirname, "../src/App.jsx");

/**
 * Static page routes from App.jsx (excludes redirects and catch-all).
 * @param {string} source
 * @returns {string[]}
 */
export function parseAppPublicRoutePaths(source) {
  const paths = [];
  const re = /<Route\s+path="([^"]+)"/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    const path = match[1];
    if (path === "*") continue;
    if (path === "/docs" || path.startsWith("/docs/")) continue;
    paths.push(path);
  }
  return [...new Set(paths)].sort();
}

describe("publicRoutes manifest", () => {
  it("includes exactly 14 public marketing routes", () => {
    expect(publicRoutePaths).toHaveLength(14);
  });

  it("matches static public routes declared in App.jsx", () => {
    const appSource = readFileSync(appPath, "utf-8");
    const appPaths = parseAppPublicRoutePaths(appSource);
    expect([...publicRoutePaths].sort()).toEqual(appPaths);
  });
});
