import { Link } from "react-router-dom";

export default function DocsIntro() {
  return (
    <>
      <p className="docs-kicker">Documentation</p>
      <h1 className="docs-title">Welcome to Kaynos docs</h1>
      <p className="docs-lead">
        Kaynos helps coaches and trainers run video review and training in one place. This hub
        covers guides for coaches, account owners, and technical integrations.
      </p>

      <section className="docs-section">
        <h2 className="docs-heading">What you will find here</h2>
        <ul className="docs-list">
          <li>How to get your account set up and invite coaches and clients</li>
          <li>Recording and review workflows that match how you already teach</li>
          <li>API and integration notes (where applicable)</li>
        </ul>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">Need help now?</h2>
        <p className="docs-body">
          Use the support chat on this page, or email{" "}
          <a href="mailto:support@kaynos.net">support@kaynos.net</a>.
        </p>
        <p className="docs-body">
          <Link to="/docs/getting-started" className="docs-inline-link">
            Continue to Getting started →
          </Link>
        </p>
      </section>
    </>
  );
}
