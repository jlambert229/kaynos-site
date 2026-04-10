import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { COACH_MONTHLY_PRICE, FREE_SEATS, SEAT_PRICE, calcMonthlyCost } from "../config/pricing";

const competitors = [
  { name: "CoachNow", price: 50, note: "PRO plan, app required", verified: "2026-03" },
  { name: "OnForm", price: 30, note: "Coach plan, iOS only", verified: "2026-03" },
  { name: "Sprongo", price: 49, note: "Small Team (20 members)", verified: "2026-03" },
];

function formatVerifiedDate(isoMonth) {
  const [year, month] = isoMonth.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function latestVerifiedLabel(comps) {
  const latest = comps.reduce((a, b) => (a.verified > b.verified ? a : b));
  return formatVerifiedDate(latest.verified);
}

export default function Calculator() {
  const [clients, setClients] = useState(5);
  const headerRef = useScrollReveal();
  const calcRef = useScrollReveal();

  const cost = calcMonthlyCost(clients);
  const extraSeats = Math.max(0, clients - FREE_SEATS);

  const maxPrice = Math.max(
    cost,
    ...competitors.map((c) => c.price)
  );

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Calculator</span>
          <h2 className="section-title">See what you'd actually pay</h2>
          <p className="section-subtitle">
            Move the slider. $50/mo base includes 3 client seats. Each
            additional active seat is $5/mo. Your clients always use Kaynos
            for free.
          </p>
        </div>

        <div ref={calcRef} className="reveal calc-card">
          <div className="calc-slider-row">
            <label className="calc-slider-label" htmlFor="client-slider">
              Active clients
            </label>
            <output className="calc-slider-value">{clients}</output>
          </div>
          <input
            id="client-slider"
            type="range"
            min={1}
            max={50}
            value={clients}
            onChange={(e) => setClients(Number(e.target.value))}
            className="calc-slider"
          />
          <div className="calc-slider-range">
            <span>1</span>
            <span>50</span>
          </div>

          <div className="calc-results">
            <div className="calc-result-item">
              <span className="calc-result-label">Active clients</span>
              <span className="calc-result-value">{clients}</span>
            </div>
            <div className="calc-result-item">
              <span className="calc-result-label">Included seats</span>
              <span className="calc-result-value">{Math.min(clients, FREE_SEATS)}</span>
            </div>
            <div className="calc-result-item">
              <span className="calc-result-label">Extra seats</span>
              <span className="calc-result-value">{extraSeats} x ${SEAT_PRICE}</span>
            </div>
            <div className="calc-result-item calc-result-highlight">
              <span className="calc-result-label">You pay</span>
              <span className="calc-result-value calc-result-big">
                ${cost}/mo
              </span>
            </div>
          </div>
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
              note={`$${COACH_MONTHLY_PRICE} base + ${extraSeats} extra seat${extraSeats !== 1 ? "s" : ""}`}
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
            Competitor prices based on publicly listed plans. Last verified: {latestVerifiedLabel(competitors)}.
            Kaynos price reflects {clients} active client{clients !== 1 ? "s" : ""} ($50/mo base + $5/mo per extra seat beyond 3).
            Clients use Kaynos for free.
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
