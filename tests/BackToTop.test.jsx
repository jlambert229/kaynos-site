import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import BackToTop from "../src/components/BackToTop";

// jsdom lacks matchMedia + requestAnimationFrame's same semantics as a real
// browser; stub matchMedia so the click handler doesn't blow up, and use a
// synchronous rAF so scroll updates flush within the same act() boundary.
beforeEach(() => {
  if (!window.matchMedia) {
    window.matchMedia = (q) => ({
      matches: false,
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    });
  }
  // Stub both global and window — vi.stubGlobal mutates globalThis but jsdom
  // resolves bare `requestAnimationFrame` calls via window in some paths.
  const syncRaf = (cb) => {
    cb();
    return 0;
  };
  vi.stubGlobal("requestAnimationFrame", syncRaf);
  window.requestAnimationFrame = syncRaf;
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

// jsdom defines `scrollY` as a getter, so a plain assignment is silently
// ignored. Mutate a shared cell and define the getter once per test so the
// BackToTop scroll handler always reads the latest value.
let _scrollY = 0;
function setScrollY(y) {
  _scrollY = y;
}

beforeEach(() => {
  _scrollY = 0;
  Object.defineProperty(window, "scrollY", {
    get() {
      return _scrollY;
    },
    configurable: true,
  });
});

describe("<BackToTop />", () => {
  it("renders the button hidden until scrolled past the 600px threshold", () => {
    setScrollY(0);
    render(<BackToTop />);
    // aria-hidden="true" also strips the accessible name, so the role+name
    // query returns nothing. Reach for the button by class instead — the
    // contract under test is "hidden + non-tabbable + no .visible class".
    const btn = document.querySelector("button.back-to-top");
    expect(btn).not.toBeNull();
    expect(btn).toHaveAttribute("aria-hidden", "true");
    expect(btn).toHaveAttribute("tabindex", "-1");
    expect(btn.className).not.toMatch(/\bvisible\b/);
  });

  it("becomes visible once the page scrolls past the threshold", () => {
    setScrollY(0);
    render(<BackToTop />);
    setScrollY(800);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Once visible, aria-hidden flips and the button surfaces in the a11y tree.
    const btn = screen.getByRole("button", { name: /back to top/i });
    expect(btn).toHaveAttribute("aria-hidden", "false");
    expect(btn).toHaveAttribute("tabindex", "0");
    expect(btn.className).toMatch(/\bvisible\b/);
  });

  it("scrolls to top instantly when the user prefers reduced motion", () => {
    setScrollY(1000);
    const scrollSpy = vi.fn();
    window.scrollTo = scrollSpy;
    // Reduced-motion path uses behavior: "auto", not "smooth".
    window.matchMedia = (q) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    });

    render(<BackToTop />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    // Button is visible after the scroll event flips state, so the default
    // role query works without { hidden: true }.
    const btn = screen.getByRole("button", { name: /back to top/i });
    btn.click();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: "auto" });
  });

  it("uses smooth scrolling when reduced motion is not preferred", () => {
    setScrollY(1000);
    const scrollSpy = vi.fn();
    window.scrollTo = scrollSpy;
    // Explicitly reset matchMedia in case a prior test in the file mutated
    // it to return matches=true for prefers-reduced-motion.
    window.matchMedia = (q) => ({
      matches: false,
      media: q,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    });

    render(<BackToTop />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    screen
      .getByRole("button", { name: /back to top/i })
      .click();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
