import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import CtaButton from "../src/components/CtaButton";
import { URLS } from "../src/config/urls";

afterEach(() => cleanup());

describe("<CtaButton />", () => {
  it("renders an anchor pointing at the signup URL", () => {
    render(<CtaButton>Start 14-Day Trial</CtaButton>);
    const link = screen.getByRole("link", { name: /start 14-day trial/i });
    expect(link).toHaveAttribute("href", URLS.signup);
  });

  it("tags the click for Plausible via the className token", () => {
    // Plausible reads `plausible-event-name=<Event>` from the className.
    // Drifting that token name silently breaks analytics on every Signup
    // CTA across the site, so the contract gets a unit test.
    render(<CtaButton>Sign up</CtaButton>);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/plausible-event-name=Signup\b/);
  });

  it("uses the default primary button styling when no className is provided", () => {
    render(<CtaButton>default</CtaButton>);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/\bbtn\b/);
    expect(link.className).toMatch(/\bbtn-primary\b/);
    expect(link.className).toMatch(/\bbtn-lg\b/);
  });

  it("preserves a caller-supplied className alongside the analytics token", () => {
    render(<CtaButton className="btn btn-secondary">styled</CtaButton>);
    const link = screen.getByRole("link");
    expect(link.className).toMatch(/\bbtn-secondary\b/);
    expect(link.className).toMatch(/plausible-event-name=Signup\b/);
  });

  it("renders arbitrary children (icon + label patterns used on the pricing card)", () => {
    render(
      <CtaButton>
        <span data-testid="icon">*</span>
        Start trial
      </CtaButton>,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveTextContent(/start trial/i);
  });
});
