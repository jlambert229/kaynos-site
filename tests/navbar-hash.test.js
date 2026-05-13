import { describe, it, expect } from "vitest";
import { safeQuerySelector } from "../src/components/Navbar";

describe("safeQuerySelector", () => {
  it("returns the matching element for a valid hash", () => {
    const el = document.createElement("div");
    el.id = "valid-anchor";
    document.body.appendChild(el);
    try {
      expect(safeQuerySelector("#valid-anchor")).toBe(el);
    } finally {
      el.remove();
    }
  });

  it("returns null when the hash is well-formed but has no match", () => {
    expect(safeQuerySelector("#does-not-exist")).toBe(null);
  });

  // The exception path is the whole reason this helper exists: pasting a URL
  // like /#<script> would otherwise throw a DOMException out of useEffect
  // and bubble straight to the ErrorBoundary.
  it("returns null instead of throwing on a malformed selector", () => {
    expect(safeQuerySelector("#<script>")).toBe(null);
    expect(safeQuerySelector("#:not-a-selector(")).toBe(null);
    expect(safeQuerySelector("#")).toBe(null);
  });
});
