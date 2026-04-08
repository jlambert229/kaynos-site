import { useState } from "react";
import { Calculator as CalcIcon, TrendingDown } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { COACH_MONTHLY_PRICE, CLIENT_CREDIT_MONTHLY, FREE_CLIENTS } from "../config/pricing";

export default function Calculator() {
  const [clients, setClients] = useState(5);
  const headerRef = useScrollReveal();
  const calcRef = useScrollReveal();

  const paidClients = Math.max(0, clients - FREE_CLIENTS);
  const credit = paidClients * CLIENT_CREDIT_MONTHLY;
  const cost = Math.max(0, COACH_MONTHLY_PRICE - credit);
  const savings = Math.min(credit, COACH_MONTHLY_PRICE);

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Calculator</span>
          <h2 className="section-title">See what you'd actually pay</h2>
          <p className="section-subtitle">
            Move the slider. Watch your bill shrink.
          </p>
        </div>

        <div ref={calcRef} className="reveal calc-card">
          <div className="calc-slider-row">
            <label className="calc-slider-label" htmlFor="client-slider">
              Total clients
            </label>
            <output className="calc-slider-value">{clients}</output>
          </div>
          <input
            id="client-slider"
            type="range"
            min={1}
            max={15}
            value={clients}
            onChange={(e) => setClients(Number(e.target.value))}
            className="calc-slider"
          />
          <div className="calc-slider-range">
            <span>1</span>
            <span>15</span>
          </div>

          <div className="calc-results">
            <div className="calc-result-item">
              <span className="calc-result-label">Free clients</span>
              <span className="calc-result-value">{Math.min(clients, FREE_CLIENTS)}</span>
            </div>
            <div className="calc-result-item">
              <span className="calc-result-label">Paid clients</span>
              <span className="calc-result-value">{paidClients}</span>
            </div>
            <div className="calc-result-item">
              <span className="calc-result-label">Monthly credit</span>
              <span className="calc-result-value calc-result-green">${credit}</span>
            </div>
            <div className="calc-result-item calc-result-highlight">
              <span className="calc-result-label">You pay</span>
              <span className={`calc-result-value calc-result-big ${cost === 0 ? "calc-result-green" : ""}`}>
                ${cost}/mo
                {cost === 0 && <span className="calc-free-badge">Free!</span>}
              </span>
            </div>
          </div>

          {cost === 0 && (
            <div className="calc-zero-banner">
              <TrendingDown size={18} />
              Your {paidClients} paid clients cover your entire ${COACH_MONTHLY_PRICE}/mo bill.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
