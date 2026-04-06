import { useState } from "react";
import { Check, Sparkles, TrendingDown } from "lucide-react";

const coachFeatures = [
  "First 3 clients free",
  "$10/mo credit per paid client",
  "100 video uploads",
  "50 GB storage",
  "6-month video retention",
  "Timestamped coach notes",
  "Admin panel & usage reports",
  "Priority support",
];

const clientFeatures = [
  "Watch assigned sessions",
  "Browse shared classes",
  "Add your own notes",
  "Resume where you left off",
  "Progress tracking",
  "Works in any browser",
];

const coachPlans = {
  monthly: { amount: "$49", period: "per month", billedNote: null },
  annual: { amount: "$41", period: "per month", billedNote: "billed annually at $488" },
};

const clientPlans = {
  monthly: { amount: "$49", period: "per month", billedNote: null },
  annual: { amount: "$41", period: "per month", billedNote: "billed annually at $488" },
};

const creditExamples = [
  { clients: 3, credit: "$0", cost: "$49", note: "First 3 are free" },
  { clients: 5, credit: "$20", cost: "$29", note: "2 paid clients" },
  { clients: 8, credit: "$50", cost: "$0", note: "Platform is free" },
  { clients: 12, credit: "$90", cost: "$0", note: "Still free" },
];

export default function Pricing() {
  const [interval, setInterval] = useState("monthly");
  const coachPlan = coachPlans[interval];
  const clientPlan = clientPlans[interval];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            The more clients you enroll, the less you pay.
          </h2>
          <p className="section-subtitle">
            Each active client lowers your monthly cost by $10/month.
            Enroll enough clients and the platform pays for itself.
          </p>
        </div>

        <div className="pricing-toggle" style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
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

        <div className="pricing-two-col">
          <div className="pricing-card">
            <div className="pricing-card-glow" />
            <span className="pricing-card-label">Coach</span>

            <div className="pricing-price-block">
              <div className="pricing-amount">{coachPlan.amount}</div>
              <div className="pricing-period-col">
                <span className="pricing-period">{coachPlan.period}</span>
                {coachPlan.billedNote && (
                  <span className="pricing-billed">{coachPlan.billedNote}</span>
                )}
              </div>
            </div>

            <div className="pricing-divider" />

            <ul className="pricing-features pricing-features--single">
              {coachFeatures.map((feature) => (
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
              14 days free. No credit card required.
            </p>
          </div>

          <div className="pricing-card pricing-card--client">
            <div className="pricing-card-glow" />
            <span className="pricing-card-label">Client</span>

            <div className="pricing-price-block">
              <div className="pricing-amount">{clientPlan.amount}</div>
              <div className="pricing-period-col">
                <span className="pricing-period">{clientPlan.period}</span>
                {clientPlan.billedNote && (
                  <span className="pricing-billed">{clientPlan.billedNote}</span>
                )}
              </div>
            </div>

            <div className="pricing-divider" />

            <ul className="pricing-features pricing-features--single">
              {clientFeatures.map((feature) => (
                <li key={feature}>
                  <Check size={16} className="check" strokeWidth={2.5} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="pricing-note" style={{ marginTop: "auto" }}>
              Coach sends a signup link. First 3 clients per coach are free.
            </p>
          </div>
        </div>

        <div className="pricing-credit-section">
          <h3 className="pricing-credit-title">
            <TrendingDown size={20} />
            How coach credits work
          </h3>
          <p className="pricing-credit-desc">
            For every active client on a paid plan, you earn $10/month in recurring credit
            toward your platform bill{interval === "annual" ? " ($120/year per client)" : ""}.
          </p>
          <div className="pricing-credit-table">
            <div className="pricing-credit-header">
              <span>Active clients</span>
              <span>Your credit</span>
              <span>You pay</span>
            </div>
            {creditExamples.map((row) => (
              <div key={row.clients} className="pricing-credit-row">
                <span>{row.clients} clients</span>
                <span className="pricing-credit-amount">{row.credit}/mo</span>
                <span className={row.cost === "$0" ? "pricing-credit-free" : ""}>
                  {row.cost}/mo
                  {row.cost === "$0" && <span className="pricing-credit-badge">Free</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
