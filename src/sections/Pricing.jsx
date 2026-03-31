import { CheckCircle2 } from "lucide-react";

const includedFeatures = [
  "Unlimited students and instructors",
  "Unlimited sessions and classes",
  "Up to 100 video uploads",
  "50 GB video storage",
  "Timestamped coach notes",
  "Progress tracking",
  "Email notifications",
  "Priority support",
];

export default function Pricing() {
  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">One plan. No surprises.</h2>
          <p className="section-subtitle">
            Everything included. No per-student fees. No hidden costs.
          </p>
        </div>

        <div className="pricing-card">
          <span className="pricing-badge">14-day free trial</span>

          <div className="pricing-amount">$49</div>
          <div className="pricing-period">per month</div>

          <ul className="pricing-features">
            {includedFeatures.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={18} className="check" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://app.kaynos.net/signup"
            className="btn btn-primary btn-lg"
          >
            Start Your Free Trial
          </a>

          <p className="pricing-note">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
