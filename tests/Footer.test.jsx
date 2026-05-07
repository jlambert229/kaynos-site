import { describe, it, expect, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

import Footer from "../src/components/Footer";
import { URLS } from "../src/config/urls";

afterEach(() => cleanup());

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  );
}

describe("<Footer />", () => {
  it("renders the three primary link sections (Product, Resources, Legal)", () => {
    renderFooter();
    expect(screen.getByRole("heading", { name: "Product" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Resources" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Legal" })).toBeInTheDocument();
  });

  it("renders the brand tagline", () => {
    renderFooter();
    expect(screen.getByText(/video review for bjj coaches/i)).toBeInTheDocument();
  });

  it("renders the social links with target=_blank and rel=noopener noreferrer", () => {
    renderFooter();
    for (const label of ["Instagram", "Facebook", "X"]) {
      const link = screen.getByLabelText(label);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("uses the centralized URLS config for socials", () => {
    renderFooter();
    expect(screen.getByLabelText("Instagram")).toHaveAttribute("href", URLS.instagram);
    expect(screen.getByLabelText("Facebook")).toHaveAttribute("href", URLS.facebook);
    expect(screen.getByLabelText("X")).toHaveAttribute("href", URLS.twitter);
  });

  it("marks demo links as external (target=_blank, rel=noopener noreferrer)", () => {
    renderFooter();
    const coach = screen.getByRole("link", { name: "Coach Demo" });
    const student = screen.getByRole("link", { name: "Student Demo" });
    for (const link of [coach, student]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    expect(coach).toHaveAttribute("href", URLS.demoCoach);
    expect(student).toHaveAttribute("href", URLS.demoStudent);
  });

  it("marks the Help Center link as external", () => {
    renderFooter();
    const help = screen.getByRole("link", { name: "Help Center" });
    expect(help).toHaveAttribute("target", "_blank");
    expect(help).toHaveAttribute("rel", "noopener noreferrer");
    expect(help).toHaveAttribute("href", URLS.helpCenter);
  });

  it("does not put internal links into a new tab", () => {
    renderFooter();
    // Pricing is an internal hash link; About is an internal route.
    const pricing = screen.getByRole("link", { name: "Pricing" });
    const about = screen.getByRole("link", { name: "About" });
    expect(pricing).not.toHaveAttribute("target");
    expect(about).not.toHaveAttribute("target");
  });

  it("renders the current year in the copyright line", () => {
    renderFooter();
    const year = String(new Date().getFullYear());
    const copy = screen.getByText((content, node) => {
      if (!node) return false;
      const text = node.textContent || "";
      return (
        node.classList?.contains("footer-copyright") &&
        text.includes(year) &&
        /Kaynos/i.test(text)
      );
    });
    expect(copy).toBeInTheDocument();
  });

  it("groups the right number of links under each section", () => {
    renderFooter();
    // Sanity-check the link counts so accidental drops/adds get caught.
    const product = screen.getByRole("heading", { name: "Product" }).parentElement;
    const resources = screen.getByRole("heading", { name: "Resources" }).parentElement;
    const legal = screen.getByRole("heading", { name: "Legal" }).parentElement;
    expect(within(product).getAllByRole("link")).toHaveLength(6);
    expect(within(resources).getAllByRole("link")).toHaveLength(7);
    expect(within(legal).getAllByRole("link")).toHaveLength(5);
  });
});
