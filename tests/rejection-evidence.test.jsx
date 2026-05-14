/**
 * Regression tests pinning protections that adversarial QA agents flagged
 * as "missing" when they were actually present. Each test corresponds to
 * one previously-rejected finding — if a future change breaks the
 * protection, the test fails loudly instead of silently re-introducing
 * the false-positive issue.
 *
 * See PR #87 description for the full disposition of all 30 findings.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import Newsletter from "../src/sections/Newsletter";
import Contact from "../src/pages/Contact";
import UseCases from "../src/sections/UseCases";

const __dirname = dirname(fileURLToPath(import.meta.url));
const stylesCss = readFileSync(resolve(__dirname, "..", "src", "styles.css"), "utf8");

// jsdom shims used across the suite.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  });
}
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  class StubObserver { observe() {} unobserve() {} disconnect() {} }
  window.IntersectionObserver = StubObserver;
}

afterEach(() => cleanup());

// Agent claim: Newsletter form can be submit-spammed by clicking faster
// than the response arrives. Reality: the submit button is disabled
// while status === "submitting".
describe("Newsletter — submit-spam protection (rejected agent finding)", () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

  it("disables the submit button while a request is in flight", async () => {
    let resolveFetch;
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () => new Promise((r) => { resolveFetch = r; }),
    );
    render(
      <HelmetProvider>
        <Newsletter />
      </HelmetProvider>,
    );
    const email = screen.getByLabelText(/email address/i);
    fireEvent.change(email, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    const btn = screen.getByRole("button", { name: /subscribe/i });
    expect(btn).not.toBeDisabled();
    await act(async () => {
      fireEvent.submit(email.closest("form"));
    });
    // The button text flips to "Subscribing…" AND the disabled attribute
    // is set — clicks during this window are inert.
    expect(btn).toBeDisabled();
    // Resolve the hung fetch so the test cleans up.
    resolveFetch(new Response("ok", { status: 200 }));
    await act(async () => { await Promise.resolve(); });
  });
});

// Agent claim: Contact form lets attackers submit >500-char messages by
// stripping the maxLength attribute via DevTools. Reality: handleSubmit
// runs validate() which checks form.message.length > MAX_MESSAGE
// against React state, which receives every onChange regardless of attr.
describe("Contact — message-length validation (rejected agent finding)", () => {
  it("rejects a 501-char message via validate(), not just the maxLength attr", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email");
    const msg = screen.getByLabelText("Message");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(email, { target: { value: "t@example.com" } });
    // Bypass the HTML maxLength by setting state directly via change event.
    fireEvent.change(msg, { target: { value: "x".repeat(501) } });
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("ok", { status: 200 }),
    );
    await act(async () => {
      fireEvent.submit(msg.closest("form"));
    });
    // validate() should have populated an error and NEVER called fetch.
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByText(/must be under 500 characters/i)).toBeInTheDocument();
  });
});

// Agent claim: Contact honeypot is "hidden via aria-hidden on the input
// only, not the wrapping div" — making the label read aloud. Reality:
// the aria-hidden attribute IS on the wrapping div and propagates to
// descendants per ARIA spec.
describe("Contact — honeypot accessibility (rejected agent finding)", () => {
  it("places aria-hidden on the wrapping div, not just the input", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const honeypotInput = document.getElementById("contact-phone-ext");
    expect(honeypotInput).toBeTruthy();
    // Walk up to the nearest aria-hidden ancestor — the wrapping div
    // should be it, not the input itself.
    const hiddenAncestor = honeypotInput.closest('[aria-hidden="true"]');
    expect(hiddenAncestor).toBeTruthy();
    expect(hiddenAncestor.tagName).toBe("DIV");
  });

  it("short-circuits the submit when a bot fills the honeypot", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email");
    const msg = screen.getByLabelText("Message");
    fireEvent.change(name, { target: { value: "Test" } });
    fireEvent.change(email, { target: { value: "t@example.com" } });
    fireEvent.change(msg, { target: { value: "hi" } });
    // Simulate a bot filling the honeypot.
    const honeypotInput = document.getElementById("contact-phone-ext");
    fireEvent.change(honeypotInput, { target: { value: "bot was here" } });
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("ok", { status: 200 }),
    );
    await act(async () => {
      fireEvent.submit(msg.closest("form"));
    });
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

// Agent claim: UseCases tab keyboard handling is broken — focus stays on
// the tab when it should move to the panel. Reality: this matches the
// W3C ARIA tabs spec exactly. Test the actual contract.
describe("UseCases — WAI-ARIA tabs pattern (rejected agent finding)", () => {
  it("moves focus to the next tab on ArrowRight (manual activation)", () => {
    render(<UseCases />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.length).toBeGreaterThan(1);
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].getAttribute("aria-selected")).toBe("true");
  });

  it("wraps to first tab on ArrowRight from the last tab", () => {
    render(<UseCases />);
    const tabs = screen.getAllByRole("tab");
    // Activate the last tab first; the handler keys off `active` state,
    // not just DOM focus, so a click is needed before the wrap-around.
    fireEvent.click(tabs[tabs.length - 1]);
    tabs[tabs.length - 1].focus();
    fireEvent.keyDown(tabs[tabs.length - 1], { key: "ArrowRight" });
    expect(document.activeElement).toBe(tabs[0]);
  });

  it("Home/End jump to first and last tabs", () => {
    render(<UseCases />);
    const tabs = screen.getAllByRole("tab");
    tabs[0].focus();
    fireEvent.keyDown(tabs[0], { key: "End" });
    expect(document.activeElement).toBe(tabs[tabs.length - 1]);
    // Activate the last tab first so currentIndex reflects it before Home.
    fireEvent.click(tabs[tabs.length - 1]);
    fireEvent.keyDown(tabs[tabs.length - 1], { key: "Home" });
    expect(document.activeElement).toBe(tabs[0]);
  });

  it("sets tabIndex=0 on the active tab and -1 on the rest (roving tabindex)", () => {
    render(<UseCases />);
    const tabs = screen.getAllByRole("tab");
    const active = tabs.find((t) => t.getAttribute("aria-selected") === "true");
    expect(active).toBeTruthy();
    expect(active.tabIndex).toBe(0);
    tabs.filter((t) => t !== active).forEach((t) => {
      expect(t.tabIndex).toBe(-1);
    });
  });
});

// Agent claims about prefers-reduced-motion (FAQ chevron, BackToTop FAB,
// reveal animations) all assumed a per-component override was missing.
// Reality: a universal rule at the bottom of styles.css neutralizes
// every animation and transition globally.
describe("CSS — universal prefers-reduced-motion rule (rejected agent findings)", () => {
  it("contains the universal reduce-motion block targeting all elements", () => {
    // The block matches *,*::before,*::after with transition-duration
    // and animation-duration both forced to 0.01ms !important.
    const reduceBlockRe =
      /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{[\s\S]*?\*\s*,\s*\*::before\s*,\s*\*::after\s*\{[\s\S]*?animation-duration:\s*0\.01ms\s*!important[\s\S]*?transition-duration:\s*0\.01ms\s*!important[\s\S]*?\}[\s\S]*?\}/;
    expect(reduceBlockRe.test(stylesCss)).toBe(true);
  });

  it("also disables scroll-behavior under the same rule", () => {
    const scrollRe =
      /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)\s*\{[\s\S]*?scroll-behavior:\s*auto\s*!important/;
    expect(scrollRe.test(stylesCss)).toBe(true);
  });
});

// Agent claim: feature-card lacks tap-feedback on mobile (no :active rule).
// Reality: a :active rule was already in place at the time of the audit.
describe("CSS — feature-card tap feedback (rejected agent finding)", () => {
  it("has a :active rule for press feedback on touch", () => {
    expect(/\.feature-card:active\s*\{[\s\S]*?transform:\s*translateY\(-2px\)/.test(stylesCss)).toBe(true);
  });
});

// Agent claim: mobile-toggle had no :focus-visible. This was a REAL finding
// addressed in this PR. Pin the fix so a future cleanup doesn't remove it.
describe("CSS — mobile-toggle focus ring (real finding, now pinned)", () => {
  it("has an explicit :focus-visible rule using --focus-ring", () => {
    expect(/\.mobile-toggle:focus-visible\s*\{[\s\S]*?box-shadow:\s*var\(--focus-ring\)/.test(stylesCss)).toBe(true);
  });
});

// iOS performance: the home-page hero screenshot is the LCP candidate, so
// prerender.jsx emits a <link rel="preload" as="image"> for it. These
// tests confirm the preload is in the home HTML only — non-home routes
// shouldn't preload an image they don't render. The build must have run
// for this to make sense; we tolerate a missing dist/ by skipping rather
// than failing the unit-test pass.
import { existsSync } from "node:fs";

describe("dist — LCP image preload (home only)", () => {
  const distHomeHtml = resolve(__dirname, "..", "dist", "index.html");
  const distContactHtml = resolve(__dirname, "..", "dist", "contact", "index.html");
  const skipIfNoBuild = existsSync(distHomeHtml) ? it : it.skip;

  skipIfNoBuild("home HTML preloads the coach screenshot with the correct attribute case", () => {
    const html = readFileSync(distHomeHtml, "utf8");
    expect(html).toMatch(
      /<link\s+rel="preload"\s+as="image"\s+href="\/app-coach-iphone-1x\.webp"\s+imagesrcset="[^"]+1x[^"]+2x[^"]*"\s+fetchpriority="high"/,
    );
  });

  skipIfNoBuild("non-home routes do not preload the home hero image", () => {
    if (!existsSync(distContactHtml)) return;
    const html = readFileSync(distContactHtml, "utf8");
    expect(html).not.toMatch(/<link[^>]+app-coach-iphone-1x\.webp[^>]+rel="preload"/);
    expect(html).not.toMatch(/rel="preload"[^>]+app-coach-iphone/);
  });
});

// iOS-developer audit findings. Each test pins a specific Mobile-Safari
// affordance so a refactor can't silently revert these protections.
describe("CSS — iOS Safari affordances (iOS audit findings, pinned)", () => {
  it("navbar height respects env(safe-area-inset-top) so content clears the notch", () => {
    expect(
      /\.navbar\s*\{[\s\S]*?height:\s*calc\(72px\s*\+\s*env\(safe-area-inset-top[\s\S]*?padding-top:\s*env\(safe-area-inset-top/.test(
        stylesCss,
      ),
    ).toBe(true);
  });

  it("footer bottom padding respects env(safe-area-inset-bottom) for the home indicator", () => {
    expect(
      /\.footer\s*\{[\s\S]*?padding:\s*64px\s*0\s*calc\(40px\s*\+\s*env\(safe-area-inset-bottom/.test(
        stylesCss,
      ),
    ).toBe(true);
  });

  it("primary buttons have a :active state to give tap feedback when tap-highlight is suppressed", () => {
    expect(/\.btn:active\s*\{[\s\S]*?transform:\s*scale\(0\.98\)/.test(stylesCss)).toBe(true);
    expect(/\.btn-primary:active\s*\{/.test(stylesCss)).toBe(true);
    expect(/\.btn-secondary:active\s*\{/.test(stylesCss)).toBe(true);
  });

  it("mobile-toggle and back-to-top have :active feedback", () => {
    expect(/\.mobile-toggle:active\s*\{/.test(stylesCss)).toBe(true);
    expect(/\.back-to-top:active\s*\{[\s\S]*?transform:\s*scale\(0\.96\)/.test(stylesCss)).toBe(true);
  });
});

// index.html iOS meta tags. Pinned via raw HTML read because Helmet
// doesn't render these in the SPA — they're build-time static.
describe("index.html — iOS Add-to-Home-Screen meta tags (iOS audit finding, pinned)", () => {
  const html = readFileSync(resolve(__dirname, "..", "index.html"), "utf8");

  it("declares apple-mobile-web-app-title for the home-screen label", () => {
    expect(/<meta\s+name="apple-mobile-web-app-title"\s+content="Kaynos"\s*\/?>/.test(html)).toBe(true);
  });
  it("opts into standalone launch mode (apple-mobile-web-app-capable)", () => {
    expect(/<meta\s+name="apple-mobile-web-app-capable"\s+content="yes"\s*\/?>/.test(html)).toBe(true);
  });
  it("sets a status-bar style compatible with viewport-fit=cover", () => {
    expect(
      /<meta\s+name="apple-mobile-web-app-status-bar-style"\s+content="black-translucent"\s*\/?>/.test(html),
    ).toBe(true);
  });
});

// Agent claim: navbar links had no active state for aria-current="page".
// Real finding — added in the UI/UX pass. Pin the selector + the
// underline-expansion behaviour so a future cleanup can't silently drop it.
describe("CSS — navbar active page indicator (real finding, now pinned)", () => {
  it("targets aria-current=page with primary text color", () => {
    expect(
      /\.navbar-links\s+(?:a|\.navbar-link)\[aria-current="page"\][\s\S]*?color:\s*var\(--text-primary\)/.test(
        stylesCss,
      ),
    ).toBe(true);
  });
  it("extends the underline pseudo-element to active links", () => {
    expect(
      /\.navbar-links\s+(?:a|\.navbar-link)\[aria-current="page"\]::after[\s\S]*?width:\s*100%/.test(
        stylesCss,
      ),
    ).toBe(true);
  });
  it("also highlights aria-current=page in the mobile menu", () => {
    expect(
      /\.mobile-menu\s+a\[aria-current="page"\][\s\S]*?color:\s*var\(--accent\)/.test(stylesCss),
    ).toBe(true);
  });
});
