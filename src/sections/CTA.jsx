import React from "react";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container">
        <h2 className="cta-title">Ready to level up your coaching?</h2>
        <p className="cta-subtitle">
          Try it free for 14 days. Cancel anytime.
        </p>
        <div className="btn-group" style={{ justifyContent: "center" }}>
          <a href="https://app.kaynos.net/signup" className="btn btn-primary btn-lg">
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
