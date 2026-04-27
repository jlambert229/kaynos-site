import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";
import CoachPreview from "../components/CoachPreview";
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
            BADGERSKOPE
          </h1>
          <p className="hero-kicker">Evidence &gt; Hype</p>
          <p className="hero-description">
            Objective breakdowns for athletes and coaches. Upload your clips, annotate key
            moments, and turn footage into repeatable decisions backed by evidence.
          </p>
          <div className="hero-cta-row">
            <CtaButton>Get Early Access</CtaButton>
            <a
              href={URLS.demoCoach}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Demo
            </a>
          </div>
          <p className="hero-meta hero-meta--alt">
            Already have access?{" "}
            <a href={URLS.login}>Log in &rarr;</a>
          </p>
        </div>
        <CoachPreview />
      </div>
    </section>
  );
}
