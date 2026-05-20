import { describe, it, expect } from "vitest";
import { parseSitemapPaths, compareSitemapAndDist } from "../scripts/verify-sitemap-dist.mjs";
import { publicRoutePaths } from "../scripts/publicRoutes.mjs";

describe("verify-sitemap-dist helpers", () => {
  it("parses loc paths from sitemap XML", () => {
    const xml = `<?xml version="1.0"?><urlset>
      <url><loc>https://www.kaynos.net/</loc></url>
      <url><loc>https://www.kaynos.net/contact</loc></url>
    </urlset>`;
    expect(parseSitemapPaths(xml)).toEqual(["/", "/contact"]);
  });

  it("detects manifest vs sitemap drift", () => {
    const result = compareSitemapAndDist(
      ["/", "/contact"],
      ["/"],
      "/tmp/nonexistent-dist",
    );
    expect(result.ok).toBe(false);
    expect(result.missingFromSitemap).toEqual(["/contact"]);
  });

  it("manifest paths count matches publicRoutes", () => {
    expect(publicRoutePaths).toHaveLength(14);
  });
});
