import { Link } from "react-router-dom";
import LegalLayout from "../components/LegalLayout";
import { URLS } from "../config/urls";
import { SITE_URL } from "../seo/constants";

const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description: "Terms of Service for the Kaynos marketing site.",
  url: `${SITE_URL}/terms`,
};

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Service"
      description="Terms of Service information for the Kaynos marketing site."
      path="/terms"
      jsonLd={termsJsonLd}
      eyebrow="Legal"
      heading="Terms of Service"
      lead={
        <>
          The Terms of Service for the Kaynos application are available at{" "}
          <a href={URLS.terms} target="_blank" rel="noopener noreferrer">
            app.kaynos.net/terms
          </a>
          . This marketing site (kaynos.net) is provided for informational purposes.
        </>
      }
    >
      <section className="legal-section">
        <p>
          By using this marketing site, you agree to our{" "}
          <Link to="/privacy">Privacy Policy</Link> and accept that information
          you submit through forms is processed as described therein.
        </p>
      </section>
    </LegalLayout>
  );
}
