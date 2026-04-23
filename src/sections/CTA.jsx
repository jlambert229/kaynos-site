import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";
import { TRIAL_DAYS, PRICING_COPY } from "../config/pricing";
import { URLS } from "../config/urls";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          {TRIAL_DAYS} days free with a card on file, cancel anytime.
          Students are always free.
        </p>
        <div className="cta-actions">
          <CtaButton>Start 14-Day Trial</CtaButton>
          <a href={URLS.demoCoach} className="btn btn-outline btn-lg">
            See a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
