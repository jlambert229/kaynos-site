import { describe, it, expect } from "vitest";
import { homeJsonLd } from "../src/seo/homeJsonLd";
import { faqJsonLd } from "../src/seo/faqJsonLd";
import { pricingJsonLd } from "../src/seo/pricingJsonLd";
import { contactJsonLd } from "../src/seo/contactJsonLd";
import { faqs } from "../src/data/faqs";

describe("homeJsonLd", () => {
  it("declares schema.org WebSite with publisher Organization", () => {
    expect(homeJsonLd["@context"]).toBe("https://schema.org");
    expect(homeJsonLd["@type"]).toBe("WebSite");
    expect(homeJsonLd.publisher["@type"]).toBe("Organization");
  });

  it("publisher address has all PostalAddress fields populated", () => {
    const addr = homeJsonLd.publisher.address;
    expect(addr["@type"]).toBe("PostalAddress");
    for (const key of ["addressLocality", "addressRegion", "postalCode", "addressCountry"]) {
      expect(addr[key], `${key} should be a non-empty string`).toMatch(/.+/);
    }
  });

  it("url ends with a trailing slash (Google's preferred canonical form)", () => {
    expect(homeJsonLd.url).toMatch(/\/$/);
    expect(homeJsonLd.publisher.url).toMatch(/\/$/);
  });
});

describe("faqJsonLd", () => {
  it("declares schema.org FAQPage", () => {
    expect(faqJsonLd["@context"]).toBe("https://schema.org");
    expect(faqJsonLd["@type"]).toBe("FAQPage");
  });

  it("mainEntity matches the source faqs 1:1", () => {
    expect(faqJsonLd.mainEntity).toHaveLength(faqs.length);
    faqJsonLd.mainEntity.forEach((entry, i) => {
      expect(entry["@type"]).toBe("Question");
      expect(entry.name).toBe(faqs[i].question);
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      expect(entry.acceptedAnswer.text).toBe(faqs[i].answer);
    });
  });

  it("every Question has a non-empty answer (catches accidental blanks in faqs.js)", () => {
    for (const entry of faqJsonLd.mainEntity) {
      expect(entry.name.trim().length).toBeGreaterThan(0);
      expect(entry.acceptedAnswer.text.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("pricingJsonLd", () => {
  it("declares schema.org Product with one Offer", () => {
    expect(pricingJsonLd["@context"]).toBe("https://schema.org");
    expect(pricingJsonLd["@type"]).toBe("Product");
    expect(pricingJsonLd.offers).toHaveLength(1);
    expect(pricingJsonLd.offers[0]["@type"]).toBe("Offer");
  });

  it("offer fields are well-formed for Google Merchant rich results", () => {
    const offer = pricingJsonLd.offers[0];
    expect(offer.price).toMatch(/^\d+\.\d{2}$/);
    expect(offer.priceCurrency).toBe("USD");
    expect(offer.availability).toBe("https://schema.org/InStock");
    expect(offer.priceValidUntil).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("priceValidUntil is in the future relative to today", () => {
    const validUntil = new Date(pricingJsonLd.offers[0].priceValidUntil);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(validUntil.getTime()).toBeGreaterThanOrEqual(today.getTime());
  });
});

describe("contactJsonLd", () => {
  it("declares schema.org ContactPage", () => {
    expect(contactJsonLd["@context"]).toBe("https://schema.org");
    expect(contactJsonLd["@type"]).toBe("ContactPage");
  });

  it("exposes a customer-support ContactPoint with a parseable email", () => {
    const points = contactJsonLd.mainEntity.contactPoint;
    expect(Array.isArray(points)).toBe(true);
    expect(points.length).toBeGreaterThan(0);
    const support = points.find((p) => p.contactType === "customer support");
    expect(support).toBeDefined();
    expect(support.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
  });

  it("url points at /contact (canonical contact route)", () => {
    expect(contactJsonLd.url).toMatch(/\/contact$/);
  });
});
