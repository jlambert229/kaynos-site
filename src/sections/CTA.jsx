import React from "react";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container">
        <h2 className="cta-title" data-reveal>Ready to level up your coaching?</h2>
        <p className="cta-subtitle" data-reveal style={{ transitionDelay: "0.1s" }}>
          Try it free for 14 days. Cancel anytime.
        </p>
        <div className="btn-group" data-reveal style={{ justifyContent: "center", transitionDelay: "0.2s" }}>
          <a href="https://app.kaynos.net/signup" className="btn btn-primary btn-lg">
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
