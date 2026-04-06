import { SITE_URL } from "./constants";

export const pricingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kaynos",
  description:
    "Video review platform for coaches. Clients get feedback tools, and every active client lowers your monthly cost by $10.",
  brand: {
    "@type": "Brand",
    name: "Kaynos",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Coach Monthly",
      price: "49.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Coach plan. First 3 clients free. $10/mo credit per paid client. 100 video uploads, 50 GB storage. 14-day free trial.",
    },
    {
      "@type": "Offer",
      name: "Coach Annual",
      price: "488.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Coach plan billed annually (save 17%). First 3 clients free. $120/yr credit per paid client. 14-day free trial.",
    },
    {
      "@type": "Offer",
      name: "Client Monthly",
      price: "49.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Client plan. Watch sessions, add notes, track progress. First 3 clients per coach are free.",
    },
    {
      "@type": "Offer",
      name: "Client Annual",
      price: "488.00",
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/`,
      description:
        "Client plan billed annually (save 17%). Watch sessions, add notes, track progress.",
    },
  ],
};
