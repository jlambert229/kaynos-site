import { describe, it, expect } from "vitest";
import {
  normalizePath,
  segmentLabel,
  buildBreadcrumbs,
} from "../src/components/Seo";
import { SITE_URL } from "../src/seo/constants";

describe("normalizePath", () => {
  it("collapses the root path to an empty string so canonicals don't get a trailing slash", () => {
    expect(normalizePath("/")).toBe("");
  });

  it("prepends a slash when one is missing", () => {
    expect(normalizePath("about")).toBe("/about");
  });

  it("leaves already-rooted paths alone", () => {
    expect(normalizePath("/for/coaches")).toBe("/for/coaches");
  });
});

describe("segmentLabel", () => {
  it("title-cases single-word segments", () => {
    expect(segmentLabel("about")).toBe("About");
  });

  it("title-cases dash-separated segments and re-joins with a space", () => {
    expect(segmentLabel("data-use")).toBe("Data Use");
  });
});

describe("buildBreadcrumbs", () => {
  it("returns null for the home page so no BreadcrumbList JSON-LD is emitted", () => {
    expect(buildBreadcrumbs("/", "Home")).toBeNull();
  });

  it("builds a 2-item list for top-level pages", () => {
    const crumbs = buildBreadcrumbs("/about", "About Kaynos");
    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement).toHaveLength(2);
    expect(crumbs.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: SITE_URL,
    });
    expect(crumbs.itemListElement[1]).toMatchObject({
      position: 2,
      name: "About Kaynos",
      item: `${SITE_URL}/about`,
    });
  });

  it("omits item URLs for intermediate segments that aren't real routes", () => {
    const crumbs = buildBreadcrumbs("/for/coaches", "Video Review for BJJ Coaches");
    expect(crumbs.itemListElement).toHaveLength(3);
    // /for is a parent path with no route; it must not get an `item` URL.
    expect(crumbs.itemListElement[1]).toMatchObject({ position: 2, name: "For" });
    expect(crumbs.itemListElement[1].item).toBeUndefined();
    // The leaf does get a URL.
    expect(crumbs.itemListElement[2]).toMatchObject({
      position: 3,
      name: "Video Review for BJJ Coaches",
      item: `${SITE_URL}/for/coaches`,
    });
  });
});
