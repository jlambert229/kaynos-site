import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";

export default function Security() {
  return (
    <>
      <Seo
        title="Security & Privacy"
        description="How Kaynos protects your data. Learn about our infrastructure, authentication, data isolation, and privacy practices."
        path="/security"
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
            <ul className="security-list">
              <li>Application hosted on Netlify (global CDN, DDoS protection)</li>
              <li>Database on Neon (managed PostgreSQL with encryption at rest)</li>
              <li>Video storage on Backblaze B2 (S3-compatible, encrypted at rest)</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Authentication</h2>
            <ul className="security-list">
              <li>Passwords hashed with bcrypt (cost factor 12)</li>
              <li>Sessions via JWT stored in HttpOnly, Secure, SameSite=Strict cookies</li>
              <li>Rate-limited login endpoints to prevent brute force</li>
              <li>Token-based password reset via email</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Data Isolation</h2>
            <ul className="security-list">
              <li>Each coaching business is a separate tenant</li>
              <li>Students only see their own sessions - enforced at the database query level</li>
              <li>Coaches see only their school's data</li>
              <li>No cross-tenant data access</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Privacy</h2>
            <ul className="security-list">
              <li>No third-party analytics or tracking on the marketing site</li>
              <li>GDPR-ready: data export and deletion on request</li>
              <li>Voice transcription (Deepgram): audio is streamed, not stored</li>
              <li>AI video review (Twelve Labs): requires explicit consent per use</li>
            </ul>
          </section>

          <section className="security-section">
            <h2>Transport Security</h2>
            <ul className="security-list">
              <li>TLS 1.2+ enforced on all connections</li>
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
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
