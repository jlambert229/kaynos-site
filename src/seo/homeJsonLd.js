import { SITE_URL, SEO_DEFAULT_DESCRIPTION } from "./constants";
import { BUSINESS } from "../config/business";

/** JSON-LD for the marketing homepage (WebSite + publisher Organization). */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kaynos",
  url: `${SITE_URL}/`,
  description: SEO_DEFAULT_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: BUSINESS.name,
    url: `${SITE_URL}/`,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
  },
};
