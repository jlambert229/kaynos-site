import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import CtaButton from "../components/CtaButton";
import { URLS } from "../config/urls";

export default function Accessibility() {
  return (
    <>
      <Seo title="Accessibility Statement" description="Kaynos is committed to making our website and platform accessible to everyone. Learn about our WCAG 2.1 Level AA commitment." path="/accessibility" />
      <Navbar />
      <main className="legal-main container">
        <article className="legal-article">
          <div className="legal-meta">
            <a href="/" className="legal-back">&larr; Back to home</a>
          </div>
          <h1 className="legal-title">Accessibility Statement</h1>
          <p className="legal-effective">Last updated: April 2026</p>

          <p className="legal-lead">
            Kaynos is committed to making our website and platform accessible to everyone, including people with disabilities.
          </p>

          <div className="legal-section">
            <h2>Our commitment</h2>
            <p>We strive to meet WCAG 2.1 Level AA standards across our website and application. This includes:</p>
            <ul>
              <li>Keyboard-navigable interface with visible focus indicators</li>
              <li>Screen reader compatible markup with proper ARIA labels</li>
              <li>Sufficient color contrast ratios for text readability</li>
              <li>Respecting user motion preferences (prefers-reduced-motion)</li>
              <li>Responsive design that works on all screen sizes</li>
              <li>Skip-to-content links for keyboard users</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>Ongoing improvements</h2>
            <p>Accessibility is an ongoing effort. We regularly audit our site and app for accessibility issues and address them in our development process.</p>
          </div>

          <div className="legal-section">
            <h2>Feedback</h2>
            <p>If you encounter any accessibility barriers or have suggestions for improvement, please contact us at <a href={URLS.support}>support@kaynos.net</a>. We take all feedback seriously and will work to resolve issues promptly.</p>
          </div>

          <div className="legal-section legal-cta">
            <h2>Ready to try it?</h2>
            <CtaButton>Start 14-Day Trial</CtaButton>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
