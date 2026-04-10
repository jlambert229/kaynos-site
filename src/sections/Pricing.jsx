import { Check, Sparkles } from "lucide-react";
import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  PLAN_NAME,
  FREE_SEATS,
  COACH_FEATURES,
  SEAT_EXAMPLES,
  FMT,
  PRICING_COPY,
} from "../config/pricing";

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
            {PRICING_COPY.subtitle}
          </p>
        </div>

        <div className="pricing-dual">
          <div className="pricing-card">
            <span className="pricing-card-label">{PLAN_NAME}</span>

            <div className="pricing-price-block">
              <div className="pricing-amount">{FMT.coachMonthly}</div>
              <div className="pricing-period-col">
                <span className="pricing-period">per month</span>
              </div>
            </div>

            <div className="pricing-divider" />

            <ul className="pricing-features pricing-features--single">
              {COACH_FEATURES.map((feature) => (
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
              {PRICING_COPY.trialNote}{" "}
              <a href="#comparison">See how we compare &rarr;</a>
            </p>
          </div>
        </div>

        <div className="pricing-credit-section">
          <h3 className="pricing-credit-title">
            What you pay by number of clients
          </h3>
          <p className="pricing-credit-desc">
            {PRICING_COPY.creditDesc}
          </p>
          <div className="pricing-credit-table">
            <div className="pricing-credit-header">
              <span>Active clients</span>
              <span>Extra seats</span>
              <span>You pay</span>
              <span></span>
            </div>
            {SEAT_EXAMPLES.map((row) => (
              <div key={row.clients} className="pricing-credit-row">
                <span>{row.clients}</span>
                <span className="pricing-credit-amount">
                  {Math.max(0, row.clients - FREE_SEATS)}
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
