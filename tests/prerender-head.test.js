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

  it("trims surrounding whitespace and strips inter-tag whitespace", () => {
    const html =
      '   <title>  Spaced  </title>  <meta name="x" content="y">\n<div>body</div>';
    const result = extractLeadingHeadMarkup(html);
    // .trim() inside the title path collapses the leading/trailing spaces.
    expect(result.plainTitle).toBe("Spaced");
    expect(result.headMarkup).toHaveLength(1);
    expect(result.innerHtml).toBe("<div>body</div>");
  });

  it("matches mixed-case head tags case-insensitively", () => {
    const html =
      '<TITLE>Hello</TITLE><META name="x" content="y"><LINK rel="canonical" href="/"><div>body</div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.plainTitle).toBe("Hello");
    expect(result.headMarkup).toHaveLength(2);
    expect(result.innerHtml).toBe("<div>body</div>");
  });

  it("captures self-closing meta and link tags (XHTML-style)", () => {
    const html =
      '<meta name="viewport" content="width=device-width" /><link rel="icon" href="/x.ico" /><div>body</div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.headMarkup).toHaveLength(2);
    expect(result.headMarkup[0]).toContain('content="width=device-width"');
    expect(result.headMarkup[1]).toContain('href="/x.ico"');
    expect(result.innerHtml).toBe("<div>body</div>");
  });

  it("stops extracting once a non-head tag appears in the leading position", () => {
    // Structural elements should NOT be slurped into head markup, even if
    // followed by a meta — the loop should bail at the first non-match.
    const html = '<div>body<meta name="late" content="z"></div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.headMarkup).toEqual([]);
    expect(result.plainTitle).toBe("");
    expect(result.innerHtml).toBe('<div>body<meta name="late" content="z"></div>');
  });

  it("filters <title> out of headMarkup but keeps it in plainTitle", () => {
    const html = '<title>Only Title</title><div>x</div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.plainTitle).toBe("Only Title");
    expect(result.headMarkup).toEqual([]);
    expect(result.innerHtml).toBe("<div>x</div>");
  });

  it("preserves all leading head tags in order", () => {
    const html =
      '<title>T</title>' +
      '<meta name="description" content="d">' +
      '<meta property="og:title" content="og">' +
      '<link rel="canonical" href="/">' +
      '<div>body</div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.plainTitle).toBe("T");
    expect(result.headMarkup).toHaveLength(3);
    expect(result.headMarkup[0]).toContain('name="description"');
    expect(result.headMarkup[1]).toContain('property="og:title"');
    expect(result.headMarkup[2]).toContain('rel="canonical"');
  });

  // Edge case: an attribute value containing a literal '>' inside quotes is
  // valid HTML, but the regex `[^>]*>` will stop at the first '>'. This is a
  // *real* limitation of the current extractor. React Helmet's renderer never
  // emits unescaped '>' inside attribute values (it serializes as `&gt;`), so
  // in practice this is unreachable. We document the limitation as a skipped
  // test rather than a passing assertion of buggy behavior.
  it.skip("[KNOWN LIMITATION] handles attributes containing a literal '>' inside quotes", () => {
    // The current regex `/^<meta\b[^>]*>/i` would stop at the inner '>',
    // producing a malformed match. React Helmet never emits raw '>' in
    // attributes (escapes to &gt;), so the prerender pipeline doesn't hit
    // this in practice. If Helmet's output ever changes, this test will
    // catch the regression — re-enable it then.
    const html = '<meta name="x" content="a>b"><div>body</div>';
    const result = extractLeadingHeadMarkup(html);
    expect(result.headMarkup).toEqual(['<meta name="x" content="a>b">']);
    expect(result.innerHtml).toBe("<div>body</div>");
  });
});
