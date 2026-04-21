// KAY-547: Domain references (security@kaynos.net) in this file are prose
// display text in legal copy, not navigable <a href> URLs.
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import CtaButton from "../components/CtaButton";
import { URLS } from "../config/urls";

export default function Security() {
  return (
    <>
      <Seo
        title="Security & Privacy"
        description="How Kaynos protects your data. Learn about our infrastructure, authentication, data isolation, and privacy practices."
        path="/security"
        jsonLd={{ "@context": "https://schema.org", "@type": "WebPage", name: "Security & Privacy", url: "https://www.kaynos.net/security" }}
      />
      <Navbar />
      <main className="security-main container">
        <div className="security-content">
          <span className="section-label">Trust</span>
          <h1 className="security-title">Security &amp; Privacy</h1>
          <p className="security-lead">How Kaynos protects your data.</p>

          <p className="security-intro">
            Kaynos stores coaching videos, timestamped notes, and the
            conversations between coaches and their clients. We treat that data
            the way you'd expect - encrypted, isolated per account, and never
            shared. Below are the specifics for anyone doing due diligence.
          </p>

          <section className="security-section">
            <h2>Infrastructure</h2>
            <p className="security-summary">Your data is hosted on trusted, enterprise-grade providers with built-in protection.</p>
            <ul className="security-list">
              <li>Application hosted on Netlify (global CDN, DDoS protection)</li>
              <li>Database on Neon (managed PostgreSQL with encryption at rest)</li>
              <li>Video storage on Backblaze B2 (S3-compatible, encrypted at rest)</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Authentication</h2>
            <p className="security-summary">Your login is protected by multiple layers of security so only you can access your account.</p>
            <ul className="security-list">
              <li>Passwords are hashed using bcrypt, a one-way encryption standard</li>
              <li>Your login session is secured with industry-standard encryption that prevents interception</li>
              <li>Rate-limited login endpoints to prevent brute force</li>
              <li>Token-based password reset via email</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Data Isolation</h2>
            <p className="security-summary">Your account is completely separate from every other coach's account. No one can see your data.</p>
            <ul className="security-list">
              <li>Each coaching business is a separate tenant</li>
              <li>Students only see their own sessions - enforced at the database query level</li>
              <li>Coaches see only their school's data</li>
              <li>No cross-tenant data access</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Privacy</h2>
            <p className="security-summary">We don't track you, and your data stays yours. Third-party services only process what's needed and don't store it.</p>
            <ul className="security-list">
              <li>No third-party analytics or tracking on the marketing site</li>
              <li>GDPR-ready: data export and deletion on request</li>
              <li>Voice transcription (our speech-to-text provider): audio is streamed, not stored</li>
              <li>AI video review (our AI analysis provider): requires explicit consent per use</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Transport Security</h2>
            <p className="security-summary">All connections are encrypted. Data cannot be intercepted between your device and our servers.</p>
            <ul className="security-list">
              <li>All connections are encrypted (TLS 1.2+ enforced)</li>
              <li>HSTS with 1-year max-age</li>
              <li>Strict Content Security Policy</li>
              <li>X-Frame-Options: DENY</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Contact</h2>
            <p className="security-contact">
              Security questions: <a href={URLS.security}>security@kaynos.net</a>
            </p>
            <p className="security-contact">
              Vulnerability reports: <a href={URLS.security}>security@kaynos.net</a>
            </p>
            <p className="security-contact">
              System status and uptime: <a href="/status">kaynos.net/status</a>
            </p>
          </section>

          <section className="security-section security-cta">
            <h2>Ready to try it?</h2>
            <CtaButton>Start 14-Day Trial</CtaButton>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
