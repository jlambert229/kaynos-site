import { SITE_URL } from "./constants";

export const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kaynos",
  description:
    "Private video review platform for coaches. $50/mo. First 3 client seats included. $5/mo per additional active seat. Clients use it free.",
  brand: {
    "@type": "Brand",
    name: "Kaynos",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Coach Plan",
      price: "50.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Coach plan. All features included. First 3 client seats included. $5/mo per additional active seat. Clients access for free. 14-day trial, card on file.",
    },
  ],
};
