import KaynosLogo from "../components/KaynosLogo";
import CtaButton from "../components/CtaButton";

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
            Upload training videos. Leave notes at specific moments. Share them with your clients so they can review between sessions. Your first 3 clients are free — after that, each paid client knocks $10/month off your bill.
          </p>
          <div className="hero-cta-row">
            <CtaButton>Try It Free</CtaButton>
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
            14-day trial. No credit card.{" "}
            <a href="#calculator" className="hero-calc-link">See what you'd pay →</a>
          </p>
        </div>
      </div>
    </section>
  );
}
