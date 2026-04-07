import CtaButton from "../components/CtaButton";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container cta-container">
        <h2 className="cta-title">Your clients pay for the platform.</h2>
        <p className="cta-subtitle">
          Start your 14-day trial. First 3 clients free, then $10/month credit
          for each one after.
        </p>
        <div className="btn-group cta-actions">
          <CtaButton>Start Free Trial</CtaButton>
        </div>
      </div>
    </section>
  );
}
