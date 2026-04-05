import { SITE_URL } from "./constants";

/** Product + Offer JSON-LD for pricing rich results. */
export const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kaynos",
  description:
    "Private video training platform for coaches. Upload session footage, add timestamped notes, and track client progress.",
  brand: {
    "@type": "Brand",
    name: "Kaynos",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Monthly",
      price: "49.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Full access. Unlimited clients and coaches, 100 video uploads, 50 GB storage. 14-day free trial.",
    },
    {
      "@type": "Offer",
      name: "Annual",
      price: "490.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Full access billed annually (save 17%). Unlimited clients and coaches, 100 video uploads, 50 GB storage. 14-day free trial.",
    },
  ],
};
