import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const effectiveDate = "March 31, 2026";

export default function DataUsePolicy() {
  return (
    <>
      <Seo
        title="Data Use Policy"
        description="Kaynos Data Use Policy: how training videos, coach and client content, and account data are processed, retained, and used on our platform."
        path="/data-use"
      />
      <Navbar />
      <main className="legal-main">
        <article className="container legal-article">
          <p className="legal-meta">
            <Link to="/" className="legal-back">
              ← Back to home
            </Link>
          </p>
          <h1 className="legal-title">Data Use Policy</h1>
          <p className="legal-effective">Effective date: {effectiveDate}</p>

          <p className="legal-lead">
            This Data Use Policy explains how Kaynos (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) uses information in connection with the Kaynos platform and
            related services (for example, the web application at app.kaynos.net and
            account-specific workflows you enable). It is intended to follow common
            transparency practices for software-as-a-service providers, including purpose
            limitation, data minimization, and clear boundaries around customer content. This
            page is not legal advice. For how we collect and share personal information on
            our public marketing website, see our{" "}
            <Link to="/privacy">Privacy Policy</Link>.
          </p>

          <section className="legal-section">
            <h2>1. Scope</h2>
            <p>
              This policy applies to data processed when you or your organization use Kaynos
              products and services. It complements (and does not replace) our{" "}
              <Link to="/privacy">Privacy Policy</Link>, applicable agreements such as our
              Terms of Service, and any account-specific arrangements.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Categories of information we use</h2>
            <p>Depending on how you use Kaynos, we may process:</p>
            <ul>
              <li>
                <strong>Account data.</strong> Such as names, email addresses,
                roles, account membership, billing relationship with us, and settings you
                configure.
              </li>
              <li>
                <strong>Content you upload or create.</strong> Such as training videos,
                titles, descriptions, timestamped notes, class or session metadata, and
                similar materials you choose to store in the service.
              </li>
              <li>
                <strong>Usage and technical data.</strong> Such as log data, device and
                browser type, approximate location derived from IP, timestamps, feature
                interactions, diagnostics, and security signals needed to operate and protect
                the service.
              </li>
              <li>
                <strong>Support communications.</strong> Information you send when you
                contact us (for example, via in-product support or email), including
                troubleshooting details you choose to provide.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. How we use information (purposes)</h2>
            <p>We use the categories above for purposes such as:</p>
            <ul>
              <li>
                <strong>Providing the service.</strong> Authenticating users, storing and
                delivering content you upload, enforcing role-based permissions, and
                operating product features you request.
              </li>
              <li>
                <strong>Security and abuse prevention.</strong> Detecting, investigating,
                and mitigating fraud, spam, unauthorized access, and vulnerabilities.
              </li>
              <li>
                <strong>Reliability and improvement.</strong> Monitoring performance,
                diagnosing errors, planning capacity, and developing product improvements.
                Where we use aggregated or de-identified data, we use it at a level that
                does not reasonably identify an individual or account.
              </li>
              <li>
                <strong>Customer support.</strong> Responding to requests, reproducing
                issues, and communicating about your account or the service.
              </li>
              <li>
                <strong>Legal and compliance.</strong> Complying with law, responding to
                lawful requests, and enforcing our terms and policies.
              </li>
              <li>
                <strong>Billing and administration.</strong> Invoicing, payment handling
                with payment processors, and records required for accounting and tax.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Principles we follow</h2>
            <ul>
              <li>
                <strong>Purpose limitation.</strong> We use data for the purposes described
                in this policy, in our agreements with you, or as we disclose at collection.
              </li>
              <li>
                <strong>Data minimization.</strong> We aim to collect and retain what is
                needed to operate the service securely and to meet legal and contractual
                obligations.
              </li>
              <li>
                <strong>Integrity and confidentiality.</strong> We use administrative,
                technical, and organizational measures appropriate to the nature of the
                service. No online service can guarantee perfect security.
              </li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Customer content and automated processing</h2>
            <p>
              Your videos, notes, and related materials are yours (subject to your agreements
              with your organization and applicable law). We process customer content to provide the
              features you use, including storage, transcoding or streaming where applicable,
              search within your account, backups, and disaster recovery.
            </p>
            <p>
              We do not use customer content or personal information you provide through the
              product to train generalized artificial intelligence or machine-learning models
              for unrelated third parties. If we ever introduce optional features that use
              customer content in new ways, we will describe them clearly and obtain any
              legally required consent or agreement before use.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Subprocessors and service providers</h2>
            <p>
              We use qualified vendors (for example, hosting, storage, content delivery,
              email, analytics, security, and payment processing) to run Kaynos. They may
              process data only as instructed by us and subject to contractual safeguards
              appropriate to the service they provide.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Human access</h2>
            <p>
              Our personnel may access production data only on a need-to-know basis (for
              example, to fix an outage, respond to a support ticket you opened, or address
              security or legal obligations). We discourage sending highly sensitive personal
              information in support messages unless necessary.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Retention</h2>
            <p>
              We retain information for as long as your account relationship is
              active, as needed to provide the service, and as required by law, dispute
              resolution, or enforceable agreements. When data is deleted, it may persist in
              encrypted backups for a limited period before being overwritten.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Data Use Policy from time to time. We will post the updated
              version on this page and revise the effective date. Material changes may be
              communicated as described in your agreement with us or as required by law.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contact</h2>
            <p>
              Questions about this Data Use Policy:{" "}
              <a href="mailto:support@kaynos.net">support@kaynos.net</a>
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
