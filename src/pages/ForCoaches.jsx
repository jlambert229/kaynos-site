import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { URLS } from "../config/urls";
import { FMT, PRICING_COPY } from "../config/pricing";

export default function ForCoaches() {
  return (
    <>
      <Seo
        title="Video Review for Coaches"
        description="Upload training footage. Pin notes to exact moments. Share privately. Your clients review on any device - no app required."
        path="/for/coaches"
      />
      <Navbar />
      <main className="coaches-main container">
        <div className="coaches-content">
          {/* ── Hero ── */}
          <span className="section-label">For Coaches</span>
          <h1 className="coaches-title">
            Video review that your clients actually watch.
          </h1>
          <p className="coaches-lead">
            Upload training footage. Pin notes to exact moments. Share privately.
            Your clients review on any device&nbsp;- no app required.
          </p>
          <div className="coaches-cta">
            <a href={URLS.signup} className="btn btn-primary btn-lg">
              Start Trial
            </a>
            <a href={URLS.demoCoach} className="btn btn-secondary btn-lg">
              See a Demo
            </a>
          </div>

          {/* ── How it works ── */}
          <h2 className="coaches-section-heading">How it works</h2>
          <ol className="coaches-steps">
            <li className="coaches-step">
              <span className="coaches-step-number">1</span>
              <div className="coaches-step-body">
                <h3>Film</h3>
                <p>
                  Use whatever you already have&nbsp;- phone, GoPro, tripod.
                  Upload any common format.
                </p>
              </div>
            </li>
            <li className="coaches-step">
              <span className="coaches-step-number">2</span>
              <div className="coaches-step-body">
                <h3>Annotate</h3>
                <p>
                  Pin notes to the timeline, dictate them hands-free, or let AI
                  flag the key moments.
                </p>
              </div>
            </li>
            <li className="coaches-step">
              <span className="coaches-step-number">3</span>
              <div className="coaches-step-body">
                <h3>Share</h3>
                <p>
                  Your client gets a link. They watch in their browser, see your
                  notes, and can reply.
                </p>
              </div>
            </li>
          </ol>

          {/* ── Coaching styles ── */}
          <h2 className="coaches-section-heading">
            Works for any coaching style
          </h2>
          <div className="coaches-disciplines">
            <div className="coaches-discipline-card">
              <h3>Fitness</h3>
              <p>Form checks, session recaps, technique corrections</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Martial arts</h3>
              <p>Sparring breakdowns, drill review, competition prep</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Music</h3>
              <p>Lesson recordings, bar-level feedback, recital review</p>
            </div>
            <div className="coaches-discipline-card">
              <h3>Movement &amp; technique</h3>
              <p>Dance, golf, swim&nbsp;- anywhere form matters</p>
            </div>
          </div>

          {/* ── Pricing summary ── */}
          <h2 className="coaches-section-heading">Pricing</h2>
          <p className="coaches-pricing-line">{PRICING_COPY.heroLine}</p>
          <p className="coaches-pricing-detail">
            <Link to="/getting-started">See the full calculator</Link>
          </p>

          {/* ── Final CTA ── */}
          <div className="coaches-final-cta">
            <h2>Try it free for {FMT.trialDays}&nbsp;days</h2>
            <a href={URLS.signup} className="btn btn-primary btn-lg">
              Start Trial
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
