import { describe, it, expect } from "vitest";
import { extractInlineScripts } from "../scripts/compute-csp.mjs";

describe("extractInlineScripts", () => {
  it("returns the body of an inline <script> block", () => {
    const html = `<head><script>alert(1)</script></head>`;
    expect(extractInlineScripts(html)).toEqual(["alert(1)"]);
  });

  it("skips external <script src=...> tags", () => {
    const html = `
      <script src="/foo.js"></script>
      <script type="module" crossorigin src="/bar.js"></script>
    `;
    expect(extractInlineScripts(html)).toEqual([]);
  });

  it("captures multiple inline blocks in one document (JSON-LD pattern)", () => {
    const html = `
      <script type="application/ld+json">{"@type":"WebSite"}</script>
      <script type="application/ld+json">{"@type":"FAQPage"}</script>
      <script type="application/ld+json">{"@type":"Product"}</script>
    `;
    const inline = extractInlineScripts(html);
    expect(inline).toHaveLength(3);
    expect(inline[0]).toContain("WebSite");
    expect(inline[1]).toContain("FAQPage");
    expect(inline[2]).toContain("Product");
  });

  it("ignores empty <script></script> blocks (no hash needed)", () => {
    const html = `<script></script><script>   </script><script>x</script>`;
    expect(extractInlineScripts(html)).toEqual(["x"]);
  });

  it("does not confuse inline content with surrounding HTML", () => {
    const html = `<div><script>const a = "<div>";</script></div>`;
    expect(extractInlineScripts(html)).toEqual([`const a = "<div>";`]);
  });

  it("handles src= even when it appears before other attributes", () => {
    const html = `<script src="/x.js" type="module"></script>`;
    expect(extractInlineScripts(html)).toEqual([]);
  });

  it("handles whitespace and newlines inside the opening tag", () => {
    const html = `<script\n  type="application/ld+json"\n  data-test="x"\n>{"a":1}</script>`;
    expect(extractInlineScripts(html)).toEqual([`{"a":1}`]);
  });

  it("captures multiline JSON-LD content verbatim", () => {
    const html = `<script type="application/ld+json">\n  {\n    "@type": "WebSite"\n  }\n</script>`;
    const [content] = extractInlineScripts(html);
    expect(content).toContain("@type");
    expect(content).toContain("WebSite");
  });
});
