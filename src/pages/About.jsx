import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

export default function About() {
  return (
    <>
      <Seo
        title="About Kaynos"
        description="Kaynos is a private video review tool for BJJ coaches, built and run by one. Independent, self-funded, based in the United States."
        path="/about"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "About Kaynos", url: "https://www.kaynos.net/about" }}
      />
      <Navbar />
      <main className="about-main container">
        <div className="about-content">
          <h1 className="about-title">About</h1>
          <p className="about-lead">
            Kaynos is a private video review tool for BJJ coaches, built
            by one. It's independent and self-funded — no investors, no
            growth team, no roadmap written by outsiders.
          </p>

          <section className="about-section">
            <h2>How it started</h2>
            <p className="about-text">
              Every coach I train with has at some point filmed a great
              roll, pointed at the phone, and said "you have to see this
              sweep." Then the footage ends up in a group chat, buried
              under other messages, and the moment gets lost. I kept
              running into it and eventually built what I wanted: a place
              to upload video, drop timestamped notes, and share specific
              moments with specific students without any of it being
              public.
            </p>
          </section>

          <section className="about-section">
            <h2>Who's behind it</h2>
            <p className="about-text">
              One person. I use Kaynos for my own training, so when
              something is broken or missing I usually hear about it the
              same day. Founded in 2026, based in the United States.
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
