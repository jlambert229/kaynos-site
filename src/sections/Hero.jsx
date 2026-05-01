import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";
import CoachPreview from "../components/CoachPreview";
import { PRICING_COPY } from "../config/pricing";
import { URLS } from "../config/urls";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="container">
        <div className="hero-content">
          <div className="hero-logo-lockup">
            <KaynosLogo size="hero" />
          </div>
          <h1 className="hero-title">
            Video review for BJJ coaches.
          </h1>
          <p className="hero-description">
            Film on your phone, upload, and pin notes at the moments you
            want your student to come back to. AI scans the footage first
            so you&rsquo;re not rewatching every minute to find a
            ten-second sequence.
          </p>
          <div className="hero-cta-row">
            <CtaButton>Start 14-Day Trial</CtaButton>
            <a
              href={URLS.demoCoach}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See a Demo
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
          <p className="hero-meta">
            {PRICING_COPY.heroLine} &middot; {PRICING_COPY.trialNote}
            {" "}<a href="#pricing" className="hero-calc-link">See pricing &rarr;</a>
          </p>
          <p className="hero-meta hero-meta--alt">
            Already invited?{" "}
            <a href={URLS.login}>Log in &rarr;</a>
          </p>
        </div>
        <CoachPreview />
      </div>
    </section>
  );
}
