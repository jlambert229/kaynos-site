import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

export default function About() {
  return (
    <>
      <Seo
        title="About Kaynos"
        description="Kaynos is a private video review platform for coaches. Built by a coach, for coaches."
        path="/about"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "About Kaynos", url: "https://www.kaynos.net/about" }}
      />
      <Navbar />
      <main className="security-main container">
        <div className="security-content">
          <span className="section-label">Company</span>
          <h1 className="security-title">About Kaynos</h1>
          <p className="security-lead">
            Kaynos is a private video review platform for coaches. Built by a
            coach, for coaches.
          </p>

          <section className="about-section">
            <h2>The problem</h2>
            <p className="about-text">
              Coaches lose footage in text threads. Feedback gets disconnected
              from the video it refers to. Important moments slip away because
              there is no simple way to pin a note to a specific timestamp and
              share it privately with a client.
            </p>
          </section>

          <section className="about-section">
            <h2>The product</h2>
            <p className="about-text">
              Upload video. Pin timestamped notes at the exact moments that
              matter. Share privately with your clients so they can review on
              their own time. AI assists by flagging key timestamps so you spend
              less time scrubbing through footage.
            </p>
          </section>

          <section className="about-section">
            <h2>The company</h2>
            <p className="about-text">
              Independent and self-funded. Founded in 2026. Based in the United
              States.
            </p>
          </section>

          <section className="about-section">
            <h2>Contact</h2>
            <p className="about-contact">
              General inquiries:{" "}
              <a href={URLS.support}>support@kaynos.net</a>
            </p>
            <p className="about-contact">
              Security:{" "}
              <a href={URLS.security}>security@kaynos.net</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
