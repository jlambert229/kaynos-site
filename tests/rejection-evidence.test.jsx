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
