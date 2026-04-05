import { Link } from "react-router-dom";

export default function DocsGettingStarted() {
  return (
    <>
      <p className="docs-kicker">Documentation</p>
      <h1 className="docs-title">Getting started</h1>
      <p className="docs-lead">
        This page is a scaffold for onboarding content. Replace it with your real checklist:
        signup, first class, first upload, inviting clients, and where to get help.
      </p>

      <section className="docs-section">
        <h2 className="docs-heading">1. Open the app</h2>
        <p className="docs-body">
          Start a trial from the marketing site, then sign in at{" "}
          <a href="https://app.kaynos.net" target="_blank" rel="noopener noreferrer">
            app.kaynos.net
          </a>
          .
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">2. Next steps (placeholder)</h2>
        <p className="docs-body">
          Document your tenant setup, roles, and the first session your schools should create.
          Shorter pages with screenshots tend to work better than one giant wall of text.
        </p>
      </section>

      <p className="docs-body">
        <Link to="/docs" className="docs-inline-link">
          ← Back to Introduction
        </Link>
      </p>
    </>
  );
}
