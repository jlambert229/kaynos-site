import React from 'react';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" />
      <div className="container">
        <h2 className="cta-title">Ready to transform your school's training?</h2>
        <p className="cta-subtitle">
          Start your 14-day free trial today. No credit card required.
        </p>
        <div className="btn-group" style={{ justifyContent: 'center' }}>
          <a href="https://app.kaynos.net/signup" className="btn btn-primary btn-lg">
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
  );
}
