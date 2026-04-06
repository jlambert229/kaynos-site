export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container" style={{ position: "relative" }}>
        <h2 className="cta-title">5 clients and your platform is free.</h2>
        <p className="cta-subtitle">
          Start your 14-day trial. First 3 clients included. No credit card required.
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
