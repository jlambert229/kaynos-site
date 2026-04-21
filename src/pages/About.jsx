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
      <main className="about-main container">
        <div className="about-content">
          <span className="section-label">Company</span>
          <h1 className="about-title">About Kaynos</h1>
          <p className="about-lead">
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
              Upload sparring and class footage. AI places timestamped
              placeholders at moments worth reviewing. Pin your own notes
              at the exact moments that matter and share privately with
              your students so they can review between classes.
            </p>
          </section>

          <section className="about-section">
            <h2>Who's behind it</h2>
            <p className="about-text">
              One person. Independent and self-funded. I use Kaynos myself —
              if something's broken or missing, I hear about it fast. Founded
              in 2026, based in the United States.
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
