import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Seo from "./Seo";

/**
 * Shared chrome for legal-ish pages (Terms, Privacy, Data Use, Processors,
 * Accessibility). Renders Seo + Navbar + Footer + the .legal-* layout
 * scaffolding so each page only has to worry about its body content.
 *
 * Security.jsx has its own visual treatment (.security-*) and is intentionally
 * NOT routed through this layout — its h2/list styling differs from the legal
 * pages and changing it would be a regression rather than a consolidation.
 *
 * @param {{
 *   title: string;
 *   description: string;
 *   path: string;
 *   jsonLd?: object;
 *   eyebrow?: string;            // optional .section-label above the heading
 *   heading: string;             // h1 text
 *   effectiveDate?: string;      // optional, e.g. "April 9, 2026"
 *   effectiveLabel?: string;     // override "Effective date" -> "Last updated", etc.
 *   lead?: import('react').ReactNode;
 *   children?: import('react').ReactNode;
 * }} props
 */
export default function LegalLayout({
  title,
  description,
  path,
  jsonLd,
  eyebrow,
  heading,
  effectiveDate,
  effectiveLabel = "Effective date",
  lead,
  children,
}) {
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={jsonLd} />
      <Navbar />
      <main id="main-content" className="legal-main container">
        <article className="legal-article">
          <div className="legal-meta">
            <Link to="/" className="legal-back">&larr; Back to home</Link>
          </div>
          {eyebrow ? <span className="section-label">{eyebrow}</span> : null}
          <h1 className="legal-title">{heading}</h1>
          {effectiveDate ? (
            <p className="legal-effective">{effectiveLabel}: {effectiveDate}</p>
          ) : null}
          {lead ? <p className="legal-lead">{lead}</p> : null}
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
