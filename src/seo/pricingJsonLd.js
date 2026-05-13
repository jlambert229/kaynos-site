import { SITE_URL, OG_SHARE_URL } from "./constants";
import { COACH_MONTHLY_PRICE, PLAN_NAME, PRICING_COPY } from "../config/pricing";

/**
 * Compute priceValidUntil ~12 months from the build date.
 *
 * Google's rich-results validator rejects offer schemas whose
 * priceValidUntil is in the past. The previous end-of-quarter horizon
 * would silently expire if a deploy slipped past a quarter boundary.
 * A year out gives plenty of buffer; pricing changes roll a fresh
 * schema on the next deploy.
 *
 * Snaps to the last day of the month so the value is stable across
 * multiple builds in the same calendar month.
 */
function priceValidThrough() {
  const now = new Date();
  // Day 0 of (month + 13) = last day of (month + 12). Handles year rollover.
  const end = new Date(now.getFullYear(), now.getMonth() + 13, 0);
  return end.toISOString().split("T")[0];
}

export const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kaynos",
  description: PRICING_COPY.jsonLdProductDesc,
  image: OG_SHARE_URL,
  brand: {
    "@type": "Brand",
    name: "Kaynos",
  },
  offers: [
    {
      "@type": "Offer",
      name: PLAN_NAME,
      price: `${COACH_MONTHLY_PRICE}.00`,
      priceCurrency: "USD",
      priceValidUntil: priceValidThrough(),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description: PRICING_COPY.jsonLdOfferDesc,
    },
  ],
};
