import { useState } from "react";
import { TrendingDown } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { COACH_MONTHLY_PRICE, CLIENT_CREDIT_MONTHLY, FREE_CLIENTS } from "../config/pricing";

const competitors = [
  { name: "CoachNow", price: 50, note: "PRO plan, app required" },
  { name: "OnForm", price: 30, note: "Coach plan, iOS only" },
  { name: "Sprongo", price: 49, note: "Small Team (20 members)" },
];

export default function Calculator() {
  const [clients, setClients] = useState(5);
  const headerRef = useScrollReveal();
  const calcRef = useScrollReveal();

  const paidClients = Math.max(0, clients - FREE_CLIENTS);
  const credit = paidClients * CLIENT_CREDIT_MONTHLY;
  const cost = Math.max(0, COACH_MONTHLY_PRICE - credit);

  const maxPrice = Math.max(
    COACH_MONTHLY_PRICE,
    ...competitors.map((c) => c.price)
  );

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Calculator</span>
          <h2 className="section-title">See what you'd actually pay</h2>
          <p className="section-subtitle">
            Move the slider. Watch your bill shrink — then see how it compares.
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

        {/* Competitor comparison */}
        <div className="calc-compare">
          <h3 className="calc-compare-title">
            Same {clients} clients, different platforms
          </h3>
          <div className="calc-compare-bars">
            <CompareBar
              name="Kaynos"
              price={cost}
              maxPrice={maxPrice}
              isKaynos
              note={cost === 0 ? "Free with credits" : `After $${credit} credit`}
            />
            {competitors.map((c) => (
              <CompareBar
                key={c.name}
                name={c.name}
                price={c.price}
                maxPrice={maxPrice}
                note={c.note}
              />
            ))}
          </div>
          <p className="calc-compare-footnote">
            Competitor prices based on publicly listed plans as of early 2026. Kaynos
            price reflects credits from {paidClients} paid client{paidClients !== 1 ? "s" : ""}.
          </p>
        </div>
      </div>
    </section>
  );
}

function CompareBar({ name, price, maxPrice, isKaynos, note }) {
  const pct = maxPrice > 0 ? Math.max((price / maxPrice) * 100, price > 0 ? 4 : 0) : 0;

  return (
    <div className={`calc-bar-row${isKaynos ? " calc-bar-kaynos" : ""}`}>
      <div className="calc-bar-label">
        <span className="calc-bar-name">{name}</span>
        <span className="calc-bar-note">{note}</span>
      </div>
      <div className="calc-bar-track">
        <div
          className={`calc-bar-fill${isKaynos ? " calc-bar-fill-kaynos" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`calc-bar-price${isKaynos ? " calc-bar-price-kaynos" : ""}`}>
        {price === 0 ? "$0" : `$${price}/mo`}
      </span>
    </div>
  );
}
