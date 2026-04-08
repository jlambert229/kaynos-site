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
            Kaynos is video review for coaches. Upload session footage, leave
            timestamped notes, and give clients something to study between
            sessions. Your first 3 clients are free, and every paid client
            after that earns you $10/month in credit — so at 5 paid clients,
            the platform costs you nothing.
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
            14-day trial. No credit card.
          </p>
        </div>
      </div>
    </section>
  );
}
