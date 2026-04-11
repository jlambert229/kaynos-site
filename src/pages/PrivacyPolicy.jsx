// KAY-547: Domain references (kaynos.net, app.kaynos.net, support@kaynos.net)
// in this file are prose display text in legal copy, not navigable <a href> URLs.
// They are intentionally hardcoded strings, not sourced from URLS config.
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { URLS } from "../config/urls";

const effectiveDate = "April 9, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Kaynos Privacy Policy: how we collect, use, disclose, and protect personal information when you use our video review and training platform."
        path="/privacy"
      />
      <Navbar />
      <main id="main-content" className="legal-main">
        <article className="container legal-article">
          <p className="legal-meta">
            <Link to="/" className="legal-back">
              ← Back to home
            </Link>
          </p>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-effective">Effective date: {effectiveDate}</p>

          <p className="legal-lead">
            This Privacy Policy describes how Kaynos (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, and shares personal information when you visit
            our marketing website at kaynos.net. It applies to visitors from any jurisdiction.
            This page does not constitute legal advice.
          </p>

          <section className="legal-section">
            <h2>1. Scope</h2>
            <p>
              This policy applies to information collected through this marketing site. If you
              use the Kaynos web application (app.kaynos.net), that experience is governed by
              our{" "}
              <Link to="/data-use">Data Use Policy</Link> and our{" "}
              <a href={URLS.terms} target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>. When you click through from this marketing site to the application, the
              applicable policy is the one linked from the product you are using.
            </p>
          </section>

          <section className="legal-section">
            <h2>1A. Data Controller</h2>
            <p>
              Kaynos is the data controller for personal information collected through this
              site. Contact:{" "}
              <a href={URLS.support}>support@kaynos.net</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Information we collect</h2>
            <p>We may collect the following categories of information:</p>
            <ul>
              <li>
                <strong>Identifiers and device data.</strong> Such as IP address, browser
                type, operating system, general location derived from IP (for example,
                region or city), and unique device or cookie identifiers.
              </li>
              <li>
                <strong>Internet or network activity.</strong> Such as pages viewed, referring
                / exit pages, date and time of visits, and interactions with site content.
              </li>
              <li>
                <strong>Communications you send us.</strong> If you email us (for example,
                at support@kaynos.net), we receive the content of your message and your email
                address.
              </li>
            </ul>
            <p>
              We do not intentionally collect sensitive personal information (as defined under
              applicable state laws) through this marketing site, and we ask that you do not
              send health, financial account, or government ID details via unsecured email.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. How we collect information</h2>
            <ul>
              <li>
                <strong>Directly from you</strong> when you contact us or subscribe to
                updates, if we offer those features.
              </li>
              <li>
                <strong>Automatically</strong> when you load pages or interact with the site,
                through server logs and, where applicable, cookies or similar technologies.
              </li>
              <li>
                <strong>From service providers</strong> that help us operate, secure, or
                analyze the site (for example, hosting and analytics vendors).
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. How we use information</h2>
            <p>We use personal information for purposes such as:</p>
            <ul>
              <li>Operating, maintaining, and improving the site and our services;</li>
              <li>Measuring traffic, performance, and engagement (analytics);</li>
              <li>Detecting, preventing, and addressing fraud, abuse, or security issues;</li>
              <li>Responding to your requests and communications;</li>
              <li>Complying with law and enforcing our terms; and</li>
              <li>
                Other purposes we disclose at the time of collection or as permitted by law.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4A. Lawful Basis for Processing (EU/EEA)</h2>
            <p>
              Where the General Data Protection Regulation (GDPR) applies, we rely on the
              following lawful bases for processing personal data:
            </p>
            <ul>
              <li>
                <strong>Contact form submissions:</strong> legitimate interest in responding
                to inquiries (Art. 6(1)(f)).
              </li>
              <li>
                <strong>Newsletter subscriptions:</strong> consent (you actively subscribe)
                (Art. 6(1)(a)).
              </li>
              <li>
                <strong>Server logs and analytics:</strong> legitimate interest in site
                security and performance (Art. 6(1)(f)).
              </li>
              <li>
                <strong>Compliance with law:</strong> legal obligation (Art. 6(1)(c)).
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. How we share information</h2>
            <p>We may share personal information with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> who process data on our behalf under
                contractual obligations, specifically: hosting and content delivery (Netlify),
                form processing (Netlify Forms). We do not use third-party analytics on this
                marketing site.
              </li>
              <li>
                <strong>Legal and safety</strong> when we believe disclosure is required by
                law, legal process, or to protect rights, safety, or property.
              </li>
              <li>
                <strong>Business transfers</strong> in connection with a merger,
                acquisition, financing, or sale of assets, subject to appropriate safeguards.
              </li>
            </ul>
            <p>
              We do not sell your personal information for money. We do not &quot;sell&quot;
              or &quot;share&quot; personal information for cross-context behavioral
              advertising as those terms are defined under the CPRA in connection with this
              marketing site. If our practices change, we will update this policy and provide
              any legally required notice or choice mechanism.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Cookies and similar technologies</h2>
            <p>
              This marketing site does not currently set first-party cookies. Our hosting
              provider (Netlify) may set strictly necessary cookies for content delivery and
              security. If we add analytics or preference cookies in the future, we will
              update this section and provide any required notice or consent mechanism. You
              can control cookies at any time through your browser settings.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Retention</h2>
            <p>
              We retain personal information for the following specific periods:
            </p>
            <ul>
              <li>
                <strong>Contact form submissions:</strong> 12 months.
              </li>
              <li>
                <strong>Newsletter email addresses:</strong> until you unsubscribe, plus 12
                months for records.
              </li>
              <li>
                <strong>Server logs:</strong> 30 days.
              </li>
            </ul>
            <p>
              We delete data after these periods unless required by law to retain it longer
              (for example, security logs or legal holds).
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Security</h2>
            <p>
              We use reasonable administrative, technical, and organizational measures to
              protect personal information. No method of transmission over the Internet is
              completely secure.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Children</h2>
            <p>
              This site is not directed to children under 13, and we do not knowingly collect
              personal information from children under 13. If you believe we have collected
              such information, contact us and we will take appropriate steps to delete it.
            </p>
            <p>
              Our product is used by coaches who may work with minors. Coaches are responsible
              for obtaining parental consent where required by law (e.g., COPPA). The marketing
              site does not knowingly collect information from children under 13.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Your U.S. privacy rights</h2>
            <p>
              Depending on where you live in the United States, you may have rights under
              state privacy laws (including California, Virginia, Colorado, Connecticut,
              Utah, and others) to:
            </p>
            <ul>
              <li>Access or know the categories and specific pieces of personal information we hold;</li>
              <li>Request deletion of personal information we collected from you;</li>
              <li>Request correction of inaccurate personal information;</li>
              <li>Opt out of the sale of personal information or certain sharing for targeted advertising (where applicable);</li>
              <li>Limit use or disclosure of sensitive personal information (where applicable); and</li>
              <li>Not receive discriminatory treatment for exercising these rights.</li>
            </ul>
            <p>
              <strong>California residents:</strong> You may have the rights listed above
              under the CCPA/CPRA. You may designate an authorized agent to make a request on
              your behalf in accordance with applicable law. We will verify your request
              before responding.
            </p>
            <p>
              <strong>How to submit a request:</strong> Email{" "}
              <a href={URLS.support}>support@kaynos.net</a> with the subject line
              &quot;Privacy Request&quot; and describe your request. We may need information
              to verify your identity before processing it.
            </p>
            <p>
              <strong>Verification process:</strong> We verify your identity by matching the
              email address in your request against our records. Authorized agents must provide
              signed written authorization. We respond within 45 days (CCPA) or 30 days (GDPR).
            </p>
            <p>
              If we deny your request, you may appeal where required by law by replying to
              our decision email with &quot;Appeal&quot; in the subject line.
            </p>
          </section>

          <section className="legal-section">
            <h2>10A. Your Rights (EU/EEA Residents)</h2>
            <p>
              If you are located in the European Union or European Economic Area, the General
              Data Protection Regulation (GDPR) provides you with the following rights
              regarding your personal data:
            </p>
            <ul>
              <li>Right of access to your personal data (Art. 15);</li>
              <li>Right to rectification of inaccurate personal data (Art. 16);</li>
              <li>Right to erasure of your personal data (Art. 17);</li>
              <li>Right to restriction of processing (Art. 18);</li>
              <li>Right to data portability (Art. 20);</li>
              <li>Right to object to processing (Art. 21);</li>
              <li>Right to withdraw consent at any time (for example, newsletter subscriptions); and</li>
              <li>Right to lodge a complaint with a supervisory authority.</li>
            </ul>
            <p>
              To exercise these rights, email{" "}
              <a href={URLS.support}>support@kaynos.net</a> with the subject line
              &quot;Privacy Request.&quot; We will respond within 30 days.
            </p>
            <p>
              You may find your local data protection authority through the{" "}
              <a
                href="https://edpb.europa.eu/about-edpb/about-edpb/members_en"
                target="_blank"
                rel="noopener noreferrer"
              >
                European Data Protection Board member directory
              </a>.
            </p>
          </section>

          <section className="legal-section">
            <h2>10B. International Transfers</h2>
            <p>
              Our service providers (Netlify, Backblaze B2, Neon) are based in the United
              States. We rely on Standard Contractual Clauses (SCCs) under GDPR Article
              46(2)(c) for transfers of personal data from the EU/EEA.
            </p>
          </section>

          <section className="legal-section">
            <h2>10C. Virginia, Colorado, Connecticut, and Other State Rights</h2>
            <p>
              Residents of Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), and other
              states with privacy laws have similar rights to those listed in Section 10
              above. Contact us at{" "}
              <a href={URLS.support}>support@kaynos.net</a> to exercise your rights under
              these laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>10D. Breach Notification</h2>
            <p>
              In the event of a personal data breach, we will notify affected individuals and
              relevant supervisory authorities within 72 hours as required by GDPR Article 33,
              and within the timeframes required by applicable U.S. state laws.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Do Not Track and Global Privacy Control</h2>
            <p>
              We do not currently respond to &quot;Do Not Track&quot; browser signals because
              there is no uniform industry standard for them. We do not sell or share personal
              data for advertising. Because we do not engage in sale or sharing, GPC signals
              require no action, but we acknowledge and respect them.
            </p>
          </section>

          <section className="legal-section">
            <h2>12. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the updated
              version on this page and revise the effective date. If changes are material, we
              will provide additional notice as required by law.
            </p>
          </section>

          <section className="legal-section">
            <h2>13. Contact</h2>
            <p>
              Questions about this Privacy Policy:{" "}
              <a href={URLS.support}>support@kaynos.net</a>
            </p>
          </section>

          <section className="legal-section">
            <h2>14. Privacy request metrics</h2>
            <p>
              We do not currently meet the threshold (10 million+ consumer records) requiring
              annual privacy request metrics disclosure under CCPA.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
