import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";
import { PRICING_COPY } from "../config/pricing";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          {PRICING_COPY.ctaLine}
        </p>
        <CtaButton>Start Trial</CtaButton>
      </div>
    </section>
  );
}
