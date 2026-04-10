import { describe, it, expect } from "vitest";
import { extractLeadingHeadMarkup } from "../src/prerender.jsx";

describe("extractLeadingHeadMarkup", () => {
  it("extracts title and meta tags from leading HTML", () => {
    const html =
      '<title>Test Page</title><meta name="description" content="A test"><div>body</div>';
    const result = extractLeadingHeadMarkup(html);

    expect(result.plainTitle).toBe("Test Page");
    expect(result.innerHtml).toBe("<div>body</div>");
    // title is filtered out of headMarkup; only meta remains
    expect(result.headMarkup).toHaveLength(1);
    expect(result.headMarkup[0]).toContain('name="description"');
  });

  it("extracts link tags into headMarkup", () => {
    const html =
      '<link rel="canonical" href="https://kaynos.net/"><div>content</div>';
    const result = extractLeadingHeadMarkup(html);

    expect(result.headMarkup).toHaveLength(1);
    expect(result.headMarkup[0]).toContain('rel="canonical"');
    expect(result.innerHtml).toBe("<div>content</div>");
  });

  it("returns empty arrays when no head tags are present", () => {
    const html = "<div>just body</div>";
    const result = extractLeadingHeadMarkup(html);

    expect(result.plainTitle).toBe("");
    expect(result.headMarkup).toEqual([]);
    expect(result.innerHtml).toBe("<div>just body</div>");
  });
});
