import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";
import { PRICING_COPY } from "../config/pricing";

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
            Upload training videos. Leave notes at specific moments. Share them
            privately with your clients so they can review between sessions.
            {" "}{PRICING_COPY.heroLine}
          </p>
          <div className="hero-cta-row">
            <CtaButton>Start Trial</CtaButton>
            <a
              href="https://demo.kaynos.net"
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
        </div>
      </div>
    </section>
  );
}
