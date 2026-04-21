import { Check, Sparkles } from "lucide-react";
import CtaButton from "../components/CtaButton";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  PLAN_NAME,
  COACH_FEATURES,
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
            One plan. One price. No per-seat math.
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
              Start 14-Day Trial
            </CtaButton>

            <p className="pricing-note">
              {PRICING_COPY.trialNote}{" "}
              <a href="#comparison">See how we compare &rarr;</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
