import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, cleanup, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import useScrollReveal from "../src/hooks/useScrollReveal";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// jsdom doesn't ship matchMedia / IntersectionObserver. We control them per
// test rather than installing global stubs so we can verify hook branches.

function makeMatchMedia({ reduced = false } = {}) {
  return (query) => ({
    matches: query.includes("prefers-reduced-motion") ? reduced : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  });
}

function makeIOClass({ entries }) {
  // entries is the entry-list invoked synchronously on observe() — useful
  // when we want to simulate "not intersecting then intersecting later".
  const instances = [];
  class IO {
    constructor(cb, options) {
      this.cb = cb;
      this.options = options;
      this.observed = [];
      this.disconnected = false;
      this.unobserved = [];
      instances.push(this);
    }
    observe(el) {
      this.observed.push(el);
      // Default: do nothing — let test trigger via instance.cb([entry])
      if (entries === "intersect-immediately") {
        this.cb([{ isIntersecting: true, target: el }], this);
      }
    }
    unobserve(el) {
      this.unobserved.push(el);
    }
    disconnect() {
      this.disconnected = true;
    }
  }
  IO._instances = instances;
  return IO;
}

function TestComponent({ style }) {
  const ref = useScrollReveal();
  return <div data-testid="reveal-target" ref={ref} style={style} />;
}

describe("useScrollReveal", () => {
  beforeEach(() => {
    window.matchMedia = makeMatchMedia();
  });

  it("reveals immediately when the element is initially in the viewport", () => {
    // Stub IO — should NOT be used because the early-return path handles it.
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;

    // Force getBoundingClientRect to report the element is on screen.
    const origRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 100, bottom: 200, left: 0, right: 100, width: 100, height: 100, x: 0, y: 100, toJSON: () => ({}) };
    };

    try {
      const { getByTestId } = render(<TestComponent />);
      const el = getByTestId("reveal-target");
      expect(el).toHaveClass("revealed");
      // No observer should have been constructed for the in-viewport path.
      expect(IO._instances).toHaveLength(0);
    } finally {
      Element.prototype.getBoundingClientRect = origRect;
    }
  });

  it("reveals immediately when prefers-reduced-motion is set", () => {
    window.matchMedia = makeMatchMedia({ reduced: true });
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;

    const { getByTestId } = render(<TestComponent />);
    const el = getByTestId("reveal-target");
    expect(el).toHaveClass("revealed");
    // Reduced-motion path also short-circuits before constructing IO.
    expect(IO._instances).toHaveLength(0);
  });

  it("uses IntersectionObserver and adds 'revealed' when entry intersects", () => {
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;

    // Force element off-screen so it takes the IO branch.
    const origRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 5000, bottom: 5100, left: 0, right: 100, width: 100, height: 100, x: 0, y: 5000, toJSON: () => ({}) };
    };

    try {
      const { getByTestId } = render(<TestComponent />);
      const el = getByTestId("reveal-target");
      expect(el).not.toHaveClass("revealed");
      expect(IO._instances).toHaveLength(1);
      const inst = IO._instances[0];
      expect(inst.observed).toContain(el);

      act(() => {
        inst.cb([{ isIntersecting: true, target: el }], inst);
      });
      expect(el).toHaveClass("revealed");
      // After intersecting, hook calls observer.unobserve(el) to stop watching.
      expect(inst.unobserved).toContain(el);
    } finally {
      Element.prototype.getBoundingClientRect = origRect;
    }
  });

  it("does not reveal when observer fires with isIntersecting=false", () => {
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;
    const origRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 5000, bottom: 5100, left: 0, right: 100, width: 100, height: 100, x: 0, y: 5000, toJSON: () => ({}) };
    };
    try {
      const { getByTestId } = render(<TestComponent />);
      const el = getByTestId("reveal-target");
      const inst = IO._instances[0];
      act(() => {
        inst.cb([{ isIntersecting: false, target: el }], inst);
      });
      expect(el).not.toHaveClass("revealed");
    } finally {
      Element.prototype.getBoundingClientRect = origRect;
    }
  });

  it("disconnects the observer on unmount (cleanup)", () => {
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;
    const origRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 5000, bottom: 5100, left: 0, right: 100, width: 100, height: 100, x: 0, y: 5000, toJSON: () => ({}) };
    };
    try {
      const { unmount } = render(<TestComponent />);
      const inst = IO._instances[0];
      expect(inst.disconnected).toBe(false);
      unmount();
      expect(inst.disconnected).toBe(true);
    } finally {
      Element.prototype.getBoundingClientRect = origRect;
    }
  });

  it("passes through custom IntersectionObserver options (merged with default threshold)", () => {
    const IO = makeIOClass({});
    window.IntersectionObserver = IO;
    const origRect = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function () {
      return { top: 5000, bottom: 5100, left: 0, right: 100, width: 100, height: 100, x: 0, y: 5000, toJSON: () => ({}) };
    };

    function CustomOptionsComponent() {
      const ref = useScrollReveal({ threshold: 0.5, rootMargin: "100px" });
      return <div data-testid="reveal-target" ref={ref} />;
    }

    try {
      render(<CustomOptionsComponent />);
      const inst = IO._instances[0];
      // Caller-supplied options win (they spread after the default).
      expect(inst.options.threshold).toBe(0.5);
      expect(inst.options.rootMargin).toBe("100px");
    } finally {
      Element.prototype.getBoundingClientRect = origRect;
    }
  });
});
