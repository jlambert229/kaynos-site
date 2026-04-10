import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";
import { TRIAL_DAYS, PRICING_COPY } from "../config/pricing";

const DEMO_URL = "https://demo.kaynos.net";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          {TRIAL_DAYS}-day trial. No lock-in. Cancel anytime. Your clients
          always use Kaynos free.
        </p>
        <div className="cta-actions" style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <CtaButton>Start Trial</CtaButton>
          <a href={DEMO_URL} className="btn btn-outline btn-lg">
            See a Demo
          </a>
        </div>
      </div>
    </section>
  );
}
