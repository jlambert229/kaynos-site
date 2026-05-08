import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import Hero from "../src/sections/Hero";
import Pricing from "../src/sections/Pricing";
import FAQ from "../src/sections/FAQ";
import Comparison from "../src/sections/Comparison";
import { faqs } from "../src/data/faqs";
import { COACH_FEATURES, FMT } from "../src/config/pricing";
import { comparisonColumns, comparisonFeatures } from "../src/data/competitors";

/* useScrollReveal calls window.matchMedia and constructs IntersectionObserver.
   jsdom doesn't ship either; stub them so render() doesn't blow up. The hook's
   own coverage lives in tests/useScrollReveal.test.jsx — here we just need
   the sections to mount. */
beforeEach(() => {
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
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterEach(() => cleanup());

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("<Hero />", () => {
  it("renders the marketing H1 and the primary CTA", () => {
    renderWithRouter(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/BJJ coaches/i);
    expect(screen.getByRole("link", { name: /start.*trial/i })).toBeInTheDocument();
  });

  it("links to the demo and pricing anchors", () => {
    renderWithRouter(<Hero />);
    expect(screen.getByRole("link", { name: /see a demo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /see pricing/i })).toHaveAttribute("href", "#pricing");
  });
});

describe("<Pricing />", () => {
  it("renders the coach price and the feature list", () => {
    renderWithRouter(<Pricing />);
    expect(screen.getByText(FMT.coachMonthly)).toBeInTheDocument();
    // Every COACH_FEATURE shows up as a list item.
    for (const feature of COACH_FEATURES) {
      expect(screen.getByText(feature)).toBeInTheDocument();
    }
  });
});

describe("<FAQ />", () => {
  it("renders one toggle per FAQ in the data source", () => {
    renderWithRouter(<FAQ />);
    for (const faq of faqs) {
      const button = screen.getByRole("button", { name: faq.question });
      expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });
});

describe("<Comparison />", () => {
  it("renders the kaynos column header and every feature row name", () => {
    renderWithRouter(<Comparison />);
    const kaynos = comparisonColumns.find((c) => c.key === "kaynos");
    expect(kaynos).toBeDefined();
    expect(screen.getByText(kaynos.label)).toBeInTheDocument();
    for (const feature of comparisonFeatures) {
      expect(screen.getByText(feature.name)).toBeInTheDocument();
    }
  });
});
