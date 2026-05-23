import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import Navbar from "../src/components/Navbar";
import { URLS } from "../src/config/urls";

beforeEach(() => {
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
});

afterEach(() => cleanup());

function renderNav(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Navbar />
    </MemoryRouter>,
  );
}

describe("<Navbar />", () => {
  it("renders the skip-to-content link first (a11y entry point)", () => {
    renderNav();
    const skip = screen.getByRole("link", { name: /skip to content/i });
    expect(skip).toHaveAttribute("href", "#main-content");
  });

  it("renders the brand link pointing at the home route", () => {
    renderNav();
    const brand = screen.getByRole("link", { name: /kaynos – home/i });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders the primary signup CTA tagged for Plausible", () => {
    renderNav();
    // There are two — one in the desktop bar, one in the mobile menu. Both
    // must point at the signup URL and both must carry the Plausible token,
    // otherwise the conversion stops being attributable.
    const signupLinks = screen
      .getAllByRole("link", { name: /start 14-day trial/i });
    expect(signupLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of signupLinks) {
      expect(link).toHaveAttribute("href", URLS.signup);
      expect(link.className).toMatch(/plausible-event-name=Signup\b/);
    }
  });

  it("opens and closes the mobile menu when the toggle is clicked", () => {
    renderNav();
    // The toggle and the in-menu close button both end up with the label
    // "Close menu" once the menu is open. Scope by class so the test only
    // exercises the toggle.
    const toggle = document.querySelector(".mobile-toggle");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-label", "Open menu");

    act(() => {
      fireEvent.click(toggle);
    });
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAttribute("aria-label", "Close menu");

    // Clicking the toggle again collapses it.
    act(() => {
      fireEvent.click(toggle);
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-label", "Open menu");
  });

  it("locks body scroll while the mobile menu is open", () => {
    renderNav();
    const toggle = document.querySelector(".mobile-toggle");
    act(() => {
      fireEvent.click(toggle);
    });
    expect(document.body.style.overflow).toBe("hidden");
    act(() => {
      fireEvent.click(toggle);
    });
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("marks /for/coaches as the current page when on that route", () => {
    renderNav(["/for/coaches"]);
    // Two anchors point at /for/coaches (desktop + mobile menu); both should
    // carry aria-current="page".
    const links = screen
      .getAllByRole("link", { name: /for coaches/i })
      .filter((a) => a.getAttribute("href") === "/for/coaches");
    expect(links.length).toBeGreaterThanOrEqual(1);
    for (const link of links) {
      expect(link).toHaveAttribute("aria-current", "page");
    }
  });
});
