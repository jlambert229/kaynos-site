import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const effectiveDate = "March 30, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Kaynos Privacy Policy (United States): how we collect, use, disclose, and protect personal information when you use our video review and training platform."
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
          <h1 className="legal-title">Privacy Policy (United States)</h1>
          <p className="legal-effective">Effective date: {effectiveDate}</p>

          <p className="legal-lead">
            This Privacy Policy describes how Kaynos (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) collects, uses, and shares personal information when you visit
            our public marketing website at kaynos.net (including subdomains that display
            this policy) from the United States. It is intended to meet common expectations
            under U.S. state privacy laws, including the California Consumer Privacy Act
            (CCPA) as amended by the California Privacy Rights Act (CPRA). This page does
            not constitute legal advice.
          </p>

          <section className="legal-section">
            <h2>1. Scope</h2>
            <p>
              This policy applies to information collected through this marketing site. If you
              use other Kaynos products or services (for example, our web application), those
              experiences may be governed by separate notices or terms. When in doubt, check
              the policy linked from the product you are using.
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
                using cookies, pixels, or similar technologies and server logs.
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
            <h2>5. How we share information</h2>
            <p>We may share personal information with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> who process data on our behalf under
                contractual obligations (for example, hosting on Netlify or similar
                providers, analytics, email delivery, and security tools).
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
              We use cookies and similar technologies to remember preferences, understand how
              the site is used, and support security. You can control cookies through your
              browser settings. Disabling cookies may affect how the site functions.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Retention</h2>
            <p>
              We retain personal information only as long as needed for the purposes
              described above, unless a longer period is required or permitted by law (for
              example, security logs or legal holds).
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
              <a href="mailto:support@kaynos.net">support@kaynos.net</a> with the subject line
              &quot;Privacy Request&quot; and describe your request. We may need information
              to verify your identity before processing it.
            </p>
            <p>
              If we deny your request, you may appeal where required by law by replying to
              our decision email with &quot;Appeal&quot; in the subject line.
            </p>
          </section>

          <section className="legal-section">
            <h2>11. Do Not Track</h2>
            <p>
              There is no uniform industry standard for &quot;Do Not Track&quot; browser
              signals. We do not respond to all such signals in a standardized way.
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
              <a href="mailto:support@kaynos.net">support@kaynos.net</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
