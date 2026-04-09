import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          $50/mo. 3 clients included. $5 per extra. 14-day trial.
        </p>
        <CtaButton>Start Trial</CtaButton>
      </div>
    </section>
  );
}
