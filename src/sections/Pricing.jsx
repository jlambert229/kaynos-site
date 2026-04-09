import { Check, Sparkles } from "lucide-react";
import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";

const coachFeatures = [
  "All features included",
  "First 3 client seats included",
  "$5/mo per additional active seat",
  "100 video uploads",
  "50 GB storage",
  "6-month video retention",
  "Timestamped coach notes",
  "Admin panel & usage reports",
  "Priority support",
  "Clients access for free",
];

const seatExamples = [
  { clients: 3, cost: "$50", note: "3 seats included" },
  { clients: 5, cost: "$60", note: "" },
  { clients: 10, cost: "$85", note: "" },
  { clients: 20, cost: "$135", note: "" },
  { clients: 50, cost: "$285", note: "" },
];

export default function Pricing() {
  const headerRef = useScrollReveal();

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">
            Simple pricing. One plan. No surprises.
          </h2>
          <p className="section-subtitle">
            Coaches pay $50/mo. First 3 client seats are included. Each
            additional active seat is $5/mo. Clients never pay anything.
            Monthly true-up based on active seats.
          </p>
        </div>

        <div className="pricing-dual">
          <div className="pricing-card">
            <span className="pricing-popular-badge">Coach</span>
            <span className="pricing-card-label">Coach Plan</span>

            <div className="pricing-price-block">
              <div className="pricing-amount">$50</div>
              <div className="pricing-period-col">
                <span className="pricing-period">per month</span>
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

            <CtaButton>
              <Sparkles size={18} />
              Start Trial
            </CtaButton>

            <p className="pricing-note">
              14-day trial. Card on file.{" "}
              <a href="#comparison">See how we compare &rarr;</a>
            </p>
          </div>
        </div>

        <div className="pricing-credit-section">
          <h3 className="pricing-credit-title">
            What you pay by number of clients
          </h3>
          <p className="pricing-credit-desc">
            $50/mo base includes 3 client seats. Each additional active seat
            is $5/mo. Your bill adjusts monthly based on how many clients are
            active.
          </p>
          <div className="pricing-credit-table">
            <div className="pricing-credit-header">
              <span>Active clients</span>
              <span>Extra seats</span>
              <span>You pay</span>
              <span></span>
            </div>
            {seatExamples.map((row) => (
              <div key={row.clients} className="pricing-credit-row">
                <span>{row.clients}</span>
                <span className="pricing-credit-amount">
                  {Math.max(0, row.clients - 3)}
                </span>
                <span>
                  {row.cost}/mo
                </span>
                <span className="pricing-credit-note">{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
