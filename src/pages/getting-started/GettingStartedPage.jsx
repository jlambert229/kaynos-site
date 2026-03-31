import { Link } from "react-router-dom";

export default function GettingStartedPage() {
  return (
    <>
      <p className="docs-kicker">Getting started</p>
      <h1 className="docs-title">Start using Kaynos today</h1>
      <p className="docs-lead">
        Kaynos is video review for your school: upload class footage, leave coach notes on the
        timeline, and give students a library they can study in the browser. Follow the steps
        below from a free trial to your first students watching their sessions.
      </p>

      <section className="docs-section">
        <h2 className="docs-heading">1. Open your account</h2>
        <p className="docs-body">
          Start a free trial from the{" "}
          <Link to="/" className="docs-inline-link">
            home page
          </Link>
          , then sign in any time at{" "}
          <a href="https://app.kaynos.net" target="_blank" rel="noopener noreferrer">
            app.kaynos.net
          </a>
          . No credit card is required for the trial.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">2. Upload your first session</h2>
        <p className="docs-body">
          Film with whatever you already use at the gym (phone, action cam, etc.), then drag the
          file into Kaynos from your browser. Common formats work; large files are fine.
        </p>
        <p className="docs-body">
          Tie the clip to the right class or session so students and coaches see it in the right
          place.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">3. Add coach notes on the timeline</h2>
        <p className="docs-body">
          Scrub to the moment that matters and pin a note. Students see your feedback in context,
          not as a wall of text. Tag by technique, class type, or whatever keeps your school
          organized.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">4. Invite your team</h2>
        <p className="docs-body">
          Add instructors and staff so they can manage sessions and classes. Students only see
          what you assign them, plus shared class material, so private coaching stays private.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">5. Get students watching</h2>
        <p className="docs-body">
          Students log in on the web (no app install). They open their assigned videos, rewatch
          details they missed live, and add their own notes. Check who has watched so you know who
          still needs a nudge.
        </p>
      </section>

      <section className="docs-section">
        <h2 className="docs-heading">Stuck or need more detail?</h2>
        <p className="docs-body">
          Use the support chat on this site, browse the{" "}
          <a
            href="https://docs.kaynos.net"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-inline-link"
          >
            Help Center
          </a>
          , or email{" "}
          <a href="mailto:support@kaynos.net" className="docs-inline-link">
            support@kaynos.net
          </a>
          .
        </p>
      </section>
    </>
  );
}
