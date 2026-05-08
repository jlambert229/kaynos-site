import { SITE_URL } from "./constants";

/**
 * ContactPage JSON-LD: helps search engines surface Kaynos as the canonical
 * place to reach support. The single ContactPoint advertises customer-support
 * via email; we don't list a phone number because we don't have one.
 */
export const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Kaynos",
  url: `${SITE_URL}/contact`,
  description:
    "Reach Kaynos support for questions, feedback, or a walkthrough.",
  mainEntity: {
    "@type": "Organization",
    name: "Kaynos",
    url: `${SITE_URL}/`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@kaynos.net",
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
  },
};
