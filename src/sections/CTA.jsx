export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container" style={{ position: "relative" }}>
        <h2 className="cta-title">Ready to level up your coaching?</h2>
        <p className="cta-subtitle">
          Try it free for 14 days. No credit card required.
        </p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="https://app.kaynos.net/signup" className="btn btn-primary btn-lg">
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
}
