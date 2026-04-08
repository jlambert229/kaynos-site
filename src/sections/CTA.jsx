import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CTA() {
  const revealRef = useScrollReveal();

  return (
    <section className="cta-section">
      <div ref={revealRef} className="reveal container cta-container">
        <h2 className="cta-title">Give it a shot.</h2>
        <p className="cta-subtitle">
          14-day free trial. First 3 clients are free. Every paid client
          after that earns you $10/month in credit toward your bill.
        </p>
        <CtaButton>Start Free Trial</CtaButton>
      </div>
    </section>
  );
}
