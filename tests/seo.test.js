import { describe, it, expect } from "vitest";
import { normalizePath, buildBreadcrumbs } from "../src/components/Seo";
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

  it("omits non-routable intermediate segments — Google requires `item` on every entry except the last", () => {
    const crumbs = buildBreadcrumbs("/for/coaches", "For Coaches: Video Review & Booking");
    // /for is a parent path with no route; it's dropped from the trail
    // entirely rather than listed without an `item` URL.
    expect(crumbs.itemListElement).toHaveLength(2);
    expect(crumbs.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: SITE_URL,
    });
    expect(crumbs.itemListElement[1]).toMatchObject({
      position: 2,
      name: "For Coaches: Video Review & Booking",
      item: `${SITE_URL}/for/coaches`,
    });
  });
});
