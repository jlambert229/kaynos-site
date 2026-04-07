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

const clientPerks = [
  "Watch assigned sessions",
  "Browse shared classes",
  "Add their own notes",
  "Resume where they left off",
  "Progress tracking",
  "Works in any browser",
];

const coachPlans = {
  monthly: { amount: "$50", period: "per month", billedNote: null },
  annual: { amount: "$41.50", period: "per month", billedNote: "billed annually at $498" },
};

const creditExamples = {
  monthly: [
    { clients: 3, paid: 0, credit: "$0", cost: "$50", note: "First 3 included free" },
    { clients: 5, paid: 2, credit: "$20", cost: "$30", note: "" },
    { clients: 8, paid: 5, credit: "$50", cost: "$0", note: "Platform is free" },
    { clients: 12, paid: 9, credit: "$90", cost: "$0", note: "Still $0" },
  ],
  annual: [
    { clients: 3, paid: 0, credit: "$0", cost: "$498", note: "First 3 included free" },
    { clients: 5, paid: 2, credit: "$240", cost: "$258", note: "" },
    { clients: 8, paid: 5, credit: "$600", cost: "$0", note: "Platform is free" },
    { clients: 12, paid: 9, credit: "$1,080", cost: "$0", note: "Still $0" },
  ],
};

export default function Pricing() {
  const [interval, setInterval] = useState("monthly");
  const coachPlan = coachPlans[interval];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Grow your practice, shrink your bill.
          </h2>
          <p className="section-subtitle">
            Every paid client earns you $10/month in credit. Your first 3 clients are free.
            Sign up enough and your platform cost drops to $0.
          </p>
        </div>

        <div className="pricing-toggle-wrapper">
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

        <div className="pricing-single">
          <div className="pricing-card">
            <div className="pricing-card-glow" />
            <span className="pricing-card-label">Coach Plan</span>

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
              14-day free trial included.
            </p>
          </div>
        </div>

        <div className="pricing-client-perks">
          <h3 className="pricing-client-perks-title">What your clients get</h3>
          <p className="pricing-client-perks-desc">
            You send each client a signup link. They get their own account with
            everything they need to review sessions and track progress.
          </p>
          <ul className="pricing-client-perks-list">
            {clientPerks.map((perk) => (
              <li key={perk}>
                <Check size={16} className="check" strokeWidth={2.5} />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pricing-credit-section">
          <h3 className="pricing-credit-title">
            <TrendingDown size={20} />
            How coach credits work
          </h3>
          <p className="pricing-credit-desc">
            For every paid client beyond your first 3, you earn{" "}
            {interval === "annual" ? "$120/year" : "$10/month"} in recurring
            credit toward your coach bill.
          </p>
          <div className="pricing-credit-table">
            <div className="pricing-credit-header">
              <span>Total clients</span>
              <span>Paid clients</span>
              <span>Your credit</span>
              <span>You pay</span>
            </div>
            {creditExamples[interval].map((row) => (
              <div key={row.clients} className="pricing-credit-row">
                <span>{row.clients}</span>
                <span>{row.paid}</span>
                <span className="pricing-credit-amount">
                  {row.credit}/{interval === "annual" ? "yr" : "mo"}
                </span>
                <span className={row.cost === "$0" ? "pricing-credit-free" : ""}>
                  {row.cost}/{interval === "annual" ? "yr" : "mo"}
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
