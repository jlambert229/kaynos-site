import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

const features = [
  "Unlimited clients & coaches",
  "Unlimited sessions & classes",
  "100 video uploads",
  "50 GB storage",
  "6-month video retention",
  "Timestamped coach notes",
  "Progress tracking",
  "Admin panel",
  "Email notifications",
  "Priority support",
];

const plans = {
  monthly: { amount: "$49", equiv: null, period: "per month", billedNote: null },
  annual: { amount: "$41", equiv: "$490/yr", period: "per month", billedNote: "billed annually" },
};

export default function Pricing() {
  const [interval, setInterval] = useState("monthly");
  const plan = plans[interval];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">One plan. Everything included.</h2>
          <p className="section-subtitle">
            No per-client fees. No feature gates. No surprises on the bill.
          </p>
        </div>

        <div className="pricing-card">
          <div className="pricing-card-glow" />

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
              <span className="pricing-save-tag">-17%</span>
            </button>
          </div>

          <div className="pricing-price-block">
            <div className="pricing-amount">{plan.amount}</div>
            <div className="pricing-period-col">
              <span className="pricing-period">{plan.period}</span>
              {plan.billedNote && (
                <span className="pricing-billed">{plan.billedNote}</span>
              )}
            </div>
          </div>

          <div className="pricing-divider" />

          <ul className="pricing-features">
            {features.map((feature) => (
              <li key={feature}>
                <Check size={16} className="check" strokeWidth={2.5} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://app.kaynos.net/signup"
            className="btn btn-primary btn-lg"
          >
            <Sparkles size={18} />
            Start Free Trial
          </a>

          <p className="pricing-note">
            14 days free. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
