import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import KaynosLogo from "../src/components/KaynosLogo";

afterEach(() => cleanup());

describe("<KaynosLogo />", () => {
  it("renders an SVG with role='img' and an accessible label", () => {
    render(<KaynosLogo />);
    const svg = screen.getByRole("img", { name: /kaynos logo/i });
    expect(svg.tagName.toLowerCase()).toBe("svg");
  });

  it("defaults to size='md' (24px tall)", () => {
    render(<KaynosLogo />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "24");
    expect(svg).toHaveClass("kaynos-logo--md");
  });

  it("respects the size='sm' prop", () => {
    render(<KaynosLogo size="sm" />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "20");
    expect(svg).toHaveClass("kaynos-logo--sm");
  });

  it("respects the size='lg' prop", () => {
    render(<KaynosLogo size="lg" />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "32");
    expect(svg).toHaveClass("kaynos-logo--lg");
  });

  it("respects the size='nav' prop", () => {
    render(<KaynosLogo size="nav" />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "28");
  });

  it("respects the size='hero' prop", () => {
    render(<KaynosLogo size="hero" />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "72");
  });

  it("falls back to medium size when given an unknown size value", () => {
    render(<KaynosLogo size="bogus" />);
    const svg = screen.getByRole("img");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("preserves the SVG aspect ratio when scaling height", () => {
    render(<KaynosLogo size="lg" />);
    const svg = screen.getByRole("img");
    // h=32, w = round(32 * 185/191) = round(31.0) = 31
    expect(svg).toHaveAttribute("height", "32");
    expect(svg).toHaveAttribute("width", "31");
    expect(svg).toHaveAttribute("viewBox", "0 0 185 191");
  });

  it("applies the color prop to all path fills", () => {
    render(<KaynosLogo color="#ff0000" />);
    const svg = screen.getByRole("img");
    const paths = svg.querySelectorAll("path");
    expect(paths).toHaveLength(3);
    for (const p of paths) {
      expect(p).toHaveAttribute("fill", "#ff0000");
    }
  });
});
