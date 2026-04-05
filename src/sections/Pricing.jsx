import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const includedFeatures = [
  "Unlimited clients and coaches",
  "Unlimited sessions and classes",
  "Up to 100 video uploads",
  "50 GB video storage",
  "6 months video retention",
  "Timestamped coach notes",
  "Progress tracking",
  "Admin panel",
  "Email notifications",
  "Priority support",
];

const plans = {
  monthly: { amount: "$49", period: "per month", label: "Monthly" },
  annual: { amount: "$490", period: "per year", label: "Annual", save: "Save 17%" },
};

export default function Pricing() {
  const [interval, setInterval] = useState("monthly");
  const plan = plans[interval];

  return (
    <section id="pricing" className="section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">One plan. No surprises.</h2>
          <p className="section-subtitle">
            Everything included. No per-client fees. No hidden costs.
          </p>
        </div>

        <div className="pricing-card">
          <span className="pricing-badge">14-day free trial</span>

          <div className="pricing-toggle">
            <button
              className={`pricing-toggle-btn${interval === "monthly" ? " active" : ""}`}
              onClick={() => setInterval("monthly")}
            >
              Monthly
            </button>
            <button
              className={`pricing-toggle-btn${interval === "annual" ? " active" : ""}`}
              onClick={() => setInterval("annual")}
            >
              Annual
              <span className="pricing-save-tag">Save 17%</span>
            </button>
          </div>

          <div className="pricing-amount">{plan.amount}</div>
          <div className="pricing-period">{plan.period}</div>

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
            You won't be charged until your trial ends. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
