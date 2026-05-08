import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import "@testing-library/jest-dom/vitest";

import DemoLink from "../src/components/DemoLink";
import Newsletter from "../src/sections/Newsletter";
import { URLS } from "../src/config/urls";

// jsdom doesn't ship matchMedia; useScrollReveal calls it on mount inside
// any component that uses scroll reveal (Newsletter does). Default to "no
// preference" so the hook proceeds with its IntersectionObserver path.
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
  class StubObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.IntersectionObserver = StubObserver;
}

afterEach(() => cleanup());

describe("<DemoLink />", () => {
  it("defaults to the coach demo and tags the click for Plausible", () => {
    render(<DemoLink>See a demo</DemoLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", URLS.demoCoach);
    expect(link.className).toMatch(/plausible-event-name=Demo\+Coach/);
  });

  it("routes to the student demo when which='student'", () => {
    render(<DemoLink which="student">student demo</DemoLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", URLS.demoStudent);
    expect(link.className).toMatch(/plausible-event-name=Demo\+Student/);
  });

  it("opens in a new tab and announces the new-tab hint to screen readers", () => {
    render(<DemoLink>open</DemoLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.querySelector(".sr-only")).toHaveTextContent("opens in new tab");
  });

  it("can render as a same-tab link when newTab=false", () => {
    render(<DemoLink newTab={false}>inline</DemoLink>);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
    expect(link.querySelector(".sr-only")).toBeNull();
  });

  it("preserves the caller's className alongside the analytics class", () => {
    render(<DemoLink className="btn btn-secondary">styled</DemoLink>);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/\bbtn\b/);
    expect(link.className).toMatch(/\bbtn-secondary\b/);
    expect(link.className).toMatch(/plausible-event-name=Demo\+Coach/);
  });
});

describe("<Newsletter /> error handling", () => {
  function renderNewsletter() {
    return render(
      <HelmetProvider>
        <Newsletter />
      </HelmetProvider>,
    );
  }

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("keeps the error visible after a failed submit (no auto-clear)", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("nope", { status: 500 }),
    );
    renderNewsletter();
    const email = screen.getByLabelText(/email address/i);
    fireEvent.change(email, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    await act(async () => {
      fireEvent.submit(email.closest("form"));
    });
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Previously a 5s timeout cleared the status — that path only existed
    // for success; the error should persist. Advance ample time to be sure.
    await act(async () => {
      vi.advanceTimersByTime(10_000);
    });
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("clears the error once the user starts editing the email field again", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("nope", { status: 500 }),
    );
    renderNewsletter();
    const email = screen.getByLabelText(/email address/i);
    fireEvent.change(email, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    await act(async () => {
      fireEvent.submit(email.closest("form"));
    });
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    fireEvent.change(email, { target: { value: "user2@example.com" } });
    expect(screen.queryByText(/something went wrong/i)).toBeNull();
  });

  it("aborts a hung submit via AbortController so the form never strands in 'submitting'", async () => {
    // Capture the AbortSignal the component passes to fetch and resolve only
    // when the signal fires. This proves the timeout path actually triggers
    // an abort instead of waiting on the network forever.
    let capturedSignal;
    vi.spyOn(globalThis, "fetch").mockImplementation((_url, init) => {
      capturedSignal = init?.signal;
      return new Promise((_resolve, reject) => {
        capturedSignal?.addEventListener("abort", () => {
          reject(new DOMException("aborted", "AbortError"));
        });
      });
    });

    renderNewsletter();
    const email = screen.getByLabelText(/email address/i);
    fireEvent.change(email, { target: { value: "user@example.com" } });
    fireEvent.click(screen.getByRole("checkbox"));
    await act(async () => {
      fireEvent.submit(email.closest("form"));
    });
    expect(capturedSignal).toBeDefined();
    expect(capturedSignal.aborted).toBe(false);

    // Drain the 15s abort timer — the catch branch should run and surface the
    // generic error message rather than leaving the button disabled forever.
    await act(async () => {
      vi.advanceTimersByTime(15_000);
    });
    expect(capturedSignal.aborted).toBe(true);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
