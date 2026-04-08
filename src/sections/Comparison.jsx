import { Check, X, Minus } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";

const competitors = [
  { key: "kaynos", label: "Kaynos", sub: "$49/mo" },
  { key: "coachnow", label: "CoachNow", sub: "$50/mo" },
  { key: "onform", label: "OnForm", sub: "$30/mo" },
  { key: "diy", label: "Drive + Vimeo", sub: "Free" },
];

const features = [
  {
    name: "Works in the browser",
    detail: "No app install for coaches or clients",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Timestamped video notes",
    detail: "Pin feedback to exact moments",
    kaynos: true, coachnow: true, onform: true, diy: false,
  },
  {
    name: "Clients use it free",
    detail: "No cost passed to your clients",
    kaynos: true, coachnow: true, onform: true, diy: true,
  },
  {
    name: "Private sessions + group classes",
    detail: "1-on-1 and shared content in one place",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
  {
    name: "Single flat price, all features",
    detail: "No tiers or feature gating",
    kaynos: true, coachnow: false, onform: false, diy: true,
  },
  {
    name: "Credits that lower your bill",
    detail: "Each paid client reduces your cost",
    kaynos: true, coachnow: false, onform: false, diy: false,
  },
  {
    name: "Works for any coaching style",
    detail: "Fitness, martial arts, music, dance, etc.",
    kaynos: true, coachnow: true, onform: "partial", diy: true,
  },
  {
    name: "Watch tracking",
    detail: "See who's viewed their sessions",
    kaynos: true, coachnow: true, onform: false, diy: false,
  },
];

function Cell({ value }) {
  if (value === true) return <Check size={18} className="cmp-check" aria-label="Yes" />;
  if (value === false) return <X size={18} className="cmp-x" aria-label="No" />;
  return <Minus size={18} className="cmp-partial" aria-label="Partial" />;
}

export default function Comparison() {
  const headerRef = useScrollReveal();
  const tableRef = useScrollReveal();

  return (
    <section id="comparison" className="section section--alt">
      <div className="container">
        <div ref={headerRef} className="reveal section-header">
          <span className="section-label">Compare</span>
          <h2 className="section-title">How Kaynos stacks up</h2>
          <p className="section-subtitle">
            Side-by-side with the tools coaches actually use and consider.
          </p>
        </div>

        <div ref={tableRef} className="reveal cmp-table-wrap">
          <div className="cmp-table">
            <div className="cmp-header">
              <div className="cmp-feature-col" />
              {competitors.map((c) => (
                <div
                  key={c.key}
                  className={`cmp-col${c.key === "kaynos" ? " cmp-col-kaynos" : ""}`}
                >
                  <span className="cmp-col-name">{c.label}</span>
                  <span className="cmp-col-price">{c.sub}</span>
                </div>
              ))}
            </div>
            {features.map((f) => (
              <div key={f.name} className="cmp-row">
                <div className="cmp-feature-col">
                  <span className="cmp-feature-name">{f.name}</span>
                  <span className="cmp-feature-detail">{f.detail}</span>
                </div>
                {competitors.map((c) => (
                  <div
                    key={c.key}
                    className={`cmp-col${c.key === "kaynos" ? " cmp-col-kaynos" : ""}`}
                  >
                    <Cell value={f[c.key]} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="cmp-calc-link">
          <a href="#calculator">See your actual cost with the calculator →</a>
        </p>
      </div>
    </section>
  );
}
