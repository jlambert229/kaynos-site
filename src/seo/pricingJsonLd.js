import { SITE_URL } from "./constants";
import { COACH_MONTHLY_PRICE, PLAN_NAME, PRICING_COPY } from "../config/pricing";

/**
 * Compute priceValidUntil as end-of-current-quarter at build time.
 * Quarters: Q1 = Mar 31, Q2 = Jun 30, Q3 = Sep 30, Q4 = Dec 31.
 */
function endOfCurrentQuarter() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based
  const quarterEnd = [
    new Date(year, 2, 31),  // Q1: Jan-Mar  -> Mar 31
    new Date(year, 5, 30),  // Q2: Apr-Jun  -> Jun 30
    new Date(year, 8, 30),  // Q3: Jul-Sep  -> Sep 30
    new Date(year, 11, 31), // Q4: Oct-Dec  -> Dec 31
  ];
  const qi = Math.floor(month / 3);
  return quarterEnd[qi].toISOString().split("T")[0];
}

export const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kaynos",
  description: PRICING_COPY.jsonLdProductDesc,
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
      priceValidUntil: endOfCurrentQuarter(),
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description: PRICING_COPY.jsonLdOfferDesc,
    },
  ],
};
