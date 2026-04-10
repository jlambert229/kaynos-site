import { Link } from "react-router-dom";
import { URLS } from "../../config/urls";

export default function GettingStartedPage() {
  return (
    <>
      <p className="getting-started-kicker">Getting started</p>
      <h1 className="getting-started-title">Get going in a few minutes</h1>
      <p className="getting-started-lead">
        Sign up, upload one clip, leave a note, invite a client. Everything runs in the browser at{" "}
        <a href={URLS.app} target="_blank" rel="noopener noreferrer">
          app.kaynos.net
        </a>
        .
      </p>

      <section className="getting-started-section">
        <h2 className="getting-started-heading">Right now</h2>
        <ol className="getting-started-list">
          <li>
            <strong>Open an account.</strong>{" "}
            <a href={URLS.signup} target="_blank" rel="noopener noreferrer">
              Start your free trial
            </a>
            . Sign in anytime at app.kaynos.net.
          </li>
          <li>
            <strong>Upload one video.</strong> Create a session or class, drag in a file from
            your phone or computer, wait for processing to finish.
          </li>
          <li>
            <strong>Mark the teaching moment.</strong> Scrub to a timestamp and add a short coach
            note so your client sees it in context.
          </li>
          <li>
            <strong>Invite someone.</strong> From the Admin panel, send an invite so they can log
            in and watch assigned footage.
          </li>
          <li>
            <strong>Have them watch.</strong> They use the same site in a browser, no app install.
            You can see who has opened their videos when you are ready to follow up.
          </li>
        </ol>
      </section>

      <section className="getting-started-section">
        <h2 className="getting-started-heading">More detail</h2>
        <p className="getting-started-body">
          Step-by-step screenshots, troubleshooting, and roles live in the{" "}
          <a
            href={`${URLS.helpCenter}#setup`}
            target="_blank"
            rel="noopener noreferrer"
            className="getting-started-inline-link"
          >
            Help Center
          </a>
          . You can also email{" "}
          <a href={URLS.support} className="getting-started-inline-link">
            support@kaynos.net
          </a>
          .
        </p>
        <p className="getting-started-body">
          <Link to="/" className="getting-started-inline-link">
            ← Back to home
          </Link>
        </p>
      </section>
    </>
  );
}
