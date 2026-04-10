import { useState, useEffect } from "react";
import { Link2, Check } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import {
  COACH_MONTHLY_PRICE,
  FREE_SEATS,
  SEAT_PRICE,
  FMT,
  calcMonthlyCost,
} from "../config/pricing";
import { calculatorCompetitors } from "../data/competitors";

function formatVerifiedDate(isoMonth) {
  const [year, month] = isoMonth.split("-").map(Number);
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

function latestVerifiedLabel(comps) {
  const latest = comps.reduce((a, b) => (a.verified > b.verified ? a : b));
  return formatVerifiedDate(latest.verified);
}

function getInitialClients() {
  if (typeof window === "undefined") return 5;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = Number(params.get("clients"));
  return fromUrl >= 1 && fromUrl <= 50 ? fromUrl : 5;
}

export default function Calculator() {
  const [clients, setClients] = useState(getInitialClients);
  const [copied, setCopied] = useState(false);
  const headerRef = useScrollReveal();
  const calcRef = useScrollReveal();

  const cost = calcMonthlyCost(clients);
  const annualCost = cost * 12;
  const extraSeats = Math.max(0, clients - FREE_SEATS);

  const maxPrice = Math.max(
    cost,
    ...calculatorCompetitors.map((c) => c.price)
  );

  function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set("clients", clients);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section id="calculator" className="section">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Calculator</span>
          <h2 className="section-title">See what you'd actually pay</h2>
          <p className="section-subtitle">
            Move the slider. {PRICING_COPY.creditDesc.charAt(0).toLowerCase() + PRICING_COPY.creditDesc.slice(1)}{" "}
            Your clients always use Kaynos for free.
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
              <span className="calc-result-value">{extraSeats} x {FMT.seatPrice}</span>
            </div>
            <div className="calc-result-item calc-result-highlight">
              <span className="calc-result-label">You pay</span>
              <span className="calc-result-value calc-result-big">
                ${cost}/mo
              </span>
              <span className="calc-result-annual">That's ${annualCost}/year</span>
            </div>
          </div>

          <button
            type="button"
            className="calc-share-btn"
            onClick={handleShare}
          >
            {copied ? <Check size={14} /> : <Link2 size={14} />}
            {copied ? "Link copied!" : "Share this estimate"}
          </button>
        </div>

        <div className="calc-multi-coach-note">
          <p>
            Running multiple coaches? Each coach gets their own Kaynos account.{" "}
            <a href="mailto:support@kaynos.net?subject=Team%20pricing%20inquiry">
              Contact us to discuss team pricing.
            </a>
          </p>
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
              note={`${FMT.coachMonthly} base + ${extraSeats} extra seat${extraSeats !== 1 ? "s" : ""}`}
            />
            {calculatorCompetitors.map((c) => (
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
            Competitor prices based on publicly listed plans. Last verified: {latestVerifiedLabel(calculatorCompetitors)}.
            Kaynos price reflects {clients} active client{clients !== 1 ? "s" : ""} ({FMT.coachMonthlySlash} base + {FMT.seatPriceSlash} per extra seat beyond {FREE_SEATS}).
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
