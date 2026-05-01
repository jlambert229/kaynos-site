import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";
import { SITE_URL } from "../seo/constants";
import { BUSINESS_ADDRESS_LINE } from "../config/business";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "About Kaynos",
  url: `${SITE_URL}/about`,
};

export default function About() {
  return (
    <>
      <Seo
        title="About Kaynos"
        description="Kaynos is a private video review tool for BJJ coaches, built and run by one. Independent, self-funded, based in the United States."
        path="/about"
        jsonLd={aboutJsonLd}
      />
      <Navbar />
      <main id="main-content" className="about-main container">
        <div className="about-content">
          <div className="legal-meta">
            <Link to="/" className="legal-back">&larr; Back to home</Link>
          </div>
          <h1 className="about-title">About</h1>
          <p className="about-lead">
            Kaynos is a private video review tool for BJJ coaches, built
            by one. It&apos;s independent and self-funded — no investors, no
            growth team, no roadmap written by outsiders.
          </p>

          <section className="about-section">
            <h2>How it started</h2>
            <p className="about-text">
              Every coach I train with has at some point filmed a great
              roll, pointed at the phone, and said &ldquo;you have to see this
              sweep.&rdquo; Then the footage ends up in a group chat, buried
              under other messages, and the moment gets lost. I kept
              running into it and eventually built what I wanted: a place
              to upload video, drop timestamped notes, and share specific
              moments with specific students without any of it being
              public.
            </p>
          </section>

          <section className="about-section">
            <h2>Who&apos;s behind it</h2>
            <p className="about-text">
              One person. I use Kaynos for my own training, so when
              something is broken or missing I usually hear about it the
              same day. Founded in 2026. Based in {BUSINESS_ADDRESS_LINE}.
            </p>
          </section>

          <section className="about-section">
            <h2>Contact</h2>
            <p className="about-contact">
              General:{" "}
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
