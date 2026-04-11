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
            Stop losing your best coaching moments.
          </h1>
          <p className="hero-description">
            Upload training videos. Dictate notes at exact moments - or let AI
            flag the key timestamps for you. Share privately with your clients so
            they can review between sessions.
            {" "}{PRICING_COPY.heroLine}
          </p>
          <div className="hero-cta-row">
            <CtaButton>Start Trial</CtaButton>
            <a
              href={URLS.demoCoach}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              See a Demo
            </a>
          </div>
          <p className="hero-proof-line">
            {PRICING_COPY.trialNote}{" "}
            <a href="#pricing" className="hero-calc-link">See pricing &rarr;</a>
          </p>
          <p className="hero-student-line">
            Already invited?{" "}
            <a href={URLS.login} className="hero-student-link">
              Your coach uses Kaynos - you use it free. Log in &rarr;
            </a>
          </p>
        </div>
        <CoachPreview />
      </div>
    </section>
  );
}
