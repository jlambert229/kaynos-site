import { SITE_URL, SEO_DEFAULT_DESCRIPTION } from "./constants";

/** JSON-LD for the marketing homepage (WebSite + publisher Organization). */
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Kaynos",
  url: `${SITE_URL}/`,
  description: SEO_DEFAULT_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: "Kaynos",
    url: `${SITE_URL}/`,
  },
};
