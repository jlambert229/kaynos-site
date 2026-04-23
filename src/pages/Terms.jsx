import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Terms of Service information for the Kaynos marketing site."
        path="/terms"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "Terms of Service", url: "https://www.kaynos.net/terms" }}
      />
      <Navbar />
      <main className="legal-main container">
        <article className="legal-article">
          <span className="section-label">Legal</span>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-lead">
            The Terms of Service for the Kaynos application are available at{" "}
            <a href={URLS.terms} target="_blank" rel="noopener noreferrer">
              app.kaynos.net/terms
            </a>
            . This marketing site (kaynos.net) is provided for informational purposes.
          </p>

          <section className="legal-section">
            <p>
              By using this marketing site, you agree to our{" "}
              <Link to="/privacy">Privacy Policy</Link> and accept that information
              you submit through forms is processed as described therein.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
